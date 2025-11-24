package com.tripflow.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.tripflow.dto.notification.NotificationTypeDTO;
import com.tripflow.kafka.messages.AIGenerationMessage;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.service.KafkaService;
import com.tripflow.service.itinerary.ItineraryService;

@Component
public class AIGenerationListener {
    private final ItineraryService itineraryService;
    private final KafkaService kafkaService;

    public AIGenerationListener(
        ItineraryService itineraryService, KafkaService kafkaService
    ) {
        this.itineraryService = itineraryService;
        this.kafkaService = kafkaService;
    }
    
    @KafkaListener(
        topics = "ai-generation",
        groupId = "api-service-group",
        containerFactory = "aiGenerationFactory"
    )
    public void consume(AIGenerationMessage message) {
        boolean result = this.itineraryService.processGeneratedItinerary(message);
        
        if (result) {
            this.kafkaService.sendNotificationMessage(
                new NotificationMessage(
                    message.username(),
                    "Your AI generated itinerary is ready!",
                    NotificationTypeDTO.ITINERARY_GENERATED
                )
            );
        } else {
            this.kafkaService.sendNotificationMessage(
                new NotificationMessage(
                    message.username(),
                    "Failed to process your AI generated itinerary.",
                    NotificationTypeDTO.ITINERARY_GENERATION_FAILED
                )
            );
        }
    }
}
