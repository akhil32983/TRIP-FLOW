import styles from "@styles/components/dashboard/itineraries/ItineraryCard.module.css";

import type { Itinerary } from "@/types/itinerary";
import { MapPinIcon } from "lucide-react";
import Badge from "@/components/shared/Badge";
import { NavLink } from "react-router";
import { formatDate, formatImageAuthorUrl } from "@/utils/formatUtils";

interface ItineraryCardProps {
    itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
    const date = formatDate(itinerary.date, {
        excludeYear: true,
        shortMonth: true
    });

    return (
        <NavLink className={styles.card} to={`/itineraries/${itinerary.id}`}>
            <div
                className={styles.cover}
                style={{ "--bg-image": `url(${itinerary.coverImage.imageUrl})` } as React.CSSProperties}
            >
                <Badge style="thin" status={itinerary.status} />
                <Badge style={["thin", "alpha"]} title={date} />

                <div className={styles.overlay}>
                    <span>Foto de </span>
                    <a
                        href={formatImageAuthorUrl(itinerary.coverImage.authorUsername)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.imageAuthor}
                        onClick={e => e.stopPropagation()}
                    >
                        @{itinerary.coverImage.authorUsername}
                    </a>
                </div>
            </div>
            <div className={styles.info}>
                <h4 className={styles.title}>{itinerary.title}</h4>
                <span className={styles.place}><MapPinIcon size={14} /> {itinerary.place}</span>
            </div>
        </NavLink>
    );
}