import { BrowserRouter } from "react-router";

import IndexPage from "@pages/Index";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("IndexPage Component", () => {
    it("renders index page with layout", () => {
        render(
            <RouterWrapper>
                <IndexPage />
            </RouterWrapper>
        );

        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();

        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();

        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    });

    it("renders Hero section", () => {
        render(
            <RouterWrapper>
                <IndexPage />
            </RouterWrapper>
        );

        const heroSection = screen.getByTestId("hero-section");
        expect(heroSection).toBeInTheDocument();
    });
});