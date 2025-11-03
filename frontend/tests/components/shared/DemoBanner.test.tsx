import DemoBanner from "@components/shared/DemoBanner";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("DemoBanner", () => {
  it("renders banner with demo message", () => {
    render(<DemoBanner />);

    expect(
      screen.getByText(
        "Modo demostración. Algunas funcionalidades pueden estar limitadas."
      )
    ).toBeInTheDocument();
  });

  it("renders compass icon", () => {
    const { container } = render(<DemoBanner />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders DemoButton component", () => {
    render(<DemoBanner />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("has correct CSS structure", () => {
    const { container } = render(<DemoBanner />);

    const banner = container.querySelector("div[class*='demoBanner']");
    expect(banner).toBeInTheDocument();

    const leftSection = container.querySelector("div[class*='left']");
    expect(leftSection).toBeInTheDocument();

    const rightSection = container.querySelector("div[class*='right']");
    expect(rightSection).toBeInTheDocument();
  });

  it("applies rounded class when rounded prop is true", () => {
    const { container } = render(<DemoBanner rounded />);

    const banner = container.querySelector("div[class*='demoBanner']");
    expect(banner?.className).toMatch(/rounded/);
  });

  it("does not apply rounded class when rounded prop is false", () => {
    const { container } = render(<DemoBanner rounded={false} />);

    const banner = container.querySelector("div[class*='demoBanner']");
    expect(banner?.className).not.toMatch(/rounded/);
  });

  it("does not apply rounded class by default", () => {
    const { container } = render(<DemoBanner />);

    const banner = container.querySelector("div[class*='demoBanner']");
    expect(banner?.className).not.toMatch(/rounded/);
  });

  it("has proper content structure", () => {
    const { container } = render(<DemoBanner />);

    const leftSection = container.querySelector("div[class*='left']");
    const icon = leftSection?.querySelector("svg");
    const text = leftSection?.querySelector("span");
    const rightSection = container.querySelector("div[class*='right']");
    const button = rightSection?.querySelector("button");

    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});