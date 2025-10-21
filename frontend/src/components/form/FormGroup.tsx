import styles from "@styles/components/form/Form.module.css";

export type Field = {
    name: string;
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "time" | "textarea" | "number" | "date";
    value?: string | number;
    required?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    icon?: React.ReactNode;
};

export default function FormGroup({ field, index, handleChange, errors, fullWidth }: {
    field: Field;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    index?: number;
    errors?: { [key: string]: string };
    fullWidth?: boolean;
}) {

    const renderInput = () => {
        const baseProps = {
            id: field.name,
            name: field.name,
            placeholder: field.placeholder || "",
            value: field.value || "",
            onChange: handleChange,
        }

        if (field.type === "textarea") return <textarea {...baseProps} />
        if (field.type === "number") return <input {...baseProps} type={field.type} min={field.min} max={field.max} step={field.step} />
        return <input {...baseProps} type={field.type || "text"} />
    }

    return (
        <div
            key={field.name}
            className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}
            style={{ "--index": (index ? index + 1 : 1) } as React.CSSProperties}
        >
            <label className={styles.fieldLabel} htmlFor={field.name}>
                {field.icon}
                <span className={styles.fieldLabelText}>{field.label}</span>
                {field.required && <span className={styles.required}>*</span>}
            </label>

            {renderInput()}

            {errors && errors[field.name] && (
                <div className={styles.error}>
                    {errors[field.name]}
                </div>
            )}
        </div>
    );
}