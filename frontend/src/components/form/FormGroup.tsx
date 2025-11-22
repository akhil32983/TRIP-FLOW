import styles from "@styles/components/form/Form.module.css";

export type Field = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "time" | "textarea" | "number" | "date" | "select";
    value?: string | number;
    options?: { value: string | number; label: string }[];
    required?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    icon?: React.ReactNode;
};

export default function FormGroup({ field, index, handleChange, errors, fullWidth }: {
    field: Field;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
        if (field.type === "select") return (
            <select
                id={field.name}
                name={field.name}
                value={field.value || ""}
                onChange={handleChange}
            >
                {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
        return <input {...baseProps} type={field.type || "text"} />
    }

    return (
        <div
            key={field.name}
            className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}
            style={{ "--index": (index ? index + 1 : 1) } as React.CSSProperties}
        >
            {field.label && (
                <label className={styles.fieldLabel} htmlFor={field.name}>
                    {field.icon}
                    <span className={styles.fieldLabelText}>{field.label}</span>
                    {field.required && <span className={styles.required}>*</span>}
                </label>
            )}
                

            {renderInput()}

            {errors && errors[field.name] && (
                <div className={styles.error}>
                    {errors[field.name]}
                </div>
            )}
        </div>
    );
}