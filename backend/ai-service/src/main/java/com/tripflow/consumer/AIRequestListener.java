package com.tripflow.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.service.AIHandlerService;

@Component
public class AIRequestListener {
    private final AIHandlerService aiHandlerService;

    public AIRequestListener(AIHandlerService aiHandlerService) {
        this.aiHandlerService = aiHandlerService;
    }
    
    @KafkaListener(
        topics = "ai-request",
        groupId = "ai-service-group",
        containerFactory = "aiRequestFactory"
    )
    public void consume(AIRequestMessage message) {
        this.aiHandlerService.handleAIRequest(message);
    }
}
