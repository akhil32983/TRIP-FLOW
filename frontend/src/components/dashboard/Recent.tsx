import styles from "@styles/components/dashboard/Recent.module.css";

import { useEffect, useState, useCallback } from "react";

import type { Itinerary } from "@/types/itinerary";

import { getUserItineraries } from "@/services/itineraryService";
import { useWebSocketNotifications } from "@/hooks/notifications/useWebSocketNotifications";

import Loader from "@components/shared/Loader";
import Carousel from "../shared/Carousel";
import ItineraryCard from "./itineraries/ItineraryCard";

export default function Recent() {
    const [recentItineraries, setRecentItineraries] = useState<Itinerary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateRecentItineraries = async () => {
        const itinerariesPage = await getUserItineraries({ page: 0, size: 5 });
        if (!itinerariesPage) return;

        if (itinerariesPage.page.length > 0) {
            setRecentItineraries(itinerariesPage.page);
        }
    }

    const fetchRecentItineraries = useCallback(async () => {
        setIsLoading(true);
        await updateRecentItineraries();
        setIsLoading(false);
    }, []);

    useWebSocketNotifications({
        types: ["ITINERARY_GENERATED"],
        onNotification: updateRecentItineraries
    });

    useEffect(() => {
        fetchRecentItineraries();
    }, [fetchRecentItineraries]);

    return (
        <Carousel title="Recientes">
            {recentItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
            {recentItineraries.length === 0 && !isLoading && (
                 <div className={styles.noItineraries}>
                    <p>No hay itinerarios recientes.</p>
                </div>
            )}
            {isLoading && <Loader size={12} />}
        </Carousel>
    );
}