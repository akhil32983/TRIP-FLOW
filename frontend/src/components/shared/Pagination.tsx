import styles from "@styles/components/shared/Pagination.module.css";

import type { PageData } from "@/types/shared";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@components/shared/Button";

interface PaginationProps {
    pageData: PageData;
    onPageChange: (page: number) => void;
}

export default function Pagination({ pageData, onPageChange }: PaginationProps) {
    const { currentPage, totalPages, totalItems, isLastPage } = pageData;

    if (totalItems === 0) return null;

    const handlePreviousPage = () => {
        if (currentPage > 0) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };

    return (
        <div className={styles.pagination}>
            <Button
                style={["tool_bordered", "rounded"]}
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                ariaLabel="Previous page"
            ><ChevronLeft size={20} /></Button>
            <Button
                style={["tool_bordered", "rounded", "active"]}
                onClick={handleNextPage}
                ariaLabel="Current page"
            >{currentPage + 1}</Button>
            <Button
                style={["tool_bordered", "rounded"]}
                onClick={handleNextPage}
                ariaLabel="Next page"
                disabled={isLastPage}
            ><ChevronRight size={20} /></Button>
        </div>
    );
}