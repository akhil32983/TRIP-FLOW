import styles from "@styles/components/shared/Header.module.css";

import { useAuth } from "@/providers/authProvider";

import Button from "@components/shared/Button";
import Logo from "@components/shared/Logo";
import Avatar from "./Avatar";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Button to="/" style={["logo"]}>
          <Logo size="small" responsive />
        </Button>
        {!user ? (
          <Button style={["primary"]} label="Acceder" to="/login" />
        ) : (
          <Avatar to={user.role === "USER" ? "/dashboard" : "/admin"} />
        )}
      </div>
    </header>
  );
}
