import styles from "@styles/components/sections/Hero.module.css";

import { useAuth } from "@/providers/authProvider";

import { RocketIcon } from "lucide-react";

import Badge from "@components/shared/Badge";
import Button from "@components/shared/Button";
import DemoButton from "@components/buttons/DemoButton";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className={styles.hero} data-testid="hero-section">
      <div className={styles.content}>
        <Badge style="default">
          <>
            <RocketIcon size={16} />
            Impulsado por IA
          </>
        </Badge>
        <h1 className={styles.title}>
          Plan your <strong>Future Trips</strong>
        </h1>
        <p className={styles.description}>
          Route optimization, personalized itineraries and offline access with
          AI.
        </p>
        <div className={styles.actions}>
          <Button style={["primary", "big"]} label="Get Started" to={user ? "/dashboard" : "/signup"} />
          <DemoButton style="secondary" />
        </div>
      </div>
    </section>
  );
}
