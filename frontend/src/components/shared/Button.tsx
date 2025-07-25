import styles from "@styles/components/shared/Button.module.css";

import { NavLink } from "react-router";

type ButtonStyle = "primary" | "secondary" |"inline" | "tool" | "logo";
type Target = "_blank" | "_self" | "_parent" | "_top";
type Rel = "noopener noreferrer" | "nofollow" | "noopener" | "noreferrer";

interface ButtonProps {
    style: ButtonStyle[];
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    to?: string;
    target?: Target;
    rel?: Rel;
    ariaLabel?: string;
    children?: React.ReactNode;
}

/**
 * Button component for rendering unified styled buttons or links.
 */
export default function Button({ label, onClick, style, type, to, target, rel, ariaLabel, children }: ButtonProps) {
    let customStyles = `${styles.button}`;
    style.map(s => customStyles += ` ${styles[s]}`);

    const body = (
        <>
            {children}
            {label && <span className={styles.label}>{label}</span>}
        </>
    )

    if (to) return <NavLink to={to} className={customStyles} target={target} rel={rel} aria-label={ariaLabel}>{body}</NavLink>;
    else return <button className={customStyles} type={type} onClick={onClick} aria-label={ariaLabel}>{body}</button>;
}