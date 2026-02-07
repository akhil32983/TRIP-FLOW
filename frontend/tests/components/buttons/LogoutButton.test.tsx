import LogoutButton from "@components/buttons/LogoutButton";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

import * as authProvider from "@/providers/authProvider";
import * as demoProvider from "@/providers/demoProvider";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock hooks
vi.mock("@/providers/authProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: vi.fn(),
}));

vi.mock("@/providers/demoProvider", () => ({
    DemoProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useDemo: vi.fn(),
}));

vi.mock("@/hooks/useIsPWA", () => ({
    useIsPWA: vi.fn(),
}));

import { useIsPWA } from "@/hooks/useIsPWA";

describe("LogoutButton Component", () => {
    const mockLogout = vi.fn();
    const mockDeactivateDemo = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (authProvider.useAuth as any).mockReturnValue({
            logout: mockLogout,
        });

        (demoProvider.useDemo as any).mockReturnValue({
            deactivateDemo: mockDeactivateDemo,
        });

        (useIsPWA as any).mockReturnValue(false);
    });

    it("renders children content", () => {
        render(<LogoutButton>Cerrar Sesión</LogoutButton>);
        expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
    });

    it("logs out and navigates to home on click (default)", () => {
        render(<LogoutButton>Logout</LogoutButton>);

        fireEvent.click(screen.getByText("Logout"));

        expect(mockLogout).toHaveBeenCalled();
        expect(mockDeactivateDemo).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("logs out and navigates to login when PWA", () => {
        (useIsPWA as any).mockReturnValue(true);
        render(<LogoutButton>Logout</LogoutButton>);

        fireEvent.click(screen.getByText("Logout"));

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("navigates to custom path if provided", () => {
        render(<LogoutButton to="/custom-path">Logout</LogoutButton>);

        fireEvent.click(screen.getByText("Logout"));

        expect(mockNavigate).toHaveBeenCalledWith("/custom-path");
    });
});
