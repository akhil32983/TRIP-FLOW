import { BrowserRouter } from "react-router";

import Footer from "@components/shared/Footer";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("Footer Component", () => {
    it("renders footer element", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    });

    it("displays TripFlow branding and description", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        expect(screen.getByText("TripFlow")).toBeInTheDocument();
        expect(screen.getByText(/planificador de viajes inteligente/i)).toBeInTheDocument();
    });

    it("displays author information", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        expect(screen.getByText(/Creado por/)).toBeInTheDocument();
        expect(screen.getByText("CuB1z")).toBeInTheDocument();
    });

    it("displays copyright information", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        const copyright = screen.getByText(/©(20\d{2}) TripFlow\. Todos los derechos reservados\./);
        expect(copyright).toBeInTheDocument();
    });

    it("TripFlow link points to home page", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        const tripflowLink = screen.getByText("TripFlow").closest("a");
        expect(tripflowLink).toHaveAttribute("href", "/");
    });

    it("renders social media links with correct attributes", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        const githubLink = screen.getByLabelText(/github/i);
        expect(githubLink).toHaveAttribute("href", "https://github.com/CuB1z");
        expect(githubLink).toHaveAttribute("target", "_blank");
        expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

        const linkedinLink = screen.getByLabelText(/linkedin/i);
        expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/cub1z/");
        expect(linkedinLink).toHaveAttribute("target", "_blank");
        expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has correct CSS structure", () => {
        render(
            <RouterWrapper>
                <Footer />
            </RouterWrapper>
        );

        const footer = screen.getByRole("contentinfo");
        expect(footer.className).toMatch(/footer/);

        const contentDiv = footer.querySelector("div");
        expect(contentDiv?.className).toMatch(/content/);
    });
});