import Carousel from "@components/shared/Carousel";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Carousel Component", () => {
    const defaultProps = {
        title: "Test Carousel",
        children: (
            <>
                <div data-testid="item-1">Item 1</div>
                <div data-testid="item-2">Item 2</div>
                <div data-testid="item-3">Item 3</div>
            </>
        ),
    };

    it("renders carousel with title", () => {
        render(<Carousel {...defaultProps} />);
        expect(screen.getByText("Test Carousel")).toBeInTheDocument();
    });

    it("renders children elements", () => {
        render(<Carousel {...defaultProps} />);
        expect(screen.getByTestId("item-1")).toBeInTheDocument();
        expect(screen.getByTestId("item-2")).toBeInTheDocument();
        expect(screen.getByTestId("item-3")).toBeInTheDocument();
    });

    it("renders scroll buttons", () => {
        render(<Carousel {...defaultProps} />);
        expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
        expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
    });

    it("renders action element if provided", () => {
        render(
            <Carousel
                {...defaultProps}
                action={<button>See All</button>}
            />
        );
        expect(screen.getByText("See All")).toBeInTheDocument();
    });

    it("disables previous button initially (cannot scroll left)", () => {
        render(<Carousel {...defaultProps} />);
        const prevButton = screen.getByLabelText("Previous slide");
        expect(prevButton).toBeDisabled();
    });
});
