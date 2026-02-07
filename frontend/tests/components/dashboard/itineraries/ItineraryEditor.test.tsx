import ItineraryEditor from "@components/dashboard/itineraries/ItineraryEditor";

import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as itineraryForm from "@/hooks/useItineraryForm";
import * as dayManager from "@/hooks/useDayManager";
import * as notificationProvider from "@/providers/notificationProvider";
import * as modalHook from "@/hooks/useModal";

// Mock child components
vi.mock("@/components/dashboard/headers/InnerTabHeader", () => ({
    default: ({ title, right }: any) => (
        <div data-testid="inner-tab-header">
            <h1>{title}</h1>
            {right}
        </div>
    )
}));

vi.mock("@/components/form/ItineraryEditForm", () => ({
    default: ({ onDelete }: any) => (
        <div data-testid="manual-form">
            Manual Form
            {onDelete && <button onClick={onDelete}>Delete Button</button>}
        </div>
    )
}));

vi.mock("@/components/dashboard/ai/AIGeneration", () => ({
    default: () => <div data-testid="ai-generation">AI Generation</div>
}));

vi.mock("@/components/shared/Modal", () => ({
    default: ({ isOpen, onConfirm, onCancel }: any) => (
        isOpen ? (
            <div data-testid="delete-modal">
                <button onClick={onConfirm}>Confirm Delete</button>
                <button onClick={onCancel}>Cancel Delete</button>
            </div>
        ) : null
    )
}));

// Mock hooks
vi.mock("@/hooks/useItineraryForm", () => ({
    useItineraryForm: vi.fn(),
}));

vi.mock("@/hooks/useDayManager", () => ({
    useDayManager: vi.fn(),
}));

vi.mock("@/providers/notificationProvider", () => ({
    NotificationProvider: ({ children }: any) => <>{children}</>,
    useNotification: vi.fn(),
}));

vi.mock("@/hooks/useModal", () => ({
    useModal: vi.fn(),
}));

describe("ItineraryEditor Component", () => {
    const mockOnSave = vi.fn();
    const mockOnDelete = vi.fn();
    const mockNotify = vi.fn();
    const mockOpenModal = vi.fn();
    const mockCloseModal = vi.fn();
    const mockValidateItinerary = vi.fn();

    // Default initial itinerary
    const mockItinerary = {
        title: "",
        days: [],
        tags: []
    };

    beforeEach(() => {
        vi.clearAllMocks();

        (itineraryForm.useItineraryForm as any).mockReturnValue({
            itinerary: mockItinerary,
            updateBasicInfo: vi.fn(),
            validateItinerary: mockValidateItinerary,
        });

        (dayManager.useDayManager as any).mockReturnValue({
            handleAddNewDay: vi.fn(),
        });

        (notificationProvider.useNotification as any).mockReturnValue({
            notify: mockNotify,
        });

        (modalHook.useModal as any).mockReturnValue({
            isOpen: false,
            openModal: mockOpenModal,
            closeModal: mockCloseModal,
        });

        mockValidateItinerary.mockReturnValue({ isValid: true });
    });

    const defaultProps = {
        initialItinerary: {} as any,
        type: "manual" as const,
        onSave: mockOnSave,
        back: { url: "/back", label: "Back" },
    };

    it("renders manual form by default", () => {
        render(<ItineraryEditor {...defaultProps} />);
        expect(screen.getByTestId("manual-form")).toBeInTheDocument();
        expect(screen.queryByTestId("ai-generation")).not.toBeInTheDocument();
    });

    it("switches to AI tab", () => {
        render(<ItineraryEditor {...defaultProps} />);

        fireEvent.click(screen.getByText("Asistente IA"));

        expect(screen.getByTestId("ai-generation")).toBeInTheDocument();
        expect(screen.queryByTestId("manual-form")).not.toBeInTheDocument();
    });

    it("renders AI tab initially if type is ai", () => {
        render(<ItineraryEditor {...defaultProps} type="ai" />);
        expect(screen.getByTestId("ai-generation")).toBeInTheDocument();
    });

    it("handles save with valid data", async () => {
        render(<ItineraryEditor {...defaultProps} />);

        fireEvent.click(screen.getByText("Guardar"));

        expect(mockValidateItinerary).toHaveBeenCalled();
        expect(mockOnSave).toHaveBeenCalledWith(mockItinerary);
    });

    it("handles save with invalid data", async () => {
        mockValidateItinerary.mockReturnValue({ isValid: false, error: "Validation failed" });

        render(<ItineraryEditor {...defaultProps} />);

        fireEvent.click(screen.getByText("Guardar"));

        expect(mockOnSave).not.toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith("Validation failed", "error", expect.anything());
    });

    it("handles delete flow in edit mode", async () => {
        (modalHook.useModal as any).mockReturnValue({
            isOpen: true,
            openModal: mockOpenModal,
            closeModal: mockCloseModal,
        });

        render(
            <ItineraryEditor
                {...defaultProps}
                type="edit"
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Confirm Delete"));

        await waitFor(() => {
            expect(mockOnDelete).toHaveBeenCalled();
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });

    it("hides save button in AI tab", () => {
        render(<ItineraryEditor {...defaultProps} type="ai" />);
        expect(screen.queryByText("Guardar")).not.toBeInTheDocument();
    });
});
