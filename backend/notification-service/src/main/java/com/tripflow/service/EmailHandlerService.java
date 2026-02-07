package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.email.application.SendEmailUseCase;
import com.tripflow.utils.EmailUtils;
import com.tripflow.email.domain.EmailMessage;

@Service
public class EmailHandlerService {
    private final SendEmailUseCase sendEmailUseCase;

    public EmailHandlerService(SendEmailUseCase sendEmailUseCase) {
        this.sendEmailUseCase = sendEmailUseCase;
    }
    
    /**
     * Handles an email message by converting it to a domain EmailMessage and sending it to the email service.
     * 
     * @param kafkaMessage The Kafka email message to be handled.
     */
    public void handleEmail(com.tripflow.kafka.messages.EmailMessage kafkaMessage) {
        String subject = EmailUtils.getEmailSubject(kafkaMessage.type());
        String processedBody = EmailUtils.generateEmailBody(
            kafkaMessage.type(),
            kafkaMessage.variables()
        );

        this.sendEmailUseCase.execute(new EmailMessage(
            kafkaMessage.to(),
            subject,
            processedBody
        ));
    }
}
