import styles from "@styles/components/form/AvatarUploader.module.css";

import { useRef, useState } from "react";

import { API_BASE_URL } from "@/config/environment";
import { useDemo } from "@/providers/demoProvider";

import { Camera } from "lucide-react";

interface AvatarUploaderProps {
    username?: string;
    preview?: string | null;
    onFileSelect: (file: File) => void;
}

export default function AvatarUploader({
    username, preview, onFileSelect
}: AvatarUploaderProps) {
    const { demo } = useDemo();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgError, setImgError] = useState(demo);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
            setImgError(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const src = preview || (username ? `${API_BASE_URL}/api/v1/users/${username}/avatar` : "");

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} onClick={handleClick}>
                {(!imgError && src) ? (
                    <img 
                        key={src}
                        src={src} 
                        className={styles.avatar} 
                        onError={() => setImgError(true)}
                        onLoad={() => setImgError(false)} 
                        alt="Avatar"
                    />
                ) : (
                    <div className={styles.placeholder}>
                        {username?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
                <div className={styles.overlay}><Camera size={32} /></div>
            </div>
            <input 
                ref={fileInputRef} 
                type="file" 
                className={styles.input} 
                onChange={handleFile} 
                accept="image/*" 
            />
        </div>
    );
}
