import Guide from "@components/sections/Guide";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Guide", () => {
  it("renders section with correct structure", () => {
    render(<Guide />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.querySelector("strong")).toBeInTheDocument();
  });

  it("renders introduction content", () => {
    const { container } = render(<Guide />);

    const paragraphs = container.querySelectorAll("p[class*='p']");
    expect(paragraphs).toHaveLength(2);

    paragraphs.forEach((paragraph) => {
      expect(paragraph.textContent).toBeTruthy();
    });
  });

  it("renders subtitle and installation steps", () => {
    render(<Guide />);

    const subtitle = screen.getByRole("heading", { level: 3 });
    expect(subtitle).toBeInTheDocument();

    const orderedList = screen.getByRole("list");
    expect(orderedList.tagName).toBe("OL");

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(4);

    listItems.forEach((item) => {
      expect(item.textContent).toBeTruthy();
    });
  });

  it("renders guide image with correct attributes", () => {
    const { container } = render(<Guide />);

    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image).toHaveAttribute("alt");
    expect(image?.getAttribute("src")).toContain(".webp");
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Guide />);

    const guide = container.querySelector("div[class*='guide']");
    expect(guide).toBeInTheDocument();

    const content = container.querySelector("div[class*='content']");
    expect(content).toBeInTheDocument();

    const guideImage = container.querySelector("div[class*='guideImage']");
    expect(guideImage).toBeInTheDocument();

    const imageContainer = container.querySelector(
      "div[class*='imageContainer']"
    );
    expect(imageContainer).toBeInTheDocument();

    const image = container.querySelector("img[class*='image']");
    expect(image).toBeInTheDocument();

    const paragraphs = container.querySelectorAll("p[class*='p']");
    expect(paragraphs).toHaveLength(2);

    const subtitle = container.querySelector("h3[class*='subtitle']");
    expect(subtitle).toBeInTheDocument();

    const textItems = container.querySelectorAll("li[class*='text']");
    expect(textItems).toHaveLength(4);
  });

  it("has emphasized text in content", () => {
    const { container } = render(<Guide />);

    const strongElements = container.querySelectorAll("strong");
    expect(strongElements.length).toBeGreaterThan(0);

    strongElements.forEach((element) => {
      expect(element.textContent).toBeTruthy();
    });
  });

  it("content has proper semantic structure", () => {
    const { container } = render(<Guide />);

    // Check that content is properly structured
    const content = container.querySelector("div[class*='content']");
    const orderedList = content?.querySelector("ol");
    const listItems = orderedList?.querySelectorAll("li");

    expect(orderedList).toBeInTheDocument();
    expect(listItems).toHaveLength(4);
  });
});
