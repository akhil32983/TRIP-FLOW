import Faq from "@components/sections/Faq";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Faq", () => {
  it("renders section title correctly", () => {
    render(<Faq />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders correct number of FAQ items", () => {
    const { container } = render(<Faq />);

    // In the new Accordion, items are divs with class accordionItem
    // We can also count how many toggle buttons there are
    const faqButtons = screen.getAllByRole("button");
    const faqItems = container.querySelectorAll("div[class*='accordionItem']");
    
    expect(faqButtons).toHaveLength(5);
    expect(faqItems).toHaveLength(5);
  });

  it("renders FAQ structure correctly", () => {
    render(<Faq />);

    // Each accordion header is a button
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);

    // Each button should have aria-expanded attribute
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded");
    });
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Faq />);

    const faq = container.querySelector("div[class*='faq']");
    expect(faq).toBeInTheDocument();

    const faqItems = container.querySelectorAll("div[class*='accordionItem']");
    expect(faqItems).toHaveLength(5);

    const faqHeaders = container.querySelectorAll("button[class*='accordionHeader']");
    expect(faqHeaders).toHaveLength(5);

    const faqAnswers = container.querySelectorAll("p[class*='faqAnswer']");
    expect(faqAnswers).toHaveLength(5);
  });

  it("has first FAQ item open by default", () => {
    render(<Faq />);

    const buttons = screen.getAllByRole("button");
    
    // First item should be expanded (aria-expanded="true")
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    
    // Others should be closed (aria-expanded="false")
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[2]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[3]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[4]).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles FAQ item on click", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("each FAQ item has question and answer", () => {
    const { container } = render(<Faq />);

    const faqItems = container.querySelectorAll("div[class*='accordionItem']");

    faqItems.forEach((item) => {
      const question = item.querySelector("button[class*='accordionHeader']");
      const answer = item.querySelector("p[class*='faqAnswer']");

      expect(question).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
      expect(question?.textContent).toBeTruthy();
      expect(answer?.textContent).toBeTruthy();
    });
  });
});
