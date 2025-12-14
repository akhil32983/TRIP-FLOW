import styles from "@styles/layouts/AppLayout.module.css";

import type { ReactNode } from "react";

import Sidebar from "@components/shared/Sidebar";

interface LayoutProps {
    admin?: boolean;
    children: ReactNode;
}

export default function AppLayout({ admin, children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <Sidebar admin={admin} />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}