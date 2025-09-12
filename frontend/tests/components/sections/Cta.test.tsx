import { BrowserRouter } from "react-router";

import Cta from "@components/sections/Cta";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Cta", () => {
  it("renders section title correctly", () => {
    render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders content paragraphs", () => {
    const { container } = render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const paragraphs = container.querySelectorAll("p[class*='ctaText']");
    expect(paragraphs).toHaveLength(2);

    paragraphs.forEach((paragraph) => {
      expect(paragraph.textContent).toBeTruthy();
    });
  });

  it("renders call-to-action button with correct link", () => {
    render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const button = screen.getByRole("link");
    expect(button).toHaveAttribute("href", "/demo");
    expect(button).toHaveTextContent("Probar demo");
  });

  it("has correct CSS structure", () => {
    const { container } = render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const ctaContent = container.querySelector("div[class*='ctaContent']");
    expect(ctaContent).toBeInTheDocument();

    const ctaTexts = container.querySelectorAll("p[class*='ctaText']");
    expect(ctaTexts).toHaveLength(2);

    const actions = container.querySelector("div[class*='actions']");
    expect(actions).toBeInTheDocument();
  });

  it("button has primary style", () => {
    const { container } = render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const button = container.querySelector("a[class*='primary']");
    expect(button).toBeInTheDocument();
  });

  it("has proper content structure", () => {
    const { container } = render(
      <RouterWrapper>
        <Cta />
      </RouterWrapper>
    );

    const ctaContent = container.querySelector("div[class*='ctaContent']");
    const paragraphs = ctaContent?.querySelectorAll("p");
    const actionsDiv = ctaContent?.querySelector("div[class*='actions']");
    const button = actionsDiv?.querySelector("a");

    expect(paragraphs).toHaveLength(2);
    expect(actionsDiv).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
