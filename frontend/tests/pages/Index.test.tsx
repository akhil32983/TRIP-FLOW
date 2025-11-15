import IndexPage from "@pages/Index";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("IndexPage Component", () => {
  it("renders index page with layout", () => {
    render(<IndexPage />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders Hero section", () => {
    render(<IndexPage />);

    const heroSection = screen.getByTestId("hero-section");
    expect(heroSection).toBeInTheDocument();
  });
});
