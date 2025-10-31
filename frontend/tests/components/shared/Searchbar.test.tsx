import Searchbar from "@components/shared/Searchbar";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Searchbar Component", () => {
    let mockOnSearch: ReturnType<typeof vi.fn>;
    let mockOnInputChange: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockOnSearch = vi.fn();
        mockOnInputChange = vi.fn();
    });

    it("renders searchbar with placeholder", () => {
        render(
            <Searchbar
                placeHolder="Buscar..."
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
    });

    it("renders as form element", () => {
        const { container } = render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const form = container.querySelector("form");
        expect(form).toBeInTheDocument();
    });

    it("renders search input", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");
    });

    it("renders search button", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
    });

    it("input has correct id", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("id", "search-input");
    });

    it("calls onSearch when form is submitted", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const form = screen.getByRole("textbox").closest("form");
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onSearch when button is clicked", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onInputChange when user types", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test query" } });

        expect(mockOnInputChange).toHaveBeenCalledWith("test query");
        expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    });

    it("prevents default form submission", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

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
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "my search" } });

        expect(input.value).toBe("my search");
    });

    it("applies correct CSS class to form", () => {
        const { container } = render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const form = container.querySelector("form");
        expect(form?.className).toMatch(/searchbar/);
    });

    it("applies correct CSS class to input", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        expect(input.className).toMatch(/input/);
    });

    it("applies correct CSS class to button", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const button = screen.getByRole("button");
        expect(button.className).toMatch(/button/);
    });

    it("renders SearchIcon in button", () => {
        const { container } = render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const button = container.querySelector("button");
        const svg = button?.querySelector("svg");

        expect(svg).toBeInTheDocument();
    });

    it("handles multiple submissions", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const form = screen.getByRole("textbox").closest("form");

        fireEvent.submit(form!);
        fireEvent.submit(form!);

        expect(mockOnSearch).toHaveBeenCalledTimes(2);
    });

    it("calls onInputChange with special characters", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test@#$%^&*()" } });

        expect(mockOnInputChange).toHaveBeenCalledWith("test@#$%^&*()");
    });

    it("calls onInputChange with whitespace", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "  spaces  " } });

        expect(mockOnInputChange).toHaveBeenCalledWith("  spaces  ");
    });

    it("renders with different placeholders", () => {
        const { rerender } = render(
            <Searchbar
                placeHolder="Search here"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();

        rerender(
            <Searchbar
                placeHolder="Find something"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        expect(
            screen.getByPlaceholderText("Find something")
        ).toBeInTheDocument();
    });

    it("calls onInputChange multiple times as user types", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "h" } });
        fireEvent.change(input, { target: { value: "he" } });
        fireEvent.change(input, { target: { value: "hel" } });

        expect(mockOnInputChange).toHaveBeenCalledTimes(3);
        expect(mockOnInputChange).toHaveBeenNthCalledWith(1, "h");
        expect(mockOnInputChange).toHaveBeenNthCalledWith(2, "he");
        expect(mockOnInputChange).toHaveBeenNthCalledWith(3, "hel");
    });

    it("calls onInputChange with empty string", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        // First type something
        fireEvent.change(input, { target: { value: "test" } });

        // Then clear it
        fireEvent.change(input, { target: { value: "" } });

        expect(mockOnInputChange).toHaveBeenCalledWith("");
        expect(mockOnInputChange).toHaveBeenCalledTimes(2);
    });

    it("does not call onSearch when only typing without submitting", () => {
        render(
            <Searchbar
                placeHolder="Search"
                onSearch={mockOnSearch}
                onInputChange={mockOnInputChange}
            />
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test" } });

        expect(mockOnSearch).not.toHaveBeenCalled();
        expect(mockOnInputChange).toHaveBeenCalled();
    });
});
