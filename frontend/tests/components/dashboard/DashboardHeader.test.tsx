import DashboardHeader from "@components/dashboard/DashboardHeader";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("DashboardHeader Component", () => {
  it("renders header with title as string", () => {
    render(
      <DashboardHeader
        title="Dashboard Title"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const title = screen.getByText("Dashboard Title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });

  it("renders header with title as JSX element", () => {
    render(
      <DashboardHeader
        title={<span>Custom JSX Title</span>}
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const title = screen.getByText("Custom JSX Title");
    expect(title).toBeInTheDocument();
  });

  it("renders header without title", () => {
    const { container } = render(
      <DashboardHeader
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toBe("");
  });

  it("renders responsiveRender content", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<button>Responsive Button</button>}
        defaultRender={<div>Default</div>}
      />
    );

    const responsiveButton = screen.getByText("Responsive Button");
    expect(responsiveButton).toBeInTheDocument();
  });

  it("renders defaultRender content", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<button>Default Button</button>}
      />
    );

    const defaultButton = screen.getByText("Default Button");
    expect(defaultButton).toBeInTheDocument();
  });

  it("renders both responsive and default content simultaneously", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive Content</div>}
        defaultRender={<div>Default Content</div>}
      />
    );

    expect(screen.getByText("Responsive Content")).toBeInTheDocument();
    expect(screen.getByText("Default Content")).toBeInTheDocument();
  });

  it("applies correct CSS classes to header", () => {
    const { container } = render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const header = container.querySelector("header");
    expect(header?.className).toMatch(/header/);
  });

  it("applies correct CSS classes to title", () => {
    render(
      <DashboardHeader
        title="Test Title"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const title = screen.getByText("Test Title");
    expect(title.className).toMatch(/title/);
  });

  it("applies correct CSS classes to responsive div", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div data-testid="responsive">Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const responsiveDiv = screen.getByTestId("responsive").parentElement;
    expect(responsiveDiv?.className).toMatch(/responsive/);
  });

  it("applies correct CSS classes to default div", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div data-testid="default">Default</div>}
      />
    );

    const defaultDiv = screen.getByTestId("default").parentElement;
    expect(defaultDiv?.className).toMatch(/default/);
  });

  it("renders complex JSX in responsiveRender", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        }
        defaultRender={<div>Default</div>}
      />
    );

    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });

  it("renders complex JSX in defaultRender", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive</div>}
        defaultRender={
          <nav>
            <a href="/home">Home</a>
            <a href="/profile">Profile</a>
          </nav>
        }
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders as semantic header element", () => {
    const { container } = render(
      <DashboardHeader
        title="Test"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    const header = container.querySelector("header");
    expect(header?.tagName).toBe("HEADER");
  });

  it("handles title with special characters", () => {
    render(
      <DashboardHeader
        title="Welcome to Dashboard! #1 @ 2024"
        responsiveRender={<div>Responsive</div>}
        defaultRender={<div>Default</div>}
      />
    );

    expect(screen.getByText("Welcome to Dashboard! #1 @ 2024")).toBeInTheDocument();
  });

  it("handles empty JSX elements in renders", () => {
    render(
      <DashboardHeader
        title="Test"
        responsiveRender={<></>}
        defaultRender={<></>}
      />
    );

    const title = screen.getByText("Test");
    expect(title).toBeInTheDocument();
  });
});