import Section from "@components/shared/Section";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Section", () => {
  it("renders title and children correctly", () => {
    render(
      <Section title="Test Title">
        <p>Test content</p>
      </Section>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Title"
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders with ReactNode title", () => {
    render(
      <Section title={<span>Complex Title</span>}>
        <div>Content</div>
      </Section>
    );

    expect(screen.getByText("Complex Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(
      <Section title="Title">
        <p>Content</p>
      </Section>
    );

    const section = screen.getByLabelText("Title");
    const heading = screen.getByRole("heading", { level: 2 });

    expect(section.className).toMatch(/section/);
    expect(heading.className).toMatch(/title/);
  });

  it("renders multiple children", () => {
    render(
      <Section title="Title">
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <button>Click me</button>
      </Section>
    );

    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });
});
