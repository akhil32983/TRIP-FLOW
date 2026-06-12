import styles from "@styles/components/dashboard/Stats.module.css";

import { useEffect, useState, useCallback } from "react";

import type { UserStat, UserStatKey } from "@/types/stats";
import { getUserStats } from "@/services/statsService";
import { useWebSocketNotifications } from "@/hooks/notifications/useWebSocketNotifications";

import { CalendarIcon, GlobeIcon, ZapIcon } from "lucide-react";
import Loader from "@components/shared/Loader";
import InfoCard from "@components/dashboard/InfoCard";

export interface Stat {
    key: UserStatKey;
    label: string;
    icon: React.JSX.Element;
    value: number | string;
}

const ICON_SIZE = 20;

const statsRender = {
    activities: {
        label: "Activities",
        icon: <ZapIcon size={ICON_SIZE} />
    },
    places_visited: {
        label: "Locations",
        icon: <GlobeIcon size={ICON_SIZE} />
    },
    total_days: {
        label: "Days",
        icon: <CalendarIcon size={ICON_SIZE} />
    },
}

function mapUserStatsToStats(userStats: UserStat[]): Stat[] {
    let stats = userStats.map((userStat) => {
        const stat = statsRender[userStat.key];
        return {
            ...stat,
            key: userStat.key,
            value: userStat.value
        };
    });

    return stats;
}

export default function Stats() {
    const [stats, setStats] = useState<Stat[] | null>(null);

    const fetchStats = useCallback(async () => {
        const userStats = await getUserStats();
        if (!userStats) return;

        const mappedStats = mapUserStatsToStats(userStats.stats);
        setStats(mappedStats);
    }, []);

    useWebSocketNotifications({
        types: ["ITINERARY_GENERATED"],
        onNotification: fetchStats
    });

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (!stats) return <Loader size={24} variant="dots" />;
    return (
        <section className={styles.stats}>
            {stats.map((stat) => (
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