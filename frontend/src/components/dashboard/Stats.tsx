import styles from "@styles/components/dashboard/Stats.module.css";

import InfoCard from "@components/dashboard/InfoCard";
import { CalendarRangeIcon, CircleCheckBigIcon, GlobeIcon } from "lucide-react";

export type StatKey = "activities" | "places_visited" | "total_days";
export interface Stat {
    key: StatKey;
    label: string;
    icon: React.JSX.Element;
    value: number | string;
}

const ICON_SIZE = 20;

const FAKE_STATS: Stat[] = [
    { key: "activities", label: "Actividades", icon: <CircleCheckBigIcon size={ICON_SIZE} />, value: 42 },
    { key: "places_visited", label: "Lugares Visitados", icon: <GlobeIcon size={ICON_SIZE} />, value: 15 },
    { key: "total_days", label: "Días de Actividad", icon: <CalendarRangeIcon size={ICON_SIZE} />, value: 365 },
];

export default function Stats() {
    if (FAKE_STATS.length === 0) return null;
    return (
        <section className={styles.stats}>
            {FAKE_STATS.map((stat) => (
                <InfoCard 
                    key={stat.key}
                    icon={stat.icon}
                    title={stat.label}
                    value={stat.value}
                />
            ))}
        </section>
    );
}