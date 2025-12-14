import styles from "@styles/components/shared/Pagination.module.css";

import type { PageData } from "@/types/shared";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@components/shared/Button";

interface PaginationProps {
    pageData: PageData;
    onPageChange: (page: number) => void;
}

export default function Pagination({ pageData, onPageChange }: PaginationProps) {
    const { currentPage, totalPages, totalItems } = pageData;

    if (totalItems === 0) return null;

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <Button
                style={["tool_bordered", "rounded"]}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                ariaLabel="Página anterior"
            ><ChevronLeft size={20} /></Button>
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage && pageNumber <= currentPage + 2)
                ) {
                    return (
                        <Button
                            key={pageNumber}
                            style={["tool_bordered", "rounded"]}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    );
                } else if (
                    pageNumber === currentPage - 1 ||
                    pageNumber === currentPage + 1
                ) {
                    return <span key={pageNumber} className={styles.ellipsis}>...</span>;
                }
                return null;
            })}
            <Button
                style={["tool_bordered", "rounded"]}
                onClick={handleNextPage}
                ariaLabel="Página siguiente"
                disabled={currentPage === totalPages}
            ><ChevronRight size={20} /></Button>
        </div>
    );
}
