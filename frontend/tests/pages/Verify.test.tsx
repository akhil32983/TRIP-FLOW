import VerifyPage from "@pages/Verify";
import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("@/providers/authProvider", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/providers/authProvider")>();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

vi.mock("@/providers/notificationProvider", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/providers/notificationProvider")>();
  return {
    ...actual,
    useNotification: vi.fn(),
  };
});

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/utils/localStorageUtils", () => ({
    retrieveFromLocalStorage: vi.fn(),
    removeFromLocalStorage: vi.fn(),
    saveToLocalStorage: vi.fn(),
}));

vi.mock("@/services/authService", () => ({
    resendCode: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    verify: vi.fn(),
}));

// Imports after mocking
import { useAuth } from "@/providers/authProvider";
import { useNotification } from "@/providers/notificationProvider";
import { useNavigate } from "react-router";
import { retrieveFromLocalStorage, removeFromLocalStorage } from "@/utils/localStorageUtils";
import { resendCode } from "@/services/authService";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const mockVerify = vi.fn();
const mockNotify = vi.fn();
const mockNavigate = vi.fn();

describe("Verify Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Default valid setup
        vi.mocked(useAuth).mockReturnValue({
            user: null,
            errors: null,
            login: vi.fn(),
            logout: vi.fn(),
            register: vi.fn(),
            updateProfile: vi.fn(),
            verify: mockVerify,
        });

        vi.mocked(useNotification).mockReturnValue({
            notify: mockNotify,
        });

        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        
        // Default local storage has a username
        vi.mocked(retrieveFromLocalStorage).mockReturnValue("testuser");
    });

    it("renders verification form when username is present", () => {
        render(<VerifyPage />);
        
        expect(screen.getByText(/Verificación Segura/i)).toBeInTheDocument();
        expect(screen.getByText(/testuser/i)).toBeInTheDocument();
        expect(screen.getAllByRole("textbox")).toHaveLength(6);
        expect(screen.getByRole("button", { name: "Verificar Cuenta" })).toBeInTheDocument();
    });

    it("renders 'no user info' message when username is missing", () => {
        vi.mocked(retrieveFromLocalStorage).mockReturnValue(null);
        render(<VerifyPage />);
        
        expect(screen.getByText(/No se ha encontrado la información del usuario/i)).toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Registrarse" })).toBeInTheDocument();
    });

    it("handles input changes correctly", async () => {
        render(<VerifyPage />);
        const inputs = screen.getAllByRole("textbox");
        
        fireEvent.change(inputs[0], { target: { value: "1" } });
        expect(inputs[0]).toHaveValue("1");
        
        fireEvent.change(inputs[1], { target: { value: "a" } });
        expect(inputs[1]).toHaveValue("");
        
        fireEvent.change(inputs[2], { target: { value: "3" } });
        expect(inputs[2]).toHaveValue("3");
    });

    it("shows error for incomplete code submission", async () => {
        render(<VerifyPage />);
        const submitButton = screen.getByRole("button", { name: "Verificar Cuenta" });
        
        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[0], { target: { value: "1" } }); // Only 1 digit
        
        fireEvent.click(submitButton);
        
        expect(screen.getByText("El código debe tener 6 dígitos.")).toBeInTheDocument();
        expect(mockVerify).not.toHaveBeenCalled();
    });

    it("calls verify with correct code on valid submission", async () => {
        mockVerify.mockResolvedValue({ success: true, verified: true });
        
        render(<VerifyPage />);
        const inputs = screen.getAllByRole("textbox");
        const submitButton = screen.getByRole("button", { name: "Verificar Cuenta" });
        
        inputs.forEach((input, index) => {
            fireEvent.change(input, { target: { value: String(index) } });
        });
        
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(mockVerify).toHaveBeenCalledWith({
                username: "testuser",
                code: "012345"
            });
        });
        
        expect(removeFromLocalStorage).toHaveBeenCalledWith(STORAGE_KEYS.VERIFICATION_USERNAME);
        expect(mockNotify).toHaveBeenCalledWith("Cuenta verificada exitosamente", "success");
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("handles verification failure", async () => {
        mockVerify.mockResolvedValue({ 
            success: false, 
            errors: { error: "Invalid code" } 
        });
        
        render(<VerifyPage />);
        const inputs = screen.getAllByRole("textbox");
        
        inputs.forEach((input) => {
            fireEvent.change(input, { target: { value: "1" } });
        });
        
        fireEvent.click(screen.getByRole("button", { name: "Verificar Cuenta" }));
        
        await waitFor(() => {
            expect(screen.getByText("Código inválido.")).toBeInTheDocument();
        });
        
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("redirects to login if user is already verified", async () => {
        mockVerify.mockResolvedValue({ 
            success: false, 
            errors: { error: "User is already verified" } 
        });
        
        render(<VerifyPage />);
        const inputs = screen.getAllByRole("textbox");
        inputs.forEach(input => fireEvent.change(input, { target: { value: "1" } }));
        
        fireEvent.click(screen.getByRole("button", { name: "Verificar Cuenta" }));
        
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("handles resend code success", async () => {
        vi.mocked(resendCode).mockResolvedValue({ status: "SUCCESS" } as any);
        
        render(<VerifyPage />);
        const resendButton = screen.getByText("Reenviar código");
        
        fireEvent.click(resendButton);
        
        await waitFor(() => {
            expect(resendCode).toHaveBeenCalledWith("testuser");
            expect(mockNotify).toHaveBeenCalledWith("Código reenviado exitosamente", "success");
        });
    });

    it("handles resend code failure", async () => {
        vi.mocked(resendCode).mockResolvedValue({ status: "FAILURE" } as any);
        
        render(<VerifyPage />);
        
        fireEvent.click(screen.getByText("Reenviar código"));
        
        await waitFor(() => {
            expect(mockNotify).toHaveBeenCalledWith("Error al reenviar el código", "error");
        });
    });

    it("handles paste functionality", async () => {
        render(<VerifyPage />);
        const firstInput = screen.getAllByRole("textbox")[0];
        
        // Create a paste event
        const pasteData = "123456";
        const pasteEvent = {
            clipboardData: {
                getData: () => pasteData,
            },
        };

        fireEvent.paste(firstInput, pasteEvent);
        
        const inputs = screen.getAllByRole("textbox");
        await waitFor(() => {
             inputs.forEach((input, index) => {
                 expect(input).toHaveValue(pasteData[index]);
             });
        });
    });
});
