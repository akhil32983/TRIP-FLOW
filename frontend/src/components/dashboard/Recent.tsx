import styles from "@styles/components/dashboard/Recent.module.css";

import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import type { Itinerary, ItineraryStatus } from "@/types/itinerary";

import { getUserItineraries } from "@/services/itineraryService";

import Button from "@components/shared/Button";
import Badge from "@components/shared/Badge";
import ProgressBar from "@components/shared/ProgressBar";
import Loader from "@components/shared/Loader";

export type RecentActivity = {
    id: number;
    place: string;
    date: string;
    status: ItineraryStatus;
}

/**
 * Calculates progress percentage based on itinerary status.
 * 
 * @param status The status of the itinerary.
 * @returns Progress percentage as a number between 0 and 100.
 */
function calculateProgress(status: ItineraryStatus): number {
    if (status === "COMPLETED") return 100;
    if (status === "ONGOING") return 75;
    if (status === "ACTIVE") return 50;
    return 0;
}

export default function Recent() {
    const [recentItineraries, setRecentItineraries] = useState<Itinerary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecentItineraries = async () => {
            setIsLoading(true);
            const itinerariesPage = await getUserItineraries({ page: 0, size: 5 });
            if (!itinerariesPage) return;

            if (itinerariesPage.page.length > 0) {
                setRecentItineraries(itinerariesPage.page);
            }

            setIsLoading(false);
        }

        fetchRecentItineraries();
    }, []);

    return (
        <section className={styles.recent}>
            <div className={styles.header}>
                <h2 className={styles.title}>Itinerarios recientes</h2>
                <Button style={["secondary"]} label="Ver todos" to="/itineraries"/>
            </div>

            {isLoading && <Loader size={12} />}

            {!isLoading && (
                <ul className={styles.activities}>
                    {recentItineraries.map((activity, index) => (
                        <li key={activity.id}>
                            <NavLink
                                to={`/itineraries/${activity.id}`}
                                className={styles.recentActivity}
                                style={{ "--index": index + 1 } as React.CSSProperties}
                            >
                                <div className={styles.details}>
                                    <span className={styles.icon}>🗾</span>
                                    <div className={styles.text}>
                                        <div className={styles.mainInfo}>
                                            <h3 className={styles.activityTitle}>{activity.title}</h3>
                                            <p className={styles.activityPlace}>📍 {activity.place}</p>
                                        </div>
                                        <div className={styles.metadata}>
                                            <p className={styles.activityDate}>{activity.date}</p>
                                            {activity.tags && activity.tags.length > 0 && (
                                                <div className={styles.tags}>
                                                    {activity.tags.map((tag, i) => (
                                                        <Badge key={i} title={tag} style="thin" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.progressBar}>
                                    <Badge style="thin" status={activity.status as ItineraryStatus} />
                                    <ProgressBar progress={calculateProgress(activity.status)} />
                                </div>
                            </NavLink>
                        </li>
                    ))}
                    {recentItineraries.length === 0 && (
                        <li className={styles.noActivities}>
                            <p>No hay actividades recientes.</p>
                        </li>
                    )}
                </ul>
            )}
        </section>
    );
}