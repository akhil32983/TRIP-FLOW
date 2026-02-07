import AdminHeader from "@components/dashboard/headers/AdminHeader";
import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock LogoutButton since it interacts with router/auth
vi.mock("@/components/buttons/LogoutButton", () => ({
    default: ({ children }: { children: React.ReactNode }) => <button data-testid="logout-btn">{children}</button>
}));

describe("AdminHeader Component", () => {
    it("renders the title", () => {
        render(<AdminHeader />);
        expect(screen.getByText("Administración")).toBeInTheDocument();
    });

    it("renders the logout button", () => {
        render(<AdminHeader />);
        expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
        expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
    });

    it("renders children content when provided", () => {
        render(
            <AdminHeader>
                <div data-testid="child-content">Child Content</div>
            </AdminHeader>
        );
        expect(screen.getByTestId("child-content")).toBeInTheDocument();
        expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
});
