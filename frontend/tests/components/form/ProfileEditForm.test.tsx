import ProfileEditForm from "@components/form/ProfileEditForm";

import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";

import * as authProvider from "@/providers/authProvider";
import * as notificationProvider from "@/providers/notificationProvider";
import * as userService from "@/services/userService";

// Mock URL.createObjectURL
beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
});

// Mock providers and hooks
vi.mock("@/providers/authProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: vi.fn(),
}));

vi.mock("@/providers/notificationProvider", () => ({
    NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useNotification: vi.fn(),
}));

vi.mock("@/services/userService", () => ({
    uploadAvatar: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("ProfileEditForm Component", () => {
    const mockUser = {
        name: "John Doe",
        username: "johndoe",
        description: "A traveler",
        location: "Madrid, Spain",
        roles: ["USER"],
    };

    const mockUpdateProfile = vi.fn();
    const mockNotify = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (authProvider.useAuth as any).mockReturnValue({
            user: mockUser,
            updateProfile: mockUpdateProfile,
        });

        (notificationProvider.useNotification as any).mockReturnValue({
            notify: mockNotify,
        });
    });

    it("renders form with user data", () => {
        render(<ProfileEditForm />);

        expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Madrid, Spain")).toBeInTheDocument();
        expect(screen.getByDisplayValue("A traveler")).toBeInTheDocument();
    });

    it("updates form fields", () => {
        render(<ProfileEditForm />);

        const nameInput = screen.getByLabelText("Nombre");
        fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
        expect(nameInput).toHaveValue("Jane Doe");

        const locationInput = screen.getByLabelText("Ubicación");
        fireEvent.change(locationInput, { target: { value: "Barcelona, Spain" } });
        expect(locationInput).toHaveValue("Barcelona, Spain");
    });

    it("handles form submission successfully", async () => {
        render(<ProfileEditForm />);

        const submitButton = screen.getByRole("button", { name: "Guardar" });
        fireEvent.click(submitButton);

        expect(mockUpdateProfile).toHaveBeenCalledWith({
            name: "John Doe",
            description: "A traveler",
            location: "Madrid, Spain",
        });

        await waitFor(() => {
            expect(mockNotify).toHaveBeenCalledWith(
                "Perfil actualizado correctamente",
                "success",
                expect.any(Object)
            );
            expect(mockNavigate).toHaveBeenCalledWith("/profile");
        });
    });

    it("handles form submission error", async () => {
        mockUpdateProfile.mockRejectedValue(new Error("Update failed"));

        render(<ProfileEditForm />);

        const submitButton = screen.getByRole("button", { name: "Guardar" });
        fireEvent.click(submitButton);

        expect(mockUpdateProfile).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockNotify).toHaveBeenCalledWith(
                "Error al actualizar el perfil",
                "error",
                expect.any(Object)
            );
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("uploads avatar when file is selected", () => {
        const { container } = render(<ProfileEditForm />);

        const file = new File(["avatar"], "avatar.png", { type: "image/png" });
        const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(userService.uploadAvatar).toHaveBeenCalledWith("johndoe", file);
    });

    it("does not render if user is null", () => {
        (authProvider.useAuth as any).mockReturnValue({
            user: null,
            updateProfile: mockUpdateProfile,
        });

        const { container } = render(<ProfileEditForm />);
        expect(container).toBeEmptyDOMElement();
    });
});
