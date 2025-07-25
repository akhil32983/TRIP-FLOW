import styles from "@styles/components/sections/Hero.module.css";

import Badge from "@components/shared/Badge";
import Button from "@components/shared/Button";

export default function Hero() {

    return (
        <section className={styles.hero} data-testid="hero-section">
            <div className={styles.content}>
                <Badge style="default" title="🚀 Impulsado por IA" />
                <h1 className={styles.title}>Planifica tus <strong>viajes del futuro</strong></h1>
                <p className={styles.description}>Optimización de rutas, itinerarios personalizados y acceso offline con tecnología IA.</p>
                <div className={styles.actions}>
                    <Button style={["primary"]} label="Comenzar ahora" to="/signup" />
                    <Button style={["secondary"]} label="Probar demo" to="/demo" />
                </div>
            </div>
        </section>
    );
}