package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.dto.ai.AIResponse;
import com.tripflow.dto.ai.AIStatus;
import com.tripflow.dto.ai.AIUsageDTO;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.model.User;
import com.tripflow.service.KafkaService;
import com.tripflow.service.UserService;
import com.tripflow.service.ai.AIService;
import com.tripflow.service.ai.AIUsageService;

@Tag("unit")
public class AIServiceTest {

    private AIUsageService aiUsageService;
    private KafkaService kafkaService;
    private UserService userService;
    private AIService aiService;

    private User testUser;

    @BeforeEach
    public void setUp() {
        this.aiUsageService = mock(AIUsageService.class);
        this.kafkaService = mock(KafkaService.class);
        this.userService = mock(UserService.class);

        this.aiService = new AIService(aiUsageService, kafkaService, userService);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setProcessingAI(false);
    }

    @Test
    @DisplayName("AIService should return correct status from dependencies")
    public void testGetAIStatus() {
        when(userService.getAuthenticatedUser()).thenReturn(testUser);
        when(aiUsageService.canUseAI(testUser)).thenReturn(true);
        when(aiUsageService.getDailyLimit(testUser)).thenReturn(5);
        when(aiUsageService.getRemainingRequests(testUser)).thenReturn(3);

        AIStatus result = aiService.getAIStatus();

        assertNotNull(result);
        assertFalse(result.isProcessing());
        assertTrue(result.canUseAI());
        assertEquals(5, result.dailyLimit());
        assertEquals(3, result.remainingRequests());
        
        verify(userService).getAuthenticatedUser();
        verify(aiUsageService).canUseAI(testUser);
    }

    @Test
    @DisplayName("AIService should delegate setAIProcessing to UserService")
    public void testSetAIProcessing() {
        aiService.setAIProcessing("testUser", true);

        verify(userService).setProcessingAI("testUser", true);
    }

    @Test
    @DisplayName("AIService should succeed request processing when user is authenticated and has quota")
    public void testRequestAIProcessingSuccess() {
        AIGenerationRequest request = new AIGenerationRequest(
            "prompt", "dest", "style", 100.0, "hotel", "5 days", Collections.emptyList()
        );
        
        AIUsageDTO mockUsageDTO = new AIUsageDTO(1, 5, 4, LocalDate.now());
        
        when(userService.getAuthenticatedUser()).thenReturn(testUser);
        when(aiUsageService.canUseAI(testUser)).thenReturn(true);
        when(aiUsageService.recordUsage(testUser)).thenReturn(mockUsageDTO);

        AIResponse response = aiService.requestAIProcessing(request);

        assertNotNull(response);
        assertEquals("AI request submitted successfully", response.message());
        assertEquals(mockUsageDTO, response.aiUsage());

        verify(kafkaService).sendAIRequestMessage(any(AIRequestMessage.class));
        verify(aiUsageService).recordUsage(testUser);
    }

    @Test
    @DisplayName("AIService should throw Unauthorized when no user is authenticated for request processing")
    public void testRequestAIProcessingUnauthorized() {
        when(userService.getAuthenticatedUser()).thenReturn(null);
        AIGenerationRequest request = new AIGenerationRequest(
            "prompt", "dest", "style", 100.0, "hotel", "5 days", Collections.emptyList()
        );

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            aiService.requestAIProcessing(request);
        });

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
        verify(kafkaService, never()).sendAIRequestMessage(any());
        verify(aiUsageService, never()).recordUsage(any());
    }

    @Test
    @DisplayName("AIService should throw TooManyRequests when limit exceeded for request processing")
    public void testRequestAIProcessingLimitExceeded() {
        when(userService.getAuthenticatedUser()).thenReturn(testUser);
        when(aiUsageService.canUseAI(testUser)).thenReturn(false);
        AIGenerationRequest request = new AIGenerationRequest(
            "prompt", "dest", "style", 100.0, "hotel", "5 days", Collections.emptyList()
        );

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            aiService.requestAIProcessing(request);
        });

        assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatusCode());
        verify(kafkaService, never()).sendAIRequestMessage(any());
        verify(aiUsageService, never()).recordUsage(any());
    }

    @Test
    @DisplayName("AIService should reduce usage via AIUsageService on failed generation")
    public void testProcessFailedAIGeneration() {
        String username = "testUser";
        when(userService.getUserByUsername(username)).thenReturn(testUser);

        aiService.processFailedAIGeneration(username);

        verify(userService).getUserByUsername(username);
        verify(aiUsageService).reduceUsage(testUser);
    }
}
