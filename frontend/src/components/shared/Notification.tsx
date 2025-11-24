import styles from "@styles/components/shared/Notification.module.css";

import { AlertCircle, CheckCircle, Info, AlertTriangle, XIcon } from "lucide-react";

export type NotificationRendererType = "info" | "success" | "error" | "warning";

interface NotificationProps {
    type?: NotificationRendererType;
    title?: string;
    message: string;
    onClose: () => void;
    isClosing?: boolean;
    onExited?: () => void;
}

const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export default function Notification({
    type = "info",
    title,
    message,
    onClose,
    isClosing,
    onExited,
}: NotificationProps) {
    const Icon = iconMap[type];

    return (
        <div
            className={`${styles.notification} ${styles[type]} ${isClosing ? styles.closing : ""}`}
            onClick={(e) => e.stopPropagation()}
            role="alert"
            onAnimationEnd={() => {
                if (isClosing && onExited) {
                    onExited();
                }
            }}
        >
            <button onClick={onClose} aria-label="Cerrar notificación" className={styles.closeButton}>
                <XIcon size={18} />
            </button>

            <div className={styles.header}>
                <Icon className={styles.icon} />
                {title && <h3 className={styles.title}>{title}</h3>}
            </div>
            
            <p className={styles.message}>{message}</p>
        </div>
    );
}