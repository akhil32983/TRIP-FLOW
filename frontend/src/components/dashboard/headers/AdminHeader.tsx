import styles from "@styles/components/dashboard/headers/AdminHeader.module.css";

import Divider from "@/components/shared/Divider";
import LogoutButton from "@/components/buttons/LogoutButton";

interface AdminHeaderProps {
    children?: React.ReactNode;
}

export default function AdminHeader({ children }: AdminHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h3 className={styles.title}>Administration</h3>
                <LogoutButton to="/" integrated>
                    <span>Sign Out</span>
                </LogoutButton>
            </div>
            <div className={styles.children}>
                {children}
            </div>
            <Divider />
        </header>
    );
}