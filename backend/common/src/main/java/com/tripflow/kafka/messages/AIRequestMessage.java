package com.tripflow.kafka.messages;

import java.time.Instant;

import com.tripflow.dto.AIRequest;

public record AIRequestMessage(
    String username,
    AIRequest request,
    Instant timestamp
) {
    public AIRequestMessage(String username, AIRequest request) {
        this(username, request, Instant.now());
    }
}