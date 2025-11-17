package com.tripflow.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.services.NotificationHandlerService;

@Component
public class NotificationListener {
    private final NotificationHandlerService notificationHandlerService;

    public NotificationListener(NotificationHandlerService notificationHandlerService) {
        this.notificationHandlerService = notificationHandlerService;
    }
    
    @KafkaListener(
        topics = "notification",
        groupId = "notification-service",
        containerFactory = "notificationFactory"
    )
    public void consume(NotificationMessage message) {
        this.notificationHandlerService.handleNotification(message);
    }
}
