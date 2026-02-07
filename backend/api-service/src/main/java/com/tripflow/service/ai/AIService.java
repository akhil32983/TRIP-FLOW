package com.tripflow.service.ai;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.dto.ai.AIResponse;
import com.tripflow.dto.ai.AIStatus;
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
     * Retrieves the AI status for the authenticated user.
     *
     * @return an AIStatus object containing the AI status information
     */
    public AIStatus getAIStatus() {
        User authenticatedUser = this.userService.getAuthenticatedUser();

        return new AIStatus(
            authenticatedUser.getProcessingAI(),
            this.aiUsageService.canUseAI(authenticatedUser),
            this.aiUsageService.getDailyLimit(authenticatedUser),
            this.aiUsageService.getRemainingRequests(authenticatedUser)
        );
    }

    /**
     * Sets the processing AI flag for the user with the specified username.
     *
     * @param username the username of the user to update
     * @param processing the processing AI flag to set
     */
    public void setAIProcessing(String username, boolean processing) {
        this.userService.setProcessingAI(username, processing);
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
        this.setAIProcessing(authenticatedUser.getUsername(), true);

        this.kafkaService.sendAIRequestMessage(
            new AIRequestMessage(authenticatedUser.getUsername(), aiRequest)
        );

        return new AIResponse("AI request submitted successfully", aiUsage);
    }

    /**
     * Processes a failed AI generation by reducing the user's AI usage.
     * 
     * @param username The username of the user whose AI generation failed.
     */
    public void processFailedAIGeneration(String username) {
        User user = this.userService.getUserByUsername(username);
        this.aiUsageService.reduceUsage(user);
    }
}
