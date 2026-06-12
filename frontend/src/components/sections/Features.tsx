import styles from "@styles/components/sections/Features.module.css";

import Section from "@components/shared/Section";

import { BrainIcon, CloudOffIcon, RouteIcon } from "lucide-react";

const FEATURES_DATA = [
  {
    icon: BrainIcon,
    title: "AI-Powered Itineraries",
    description:
      "TripFlow automatically generates customized travel itineraries based on your preferences, interests, and trip duration, allowing you to enjoy your journey without worries.",
  },
  {
    icon: CloudOffIcon,
    title: "Offline Access",
    description:
      "Access your itinerary anytime, even without an internet connection, so your travel plans are always available.",
  },
  {
    icon: RouteIcon,
    title: "Optimized Routes",
    description:
      "Optimize the order of places to visit, saving time and money while maximizing your travel experience.",
  },
];

export default function Features() {
  return (
    <Section
      title={
        <>
          Why <strong>TripFlow</strong>?
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
