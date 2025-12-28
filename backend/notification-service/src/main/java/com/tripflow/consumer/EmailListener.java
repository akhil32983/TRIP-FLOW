package com.tripflow.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.tripflow.kafka.messages.EmailMessage;
import com.tripflow.service.EmailHandlerService;

@Component
public class EmailListener {
    private final EmailHandlerService emailHandlerService;

    public EmailListener(EmailHandlerService emailHandlerService) {
        this.emailHandlerService = emailHandlerService;
    }

    @KafkaListener(
        topics = "email",
        groupId = "email-service",
        containerFactory = "emailFactory"
    )
    public void consume(EmailMessage message) {
        this.emailHandlerService.handleEmail(message);
    }
}
