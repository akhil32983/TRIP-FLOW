import { BrowserRouter } from "react-router"

import Layout from "@/layouts/Layout"

import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("Layout Component", () => {
    it("renders layout with header and footer by default", () => {
        render(
            <RouterWrapper>
                <Layout>
                    <div>Test Content</div>
                </Layout>
            </RouterWrapper>
        );

        const header = screen.getByRole("banner");
        const main = screen.getByRole("main");
        const content = screen.getByText("Test Content");

        expect(header).toBeInTheDocument();
        expect(main).toBeInTheDocument();
        expect(content).toBeInTheDocument();
    });

    it("renders layout without header and footer when single prop is true", () => {
        render(
            <RouterWrapper>
                <Layout single>
                    <div>Single Layout Content</div>
                </Layout>
            </RouterWrapper>
        );

        const main = screen.getByRole("main");
        const content = screen.getByText("Single Layout Content");

        expect(main).toBeInTheDocument();
        expect(content).toBeInTheDocument();

        // Header should not be present
        const header = screen.queryByRole("banner");
        expect(header).not.toBeInTheDocument();

        // Footer should not be present
        const footer = screen.queryByRole("contentinfo");
        expect(footer).not.toBeInTheDocument();
    });

    it("renders children inside main element", () => {
        render(
            <RouterWrapper>
                <Layout>
                    <div data-testid="child-content">Child Component</div>
                </Layout>
            </RouterWrapper>
        );

        const main = screen.getByRole("main");
        const childContent = screen.getByTestId("child-content");

        expect(main).toContainElement(childContent);
    });

    it("applies correct CSS classes", () => {
        render(
            <RouterWrapper>
                <Layout>
                    <div>Test</div>
                </Layout>
            </RouterWrapper>
        );

        const layoutContainer = screen.getByRole("main").parentElement;
        const main = screen.getByRole("main");

        expect(layoutContainer?.className).toMatch(/layout/);
        expect(main.className).toMatch(/main/);
    });

    it("renders multiple children correctly", () => {
        render(
            <RouterWrapper>
                <Layout>
                    <div>First Child</div>
                    <div>Second Child</div>
                    <span>Third Child</span>
                </Layout>
            </RouterWrapper>
        );

        expect(screen.getByText("First Child")).toBeInTheDocument();
        expect(screen.getByText("Second Child")).toBeInTheDocument();
        expect(screen.getByText("Third Child")).toBeInTheDocument();
    });
});