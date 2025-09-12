import styles from "@styles/components/sections/Cta.module.css";

import Section from "../shared/Section";
import Button from "../shared/Button";

export default function Cta() {
  return (
    <Section title={<>¿Aún no te hemos convencido?</>}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaText}>
          Prueba nuestra demo y descubre si somos la solución que necesitas.
        </p>
        <p className={styles.ctaText}>
          Si tienes alguna duda, no dudes en contactarnos.
        </p>
        <div className={styles.actions}>
          <Button style={["primary"]} label="Probar demo" to="/demo" />
        </div>
      </div>
    </Section>
  );
}
