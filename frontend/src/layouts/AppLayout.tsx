import styles from "@styles/layouts/AppLayout.module.css";

import Sidebar from "@components/shared/Sidebar";

import type { ReactNode } from "react";

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