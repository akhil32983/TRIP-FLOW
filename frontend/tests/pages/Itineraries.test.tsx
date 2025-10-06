import Itineraries from "@pages/itineraries/Itineraries";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

vi.mock("@/components/dashboard/DashboardHeader", () => ({
    default: ({ title }: any) => (
        <header data-testid="dashboard-header">{title}</header>
    ),
}));

vi.mock("@/components/shared/Searchbar", () => ({
    default: () => <div data-testid="searchbar" />,
}));

vi.mock("@/components/dashboard/ItinerariesPreview", () => ({
    default: () => <section data-testid="itineraries-preview" />,
}));

vi.mock("@/components/shared/Button", () => ({
    default: () => <button data-testid="button" />,
}));

describe("Itineraries Page", () => {
    it("renders itineraries page", () => {
        render(<Itineraries />);

        expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    });

    it("renders dashboard header", () => {
        render(<Itineraries />);

        expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
    });

    it("renders page title", () => {
        render(<Itineraries />);

        expect(screen.getByText("Tus itinerarios")).toBeInTheDocument();
    });

    it("renders searchbar", () => {
        render(<Itineraries />);

        expect(screen.getByTestId("searchbar")).toBeInTheDocument();
    });

    it("renders itineraries preview", () => {
        render(<Itineraries />);

        expect(screen.getByTestId("itineraries-preview")).toBeInTheDocument();
    });

    it("renders all main components", () => {
        render(<Itineraries />);

        expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
        expect(screen.getByTestId("searchbar")).toBeInTheDocument();
        expect(screen.getByTestId("itineraries-preview")).toBeInTheDocument();
    });

    it("wraps content in AppLayout", () => {
        const { container } = render(<Itineraries />);

        const appLayout = container.querySelector('[data-testid="app-layout"]');
        expect(appLayout).toBeInTheDocument();
    });
});
