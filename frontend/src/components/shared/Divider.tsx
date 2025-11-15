import styles from "@styles/components/shared/Divider.module.css";

interface DividerProps {
    maxWidth?: number | string;
}

export default function Divider({ maxWidth }: DividerProps) {
    return (
        <div style={{ maxWidth: maxWidth }} className={styles.divider} />
    );
}