import Badge from "@components/shared/Badge";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Badge Component", () => {
    it("renders badge with title prop", () => {
        render(<Badge style="default" title="Test Badge" />);

        const badge = screen.getByText("Test Badge");
        expect(badge).toBeInTheDocument();
    });

    it("renders default title for ONGOING status when no title provided", () => {
        render(<Badge style="default" status="ONGOING" />);

        const badge = screen.getByText("En curso");
        expect(badge).toBeInTheDocument();
    });

    it("renders default title for DRAFT status when no title provided", () => {
        render(<Badge style="default" status="DRAFT" />);

        const badge = screen.getByText("Borrador");
        expect(badge).toBeInTheDocument();
    });

    it("renders default title for ACTIVE status when no title provided", () => {
        render(<Badge style="default" status="PLANNED" />);

        const badge = screen.getByText("Planeado");
        expect(badge).toBeInTheDocument();
    });

    it("renders default title for COMPLETED status when no title provided", () => {
        render(<Badge style="default" status="COMPLETED" />);

        const badge = screen.getByText("Completado");
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

    it("applies status class correctly for DRAFT", () => {
        render(<Badge style="default" status="DRAFT" />);

        const badge = screen.getByText("Borrador");
        expect(badge.className).toMatch(/draft/);
    });

    it("applies status class correctly for ACTIVE", () => {
        render(<Badge style="default" status="PLANNED" />);

        const badge = screen.getByText("Planeado");
        expect(badge.className).toMatch(/planned/);
    });

    it("applies status class correctly for ONGOING", () => {
        render(<Badge style="default" status="ONGOING" />);

        const badge = screen.getByText("En curso");
        expect(badge.className).toMatch(/ongoing/);
    });

    it("applies status class correctly for COMPLETED", () => {
        render(<Badge style="default" status="COMPLETED" />);

        const badge = screen.getByText("Completado");
        expect(badge.className).toMatch(/completed/);
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

    it("prioritizes title prop over status default title", () => {
        render(<Badge style="default" title="Custom Title" status="DRAFT" />);

        const badge = screen.getByText("Custom Title");
        expect(badge).toBeInTheDocument();
        expect(screen.queryByText("Borrador")).not.toBeInTheDocument();
    });

    it("renders with children and ignores status default title", () => {
        render(
            <Badge style="default" status="COMPLETED">
                <span>Custom Child</span>
            </Badge>
        );

        expect(screen.getByText("Custom Child")).toBeInTheDocument();
        expect(screen.queryByText("Completado")).not.toBeInTheDocument();
    });

    it("applies multiple classes correctly", () => {
        render(<Badge style="semi_thin" status="PLANNED" />);

        const badge = screen.getByText("Planeado");
        expect(badge.className).toMatch(/badge/);
        expect(badge.className).toMatch(/semi_thin/);
        expect(badge.className).toMatch(/planned/);
    });

    it("handles thin style variant", () => {
        render(<Badge style="thin" title="Thin Badge" status="DRAFT" />);

        const badge = screen.getByText("Thin Badge");
        expect(badge.className).toMatch(/thin/);
        expect(badge.className).toMatch(/draft/);
    });
});
