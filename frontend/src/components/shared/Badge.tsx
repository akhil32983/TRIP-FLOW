import type { ItineraryStatus } from "@/types/itinerary";
import styles from "@styles/components/shared/Badge.module.css";

interface BadgeProps {
    style: "thin" | "default" | "semi_thin";
    title?: string;
    children?: React.ReactNode;
    status?: ItineraryStatus;
    action?: React.ReactNode;
}

export default function Badge({
    title,
    children,
    style,
    status = "ONGOING",
    action
}: BadgeProps) {
    if (!title && !children) {
        if (!title && status === "DRAFT") title = "Borrador";
        if (!title && status === "ACTIVE") title = "Activo";
        if (!title && status === "ONGOING") title = "En curso";
        if (!title && status === "COMPLETED") title = "Completado";
    }

    return (
        <span className={`${styles.badge} ${styles[style]} ${styles[status.toLowerCase()]}`}>
            {title}
            {children}
            {action}
        </span>
    );
}
