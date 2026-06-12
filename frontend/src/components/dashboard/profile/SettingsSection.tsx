import styles from "@styles/components/dashboard/profile/SettingsSection.module.css"

import { NavLink } from "react-router"
import { useState } from "react"

import { useAuth } from "@/providers/authProvider";

import { BadgeQuestionMarkIcon, BellIcon, ChevronRightIcon, EditIcon, LogOutIcon } from "lucide-react"

import Toggle from "@/components/form/Toggle";
import LogoutButton from "@/components/buttons/LogoutButton";

const ICON_SIZE = 16;

export default function SettingsSection() {
    const { user, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return null;

    const handleToggleNotifications = async (checked: boolean) => {
        setIsLoading(true);
        try {
            await updateProfile({ notificationsAllowed: checked });
        } catch (error) {
            // Do nothing
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.settings}>
            <NavLink to="/profile/edit" className={`${styles.action} ${styles.info}`}>
                <div className={styles.iconContainer}>
                    <EditIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Editar Perfil</span>
                    <span className={styles.description}>Actualiza tus datos personales</span>
                </div>
                <ChevronRightIcon size={20} className={styles.chevron} />
            </NavLink>
            
            <div className={`${styles.action} ${styles.active}`}>
                <div className={styles.iconContainer}>
                    <BellIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Notificaciones</span>
                    <span className={styles.description}>Gestiona tus notificaciones</span>
                </div>
                <div className={styles.toggleContainer} onClick={(e) => e.stopPropagation()}>
                    <Toggle 
                        checked={!!user.notificationsAllowed} 
                        onChange={handleToggleNotifications}
                        disabled={isLoading}
                        id="notifications-toggle"
                    />
                </div>
            </div>

            <NavLink to="/help" target="_blank" className={`${styles.action} ${styles.done}`}>
                <div className={styles.iconContainer}>
                    <BadgeQuestionMarkIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Help</span>
                    <span className={styles.description}>Get help or report an issue</span>
                </div>
                <ChevronRightIcon size={20} className={styles.chevron} />
            </NavLink>
            <LogoutButton className={`${styles.action} ${styles.danger} ${styles.last}`}>
                <div className={styles.iconContainer}>
                    <LogOutIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Sign Out</span>
                </div>
            </LogoutButton>
        </div>
    )
}