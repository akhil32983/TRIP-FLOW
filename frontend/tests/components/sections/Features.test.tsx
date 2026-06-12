import Features from "@components/sections/Features";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Features", () => {
  it("renders section title correctly", () => {
    render(<Features />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Why TripFlow?");
    expect(heading.querySelector("strong")).toHaveTextContent("TripFlow");
  });

  it("renders all feature cards", () => {
    render(<Features />);

    // Check that all 3 features are rendered
    expect(screen.getByText("AI-Powered Itineraries")).toBeInTheDocument();
    expect(screen.getByText("Offline Access")).toBeInTheDocument();
    expect(screen.getByText("Optimized Routes")).toBeInTheDocument();
  });

  it("renders feature descriptions correctly", () => {
    render(<Features />);

    expect(
      screen.getByText(
        "TripFlow generates automatically customized travel itineraries based on your preferences, interests, and trip duration, so you can enjoy your journey to the fullest without worries."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Consult your itinerary at any time, even without an internet connection, so you always have your travel plan at hand."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Optimize the order of places to visit to save time and money, avoiding unnecessary travel and maximizing your experience."
      )
    ).toBeInTheDocument();
  });

  it("renders feature titles as h3 headings", () => {
    render(<Features />);

    const featureTitles = screen.getAllByRole("heading", { level: 3 });
    expect(featureTitles).toHaveLength(3);
    expect(featureTitles[0]).toHaveTextContent("AI-Powered Itineraries");
    expect(featureTitles[1]).toHaveTextContent("Offline Access");
    expect(featureTitles[2]).toHaveTextContent("Optimized Routes");
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Features />);

    const featuresContainer = container.querySelector("div");
    expect(featuresContainer?.className).toMatch(/featuresContainer/);

    const featureCards = container.querySelectorAll(
      "div[class*='featureCard']"
    );
    expect(featureCards).toHaveLength(3);

    const icons = container.querySelectorAll("svg[class*='icon']");
    expect(icons).toHaveLength(3);

    const featureTitles = container.querySelectorAll(
      "h3[class*='featureTitle']"
    );
    expect(featureTitles).toHaveLength(3);

    const featureDescriptions = container.querySelectorAll(
      "p[class*='featureDescription']"
    );
    expect(featureDescriptions).toHaveLength(3);
  });
});
