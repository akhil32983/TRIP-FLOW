import styles from "@styles/components/shared/Accordion.module.css";

import type { ReactNode } from "react";

import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
    title: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
}

export default function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ''}`}>
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
