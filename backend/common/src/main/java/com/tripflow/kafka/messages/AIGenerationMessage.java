package com.tripflow.kafka.messages;

import java.time.Instant;

import com.tripflow.dto.itinerary.ExtendedItineraryDTO;

public record AIGenerationMessage(
    String username,
    ExtendedItineraryDTO itinerary,
    Instant timestamp
) {
    public AIGenerationMessage(String username, ExtendedItineraryDTO itinerary) {
        this(username, itinerary, Instant.now());
    }
}