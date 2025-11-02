import styles from "@styles/components/shared/Alert.module.css";

import { useEffect } from "react";

import { AlertCircle, CheckCircle, Info, AlertTriangle, XIcon } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
    type?: AlertType;
    title?: string;
    message: string;
    isOpen: boolean;
    onClose: () => void;
    autoClose?: boolean;
    autoCloseDuration?: number;
}

const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export default function Alert({
    type = "info",
    title,
    message,
    isOpen,
    onClose,
    autoClose = true,
    autoCloseDuration = 3000,
}: AlertProps) {
    const Icon = iconMap[type];

    useEffect(() => {
        if (isOpen && autoClose) {
            const timer = setTimeout(onClose, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, autoCloseDuration, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.alert} ${styles[type]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} aria-label="Cerrar alerta" className={styles.closeButton}>
                    <XIcon size={20} />
                </button>

                <div className={styles.header}>
                    <Icon className={styles.icon} />
                    {title && <h3 className={styles.title}>{title}</h3>}

                </div>
                
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}