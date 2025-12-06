import styles from "@styles/components/dashboard/ExtendedItinerary.module.css";

import type { ExtendedItinerary } from "@/types/itinerary";

import { formatBudget, formatDate, formatImageAuthorUrl, formatPeople } from "@/utils/formatUtils";

import { CalendarIcon, MapPinIcon, PiggyBankIcon, UsersIcon } from "lucide-react";

import Badge from "@components/shared/Badge";
import AttributionImage from "../shared/AttributionImage";
import ActivityCard from "./itineraries/ActivityCard";

interface ExtendedItineraryProps {
    itinerary: ExtendedItinerary;
}

const ICON_SIZE = 24;

export default function ExtendedItinerary({ itinerary }: ExtendedItineraryProps) {
    return (
        <section className={styles.extendedItinerary}>
            <AttributionImage
                src={itinerary.coverImage.imageUrl}
                alt={itinerary.coverImage.altDescription}
                attribution={`@${itinerary.coverImage.authorUsername}`}
                attributionLink={formatImageAuthorUrl(itinerary.coverImage.authorUsername)}
                loading="eager"
                className={styles.banner}
            >
                <Badge
                    style="semi_thin"
                    status={itinerary.status}
                />
            </AttributionImage>

            {/* Tags */}
            <div className={styles.tags}>
                {itinerary.tags.map((tag, index) => (
                    <Badge
                        key={index}
                        style="semi_thin"
                        title={tag}
                    />
                ))}
            </div>

            {/* Trip Info */}
            <div className={styles.tripInfo}>
                <div className={styles.item}>
                    <MapPinIcon size={ICON_SIZE} />
                    <span>{itinerary.place}</span>
                </div>
                <div className={styles.item}>
                    <CalendarIcon size={ICON_SIZE} />
                    <span>{formatDate(itinerary.date, { shortMonth: true })}</span>
                </div>
                <div className={styles.item}>
                    <UsersIcon size={ICON_SIZE} />
                    <span>{formatPeople(itinerary.people)}</span>
                </div>
                <div className={styles.item}>
                    <PiggyBankIcon size={ICON_SIZE} />
                    <span>{formatBudget(itinerary.budget)}</span>
                </div>
            </div>


            {/* Daily Itinerary */}
            {itinerary.days.map((day) => (
                <div key={day.day} className={styles.dayCard}>
                    <h3 className={styles.dayTitle}>Día {day.day}</h3>

                    <div className={styles.activities}>
                        {day.activities.map((activity, actIndex) => (
                            <ActivityCard activity={activity} key={actIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}