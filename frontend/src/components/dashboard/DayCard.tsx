import styles from "@/styles/components/dashboard/DayCard.module.css";

import type { ItineraryDay, Activity } from "@/types/itinerary";

import { Plus } from "lucide-react";

import Button from "@/components/shared/Button";
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
    return (
        <div className={styles.dayCard}>
            <h3 className={styles.dayTitle}>
                Día {`${day.day} - ${formatDate(date, { excludeYear: true })}`}
            </h3>

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
                        <p>No hay actividades planeadas</p>
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
