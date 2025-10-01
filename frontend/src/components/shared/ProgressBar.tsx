import styles from "@styles/components/shared/ProgressBar.module.css";

interface ProgressBarProps {
    progress: number;
    showPercentage?: boolean;
    fullWidth?: boolean;
}

export default function ProgressBar({ progress, showPercentage = true, fullWidth = false }: ProgressBarProps) {
    // Ensure progress is between 0 and 100
    progress = Math.max(0, Math.min(progress, 100));

    const progressBarStyle = fullWidth ? { width: "100%" } : {};

    return (
        <div className={styles.progressBar} style={progressBarStyle}>
            <progress value={progress} max={100} className={styles.progress} style={progressBarStyle} />
            {showPercentage && <span className={styles.percentage}>{progress}%</span>}
        </div>
    )
}