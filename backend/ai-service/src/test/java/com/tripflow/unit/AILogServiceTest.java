package com.tripflow.unit;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.model.AILog;
import com.tripflow.repository.AILogRepository;
import com.tripflow.service.AILogService;
import com.tripflow.unit.utils.AITestUtils;

import java.util.List;

@Tag("unit")
public class AILogServiceTest {
    private AILogRepository aiLogRepository;
    private AILogService aiLogService;

    @BeforeEach
    public void setUp() {
        this.aiLogRepository = mock(AILogRepository.class);
        this.aiLogService = new AILogService(aiLogRepository);
    }

    @Test
    @DisplayName("Test saveAILog saves log to repository")
    public void testSaveAILog() {
        String usernanme = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(usernanme, request);

        String response = "AI request processed successfully";
        Boolean success = true;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getUsername().equals(usernanme) &&
            aiLog.getDestination().equals(request.destination()) &&
            aiLog.getStyle().equals(request.style()) &&
            aiLog.getBudget().equals(request.budget()) &&
            aiLog.getLodging().equals(request.lodging()) &&
            aiLog.getDuration().equals(request.duration()) &&
            aiLog.getInterests().equals(request.interests()) &&
            aiLog.getResponse().equals(response) &&
            aiLog.getSuccess().equals(success)
        ));
    }

    @Test
    @DisplayName("Test saveAILog creates AILog with all fields")
    public void testCreateAILogWithAllFields() {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        String response = "Itinerary generated";
        Boolean success = true;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getUsername().equals(username) &&
            aiLog.getDestination().equals(request.destination()) &&
            aiLog.getStyle().equals(request.style()) &&
            aiLog.getBudget().equals(request.budget()) &&
            aiLog.getLodging().equals(request.lodging()) &&
            aiLog.getDuration().equals(request.duration()) &&
            aiLog.getInterests().equals(request.interests()) &&
            aiLog.getResponse().equals(response) &&
            aiLog.getSuccess().equals(success)
        ));
    }

    @Test
    @DisplayName("Test saveAILog with success status")
    public void testCreateAILogWithSuccessStatus() {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        String response = "Success message";
        Boolean success = true;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getSuccess() == true &&
            aiLog.getResponse().equals(response)
        ));
    }

    @Test
    @DisplayName("Test saveAILog with failure status")
    public void testCreateAILogWithFailureStatus() {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        String response = "Failed to process request";
        Boolean success = false;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getSuccess() == false &&
            aiLog.getResponse().equals(response)
        ));
    }

    @Test
    @DisplayName("Test saveAILog with empty interests list")
    public void testSaveAILogWithEmptyInterests() {
        String username = "testUser";
        AIGenerationRequest request = new AIGenerationRequest(
            "AI Prompt",
            "Athens",
            "Ancient",
            1300.0,
            "Hotel",
            "5 days",
            List.of()
        );
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);
        
        String response = "Request processed";
        Boolean success = true;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getInterests() != null &&
            aiLog.getInterests().isEmpty()
        ));
    }

    @Test
    @DisplayName("Test saveAILog with multiple interests")
    public void testSaveAILogWithMultipleInterests() {
        String username = "testUser";
        AIGenerationRequest request = new AIGenerationRequest(
            "AI Prompt",
            "Athens",
            "Ancient",
            1300.0,
            "Hotel",
            "5 days",
            List.of("Archaeology", "Philosophy", "Mythology", "Food")
        );
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        String response = "Itinerary created";
        Boolean success = true;

        when(aiLogRepository.save(any(AILog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        aiLogService.saveAILog(requestMessage, response, success);

        verify(aiLogRepository, times(1)).save(argThat(aiLog ->
            aiLog.getInterests().size() == 4 &&
            aiLog.getInterests().contains("Archaeology") &&
            aiLog.getInterests().contains("Philosophy") &&
            aiLog.getInterests().contains("Mythology") &&
            aiLog.getInterests().contains("Food")
        ));
    }
}
