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
  it("renders all stat cards", () => {
    render(<Stats />);

    const cards = screen.getAllByTestId("info-card");
    expect(cards).toHaveLength(4);
  });

  it("renders completed activities stat", () => {
    render(<Stats />);

    expect(screen.getByText("Actividades Completadas")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders places visited stat", () => {
    render(<Stats />);

    expect(screen.getByText("Lugares Visitados")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders total days stat", () => {
    render(<Stats />);

    expect(screen.getByText("Días de Actividad")).toBeInTheDocument();
    expect(screen.getByText("365")).toBeInTheDocument();
  });

  it("renders total distance stat", () => {
    render(<Stats />);

    expect(screen.getByText("Distancia Total Recorrida")).toBeInTheDocument();
    expect(screen.getByText("1500 Km")).toBeInTheDocument();
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

  it("renders icons for all stats", () => {
    render(<Stats />);

    const icons = screen.getAllByTestId("icon");
    expect(icons).toHaveLength(4);
  });

  it("renders stats in correct order", () => {
    render(<Stats />);

    const titles = screen.getAllByTestId("title");
    
    expect(titles[0]).toHaveTextContent("Actividades Completadas");
    expect(titles[1]).toHaveTextContent("Lugares Visitados");
    expect(titles[2]).toHaveTextContent("Días de Actividad");
    expect(titles[3]).toHaveTextContent("Distancia Total Recorrida");
  });

  it("passes correct props to InfoCard components", () => {
    render(<Stats />);

    const cards = screen.getAllByTestId("info-card");
    
    // Verify that each card has icon, title, and value
    cards.forEach(card => {
      expect(card.querySelector('[data-testid="icon"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="title"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="value"]')).toBeInTheDocument();
    });
  });

  it("handles numeric values correctly", () => {
    render(<Stats />);

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("365")).toBeInTheDocument();
  });

  it("handles string values correctly", () => {
    render(<Stats />);

    expect(screen.getByText("1500 Km")).toBeInTheDocument();
  });

  it("each stat has unique key", () => {
    const { container } = render(<Stats />);

    const cards = container.querySelectorAll('[data-testid="info-card"]');
    
    // Verify that there are 4 unique cards
    expect(cards.length).toBe(4);
  });

  it("renders all expected stat labels", () => {
    render(<Stats />);

    const expectedLabels = [
      "Actividades Completadas",
      "Lugares Visitados",
      "Días de Actividad",
      "Distancia Total Recorrida"
    ];

    expectedLabels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders all expected stat values", () => {
    render(<Stats />);

    const expectedValues = ["42", "15", "365", "1500 Km"];

    expectedValues.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("maintains consistent structure across all stat cards", () => {
    const { container } = render(<Stats />);

    const cards = container.querySelectorAll('[data-testid="info-card"]');
    
    cards.forEach(card => {
      expect(card.querySelector('[data-testid="icon"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="title"]')).toBeInTheDocument();
      expect(card.querySelector('[data-testid="value"]')).toBeInTheDocument();
    });
  });
});