import styles from "@styles/components/dashboard/profile/ProfileCard.module.css";

import { useAuth } from "@/providers/authProvider";

import { MapPinIcon } from "lucide-react";
import Avatar from "@components/shared/Avatar";

export default function ProfileCard() {
    const { user } = useAuth();

    const location = user?.location === "¿?" ? "Alguna parte del mundo" : user?.location;
    const description = user?.description || "Sin descripción.";

    return (
        <section className={styles.profileCard}>
            <div className={styles.profileImage}>
                <Avatar size="full" />
            </div>
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{user?.name}</h2>
                <div className={styles.profileMetadataItem}>
                    <MapPinIcon className={styles.icon} />
                    <span>{location}</span>
                </div>
                <p className={styles.profileDescription}>{description}</p>
            </div>
        </section>
    );
}