import styles from "@styles/components/shared/DemoBanner.module.css";

import { CompassIcon } from "lucide-react";

import DemoButton from "@components/buttons/DemoButton";

interface DemoBannerProps {
    rounded?: boolean;
}

export default function DemoBanner({ rounded }: DemoBannerProps) {
    return (
        <div className={`${styles.demoBanner} ${rounded ? styles.rounded : ""}`}>
            <div className={styles.left}>
                <CompassIcon size={24} />
                <span>Modo demostración. Algunas funcionalidades pueden estar limitadas.</span>
            </div>
            <div className={styles.right}>
                <DemoButton />
            </div>
        </div>
    );
}