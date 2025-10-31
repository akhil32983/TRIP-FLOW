import styles from "@styles/components/dashboard/ItinerariesPreview.module.css";

import { NavLink } from "react-router";

import type { Itinerary } from "@/types/itinerary";

import { formatBudget, formatDate } from "@/utils/formatUtils";

import Badge from "@components/shared/Badge";
import Button from "@components/shared/Button";
import Loader from "@components/shared/Loader";

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
                {itineraries.map((itinerary, index) => (
                    <NavLink
                        key={itinerary.id}
                        to={`/itineraries/${itinerary.id}`}
                        className={styles.itinerary}
                        style={{ "--index": index + 1 < 4 ? index + 1 : 3 } as React.CSSProperties}>
                        <div className={styles.header}>
                            <span className={styles.icon}>{itinerary.icon}</span>
                            <Badge style="semi_thin" status={itinerary.status} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{itinerary.title}</h3>
                            <h4 className={styles.place}>{itinerary.place}</h4>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.label}>Fecha</span>
                                <span className={styles.value}>
                                    {formatDate(itinerary.date)}
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.label}>Duración</span>
                                <span className={styles.value}>
                                    {itinerary.countDays}{" "}
                                    {itinerary.countDays === 1 ? "día" : "días"}
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.label}>Integrantes</span>
                                <span className={styles.value}>
                                    {itinerary.people}{" "}
                                    {itinerary.people > 1 ? "personas" : "persona"}
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.label}>Presupuesto</span>
                                <span className={styles.value}>
                                    {formatBudget(itinerary.budget)}
                                </span>
                            </div>
                        </div>
                        <div className={styles.tags}>
                            {itinerary.tags.map((tag, index) => (
                                <Badge key={index} style="thin" title={tag} />
                            ))}
                        </div>
                    </NavLink>
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
