package com.tripflow.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.service.NotificationService;

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
        notificationService.saveNotification(message);

        messagingTemplate.convertAndSendToUser(
            message.username(),
            "/queue/notifications",
            message
        );
    }
}

