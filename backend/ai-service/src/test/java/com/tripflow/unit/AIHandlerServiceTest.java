package com.tripflow.unit;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.kafka.messages.AIGenerationMessage;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.service.AIGenerationService;
import com.tripflow.service.AIHandlerService;
import com.tripflow.service.AILogService;
import com.tripflow.service.KafkaService;
import com.tripflow.unit.utils.AITestUtils;

@Tag("unit")
public class AIHandlerServiceTest {
    private KafkaService kafkaService;
    private AILogService aiLogService;
    private AIGenerationService aiGenerationService;
    private AIHandlerService aiHandlerService;

    @BeforeEach
    public void setUp() {
        this.kafkaService = mock(KafkaService.class);
        this.aiLogService = mock(AILogService.class);
        this.aiGenerationService = mock(AIGenerationService.class);
        
        this.aiHandlerService = new AIHandlerService(
            kafkaService,
            aiLogService,
            aiGenerationService
        );
    }

    @Test
    @DisplayName("Test handleAIRequest successfully processes request")
    public void testHandleAIRequestSuccess() throws JsonProcessingException {
        String username = "testuser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);
        ExtendedItineraryDTO itinerary = AITestUtils.createItineraryDTO(request);

        when(aiGenerationService.generateItinerary(request)).thenReturn(itinerary);

        aiHandlerService.handleAIRequest(requestMessage);

        verify(aiGenerationService, times(1)).generateItinerary(request);
        verify(kafkaService, times(1)).sendAIGenerationMessage(any(AIGenerationMessage.class));
        verify(kafkaService, never()).sendNotificationMessage(any(NotificationMessage.class));
        verify(aiLogService, times(1)).saveAILog(
            eq(requestMessage),
            eq("Your AI request has been processed."),
            eq(true)
        );
    }

    @Test
    @DisplayName("Test handleAIRequest handles failure correctly")
    public void testHandleAIRequestFailure() throws JsonProcessingException {
        String username = "testuser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        when(aiGenerationService.generateItinerary(request))
            .thenThrow(new RuntimeException("AI service unavailable"));

        aiHandlerService.handleAIRequest(requestMessage);

        verify(aiGenerationService, times(1)).generateItinerary(request);
        verify(kafkaService, times(1)).sendAIGenerationMessage(any(AIGenerationMessage.class));
        verify(aiLogService, times(1)).saveAILog(
            eq(requestMessage),
            eq("Failed to process your AI request."),
            eq(false)
        );
    }

    @Test
    @DisplayName("Test handleAIRequest sends correct Kafka message on success")
    public void testKafkaMessageSentOnSuccess() throws JsonProcessingException {
        String username = "john_doe";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);
        ExtendedItineraryDTO itinerary = AITestUtils.createItineraryDTO(request);

        when(aiGenerationService.generateItinerary(request)).thenReturn(itinerary);

        aiHandlerService.handleAIRequest(requestMessage);

        verify(kafkaService, times(1)).sendAIGenerationMessage(argThat(message ->
            message.username().equals(username) &&
            message.itinerary().equals(itinerary)
        ));
    }

    @Test
    @DisplayName("Test handleAIRequest saves AI log with success status")
    public void testAILogSavedOnSuccess() throws JsonProcessingException {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);
        ExtendedItineraryDTO itinerary = AITestUtils.createItineraryDTO(request);

        when(aiGenerationService.generateItinerary(request)).thenReturn(itinerary);

        aiHandlerService.handleAIRequest(requestMessage);

        verify(aiLogService, times(1)).saveAILog(requestMessage, "Your AI request has been processed.", true);
    }

    @Test
    @DisplayName("Test handleAIRequest saves AI log with failure status")
    public void testAILogSavedOnFailure() throws JsonProcessingException {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        AIRequestMessage requestMessage = AITestUtils.createAIRequestMessage(username, request);

        when(aiGenerationService.generateItinerary(request))
            .thenThrow(new RuntimeException("Service error"));

        aiHandlerService.handleAIRequest(requestMessage);

        verify(aiLogService, times(1)).saveAILog(requestMessage, "Failed to process your AI request.", false);
    }
}
