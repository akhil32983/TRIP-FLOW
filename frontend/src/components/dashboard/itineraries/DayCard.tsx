import { useState, useMemo } from "react";
import styles from "@/styles/components/dashboard/itineraries/DayCard.module.css";

import type { ItineraryDay, Activity } from "@/types/itinerary";

import { Plus } from "lucide-react";


import ActivityForm from "@components/form/ActivityForm";
import { formatDate } from "@/utils/formatUtils";

interface DayCardProps {
    date: string;
    day: ItineraryDay;
    onAddActivity: () => void;
    onRemoveActivity: (activityIndex: number) => void;
    onUpdateActivity: (activityIndex: number, field: keyof Activity, value: any) => void;
    onUpdateActivityLocation: (activityIndex: number, field: keyof Activity['location'] | 'latitude' | 'longitude', value: any) => void;
}

export default function DayCard({
    date,
    day,
    onAddActivity,
    onRemoveActivity,
    onUpdateActivity,
    onUpdateActivityLocation
}: DayCardProps) {
    const [expandedActivityIndex, setExpandedActivityIndex] = useState<number | null>(null);

    const sortedActivities = useMemo(() => {
        return day.activities
            .map((activity, index) => ({ activity, originalIndex: index }))
            .sort((a, b) => {
                const timeA = a.activity.time || "99:99";
                const timeB = b.activity.time || "99:99";
                return timeA.localeCompare(timeB);
            });
    }, [day.activities]);

    return (
        <div className={styles.dayCard}>
            <h3 className={styles.dayTitle}>
                Day {`${day.day} - ${formatDate(date, { excludeYear: true })}`}
            </h3>

            <div className={styles.activitiesContainer}>
                {sortedActivities.map(({ activity, originalIndex }, index) => (
                    <ActivityForm
                        key={originalIndex}
                        activity={activity}
                        activityIndex={originalIndex}
                        displayIndex={index}
                        onActivityUpdate={(field, value) => onUpdateActivity(originalIndex, field, value)}
                        onLocationUpdate={(field, value) => onUpdateActivityLocation(originalIndex, field, value)}
                        onRemoveActivity={() => onRemoveActivity(originalIndex)}
                        isExpanded={expandedActivityIndex === originalIndex}
                        onToggleExpand={() => setExpandedActivityIndex(curr => curr === originalIndex ? null : originalIndex)}
                    />
                ))}

                <button
                    className={styles.addActivityButton}
                    onClick={onAddActivity}
                >
                    <Plus size={16} />
                    <span>Add Activity</span>
                </button>
            </div>
        </div>
    );
}
