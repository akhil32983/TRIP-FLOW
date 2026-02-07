import AIGeneration from "@components/dashboard/ai/AIGeneration";

import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateItinerary, getAIStatus } from "@/services/aiService";

import * as authProvider from "@/providers/authProvider";
import * as demoProvider from "@/providers/demoProvider";
import * as notificationProvider from "@/providers/notificationProvider";
import * as aiGenerationForm from "@/hooks/useAIGenerationForm";

// Mock services and hooks
vi.mock("@/services/aiService", () => ({
    generateItinerary: vi.fn(),
    getAIStatus: vi.fn(() => ({
        isProcessing: false,
        canUseAI: true,
        dailyLimit: 10,
        remainingRequests: 5
    })),
}));

vi.mock("@/providers/authProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: vi.fn(),
}));

vi.mock("@/providers/demoProvider", () => ({
    DemoProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useDemo: vi.fn(),
}));

vi.mock("@/providers/notificationProvider", () => ({
    NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useNotification: vi.fn(),
}));

vi.mock("@/hooks/useAIGenerationForm", () => ({
    useAIGenerationForm: vi.fn(),
}));

// Mock TagsSection since it's a separate component
vi.mock("@/components/dashboard/TagsSection", () => ({
    default: () => <div data-testid="tags-section">Tags Section</div>
}));

describe("AIGeneration Component", () => {
    const mockNotify = vi.fn();
    const mockUpdateField = vi.fn();
    const mockResetForm = vi.fn();
    const mockHandleChange = vi.fn();
    const mockForm = {
        aiPrompt: "",
        interests: [],
    };

    // Setup default hook return values
    beforeEach(() => {
        vi.clearAllMocks();

        (authProvider.useAuth as any).mockReturnValue({
            user: { plan: "FREE" },
        });

        (demoProvider.useDemo as any).mockReturnValue({
            demo: false,
        });

        (notificationProvider.useNotification as any).mockReturnValue({
            notify: mockNotify,
        });

        (aiGenerationForm.useAIGenerationForm as any).mockReturnValue({
            form: mockForm,
            handleChange: mockHandleChange,
            handleInterestsChange: vi.fn(),
            resetForm: mockResetForm,
            updateField: mockUpdateField,
            advancedFields: [
                { name: "days", label: "Days", type: "number" }
            ],
        });

        (getAIStatus as any).mockResolvedValue({
            canUseAI: true,
            isProcessing: false,
            dailyLimit: 10,
            remainingRequests: 5
        });
    });

    it("renders initial state correctly", () => {
        render(<AIGeneration />);
        expect(screen.getByText("Tu Asistente de Viajes")).toBeInTheDocument();
        expect(screen.getByText("Mostrar opciones avanzadas")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Escribe tu solicitud aquí...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Generar" })).toBeInTheDocument();
    });

    it("updates prompt when suggestion is clicked", () => {
        render(<AIGeneration />);

        const suggestionButtons = screen.getAllByRole("button").filter(b => b.className.includes("suggestionChip"));
        if (suggestionButtons.length > 0) {
            fireEvent.click(suggestionButtons[0]);
            expect(mockUpdateField).toHaveBeenCalledWith("aiPrompt", expect.any(String));
        }
    });

    it("toggles advanced options", () => {
        render(<AIGeneration />);

        const toggleBtn = screen.getByText("Mostrar opciones avanzadas");
        fireEvent.click(toggleBtn);

        expect(screen.getByText("Ocultar opciones avanzadas")).toBeInTheDocument();
        expect(screen.getByTestId("tags-section")).toBeInTheDocument();
        // Should verify advanced fields are rendered
        expect(screen.getByLabelText("Days")).toBeInTheDocument();
    });

    it("handles form submission success", async () => {
        (generateItinerary as any).mockResolvedValue({
            aiUsage: { remainingQuota: 5, limit: 10, usedQuota: 5 }
        });

        render(<AIGeneration />);

        const submitBtn = screen.getByRole("button", { name: "Generar" });
        fireEvent.submit(submitBtn.closest("form")!);

        expect(generateItinerary).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockNotify).toHaveBeenCalledWith(
                "Tu solicitud se está procesando.",
                "success",
                expect.any(Object)
            );
            expect(mockResetForm).toHaveBeenCalled();
        });
    });

    it("handles rate limit error", async () => {
        (generateItinerary as any).mockResolvedValue(null); // Return null or object without aiUsage to simulate error

        render(<AIGeneration />);

        const submitBtn = screen.getByRole("button", { name: "Generar" });
        fireEvent.submit(submitBtn.closest("form")!);

        await waitFor(() => {
            expect(mockNotify).toHaveBeenCalledWith(
                "Has alcanzado el límite diario de generaciones.",
                "error",
                expect.any(Object)
            );
        });
    });

    it("displays quota badge for FREE/PRO users", async () => {
        // Need to simulate state where usage is set. 
        // Since aiUsage is local state, we can't set it directly.
        // But we can trigger a submit that updates it.
        (generateItinerary as any).mockResolvedValue({
            aiUsage: { remainingQuota: 5, limit: 10, usedQuota: 5 }
        });

        render(<AIGeneration />);
        const submitBtn = screen.getByRole("button", { name: "Generar" });
        fireEvent.submit(submitBtn.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText("Restantes: 5/10")).toBeInTheDocument();
        });
    });

    it("disables generate button when in demo mode", () => {
        (demoProvider.useDemo as any).mockReturnValue({
            demo: true,
        });

        render(<AIGeneration />);
        expect(screen.getByRole("button", { name: "Generar" })).toBeDisabled();
    });
});
