import Stats from "@components/dashboard/Stats";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

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

describe("Stats Component", () => {
  it("renders stat cards", () => {
    render(<Stats />);

    const cards = screen.getAllByTestId("info-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("applies correct CSS class to stats section", () => {
    const { container } = render(<Stats />);

    const section = container.querySelector("section");
    expect(section?.className).toMatch(/stats/);
  });

  it("renders as semantic section element", () => {
    const { container } = render(<Stats />);

    const section = container.querySelector("section");
    expect(section?.tagName).toBe("SECTION");
  });

  it("renders icons for stats", () => {
    render(<Stats />);

    const icons = screen.getAllByTestId("icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("each stat card has icon, title, and value", () => {
    render(<Stats />);

    const cards = screen.getAllByTestId("info-card");
    
    cards.forEach(card => {
      expect(card.querySelector('[data-testid="icon"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="title"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="value"]')).toBeInTheDocument();
    });
  });

  it("passes props to InfoCard components", () => {
    render(<Stats />);

    const cards = screen.getAllByTestId("info-card");
    const titles = screen.getAllByTestId("title");
    const values = screen.getAllByTestId("value");
    
    expect(cards.length).toBe(titles.length);
    expect(cards.length).toBe(values.length);
  });

  it("renders expected stat labels", () => {
    render(<Stats />);

    expect(screen.getByText("Actividades")).toBeInTheDocument();
    expect(screen.getByText("Lugares Visitados")).toBeInTheDocument();
    expect(screen.getByText("Días de Actividad")).toBeInTheDocument();
  });
});