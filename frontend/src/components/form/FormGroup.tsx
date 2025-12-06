import styles from "@styles/components/form/Form.module.css";

export type Field = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "time" | "textarea" | "number" | "date" | "select";
    value?: string | number;
    disabled?: boolean;
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
        const inputClassName = field.icon ? styles.inputWithIcon : "";
        const baseProps = {
            id: field.name,
            disabled: field.disabled,
            name: field.name,
            placeholder: field.placeholder || "",
            value: field.value || "",
            onChange: handleChange,
            className: inputClassName,
        }

        let inputElement;

        if (field.type === "textarea") {
            inputElement = <textarea {...baseProps} />;
        } else if (field.type === "number" || field.type === "date" || field.type === "time") {
            inputElement = <input {...baseProps} type={field.type} min={field.min} max={field.max} step={field.step} />;
        } else if (field.type === "select") {
            inputElement = (
                <select
                    id={field.name}
                    name={field.name}
                    value={field.value || ""}
                    onChange={handleChange}
                    className={inputClassName}
                >
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        } else {
            inputElement = <input {...baseProps} type={field.type || "text"} />;
        }

        return (
            <div className={styles.inputWrapper}>
                {inputElement}
                {field.icon && (
                    <div className={styles.inputIcon}>
                        {field.icon}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            key={field.name}
            className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}
            style={{ "--index": (index ? index + 1 : 1) } as React.CSSProperties}
        >
            {field.label && (
                <label className={styles.fieldLabel} htmlFor={field.name}>
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