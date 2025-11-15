import DashboardPage from "@pages/Dashboard";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Mock dependencies used within DashboardPage
vi.mock("@/layouts/AppLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

vi.mock("@/components/dashboard/DashboardHeader", () => ({
  default: ({ title }: any) => (
    <header data-testid="dashboard-header">{title}</header>
  )
}));

vi.mock("@/components/dashboard/Stats", () => ({
  default: () => <section data-testid="stats" />
}));

vi.mock("@/components/dashboard/Recent", () => ({
  default: () => <section data-testid="recent" />
}));

vi.mock("@/components/shared/Button", () => ({
  default: () => <button data-testid="button" />
}));

describe("DashboardPage", () => {
  it("renders dashboard page", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
  });

  it("renders dashboard header", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
  });

  it("renders welcome message", () => {
    render(<DashboardPage />);

    expect(screen.getByText(/Bienvenido,/)).toBeInTheDocument();
  });

  it("renders Stats component", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("stats")).toBeInTheDocument();
  });

  it("renders Recent component", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("recent")).toBeInTheDocument();
  });

  it("renders all three main sections", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
    expect(screen.getByTestId("stats")).toBeInTheDocument();
    expect(screen.getByTestId("recent")).toBeInTheDocument();
  });

  it("wraps content in AppLayout", () => {
    const { container } = render(<DashboardPage />);

    const appLayout = container.querySelector('[data-testid="app-layout"]');
    expect(appLayout).toBeInTheDocument();
    expect(appLayout?.children.length).toBeGreaterThan(0);
  });
});