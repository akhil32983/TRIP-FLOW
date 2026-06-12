import styles from "@/styles/components/dashboard/itineraries/ItinerarySection.module.css";

import type { ItineraryDay, Activity } from "@/types/itinerary";

import { useActivityManager } from "@/hooks/useActivityManager";

import { Plus } from "lucide-react";

import Button from "@/components/shared/Button";
import DayCard from "@/components/dashboard/itineraries/DayCard";
import { getDate } from "@/utils/formatUtils";

interface ItinerarySectionProps {
    initialDate: string;
    days: ItineraryDay[];
    onDaysChange: (newDays: ItineraryDay[]) => void;
    onAddNewDay: () => void;
}

export default function ItinerarySection({
    initialDate,
    days,
    onDaysChange,
    onAddNewDay,
}: ItinerarySectionProps) {
    const {
        handleAddActivity,
        handleRemoveActivity,
        handleUpdateActivity,
        handleUpdateActivityLocation
    } = useActivityManager(days, onDaysChange);

    return (
        <section className={styles.itinerarySection}>
            {days.map((day, dayIndex) => (
                <DayCard
                    date={getDate(initialDate, dayIndex)}
                    key={day.day}
                    day={day}
                    onAddActivity={() => handleAddActivity(dayIndex)}
                    onRemoveActivity={(activityIndex) => handleRemoveActivity(dayIndex, activityIndex)}
                    onUpdateActivity={(activityIndex, field, value) =>
                        handleUpdateActivity(dayIndex, activityIndex, field as keyof Activity, value)
                    }
                    onUpdateActivityLocation={(activityIndex, field, value) =>
                        handleUpdateActivityLocation(dayIndex, activityIndex, field as keyof Activity['location'] | 'latitude' | 'longitude', value)
                    }
                />
            ))}

            {days.length === 0 && (
                <div className={styles.emptyActivities}>
                    <p>No days planned yet</p>
                    <Button onClick={onAddNewDay} style={["primary"]} label="Add First Day">
                        <Plus size={16} />
                    </Button>
                </div>
            )}
        </section>
    );
}
