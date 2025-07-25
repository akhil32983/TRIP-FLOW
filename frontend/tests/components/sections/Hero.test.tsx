import { BrowserRouter } from "react-router";

import Hero from "@components/sections/Hero";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("Hero Component", () => {
    it("renders hero section with main content", () => {
        const { container } = render(
            <RouterWrapper>
                <Hero />
            </RouterWrapper>
        );

        const heroSection = container.querySelector("section");
        expect(heroSection).toBeInTheDocument();

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Planifica tus viajes del futuro");
        expect(screen.getByText("Optimización de rutas, itinerarios personalizados y acceso offline con tecnología IA.")).toBeInTheDocument();
        expect(screen.getByText("🚀 Impulsado por IA")).toBeInTheDocument();
    });

    it("renders primary action button", () => {
        render(
            <RouterWrapper>
                <Hero />
            </RouterWrapper>
        );

        const primaryButton = screen.getByText("Comenzar ahora");
        expect(primaryButton).toBeInTheDocument();

        const primaryLink = primaryButton.closest("a");
        expect(primaryLink).toHaveAttribute("href", "/signup");
    });

    it("renders secondary action button", () => {
        render(
            <RouterWrapper>
                <Hero />
            </RouterWrapper>
        );

        const secondaryButton = screen.getByText("Probar demo");
        expect(secondaryButton).toBeInTheDocument();

        const secondaryLink = secondaryButton.closest("a");
        expect(secondaryLink).toHaveAttribute("href", "/demo");
    });

    it("has correct CSS structure", () => {
        const { container } = render(
            <RouterWrapper>
                <Hero />
            </RouterWrapper>
        );

        const heroSection = container.querySelector("section");
        const contentDiv = heroSection?.querySelector("div");
        expect(contentDiv?.className).toMatch(/content/);
    });
});