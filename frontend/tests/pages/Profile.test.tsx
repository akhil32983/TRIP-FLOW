import ProfilePage from "@/pages/Profile";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock dependencies
vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: any) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

vi.mock("@components/dashboard/Stats", () => ({
    default: () => <div data-testid="stats">Stats Component</div>,
}));

vi.mock("@/components/dashboard/profile/ProfileCard", () => ({
    default: () => <div data-testid="profile-card">ProfileCard Component</div>,
}));

vi.mock("@components/dashboard/profile/SettingsSection", () => ({
    default: () => <div data-testid="settings-section">Settings Section</div>,
}));

describe("ProfilePage Component", () => {
    it("renders profile page", () => {
        const { container } = render(<ProfilePage />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders AppLayout", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    });

    it("renders ProfileCard component", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("profile-card")).toBeInTheDocument();
    });

    it("renders Stats component", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("stats")).toBeInTheDocument();
    });

    it("renders SettingsSection component", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("settings-section")).toBeInTheDocument();
    });

    it("renders components inside AppLayout", () => {
        render(<ProfilePage />);

        const layout = screen.getByTestId("app-layout");
        const profileCard = screen.getByTestId("profile-card");
        const stats = screen.getByTestId("stats");
        const settings = screen.getByTestId("settings-section");

        expect(layout).toContainElement(profileCard);
        expect(layout).toContainElement(stats);
        expect(layout).toContainElement(settings);
    });
});