import styles from "@styles/layouts/Layout.module.css";

import type { ReactNode } from "react";

import { useDemo } from "@/providers/demoProvider";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import DemoBanner from "@/components/shared/DemoBanner";

interface LayoutProps {
    single?: boolean;
    children: ReactNode;
}

export default function Layout({ single, children }: LayoutProps) {
    const { demo } = useDemo();

    return (
        <div className={styles.layout}>
            {demo && <DemoBanner />}
            {!single && <Header />}
            <main className={styles.main}>
                {children}
            </main>
            {!single && <Footer />}
        </div>
    );
}