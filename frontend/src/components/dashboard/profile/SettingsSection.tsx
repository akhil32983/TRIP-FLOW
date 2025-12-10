import styles from "@styles/components/dashboard/profile/SettingsSection.module.css"

import { NavLink } from "react-router"

import { BadgeQuestionMarkIcon, BellIcon, ChevronRightIcon, EditIcon, LogOutIcon } from "lucide-react"

import LogoutButton from "@/components/buttons/LogoutButton";

const ICON_SIZE = 16;

export default function SettingsSection() {
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
            <button className={`${styles.action} ${styles.active}`}>
                <div className={styles.iconContainer}>
                    <BellIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Notificaciones</span>
                    <span className={styles.description}>Gestiona tus notificaciones</span>
                </div>
            </button>
            <NavLink to="/" target="_blank" className={`${styles.action} ${styles.done}`}>
                <div className={styles.iconContainer}>
                    <BadgeQuestionMarkIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Ayuda</span>
                    <span className={styles.description}>Obtén ayuda o reporta un problema</span>
                </div>
                <ChevronRightIcon size={20} className={styles.chevron} />
            </NavLink>
            <LogoutButton className={`${styles.action} ${styles.danger} ${styles.last}`}>
                <div className={styles.iconContainer}>
                    <LogOutIcon size={ICON_SIZE} />
                </div>
                <div className={styles.labelContainer}>
                    <span className={styles.title}>Cerrar Sesión</span>
                </div>
            </LogoutButton>
        </div>
    )
}