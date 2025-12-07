import styles from "@/styles/components/form/ActivityForm.module.css";

import type { Activity } from "@/types/itinerary";
import { useActivityFormFields } from "@/hooks/useActivityFormFields";

import { Trash2, ChevronUp } from "lucide-react";

import Button from "@components/shared/Button";
import FormGroup from "@components/form/FormGroup";
import LocationForm from "@components/form/LocationForm";
import Divider from "@components/shared/Divider";

interface ActivityFormProps {
    activity: Activity;
    activityIndex: number;
    onActivityUpdate: (field: keyof Activity, value: any) => void;
    onLocationUpdate: (field: keyof Activity['location'] | 'latitude' | 'longitude', value: any) => void;
    onRemoveActivity: () => void;
    isExpanded: boolean;
    onToggleExpand: () => void;
    displayIndex?: number;
}

export default function ActivityForm({
    activity,
    activityIndex,
    onActivityUpdate,
    onLocationUpdate,
    onRemoveActivity,
    isExpanded,
    onToggleExpand,
    displayIndex
}: ActivityFormProps) {
    const { activityFields, detailsField, locationFields, getFieldHandler } = useActivityFormFields(
        activity,
        activityIndex,
        onActivityUpdate
    );

    const visualIndex = (displayIndex ?? activityIndex) + 1;

    if (!isExpanded) {
        return (
            <div className={styles.activitySummary} onClick={onToggleExpand}>
                <div className={styles.summaryContent}>
                    {activity.time && (
                        <span className={styles.summaryTime}>
                            {activity.time}
                        </span>
                    )}
                    <span className={styles.summaryTitle}>
                        {activity.activity || `Actividad ${visualIndex}`}
                    </span>
                </div>
                <div className={styles.summaryActions}>
                    <Button
                        onClick={(e) => {
                            e?.stopPropagation();
                            onRemoveActivity();
                        }}
                        style={["tool_bordered", "danger"]}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.activityCard}>
            <div className={styles.activityHeader} onClick={onToggleExpand}>
                <div className={styles.summaryContent}>
                    {activity.time && (
                        <span className={styles.summaryTime}>
                            {activity.time}
                        </span>
                    )}
                    <span className={styles.summaryTitle}>
                        {activity.activity || `Actividad ${visualIndex}`}
                    </span>
                </div>
                <div className={styles.headerActions}>
                    <Button
                        onClick={(e) => {
                            e?.stopPropagation();
                            onToggleExpand();
                        }}
                        style={["tool_bordered"]}
                    >
                        <ChevronUp size={16} />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e?.stopPropagation();
                            onRemoveActivity();
                        }}
                        style={["tool_bordered", "danger"]}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            <Divider />

            <div className={styles.activityForm}>
                <FormGroup
                    field={activityFields[0]}
                    handleChange={getFieldHandler(activityFields[0].name)}
                    fullWidth
                />

                <div className={styles.formRow}>
                    {activityFields.slice(1).map((field) => (
                        <FormGroup
                            key={field.name}
                            field={field}
                            handleChange={getFieldHandler(field.name)}
                            fullWidth
                        />
                    ))}
                </div>

                <FormGroup
                    field={detailsField}
                    handleChange={getFieldHandler(detailsField.name)}
                    fullWidth
                />

                <Divider />

                <LocationForm
                    fields={locationFields}
                    onLocationUpdate={onLocationUpdate}
                />
            </div>
        </div>
    );
}
