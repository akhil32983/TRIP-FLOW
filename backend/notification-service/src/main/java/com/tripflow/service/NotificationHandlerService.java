package com.tripflow.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class NotificationHandlerService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    public NotificationHandlerService(
        SimpMessagingTemplate messagingTemplate,
        NotificationService notificationService
    ) {
        this.messagingTemplate = messagingTemplate;
        this.notificationService = notificationService;
    }

    public void handleNotification(NotificationMessage message) {
        this.notificationService.saveNotification(message);

        messagingTemplate.convertAndSendToUser(
            message.username(),
            "/queue/notifications",
            message
        );
    }
}

