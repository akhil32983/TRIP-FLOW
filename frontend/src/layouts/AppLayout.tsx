import styles from "@styles/layouts/AppLayout.module.css";

import type { ReactNode } from "react";

import Sidebar from "@components/shared/Sidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}