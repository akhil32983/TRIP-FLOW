package com.tripflow.kafka.messages;

import java.time.Instant;

import com.tripflow.dto.ai.AIGenerationRequest;

public record AIRequestMessage(
    String username,
    AIGenerationRequest request,
    Instant timestamp
) {
    public AIRequestMessage(String username, AIGenerationRequest request) {
        this(username, request, Instant.now());
    }
}