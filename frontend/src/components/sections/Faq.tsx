import styles from "@styles/components/sections/Faq.module.css";
import Section from "@components/shared/Section";
import Button from "../shared/Button";

const FAQ_DATA = [
  {
    question: "¿Es gratuito TripFlow?",
    answer:
      "Sí, puedes usar TripFlow de forma gratuita con acceso a las funcionalidades principales. Sin embargo, algunas características avanzadas pueden requerir una suscripción.",
  },
  {
    question: "¿Necesito conexión a internet para usar TripFlow?",
    answer:
      "No necesariamente. Una vez generado el itinerario, puedes acceder a él sin conexión gracias a nuestra tecnología PWA.",
  },
  {
    question: "¿TripFlow funciona en cualquier país?",
    answer:
      "Sí, TripFlow es compatible con destinos de todo el mundo y adapta sus recomendaciones según el lugar y la cultura local.",
  },
  {
    question: "¿Puedo personalizar mi itinerario?",
    answer:
      "Sí, puedes ajustar tu itinerario según tus preferencias, añadir o eliminar actividades y modificar horarios.",
  },
];

export default function Faq() {
  return (
    <Section title={<>Preguntas Frecuentes</>}>
      <div className={styles.faq}>
        {FAQ_DATA.map((item, index) => (
          <details key={index} className={styles.faqItem} open={index === 0}>
            <summary className={styles.faqQuestion}>{item.question}</summary>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </details>
        ))}
        <div className={styles.faqActions}>
          <Button label="Quiero saber más" to="/about" style={["primary"]} />
        </div>
      </div>
    </Section>
  );
}
