import styles from "@styles/components/shared/Header.module.css";

import Button from "@components/shared/Button";
import Logo from "@components/shared/Logo";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Button to="/" style={["logo"]}>
                    <Logo size="small" responsive />
                </Button>
                <Button style={["primary"]} label="Acceder" to="/login" />
            </div>
        </header>
    );
}