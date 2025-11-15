import styles from "@styles/components/dashboard/DashboardHeader.module.css";

import type { JSX } from "react";

interface DashboardHeaderProps {
    title?: string | JSX.Element;
    responsiveRender: JSX.Element;
    defaultRender: JSX.Element;
}

export default function DashboardHeader({ title, responsiveRender, defaultRender }: DashboardHeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.responsive}>{responsiveRender}</div>
            <div className={styles.default}>{defaultRender}</div>
        </header>
    );
}