import Button from "@/components/shared/Button";
import Divider from "@/components/shared/Divider";
import styles from "@styles/components/dashboard/headers/DashboardHeader.module.css";

interface DashboardHeaderProps {
    name?: string;
}

export default function DashboardHeader({ name } : DashboardHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span className={styles.welcome}>Bienvenido,</span>
                    {name && <span className={styles.name}>{name}</span>}
                </div>
                <Button
                    style={["primary"]}
                    label="Crear Itinerario"
                    to="/itineraries/new"
                />
            </div>
            <Divider />
        </header>
    );
}