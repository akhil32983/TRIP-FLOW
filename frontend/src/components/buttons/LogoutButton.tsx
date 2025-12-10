import { useNavigate } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { useDemo } from "@/providers/demoProvider";
import { useIsPWA } from "@/hooks/useIsPWA";

interface LogoutButtonProps {
    to?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function LogoutButton({ to, className, children }: LogoutButtonProps) {
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
        <button className={className} onClick={handleLogout}>
            {children}
        </button>
    );
}