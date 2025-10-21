import ProfilePage from "@/pages/Profile";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock dependencies
vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: any) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

vi.mock("@components/dashboard/DashboardHeader", () => ({
    default: ({ title, responsiveRender, defaultRender }: any) => (
        <div data-testid="dashboard-header">
            <h1>{title}</h1>
            <div data-testid="responsive-render">{responsiveRender}</div>
            <div data-testid="default-render">{defaultRender}</div>
        </div>
    ),
}));

vi.mock("@components/dashboard/Stats", () => ({
    default: () => <div data-testid="stats">Stats Component</div>,
}));

vi.mock("@components/dashboard/ProfileCard", () => ({
    default: () => <div data-testid="profile-card">ProfileCard Component</div>,
}));

vi.mock("@components/buttons/LogoutButton", () => ({
    default: ({ responsive }: any) => (
        <button data-testid="logout-button" data-responsive={responsive}>
            Logout
        </button>
    ),
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

    it("renders DashboardHeader", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
    });

    it("renders DashboardHeader with correct title", () => {
        render(<ProfilePage />);

        expect(screen.getByText("Tu perfil")).toBeInTheDocument();
    });

    it("renders responsive LogoutButton in header", () => {
        render(<ProfilePage />);

        const responsiveRender = screen.getByTestId("responsive-render");
        const button = responsiveRender.querySelector('[data-responsive="true"]');
        expect(button).toBeInTheDocument();
    });

    it("renders default LogoutButton in header", () => {
        render(<ProfilePage />);

        const defaultRender = screen.getByTestId("default-render");
        const button = defaultRender.querySelector("button");
        expect(button).toBeInTheDocument();
    });

    it("renders ProfileCard component", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("profile-card")).toBeInTheDocument();
    });

    it("renders Stats component", () => {
        render(<ProfilePage />);

        expect(screen.getByTestId("stats")).toBeInTheDocument();
    });

    it("renders content container", () => {
        const { container } = render(<ProfilePage />);

        const content = container.querySelector('[class*="content"]');
        expect(content).toBeInTheDocument();
    });

    it("renders ProfileCard inside content", () => {
        const { container } = render(<ProfilePage />);

        const content = container.querySelector('[class*="content"]');
        const profileCard = screen.getByTestId("profile-card");

        expect(content).toContainElement(profileCard);
    });

    it("renders Stats inside content", () => {
        const { container } = render(<ProfilePage />);

        const content = container.querySelector('[class*="content"]');
        const stats = screen.getByTestId("stats");

        expect(content).toContainElement(stats);
    });

    it("renders components in correct order", () => {
        render(<ProfilePage />);

        const layout = screen.getByTestId("app-layout");
        const children = Array.from(layout.children);

        expect(children[0]).toHaveAttribute("data-testid", "dashboard-header");
        const secondChild = children[1] as HTMLElement;
        expect(secondChild.className).toMatch(/content/);
    });

    it("renders two logout buttons", () => {
        render(<ProfilePage />);

        const buttons = screen.getAllByTestId("logout-button");
        expect(buttons).toHaveLength(2);
    });

    it("renders header inside layout", () => {
        render(<ProfilePage />);

        const layout = screen.getByTestId("app-layout");
        const header = screen.getByTestId("dashboard-header");

        expect(layout).toContainElement(header);
    });

    it("renders content inside layout", () => {
        const { container } = render(<ProfilePage />);

        const layout = screen.getByTestId("app-layout");
        const content = container.querySelector('[class*="content"]') as HTMLElement;

        expect(layout).toContainElement(content);
    });
});