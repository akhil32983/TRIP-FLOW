package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.kafka.messages.AIGenerationMessage;
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

    /**
     * Handles an incoming AI request message.
     * 
     * @param requestMessage The AI request message to handle
     */
    public void handleAIRequest(AIRequestMessage requestMessage) {
        String message = "Your AI request has been processed.";
        boolean success;
        
        // Handle AI Generation
        try {
            ExtendedItineraryDTO itinerary = this.aiGenerationService.generateItinerary(requestMessage.request());
            success = true;

            this.kafkaService.sendAIGenerationMessage(
                new AIGenerationMessage(requestMessage.username(), itinerary)
            );

        } catch (Exception e) {
            message = "Failed to process your AI request.";
            success = false;

            this.kafkaService.sendNotificationMessage(
                new NotificationMessage(requestMessage.username(), message, false)
            );
        }

        // Save AI Log
        this.aiLogService.saveAILog(requestMessage, message, success);
    }
}
