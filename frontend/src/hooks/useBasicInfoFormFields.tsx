import { useCallback, createElement } from "react";

import type { ExtendedItinerary } from "@/types/itinerary";

import { MapPin, Users, Euro, Calendar, Plane, BatteryMedium } from "lucide-react";
import type { Field } from "@/components/form/FormGroup";
import { formatStatus } from "@/utils/formatUtils";

/**
 * Hook used to manage form fields for basic itinerary information
 * Provides fields for trip icon, title, destination, number of people, budget, and start
 */
export function useBasicInfoFormFields(
    itinerary: ExtendedItinerary,
    onUpdateBasicInfo: (field: keyof ExtendedItinerary, value: any) => void
) {
    const handleFieldChange = useCallback((field: keyof ExtendedItinerary, type: 'string' | 'number' | 'float' = 'string') => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        let value;

        if (type === 'float') value = parseFloat(e.target.value) || 0;
        else if (type === 'number') value = parseInt(e.target.value) || 0;
        else value = e.target.value;

        onUpdateBasicInfo(field, value);
    }, [onUpdateBasicInfo]);

    const basicInfoFields: Field[] = [
        {
            name: "trip-title",
            label: "Título del viaje",
            type: "text",
            value: itinerary.title,
            placeholder: "Mi increíble viaje a...",
            icon: createElement(Plane, { size: 16 }),
            required: true
        },
        {
            name: "trip-destination",
            label: "Destino",
            type: "text",
            value: itinerary.place,
            placeholder: "Ciudad, País",
            icon: createElement(MapPin, { size: 16 }),
            required: true
        },
        {
            name: "trip-people",
            label: "Viajeros",
            type: "number",
            value: itinerary.people,
            placeholder: "¿Cuántas personas?",
            icon: createElement(Users, { size: 16 }),
            min: 1,
            max: 50
        },
        {
            name: "trip-budget",
            label: "Presupuesto",
            type: "number",
            value: itinerary.budget,
            placeholder: "Presupuesto total",
            icon: createElement(Euro, { size: 16 }),
            step: "any"
        },
        {
            name: "trip-date",
            label: "Fecha de inicio",
            type: "date",
            value: itinerary.date,
            icon: createElement(Calendar, { size: 16 })
        },
        {
            name: "trip-status",
            label: "Estado",
            type: "select",
            value: itinerary.status,
            options: [
                { value: "DRAFT", label: formatStatus("DRAFT") },
                { value: "PLANNED", label: formatStatus("PLANNED") },
                { value: "ONGOING", label: formatStatus("ONGOING") },
                { value: "COMPLETED", label: formatStatus("COMPLETED") }
            ],
            icon: createElement(BatteryMedium, { size: 16 })
        }
    ];

    const getFieldHandler = useCallback((fieldName: string) => {
        switch (fieldName) {
            case 'trip-title':
                return handleFieldChange('title');
            case 'trip-destination':
                return handleFieldChange('place');
            case 'trip-people':
                return handleFieldChange('people', 'number');
            case 'trip-budget':
                return handleFieldChange('budget', 'float');
            case 'trip-date':
                return handleFieldChange('date');
            case 'trip-status':
                return handleFieldChange('status');
            default:
                return handleFieldChange('title');
        }
    }, [handleFieldChange]);

    return {
        basicInfoFields,
        getFieldHandler
    };
}
