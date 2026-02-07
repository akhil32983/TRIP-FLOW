import { useCallback, createElement } from "react";

import type { Activity } from "@/types/itinerary";
import type { Field } from "@/components/form/FormGroup";

import {
    ActivityIcon, ClockIcon, MapPinIcon,
    Hourglass, Map, Locate
} from "lucide-react";

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

    const ICON_SIZE = 16;

    const activityFields: Field[] = [
        {
            name: `activity-${activityIndex}-name`,
            label: "Actividad",
            type: "text",
            value: activity.activity,
            placeholder: "Visitar la Torre Eiffel",
            icon: createElement(ActivityIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-start-time`,
            label: "Hora de inicio",
            type: "time",
            value: activity.time,
            icon: createElement(ClockIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-duration`,
            label: "Duración",
            type: "text",
            value: activity.duration,
            placeholder: "2 horas",
            icon: createElement(Hourglass, { size: ICON_SIZE })
        }
    ];

    const detailsField: Field = {
        name: `activity-${activityIndex}-details`,
        label: "Descripción",
        type: "textarea",
        value: activity.details,
        placeholder: "¿Qué hace especial a esta actividad? ¿Algún consejo o nota para tu yo futuro...",
    };

    const locationFields: Field[] = [
        {
            name: `activity-${activityIndex}-location-name`,
            label: "Lugar",
            type: "text",
            value: activity.location.name,
            placeholder: "Torre Eiffel",
            icon: createElement(MapPinIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-address`,
            label: "Dirección",
            type: "text",
            value: activity.location.address,
            placeholder: "Champ de Mars, 75007 Paris, France",
            icon: createElement(Map, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-latitude`,
            label: "Latitud",
            type: "number",
            value: activity.location.coordinates.latitude ?? 0,
            placeholder: "48.8584",
            step: "any",
            icon: createElement(Locate, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-longitude`,
            label: "Longitud",
            type: "number",
            value: activity.location.coordinates.longitude ?? 0,
            placeholder: "2.2945",
            step: "any",
            icon: createElement(Locate, { size: ICON_SIZE })
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
