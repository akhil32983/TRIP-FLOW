import Recent from "@components/dashboard/Recent";

import { render, screen, within } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@components/shared/Button", () => ({
  default: ({ label, style }: { label: string; style: string[] }) => (
    <button data-testid="button" data-style={style.join(",")}>
      {label}
    </button>
  ),
}));

vi.mock("@components/shared/Badge", () => ({
  default: ({ status, style }: { status: string; style: string }) => (
    <span data-testid="badge" data-status={status} data-style={style}>
      {status}
    </span>
  ),
}));

vi.mock("@components/shared/ProgressBar", () => ({
  default: ({ progress }: { progress: number }) => (
    <div data-testid="progress-bar" data-progress={progress}>
      {progress}%
    </div>
  ),
}));

describe("Recent Component", () => {
  it("renders recent activities section", () => {
    const { container } = render(<Recent />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<Recent />);

    const title = screen.getByText("Actividades Recientes");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H2");
  });

  it('renders "Ver todas" button', () => {
    render(<Recent />);

    const button = screen.getByText("Ver todas");
    expect(button).toBeInTheDocument();
  });

  it("renders activity list", () => {
    const { container } = render(<Recent />);

    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
  });

  it("renders fake activity data", () => {
    render(<Recent />);

    expect(screen.getByText("París, Francia")).toBeInTheDocument();
    expect(screen.getByText("2024-06-15")).toBeInTheDocument();
  });

  it("renders activity with correct link", () => {
    render(<Recent />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/activities/1");
  });

  it("renders activity icon", () => {
    render(<Recent />);

    const icon = screen.getByText("🗾");
    expect(icon).toBeInTheDocument();
  });

  it("renders activity place as h3", () => {
    render(<Recent />);

    const place = screen.getByText("París, Francia");
    expect(place.tagName).toBe("H3");
  });

  it("renders activity date as paragraph", () => {
    render(<Recent />);

    const date = screen.getByText("2024-06-15");
    expect(date.tagName).toBe("P");
  });

  it("renders Badge component with correct status", () => {
    render(<Recent />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("data-status", "ONGOING");
    expect(badge).toHaveAttribute("data-style", "thin");
  });

  it("renders ProgressBar component with correct progress", () => {
    render(<Recent />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveAttribute("data-progress", "75");
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<Recent />);

    const section = container.querySelector("section");
    expect(section?.className).toMatch(/recent/);
  });

  it("applies correct CSS classes to header", () => {
    const { container } = render(<Recent />);

    const header = container.querySelector('[class*="header"]');
    expect(header).toBeInTheDocument();
  });

  it("applies correct CSS classes to title", () => {
    render(<Recent />);

    const title = screen.getByText("Actividades Recientes");
    expect(title.className).toMatch(/title/);
  });

  it("applies correct CSS classes to activities list", () => {
    const { container } = render(<Recent />);

    const list = container.querySelector("ul");
    expect(list?.className).toMatch(/activities/);
  });

  it("applies custom CSS variable to activity link", () => {
    const { container } = render(<Recent />);

    const link = container.querySelector("a");
    const style = link?.getAttribute("style");
    expect(style).toContain("--index");
  });

  it("renders activity with all child elements", () => {
    const { container } = render(<Recent />);

    const activity = container.querySelector("li");
    
    expect(activity?.querySelector("a")).toBeInTheDocument();
    expect(activity?.querySelector('[class*="details"]')).toBeInTheDocument();
    expect(activity?.querySelector('[class*="icon"]')).toBeInTheDocument();
    expect(activity?.querySelector('[class*="text"]')).toBeInTheDocument();
    expect(activity?.querySelector('[class*="progressBar"]')).toBeInTheDocument();
  });

  it("renders NavLink component", () => {
    render(<Recent />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders as semantic section element", () => {
    const { container } = render(<Recent />);

    const section = container.querySelector("section");
    expect(section?.tagName).toBe("SECTION");
  });

  it("renders list items with correct keys", () => {
    const { container } = render(<Recent />);

    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("button has secondary style", () => {
    render(<Recent />);

    const button = screen.getByTestId("button");
    expect(button).toHaveAttribute("data-style", "secondary");
  });

  it("renders activity details section", () => {
    const { container } = render(<Recent />);

    const details = container.querySelector('[class*="details"]');
    expect(details).toBeInTheDocument();
  });

  it("renders activity progress section", () => {
    const { container } = render(<Recent />);

    const progressSection = container.querySelector('[class*="progressBar"]');
    expect(progressSection).toBeInTheDocument();
  });

  it("activity link contains all required information", () => {
    const { container } = render(<Recent />);

    const link = container.querySelector("a");
    const linkContent = link?.textContent;

    expect(linkContent).toContain("París, Francia");
    expect(linkContent).toContain("2024-06-15");
  });

  it("renders header with title and button", () => {
    const { container } = render(<Recent />);

    const header = container.querySelector('[class*="header"]');
    
    expect(within(header as HTMLElement).getByText("Actividades Recientes")).toBeInTheDocument();
    expect(within(header as HTMLElement).getByText("Ver todas")).toBeInTheDocument();
  });
});