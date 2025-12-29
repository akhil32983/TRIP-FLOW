package com.tripflow.unit;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.notification.NotificationTypeDTO;
import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.mapper.NotificationMapper;
import com.tripflow.model.Notification;
import com.tripflow.repository.NotificationRepository;
import com.tripflow.service.NotificationService;

@Tag("unit")
public class NotificationServiceTest {

    private NotificationRepository notificationRepository;
    private NotificationMapper notificationMapper;
    private NotificationService notificationService;

    @BeforeEach
    public void setUp() {
        this.notificationRepository = mock(NotificationRepository.class);
        this.notificationMapper = mock(NotificationMapper.class);
        this.notificationService = new NotificationService(notificationRepository, notificationMapper);
    }

    @Test
    @DisplayName("NotificationService should save notification")
    public void testSaveNotification() {
        NotificationMessage message = new NotificationMessage("user", "message", NotificationTypeDTO.ITINERARY_GENERATED);
        Notification notification = new Notification();

        when(notificationMapper.toNotification(message)).thenReturn(notification);
        
        notificationService.saveNotification(message);

        verify(notificationMapper).toNotification(message);
        verify(notificationRepository).save(notification);
    }
}
