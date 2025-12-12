import ItinerariesHeader from "@components/dashboard/headers/ItinerariesHeader";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("ItinerariesHeader Component", () => {
    it("renders title", () => {
        render(
            <ItinerariesHeader>
                <div>Child Content</div>
            </ItinerariesHeader>
        );
        expect(screen.getByText("Itinerarios")).toBeInTheDocument();
    });

    it("renders 'Crear Itinerario' button", () => {
        render(
            <ItinerariesHeader>
                <div>Child Content</div>
            </ItinerariesHeader>
        );
        const button = screen.getByRole("link", { name: "Crear Itinerario" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/itineraries/new");
    });

    it("renders children", () => {
        render(
            <ItinerariesHeader>
                <div data-testid="child">Child Content</div>
            </ItinerariesHeader>
        );
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });
});
