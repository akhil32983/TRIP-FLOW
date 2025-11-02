import { useState, useCallback } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
    isOpen: boolean;
    type: AlertType;
    title?: string;
    message: string;
}

export function useAlert() {
    const [alert, setAlert] = useState<AlertState>({
        isOpen: false,
        type: "info",
        message: "",
    });

    const showAlert = useCallback((
        message: string,
        type: AlertType = "info",
        title?: string
    ) => {
        setAlert((prev) => {
            if (prev.isOpen) {
                setTimeout(() => {
                    setAlert({
                        isOpen: true,
                        type,
                        title,
                        message,
                    });
                }, 0);

                return { ...prev, isOpen: false };
            }

            return {
                isOpen: true,
                type,
                title,
                message,
            };
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }));
    }, []);

    return {
        alert,
        showAlert,
        hideAlert,
    };
}