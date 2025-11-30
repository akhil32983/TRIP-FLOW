import styles from "@styles/components/form/ItineraryEditForm.module.css";

import { useCallback } from "react";

import type { ExtendedItinerary } from "@/types/itinerary";

import { useItineraryForm } from "@/hooks/useItineraryForm";
import { useDayManager } from "@/hooks/useDayManager";

import { Save } from "lucide-react";

import Button from "@/components/shared/Button";
import BasicInfoSection from "@components/dashboard/BasicInfoSection";
import ItinerarySection from "@components/dashboard/ItinerarySection";
import { useNotification } from "@/providers/notificationProvider";

interface ItineraryEditFormProps {
    initialItinerary: ExtendedItinerary;
    isSaving?: boolean;
    onSave: (itinerary: ExtendedItinerary) => void;
}

export default function ItineraryEditForm({ initialItinerary, isSaving, onSave }: ItineraryEditFormProps) {
    const { itinerary, updateBasicInfo, validateItinerary } = useItineraryForm(initialItinerary);
    const { notify } = useNotification();
    
    // Day management operations
    const { handleAddNewDay, handleRemoveDay } = useDayManager(
        itinerary.days,
        (newDays) => {
            updateBasicInfo('days', newDays);
        }
    );

    // Tags management
    const handleTagsChange = useCallback((newTags: string[]) => {
        updateBasicInfo('tags', newTags);
    }, [updateBasicInfo]);

    // Days management for itinerary section
    const handleDaysChange = useCallback((newDays: any[]) => {
        updateBasicInfo('days', newDays);
    }, [updateBasicInfo]);

    // Save functionality with validation
    const handleSave = useCallback(() => {
        const validation = validateItinerary();
        
        if (!validation.isValid) {
            notify(validation.error as string, "error", { autoClose: true, title: "Revisa los campos" });
            return;
        }

        onSave(itinerary);
    }, [itinerary, onSave, validateItinerary]);

    return (
        <div className={styles.editForm}>
            <div className={styles.formHeader}>
                <h2>{itinerary.title}</h2>
                <Button 
                    onClick={handleSave} 
                    style={["primary"]}
                    label={isSaving ? "Guardando..." : "Guardar Todo"}
                    disabled={isSaving}
                >
                    <Save size={16} />
                </Button>
            </div>

            <BasicInfoSection
                itinerary={itinerary}
                onUpdateBasicInfo={updateBasicInfo}
                onTagsChange={handleTagsChange}
            />

            <ItinerarySection
                days={itinerary.days}
                onDaysChange={handleDaysChange}
                onAddNewDay={handleAddNewDay}
                onRemoveDay={handleRemoveDay}
            />

            <div className={styles.formFooter}>
                <Button 
                    onClick={handleSave} 
                    style={["primary"]}
                    label={isSaving ? "Guardando..." : "Guardar Todo"}
                    disabled={isSaving}
                >
                    <Save size={20} />
                </Button>
            </div>
        </div>
    );
}
