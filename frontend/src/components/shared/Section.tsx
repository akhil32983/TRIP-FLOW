import styles from "@styles/components/shared/Section.module.css";
import type { ReactNode } from "react";

interface SectionProps {
  title: ReactNode;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}
