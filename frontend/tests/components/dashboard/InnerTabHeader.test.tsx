import InnerTabHeader from "@components/dashboard/InnerTabHeader";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@components/shared/Button", () => ({
    default: ({ to, style, label, children }: any) => (
        <button data-testid="button" data-to={to} data-style={style?.join(",")}>
            {label}
            {children}
        </button>
    ),
}));

describe("InnerTabHeader Component", () => {
    it("renders inner tab header", () => {
        const { container } = render(
            <InnerTabHeader title="Test Title" backUrl="/back" />
        );

        const header = container.querySelector("header");
        expect(header).toBeInTheDocument();
    });

    it("renders as header element", () => {
        const { container } = render(
            <InnerTabHeader title="Test Title" backUrl="/back" />
        );

        const header = container.querySelector("header");
        expect(header?.tagName).toBe("HEADER");
    });

    it("renders title as string", () => {
        render(<InnerTabHeader title="My Title" backUrl="/back" />);

        expect(screen.getByText("My Title")).toBeInTheDocument();
    });

    it("renders title as JSX element", () => {
        render(
            <InnerTabHeader
                title={<span>Custom JSX Title</span>}
                backUrl="/back"
            />
        );

        expect(screen.getByText("Custom JSX Title")).toBeInTheDocument();
    });

    it("renders title as h2", () => {
        render(<InnerTabHeader title="Title" backUrl="/back" />);

        const title = screen.getByText("Title");
        expect(title.tagName).toBe("H2");
    });

    it("renders back button when backUrl is provided", () => {
        render(<InnerTabHeader title="Title" backUrl="/itineraries" />);

        const button = screen.getByTestId("button");
        expect(button).toBeInTheDocument();
    });

    it("back button has correct url", () => {
        render(<InnerTabHeader title="Title" backUrl="/itineraries" />);

        const button = screen.getByTestId("button");
        expect(button.getAttribute("data-to")).toBe("/itineraries");
    });

    it("back button has inline style", () => {
        render(<InnerTabHeader title="Title" backUrl="/back" />);

        const button = screen.getByTestId("button");
        expect(button.getAttribute("data-style")).toBe("inline");
    });

    it("back button has Volver label", () => {
        render(<InnerTabHeader title="Title" backUrl="/back" />);

        expect(screen.getByText("Volver")).toBeInTheDocument();
    });

    it("applies correct CSS class to header", () => {
        const { container } = render(
            <InnerTabHeader title="Title" backUrl="/back" />
        );

        const header = container.querySelector("header");
        expect(header?.className).toMatch(/header/);
    });

    it("applies correct CSS class to title", () => {
        render(<InnerTabHeader title="Title" backUrl="/back" />);

        const title = screen.getByText("Title");
        expect(title.className).toMatch(/title/);
    });

    it("renders with empty backUrl", () => {
        render(<InnerTabHeader title="Title" backUrl="" />);

        const button = screen.queryByTestId("button");
        expect(button).not.toBeInTheDocument();
    });

    it("renders title and button together", () => {
        render(<InnerTabHeader title="My Page" backUrl="/home" />);

        expect(screen.getByText("My Page")).toBeInTheDocument();
        expect(screen.getByText("Volver")).toBeInTheDocument();
    });

    it("handles long title text", () => {
        const longTitle =
            "This is a very long title that should still render correctly";
        render(<InnerTabHeader title={longTitle} backUrl="/back" />);

        expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles special characters in title", () => {
        render(
            <InnerTabHeader
                title="Title with & special <> chars"
                backUrl="/back"
            />
        );

        expect(
            screen.getByText(/Title with & special <> chars/)
        ).toBeInTheDocument();
    });
});
