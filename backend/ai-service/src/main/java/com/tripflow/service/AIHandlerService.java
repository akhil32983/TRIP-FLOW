package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class AIHandlerService {
    private final KafkaService kafkaService;
    private final AILogService aiLogService;
    private final AIGenerationService aiGenerationService;

    public AIHandlerService(KafkaService kafkaService, AILogService aiLogService, AIGenerationService aiGenerationService) {
        this.kafkaService = kafkaService;
        this.aiLogService = aiLogService;
        this.aiGenerationService = aiGenerationService;
    }

    public void handleAIRequest(AIRequestMessage requestMessage) {
        String message = "Your AI request has been processed.";
        String response;
        boolean success;
        
        // Handle AI Generation
        try {
            ExtendedItineraryDTO itinerary = this.aiGenerationService.generateItinerary(requestMessage.request());
            response = itinerary.toString();
            success = true;
        } catch (Exception e) {
            response = "Failed to process your AI request.";
            success = false;
        }

        // Save AI Log
        this.aiLogService.saveAILog(requestMessage, response, success);

        // Send Notification
        this.kafkaService.sendNotificationMessage(
            new NotificationMessage(requestMessage.username(), message, success)
        );
    }
}
