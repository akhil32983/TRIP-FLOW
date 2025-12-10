import styles from "@styles/pages/Profile.module.css"

import AppLayout from "@/layouts/AppLayout";
import Stats from "@components/dashboard/Stats";
import ProfileCard from "@components/dashboard/ProfileCard";
import SettingsSection from "@components/dashboard/profile/SettingsSection";

export default function ProfilePage() {
  return (
    <AppLayout>
        <ProfileCard />
        <div className={styles.statsContainer}>
            <Stats />
        </div>
        <SettingsSection />
    </AppLayout>
  );
}