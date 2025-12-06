import styles from "@styles/components/dashboard/itineraries/ItineraryCard.module.css";

import type { Itinerary } from "@/types/itinerary";
import { MapPinIcon } from "lucide-react";
import Badge from "@/components/shared/Badge";
import { NavLink } from "react-router";
import AttributionImage from "@/components/shared/AttributionImage";
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
            <AttributionImage
                className={styles.cover}
                src={itinerary.coverImage.imageUrl}
                alt={itinerary.coverImage.altDescription}
                attribution={`@${itinerary.coverImage.authorUsername}`}
                attributionLink={formatImageAuthorUrl(itinerary.coverImage.authorUsername)}
                loading="eager"
            >
                <Badge style="thin" status={itinerary.status} />
                <Badge style={["thin", "alpha"]} title={date} />
            </AttributionImage>

            <div className={styles.info}>
                <h4 className={styles.title}>{itinerary.title}</h4>
                <span className={styles.place}>
                    <MapPinIcon size={14} /> {itinerary.place}
                </span>
            </div>
        </NavLink>
    );
}
