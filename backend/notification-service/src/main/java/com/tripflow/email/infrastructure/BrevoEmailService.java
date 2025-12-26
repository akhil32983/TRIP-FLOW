package com.tripflow.email.infrastructure;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.tripflow.email.domain.EmailMessage;
import com.tripflow.email.domain.EmailService;

@Service
public class BrevoEmailService implements EmailService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String brevoApiKey;
    private final String emailSender;
    
    public BrevoEmailService(String brevoApiKey, String emailSender) {
        this.brevoApiKey = brevoApiKey;
        this.emailSender = emailSender;
    }

    public void sendEmail(EmailMessage email) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", this.brevoApiKey);
        headers.set("accept", MediaType.APPLICATION_JSON_VALUE);

        Map<String, String> sender = new HashMap<>();
        sender.put("name", "TripFlow");
        sender.put("email", this.emailSender);
        
        Map<String, Object> body = new HashMap<>();
        body.put("sender", sender);

        Map<String, String> toRecipient = new HashMap<>();
        toRecipient.put("email", email.to());
        body.put("to", new Map[]{toRecipient});

        body.put("subject", email.subject());
        body.put("htmlContent", email.body());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        String url = "https://api.brevo.com/v3/smtp/email";
        restTemplate.postForEntity(url, request, String.class);
    }
}
