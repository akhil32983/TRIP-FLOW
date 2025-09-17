import { useState } from "react";

import type { RegisterRequest } from "@/types/auth";

import AuthForm from "@/components/form/AuthForm";
import Layout from "@/layouts/Layout";

export default function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleRegister = async (values: RegisterRequest) => {
    console.log(values);
  };

  return (
    <Layout single>
      <AuthForm
        fields={[
          { name: "username", label: "Usuario", placeholder: "CuB1z" },
          { name: "password", label: "Contraseña", type: "password", placeholder: "********" },
          { name: "confirmPassword", label: "Confirmar contraseña", type: "password", placeholder: "********" },
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
