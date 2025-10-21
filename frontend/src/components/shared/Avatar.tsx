import styles from "@styles/components/shared/Avatar.module.css";

import { Link } from "react-router";

import { ShieldUserIcon } from "lucide-react";

interface AvatarProps {
    to: string;
    src?: string;
    alt?: string;
    size?: "default" | "full";
}

export default function Avatar({
    src,
    alt,
    to,
    size = "default",
}: AvatarProps) {
    const avatarClass = `${styles.avatar} ${size === "full" ? styles.full : ""}`;

    return (
        <Link to={to} className={avatarClass}>
            {src && (
                <img
                    className={avatarClass}
                    src={src}
                    alt={alt || "User Avatar"}
                />
            )}
            {!src && <ShieldUserIcon className={styles.icon} strokeWidth={1} />}
        </Link>
    );
}
