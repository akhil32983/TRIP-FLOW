import { BrowserRouter } from "react-router"

import Button from "@components/shared/Button"

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("Button Component", () => {
    it("renders button with label", () => {
        render(
            <Button style={["primary"]} label="Test Button" />
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Test Button");
    });

    it("renders button with children", () => {
        render(
            <Button style={["primary"]}>
                <span>Child Content</span>
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Child Content");
    });

    it("renders button with both label and children", () => {
        render(
            <Button style={["primary"]} label="Button Label">
                <span>Icon</span>
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Button Label");
        expect(button).toHaveTextContent("Icon");
    });

    it("applies correct base class when style prop is an empty array", () => {
        render(
            <Button style={[]} label="Base Button" />
        );

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/button/);
    });

    it("applies correct CSS classes based on style prop", () => {
        render(
            <Button
                style={[
                    "primary", "secondary", "inline", "logo", "tool"
                ]}
                label="Styled Button"
            />
        );

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/button/);
        expect(button.className).toMatch(/primary/);
        expect(button.className).toMatch(/secondary/);
        expect(button.className).toMatch(/inline/);
        expect(button.className).toMatch(/logo/);
        expect(button.className).toMatch(/tool/);
    });

    it("handles click events", () => {
        const handleClick = vi.fn()
        render(
            <Button style={["primary"]} label="Click Me" onClick={handleClick} />
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as NavLink when 'to' prop is provided", () => {
        render(
            <RouterWrapper>
                <Button style={["primary"]} label="Navigate" to="/test" />
            </RouterWrapper>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/test");
    });

    it("applies aria-label correctly", () => {
        render(
            <Button style={["primary"]} label="Button" ariaLabel="Custom aria label" />
        );
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Custom aria label");
    });

    it("applies target and rel attributes for external links", () => {
        render(
            <RouterWrapper>
                <Button
                    style={["primary"]}
                    label="External Link"
                    to="/external"
                    target="_blank"
                    rel="noopener noreferrer"
                />
            </RouterWrapper>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
})