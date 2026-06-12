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
            notify("Account deleted successfully", "success", {
                title: "Success",
                duration: 3000
            });

            await logout();
            deactivateDemo();
        } catch (error) {
            notify("Error deleting account", "error", {
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
                label="Delete Account"
                onClick={handleDelete}
            >
                <Trash2Icon size={20} />
            </Button>

            <Modal
                isOpen={isModalOpen}
                title="Delete Account"
                message="Are you sure you want to delete your account? This action cannot be undone."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setIsModalOpen(false)}
                variant="danger"
            />
        </>
    );
}
