import ProgressBar from "@components/shared/ProgressBar";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("ProgressBar Component", () => {
    it("renders progress bar with default props", () => {
        const { container } = render(<ProgressBar progress={50} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement).toBeInTheDocument();
        expect(progressElement?.getAttribute("value")).toBe("50");
        expect(progressElement?.getAttribute("max")).toBe("100");
    });

    it("displays percentage text when showPercentage is true (default)", () => {
        render(<ProgressBar progress={75} />);

        const percentage = screen.getByText("75%");
        expect(percentage).toBeInTheDocument();
    });

    it("hides percentage text when showPercentage is false", () => {
        render(<ProgressBar progress={75} showPercentage={false} />);

        expect(screen.queryByText("75%")).not.toBeInTheDocument();
    });

    it("clamps progress value to 0 when negative", () => {
        const { container } = render(<ProgressBar progress={-10} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("0");
        expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("clamps progress value to 100 when exceeds maximum", () => {
        const { container } = render(<ProgressBar progress={150} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("100");
        expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("handles progress value of 0", () => {
        const { container } = render(<ProgressBar progress={0} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("0");
        expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("handles progress value of 100", () => {
        const { container } = render(<ProgressBar progress={100} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("100");
        expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("applies full width style when fullWidth is true", () => {
        const { container } = render(
            <ProgressBar progress={50} fullWidth={true} />
        );

        const progressBarDiv = container.querySelector("div");
        const progressElement = container.querySelector("progress");

        expect(progressBarDiv?.style.width).toBe("100%");
        expect(progressElement?.style.width).toBe("100%");
    });

    it("does not apply full width style when fullWidth is false (default)", () => {
        const { container } = render(
            <ProgressBar progress={50} fullWidth={false} />
        );

        const progressBarDiv = container.querySelector("div");
        const progressElement = container.querySelector("progress");

        expect(progressBarDiv?.style.width).not.toBe("100%");
        expect(progressElement?.style.width).not.toBe("100%");
    });

    it("renders with decimal progress values", () => {
        const { container } = render(<ProgressBar progress={33.33} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("33.33");
        expect(screen.getByText("33.33%")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
        const { container } = render(<ProgressBar progress={50} />);

        const progressBarDiv = container.querySelector("div");
        const progressElement = container.querySelector("progress");
        const percentageSpan = screen.getByText("50%");

        expect(progressBarDiv?.className).toMatch(/progressBar/);
        expect(progressElement?.className).toMatch(/progress/);
        expect(percentageSpan.className).toMatch(/percentage/);
    });

    it("renders progress element with correct structure", () => {
        const { container } = render(<ProgressBar progress={60} />);

        const progressBarDiv = container.querySelector("div");
        const progressElement = progressBarDiv?.querySelector("progress");
        const percentageSpan = progressBarDiv?.querySelector("span");

        expect(progressBarDiv).toBeInTheDocument();
        expect(progressElement).toBeInTheDocument();
        expect(percentageSpan).toBeInTheDocument();
    });

    it("handles combined props correctly", () => {
        const { container } = render(
            <ProgressBar progress={85} showPercentage={true} fullWidth={true} />
        );

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("85");
        expect(screen.getByText("85%")).toBeInTheDocument();
        expect(progressElement?.style.width).toBe("100%");
    });

    it("updates progress value when prop changes", () => {
        const { container, rerender } = render(<ProgressBar progress={25} />);

        let progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("25");
        expect(screen.getByText("25%")).toBeInTheDocument();

        rerender(<ProgressBar progress={75} />);

        progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("value")).toBe("75");
        expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("maintains max attribute as 100", () => {
        const { container } = render(<ProgressBar progress={45} />);

        const progressElement = container.querySelector("progress");
        expect(progressElement?.getAttribute("max")).toBe("100");
    });
});
