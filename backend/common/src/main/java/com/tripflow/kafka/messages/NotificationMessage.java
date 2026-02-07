package com.tripflow.kafka.messages;

import java.time.Instant;

import com.tripflow.dto.notification.NotificationTypeDTO;

public record NotificationMessage(
    String username,
    String message,
    NotificationTypeDTO type,
    Instant timestamp
) {
    public NotificationMessage(String username, String message, NotificationTypeDTO type) {
        this(username, message, type, Instant.now());
    }
}