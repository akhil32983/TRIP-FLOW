import styles from "@/styles/components/dashboard/ItinerarySection.module.css";

import type { ItineraryDay, Activity } from "@/types/itinerary";

import { useActivityManager } from "@/hooks/useActivityManager";

import { Plus, TicketsPlane } from "lucide-react";

import Button from "@/components/shared/Button";
import DayCard from "@components/dashboard/DayCard";

interface ItinerarySectionProps {
    days: ItineraryDay[];
    onDaysChange: (newDays: ItineraryDay[]) => void;
    onAddNewDay: () => void;
    onRemoveDay: (dayIndex: number) => void;
}

export default function ItinerarySection({
    days,
    onDaysChange,
    onAddNewDay,
    onRemoveDay
}: ItinerarySectionProps) {
    const {
        handleAddActivity,
        handleRemoveActivity,
        handleUpdateActivity,
        handleUpdateActivityLocation
    } = useActivityManager(days, onDaysChange);

    return (
        <section className={styles.itinerarySection}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                    <TicketsPlane size={24} />
                    <h3>Planificación</h3>
                </div>
                <Button
                    onClick={onAddNewDay}
                    style={["secondary"]}
                    label="Nuevo Día"
                >
                    <Plus size={16} />
                </Button>
            </div>

            {days.map((day, dayIndex) => (
                <DayCard
                    key={day.day}
                    day={day}
                    totalDays={days.length}
                    onAddActivity={() => handleAddActivity(dayIndex)}
                    onRemoveDay={() => onRemoveDay(dayIndex)}
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
                    <p>No hay días planeados aún</p>
                    <Button onClick={onAddNewDay} style={["primary"]} label="Añadir Primer Día">
                        <Plus size={16} />
                    </Button>
                </div>
            )}
        </section>
    );
}
