package com.tripflow.config;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {
    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.api.url}")
    private String apiUrl;

    @Value("${ai.api.model}")
    private String apiModel;

    @Bean
    public OpenAIClient openAIClient() {
        if (
            apiKey == null || apiKey.isEmpty() || apiUrl == null ||
            apiUrl.isEmpty() || apiModel == null || apiModel.isEmpty()
        ) {
            throw new IllegalStateException(
                "AI Secrets are not configured. Please configure them in application-dev.properties or environment variables"
            );
        }
        
        return OpenAIOkHttpClient.builder()
            .apiKey(apiKey)
            .baseUrl(apiUrl)
            .build();
    }
}
