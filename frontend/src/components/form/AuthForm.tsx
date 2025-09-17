import styles from "@styles/components/form/Form.module.css";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import Button from "@components/shared/Button";
import Divider from "@components/shared/Divider";
import Logo from "@components/shared/Logo";

import type { Field } from "@/types/form";

export type Errors = Record<string, string>;

export type Alternative = {
  alternative: string;
  alternativeLink: string;
  alternativeLabel: string;
};

type AuthFormProps<T extends Record<string, any>> = {
  fields: Field[];
  buttonLabel: string;
  onSubmit: (values: T) => void;
  alternative?: Alternative;
  errors?: Errors | null;
};

export default function AuthForm<T extends Record<string, any>>({
  fields,
  buttonLabel,
  onSubmit,
  alternative,
  errors,
}: AuthFormProps<T>) {
  const [values, setValues] = useState<T>({} as T);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className={styles.container}>
      <Button style={["logo"]} to="/">
        <Logo size="medium" />
      </Button>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div
            key={field.name}
            className={styles.field}
            style={{ "--index": index + 1 } as React.CSSProperties}
          >
            <label className={styles.fieldLabel} htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder || ""}
              onChange={handleChange}
            />
            {errors && errors[field.name] && (
              <div className={styles.error}>{errors[field.name]}</div>
            )}
          </div>
        ))}
        <Button style={["primary"]} label={buttonLabel} type="submit" />
      </form>
      {alternative && (
        <div className={styles.alternative}>
          <Divider maxWidth={400} />
          <div className={styles.alternativeText}>
            {alternative.alternative}
            <Button
              style={["inline"]}
              label={alternative.alternativeLabel}
              to={alternative.alternativeLink}
            />
          </div>
        </div>
      )}
      {errors && errors["global"] && (
        <div className={styles.error}>{errors["global"]}</div>
      )}
      {!navigator.onLine && (
        <div className={styles.offlineWarning}>
          <p>
            Estás desconectado. Para autenticarte, por favor conéctate a
            Internet.
          </p>
        </div>
      )}
    </div>
  );
}
