import styles from "@styles/components/shared/AttributionImage.module.css";
import type { ComponentProps } from "react";

interface AttributionImageProps extends ComponentProps<"div"> {
  src: string;
  alt: string;
  attribution: string;
  attributionLink: string;
  attributionPrefix?: string;
  loading?: "eager" | "lazy";
}

export default function AttributionImage({
  src,
  alt,
  attribution,
  attributionLink,
  attributionPrefix = "Foto de ",
  loading = "lazy",
  className,
  children,
  ...props
}: AttributionImageProps) {
  return (
    <div className={`${styles.container} ${className || ""}`} {...props}>
      <img
        className={styles.image}
        src={src}
        alt={alt}
        decoding="async"
        loading={loading}
      />

      {children}

      <div className={styles.overlay}>
        <span>{attributionPrefix}</span>
        <span
          className={styles.authorLink}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(attributionLink, "_blank", "noopener,noreferrer");
          }}
        >
          {attribution}
        </span>
      </div>
    </div>
  );
}