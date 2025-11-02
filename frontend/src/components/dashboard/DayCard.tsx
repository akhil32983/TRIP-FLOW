import styles from "@/styles/components/dashboard/DayCard.module.css";

import type { ItineraryDay, Activity } from "@/types/itinerary";

import { CalendarFold, Plus, Trash2 } from "lucide-react";

import Button from "@/components/shared/Button";
import ActivityForm from "@components/form/ActivityForm";

interface DayCardProps {
    day: ItineraryDay;
    totalDays: number;
    onAddActivity: () => void;
    onRemoveDay: () => void;
    onRemoveActivity: (activityIndex: number) => void;
    onUpdateActivity: (activityIndex: number, field: keyof Activity, value: any) => void;
    onUpdateActivityLocation: (activityIndex: number, field: keyof Activity['location'] | 'latitude' | 'longitude', value: any) => void;
}

export default function DayCard({
    day,
    totalDays,
    onAddActivity,
    onRemoveDay,
    onRemoveActivity,
    onUpdateActivity,
    onUpdateActivityLocation
}: DayCardProps) {
    return (
        <div className={styles.dayCard}>
            <div className={styles.dayHeader}>
                <div className={styles.dayTitle}>
                    <CalendarFold size={20} />
                    <h4 className={styles.dayTitleText}>Día {day.day}</h4>
                </div>
                <div className={styles.dayActions}>
                    <Button
                        onClick={onAddActivity}
                        style={["tool_bordered"]}
                    >
                        <Plus size={16} />
                    </Button>
                    {totalDays > 1 && (
                        <Button
                            onClick={onRemoveDay}
                            style={["tool_bordered", "danger"]}
                        ><Trash2 size={16} /></Button>
                    )}
                </div>
            </div>

            <div className={styles.activitiesContainer}>
                {day.activities.map((activity, activityIndex) => (
                    <ActivityForm
                        key={activityIndex}
                        activity={activity}
                        activityIndex={activityIndex}
                        onActivityUpdate={(field, value) => onUpdateActivity(activityIndex, field, value)}
                        onLocationUpdate={(field, value) => onUpdateActivityLocation(activityIndex, field, value)}
                        onRemoveActivity={() => onRemoveActivity(activityIndex)}
                    />
                ))}

                {day.activities.length === 0 && (
                    <div className={styles.emptyActivities}>
                        <p>No hay actividades planeadas para este día aún</p>
                        <p>¡Comienza a planificar lo que harás!</p>
                        <Button
                            onClick={onAddActivity}
                            style={["secondary"]}
                            label="Añadir primera actividad"
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
