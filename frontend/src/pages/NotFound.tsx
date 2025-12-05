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
          <strong>404</strong>
          <strong>Página no encontrada</strong>
        </h1>
        <h3 className={styles.subtitle}>
          Parece que te has equivocado de ruta.
        </h3>
        <p className={styles.text}>
          No te preocupes, incluso los mejores viajeros se pierden a veces.
        </p>
        <Button
          to={targetRoute}
          style={["primary"]}
          label="Volver a una ruta conocida"
        ></Button>
      </section>
    </Layout>
  );
}
