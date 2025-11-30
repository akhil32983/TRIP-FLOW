import styles from "@styles/components/dashboard/InnerTabHeader.module.css";

import type { JSX } from "react";

import { ArrowLeftIcon } from "lucide-react";
import Button from "@components/shared/Button";
import type { ItineraryCoverImage } from "@/types/itinerary";

interface InnerTabHeaderProps {
    title: string | JSX.Element;
    backUrl: string;
    coverImage?: ItineraryCoverImage;
}

export default function InnerTabHeader({ title, backUrl, coverImage }: InnerTabHeaderProps) {
    return (
        <header
            className={styles.header}
            style={coverImage ? { "--bg-image": `url(${coverImage.imageUrl})` } as React.CSSProperties : {}}
        >
            {backUrl && <Button to={backUrl} style={["inline"]} label="Volver"><ArrowLeftIcon size={18} /></Button>}
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
}