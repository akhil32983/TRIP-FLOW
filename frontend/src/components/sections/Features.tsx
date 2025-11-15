import styles from "@styles/components/sections/Features.module.css";

import Section from "@components/shared/Section";

import { BrainIcon, CloudOffIcon, RouteIcon } from "lucide-react";

const FEATURES_DATA = [
  {
    icon: BrainIcon,
    title: "Itinerarios con IA",
    description:
      "TripFlow genera automáticamente planes de viaje personalizados basados en tus gustos, intereses y duración del viaje, para que disfrutes al máximo sin preocupaciones.",
  },
  {
    icon: CloudOffIcon,
    title: "Acceso sin conexión",
    description:
      "Consulta tu itinerario en cualquier momento, incluso sin conexión a internet, para que siempre tengas tu plan de viaje a mano.",
  },
  {
    icon: RouteIcon,
    title: "Rutas Óptimas",
    description:
      "Optimiza el orden de los lugares a visitar para ahorrar tiempo y dinero, evitando desplazamientos innecesarios y maximizando tu experiencia.",
  },
];

export default function Features() {
  return (
    <Section
      title={
        <>
          ¿Por qué <strong>TripFlow</strong>?
        </>
      }
    >
      <div className={styles.featuresContainer}>
        {FEATURES_DATA.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            {<feature.icon className={styles.icon} size={36} />}
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
