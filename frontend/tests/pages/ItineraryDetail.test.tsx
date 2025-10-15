import ItineraryDetailPage from "@pages/itineraries/ItineraryDetail";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

vi.mock("@components/dashboard/InnerTabHeader", () => ({
    default: ({ title, backUrl }: { title: string; backUrl: string }) => (
        <header data-testid="inner-tab-header" data-back-url={backUrl}>
            {title}
        </header>
    ),
}));

vi.mock("@components/dashboard/ExtendedItinerary", () => ({
    default: ({ itinerary }: any) => (
        <div data-testid="extended-itinerary" data-itinerary-id={itinerary.id}>
            {itinerary.title}
        </div>
    ),
}));

describe("ItineraryDetail Page", () => {
    it("renders itinerary detail page", () => {
        render(<ItineraryDetailPage />);

        expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    });

    it("renders inner tab header", () => {
        render(<ItineraryDetailPage />);

        expect(screen.getByTestId("inner-tab-header")).toBeInTheDocument();
    });

    it("renders header with place name", () => {
        render(<ItineraryDetailPage />);

        expect(screen.getByText("París, Francia")).toBeInTheDocument();
    });

    it("header has correct back url", () => {
        render(<ItineraryDetailPage />);

        const header = screen.getByTestId("inner-tab-header");
        expect(header.getAttribute("data-back-url")).toBe("/itineraries");
    });

    it("renders extended itinerary component", () => {
        render(<ItineraryDetailPage />);

        expect(screen.getByTestId("extended-itinerary")).toBeInTheDocument();
    });

    it("passes itinerary data to ExtendedItinerary", () => {
        render(<ItineraryDetailPage />);

        expect(
            screen.getByText("París: Ciudad de la Luz y el Amor")
        ).toBeInTheDocument();
    });

    it("wraps content in AppLayout", () => {
        const { container } = render(<ItineraryDetailPage />);

        const appLayout = container.querySelector('[data-testid="app-layout"]');
        expect(appLayout).toBeInTheDocument();
    });

    it("renders both main components", () => {
        render(<ItineraryDetailPage />);

        expect(screen.getByTestId("inner-tab-header")).toBeInTheDocument();
        expect(screen.getByTestId("extended-itinerary")).toBeInTheDocument();
    });
});
