import { useNavigate } from "react-router";

import { useNotification } from "@/providers/notificationProvider";
import { createDefaultItinerary } from "@/hooks/useItineraryForm";

import type { ExtendedItinerary } from "@/types/itinerary";

import { createItinerary } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import InnerTabHeader from "@/components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";

export default function ItineraryNewPage() {
    const { notify } = useNotification();
    const navigate = useNavigate();

    const handleSave = async (itinerary: ExtendedItinerary) => {
        const res = await createItinerary(itinerary);

        if (!res.id) {
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
            <InnerTabHeader title="Crear Itinerario" backUrl={"/itineraries/"} />
            <ItineraryEditForm initialItinerary={createDefaultItinerary()} onSave={handleSave} />
        </AppLayout>
    );
}