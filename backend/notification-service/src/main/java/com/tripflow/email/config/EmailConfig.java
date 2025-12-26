package com.tripflow.email.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailConfig {

    @Value("${email.sender}")
    private String sender;

    @Value("${email.brevo.apiKey}")
    private String brevoApiKey;

    @Bean
    public String emailSender() {
        return this.sender;
    }

    @Bean
    public String brevoApiKey() {
        return this.brevoApiKey;
    }
}
