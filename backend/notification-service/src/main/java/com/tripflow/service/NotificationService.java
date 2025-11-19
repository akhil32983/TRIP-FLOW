package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.model.Notification;
import com.tripflow.repository.NotificationRepository;

@Service
public class NotificationService {    
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Saves a notification in the database
     * @param notificationMessage
     */
    public void saveNotification(NotificationMessage notificationMessage) {
        Notification notification = new Notification(
            notificationMessage.username(),
            notificationMessage.message(),
            notificationMessage.timestamp(),
            notificationMessage.success()
        );
        
        notificationRepository.save(notification);
    }
}
