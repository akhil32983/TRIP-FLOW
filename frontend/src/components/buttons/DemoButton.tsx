import { useDemo } from "@/providers/demoProvider";
import { useAuth } from "@/providers/authProvider";

import type { LoginRequest } from "@/types/auth";

import Button from "@components/shared/Button";
import { useNavigate } from "react-router";

interface DemoButtonProps {
    style?: "primary" | "secondary";
};

const mockLoginReq: LoginRequest = {
    username: "demoUser",
    password: "Ab12345678",    
}

export default function DemoButton({ style = "secondary" }: DemoButtonProps) {
    const { demo, activateDemo, deactivateDemo } = useDemo();
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (demo) {
            deactivateDemo();
            logout();
            navigate("/");
        } else {
            activateDemo();
            login(mockLoginReq);
            navigate("/dashboard");
        }
    };

    return (
        <Button
            style={[style]}
            label={demo ? "Abandonar demo" : "Probar demo"}
            onClick={handleClick}
        />
    );
}