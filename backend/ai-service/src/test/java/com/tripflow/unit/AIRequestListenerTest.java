package com.tripflow.unit;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.consumer.AIRequestListener;
import com.tripflow.dto.AIGenerationRequest;
import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.service.AIHandlerService;

import java.time.Instant;
import java.util.List;

@Tag("unit")
public class AIRequestListenerTest {
    private AIHandlerService aiHandlerService;
    private AIRequestListener aiRequestListener;

    @BeforeEach
    public void setUp() {
        this.aiHandlerService = mock(AIHandlerService.class);
        this.aiRequestListener = new AIRequestListener(aiHandlerService);
    }

    @Test
    @DisplayName("Test consume delegates message to handler service")
    public void testConsumeMessage() {
        // Arrange
        AIGenerationRequest request = new AIGenerationRequest(
            "Venice",
            "Romantic",
            1700.0,
            "Hotel",
            "4 days",
            List.of("Canals", "Art")
        );
        AIRequestMessage message = new AIRequestMessage("romantic_traveler", request, Instant.now());

        // Act
        aiRequestListener.consume(message);

        // Assert
        verify(aiHandlerService, times(1)).handleAIRequest(message);
    }

    @Test
    @DisplayName("Test consume invokes handler service with correct message")
    public void testHandlerServiceInvoked() {
        // Arrange
        AIGenerationRequest request = new AIGenerationRequest(
            "Edinburgh",
            "Medieval",
            1400.0,
            "Hostel",
            "5 days",
            List.of("Castles", "Whisky")
        );
        AIRequestMessage message = new AIRequestMessage("scottish_explorer", request, Instant.now());

        // Act
        aiRequestListener.consume(message);

        // Assert
        verify(aiHandlerService, times(1)).handleAIRequest(eq(message));
    }

    @Test
    @DisplayName("Test consume handles multiple messages")
    public void testConsumeMultipleMessages() {
        // Arrange
        AIRequestMessage message1 = new AIRequestMessage(
            "user1",
            new AIGenerationRequest("Paris", "Cultural", 1500.0, "Hotel", "5 days", List.of("Museums")),
            Instant.now()
        );
        AIRequestMessage message2 = new AIRequestMessage(
            "user2",
            new AIGenerationRequest("London", "Modern", 2000.0, "Apartment", "3 days", List.of("Shopping")),
            Instant.now()
        );
        AIRequestMessage message3 = new AIRequestMessage(
            "user3",
            new AIGenerationRequest("Tokyo", "Tech", 3000.0, "Hotel", "7 days", List.of("Technology")),
            Instant.now()
        );

        // Act
        aiRequestListener.consume(message1);
        aiRequestListener.consume(message2);
        aiRequestListener.consume(message3);

        // Assert
        verify(aiHandlerService, times(3)).handleAIRequest(any(AIRequestMessage.class));
        verify(aiHandlerService, times(1)).handleAIRequest(message1);
        verify(aiHandlerService, times(1)).handleAIRequest(message2);
        verify(aiHandlerService, times(1)).handleAIRequest(message3);
    }

    @Test
    @DisplayName("Test consume with minimal request data")
    public void testConsumeMinimalRequest() {
        // Arrange
        AIGenerationRequest request = new AIGenerationRequest(
            "Oslo",
            "Nature",
            1000.0,
            "Cabin",
            "2 days",
            List.of()
        );
        AIRequestMessage message = new AIRequestMessage("nature_lover", request, Instant.now());

        // Act
        aiRequestListener.consume(message);

        // Assert
        verify(aiHandlerService, times(1)).handleAIRequest(message);
    }

    @Test
    @DisplayName("Test consume with complex request data")
    public void testConsumeComplexRequest() {
        // Arrange
        AIGenerationRequest request = new AIGenerationRequest(
            "New York",
            "Urban Adventure",
            5000.0,
            "Luxury Hotel",
            "10 days",
            List.of("Broadway", "Museums", "Fine Dining", "Shopping", "Nightlife")
        );
        AIRequestMessage message = new AIRequestMessage("luxury_traveler", request, Instant.now());

        // Act
        aiRequestListener.consume(message);

        // Assert
        verify(aiHandlerService, times(1)).handleAIRequest(message);
    }
}
