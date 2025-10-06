import Searchbar from "@components/shared/Searchbar";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

describe("Searchbar Component", () => {
    it("renders searchbar with placeholder", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Buscar..." onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
    });

    it("renders as form element", () => {
        const mockOnSearch = vi.fn();
        const { container } = render(
            <Searchbar placeHolder="Search" onSearch={mockOnSearch} />
        );

        const form = container.querySelector("form");
        expect(form).toBeInTheDocument();
    });

    it("renders search input", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");
    });

    it("renders search button", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
    });

    it("input has correct id", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("id", "search-input");
    });

    it("calls onSearch when form is submitted", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        const form = screen.getByRole("textbox").closest("form");

        fireEvent.change(input, { target: { value: "test query" } });
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledWith("test query");
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onSearch when button is clicked", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button");

        fireEvent.change(input, { target: { value: "button click test" } });
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledWith("button click test");
    });

    it("calls onSearch with empty string if input is empty", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const form = screen.getByRole("textbox").closest("form");
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledWith("");
    });

    it("prevents default form submission", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const form = screen.getByRole("textbox").closest("form");
        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        const preventDefaultSpy = vi.spyOn(submitEvent, "preventDefault");

        form?.dispatchEvent(submitEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("allows user to type in input", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "my search" } });

        expect(input.value).toBe("my search");
    });

    it("applies correct CSS class to form", () => {
        const mockOnSearch = vi.fn();
        const { container } = render(
            <Searchbar placeHolder="Search" onSearch={mockOnSearch} />
        );

        const form = container.querySelector("form");
        expect(form?.className).toMatch(/searchbar/);
    });

    it("applies correct CSS class to input", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        expect(input.className).toMatch(/input/);
    });

    it("applies correct CSS class to button", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/button/);
    });

    it("renders SearchIcon in button", () => {
        const mockOnSearch = vi.fn();
        const { container } = render(
            <Searchbar placeHolder="Search" onSearch={mockOnSearch} />
        );

        const button = container.querySelector("button");
        const svg = button?.querySelector("svg");

        expect(svg).toBeInTheDocument();
    });

    it("handles multiple submissions", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "first search" } });
        fireEvent.submit(form!);

        fireEvent.change(input, { target: { value: "second search" } });
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledTimes(2);
        expect(mockOnSearch).toHaveBeenNthCalledWith(1, "first search");
        expect(mockOnSearch).toHaveBeenNthCalledWith(2, "second search");
    });

    it("handles special characters in search", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "test@#$%^&*()" } });
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledWith("test@#$%^&*()");
    });

    it("trims whitespace from search query", () => {
        const mockOnSearch = vi.fn();
        render(<Searchbar placeHolder="Search" onSearch={mockOnSearch} />);

        const input = screen.getByRole("textbox");
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "  spaces  " } });
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledWith("  spaces  ");
    });

    it("renders with different placeholders", () => {
        const mockOnSearch = vi.fn();
        const { rerender } = render(
            <Searchbar placeHolder="Search here" onSearch={mockOnSearch} />
        );

        expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();

        rerender(
            <Searchbar placeHolder="Find something" onSearch={mockOnSearch} />
        );

        expect(
            screen.getByPlaceholderText("Find something")
        ).toBeInTheDocument();
    });
});
