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
            label: "Activity",
            type: "text",
            value: activity.activity,
            placeholder: "Visit the Eiffel Tower",
            icon: createElement(ActivityIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-start-time`,
            label: "Start time",
            type: "time",
            value: activity.time,
            icon: createElement(ClockIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-duration`,
            label: "Duration",
            type: "text",
            value: activity.duration,
            placeholder: "2 hours",
            icon: createElement(Hourglass, { size: ICON_SIZE })
        }
    ];

    const detailsField: Field = {
        name: `activity-${activityIndex}-details`,
        label: "Description",
        type: "textarea",
        value: activity.details,
        placeholder: "What makes this activity special? Any notes for your future self...",
    };

    const locationFields: Field[] = [
        {
            name: `activity-${activityIndex}-location-name`,
            label: "Place",
            type: "text",
            value: activity.location.name,
            placeholder: "Eiffel Tower",
            icon: createElement(MapPinIcon, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-address`,
            label: "Address",
            type: "text",
            value: activity.location.address,
            placeholder: "Champ de Mars, 75007 Paris, France",
            icon: createElement(Map, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-latitude`,
            label: "Latitude",
            type: "number",
            value: activity.location.coordinates.latitude ?? 0,
            placeholder: "48.8584",
            step: "any",
            icon: createElement(Locate, { size: ICON_SIZE })
        },
        {
            name: `activity-${activityIndex}-location-longitude`,
            label: "Longitude",
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
