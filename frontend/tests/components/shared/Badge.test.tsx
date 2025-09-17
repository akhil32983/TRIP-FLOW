import Badge from "@components/shared/Badge";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Badge Component", () => {
  it("renders badge with title prop", () => {
    render(<Badge style="default" title="Test Badge" />);

    const badge = screen.getByText("Test Badge");
    expect(badge).toBeInTheDocument();
  });

  it("renders default title when no title provided", () => {
    render(<Badge style="default" />);

    const badge = screen.getByText("Sin título");
    expect(badge).toBeInTheDocument();
  });

  it("applies correct base classes", () => {
    render(<Badge style="default" title="Test" />);

    const badge = screen.getByText("Test");
    expect(badge.className).toMatch(/badge/);
  });

  it("applies style class prop correctly", () => {
    render(<Badge style="default" title="Test" />);

    const badge = screen.getByText("Test");
    expect(badge.className).toMatch(/default/);
  });

  it("renders children with title", () => {
    render(
      <Badge style="default" title="Test Badge">
        <span>Child Content</span>
      </Badge>
    );

    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders as span element", () => {
    render(<Badge style="default" title="Test" />);

    const badge = screen.getByText("Test");
    expect(badge.tagName).toBe("SPAN");
  });

  it("renders with empty title and only children", () => {
    render(
      <Badge style="default" title="">
        <span>Only Child</span>
      </Badge>
    );

    expect(screen.getByText("Only Child")).toBeInTheDocument();
  });
});
