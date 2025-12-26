import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { validateUsername, validatePassword } from "@/utils/validationUtils";

import type { LoginRequest } from "@/types/auth";

import { LockIcon, UserIcon } from "lucide-react";

import Layout from "@/layouts/Layout";
import AuthForm from "@components/form/AuthForm";

export default function LoginPage() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string> | null>(null);

    // If user is already logged in, redirect to dashboard page
    useEffect(() => {
        if (user && user.role === "ADMIN") {
            navigate("/admin");
        } else if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    // Handle login form submission
    const handleLogin = async (values: LoginRequest) => {
        let isValid = true;
        setErrors(null);

        const usernameValidation = validateUsername(values.username, true);
        if (!usernameValidation.isValid) {
            isValid = false;
            setErrors((prev) => ({
                ...prev,
                username: usernameValidation.error as string,
            }));
        }

        const passwordValidation = validatePassword(
            values.password,
            undefined,
            true
        );
        if (!passwordValidation.isValid) {
            isValid = false;
            setErrors((prev) => ({
                ...prev,
                password: passwordValidation.error as string,
            }));
        }

        if (!isValid) return;

        const res = await login(values);
        if (!res.success) {
            setErrors(res.errors as Record<string, string>);
        }
    };

    return (
        <Layout single>
            <AuthForm
                active="login"
                fields={[
                    {
                        name: "username",
                        label: "Usuario / Email",
                        placeholder: "CuB1z",
                        icon: <UserIcon size={16} />,
                    },
                    {
                        name: "password",
                        label: "Contraseña",
                        type: "password",
                        placeholder: "********",
                        icon: <LockIcon size={16} />,
                    },
                ]}
                buttonLabel="Iniciar sesión"
                onSubmit={(values: LoginRequest) => handleLogin(values)}
                errors={errors}
            />
        </Layout>
    );
}
