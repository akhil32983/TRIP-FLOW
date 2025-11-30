import styles from "@styles/components/dashboard/Recent.module.css";

import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router";

import type { Itinerary, ItineraryStatus } from "@/types/itinerary";

import { getUserItineraries } from "@/services/itineraryService";
import { useWebSocketNotifications } from "@/hooks/notifications/useWebSocketNotifications";

import Button from "@components/shared/Button";
import Badge from "@components/shared/Badge";
import ProgressBar from "@components/shared/ProgressBar";
import Loader from "@components/shared/Loader";
import { MapPinIcon } from "lucide-react";

function calculateProgress(status: ItineraryStatus): number {
    if (status === "COMPLETED") return 100;
    if (status === "ONGOING") return 75;
    if (status === "PLANNED") return 25;
    return 0;
}

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
        <section className={styles.recent}>
            <div className={styles.header}>
                <h2 className={styles.title}>Itinerarios recientes</h2>
                {!isLoading && recentItineraries.length > 0 && (
                    <Button style={["secondary"]} label="Ver todos" to="/itineraries"/>
                )}
            </div>

            {isLoading && <Loader size={12} />}

            {!isLoading && (
                <ul className={styles.itineraries}>
                    {recentItineraries.map((itinerary) => (
                        <li key={itinerary.id}>
                            <NavLink
                                to={`/itineraries/${itinerary.id}`}
                                className={styles.recentItinerary}
                            >
                                <div className={styles.details}>
                                    <div className={styles.text}>
                                        <div className={styles.mainInfo}>
                                            <h3 className={styles.itineraryTitle}>{itinerary.title}</h3>
                                            <p className={styles.itineraryPlace}>
                                                <MapPinIcon className={styles.icon} />
                                                {itinerary.place}
                                            </p>
                                        </div>
                                        <div className={styles.metadata}>
                                            {itinerary.tags && itinerary.tags.length > 0 && (
                                                <div className={styles.tags}>
                                                    {itinerary.tags.map((tag, i) => (
                                                        <Badge key={i} title={`#${tag}`} style="thin" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.progressBar}>
                                    <Badge style="thin" status={itinerary.status as ItineraryStatus} />
                                    <ProgressBar progress={calculateProgress(itinerary.status)} />
                                </div>
                            </NavLink>
                        </li>
                    ))}
                    {recentItineraries.length === 0 && (
                        <li className={styles.noItineraries}>
                            <p>No hay itinerarios recientes.</p>
                        </li>
                    )}
                </ul>
            )}
        </section>
    );
}