import { useCallback, useState } from "react";
import styles from "@styles/components/dashboard/itineraries/ItineraryEditor.module.css";

import type { ExtendedItinerary } from "@/types/itinerary";

import { useItineraryForm } from "@/hooks/useItineraryForm";
import { useDayManager } from "@/hooks/useDayManager";
import { useNotification } from "@/providers/notificationProvider";
import { useModal } from "@/hooks/useModal";

import InnerTabHeader from "@/components/dashboard/headers/InnerTabHeader";
import Button from "@/components/shared/Button";
import ItineraryEditForm from "@/components/form/ItineraryEditForm";
import AIGeneration from "@/components/dashboard/ai/AIGeneration";
import Modal from "@/components/shared/Modal";

type ItineraryEditorType = "manual" | "ai" | "edit";

interface ItineraryEditorProps {
    initialItinerary: ExtendedItinerary;
    type: ItineraryEditorType;
    onSave: (itinerary: ExtendedItinerary) => Promise<void>;
    onDelete?: () => Promise<void>;
    back: {
        url: string;
        label: string;
    };
    isSaving?: boolean;
}

export default function ItineraryEditor({
    initialItinerary,
    type,
    onSave,
    onDelete,
    back,
    isSaving
}: ItineraryEditorProps) {
    let title = "";
    if (type === "edit") title = "Editar Itinerario";
    else title = "Nuevo Itinerario";

    const [activeTab, setActiveTab] = useState<ItineraryEditorType>(type);
    const { itinerary, updateBasicInfo, validateItinerary } = useItineraryForm(initialItinerary);
    const { notify } = useNotification();
    const { isOpen, openModal, closeModal } = useModal();

    // Day management operations
    const { handleAddNewDay } = useDayManager(
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
                    activeTab !== "ai" ? (
                        <Button
                            onClick={handleSave}
                            style={["inline"]}
                            label={isSaving ? "Guardando..." : "Guardar"}
                            disabled={isSaving}
                        />
                    ) : undefined
                }
            />

            {type !== "edit" && (
                <div className={styles.tabsWrapper}>
                    <div className={styles.tabs}>
                        <button
                            className={activeTab === 'manual' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('manual')}
                        >
                            Manual
                        </button>
                        <button
                            className={activeTab === 'ai' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('ai')}
                        >
                            Asistente IA
                        </button>
                    </div>
                </div>
            )}

            {activeTab !== "ai" ? (
                <ItineraryEditForm
                    itinerary={itinerary}
                    onUpdateBasicInfo={updateBasicInfo}
                    onTagsChange={handleTagsChange}
                    onDaysChange={handleDaysChange}
                    onAddNewDay={handleAddNewDay}
                    onDelete={type === "edit" ? openModal : undefined}
                />
            ) : (
                <AIGeneration />
            )}

            {type === "edit" && (
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
            )}
        </>
    );
}
