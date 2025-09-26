import { useAuth } from "@/providers/authProvider";

import AppLayout from "@/layouts/AppLayout";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
        <h1>Bienvenido, <strong>{user?.username}</strong></h1>
    </AppLayout>
  );
}