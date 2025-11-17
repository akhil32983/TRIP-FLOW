package com.tripflow.services;

import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.NotificationMessage;

@Service
public class NotificationHandlerService {
    
    public void handleNotification(NotificationMessage message) {
        System.out.println("Handling notification for user: " + message.userId());
        System.out.println("  - Message: " + message.message());
        System.out.println("  - Additional Info: " + message.payload());
    }
}
