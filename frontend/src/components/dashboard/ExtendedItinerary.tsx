import styles from "@styles/components/dashboard/ExtendedItinerary.module.css";

import type { ExtendedItinerary } from "@/types/itinerary";

import { formatBudget, formatDate } from "@/utils/formatUtils";

import { AlarmClockIcon, CalendarIcon, Edit, MapPinIcon, PiggyBankIcon, Trash, UsersIcon } from "lucide-react";

import Badge from "@components/shared/Badge";
import Button from "@/components/shared/Button";
import InfoCard from "@components/dashboard/InfoCard";

interface ExtendedItineraryProps {
    itinerary: ExtendedItinerary;
}

const ICON_SIZE = 20;

export default function ExtendedItinerary({ itinerary }: ExtendedItineraryProps) {
    const countDays = itinerary.days.length;

    return (
        <section className={styles.extendedItinerary}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    <span className={styles.icon}>{itinerary.icon}</span>
                    <h1 className={styles.titleText}>{itinerary.title}</h1>
                </div>
                <div className={styles.headerActions}>
                    <Badge status={itinerary.status} style="default" />
                    <Button style={["tool_bordered"]} to={`/itineraries/${itinerary.id}/edit`}><Edit size={16} /></Button>
                    <Button style={["tool_bordered", "danger"]} onClick={() => alert("Delete itinerary")}><Trash size={16} /></Button>
                </div>
            </div>

            {/* Trip Info */}
            <div className={styles.tripInfo}>
                <InfoCard icon={<MapPinIcon size={ICON_SIZE} />} title="Destino" value={itinerary.place} />
                <InfoCard icon={<UsersIcon size={ICON_SIZE} />} title="Personas" value={itinerary.people} />
                <InfoCard icon={<PiggyBankIcon size={ICON_SIZE} />} title="Presupuesto" value={formatBudget(itinerary.budget)} />
                <InfoCard icon={<CalendarIcon size={ICON_SIZE} />} title="Fecha" value={formatDate(itinerary.date)} />
                <InfoCard icon={<AlarmClockIcon size={ICON_SIZE} />} title="Duración" value={`${countDays} ${countDays === 1 ? "día" : "días"}`} />
            </div>

            {/* Tags */}
            <div className={styles.tags}>
                {itinerary.tags.map((tag, index) => (
                    <Badge key={index} style="semi_thin" title={`#${tag}`} />
                ))}
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
                                                <p className={styles.locationName}>{activity.location.name}</p>
                                                <p className={styles.locationAddress}>{activity.location.address}</p>
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