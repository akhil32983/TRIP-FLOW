import styles from "@styles/components/form/LocationForm.module.css";

import type { Activity } from "@/types/itinerary";
import type { Field } from "@components/form/FormGroup";

import { MapPin } from "lucide-react";

import FormGroup from "@components/form/FormGroup";

interface LocationFormProps {
    fields: Field[];
    onLocationUpdate: (field: keyof Activity['location'], value: any) => void;
}

export default function LocationForm({ fields, onLocationUpdate }: LocationFormProps) {
    const leftFields = fields.slice(0, Math.ceil(fields.length / 2));
    const rightFields = fields.slice(Math.ceil(fields.length / 2));

    return (
        <div className={styles.locationForm}>
            <div className={styles.formHeader}>
                <MapPin size={16} />
                <h6 className={styles.formTitle}>¿Dónde exactamente?</h6>
            </div>

            <div className={styles.formRow}>
                {leftFields.map((field) => (
                   <FormGroup
                       key={field.name}
                       field={field}
                       handleChange={(value) => onLocationUpdate(field.name as keyof Activity['location'], value)}
                       fullWidth
                   />
                ))}
            </div>
            
            <div className={styles.formRow}>
                {rightFields.map((field) => (
                    <FormGroup
                        key={field.name}
                        field={field}
                        handleChange={(value) => onLocationUpdate(field.name as keyof Activity['location'], value)}
                        fullWidth
                    />
                ))}
            </div>
        </div>
    );
}
