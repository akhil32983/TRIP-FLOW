package com.tripflow.kafka.messages;

import java.time.Instant;

public record NotificationMessage(
    String username,
    String message,
    Object payload,
    Instant timestamp
) {
    public NotificationMessage(String username, String message, Object payload) {
        this(username, message, payload, Instant.now());
    }
}