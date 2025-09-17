import Avatar from "@components/shared/Avatar";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Avatar Component", () => {
  it("renders avatar link element", () => {
    render(<Avatar to="/profile" />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders with correct href attribute", () => {
    render(<Avatar to="/profile" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/profile");
  });

  it("renders image when src is provided", () => {
    render(<Avatar to="/profile" src="/test-avatar.jpg" alt="Test User" />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-avatar.jpg");
    expect(image).toHaveAttribute("alt", "Test User");
  });

  it("renders default alt text when src provided but no alt", () => {
    render(<Avatar to="/profile" src="/test-avatar.jpg" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "User Avatar");
  });

  it("renders icon when no src is provided", () => {
    const { container } = render(<Avatar to="/profile" />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<Avatar to="/profile" />);

    const link = screen.getByRole("link");
    expect(link.className).toMatch(/avatar/);
  });

  it("renders as Link element", () => {
    render(<Avatar to="/profile" />);

    const link = screen.getByRole("link");
    expect(link.tagName).toBe("A");
  });

  it("does not render image when src is not provided", () => {
    render(<Avatar to="/profile" />);

    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});
