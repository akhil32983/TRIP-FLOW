import { useCallback } from "react";

import type { ExtendedItinerary } from "@/types/itinerary";

import { useItineraryForm } from "@/hooks/useItineraryForm";
import { useDayManager } from "@/hooks/useDayManager";
import { useNotification } from "@/providers/notificationProvider";
import { useModal } from "@/hooks/useModal";

import InnerTabHeader from "@/components/dashboard/headers/InnerTabHeader";
import Button from "@/components/shared/Button";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";
import Modal from "@/components/shared/Modal";

interface ItineraryEditorProps {
    initialItinerary: ExtendedItinerary;
    onSave: (itinerary: ExtendedItinerary) => Promise<void>;
    onDelete?: () => Promise<void>;
    title: string;
    back: {
        url: string;
        label: string;
    };
    isSaving?: boolean;
}

export default function ItineraryEditor({ 
    initialItinerary, 
    onSave, 
    onDelete,
    title, 
    back, 
    isSaving 
}: ItineraryEditorProps) {
    const { itinerary, updateBasicInfo, validateItinerary } = useItineraryForm(initialItinerary);
    const { notify } = useNotification();
    const { isOpen, openModal, closeModal } = useModal();
    
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
    const handleSave = useCallback(async () => {
        const validation = validateItinerary();
        
        if (!validation.isValid) {
            notify(validation.error as string, "error", { autoClose: true, title: "Revisa los campos" });
            return;
        }

        await onSave(itinerary);
    }, [itinerary, onSave, validateItinerary, notify]);

    const handleDelete = useCallback(async () => {
        if (onDelete) {
            await onDelete();
            closeModal();
        }
    }, [onDelete, closeModal]);

    return (
        <>
            <InnerTabHeader
                title={title}
                back={back}
                right={
                    <Button
                        onClick={handleSave}
                        style={["inline"]}
                        label={isSaving ? "Guardando..." : "Guardar"}
                        disabled={isSaving}
                    />
                }
            />
            <ItineraryEditForm 
                itinerary={itinerary}
                onUpdateBasicInfo={updateBasicInfo}
                onTagsChange={handleTagsChange}
                onDaysChange={handleDaysChange}
                onAddNewDay={handleAddNewDay}
                onRemoveDay={handleRemoveDay}
                onDelete={openModal}
            />

            <Modal
                isOpen={isOpen}
                title="Eliminar Itinerario"
                message="¿Estás seguro de que deseas eliminar este itinerario? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={handleDelete}
                onCancel={closeModal}
                variant="danger"
            />
        </>
    );
}
