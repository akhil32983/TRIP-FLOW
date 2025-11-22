import { useAuth } from "@/providers/authProvider";

import { PlusIcon } from "lucide-react";

import AppLayout from "@/layouts/AppLayout";
import Button from "@/components/shared/Button";
import Stats from "@/components/dashboard/Stats";
import Recent from "@/components/dashboard/Recent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIGeneration from "@/components/dashboard/AIGeneration";

export default function DashboardPage() {
  const { user } = useAuth();

  const to = "/itineraries/new";
  const headerIcon = <PlusIcon size={18} />;

  return (
    <AppLayout>
        <DashboardHeader
            title={<>Bienvenido, <strong>{user?.username}</strong></>}
            responsiveRender={<Button to={to} style={["tool_bordered"]}>{headerIcon}</Button>}
            defaultRender={<Button to={to} style={["primary"]} label="Nuevo itinerario">{headerIcon}</Button>}
        />
        <Stats />
        <AIGeneration />
        <Recent />
    </AppLayout>
  );
}