import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

import { useNotification } from "@/providers/notificationProvider";
import { createDefaultItinerary } from "@/hooks/useItineraryForm";

import type { ExtendedItinerary } from "@/types/itinerary";

import { createItinerary } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import ItineraryEditor from "@/components/dashboard/itineraries/ItineraryEditor";

export default function ItineraryNewPage() {
    const [isSaving, setIsSaving] = useState(false);

    const { notify } = useNotification();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const editorType = searchParams.get("editorType") === "ai"
        ? "ai"
        : "manual";

    const handleSave = async (itinerary: ExtendedItinerary) => {
        setIsSaving(true);
        const res = await createItinerary(itinerary);
        setIsSaving(false);

        if (!res || !res.id) {
            notify("Ha ocurrido un error al crear el itinerario.", "error", {
                title: "Error",
                duration: 5000
            });
            return;
        }

        notify("Itinerario creado correctamente.", "success", {
            title: "Éxito",
        });
        navigate(`/itineraries/${res.id}`);
    };

    return (
        <AppLayout>
            <ItineraryEditor
                key={editorType}
                type={editorType}
                initialItinerary={createDefaultItinerary()}
                onSave={handleSave}
                isSaving={isSaving}
                back={{ url: "/itineraries/", label: "Cancelar" }}
            />
        </AppLayout>
    );
}