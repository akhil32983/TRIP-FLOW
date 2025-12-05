import styles from "@styles/components/dashboard/ItinerariesPreview.module.css";

import type { Itinerary } from "@/types/itinerary";

import Button from "@components/shared/Button";
import Loader from "@components/shared/Loader";
import ItineraryCard from "./itineraries/ItineraryCard";

interface ItinerariesPreviewProps {
    itineraries: Itinerary[];
    loadMore: () => void;
    isLoading: boolean;
    isLoadingMore: boolean;
    isLastPage: boolean;
}

export default function ItinerariesPreview(
    { itineraries, loadMore, isLoading, isLoadingMore, isLastPage }: ItinerariesPreviewProps
) {
    if (isLoading) return <Loader size={24} />;

    return (
        <section className={styles.itinerariesPreview}>
            {itineraries.length > 0 && (
                <div className={styles.grid}>
                {itineraries.map((itinerary) => (
                    <ItineraryCard itinerary={itinerary} key={itinerary.id} />
                ))}
                </div>
            )}
            {!isLastPage && (
                <div className={styles.loadMore}>
                    <Button
                        style={["secondary"]} 
                        label={isLoadingMore ? "Cargando..." : "Cargar más"}
                        onClick={loadMore}
                        disabled={isLoadingMore}
                    />
                </div>
            )}

            {itineraries.length === 0 && (
                <div className={styles.empty}>
                    <p>No tienes itinerarios todavía.</p>
                    <Button style={["primary"]} label="Crear itinerario" to="/itineraries/new" />
                </div>
            )}
        </section>
    );
}
