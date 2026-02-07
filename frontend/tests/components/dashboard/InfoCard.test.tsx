import InfoCard from "@components/dashboard/InfoCard";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("InfoCard Component", () => {
  it("renders info card with all props", () => {
    render(<InfoCard icon="📊" title="Test Title" value={100} />);

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders icon as string", () => {
    render(<InfoCard icon="🎯" title="Target" value={50} />);

    expect(screen.getByText("🎯")).toBeInTheDocument();
  });

  it("renders icon as JSX element", () => {
    const Icon = <svg data-testid="custom-icon">Icon</svg>;
    render(<InfoCard icon={Icon} title="Custom Icon" value={25} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    render(<InfoCard icon="📈" title="Statistics" value={200} />);

    const title = screen.getByText(/Statistics/);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("P");
  });

  it("renders value as number", () => {
    render(<InfoCard icon="💰" title="Revenue" value={1500} />);

    expect(screen.getByText("1500")).toBeInTheDocument();
  });

  it("renders value as string", () => {
    render(<InfoCard icon="📍" title="Location" value="New York" />);

    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("renders value with units", () => {
    render(<InfoCard icon="🚗" title="Distance" value="250 km" />);

    expect(screen.getByText("250 km")).toBeInTheDocument();
  });

  it("applies correct CSS class to card container", () => {
    const { container } = render(<InfoCard icon="✨" title="Test" value={10} />);

    const card = container.querySelector("div");
    expect(card?.className).toMatch(/infoCard/);
  });

  it("applies correct CSS class to title", () => {
    render(<InfoCard icon="🌟" title="Title" value={42} />);

    const title = screen.getByText(/Title/);
    expect(title.className).toMatch(/title/);
  });

  it("applies correct CSS class to value", () => {
    render(<InfoCard icon="💎" title="Gems" value={99} />);

    const value = screen.getByText("99");
    expect(value.className).toMatch(/value/);
  });

  it("renders as div element", () => {
    const { container } = render(<InfoCard icon="🏠" title="Home" value={1} />);

    const card = container.firstChild;
    expect(card?.nodeName).toBe("DIV");
  });

  it("renders value as paragraph element", () => {
    render(<InfoCard icon="📝" title="Notes" value={5} />);

    const value = screen.getByText("5");
    expect(value.tagName).toBe("P");
  });

  it("handles zero value", () => {
    render(<InfoCard icon="⭐" title="Stars" value={0} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("handles negative value", () => {
    render(<InfoCard icon="📉" title="Decline" value={-10} />);

    expect(screen.getByText("-10")).toBeInTheDocument();
  });

  it("handles decimal value", () => {
    render(<InfoCard icon="💯" title="Score" value={98.5} />);

    expect(screen.getByText("98.5")).toBeInTheDocument();
  });

  it("handles empty string value", () => {
    const { container } = render(<InfoCard icon="📄" title="Empty" value="" />);

    const valueElement = container.querySelector("p");
    expect(valueElement).toBeInTheDocument();
    // Use textContent check instead of strict equality if there are multiple p tags
    const values = screen.getAllByText("", { selector: "p" });
    expect(values.length).toBeGreaterThan(0);
  });

  it("handles long title text", () => {
    const longTitle = "This is a very long title that might wrap to multiple lines";
    render(<InfoCard icon="📚" title={longTitle} value={42} />);

    expect(screen.getByText(new RegExp(longTitle))).toBeInTheDocument();
  });

  it("handles large numeric values", () => {
    render(<InfoCard icon="💸" title="Budget" value={1000000} />);

    expect(screen.getByText("1000000")).toBeInTheDocument();
  });

  it("handles special characters in title", () => {
    render(<InfoCard icon="🎭" title="Art & Design" value={15} />);

    expect(screen.getByText(/Art & Design/)).toBeInTheDocument();
  });

  it("renders correct HTML structure", () => {
    const { container } = render(<InfoCard icon="🎨" title="Art" value={20} />);

    const card = container.querySelector("div");
    const paragraphs = card?.querySelectorAll("p");
    const span = card?.querySelector("span");

    expect(card).toBeInTheDocument();
    expect(paragraphs).toHaveLength(2); // value and title
    expect(span).toBeInTheDocument(); // icon
  });
});