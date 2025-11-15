import Stats from "@components/dashboard/Stats";

import { render, screen, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as statsService from "@services/statsService";

// StatsService module mock
vi.mock("@services/statsService");

// InfoCard mock
vi.mock("@components/dashboard/InfoCard", () => ({
  default: ({ icon, title, value }: { icon: React.JSX.Element; title: string; value: number | string }) => (
    <div data-testid="info-card">
      <div data-testid="icon">{icon}</div>
      <div data-testid="title">{title}</div>
      <div data-testid="value">{value}</div>
    </div>
  ),
}));

const mockStats = {
  stats: [
    { key: "activities" as const, value: 10 },
    { key: "places_visited" as const, value: 5 },
    { key: "total_days" as const, value: 30 }
  ]
};

describe("Stats Component", () => {
  beforeEach(() => {
    vi.mocked(statsService.getUserStats).mockResolvedValue(mockStats);
  });

  it("renders stat cards after loading", async () => {
    render(<Stats />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("info-card");
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  it("applies correct CSS class to stats section", async () => {
    const { container } = render(<Stats />);

    await waitFor(() => {
      const section = container.querySelector("section");
      expect(section?.className).toMatch(/stats/);
    });
  });

  it("renders as semantic section element", async () => {
    const { container } = render(<Stats />);

    await waitFor(() => {
      const section = container.querySelector("section");
      expect(section?.tagName).toBe("SECTION");
    });
  });

  it("renders icons for stats", async () => {
    render(<Stats />);

    await waitFor(() => {
      const icons = screen.getAllByTestId("icon");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  it("each stat card has icon, title, and value", async () => {
    render(<Stats />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("info-card");
      
      cards.forEach(card => {
        expect(card.querySelector('[data-testid="icon"]')).toBeInTheDocument();
        expect(card.querySelector('[data-testid="title"]')).toBeInTheDocument();
        expect(card.querySelector('[data-testid="value"]')).toBeInTheDocument();
      });
    });
  });

  it("passes props to InfoCard components", async () => {
    render(<Stats />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("info-card");
      const titles = screen.getAllByTestId("title");
      const values = screen.getAllByTestId("value");
      
      expect(cards.length).toBe(titles.length);
      expect(cards.length).toBe(values.length);
    });
  });

  it("renders expected stat labels", async () => {
    render(<Stats />);

    await waitFor(() => {
      expect(screen.getByText("Actividades")).toBeInTheDocument();
      expect(screen.getByText("Lugares Visitados")).toBeInTheDocument();
      expect(screen.getByText("Días de Actividad")).toBeInTheDocument();
    });
  });
});