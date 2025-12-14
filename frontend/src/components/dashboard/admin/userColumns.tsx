import type { Column } from "@components/shared/Table";
import type { PublicUser } from "@/types/user";
import styles from "@styles/pages/Admin.module.css";
import Avatar from "@/components/shared/Avatar";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { Trash2Icon } from "lucide-react";
import { formatDate } from "@/utils/formatUtils";

export const getUserColumns = (onDelete: (username: string) => void): Column<PublicUser>[] => [
    {
        header: "Usuario",
        render: (user) => (
            <div className={styles.userCell}>
                <Avatar username={user.username} />
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userUsername}>@{user.username}</span>
                </div>
            </div>
        )
    },
    {
        header: "Rol",
        render: (user) => (
            <Badge title={user.role} style="thin" status="ONGOING" />
        )
    },
    {
        header: "Plan",
        render: (user) => (
            <Badge title={user.plan} style="thin" status={
                user.plan === "FREE" ? "DRAFT" :
                user.plan === "PRO" ? "PLANNED" :
                "COMPLETED"
            } />
        )
    },
    {
        header: "Ubicación",
        accessor: "location",
        render: (user) => user.location || "-"
    },
    {
        header: "Fecha Registro",
        render: (user) => formatDate(user.createdAt, { shortMonth: true })
    },
    {
        header: "Acciones",
        render: (user) => (
            <Button
                style={["tool_bordered", "danger"]}
                label={`Eliminar usuario @${user.username}`}
                onClick={() => onDelete(user.username)}
                disabled={user.role === "ADMIN"}
            >
                <Trash2Icon size={18} />
            </Button>
        )
    }
];
