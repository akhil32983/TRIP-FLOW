import { BrowserRouter } from "react-router";

import Header from "@components/shared/Header";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("Header Component", () => {
    it("renders header with logo and login button", () => {
        render(
            <RouterWrapper>
                <Header />
            </RouterWrapper>
        );

        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();

        const loginButton = screen.getByText("Acceder");
        expect(loginButton).toBeInTheDocument();
    });

    it("logo links to home page", () => {
        render(
            <RouterWrapper>
                <Header />
            </RouterWrapper>
        );

        const links = screen.getAllByRole("link");
        const homeLink = links.find(link => link.getAttribute("href") === "/");
        expect(homeLink).toBeInTheDocument();
    });

    it("login button links to login page", () => {
        render(
            <RouterWrapper>
                <Header />
            </RouterWrapper>
        );

        const links = screen.getAllByRole("link");
        const loginLink = links.find(link => link.textContent === "Acceder");
        expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("has correct CSS structure", () => {
        render(
            <RouterWrapper>
                <Header />
            </RouterWrapper>
        );

        const header = screen.getByRole("banner");
        expect((header.firstChild as HTMLElement)?.className).toMatch(/content/);
    });
});
