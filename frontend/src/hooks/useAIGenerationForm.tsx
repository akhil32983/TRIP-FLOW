import { useState } from "react";
import { MapPin, Calendar, Palette, Euro, Home } from "lucide-react";

import type { Field } from "@/types/form";
import type { AIGenerationRequest } from "@/types/ai";

const defaultForm: AIGenerationRequest = {
    aiPrompt: "", destination: "", style: "",
    budget: 500, lodging: "hotel", duration: "", interests: []
}

export const useAIGenerationForm = () => {
    const [form, setForm] = useState<AIGenerationRequest>(defaultForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value
        }));
    };

    const handleInterestsChange = (newInterests: string[]) => {
        setForm(prev => ({
            ...prev,
            interests: newInterests
        }));
    };

    const resetForm = () => {
        setForm({...defaultForm});
    };

    const lodgingOptions = [
        { value: "hostel", label: "Hostel" },
        { value: "hotel", label: "Hotel" },
        { value: "apartment", label: "Apartamento" },
        { value: "resort", label: "Resort" },
        { value: "camping", label: "Camping" }
    ];

    const advancedFields: Field[] = [
        {
            type: "text",
            name: "destination",
            label: "Destino",
            value: form.destination,
            placeholder: "Ej: París, Francia",
            icon: <MapPin size={18} />
        },
        {
            type: "text",
            name: "duration",
            label: "Duración",
            value: form.duration,
            placeholder: "Ej: 3 días, 1 semana",
            icon: <Calendar size={18} />
        },
        {
            type: "text",
            name: "style",
            label: "Estilo de Viaje",
            value: form.style,
            placeholder: "Ej: Romántico, Aventura...",
            icon: <Palette size={18} />
        },
        {
            type: "number",
            name: "budget",
            label: "Presupuesto (€)",
            value: form.budget,
            placeholder: "500",
            icon: <Euro size={18} />
        },
        {
            type: "select",
            name: "lodging",
            label: "Alojamiento",
            options: lodgingOptions,
            value: form.lodging,
            icon: <Home size={18} />
        }
    ];

    return {
        form,
        handleChange,
        handleInterestsChange,
        resetForm,
        advancedFields
    };
};
