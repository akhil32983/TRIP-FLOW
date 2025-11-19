package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.model.Notification;
import com.tripflow.repository.NotificationRepository;

@Service
public class NotificationService {
    
    private final NotificationRepository notificationRepository;
    private final ObjectMapper objectMapper;

    public NotificationService(NotificationRepository notificationRepository, ObjectMapper objectMapper) {
        this.notificationRepository = notificationRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Saves a notification in the database
     * @param notificationMessage
     */
    public void saveNotification(NotificationMessage notificationMessage) {
        String payloadJson = convertPayloadToJson(notificationMessage.payload());
        
        Notification notification = new Notification(
            notificationMessage.username(),
            notificationMessage.message(),
            payloadJson,
            notificationMessage.timestamp()
        );
        
        notificationRepository.save(notification);
    }

    /**
     * Converts the payload (Object) to JSON String
     */
    private String convertPayloadToJson(Object payload) {
        if (payload == null) {
            return null;
        }
        
        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException e) {
            return payload.toString();
        }
    }
}
