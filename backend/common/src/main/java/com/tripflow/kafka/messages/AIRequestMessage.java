package com.tripflow.kafka.messages;

import java.sql.Timestamp;
import com.tripflow.dto.AIRequest;

public record AIRequestMessage(
    Long userId,
    AIRequest request,
    Timestamp timestamp
) {
    public AIRequestMessage(Long userId, AIRequest request) {
        this(userId, request, new Timestamp(System.currentTimeMillis()));
    }
}