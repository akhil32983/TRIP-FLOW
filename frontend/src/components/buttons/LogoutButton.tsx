import { useNavigate } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { useDemo } from "@/providers/demoProvider";

import Button from "@components/shared/Button";
import { useIsPWA } from "@/hooks/useIsPWA";
import { LogOutIcon } from "lucide-react";

interface LogoutButtonProps {
    to?: string;
    responsive?: boolean;
}

export default function LogoutButton({ to, responsive }: LogoutButtonProps) {
    const { logout } = useAuth();
    const { deactivateDemo } = useDemo();
    const isPWA = useIsPWA();
    const navigation = useNavigate();

    const targetPath = to || (isPWA ? "/login" : "/");

    const handleLogout = () => {
        logout();
        deactivateDemo();
        navigation(targetPath);
    }

    return (
        <Button
            style={[responsive ? "tool_bordered" : "secondary"]}
            label="Cerrar sesión"
            onClick={handleLogout}
        >
            <LogOutIcon size={18} />
        </Button>
    );
}