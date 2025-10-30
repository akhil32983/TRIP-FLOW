import { createDefaultItinerary } from "@/hooks/useItineraryForm";

import type { ExtendedItinerary } from "@/types/itinerary";

import { createItinerary } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import InnerTabHeader from "@/components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";

export default function ItineraryNewPage() {
    const handleSave = async (itinerary: ExtendedItinerary) => {
        await createItinerary(itinerary);
    };
    
    return (
        <AppLayout>
            <InnerTabHeader title="Crear Itinerario" backUrl={"/itineraries/"} />
            <ItineraryEditForm initialItinerary={createDefaultItinerary()} onSave={handleSave} />
        </AppLayout>
    );
}