import { useCallback } from "react";
import type { ItineraryDay } from "@/types/itinerary";

/**
 * Custom hook for managing day operations
 * Handles adding, removing, and reordering days
 */
export function useDayManager(
    days: ItineraryDay[],
    onDaysChange: (newDays: ItineraryDay[]) => void
) {
    const handleAddNewDay = useCallback(() => {
        const newDay: ItineraryDay = {
            day: days.length + 1,
            activities: []
        };

        const newDays = [...days, newDay];
        onDaysChange(newDays);
    }, [days, onDaysChange]);

    return { handleAddNewDay };
}