import AppLayout from "@/layouts/AppLayout";

import InnerTabHeader from "@components/dashboard/headers/InnerTabHeader";
import ProfileEditForm from "@components/form/ProfileEditForm";

export default function ProfileEditPage() {
    return (
        <AppLayout>
            <InnerTabHeader
                title="Tu Perfil"
                back={{
                    url: "/profile",
                    label: "Volver",
                }}
            />
            <ProfileEditForm />
        </AppLayout>
    );
}