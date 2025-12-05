import Avatar from "@components/shared/Avatar";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Avatar Component", () => {
  it("renders with src", () => {
    render(<Avatar src="test.jpg" alt="User Avatar" to="/profile" />);
    
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
    expect(image).toHaveAttribute("alt", "User Avatar");
  });

  it("renders with default image when src is not provided", () => {
    render(<Avatar alt="User Avatar" to="/profile" />);
    
    // It should render an image with default src
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/demo-avatar.png");
  });

  it("renders with size prop", () => {
    const { container } = render(<Avatar src="test.jpg" size="full" to="/profile" />);
    
    const avatarLink = container.querySelector("a");
    // Check if class contains 'full' (assuming CSS module keeps the name part)
    expect(avatarLink?.className).toMatch(/full/);
  });

  it("renders as link with correct to prop", () => {
    render(<Avatar src="test.jpg" to="/profile" />);
    
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/profile");
  });
});
