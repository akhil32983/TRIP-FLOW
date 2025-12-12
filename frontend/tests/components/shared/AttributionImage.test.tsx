import AttributionImage from "@components/shared/AttributionImage";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("AttributionImage Component", () => {
    const defaultProps = {
        src: "test-image.jpg",
        alt: "Test Image",
        attribution: "Test Author",
        attributionLink: "https://example.com/author",
    };

    it("renders image with correct src and alt", () => {
        render(<AttributionImage {...defaultProps} />);
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", defaultProps.src);
        expect(image).toHaveAttribute("alt", defaultProps.alt);
    });

    it("renders attribution link successfully", () => {
        render(<AttributionImage {...defaultProps} />);
        const link = screen.getByRole("link", { name: defaultProps.attribution });
        expect(link).toHaveAttribute("href", defaultProps.attributionLink);
        expect(link).toBeInTheDocument();
    });

    it("renders default attribution prefix", () => {
        render(<AttributionImage {...defaultProps} />);
        expect(screen.getByText("Foto de")).toBeInTheDocument();
    });

    it("renders custom attribution prefix", () => {
        render(<AttributionImage {...defaultProps} attributionPrefix="Credit: " />);
        expect(screen.getByText("Credit:")).toBeInTheDocument();
    });

    it("stops propagation when clicking attribution link", () => {
        const handleClick = vi.fn();
        render(
            <div onClick={handleClick}>
                <AttributionImage {...defaultProps} />
            </div>
        );

        const link = screen.getByRole("link");
        fireEvent.click(link);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("applies additional class names", () => {
        render(<AttributionImage {...defaultProps} className="custom-class" />);
        const container = screen.getByRole("img").parentElement;
        expect(container).toHaveClass("custom-class");
    });

    it("renders children content", () => {
        render(
            <AttributionImage {...defaultProps}>
                <div data-testid="child-element">Child Content</div>
            </AttributionImage>
        );
        expect(screen.getByTestId("child-element")).toBeInTheDocument();
    });
});
