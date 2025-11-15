import styles from "@styles/components/shared/Logo.module.css";

interface LogoProps {
    size?: "small" | "xmedium" | "medium" | "large";
    responsive?: boolean;
}

export default function Logo({ size = "small", responsive = false }: LogoProps) {
    return (
        <div className={`${styles.container} ${styles[size]} ${responsive ? styles.responsive : ""}`}>
            <img src="/logo.svg" alt="TripFlow Logo" className={styles.logo} />
            <span className={styles.text}>TripFlow</span>
        </div>
    )
}