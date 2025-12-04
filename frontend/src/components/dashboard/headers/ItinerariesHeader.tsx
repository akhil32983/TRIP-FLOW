import styles from "@styles/components/dashboard/headers/ItinerariesHeader.module.css";

import Button from "@/components/shared/Button";
import Divider from "@/components/shared/Divider";

interface ItinerariesHeaderProps {
    children: React.ReactNode;
}

export default function ItinerariesHeader({ children } : ItinerariesHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h3 className={styles.title}>Itinerarios</h3>
                <Button
                    style={["primary"]}
                    label="Crear Itinerario"
                    to="/itineraries/new"
                />
            </div>
            {children}
            <Divider />
        </header>
    );
}