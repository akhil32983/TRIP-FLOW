import styles from "@styles/components/dashboard/Stats.module.css";

import InfoCard from "@components/dashboard/InfoCard";
import { CalendarRangeIcon, CircleCheckBigIcon, GlobeIcon, LandPlotIcon } from "lucide-react";

const ICON_SIZE = 20;

const FAKE_STATS = [
    { key: "completed_activities", label: "Actividades Completadas", icon: <CircleCheckBigIcon size={ICON_SIZE} />, value: 42 },
    { key: "places_visited", label: "Lugares Visitados", icon: <GlobeIcon size={ICON_SIZE} />, value: 15 },
    { key: "total_days", label: "Días de Actividad", icon: <CalendarRangeIcon size={ICON_SIZE} />, value: 365 },
    { key: "total_distance", label: "Distancia Total Recorrida", icon: <LandPlotIcon size={ICON_SIZE} />, value: "1500 Km" }
];

export default function Stats() {
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