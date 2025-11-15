import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the app is running as a PWA (standalone mode).
 * Reacts to changes in display mode.
 */
export function useIsPWA() {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(display-mode: standalone)");

        const check = () => {
            setIsPWA(
                media.matches ||
                (window.navigator as any).standalone === true
            );
        };

        check();
        media.addEventListener("change", check);

        return () => {
            media.removeEventListener("change", check);
        };
    }, []);

    return isPWA;
}