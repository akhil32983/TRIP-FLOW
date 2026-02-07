import styles from "@styles/components/dashboard/InfoCard.module.css";

import type { JSX } from "react";

interface InfoCardProps {
    icon: string | JSX.Element;
    title: string;
    value: string | number;
}

export default function InfoCard({ icon, title, value }: InfoCardProps) {
    return (
        <div className={styles.infoCard}>
            <span className={styles.icon}>{icon}</span>
            <p className={styles.value}>{value}</p>
            <p className={styles.title}>{title}</p>
        </div>
    );
}
