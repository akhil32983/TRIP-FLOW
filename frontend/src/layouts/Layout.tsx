import styles from "@styles/layouts/Layout.module.css";

import type { ReactNode } from "react";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

interface LayoutProps {
    single?: boolean;
    children: ReactNode;
}

export default function Layout({ single, children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            {!single && <Header />}
            <main className={styles.main}>
                {children}
            </main>
            {!single && <Footer />}
        </div>
    );
}