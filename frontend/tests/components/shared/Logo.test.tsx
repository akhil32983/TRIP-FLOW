import Logo from "@components/shared/Logo";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Logo Component", () => {
  it("renders logo with default props", () => {
    render(<Logo />);

    const logo = screen.getByAltText("TripFlow Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");

    const text = screen.getByText("TripFlow");
    expect(text).toBeInTheDocument();
  });

  it("applies default size class", () => {
    render(<Logo />);

    const container = screen.getByText("TripFlow").parentElement;
    expect(container?.className).toMatch(/small/);
  });

  it("applies custom size class", () => {
    render(<Logo size="large" />);

    const container = screen.getByText("TripFlow").parentElement;
    expect(container?.className).toMatch(/large/);
  });

  it("applies responsive class when enabled", () => {
    render(<Logo responsive />);

    const container = screen.getByText("TripFlow").parentElement;
    expect(container?.className).toMatch(/responsive/);
  });
});
