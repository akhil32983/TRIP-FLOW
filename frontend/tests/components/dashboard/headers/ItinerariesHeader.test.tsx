import ItinerariesHeader from "@components/dashboard/headers/ItinerariesHeader";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("ItinerariesHeader Component", () => {
    it("renders 'Crear itinerario' button", () => {
        render(
            <ItinerariesHeader>
                <div>Child Content</div>
            </ItinerariesHeader>
        );
        const button = screen.getByRole("link", { name: "Crear itinerario" });
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
