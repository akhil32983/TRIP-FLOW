import styles from "@styles/components/form/Toggle.module.css";

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
}

export default function Toggle({ checked, onChange, disabled, label, id }: ToggleProps) {
    return (
        <label className={styles.toggle} htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <span className={styles.slider}></span>
            {label && <span className="sr-only">{label}</span>}
        </label>
    );
}
