package com.tripflow.unit.utils;

import com.tripflow.dto.notification.NotificationTypeDTO;
import com.tripflow.kafka.messages.NotificationMessage;

public class NotificationTestUtils {
    public static NotificationMessage createNotificationMessage(
        String username, NotificationTypeDTO type
    ) {
        return new NotificationMessage(username, "Test Message", type);
    }
}
