import Loader from "@components/shared/Loader";

import { render } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Loader Component", () => {
    it("renders spinner variant by default", () => {
        const { container } = render(<Loader />);
        const spinner = container.querySelector('div[class*="loaderSpinner"]');
        expect(spinner).toBeInTheDocument();
    });

    it("renders dots variant", () => {
        const { container } = render(<Loader variant="dots" />);
        const dotsContainer = container.querySelector('div[class*="loaderDots"]');
        expect(dotsContainer).toBeInTheDocument();
        const dots = container.querySelectorAll('div[class*="dot"]');
        expect(dots).toHaveLength(3);
    });

    it("applies custom size to spinner", () => {
        const size = 100;
        const { container } = render(<Loader size={size} />);
        const spinner = container.querySelector('div[class*="loaderSpinner"]') as HTMLElement;
        expect(spinner).toHaveStyle({
            width: `${size}px`,
            height: `${size}px`
        });
    });

    it("applies custom size to dots", () => {
        const size = 40;
        const { container } = render(<Loader variant="dots" size={size} />);
        const dotsContainer = container.querySelector('div[class*="loaderDots"]') as HTMLElement;
        expect(dotsContainer).toHaveStyle({
            fontSize: `${size / 4}px`
        });
    });
});
