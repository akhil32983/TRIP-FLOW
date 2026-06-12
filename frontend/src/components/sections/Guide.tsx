import styles from "@styles/components/sections/Guide.module.css";

import Section from "@components/shared/Section";

export default function Guide() {
  return (
    <Section
      title={
        <>
          Install TripFlow on Your <strong>Mobile</strong>
        </>
      }
    >
      <div className={styles.guide}>
        <div className={styles.content}>
          <p className={styles.p}>
            If you want to enjoy all the benefits that TripFlow offers,
            download our PWA application.
          </p>
          <p className={styles.p}>
            It is easy to install, fast, works offline, and is available for
            both mobile devices and computers.
          </p>

          <h3 className={styles.subtitle}>How can I install it?</h3>

          <ol>
            <li className={styles.text}>
              Open TripFlow in your browser (Chrome, Edge, or Firefox).
            </li>

            <li className={styles.text}>
              Look for the <strong>"Add to Home Screen"</strong> or{" "}
              <strong>"Install App"</strong> option in the browser menu.
            </li>

            <li className={styles.text}>
              Follow the instructions to add TripFlow to your device.
            </li>

            <li className={styles.text}>
              That's it! Access TripFlow quickly, even when offline.
            </li>
          </ol>
        </div>

        <div className={styles.guideImage}>
          <div className={styles.imageContainer}>
            <img
              src="/assets/brain.webp"
              alt="Big pink brain - Guide"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}