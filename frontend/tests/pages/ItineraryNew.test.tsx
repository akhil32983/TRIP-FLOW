import ItineraryNewPage from "@/pages/itineraries/ItineraryNew";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@/hooks/useItineraryForm", () => ({
    createDefaultItinerary: () => ({
        id: 0,
        icon: "",
        title: "",
        place: "",
        people: 0,
        budget: 0,
        date: "",
        status: "draft",
        countDays: 1,
        tags: [],
        days: [],
    }),
}));

// Fix: Mock ItineraryEditor instead of its internal components
vi.mock("@/components/dashboard/itineraries/ItineraryEditor", () => ({
    default: ({ title, back }: any) => (
        <div data-testid="itinerary-editor">
            <h1>{title}</h1>
            <a href={back?.url}>Back</a>
        </div>
    ),
}));

vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: any) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

describe("ItineraryNewPage Component", () => {
    it("renders itinerary new page", () => {
        const { container } = render(<ItineraryNewPage />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders AppLayout", () => {
        render(<ItineraryNewPage />);

        expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    });

    it("renders ItineraryEditor", () => {
        render(<ItineraryNewPage />);

        expect(screen.getByTestId("itinerary-editor")).toBeInTheDocument();
    });

    it("passes correct back URL to ItineraryEditor", () => {
        render(<ItineraryNewPage />);

        const backLink = screen.getByText("Back");
        expect(backLink).toHaveAttribute("href", "/itineraries/");
    });

    it("renders editor inside layout", () => {
        render(<ItineraryNewPage />);

        const layout = screen.getByTestId("app-layout");
        const editor = screen.getByTestId("itinerary-editor");

        expect(layout).toContainElement(editor);
    });
});
