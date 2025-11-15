import styles from "@styles/components/shared/Sidebar.module.css";

import { useLocation } from "react-router";

import {
    CalendarIcon,
    MapPinIcon,
    UsersRoundIcon
} from "lucide-react";

import Button from "@components/shared/Button";
import Logo from "@components/shared/Logo";
import LogoutButton from "@components/buttons/LogoutButton";

const ROUTES = [
    { path: "/dashboard", label: "Dashboard", icon: <MapPinIcon /> },
    { path: "/itineraries", label: "Itinerarios", icon: <CalendarIcon /> },
    { path: "/profile", label: "Perfil", icon: <UsersRoundIcon /> },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Button style={["logo"]} to="/">
                    <Logo size="small" />
                </Button>
            </div>
            <nav className={styles.nav}>
                {ROUTES.map((route) => (
                    <Button
                        key={route.path}
                        style={
                            location.pathname.includes(route.path)
                                ? ["route", "active"]
                                : ["route"]
                        }
                        to={route.path}
                        label={route.label}
                    >
                        {route.icon}
                    </Button>
                ))}
            </nav>
            <div className={styles.actions}>
                <LogoutButton />
            </div>
        </aside>
    );
}