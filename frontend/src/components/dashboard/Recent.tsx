import styles from "@styles/components/dashboard/Recent.module.css";

import { NavLink } from "react-router";

import type { ItineraryStatus } from "@/types/itinerary";

import Button from "@/components/shared/Button";
import Badge from "@components/shared/Badge";
import ProgressBar from "@components/shared/ProgressBar";

export type RecentActivity = {
    id: number;
    place: string;
    date: string;
    status: ItineraryStatus;
    progress: number;
}

const FAKE_ACTIVITIES: RecentActivity[] = [
    {
        id: 1,
        place: "París, Francia",
        date: "2024-06-15",
        status: "ONGOING",
        progress: 75
    }
];

export default function Recent() {
    return (
        <section className={styles.recent}>
            <div className={styles.header}>
                <h2 className={styles.title}>Actividades Recientes</h2>
                <Button style={["secondary"]} label="Ver todas" />
            </div>
            <ul className={styles.activities}>
                {FAKE_ACTIVITIES.map((activity, index) => (
                    <li key={activity.id}>
                        <NavLink
                            to={`/activities/${activity.id}`}
                            className={styles.recentActivity}
                            style={{ "--index": index + 1 } as React.CSSProperties}
                        >
                            <div className={styles.details}>
                                <span className={styles.icon}>🗾</span>
                                <div className={styles.text}>
                                    <h3 className={styles.activityTitle}>{activity.place}</h3>
                                    <p className={styles.activityDate}>{activity.date}</p>
                                </div>
                            </div>
                            <div className={styles.progressBar}>
                                <Badge style="thin" status={activity.status as ItineraryStatus} />
                                <ProgressBar progress={activity.progress} />
                            </div>
                        </NavLink>
                    </li>
                ))}
                {FAKE_ACTIVITIES.length === 0 && (
                    <li className={styles.noActivities}>
                        <p>No hay actividades recientes.</p>
                    </li>
                )}
            </ul>
        </section>
    );
}