export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "time"
    | "textarea"
    | "number"
    | "date";
  value?: string | number;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  icon?: React.ReactNode;
};
