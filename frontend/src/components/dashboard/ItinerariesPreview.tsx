import styles from "@styles/components/dashboard/ItinerariesPreview.module.css";

import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import type { Itinerary } from "@/types/itinerary";
import type { PageData } from "@/types/shared";

import { getUserItineraries } from "@/services/itineraryService";

import Badge from "@components/shared/Badge";
import Button from "@components/shared/Button";
import Loader from "@components/shared/Loader";

const PAGE_SIZE = 10;

const getDefaultPageData = (): PageData => ({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
    isLastPage: true,
});

export default function ItinerariesPreview() {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [pageData, setPageData] = useState<PageData>(getDefaultPageData());
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchItineraries = async (page: number, append: boolean = false) => {
        if (append) {
            setIsLoadingMore(true);
        } else {
            setIsLoading(true);
        }

        const response = await getUserItineraries({ page, size: PAGE_SIZE });
        if (!response) {
            setIsLoading(false);
            setIsLoadingMore(false);
            return;
        }

        const { page: itinerariesData, ...pageMetadata } = response;
    
        setItineraries(append ? [...itineraries, ...itinerariesData] : itinerariesData);
        setPageData(pageMetadata);
        setIsLoading(false);
        setIsLoadingMore(false);
    };

    const loadMore = () => {
        fetchItineraries(pageData.currentPage + 1, true);
    };

    useEffect(() => {
        fetchItineraries(0);
    }, []);

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
                                <span className={styles.label}>Fechas</span>
                                <span className={styles.value}>
                                    {itinerary.date}
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.label}>Duración</span>
                                <span className={styles.value}>
                                    {itinerary.countDays} días
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
                                    {itinerary.budget} €
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
            {!pageData.isLastPage && (
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
