import Notification from "@/components/shared/Notification";
import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

describe("Notification Component", () => {
    it("renders notification with message", () => {
        render(<Notification message="Test message" onClose={() => {}} />);
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("renders notification with title and message", () => {
        render(<Notification title="Test Title" message="Test message" onClose={() => {}} />);
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("renders close button", () => {
        render(<Notification message="Test message" onClose={() => {}} />);
        const closeButton = screen.getByRole("button", { name: /cerrar notificación/i });
        expect(closeButton).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(<Notification message="Test message" onClose={onClose} />);

        const closeButton = screen.getByRole("button", { name: /cerrar notificación/i });
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("applies info type by default", () => {
        const { container } = render(<Notification message="Test message" onClose={() => {}} />);
        const notificationElement = container.firstChild as HTMLElement;
        expect(notificationElement.className).toMatch(/info/);
    });

    it("applies success type class", () => {
        const { container } = render(<Notification type="success" message="Success message" onClose={() => {}} />);
        const notificationElement = container.firstChild as HTMLElement;
        expect(notificationElement.className).toMatch(/success/);
    });

    it("applies error type class", () => {
        const { container } = render(<Notification type="error" message="Error message" onClose={() => {}} />);
        const notificationElement = container.firstChild as HTMLElement;
        expect(notificationElement.className).toMatch(/error/);
    });

    it("applies warning type class", () => {
        const { container } = render(<Notification type="warning" message="Warning message" onClose={() => {}} />);
        const notificationElement = container.firstChild as HTMLElement;
        expect(notificationElement.className).toMatch(/warning/);
    });

    it("applies closing class when isClosing is true", () => {
        const { container } = render(<Notification message="Test message" onClose={() => {}} isClosing={true} />);
        const notificationElement = container.firstChild as HTMLElement;
        expect(notificationElement.className).toMatch(/closing/);
    });

    it("calls onExited when animation ends if isClosing is true", () => {
        const onExited = vi.fn();
        const { container } = render(
            <Notification message="Test message" onClose={() => {}} isClosing={true} onExited={onExited} />
        );

        const notificationElement = container.firstChild as HTMLElement;
        fireEvent.animationEnd(notificationElement);

        expect(onExited).toHaveBeenCalledTimes(1);
    });

    it("does not call onExited when animation ends if isClosing is false", () => {
        const onExited = vi.fn();
        const { container } = render(
            <Notification message="Test message" onClose={() => {}} isClosing={false} onExited={onExited} />
        );

        const notificationElement = container.firstChild as HTMLElement;
        fireEvent.animationEnd(notificationElement);

        expect(onExited).not.toHaveBeenCalled();
    });

    it("renders title as h3 element", () => {
        render(<Notification title="Test Title" message="Test message" onClose={() => {}} />);
        const title = screen.getByText("Test Title");
        expect(title.tagName).toBe("H3");
    });

    it("renders message as p element", () => {
        render(<Notification message="Test message" onClose={() => {}} />);
        const message = screen.getByText("Test message");
        expect(message.tagName).toBe("P");
    });

    it("does not render title when not provided", () => {
        render(<Notification message="Test message" onClose={() => {}} />);
        const h3Elements = document.querySelectorAll("h3");
        expect(h3Elements.length).toBe(0);
    });
});