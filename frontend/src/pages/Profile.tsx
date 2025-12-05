
import AppLayout from "@/layouts/AppLayout";
import Stats from "@components/dashboard/Stats";
import ProfileCard from "@components/dashboard/ProfileCard";

export default function ProfilePage() {
  return (
    <AppLayout>
        <ProfileCard />
        <Stats />
    </AppLayout>
  );
}