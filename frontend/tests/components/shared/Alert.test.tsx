import Alert from "@components/shared/Alert";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Alert Component", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("renders alert with message", () => {
        render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("renders alert with title and message", () => {
        render(<Alert isOpen={true} title="Test Title" message="Test message" onClose={() => {}} />);

        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
        render(<Alert isOpen={false} message="Test message" onClose={() => {}} />);

        expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });

    it("renders close button", () => {
        render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        const closeButton = screen.getByRole("button", { name: /cerrar alerta/i });
        expect(closeButton).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(<Alert isOpen={true} message="Test message" onClose={onClose} />);

        const closeButton = screen.getByRole("button", { name: /cerrar alerta/i });
        closeButton.click();

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("applies info type by default", () => {
        const { container } = render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        const alertElement = container.querySelector('[class*="alert"]');
        expect(alertElement?.className).toMatch(/info/);
    });

    it("applies success type class", () => {
        const { container } = render(<Alert isOpen={true} type="success" message="Success message" onClose={() => {}} />);

        const alertElement = container.querySelector('[class*="alert"]');
        expect(alertElement?.className).toMatch(/success/);
    });

    it("applies error type class", () => {
        const { container } = render(<Alert isOpen={true} type="error" message="Error message" onClose={() => {}} />);

        const alertElement = container.querySelector('[class*="alert"]');
        expect(alertElement?.className).toMatch(/error/);
    });

    it("applies warning type class", () => {
        const { container } = render(<Alert isOpen={true} type="warning" message="Warning message" onClose={() => {}} />);

        const alertElement = container.querySelector('[class*="alert"]');
        expect(alertElement?.className).toMatch(/warning/);
    });

    it("renders correct icon for success type", () => {
        render(<Alert isOpen={true} type="success" message="Success" onClose={() => {}} />);

        const icon = document.querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("renders correct icon for error type", () => {
        render(<Alert isOpen={true} type="error" message="Error" onClose={() => {}} />);

        const icon = document.querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("renders correct icon for warning type", () => {
        render(<Alert isOpen={true} type="warning" message="Warning" onClose={() => {}} />);

        const icon = document.querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("renders correct icon for info type", () => {
        render(<Alert isOpen={true} type="info" message="Info" onClose={() => {}} />);

        const icon = document.querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("auto-closes after default duration", () => {
        const onClose = vi.fn();
        render(<Alert isOpen={true} message="Test message" onClose={onClose} />);

        expect(onClose).not.toHaveBeenCalled();

        vi.advanceTimersByTime(3000);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("auto-closes after custom duration", () => {
        const onClose = vi.fn();
        render(
            <Alert 
                isOpen={true} 
                message="Test message" 
                onClose={onClose} 
                autoCloseDuration={5000}
            />
        );

        vi.advanceTimersByTime(3000);
        expect(onClose).not.toHaveBeenCalled();

        vi.advanceTimersByTime(2000);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not auto-close when autoClose is false", () => {
        const onClose = vi.fn();
        render(
            <Alert 
                isOpen={true} 
                message="Test message" 
                onClose={onClose} 
                autoClose={false}
            />
        );

        vi.advanceTimersByTime(5000);

        expect(onClose).not.toHaveBeenCalled();
    });

    it("renders overlay", () => {
        const { container } = render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        const overlay = container.querySelector('[class*="overlay"]');
        expect(overlay).toBeInTheDocument();
    });

    it("prevents event propagation on alert click", () => {
        const onClose = vi.fn();
        const { container } = render(<Alert isOpen={true} message="Test message" onClose={onClose} />);

        const alertElement = container.querySelector('[class*="alert"]');
        alertElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(onClose).not.toHaveBeenCalled();
    });

    it("renders title as h3 element", () => {
        render(<Alert isOpen={true} title="Test Title" message="Test message" onClose={() => {}} />);

        const title = screen.getByText("Test Title");
        expect(title.tagName).toBe("H3");
    });

    it("renders message as p element", () => {
        render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        const message = screen.getByText("Test message");
        expect(message.tagName).toBe("P");
    });

    it("does not render title when not provided", () => {
        render(<Alert isOpen={true} message="Test message" onClose={() => {}} />);

        const h3Elements = document.querySelectorAll("h3");
        expect(h3Elements.length).toBe(0);
    });

    it("cleans up timer on unmount", () => {
        const onClose = vi.fn();
        const { unmount } = render(
            <Alert isOpen={true} message="Test message" onClose={onClose} />
        );

        unmount();
        vi.advanceTimersByTime(3000);

        expect(onClose).not.toHaveBeenCalled();
    });

    it("resets timer when isOpen changes", () => {
        const onClose = vi.fn();
        const { rerender } = render(
            <Alert isOpen={true} message="Test message" onClose={onClose} />
        );

        vi.advanceTimersByTime(2000);

        rerender(<Alert isOpen={false} message="Test message" onClose={onClose} />);
        rerender(<Alert isOpen={true} message="Test message" onClose={onClose} />);

        vi.advanceTimersByTime(3000);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});