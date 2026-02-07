package com.tripflow.unit;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.tripflow.dto.notification.NotificationTypeDTO;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.service.NotificationHandlerService;
import com.tripflow.service.NotificationService;

@Tag("unit")
public class NotificationHandlerServiceTest {

    private SimpMessagingTemplate messagingTemplate;
    private NotificationService notificationService;
    private NotificationHandlerService notificationHandlerService;

    @BeforeEach
    public void setUp() {
        this.messagingTemplate = mock(SimpMessagingTemplate.class);
        this.notificationService = mock(NotificationService.class);
        this.notificationHandlerService = new NotificationHandlerService(messagingTemplate, notificationService);
    }

    @Test
    @DisplayName("NotificationHandlerService should handle notification")
    public void testHandleNotification() {
        // Arrange
        String username = "testuser";
        NotificationMessage message = new NotificationMessage(username, "message", NotificationTypeDTO.ITINERARY_GENERATED);

        // Act
        notificationHandlerService.handleNotification(message);

        // Assert
        verify(notificationService).saveNotification(message);
        verify(messagingTemplate).convertAndSendToUser(
            eq(username),
            eq("/queue/notifications"),
            eq(message)
        );
    }
}
