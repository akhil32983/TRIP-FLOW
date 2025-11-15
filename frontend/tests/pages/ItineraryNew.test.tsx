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

vi.mock("@/components/dashboard/InnerTabHeader", () => ({
    default: ({ title, backUrl }: any) => (
        <div data-testid="inner-tab-header">
            <h1>{title}</h1>
            <a href={backUrl}>Back</a>
        </div>
    ),
}));

vi.mock("@/components/form/ItineraryEditForm", () => ({
    default: ({ initialItinerary }: any) => (
        <div data-testid="itinerary-edit-form">
            <span>Itinerary Form</span>
            <span>ID: {initialItinerary.id}</span>
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

    it("renders InnerTabHeader with correct title", () => {
        render(<ItineraryNewPage />);

        expect(screen.getByText("Crear Itinerario")).toBeInTheDocument();
    });

    it("renders InnerTabHeader with correct back URL", () => {
        render(<ItineraryNewPage />);

        const backLink = screen.getByText("Back");
        expect(backLink).toHaveAttribute("href", "/itineraries/");
    });

    it("renders ItineraryEditForm", () => {
        render(<ItineraryNewPage />);

        expect(screen.getByTestId("itinerary-edit-form")).toBeInTheDocument();
    });

    it("passes default itinerary to ItineraryEditForm", () => {
        render(<ItineraryNewPage />);

        expect(screen.getByText("ID: 0")).toBeInTheDocument();
    });

    it("renders header inside layout", () => {
        render(<ItineraryNewPage />);

        const layout = screen.getByTestId("app-layout");
        const header = screen.getByTestId("inner-tab-header");

        expect(layout).toContainElement(header);
    });

    it("renders form inside layout", () => {
        render(<ItineraryNewPage />);

        const layout = screen.getByTestId("app-layout");
        const form = screen.getByTestId("itinerary-edit-form");

        expect(layout).toContainElement(form);
    });

    it("renders components in correct order", () => {
        const { container } = render(<ItineraryNewPage />);

        const layout = container.querySelector('[data-testid="app-layout"]');
        const children = layout?.children;

        expect(children?.[0]).toHaveAttribute(
            "data-testid",
            "inner-tab-header"
        );
        expect(children?.[1]).toHaveAttribute(
            "data-testid",
            "itinerary-edit-form"
        );
    });
});
