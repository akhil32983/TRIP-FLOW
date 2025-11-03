import Hero from "@components/sections/Hero";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Hero Component", () => {
  it("renders hero section with main content", () => {
    const { container } = render(<Hero />);

    const heroSection = container.querySelector("section");
    expect(heroSection).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Planifica tus viajes del futuro"
    );
    expect(
      screen.getByText(
        "Optimización de rutas, itinerarios personalizados y acceso offline con tecnología IA."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Impulsado por IA")).toBeInTheDocument();
  });

  it("renders primary action button", () => {
    render(<Hero />);

    const primaryButton = screen.getByText("Comenzar ahora");
    expect(primaryButton).toBeInTheDocument();

    const primaryLink = primaryButton.closest("a");
    expect(primaryLink).toHaveAttribute("href", "/signup");
  });

  it("renders secondary action button", () => {
    render(<Hero />);

    const secondaryButton = screen.getByRole("button", { name: /probar demo/i });
    expect(secondaryButton).toBeInTheDocument();
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Hero />);

    const heroSection = container.querySelector("section");
    const contentDiv = heroSection?.querySelector("div");
    expect(contentDiv?.className).toMatch(/content/);
  });
});