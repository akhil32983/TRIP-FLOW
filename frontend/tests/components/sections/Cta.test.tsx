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

  it("renders call-to-action button with correct link", () => {
    render(<Cta />);

    const button = screen.getByRole("link");
    expect(button).toHaveAttribute("href", "/demo");
    expect(button).toHaveTextContent("Probar demo");
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

  it("button has primary style", () => {
    const { container } = render(<Cta />);

    const button = container.querySelector("a[class*='primary']");
    expect(button).toBeInTheDocument();
  });

  it("has proper content structure", () => {
    const { container } = render(<Cta />);

    const ctaContent = container.querySelector("div[class*='ctaContent']");
    const paragraphs = ctaContent?.querySelectorAll("p");
    const actionsDiv = ctaContent?.querySelector("div[class*='actions']");
    const button = actionsDiv?.querySelector("a");

    expect(paragraphs).toHaveLength(2);
    expect(actionsDiv).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
