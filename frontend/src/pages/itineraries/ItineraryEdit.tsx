import { useParams } from "react-router";

import type { ExtendedItinerary } from "@/types/itinerary";

import AppLayout from "@/layouts/AppLayout";
import InnerTabHeader from "@components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@components/form/ItineraryEditForm";

const FAKE_ITINERARY: ExtendedItinerary = {
    id: 1,
    icon: "🗼",
    title: "París: Ciudad de la Luz y el Amor",
    place: "París, Francia",
    people: 2,
    budget: 1450,
    date: "2025-08-15",
    status: "ACTIVE",
    countDays: 4,
    tags: ["romance", "arte", "gastronomía", "arquitectura", "moda"],
    days: [
        {
            day: 1,
            activities: [
                {
                    activity: "Visita a la Torre Eiffel",
                    details: "Ascenso a la Torre Eiffel, el símbolo más famoso de París.",
                    location: {
                        name: "Torre Eiffel",
                        address: "Champ de Mars, 5 Avenue Anatole France, 75007 París, Francia",
                        latitude: 48.8584,
                        longitude: 2.2945
                    },
                    time: "09:00",
                    duration: "2.5 horas"
                }
            ]
        }
    ]
};

export default function ItineraryEdit() {
    const { id } = useParams<{ id: string }>();
    
    // When connected to a real backend, fetch the itinerary by ID here.
    const itinerary = FAKE_ITINERARY;
    
    return (
        <AppLayout>
            <InnerTabHeader title="Editar Itinerario" backUrl={`/itineraries/${id}`} />
            <ItineraryEditForm initialItinerary={itinerary} />
        </AppLayout>
    );
}
