import { useAuth } from "@/providers/authProvider";
import { useNavigate } from "react-router";

import Button from "@components/shared/Button";
import { useIsPWA } from "@/hooks/useIsPWA";
import { LogOutIcon } from "lucide-react";

interface LogoutButtonProps {
    to?: string;
    responsive?: boolean;
}

export default function LogoutButton({ to, responsive }: LogoutButtonProps) {
    const { logout } = useAuth();
    const isPWA = useIsPWA();
    const navigation = useNavigate();

    const targetPath = to || (isPWA ? "/login" : "/");

    const handleLogout = () => {
        logout();
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