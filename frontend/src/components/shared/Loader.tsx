import styles from "@styles/components/shared/Loader.module.css";

interface LoaderProps {
    size?: number;
    variant?: "spinner" | "dots";
}

export default function Loader({ size = 40, variant = "spinner" }: LoaderProps) {
    if (variant === "dots") {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loaderDots} style={{ fontSize: size / 4 }}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.loaderContainer}>
            <div 
                className={styles.loaderSpinner} 
                style={{ 
                    width: size, 
                    height: size,
                    borderWidth: Math.max(2, size / 10)
                }}
            />
        </div>
    );
}