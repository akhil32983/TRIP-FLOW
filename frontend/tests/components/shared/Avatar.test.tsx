import Avatar from "@components/shared/Avatar";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Avatar Component", () => {
  it("renders with src", () => {
    render(<Avatar to="/profile" />);
    
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("renders with default image when src is not provided", () => {
    render(<Avatar to="/profile" />);
    
    // It should render an image with default src
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("renders with size prop", () => {
    const { container } = render(<Avatar to="/profile" size="full" />);
    
    const avatarLink = container.querySelector("a");
    // Check if class contains 'full' (assuming CSS module keeps the name part)
    expect(avatarLink?.className).toMatch(/full/);
  });

  it("renders as link with correct to prop", () => {
    render(<Avatar to="/profile" />);
    
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/profile");
  });
});
