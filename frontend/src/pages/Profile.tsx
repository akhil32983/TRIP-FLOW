import styles from "@styles/pages/Profile.module.css";

import AppLayout from "@/layouts/AppLayout";
import DashboardHeader from "@components/dashboard/DashboardHeader";
import Stats from "@components/dashboard/Stats";
import ProfileCard from "@components/dashboard/ProfileCard";
import LogoutButton from "@components/buttons/LogoutButton";

export default function ProfilePage() {
  return (
    <AppLayout>
        <DashboardHeader
            title="Tu perfil"
            responsiveRender={<LogoutButton responsive />}
            defaultRender={<LogoutButton />}
        />
        <div className={styles.content}>
            <ProfileCard />
            <Stats />
        </div>
    </AppLayout>
  );
}