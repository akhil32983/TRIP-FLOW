import styles from "@styles/components/shared/Avatar.module.css";
import { ShieldUserIcon } from "lucide-react";
import { Link } from "react-router";

interface AvatarProps {
  to: string;
  src?: string;
  alt?: string;
}

export default function Avatar({ src, alt, to }: AvatarProps) {
  return (
    <Link to={to} className={styles.avatar}>
      {src && (
        <img className={styles.avatar} src={src} alt={alt || "User Avatar"} />
      )}
      {!src && <ShieldUserIcon className={styles.icon} strokeWidth={1} />}
    </Link>
  );
}
