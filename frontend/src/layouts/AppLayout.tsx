import styles from "@styles/layouts/AppLayout.module.css";

import type { ReactNode } from "react";

import { useDemo } from "@/providers/demoProvider";

import Sidebar from "@components/shared/Sidebar";
import DemoBanner from "@/components/shared/DemoBanner";

interface LayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
    const { demo } = useDemo();
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                {demo && <DemoBanner rounded />}
                {children}
            </main>
        </div>
    );
}