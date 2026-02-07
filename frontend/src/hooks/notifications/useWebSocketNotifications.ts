import { useEffect } from "react";

import { useWebSocket } from "@/providers/webSocketProvider";
import { useAuth } from "@/providers/authProvider";

import type { Notification, NotificationType } from "@/types/notification.d";

interface UseWebSocketNotificationsOptions {
    /**
     * Array of notification types to filter. If empty or undefined, all notifications trigger the callback.
     */
    types?: NotificationType[];
    /**
     * Callback function to execute when a matching notification arrives
     */
    onNotification?: (notification: Notification) => void;
}

/**
 * Generic hook to listen for WebSocket notifications with optional type filtering
 * 
 * @param options - Configuration object with types filter and callback
 * @example
 * // Listen to all notifications
 * useWebSocketNotifications({ onNotification: handleNotification });
 * 
 * @example
 * // Listen only to itinerary-related notifications
 * useWebSocketNotifications({ 
 *   types: ["ITINERARY_GENERATED", "ITINERARY_GENERATION_FAILED"],
 *   onNotification: refreshItineraries 
 * });
 */
export const useWebSocketNotifications = (options?: UseWebSocketNotificationsOptions) => {
    const ws = useWebSocket();
    const { user } = useAuth();

    const { types = [], onNotification } = options || {};

    useEffect(() => {
        if (!ws?.client?.connected) return;
        if (!user) return;
        if (!onNotification) return;

        const destination = `/user/${user.username}/queue/notifications`;

        const subscription = ws.subscribe(destination, (message) => {
            try {
                const notification: Notification = JSON.parse(message.body);
                
                // If types array is empty, trigger for all notifications
                // Otherwise, only trigger if notification type is in the filter
                const shouldTrigger = types.length === 0 || types.includes(notification.type);

                if (shouldTrigger) {
                    onNotification(notification);
                }
            } catch (error) {
                // Silently ignore parsing errors
            }
        });

        return () => subscription?.unsubscribe();
    }, [ws?.client?.connected, ws, user, onNotification, types]);
};
