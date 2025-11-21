package com.tripflow.unit.utils;

import com.tripflow.kafka.messages.NotificationMessage;

public class NotificationTestUtils {
    public static NotificationMessage createNotificationMessage(
        String username, boolean status
    ) {
        return new NotificationMessage(username, "Test Message", status);
    }
}
