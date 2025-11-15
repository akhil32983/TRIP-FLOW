import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import type { ExtendedItinerary as Itinerary } from "@/types/itinerary";

import { useModal } from "@/hooks/useModal";
import { deleteItinerary, getItineraryById } from "@/services/itineraryService";

import AppLayout from "@/layouts/AppLayout";
import Loader from "@/components/shared/Loader";
import Modal from "@/components/shared/Modal";
import InnerTabHeader from "@components/dashboard/InnerTabHeader";
import ExtendedItinerary from "@components/dashboard/ExtendedItinerary";

export default function ItineraryDetailPage() {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {isOpen, openModal, closeModal} = useModal();
    
    const { id } = useParams<{ id: string }>();
    const itineraryId = Number(id);
    if (isNaN(itineraryId)) return <Navigate to="/itineraries" />;

    const handleDelete = async () => {
        await deleteItinerary(itineraryId);
        closeModal();
        navigate("/itineraries");
    };

    useEffect(() => {
        const fetchItinerary = async () => {
            setIsLoading(true);

            const itineraryData = await getItineraryById(itineraryId);
            setItinerary(itineraryData);

            setIsLoading(false);
        };

        fetchItinerary();
    }, [id]);

    return (
        <AppLayout>
            <InnerTabHeader title={itinerary?.place || "Cargando..."} backUrl="/itineraries" />
            {isLoading && <Loader size={32} variant="dots" />}
            {itinerary && <ExtendedItinerary itinerary={itinerary} onDelete={openModal} />}

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
        </AppLayout>
    );
}