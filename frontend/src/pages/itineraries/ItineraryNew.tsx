import { useNavigate } from "react-router";

import { createDefaultItinerary } from "@/hooks/useItineraryForm";

import type { ExtendedItinerary } from "@/types/itinerary";

import { createItinerary } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import InnerTabHeader from "@/components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";

export default function ItineraryNewPage() {
    const navigate = useNavigate();

    const handleSave = async (itinerary: ExtendedItinerary) => {
        const res = await createItinerary(itinerary);
        navigate(`/itineraries/${res.id}`);
    };
    
    return (
        <AppLayout>
            <InnerTabHeader title="Crear Itinerario" backUrl={"/itineraries/"} />
            <ItineraryEditForm initialItinerary={createDefaultItinerary()} onSave={handleSave} />
        </AppLayout>
    );
}