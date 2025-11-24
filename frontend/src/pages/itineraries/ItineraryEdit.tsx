import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import type { ExtendedItinerary as Itinerary } from "@/types/itinerary";

import { getItineraryById, updateItinerary } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import Loader from "@/components/shared/Loader";
import InnerTabHeader from "@components/dashboard/InnerTabHeader";
import ItineraryEditForm from "@components/form/ItineraryEditForm";
import { useNotification } from "@/providers/notificationProvider";

export default function ItineraryEdit() {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { notify } = useNotification();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const itineraryId = Number(id);
    if (isNaN(itineraryId)) return <Navigate to="/itineraries" />;

    const handleSave = async (itinerary: Itinerary) => {
        const res = await updateItinerary(itineraryId, itinerary);

        if (!res || !res.id) {
            notify("Ha ocurrido un error al actualizar el itinerario.", "error", {
                title: "Error",
                duration: 5000
            });
            return;
        }

        notify("Itinerario actualizado correctamente.", "success", {
            title: "Éxito",
        });
        navigate(`/itineraries/${itineraryId}`);
    }
    
    useEffect(() => {
        const fetchItinerary = async () => {
            setIsLoading(true);

            const itineraryData = await getItineraryById(itineraryId);
            setItinerary(itineraryData);

            setIsLoading(false);
        };

        fetchItinerary();
    }, [id]);
    
    return (
        <AppLayout>
            <InnerTabHeader title="Editar Itinerario" backUrl={`/itineraries/${id}`} />
            {isLoading && <Loader size={32} variant="dots" />}
            {itinerary && <ItineraryEditForm initialItinerary={itinerary} onSave={handleSave} />}
        </AppLayout>
    );
}
