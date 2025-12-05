import { useAuth } from "@/providers/authProvider";

import AppLayout from "@/layouts/AppLayout";
import DashboardHeader from "@/components/dashboard/headers/DashboardHeader";
import Stats from "@/components/dashboard/Stats";
import Recent from "@/components/dashboard/Recent";
import AICta from "@/components/dashboard/ai/AICta";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
        <DashboardHeader name={user?.name || ""}/>
        <Stats />
        <Recent />
        <AICta />
    </AppLayout>
  );
}