import styles from "@styles/components/shared/Avatar.module.css";

import { Link } from "react-router";

interface AvatarProps {
    to: string;
    src?: string;
    alt?: string;
    size?: "default" | "full";
}

export default function Avatar({ src, alt, to, size = "default" }: AvatarProps) {
    const avatarClass = `${styles.avatar} ${size === "full" ? styles.full : ""}`;
    const imageSrc = src || "/demo-avatar.png";

    return (
        <Link to={to} className={avatarClass}>
            {imageSrc && (
                <img
                    className={styles.image}
                    src={imageSrc}
                    alt={alt || "User Avatar"}
                />
            )}
        </Link>
    );
}
