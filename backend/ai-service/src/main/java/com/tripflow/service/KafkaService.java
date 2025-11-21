package com.tripflow.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.AIGenerationMessage;
import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class KafkaService {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaService(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    private void sendMessage(String topic, Object message) {
        this.kafkaTemplate.send(topic, message);
    }

    /**
     * Sends a notification message to the "notification" Kafka topic.
     * 
     * @param message The notification message to send
     */
    public void sendNotificationMessage(NotificationMessage message) {
        this.sendMessage("notification", message);
    }

    /**
     * Sends an AI generation message to the "ai-generation" Kafka topic.
     * 
     * @param message The AI generation message to send
     */
    public void sendAIGenerationMessage(AIGenerationMessage message) {
        this.sendMessage("ai-generation", message);
    }
}
