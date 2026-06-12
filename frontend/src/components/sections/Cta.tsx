import styles from "@styles/components/sections/Cta.module.css";

import Section from "@components/shared/Section";
import DemoButton from "@components/buttons/DemoButton";

export default function Cta() {
  return (
    <Section title={<>Still not convinced?</>}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaText}>
          Try our demo and discover if we are the solution you need.
        </p>
        <p className={styles.ctaText}>
          If you have any questions, don't hesitate to contact us.
        </p>
        <div className={styles.actions}>
          <DemoButton style="primary" />
        </div>
      </div>
    </Section>
  );
}
