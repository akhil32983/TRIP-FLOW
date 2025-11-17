package com.tripflow.kafka.messages;

import java.time.Instant;

import com.tripflow.dto.AIRequest;

public record AIRequestMessage(
    Long userId,
    AIRequest request,
    Instant timestamp
) {
    public AIRequestMessage(Long userId, AIRequest request) {
        this(userId, request, Instant.now());
    }
}