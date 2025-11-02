import styles from "@/styles/components/form/ActivityForm.module.css";

import type { Activity } from "@/types/itinerary";
import { useActivityFormFields } from "@/hooks/useActivityFormFields";

import { Crosshair, Trash2 } from "lucide-react";

import Button from "@components/shared/Button";
import FormGroup from "@components/form/FormGroup";
import LocationForm from "@components/form/LocationForm";

interface ActivityFormProps {
    activity: Activity;
    activityIndex: number;
    onActivityUpdate: (field: keyof Activity, value: any) => void;
    onLocationUpdate: (field: keyof Activity['location'] | 'latitude' | 'longitude', value: any) => void;
    onRemoveActivity: () => void;
}

export default function ActivityForm({
    activity,
    activityIndex,
    onActivityUpdate,
    onLocationUpdate,
    onRemoveActivity
}: ActivityFormProps) {
    const { activityFields, detailsField, locationFields, getFieldHandler } = useActivityFormFields(
        activity,
        activityIndex,
        onActivityUpdate
    );

    return (
        <div className={styles.activityCard}>
            <div className={styles.activityHeader}>
                <div className={styles.activityTitle}>
                    <Crosshair size={18} />
                    <h4 className={styles.activityTitleText}>Actividad {activityIndex + 1}</h4>
                </div>
                <Button
                    onClick={onRemoveActivity}
                    style={["tool_bordered", "danger"]}
                ><Trash2 size={16} /></Button>
            </div>

            <div className={styles.activityForm}>
                <div className={styles.formRow}>
                    {activityFields.map((field) => (
                        <FormGroup
                            key={field.name}
                            field={field}
                            handleChange={getFieldHandler(field.name)}
                        />
                    ))}
                </div>

                <FormGroup
                    key={detailsField.name}
                    field={detailsField}
                    handleChange={getFieldHandler(detailsField.name)}
                    fullWidth
                />

                <div className={styles.locationForm}>
                    <LocationForm
                        fields={locationFields}
                        onLocationUpdate={onLocationUpdate}
                    />
                </div>
            </div>
        </div>
    );
}
