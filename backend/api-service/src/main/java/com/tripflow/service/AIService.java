package com.tripflow.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.AIRequest;
import com.tripflow.dto.MessageResponse;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.model.User;

@Service
public class AIService {
    private final KafkaService kafkaService;
    private final UserService userService;

    public AIService(KafkaService kafkaService, UserService userService) {
        this.kafkaService = kafkaService;
        this.userService = userService;
    }

    /**
     * Handles an AI processing request by sending it to the Kafka topic.
     * 
     * @param aiRequest The AIRequest containing user preferences.
     * @return A MessageResponse indicating success.
     */
    public MessageResponse requestAIProcessing(AIRequest aiRequest) {
        User authenticatedUser = this.userService.getAuthenticatedUser();
        if (authenticatedUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        AIRequestMessage message = new AIRequestMessage(authenticatedUser.getId(), aiRequest);
        this.kafkaService.sendAIRequestMessage(message);

        return new MessageResponse("AI request submitted successfully");
    }
}
