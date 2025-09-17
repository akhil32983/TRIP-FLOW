import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/providers/authProvider";
import { validatePassword, validateUsername } from "@/utils/validationUtils";

import type { RegisterRequest } from "@/types/auth";

import AuthForm from "@/components/form/AuthForm";
import Layout from "@/layouts/Layout";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle registration form submission
  const handleRegister = async (values: RegisterRequest) => {
    let isValid = true;
    setErrors(null);

    const usernameValidation = validateUsername(values.username);
    if (!usernameValidation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: usernameValidation.error as string,
      }));
      isValid = false;
    }

    const passwordValidation = validatePassword(
      values.password,
      values.confirmPassword
    );
    if (!passwordValidation.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordValidation.error as string,
      }));
      isValid = false;
    }

    if (!isValid) return;

    const res = await register(values);
    if (res.success) {
      navigate("/login");
    } else {
      setErrors(res.errors as Record<string, string>);
    }
  };

  return (
    <Layout single>
      <AuthForm
        fields={[
          { name: "username", label: "Usuario", placeholder: "CuB1z" },
          {
            name: "password",
            label: "Contraseña",
            type: "password",
            placeholder: "********",
          },
          {
            name: "confirmPassword",
            label: "Confirmar contraseña",
            type: "password",
            placeholder: "********",
          },
        ]}
        buttonLabel="Registrarse"
        onSubmit={(values: RegisterRequest) => handleRegister(values)}
        alternative={{
          alternative: "¿Ya tienes una cuenta?",
          alternativeLink: "/login",
          alternativeLabel: "Inicia sesión aquí",
        }}
        errors={errors}
      />
    </Layout>
  );
}
