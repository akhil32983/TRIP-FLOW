package com.tripflow.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class KafkaService {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaService(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    private void sendMessage(String topic, Object message) {
        kafkaTemplate.send(topic, message);
    }

    /**
     * Sends an AI request message to the "ai-request" topic.
     * 
     * @param message The AIRequestMessage to be sent.
     */
    public void sendAIRequestMessage(AIRequestMessage message) {
        this.sendMessage("ai-request", message);
    }

    /**
     * Sends a Notification message to the "notification" topic.
     * 
     * @param message The NotificationMessage to be sent.
     */
    public void sendNotificationMessage(NotificationMessage message) {
        this.sendMessage("notification", message);
    }
}
