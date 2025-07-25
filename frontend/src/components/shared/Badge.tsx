import styles from "@styles/components/shared/Badge.module.css";

interface BadgeProps {
    style: "thin" | "default" | "semi_thin";
    title?: string;
    children?: React.ReactNode;
}

export default function Badge({ title, children, style }: BadgeProps) {
    if (!title) title = "Sin título";

    return (
        <span className={`${styles.badge} ${styles[style]}`}>
            {title}
            {children}
        </span>
    );
}
