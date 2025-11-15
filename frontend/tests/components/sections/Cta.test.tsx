import Cta from "@components/sections/Cta";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Cta", () => {
  it("renders section title correctly", () => {
    render(<Cta />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders content paragraphs", () => {
    const { container } = render(<Cta />);

    const paragraphs = container.querySelectorAll("p[class*='ctaText']");
    expect(paragraphs).toHaveLength(2);

    paragraphs.forEach((paragraph) => {
      expect(paragraph.textContent).toBeTruthy();
    });
  });

  it("renders DemoButton component", () => {
    render(<Cta />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("DemoButton shows correct initial text", () => {
    render(<Cta />);

    const button = screen.getByRole("button", { name: /probar demo/i });
    expect(button).toBeInTheDocument();
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Cta />);

    const ctaContent = container.querySelector("div[class*='ctaContent']");
    expect(ctaContent).toBeInTheDocument();

    const ctaTexts = container.querySelectorAll("p[class*='ctaText']");
    expect(ctaTexts).toHaveLength(2);

    const actions = container.querySelector("div[class*='actions']");
    expect(actions).toBeInTheDocument();
  });

  it("DemoButton has primary style", () => {
    const { container } = render(<Cta />);

    const button = container.querySelector("button[class*='primary']");
    expect(button).toBeInTheDocument();
  });

  it("has proper content structure", () => {
    const { container } = render(<Cta />);

    const ctaContent = container.querySelector("div[class*='ctaContent']");
    const paragraphs = ctaContent?.querySelectorAll("p");
    const actionsDiv = ctaContent?.querySelector("div[class*='actions']");
    const button = actionsDiv?.querySelector("button");

    expect(paragraphs).toHaveLength(2);
    expect(actionsDiv).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("renders all expected text content", () => {
    const { container } = render(<Cta />);

    expect(container.textContent).toContain("Prueba nuestra demo");
    expect(container.textContent).toContain("Si tienes alguna duda");
  });
});