import styles from "@styles/components/shared/Avatar.module.css";

import { Link } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { useState } from "react";
import { API_BASE_URL } from "@/config/environment";

interface AvatarProps {
    to: string;
    size?: "default" | "full";
}

export default function Avatar({ to, size = "default" }: AvatarProps) {
    const [error, setError] = useState(false);

    const { user } = useAuth();

    const avatarClass = `${styles.avatar} ${size === "full" ? styles.full : ""}`;
    const src = `${API_BASE_URL}/api/v1/users/${user?.username}/avatar`;

    return (
        <Link to={to} className={avatarClass}>
            {!error && (
                <img
                    className={styles.image}
                    src={src}
                    alt={user?.name || "User Avatar"}
                    onError={() => setError(true)}
                />
            )}
            {error && (
                <div className={styles.placeholder}>
                    {user?.name.charAt(0).toUpperCase() || "U"}
                </div>
            )}
        </Link>
    );
}
