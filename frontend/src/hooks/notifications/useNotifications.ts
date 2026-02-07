import { useCallback } from "react";

import { useWebSocketNotifications } from "@/hooks/notifications/useWebSocketNotifications";
import { useNotification } from "@/providers/notificationProvider";

import type { Notification } from "@/types/notification";

import { getNotificationDetails } from "@/utils/notificationUtils";

/**
 * Hook to subscribe to WebSocket notifications and display them as UI notifications
 * 
 * @param duration - Duration in milliseconds to show the notification (default: 3000ms)
 */
export const useNotifications = (duration: number = 3000) => {
    const { notify } = useNotification();

    const handleNotification = useCallback((notification: Notification) => {
        const details = getNotificationDetails(notification.type);
        
        notify(details.message, details.type, {
            title: details.title,
            duration,
        });
    }, [notify, duration]);

    // Listen to all notifications (empty types array)
    useWebSocketNotifications({
        onNotification: handleNotification
    });
};
