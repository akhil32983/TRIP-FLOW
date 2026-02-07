import styles from "@styles/components/shared/Modal.module.css";

import { useEffect, useRef } from "react";

import { XIcon } from "lucide-react";

import Button from "@components/shared/Button";

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: "danger" | "info";
}

export default function Modal({
    isOpen,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    variant = "danger",
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div
                ref={modalRef}
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <Button style={["tool_bordered"]} onClick={onCancel} ariaLabel="Cerrar modal">
                        <XIcon size={20} />
                    </Button>
                </div>

                <div className={styles.body}>
                    <p className={styles.message}>{message}</p>
                </div>

                <div className={styles.footer}>
                    <Button type="button" style={["secondary"]} onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button type="button" style={["primary", variant]} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
