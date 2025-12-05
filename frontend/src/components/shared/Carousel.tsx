import styles from "@styles/components/shared/Carousel.module.css";

import { useRef, useState, useEffect, useCallback, useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@components/shared/Button";

interface CarouselProps {
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    elementsGap?: number;
    elementSize?: number;
}

export default function Carousel({
    title, children, action, elementsGap = 16, elementSize = 280
}: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(true);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const carouselId = useId();
    const itemsId = `carousel-items-${carouselId}`;

    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
        }
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll, children]);

    const scroll = useCallback((direction: "left" | "right" | "reset") => {
        if (!scrollRef.current) return;
        const { current } = scrollRef;

        if (direction === "reset") {
            current.scrollTo({ left: 0, behavior: "smooth" });
            return;
        }

        const firstChild = current.firstElementChild as HTMLElement;
        const gap = firstChild ? (parseFloat(window.getComputedStyle(current).gap) || elementsGap) : elementsGap;
        const scrollAmount = firstChild ? firstChild.clientWidth + gap : elementSize;

        const targetScroll = current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
        current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }, []);

    const handleManualScroll = (direction: "left" | "right") => {
        scroll(direction);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const direction = e.key === "ArrowLeft" ? "left" : e.key === "ArrowRight" ? "right" : null;
        if (direction) {
            e.preventDefault();
            scroll(direction);
        }
    };

    return (
        <section 
            className={styles.carousel} 
            aria-roledescription="carousel" 
            aria-label={title}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.controls}>
                    {action}
                    <Button
                        style={["tool_bordered", "rounded"]}
                        onClick={() => handleManualScroll("left")}
                        ariaLabel="Previous slide"
                        disabled={!canScrollLeft}
                        aria-controls={itemsId}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        style={["tool_bordered", "rounded"]}
                        onClick={() => handleManualScroll("right")}
                        ariaLabel="Next slide"
                        disabled={!canScrollRight}
                        aria-controls={itemsId}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
            </div>
            <div 
                id={itemsId}
                className={styles.items} 
                ref={scrollRef}
                tabIndex={0}
                onKeyDown={handleKeyDown} 
                onScroll={checkScroll}
                role="region"
                aria-label={`${title} items`}
            >
                {children}
            </div>
        </section>
    );
}