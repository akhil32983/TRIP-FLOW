package com.tripflow.kafka.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.kafka.messages.NotificationMessage;

@Configuration
public class KafkaConsumerConfig {
    
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    public Map<String, Object> consumerConfig() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        return props;
    }

    // [Generic Configs] ==============================================

    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfig());
    }

    @Bean
    public KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<String, Object>> factory() {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    // [AI Request Configs] ===========================================

    @Bean
    public ConsumerFactory<String, AIRequestMessage> aiRequestConsumerFactory() {
        JsonDeserializer<AIRequestMessage> deserializer = new JsonDeserializer<>(AIRequestMessage.class);
        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
            consumerConfig(),
            new StringDeserializer(),
            deserializer
        );
    }

    @Bean
    public KafkaListenerContainerFactory<
        ConcurrentMessageListenerContainer<String, AIRequestMessage>> aiRequestFactory() {
            ConcurrentKafkaListenerContainerFactory<String, AIRequestMessage>
                factory = new ConcurrentKafkaListenerContainerFactory<>();

            factory.setConsumerFactory(aiRequestConsumerFactory());
            return factory;
    }

    // [Notification Configs] =========================================

    @Bean
    public ConsumerFactory<String, NotificationMessage> notificationConsumerFactory() {
        JsonDeserializer<NotificationMessage> deserializer = new JsonDeserializer<>(NotificationMessage.class);
        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
            consumerConfig(),
            new StringDeserializer(),
            deserializer
        );
    }

    @Bean
    public KafkaListenerContainerFactory<
        ConcurrentMessageListenerContainer<String, NotificationMessage>> notificationFactory() {
            ConcurrentKafkaListenerContainerFactory<String, NotificationMessage>
                factory = new ConcurrentKafkaListenerContainerFactory<>();

            factory.setConsumerFactory(notificationConsumerFactory());
            return factory;
    }
}