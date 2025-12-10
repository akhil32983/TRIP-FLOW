import styles from "@styles/components/dashboard/profile/ProfileCard.module.css";

import { useAuth } from "@/providers/authProvider";

import { CalendarIcon, MapPinIcon } from "lucide-react";
import Avatar from "@components/shared/Avatar";
import { formatDate } from "@/utils/formatUtils";

export default function ProfileCard() {
    const { user } = useAuth();

    const joinedDate = user?.createdAt ? formatDate(
        user.createdAt, { excludeDay: true, excludeMonth: true }
    ) : "¿?";
    const location = user?.location === "¿?" ? "Alguna parte del mundo" : user?.location;
    const description = user?.description || "Sin descripción.";

    return (
        <section className={styles.profileCard}>
            <div className={styles.profileImage}>
                <Avatar to="/profile" size="full" />
            </div>
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{user?.name}</h2>
                <p className={styles.profileUsername}>@{user?.username}</p>
                <div className={styles.profileMetadataItem}>
                    <MapPinIcon className={styles.icon} />
                    <span>{location}</span>
                </div>
                <p className={styles.profileDescription}>{description}</p>
                <div className={styles.profileMetadataItem}>
                    <CalendarIcon className={styles.icon} />
                    <span>Miembro desde {joinedDate}</span>
                </div>
            </div>
        </section>
    );
}