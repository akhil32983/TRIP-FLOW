import styles from "@styles/components/form/LocationForm.module.css";

import type { Activity } from "@/types/itinerary";
import type { Field } from "@components/form/FormGroup";

import { MapPin } from "lucide-react";

import FormGroup from "@components/form/FormGroup";

interface LocationFormProps {
    fields: Field[];
    onLocationUpdate: (field: keyof Activity['location'] | 'latitude' | 'longitude', value: any) => void;
}

export default function LocationForm({ fields, onLocationUpdate }: LocationFormProps) {
    const leftFields = fields.slice(0, Math.ceil(fields.length / 2));
    const rightFields = fields.slice(Math.ceil(fields.length / 2));

    const getLocationField = (fieldName: string): keyof Activity['location'] | 'latitude' | 'longitude' => {
        if (fieldName.includes('name')) return 'name';
        if (fieldName.includes('address')) return 'address';
        if (fieldName.includes('latitude')) return 'latitude';
        if (fieldName.includes('longitude')) return 'longitude';
        return 'name';
    };

    const handleLocationChange = (fieldName: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        onLocationUpdate(getLocationField(fieldName), e.target.value);
    };

    return (
        <div className={styles.locationForm}>
            <div className={styles.formHeader}>
                <MapPin size={16} />
                <h6 className={styles.formTitle}>Where exactly?</h6>
            </div>

            <div className={styles.formRow}>
                {leftFields.map((field) => (
                   <FormGroup
                       key={field.name}
                       field={field}
                       handleChange={handleLocationChange(field.name)}
                       fullWidth
                   />
                ))}
            </div>
            
            <div className={styles.formRow}>
                {rightFields.map((field) => (
                    <FormGroup
                        key={field.name}
                        field={field}
                        handleChange={handleLocationChange(field.name)}
                        fullWidth
                    />
                ))}
            </div>
        </div>
    );
}
