import { useState } from "react";

import type { LoginRequest } from "@/types/auth";

import Layout from "@/layouts/Layout";
import AuthForm from "@/components/form/AuthForm";

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleLogin = async (values: LoginRequest) => {
    console.log(values);
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
        ]}
        buttonLabel="Iniciar sesión"
        onSubmit={(values: LoginRequest) => handleLogin(values)}
        alternative={{
          alternative: "¿No tienes una cuenta?",
          alternativeLink: "/signup",
          alternativeLabel: "Regístrate aquí",
        }}
        errors={errors}
      />
    </Layout>
  );
}
