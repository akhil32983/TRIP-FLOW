import { useEffect } from "react";

import { useWebSocket } from "@/providers/webSocketProvider";
import { useNotification } from "@/providers/notificationProvider";
import { useAuth } from "@/providers/authProvider";

import type { Notification } from "@/types/notification";

import { getNotificationDetails } from "@/utils/notificationUtils";

/**
 * Hook to subscribe to WebSocket notifications and display them
 */
export const useNotifications = (duration: number = 3000) => {
    const ws = useWebSocket();

    const { notify } = useNotification();
    const { user } = useAuth();

    useEffect(() => {
        if (!ws?.isConnected) return;
        if (!user) return;

        const destination = `/user/${user.username}/queue/notifications`;

        const subscription = ws.subscribe(destination, (message) => {
            try {
                const notification: Notification = JSON.parse(message.body);
                
                const details = getNotificationDetails(notification.type);
                
                notify(details.message, details.type, {
                    title: details.title,
                    duration,
                });
            } catch (error) {
                // Do not notify on error
            }
        });

        return () => subscription?.unsubscribe();
    }, [ws?.isConnected, ws, notify, user, duration]);
};
