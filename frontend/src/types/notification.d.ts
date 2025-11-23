export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationOptions {
    title?: string;
    autoClose?: boolean;
    duration?: number;
}

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    options?: NotificationOptions;
    isClosing?: boolean;
}