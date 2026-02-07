import Pagination from "@components/shared/Pagination";
import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";
import type { PageData } from "@/types/shared";

describe("Pagination Component", () => {
    const mockOnPageChange = vi.fn();
    const defaultPageData: PageData = {
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        isLastPage: false,
        itemsPerPage: 10
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders nothing if totalItems is 0", () => {
        const pageData = { ...defaultPageData, totalItems: 0 };
        const { container } = render(<Pagination pageData={pageData} onPageChange={mockOnPageChange} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders existing pagination controls", () => {
        render(<Pagination pageData={defaultPageData} onPageChange={mockOnPageChange} />);
        
        expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
        expect(screen.getByLabelText("Página actual")).toHaveTextContent("2");
        expect(screen.getByLabelText("Página siguiente")).toBeInTheDocument();
    });

    it("disables previous button on first page", () => {
        const pageData = { ...defaultPageData, currentPage: 0 };
        render(<Pagination pageData={pageData} onPageChange={mockOnPageChange} />);
        
        const prevButton = screen.getByLabelText("Página anterior");
        expect(prevButton).toBeDisabled();
    });

    it("disables next button on last page", () => {
        const pageData = { ...defaultPageData, currentPage: 4, isLastPage: true };
        render(<Pagination pageData={pageData} onPageChange={mockOnPageChange} />);
        
        const nextButton = screen.getByLabelText("Página siguiente");
        expect(nextButton).toBeDisabled();
    });

    it("calls onPageChange with correct page when previous button is clicked", () => {
        render(<Pagination pageData={defaultPageData} onPageChange={mockOnPageChange} />);
        
        fireEvent.click(screen.getByLabelText("Página anterior"));
        expect(mockOnPageChange).toHaveBeenCalledWith(0);
    });

    it("calls onPageChange with correct page when next button is clicked", () => {
        render(<Pagination pageData={defaultPageData} onPageChange={mockOnPageChange} />);
        
        fireEvent.click(screen.getByLabelText("Página siguiente"));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("does not call onPageChange when buttons are disabled", () => {
        const pageData = { ...defaultPageData, currentPage: 0 };
        render(<Pagination pageData={pageData} onPageChange={mockOnPageChange} />);
        
        fireEvent.click(screen.getByLabelText("Página anterior"));
        expect(mockOnPageChange).not.toHaveBeenCalled();
    });
});
