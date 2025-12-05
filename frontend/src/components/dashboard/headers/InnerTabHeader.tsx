import styles from "@styles/components/dashboard/headers/InnerTabHeader.module.css";

import type { JSX } from "react";

import { ChevronLeftIcon } from "lucide-react";

import Button from "@components/shared/Button";
import Divider from "@/components/shared/Divider";

interface InnerTabHeaderProps {
    title: string;
    back: {
        url: string;
        label: string;
    };
    right?: JSX.Element;
}

export default function InnerTabHeader({ title, back, right }: InnerTabHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Button to={back.url} style={["inline"]} label={back.label} noGap>
                    <ChevronLeftIcon size={18} />
                </Button>
                <h2 className={styles.title}>{title}</h2>
                {right}
            </div>
            <Divider />
        </header>
    );
}