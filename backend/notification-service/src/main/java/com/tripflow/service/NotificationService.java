package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.mapper.NotificationMapper;
import com.tripflow.model.Notification;
import com.tripflow.repository.NotificationRepository;

@Service
public class NotificationService {    
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationService(
        NotificationRepository notificationRepository, NotificationMapper notificationMapper
    ) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    /**
     * Saves a notification in the database
     * @param notificationMessage
     */
    public void saveNotification(NotificationMessage notificationMessage) {
        Notification notification = this.notificationMapper.toNotification(notificationMessage);
        this.notificationRepository.save(notification);
    }
}
