package com.tripflow.kafka.messages;

import java.time.Instant;

public record NotificationMessage(
    String username,
    String message,
    boolean success,
    Instant timestamp
) {
    public NotificationMessage(String username, String message, boolean success) {
        this(username, message, success, Instant.now());
    }
}