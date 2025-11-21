package com.tripflow.unit.utils;

import java.util.List;

import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryStatusDTO;
import com.tripflow.kafka.messages.AIGenerationMessage;
import com.tripflow.kafka.messages.AIRequestMessage;

public class AITestUtils {
    public static AIGenerationRequest createAIGenerationRequest() {
        return new AIGenerationRequest(
            "Prague",
            "Medieval",
            1300.0,
            "Hostel",
            "3 days",
            List.of("Castles", "Beer")
        );
    }

    public static AIRequestMessage createAIRequestMessage(String username, AIGenerationRequest request) {
        return new AIRequestMessage(username, request);
    }

    public static ExtendedItineraryDTO createItineraryDTO(AIGenerationRequest request) {
        return new ExtendedItineraryDTO(
            -1L,
            "Prague Tour [AI]",
            request.destination(),
            "A",
            2,
            request.budget(),
            "2024-03-01",
            request.interests(),
            0L,
            ItineraryStatusDTO.DRAFT,
            List.of(),
            0
        );
    }

    public static AIGenerationMessage createAIGenerationMessage(
        String username, ExtendedItineraryDTO itinerary
    ) {
        return new AIGenerationMessage(username, itinerary);
    }
}
