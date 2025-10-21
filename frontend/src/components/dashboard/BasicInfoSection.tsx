import styles from "@/styles/components/dashboard/BasicInfoSection.module.css";

import type { ExtendedItinerary } from "@/types/itinerary";

import { useBasicInfoFormFields } from "@/hooks/useBasicInfoFormFields";

import { Plane } from "lucide-react";

import TagsSection from "@components/dashboard/TagsSection";
import FormGroup from "@components/form/FormGroup";

interface BasicInfoSectionProps {
    itinerary: ExtendedItinerary;
    onUpdateBasicInfo: (field: keyof ExtendedItinerary, value: any) => void;
    onTagsChange: (newTags: string[]) => void;
}

export default function BasicInfoSection({
    itinerary,
    onUpdateBasicInfo,
    onTagsChange
}: BasicInfoSectionProps) {
    const { basicInfoFields, getFieldHandler } = useBasicInfoFormFields(itinerary, onUpdateBasicInfo);

    return (
        <section className={styles.basicInfo}>
            <div className={styles.sectionHeader}>
                <Plane size={24} />
                <h3>Planificación General</h3>
            </div>

            <div className={styles.formGrid}>
                {basicInfoFields.map((field) => (
                    <FormGroup
                        key={field.name}
                        field={field}
                        handleChange={getFieldHandler(field.name)}
                        fullWidth
                    />
                ))}
            </div>

            <TagsSection
                tags={itinerary.tags}
                onTagsChange={onTagsChange}
            />
        </section>
    );
}
