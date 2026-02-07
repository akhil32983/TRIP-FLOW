package com.tripflow.unit;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.kafka.core.KafkaTemplate;

import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.dto.notification.NotificationTypeDTO;
import com.tripflow.kafka.messages.AIGenerationMessage;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.service.KafkaService;
import com.tripflow.unit.utils.AITestUtils;
import com.tripflow.unit.utils.NotificationTestUtils;
import com.tripflow.utils.AIItineraryMock;

@Tag("unit")
public class KafkaServiceTest {
    private KafkaTemplate<String, Object> kafkaTemplate;
    private KafkaService kafkaService;

    @SuppressWarnings("unchecked")
    @BeforeEach
    public void setUp() {
        this.kafkaTemplate = mock(KafkaTemplate.class);
        this.kafkaService = new KafkaService(kafkaTemplate);
    }

    @Test
    @DisplayName("Test sendNotificationMessage sends to correct topic")
    public void testSendNotificationMessage() {
        String username = "testUser";
        NotificationMessage message = NotificationTestUtils.createNotificationMessage(
            username, NotificationTypeDTO.ITINERARY_GENERATED
        );

        kafkaService.sendNotificationMessage(message);

        verify(kafkaTemplate, times(1)).send(eq("notification"), eq(message));
    }

    @Test
    @DisplayName("Test sendAIGenerationMessage sends to correct topic")
    public void testSendAIGenerationMessage() {
        String username = "testUser";
        AIGenerationRequest request = AITestUtils.createAIGenerationRequest();
        ExtendedItineraryDTO itinerary = AITestUtils.createItineraryDTO(request);

        AIGenerationMessage message = AITestUtils.createAIGenerationMessage(username, itinerary);

        kafkaService.sendAIGenerationMessage(message);

        verify(kafkaTemplate, times(1)).send(eq("ai-generation"), eq(message));
    }

    @Test
    @DisplayName("Test sendNotificationMessage with failure notification")
    public void testSendFailureNotification() {
        String username = "testUser";
        NotificationMessage message = NotificationTestUtils.createNotificationMessage(
            username, NotificationTypeDTO.ITINERARY_GENERATION_FAILED
        );

        kafkaService.sendNotificationMessage(message);

        verify(kafkaTemplate, times(1)).send("notification", message);
    }

    @Test
    @DisplayName("Test KafkaTemplate is invoked for notification")
    public void testKafkaTemplateInvokedForNotification() {
        String username = "testUser";
        NotificationMessage message = NotificationTestUtils.createNotificationMessage(
            username, NotificationTypeDTO.ITINERARY_GENERATED
        );

        kafkaService.sendNotificationMessage(message);

        verify(kafkaTemplate, times(1)).send(any(String.class), any(Object.class));
    }

    @Test
    @DisplayName("Test KafkaTemplate is invoked for AI generation")
    public void testKafkaTemplateInvokedForAIGeneration() {
        ExtendedItineraryDTO itinerary = AIItineraryMock.getItineraryMock();

        AIGenerationMessage message = new AIGenerationMessage("history_fan", itinerary);

        kafkaService.sendAIGenerationMessage(message);

        verify(kafkaTemplate, times(1)).send(any(String.class), any(Object.class));
    }

    @Test
    @DisplayName("Test multiple notification messages")
    public void testMultipleNotifications() {
        NotificationMessage message1 = NotificationTestUtils.createNotificationMessage(
            "user1", NotificationTypeDTO.ITINERARY_GENERATED
        );
        NotificationMessage message2 = NotificationTestUtils.createNotificationMessage(
            "user2", NotificationTypeDTO.ITINERARY_GENERATION_FAILED
        );
        NotificationMessage message3 = NotificationTestUtils.createNotificationMessage(
            "user3", NotificationTypeDTO.ITINERARY_GENERATED
        );

        kafkaService.sendNotificationMessage(message1);
        kafkaService.sendNotificationMessage(message2);
        kafkaService.sendNotificationMessage(message3);

        verify(kafkaTemplate, times(3)).send(eq("notification"), any(NotificationMessage.class));
    }
}
