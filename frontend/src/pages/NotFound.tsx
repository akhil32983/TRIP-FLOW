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
          <strong>Page Not Found</strong>
        </h1>
        <h3 className={styles.subtitle}>
          It seems you've taken a wrong turn.
        </h3>
        <p className={styles.text}>
          Don't worry, even the best travelers get lost sometimes.
        </p>
        <Button
          to={targetRoute}
          style={["primary"]}
          label="Go Back to Familiar Route"
        ></Button>
      </section>
    </Layout>
  );
}
