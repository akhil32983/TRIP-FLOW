import Register from "@/pages/Register";
import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the auth provider's useAuth hook
vi.mock("@/providers/authProvider", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/providers/authProvider")>();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

// Mock react-router's useNavigate
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

import { useAuth } from "@/providers/authProvider";
import { useNavigate } from "react-router";

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

const mockUser = {
  id: "1",
  username: "existinguser",
  name: "Test User",
  description: "Test description",
  location: "Test location",
  createdAt: "2024-01-01T00:00:00Z",
  role: "USER" as const,
  plan: "FREE" as const,
  notificationsAllowed: true,
};

describe("Register Page Validation", () => {
  beforeEach(() => {
    mockRegister.mockClear();
    mockNavigate.mockClear();

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      errors: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: mockRegister,
      updateProfile: vi.fn(),
      verify: vi.fn(),
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders register form with correct fields", () => {
    render(<Register />);

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("shows validation error for empty username", async () => {
    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for empty password", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for empty confirm password", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number."
        )
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for mismatched passwords", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: "Password123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows server error", async () => {
    mockRegister.mockResolvedValue({
      success: false,
      errors: {
        global: "Server error",
      },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: "Password123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders login link", () => {
    render(<Register />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects if user already logged in", () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      user: mockUser,
      errors: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: mockRegister,
      updateProfile: vi.fn(),
      verify: vi.fn(),
    });

    render(<Register />);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});