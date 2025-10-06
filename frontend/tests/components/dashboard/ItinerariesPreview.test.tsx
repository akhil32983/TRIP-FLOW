import ItinerariesPreview from "@components/dashboard/ItinerariesPreview";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@components/shared/Badge", () => ({
    default: ({ children }: { children?: React.ReactNode }) => (
        <span data-testid="badge">{children}</span>
    ),
}));

describe("ItinerariesPreview Component", () => {
    it("renders itineraries preview component", () => {
        const { container } = render(<ItinerariesPreview />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders as section element", () => {
        const { container } = render(<ItinerariesPreview />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("renders itinerary links", () => {
        render(<ItinerariesPreview />);

        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
    });

    it("each link has valid href", () => {
        render(<ItinerariesPreview />);

        const links = screen.getAllByRole("link");

        links.forEach((link) => {
            expect(link).toHaveAttribute("href");
        });
    });

    it("renders badges", () => {
        render(<ItinerariesPreview />);

        const badges = screen.getAllByTestId("badge");
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders headings", () => {
        const { container } = render(<ItinerariesPreview />);

        const headings = container.querySelectorAll("h3, h4");
        expect(headings.length).toBeGreaterThan(0);
    });
});
