package com.tripflow.kafka.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    
    @Bean
    public NewTopic aiRequestTopic() {
        return TopicBuilder.name("ai-request")
            .build();
    }

    @Bean
    public NewTopic aiGenerationTopic() {
        return TopicBuilder.name("ai-generation")
            .build();
    }

    @Bean
    public NewTopic notificationTopic() {
        return TopicBuilder.name("notification")
            .build();
    }
}
