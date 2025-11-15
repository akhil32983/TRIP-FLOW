import { useState } from 'react';

/**
 * Custom hook to manage the state of a modal.
 */
export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        openModal,
        closeModal
    };
}