package com.tripflow.service.ai;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.dto.ai.AIResponse;
import com.tripflow.dto.ai.AIUsageDTO;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.model.User;
import com.tripflow.service.KafkaService;
import com.tripflow.service.UserService;

@Service
public class AIService {
    private final AIUsageService aiUsageService;
    private final KafkaService kafkaService;
    private final UserService userService;

    public AIService(AIUsageService aiUsageService, KafkaService kafkaService, UserService userService) {
        this.aiUsageService = aiUsageService;
        this.kafkaService = kafkaService;
        this.userService = userService;
    }

    /**
     * Handles an AI processing request by sending it to the Kafka topic.
     * 
     * @param aiRequest The AIRequest containing user preferences.
     * @return A MessageResponse indicating success.
     */
    public AIResponse requestAIProcessing(AIGenerationRequest aiRequest) {
        User authenticatedUser = this.userService.getAuthenticatedUser();
        if (authenticatedUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        if (!this.aiUsageService.canUseAI(authenticatedUser)) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Daily AI usage limit exceeded");
        }

        AIUsageDTO aiUsage = this.aiUsageService.recordUsage(authenticatedUser);

        this.kafkaService.sendAIRequestMessage(
            new AIRequestMessage(authenticatedUser.getUsername(), aiRequest)
        );

        return new AIResponse("AI request submitted successfully", aiUsage);
    }
}
