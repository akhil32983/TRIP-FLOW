import DeleteAccountButton from "@components/buttons/DeleteAccountButton";
import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as authProvider from "@/providers/authProvider";
import * as demoProvider from "@/providers/demoProvider";
import * as notificationProvider from "@/providers/notificationProvider";
import * as userService from "@/services/userService";

// Mock dependencies
vi.mock("@/providers/authProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: vi.fn(),
}));

vi.mock("@/providers/demoProvider", () => ({
    DemoProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useDemo: vi.fn(),
}));

vi.mock("@/providers/notificationProvider", () => ({
    useNotification: vi.fn(),
}));

vi.mock("@/services/userService", () => ({
    deleteAccount: vi.fn(),
}));

describe("DeleteAccountButton Component", () => {
    const mockLogout = vi.fn();
    const mockDeactivateDemo = vi.fn();
    const mockNotify = vi.fn();
    const mockDeleteAccount = vi.fn();
    const mockUser = { username: "testuser" };

    beforeEach(() => {
        vi.clearAllMocks();

        (authProvider.useAuth as any).mockReturnValue({
            user: mockUser,
            logout: mockLogout,
        });

        (demoProvider.useDemo as any).mockReturnValue({
            deactivateDemo: mockDeactivateDemo,
        });

        (notificationProvider.useNotification as any).mockReturnValue({
            notify: mockNotify,
        });

        (userService.deleteAccount as any).mockImplementation(mockDeleteAccount);
    });

    it("renders the delete button", () => {
        render(<DeleteAccountButton />);
        expect(screen.getByText("Eliminar Cuenta")).toBeInTheDocument();
        // Styles are handled by CSS modules and are brittle to test without mocking Button or identity-obj-proxy
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("opens the confirmation modal when clicked", () => {
        render(<DeleteAccountButton />);
        
        fireEvent.click(screen.getByText("Eliminar Cuenta"));
        
        expect(screen.getByText("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")).toBeInTheDocument();
        expect(screen.getByText("Eliminar")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("closes the modal when cancel is clicked", async () => {
        render(<DeleteAccountButton />);
        
        fireEvent.click(screen.getByText("Eliminar Cuenta"));
        expect(screen.getByText("Eliminar")).toBeInTheDocument();
        
        fireEvent.click(screen.getByText("Cancelar"));
        
        await waitFor(() => {
            expect(screen.queryByText("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")).not.toBeInTheDocument();
        });
    });

    it("does nothing if user is not defined", async () => {
        (authProvider.useAuth as any).mockReturnValue({
            user: null,
            logout: mockLogout,
        });

        render(<DeleteAccountButton />);
        
        fireEvent.click(screen.getByText("Eliminar Cuenta"));
        fireEvent.click(screen.getByText("Eliminar"));

        expect(mockDeleteAccount).not.toHaveBeenCalled();
    });

    it("calls deleteAccount and handles success", async () => {
        mockDeleteAccount.mockResolvedValue({});

        render(<DeleteAccountButton />);
        
        fireEvent.click(screen.getByText("Eliminar Cuenta"));
        fireEvent.click(screen.getByText("Eliminar"));

        await waitFor(() => {
            expect(mockDeleteAccount).toHaveBeenCalledWith("testuser");
            expect(mockNotify).toHaveBeenCalledWith("Cuenta eliminada correctamente", "success", expect.any(Object));
            expect(mockLogout).toHaveBeenCalled();
            expect(mockDeactivateDemo).toHaveBeenCalled();
        });
    });

    it("handles error during account deletion", async () => {
        mockDeleteAccount.mockRejectedValue(new Error("Failed"));

        render(<DeleteAccountButton />);
        
        fireEvent.click(screen.getByText("Eliminar Cuenta"));
        fireEvent.click(screen.getByText("Eliminar"));

        await waitFor(() => {
            expect(mockDeleteAccount).toHaveBeenCalledWith("testuser");
            expect(mockNotify).toHaveBeenCalledWith("Error al eliminar la cuenta", "error", expect.any(Object));
            // Should close modal
            expect(screen.queryByText("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")).not.toBeInTheDocument();
            // Should NOT logout
            expect(mockLogout).not.toHaveBeenCalled();
        });
    });
});
