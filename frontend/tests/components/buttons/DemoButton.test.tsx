import DemoButton from "@components/buttons/DemoButton";

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

// Mock providers
vi.mock("@/providers/authProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: vi.fn(),
}));

vi.mock("@/providers/demoProvider", () => ({
    DemoProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useDemo: vi.fn(),
}));

describe("DemoButton Component", () => {
    const mockLogin = vi.fn();
    const mockLogout = vi.fn();
    const mockActivateDemo = vi.fn();
    const mockDeactivateDemo = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (authProvider.useAuth as any).mockReturnValue({
            login: mockLogin,
            logout: mockLogout,
        });

        (demoProvider.useDemo as any).mockReturnValue({
            demo: false,
            activateDemo: mockActivateDemo,
            deactivateDemo: mockDeactivateDemo,
        });
    });

    it("renders 'Probar demo' when demo is inactive", () => {
        render(<DemoButton />);
        expect(screen.getByRole("button", { name: "Probar demo" })).toBeInTheDocument();
    });

    it("renders 'Abandonar demo' when demo is active", () => {
        (demoProvider.useDemo as any).mockReturnValue({
            demo: true,
            activateDemo: mockActivateDemo,
            deactivateDemo: mockDeactivateDemo,
        });

        render(<DemoButton />);
        expect(screen.getByRole("button", { name: "Abandonar demo" })).toBeInTheDocument();
    });

    it("activates demo and logs in when clicked (if inactive)", () => {
        render(<DemoButton />);

        fireEvent.click(screen.getByRole("button", { name: "Probar demo" }));

        expect(mockActivateDemo).toHaveBeenCalled();
        expect(mockLogin).toHaveBeenCalledWith({
            username: "demoUser",
            password: "Ab12345678",
        });
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("deactivates demo and logs out when clicked (if active)", () => {
        (demoProvider.useDemo as any).mockReturnValue({
            demo: true,
            activateDemo: mockActivateDemo,
            deactivateDemo: mockDeactivateDemo,
        });

        render(<DemoButton />);

        fireEvent.click(screen.getByRole("button", { name: "Abandonar demo" }));

        expect(mockDeactivateDemo).toHaveBeenCalled();
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
