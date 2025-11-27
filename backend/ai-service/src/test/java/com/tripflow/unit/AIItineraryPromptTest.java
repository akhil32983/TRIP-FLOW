package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.unit.utils.AITestUtils;
import com.tripflow.utils.AIItineraryPrompt;

@Tag("unit")
public class AIItineraryPromptTest {

    @Test
    @DisplayName("Test generatePrompt replaces all placeholders correctly")
    public void testGeneratePromptWithAllFields() {
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();

        String prompt = AIItineraryPrompt.generatePrompt(request);

        assertTrue(prompt.contains(request.destination()), "Prompt should contain destination");
        assertTrue(prompt.contains(request.style()), "Prompt should contain style");
        assertTrue(prompt.contains(request.budget().toString()), "Prompt should contain budget");
        assertTrue(prompt.contains(request.lodging()), "Prompt should contain lodging");
        assertTrue(prompt.contains(request.duration()), "Prompt should contain duration");
        assertTrue(prompt.contains(request.interests().toString()), "Prompt should contain interests");
        
        assertFalse(prompt.contains("{{place}}"), "Placeholder {{place}} should be replaced");
        assertFalse(prompt.contains("{{style}}"), "Placeholder {{style}} should be replaced");
        assertFalse(prompt.contains("{{budget}}"), "Placeholder {{budget}} should be replaced");
        assertFalse(prompt.contains("{{lodging}}"), "Placeholder {{lodging}} should be replaced");
        assertFalse(prompt.contains("{{duration}}"), "Placeholder {{duration}} should be replaced");
        assertFalse(prompt.contains("{{interests}}"), "Placeholder {{interests}} should be replaced");
    }
}
