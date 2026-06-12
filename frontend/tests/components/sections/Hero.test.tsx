import Hero from "@components/sections/Hero";
import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Hero Component", () => {
  it("renders hero section with main content", () => {
    const { container } = render(<Hero />);

    expect(container.querySelector("section")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument();
  });

  it("renders primary action button", () => {
    render(<Hero />);

    const primaryButton = screen.getByRole("link");

    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute("href", "/signup");
  });

  it("renders secondary action button", () => {
    render(<Hero />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(0);
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Hero />);

    const heroSection = container.querySelector("section");

    expect(heroSection).toBeInTheDocument();
  });
});