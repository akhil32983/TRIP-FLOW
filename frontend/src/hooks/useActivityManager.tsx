import { useCallback } from "react";
import type { Activity, ItineraryDay } from "@/types/itinerary";

/**
 * Custom hook for managing activity operations
 * Handles adding, removing, and updating activities
 */
export function useActivityManager(
    days: ItineraryDay[],
    onDaysChange: (newDays: ItineraryDay[]) => void
) {
    const createDefaultActivity = (): Activity => ({
        activity: "",
        details: "",
        location: {
            name: "",
            address: "",
            coordinates: {
                latitude: 0,
                longitude: 0
            }
        },
        time: "",
        duration: ""
    });

    const handleAddActivity = useCallback((dayIndex: number) => {
        const newActivity = createDefaultActivity();

        const newDays = days.map((day, index) =>
            index === dayIndex
                ? { ...day, activities: [...day.activities, newActivity] }
                : day
        );

        onDaysChange(newDays);
    }, [days, onDaysChange]);

    const handleRemoveActivity = useCallback((dayIndex: number, activityIndex: number) => {
        const newDays = days.map((day, index) =>
            index === dayIndex
                ? {
                    ...day,
                    activities: day.activities.filter((_, actIndex) => actIndex !== activityIndex)
                }
                : day
        );

        onDaysChange(newDays);
    }, [days, onDaysChange]);

    const handleUpdateActivity = useCallback((
        dayIndex: number,
        activityIndex: number,
        field: keyof Activity,
        value: any
    ) => {
        const newDays = days.map((day, index) =>
            index === dayIndex
                ? {
                    ...day,
                    activities: day.activities.map((activity, actIndex) =>
                        actIndex === activityIndex
                            ? { ...activity, [field]: value }
                            : activity
                    )
                }
                : day
        );

        onDaysChange(newDays);
    }, [days, onDaysChange]);

    const handleUpdateActivityLocation = useCallback((
        dayIndex: number,
        activityIndex: number,
        field: keyof Activity['location'] | 'latitude' | 'longitude',
        value: any
    ) => {
        const newDays = days.map((day, index) =>
            index === dayIndex
                ? {
                    ...day,
                    activities: day.activities.map((activity, actIndex) => {
                        if (actIndex !== activityIndex) return activity;

                        // Handle coordinates separately (nested structure)
                        if (field === 'latitude' || field === 'longitude') {
                            return {
                                ...activity,
                                location: {
                                    ...activity.location,
                                    coordinates: {
                                        ...activity.location.coordinates,
                                        [field]: parseFloat(value)
                                    }
                                }
                            };
                        }

                        // Handle direct location fields (name, address)
                        return {
                            ...activity,
                            location: {
                                ...activity.location,
                                [field]: value
                            }
                        };
                    })
                }
                : day
        );

        onDaysChange(newDays);
    }, [days, onDaysChange]);

    return {
        handleAddActivity,
        handleRemoveActivity,
        handleUpdateActivity,
        handleUpdateActivityLocation
    };
}
