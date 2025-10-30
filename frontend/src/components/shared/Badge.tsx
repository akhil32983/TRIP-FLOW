import styles from "@styles/components/shared/Badge.module.css";

import type { ItineraryStatus } from "@/types/itinerary";

import { formatStatus } from "@/utils/formatUtils";

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
    if (!title && !children) title = formatStatus(status);

    return (
        <span className={`${styles.badge} ${styles[style]} ${styles[status.toLowerCase()]}`}>
            {title}
            {children}
            {action}
        </span>
    );
}
