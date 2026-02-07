export type NotificationType = "ITINERARY_GENERATED" | "ITINERARY_GENERATION_FAILED";

export interface Notification {
    username: string;
    message: string;
    type: NotificationType;
    timestamp: string;
}