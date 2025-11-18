package com.tripflow.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class NotificationHandlerService {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationHandlerService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void handleNotification(NotificationMessage message) {
        System.out.println("Handling notification for user: " + message.username());
        System.out.println("  - Message: " + message.message());
        System.out.println("  - Additional Info: " + message.payload());

        messagingTemplate.convertAndSendToUser(
            message.username(),
            "/queue/notifications",
            message
        );
    }
}
