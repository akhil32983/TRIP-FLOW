import styles from "@styles/components/shared/Avatar.module.css";

import { Link } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { useState } from "react";
import { API_BASE_URL } from "@/config/environment";
import { useDemo } from "@/providers/demoProvider";

interface AvatarProps {
    to?: string;
    username?: string;
    size?: "default" | "full";
}

export default function Avatar({
    to, username, size = "default"
}: AvatarProps) {
    const [error, setError] = useState(false);

    const { user } = useAuth();
    const { demo } = useDemo();

    const targetUsername = username || user?.username;

    const avatarClass = `${styles.avatar} ${size === "full" ? styles.full : ""}`;
    const src = `${API_BASE_URL}/api/v1/users/${targetUsername}/avatar`;

    let body;

    if (demo) {
        body = (
            <div className={styles.placeholder}>
                {(targetUsername || "U").charAt(0).toUpperCase()}
            </div>
        );
    } else {
        body = (
            <>
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
                        {(targetUsername || "U").charAt(0).toUpperCase()}
                    </div>
                )}
            </>
        );
    }

    if (to) {
        return (
            <Link to={to} className={avatarClass}>
                {body}
            </Link>
        );
    }

    return (
        <div className={avatarClass}>
            {body}
        </div>
    );
}