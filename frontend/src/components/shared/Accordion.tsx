import styles from "@styles/components/shared/Accordion.module.css";

import type { ReactNode } from "react";

import { ChevronDown } from "lucide-react";

interface AccordionProps {
    title: ReactNode;
    widthLimited?: boolean;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
}

export default function Accordion({ title, widthLimited, isOpen, onToggle, children }: AccordionProps) {
    const accordionStyles = `
        ${styles.accordionItem}
        ${isOpen ? styles.accordionOpen : ''}
        ${widthLimited ? styles.accordionWidthLimited : ''}
    `;

    return (
        <div className={accordionStyles}>
            <button
                className={styles.accordionHeader}
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className={styles.accordionTitle}>{title}</span>
                <ChevronDown
                    className={styles.accordionIcon}
                    size={20}
                />
            </button>
            <div className={styles.accordionContent}>
                <div className={styles.accordionContentInner}>
                    {children}
                </div>
            </div>
        </div>
    );
}
