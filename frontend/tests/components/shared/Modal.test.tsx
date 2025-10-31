import Modal from "@/components/shared/Modal";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Secondary dependencies mocks
vi.mock("@/components/shared/Button", () => ({
    default: ({ children, onClick, ariaLabel, style }: any) => (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            data-testid="mock-button"
            className={style?.join(" ")}>
            {children}
        </button>
    ),
}));

describe("Modal Component", () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        document.body.style.overflow = "unset";
    });

    it("renders nothing when isOpen is false", () => {
        const { container } = render(
            <Modal
                isOpen={false}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders modal when isOpen is true", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("renders title correctly", () => {
        render(
            <Modal
                isOpen={true}
                title="Delete Itinerary"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const title = screen.getByText("Delete Itinerary");
        expect(title).toBeInTheDocument();
        expect(title.tagName).toBe("H2");
    });

    it("renders message correctly", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Are you sure you want to delete?"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const message = screen.getByText("Are you sure you want to delete?");
        expect(message).toBeInTheDocument();
        expect(message.tagName).toBe("P");
    });

    it("renders default button texts", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText("Confirmar")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("renders custom button texts", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                confirmText="Delete"
                cancelText="Go Back"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText("Delete")).toBeInTheDocument();
        expect(screen.getByText("Go Back")).toBeInTheDocument();
    });

    it("calls onConfirm when confirm button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                confirmText="Confirm"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const confirmButton = screen.getByText("Confirm");
        fireEvent.click(confirmButton);

        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when cancel button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                cancelText="Cancel"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when close button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const closeButton = screen.getByLabelText("Cerrar modal");
        fireEvent.click(closeButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when overlay is clicked", () => {
        const { container } = render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const overlay = container.querySelector('[class*="overlay"]');
        if (overlay) {
            fireEvent.click(overlay);
        }

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("does not call onCancel when modal content is clicked", () => {
        const { container } = render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const modalContent = container.querySelector('[class*="modal"]');
        if (modalContent) {
            fireEvent.click(modalContent);
        }

        expect(mockOnCancel).not.toHaveBeenCalled();
    });

    it("calls onCancel when Escape key is pressed", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("sets body overflow to hidden when modal is open", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(document.body.style.overflow).toBe("hidden");
    });

    it("resets body overflow when modal is closed", () => {
        const { rerender } = render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(document.body.style.overflow).toBe("hidden");

        rerender(
            <Modal
                isOpen={false}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(document.body.style.overflow).toBe("unset");
    });

    it("applies danger variant by default", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                confirmText="Delete"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const confirmButton = screen.getByText("Delete");
        expect(confirmButton.className).toContain("danger");
    });

    it("applies info variant when specified", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                confirmText="Confirm"
                variant="info"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const confirmButton = screen.getByText("Confirm");
        expect(confirmButton.className).toContain("info");
    });

    it("renders close button with correct aria-label", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const closeButton = screen.getByLabelText("Cerrar modal");
        expect(closeButton).toBeInTheDocument();
        expect(closeButton).toHaveAttribute("aria-label", "Cerrar modal");
    });

    it("renders all three buttons", () => {
        render(
            <Modal
                isOpen={true}
                title="Test Modal"
                message="Test message"
                confirmText="Confirm"
                cancelText="Cancel"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        const buttons = screen.getAllByTestId("mock-button");
        expect(buttons).toHaveLength(3); // Close, Cancel, Confirm
    });
});
