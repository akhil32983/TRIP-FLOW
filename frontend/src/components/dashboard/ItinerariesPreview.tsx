import styles from "@styles/components/dashboard/ItinerariesPreview.module.css";

import { NavLink } from "react-router";

import type { Itinerary } from "@/types/itinerary";

import Badge from "../shared/Badge";

const FAKE_ITINERARIES: Itinerary[] = [
    {
        id: 1,
        icon: "🗾",
        title: "Aventura en Tokio",
        place: "Tokio, Japón",
        date: "15-24 Jul 2025",
        countDays: 7,
        people: 3,
        budget: 1500,
        tags: ["Cultura", "Gastronomía", "Aventura"],
        status: "ACTIVE",
    },
    {
        id: 2,
        icon: "🏞️",
        title: "Exploración en Cusco",
        place: "Cusco, Perú",
        date: "01-10 Ago 2025",
        countDays: 10,
        people: 5,
        budget: 2000,
        tags: ["Historia", "Naturaleza"],
        status: "ONGOING",
    },
    {
        id: 3,
        icon: "🗼",
        title: "Escapada a París",
        place: "París, Francia",
        date: "15-20 Sep 2025",
        countDays: 5,
        people: 2,
        budget: 1000,
        tags: ["Romance", "Cultura"],
        status: "ACTIVE",
    },
    {
        id: 4,
        icon: "🏖️",
        title: "Aventura en Sídney",
        place: "Sídney, Australia",
        date: "01-14 Oct 2025",
        countDays: 14,
        people: 20,
        budget: 3000,
        tags: ["Aventura", "Naturaleza"],
        status: "COMPLETED",
    },
];

export default function ItinerariesPreview() {
    return (
        <section className={styles.itinerariesPreview}>
            {FAKE_ITINERARIES.map((itinerary, index) => (
                <NavLink
                    key={itinerary.id}
                    to={`/itineraries/${itinerary.id}`}
                    className={styles.itinerary}
                    style={{ "--index": index + 1 } as React.CSSProperties}>
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
        </section>
    );
}
