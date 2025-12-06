import styles from "@styles/components/dashboard/ExtendedItinerary.module.css";

import type { ExtendedItinerary } from "@/types/itinerary";

import { formatBudget, formatDate, formatImageAuthorUrl, formatPeople } from "@/utils/formatUtils";

import { CalendarIcon, MapPinIcon, PiggyBankIcon, UsersIcon } from "lucide-react";

import Badge from "@components/shared/Badge";
import AttributionImage from "../shared/AttributionImage";

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
            />

            {/* Tags */}
            <div className={styles.tags}>
                {itinerary.tags.map((tag, index) => (
                    <Badge
                        key={index}
                        style="semi_thin"
                        title={tag}
                    />
                ))}
                <Badge
                    style="semi_thin"
                    status={itinerary.status}
                />
            </div>

            {/* Trip Info */}
            <div className={styles.tripInfo}>
                <div className={styles.item}>
                    <MapPinIcon size={ICON_SIZE} />
                    <span>{itinerary.place}</span>
                </div>
                <div className={styles.item}>
                    <CalendarIcon size={ICON_SIZE} />
                    <span>{formatDate(itinerary.date)}</span>
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
            <div className={styles.dailyItinerary}>
                {itinerary.days.map((day) => (
                    <div key={day.day} className={styles.dayCard}>
                        <div className={styles.dayHeader}>
                            <h3 className={styles.dayTitle}>
                                <span className={styles.dayNumber}>Día {day.day}</span>
                            </h3>
                            <span className={styles.activityCount}>
                                {day.activities.length} actividades
                            </span>
                        </div>

                        <div className={styles.activities}>
                            {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className={styles.activityCard}>
                                    <div className={styles.activityTime}>
                                        <span className={styles.time}>{activity.time}</span>
                                        <span className={styles.duration}>{activity.duration}</span>
                                    </div>

                                    <div className={styles.activityContent}>
                                        <h4 className={styles.activityTitle}>{activity.activity}</h4>
                                        <p className={styles.activityDetails}>{activity.details}</p>

                                        <div className={styles.activityLocation}>
                                            <MapPinIcon size={16} className={styles.locationIcon} />
                                            <div className={styles.locationInfo}>
                                                <p className={styles.locationName}>{activity.location.name || "Desconocido"}</p>
                                                <p className={styles.locationAddress}>
                                                    {activity.location.address || "Sin dirección proporcionada"}
                                                    {activity.location.address && (
                                                        <>
                                                            {` - (${activity.location.coordinates.latitude}, ${activity.location.coordinates.longitude})`}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}