import { useAuth } from "@/providers/authProvider";

import AppLayout from "@/layouts/AppLayout";
import Stats from "@/components/dashboard/Stats";
import Recent from "@/components/dashboard/Recent";
import DashboardHeader from "@/components/dashboard/headers/DashboardHeader";
import AIGeneration from "@/components/dashboard/AIGeneration";
import { useDemo } from "@/providers/demoProvider";

export default function DashboardPage() {
  const { user } = useAuth();
  const { demo } = useDemo();

  return (
    <AppLayout>
        <DashboardHeader name={user?.name || ""}/>
        <Stats />
        {!demo && <AIGeneration />}
        <Recent />
    </AppLayout>
  );
}