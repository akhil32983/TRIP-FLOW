import styles from "@styles/components/shared/Notification.module.css";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

import type { NotificationType, Notification, NotificationOptions } from "@/types/notification";
import { generateId } from "@/utils/generateId";

import NotificationRender from "@/components/shared/Notification";

interface NotificationContextType {
    notify: (message: string, type?: NotificationType, options?: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextType>({
    notify: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify = useCallback((
        message: string,
        type: NotificationType = "info",
        options?: NotificationOptions
    ) => {
        const defaultOptions = { autoClose: true, duration: 3000, title: "Notificación" };
        const finalOptions = { ...defaultOptions, ...options };

        const id = generateId();
        const newNotification: Notification = { id, type, message, options: finalOptions };

        setNotifications((prev) => [...prev, newNotification]);

        if (finalOptions.autoClose) {
            setTimeout(() => {
                removeNotification(newNotification.id);
            }, finalOptions.duration);
        }
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isClosing: true } : n))
        );
    }, []);

    const deleteNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <div className={styles.notificationContainer}>
                {notifications.map((notification) => (
                    <NotificationRender
                        key={notification.id}
                        type={notification.type}
                        title={notification.options?.title}
                        message={notification.message}
                        onClose={() => removeNotification(notification.id)}
                        isClosing={notification.isClosing}
                        onExited={() => deleteNotification(notification.id)}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
}