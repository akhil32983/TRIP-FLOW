import AvatarUploader from "@components/form/AvatarUploader";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

import { API_BASE_URL } from "@/config/environment";

describe("AvatarUploader Component", () => {
    const mockOnFileSelect = vi.fn();

    beforeEach(() => {
        mockOnFileSelect.mockClear();
    });

    it("renders placeholder when no username or preview provided", () => {
        const { container } = render(<AvatarUploader onFileSelect={mockOnFileSelect} />);

        expect(screen.getByText("U")).toBeInTheDocument();

        const fileInput = container.querySelector('input[type="file"]');
        expect(fileInput).toBeInTheDocument();
    });

    it("renders user initial when username provided and image fails to load", () => {
        render(<AvatarUploader username="testUser" onFileSelect={mockOnFileSelect} />);

        const img = screen.getByRole("img", { name: /avatar/i });
        expect(img).toBeInTheDocument();
        fireEvent.error(img);

        expect(screen.getByText("T")).toBeInTheDocument();
    });

    it("renders preview image when preview provided", () => {
        const previewUrl = "blob:http://localhost:3000/test-blob";
        render(<AvatarUploader preview={previewUrl} onFileSelect={mockOnFileSelect} />);

        const img = screen.getByRole("img", { name: /avatar/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", previewUrl);
    });

    it("renders server avatar when username provided", () => {
        render(<AvatarUploader username="testUser" onFileSelect={mockOnFileSelect} />);

        const img = screen.getByRole("img", { name: /avatar/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", `${API_BASE_URL}/api/v1/users/testUser/avatar`);
    });

    it("triggers file input click when clicked", () => {
        const { container } = render(<AvatarUploader onFileSelect={mockOnFileSelect} />);

        const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
        const clickSpy = vi.spyOn(fileInput, 'click');

        const placeholder = screen.getByText("U");

        fireEvent.click(placeholder);

        expect(clickSpy).toHaveBeenCalled();
    });

    it("calls onFileSelect when a file is selected", () => {
        const { container } = render(<AvatarUploader onFileSelect={mockOnFileSelect} />);

        const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(mockOnFileSelect).toHaveBeenCalledWith(file);
    });
});
