import { useState } from "react";

import { useAuth } from "@/providers/authProvider";
import { useDemo } from "@/providers/demoProvider";
import { useNotification } from "@/providers/notificationProvider";

import { deleteAccount } from "@/services/userService";

import { Trash2Icon } from "lucide-react";

import Button from "@components/shared/Button";
import Modal from "@components/shared/Modal";

export default function DeleteAccountButton() {
    const { user, logout } = useAuth();
    const { deactivateDemo } = useDemo();
    const { notify } = useNotification();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!user) return;
        
        try {
            await deleteAccount(user.username);
            notify("Cuenta eliminada correctamente", "success", {
                title: "Éxito",
                duration: 3000
            });

            await logout();
            deactivateDemo();
        } catch (error) {
            notify("Error al eliminar la cuenta", "error", {
                title: "Error",
                duration: 4000
            });
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Button
                type="button"
                style={["primary", "danger"]}
                label="Eliminar Cuenta"
                onClick={handleDelete}
            >
                <Trash2Icon size={20} />
            </Button>

            <Modal
                isOpen={isModalOpen}
                title="Eliminar Cuenta"
                message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setIsModalOpen(false)}
                variant="danger"
            />
        </>
    );
}
