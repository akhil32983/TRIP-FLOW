import Button from "@/components/shared/Button";
import styles from "@styles/components/dashboard/ai/AICta.module.css";

import { Sparkles } from "lucide-react";

export default function AICta() {
    return (
        <section className={styles.aiCtaSection}>
            <div className={styles.aiCtaHeader}>
                <Sparkles size={24} className={styles.aiCtaIcon} />
                <h2 className={styles.aiCtaTitle}>AI Assistant</h2>
            </div>
            <div className={styles.cta}>
                <p>Are you ready to plan your next trip? Discover the power of our AI to help you plan your travels in a matter of seconds.</p>
                <Button
                    style={["primary", "big", "full"]}
                    label="Get Started"
                    to="/itineraries/new?editorType=ai"
                />
            </div>
        </section>
    );
}