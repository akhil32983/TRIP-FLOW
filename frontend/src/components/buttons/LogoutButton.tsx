import { useNavigate } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { useDemo } from "@/providers/demoProvider";
import { useIsPWA } from "@/hooks/useIsPWA";
import React from "react";
import Button from "../shared/Button";

interface LogoutButtonProps {
    to?: string;
    integrated?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function LogoutButton({ to, integrated, className, children }: LogoutButtonProps) {
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

    if (integrated) {
        return <Button
            style={["danger", "primary"]}
            onClick={handleLogout}
            children={children}
        />
    }

    return (
        <button className={className} onClick={handleLogout}>
            {children}
        </button>
    );
}