package com.tripflow.kafka.messages;

import java.time.Instant;
import java.util.Map;

public record EmailMessage(
    String to,
    EmailType type,
    Map<String, String> variables,
    Instant timestamp
) {
    public EmailMessage(String to, EmailType type, Map<String, String> variables) {
        this(to, type, variables, Instant.now());
    }
}