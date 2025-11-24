package com.tripflow.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.models.chat.completions.ChatCompletion;
import com.openai.models.chat.completions.ChatCompletionCreateParams;
import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.utils.AIItineraryMock;
import com.tripflow.utils.AIItineraryPrompt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AIGenerationService {
    @Value("${ai.api.model}")
    private String apiModel;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;
    
    private final OpenAIClient openAIClient;

    public AIGenerationService(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }


    /**
     * Generates an itinerary using the AI model.
     * 
     * @param request the request containing the itinerary details
     * @return an ExtendedItineraryDTO object containing the generated itinerary
     * @throws JsonProcessingException if there is an error processing the JSON response
     */
    public ExtendedItineraryDTO generateItinerary(AIGenerationRequest request) throws JsonProcessingException {
        if (activeProfile != null && activeProfile.contains("dev")) {
            return AIItineraryMock.getItineraryMock();
        }

        String prompt = AIItineraryPrompt.generatePrompt(request);
        ChatCompletion chatCompletion = this.createChat(prompt);
        String response = chatCompletion.choices().get(0).message().content().get();

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(response, ExtendedItineraryDTO.class);
    }

    /**
     * Creates a chat completion using the AI client with the provided prompt.
     * 
     * @param prompt the prompt to send to the AI model
     * @return a ChatCompletion object containing the AI's response
     */
    private ChatCompletion createChat(String prompt) {
        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
                .addUserMessage(prompt)
                .model(this.apiModel)
                .build();
        return this.openAIClient.chat().completions().create(params);
    }
}
