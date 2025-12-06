import styles from "@styles/components/dashboard/itineraries/ActivityCard.module.css";

import type { Activity } from "@/types/itinerary";
import { ClockIcon, MapPinIcon } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className={styles.activityCard}>
      <div className={styles.header}>
        <h4>{activity.activity}</h4>
        <span>{activity.time}</span>
      </div>
      <div className={styles.location}>
        <MapPinIcon size={16} className={styles.icon} />
        {activity.location.name} - {activity.location.address}
      </div>
      <p className={styles.details}>{activity.details}</p>
      <div className={styles.duration}>
        <ClockIcon size={14} />
        <p>Duración: {activity.duration}</p>
      </div>
    </div>
  );
}