import styles from "@styles/components/dashboard/InnerTabHeader.module.css";

import type { JSX } from "react";

import { ArrowLeftIcon } from "lucide-react";
import Button from "@components/shared/Button";

interface InnerTabHeaderProps {
    title: string | JSX.Element;
    backUrl: string;
}

export default function InnerTabHeader({ title, backUrl }: InnerTabHeaderProps) {
    return (
        <header className={styles.header}>
            {backUrl && <Button to={backUrl} style={["inline"]} label="Volver"><ArrowLeftIcon size={18} /></Button>}
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
}