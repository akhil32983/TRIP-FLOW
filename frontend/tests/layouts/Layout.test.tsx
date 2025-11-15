import Layout from "@/layouts/Layout";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Layout Component", () => {
  it("renders layout with header and footer by default", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const content = screen.getByText("Test Content");

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("renders layout without header and footer when single prop is true", () => {
    render(
      <Layout single>
        <div>Single Layout Content</div>
      </Layout>
    );

    const main = screen.getByRole("main");
    const content = screen.getByText("Single Layout Content");

    expect(main).toBeInTheDocument();
    expect(content).toBeInTheDocument();

    // Header should not be present
    const header = screen.queryByRole("banner");
    expect(header).not.toBeInTheDocument();

    // Footer should not be present
    const footer = screen.queryByRole("contentinfo");
    expect(footer).not.toBeInTheDocument();
  });

  it("renders children inside main element", () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Component</div>
      </Layout>
    );

    const main = screen.getByRole("main");
    const childContent = screen.getByTestId("child-content");

    expect(main).toContainElement(childContent);
  });

  it("applies correct CSS classes", () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    const layoutContainer = screen.getByRole("main").parentElement;
    const main = screen.getByRole("main");

    expect(layoutContainer?.className).toMatch(/layout/);
    expect(main.className).toMatch(/main/);
  });

  it("renders multiple children correctly", () => {
    render(
      <Layout>
        <div>First Child</div>
        <div>Second Child</div>
      </Layout>
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
  });
});
