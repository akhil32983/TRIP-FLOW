import { useCallback, createElement } from "react";

import type { ExtendedItinerary } from "@/types/itinerary";

import { Tag, MapPin, Users, Euro, Calendar, Plane } from "lucide-react";
import type { Field } from "@/components/form/FormGroup";

/**
 * Hook used to manage form fields for basic itinerary information
 * Provides fields for trip icon, title, destination, number of people, budget, and start
 */
export function useBasicInfoFormFields(
    itinerary: ExtendedItinerary,
    onUpdateBasicInfo: (field: keyof ExtendedItinerary, value: any) => void
) {
    const handleFieldChange = useCallback((field: keyof ExtendedItinerary, type: 'string' | 'number' = 'string') => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
        onUpdateBasicInfo(field, value);
    }, [onUpdateBasicInfo]);

    const basicInfoFields: Field[] = [
        {
            name: "trip-icon",
            label: "Icono del viaje",
            type: "text",
            value: itinerary.icon,
            placeholder: "🗼 Elige un emoji",
            icon: createElement(Tag, { size: 16 }),
            max: 2
        },
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
            label: "Número de viajeros",
            type: "number",
            value: itinerary.people,
            placeholder: "¿Cuántas personas?",
            icon: createElement(Users, { size: 16 }),
            min: 1,
            max: 50
        },
        {
            name: "trip-budget",
            label: "Presupuesto (€)",
            type: "number",
            value: itinerary.budget,
            placeholder: "Presupuesto total",
            icon: createElement(Euro, { size: 16 }),
            min: 0
        },
        {
            name: "trip-date",
            label: "Fecha de inicio",
            type: "date",
            value: itinerary.date,
            icon: createElement(Calendar, { size: 16 })
        }
    ];

    const getFieldHandler = useCallback((fieldName: string) => {
        switch (fieldName) {
            case 'trip-icon':
                return handleFieldChange('icon');
            case 'trip-title':
                return handleFieldChange('title');
            case 'trip-destination':
                return handleFieldChange('place');
            case 'trip-people':
                return handleFieldChange('people', 'number');
            case 'trip-budget':
                return handleFieldChange('budget', 'number');
            case 'trip-date':
                return handleFieldChange('date');
            default:
                return handleFieldChange('title');
        }
    }, [handleFieldChange]);

    return {
        basicInfoFields,
        getFieldHandler
    };
}
