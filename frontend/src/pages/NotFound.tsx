import styles from "@styles/pages/NotFound.module.css";

import { useAuth } from "@/providers/authProvider";

import Layout from "@/layouts/Layout";
import Logo from "@/components/shared/Logo";
import Button from "@/components/shared/Button";

export default function NotFoundPage() {
  const { user } = useAuth();
  const targetRoute = user ? "/dashboard" : "/";

  return (
    <Layout single>
      <section className={styles.notFound}>
        <Logo size="large" />
        <h1 className={styles.title}>
          <strong>404 - Página no encontrada</strong>
        </h1>
        <h3 className={styles.subtitle}>
          Parece que te has equivocado de ruta.
        </h3>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Pero no te preocupes, incluso los mejores viajeros se pierden a
            veces.
          </p>
          <p className={styles.text}>
            Puedes volver al inicio y seguir planeando tu próxima aventura.
          </p>
        </div>
        <Button
          to={targetRoute}
          style={["primary"]}
          label="Volver a una ruta conocida"
        ></Button>
      </section>
    </Layout>
  );
}
