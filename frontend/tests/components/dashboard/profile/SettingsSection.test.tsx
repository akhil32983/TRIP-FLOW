import SettingsSection from "@components/dashboard/profile/SettingsSection";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock LogoutButton
vi.mock("@/components/buttons/LogoutButton", () => ({
    default: ({ children }: any) => <button>Logout Logic Wrapped ({children})</button>,
}));

vi.mock("@/providers/authProvider", () => ({
    useAuth: () => ({
        user: { name: "Test User", notificationsAllowed: true },
        updateProfile: vi.fn(),
    }),
    AuthProvider: ({ children }: any) => <>{children}</>,
}));

describe("SettingsSection Component", () => {
    it("renders profile settings links", () => {
        render(<SettingsSection />);
        expect(screen.getByText("Editar Perfil")).toBeInTheDocument();
        expect(screen.getByText("Notificaciones")).toBeInTheDocument();
        expect(screen.getByText("Ayuda")).toBeInTheDocument();
    });

    it("renders logout button", () => {
        render(<SettingsSection />);
        expect(screen.getByText(/Cerrar Sesión/)).toBeInTheDocument();
    });
});
