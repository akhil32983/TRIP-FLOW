import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import type { ExtendedItinerary as Itinerary } from "@/types/itinerary";

import { getItineraryById } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import Loader from "@/components/shared/Loader";
import InnerTabHeader from "@components/dashboard/InnerTabHeader";
import ExtendedItinerary from "@components/dashboard/ExtendedItinerary";

export default function ItineraryDetailPage() {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const { id } = useParams<{ id: string }>();
    const itineraryId = Number(id);
    if (isNaN(itineraryId)) return <Navigate to="/itineraries" />;

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
            <InnerTabHeader title={itinerary?.place || "Cargando..."} backUrl="/itineraries" />
            {isLoading && <Loader size={32} variant="dots" />}
            {itinerary && <ExtendedItinerary itinerary={itinerary} />}
        </AppLayout>
    );
}