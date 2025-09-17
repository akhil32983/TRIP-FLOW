import Faq from "@components/sections/Faq";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Faq", () => {
  it("renders section title correctly", () => {
    render(<Faq />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders correct number of FAQ items", () => {
    const { container } = render(<Faq />);

    const faqItems = container.querySelectorAll("details");
    expect(faqItems).toHaveLength(4);
  });

  it("renders FAQ structure correctly", () => {
    const { container } = render(<Faq />);

    const detailsElements = screen.getAllByRole("group");
    expect(detailsElements).toHaveLength(4);

    const summaryElements = container.querySelectorAll("summary");
    expect(summaryElements).toHaveLength(4);
  });

  it("renders action button with correct link", () => {
    const { container } = render(<Faq />);

    const actionButton = container.querySelector("div[class*='faqActions'] a");
    expect(actionButton).toHaveAttribute("href", "/about");
  });

  it("has correct CSS structure", () => {
    const { container } = render(<Faq />);

    const faq = container.querySelector("div[class*='faq']");
    expect(faq).toBeInTheDocument();

    const faqItems = container.querySelectorAll("details[class*='faqItem']");
    expect(faqItems).toHaveLength(4);

    const faqQuestions = container.querySelectorAll(
      "summary[class*='faqQuestion']"
    );
    expect(faqQuestions).toHaveLength(4);

    const faqAnswers = container.querySelectorAll("p[class*='faqAnswer']");
    expect(faqAnswers).toHaveLength(4);

    const faqActions = container.querySelector("div[class*='faqActions']");
    expect(faqActions).toBeInTheDocument();
  });

  it("has first FAQ item open by default", () => {
    const { container } = render(<Faq />);

    const faqItems = container.querySelectorAll("details");
    expect(faqItems[0]).toHaveAttribute("open");
    expect(faqItems[1]).not.toHaveAttribute("open");
    expect(faqItems[2]).not.toHaveAttribute("open");
    expect(faqItems[3]).not.toHaveAttribute("open");
  });

  it("each FAQ item has question and answer", () => {
    const { container } = render(<Faq />);

    const faqItems = container.querySelectorAll("details[class*='faqItem']");

    faqItems.forEach((item) => {
      const question = item.querySelector("summary[class*='faqQuestion']");
      const answer = item.querySelector("p[class*='faqAnswer']");

      expect(question).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
      expect(question?.textContent).toBeTruthy();
      expect(answer?.textContent).toBeTruthy();
    });
  });
});
