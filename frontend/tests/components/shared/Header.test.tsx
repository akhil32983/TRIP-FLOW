import Header from "@components/shared/Header";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Header Component", () => {
  it("renders header with logo and login button", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const loginButton = screen.getByText("Acceder");
    expect(loginButton).toBeInTheDocument();
  });

  it("logo links to home page", () => {
    render(<Header />);

    const links = screen.getAllByRole("link");
    const homeLink = links.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  it("login button links to login page", () => {
    render(<Header />);

    const links = screen.getAllByRole("link");
    const loginLink = links.find((link) => link.textContent === "Acceder");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("has correct CSS structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect((header.firstChild as HTMLElement)?.className).toMatch(/content/);
  });
});
