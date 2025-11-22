package com.tripflow.controller.v1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.dto.ai.AIResponse;
import com.tripflow.service.ai.AIService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/ai")
public class RestAIController {
    private final AIService aiService;

    public RestAIController(AIService aiService) {
        this.aiService = aiService;
    }
    
    @PostMapping
    @Operation(
        summary = "Submit AI Processing Request",
        description = "Submits a request for AI processing based on user preferences.",
        security = @SecurityRequirement(name = "auth_token")
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "AI request submitted successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized access"),
        @ApiResponse(responseCode = "429", description = "Too many requests - daily AI usage limit exceeded"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<AIResponse> handleAIRequest(@RequestBody AIGenerationRequest request) {
        try {
            AIResponse response = this.aiService.requestAIProcessing(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}