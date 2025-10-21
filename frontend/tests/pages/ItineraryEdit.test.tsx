import ItineraryEdit from "@/pages/itineraries/ItineraryEdit";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});

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
            <span>Title: {initialItinerary.title}</span>
        </div>
    ),
}));

vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: any) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

describe("ItineraryEdit Component", () => {
    it("renders itinerary edit page", () => {
        const { container } = render(<ItineraryEdit />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders AppLayout", () => {
        render(<ItineraryEdit />);

        expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    });

    it("renders InnerTabHeader with correct title", () => {
        render(<ItineraryEdit />);

        expect(screen.getByText("Editar Itinerario")).toBeInTheDocument();
    });

    it("renders InnerTabHeader with correct back URL", () => {
        render(<ItineraryEdit />);

        const backLink = screen.getByText("Back");
        expect(backLink).toHaveAttribute("href", "/itineraries/1");
    });

    it("renders ItineraryEditForm", () => {
        render(<ItineraryEdit />);

        expect(screen.getByTestId("itinerary-edit-form")).toBeInTheDocument();
    });

    it("passes fake itinerary to ItineraryEditForm", () => {
        render(<ItineraryEdit />);

        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(
            screen.getByText("Title: París: Ciudad de la Luz y el Amor")
        ).toBeInTheDocument();
    });

    it("renders header inside layout", () => {
        render(<ItineraryEdit />);

        const layout = screen.getByTestId("app-layout");
        const header = screen.getByTestId("inner-tab-header");

        expect(layout).toContainElement(header);
    });

    it("renders form inside layout", () => {
        render(<ItineraryEdit />);

        const layout = screen.getByTestId("app-layout");
        const form = screen.getByTestId("itinerary-edit-form");

        expect(layout).toContainElement(form);
    });

    it("renders components in correct order", () => {
        const { container } = render(<ItineraryEdit />);

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

    it("uses id from useParams in back URL", () => {
        render(<ItineraryEdit />);

        const backLink = screen.getByText("Back");
        expect(backLink.getAttribute("href")).toMatch(/\/itineraries\/1$/);
    });
});
