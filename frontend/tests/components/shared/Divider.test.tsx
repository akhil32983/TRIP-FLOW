import Divider from "@components/shared/Divider";

import { render } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Divider Component", () => {
  it("renders divider element", () => {
    const { container } = render(<Divider />);

    const divider = container.querySelector("div");
    expect(divider).toBeInTheDocument();
  });

  it("applies correct CSS class", () => {
    const { container } = render(<Divider />);

    const divider = container.querySelector("div");
    expect(divider?.className).toMatch(/divider/);
  });

  it("applies maxWidth as number", () => {
    const { container } = render(<Divider maxWidth={300} />);

    const divider = container.querySelector("div");
    expect(divider).toHaveStyle({ maxWidth: "300px" });
  });

  it("applies maxWidth as string", () => {
    const { container } = render(<Divider maxWidth="50%" />);

    const divider = container.querySelector("div");
    expect(divider).toHaveStyle({ maxWidth: "50%" });
  });

  it("renders without maxWidth when not provided", () => {
    const { container } = render(<Divider />);

    const divider = container.querySelector("div");
    expect(divider).toHaveStyle({ maxWidth: "" });
  });

  it("renders as div element", () => {
    const { container } = render(<Divider />);

    const divider = container.querySelector("div");
    expect(divider?.tagName).toBe("DIV");
  });
});
