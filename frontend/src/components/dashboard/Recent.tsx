import styles from "@styles/components/dashboard/Recent.module.css";

import { NavLink } from "react-router";

import Button from "@/components/shared/Button";
import Badge from "@components/shared/Badge";
import ProgressBar from "@components/shared/ProgressBar";
import type { ItineraryStatus } from "@/types/itinerary";

const FAKE_ACTIVITIES = [
    {
        id: 1,
        title: "Actividad 1",
        date: "15-22 Mar 2025",
        status: "ONGOING",
        progress: 75
    },
    {
        id: 2,
        title: "Actividad 2",
        date: "10-14 Mar 2025",
        status: "COMPLETED",
        progress: 100
    },
    {
        id: 3,
        title: "Actividad 3",
        date: "10-14 Mar 2025",
        status: "DRAFT",
        progress: 0
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
                                    <h3 className={styles.activityTitle}>{activity.title}</h3>
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
            </ul>
        </section>
    );
}