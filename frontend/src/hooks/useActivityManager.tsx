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
        activity: "Nueva Actividad",
        details: "Añadir descripción de la actividad aquí",
        location: {
            name: "Nombre del Lugar",
            address: "Dirección Completa",
            latitude: 0,
            longitude: 0
        },
        time: "10:00",
        duration: "1 hora"
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
        field: keyof Activity['location'], 
        value: any
    ) => {
        const newDays = days.map((day, index) => 
            index === dayIndex 
                ? {
                    ...day,
                    activities: day.activities.map((activity, actIndex) => 
                        actIndex === activityIndex 
                            ? { 
                                ...activity, 
                                location: { ...activity.location, [field]: value }
                            }
                            : activity
                    )
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
