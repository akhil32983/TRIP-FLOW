package com.tripflow.kafka.messages;

import java.time.Instant;

public record NotificationMessage(
    Long userId,
    String message,
    Object payload,
    Instant timestamp
) {
    public NotificationMessage(Long userId, String message, Object payload) {
        this(userId, message, payload, Instant.now());
    }
}