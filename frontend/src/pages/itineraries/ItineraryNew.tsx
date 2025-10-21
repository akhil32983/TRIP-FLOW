import { createDefaultItinerary } from "@/hooks/useItineraryForm";

import InnerTabHeader from "@/components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";

import AppLayout from "@/layouts/AppLayout";

export default function ItineraryNewPage() {
    return (
        <AppLayout>
            <InnerTabHeader title="Crear Itinerario" backUrl={"/itineraries/"} />
            <ItineraryEditForm initialItinerary={createDefaultItinerary()} />
        </AppLayout>
    );
}