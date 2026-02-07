import AppLayout from "@/layouts/AppLayout";
import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock Sidebar component
vi.mock("@components/shared/Sidebar", () => ({
    default: ({ admin }: { admin?: boolean }) => (
        <div data-testid="sidebar">Sidebar {admin ? "(Admin)" : ""}</div>
    )
}));

describe("AppLayout Component", () => {
    it("renders children content", () => {
        render(
            <AppLayout>
                <div data-testid="content">Main Content</div>
            </AppLayout>
        );
        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByText("Main Content")).toBeInTheDocument();
    });

    it("renders sidebar", () => {
        render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>
        );
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    it("passes admin prop to sidebar", () => {
        render(
            <AppLayout admin={true}>
                <div>Content</div>
            </AppLayout>
        );
        expect(screen.getByText("Sidebar (Admin)")).toBeInTheDocument();
    });
});
