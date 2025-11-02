import { useCallback, createElement } from "react";

import type { Activity } from "@/types/itinerary";
import type { Field } from "@/components/form/FormGroup";

import { Clock } from "lucide-react";

/**
 * Custom hook to manage form fields for an activity
 * Provides fields for activity name, start time, duration, and details
 */
export function useActivityFormFields(
    activity: Activity,
    activityIndex: number,
    onActivityUpdate: (field: keyof Activity, value: any) => void
) {
    const handleFieldChange = useCallback((field: keyof Activity) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        onActivityUpdate(field, e.target.value);
    }, [onActivityUpdate]);

    const clockIcon = createElement(Clock, { size: 16 });

    const activityFields: Field[] = [
        {
            name: `activity-${activityIndex}-name`,
            label: "¿Qué vas a hacer?",
            type: "text",
            value: activity.activity,
            placeholder: "Visitar la Torre Eiffel",
        },
        {
            name: `activity-${activityIndex}-start-time`,
            label: "Hora de inicio",
            type: "time",
            value: activity.time,
            icon: clockIcon,
        },
        {
            name: `activity-${activityIndex}-duration`,
            label: "¿Cuánto tiempo?",
            type: "text",
            value: activity.duration,
            placeholder: "2 horas",
            icon: clockIcon
        }
    ];

    const detailsField: Field = {
        name: `activity-${activityIndex}-details`,
        label: "Descripción y Notas",
        type: "textarea",
        value: activity.details,
        placeholder: "¿Qué hace especial a esta actividad? ¿Algún consejo o nota para tu yo futuro...",
    };

    const locationFields: Field[] = [
        {
            name: `activity-${activityIndex}-location-name`,
            label: "Nombre del lugar",
            type: "text",
            value: activity.location.name,
            placeholder: "Torre Eiffel",
        },
        {
            name: `activity-${activityIndex}-location-address`,
            label: "Dirección completa",
            type: "text",
            value: activity.location.address,
            placeholder: "Champ de Mars, 75007 Paris, France"
        },
        {
            name: `activity-${activityIndex}-location-latitude`,
            label: "Latitud (GPS)",
            type: "number",
            value: activity.location.coordinates.latitude ?? 0,
            placeholder: "48.8584",
            step: "any",
        },
        {
            name: `activity-${activityIndex}-location-longitude`,
            label: "Longitud (GPS)",
            type: "number",
            value: activity.location.coordinates.longitude ?? 0,
            placeholder: "2.2945",
            step: "any"
        }
    ];

    const getFieldHandler = useCallback((fieldName: string) => {
        if (fieldName.includes('start-time')) return handleFieldChange('time');
        if (fieldName.includes('duration')) return handleFieldChange('duration');
        if (fieldName.includes('details')) return handleFieldChange('details');
        if (fieldName.includes('location')) return handleFieldChange('location');
        return handleFieldChange('activity');
    }, [handleFieldChange]);

    return { activityFields, detailsField, locationFields, getFieldHandler };
}
