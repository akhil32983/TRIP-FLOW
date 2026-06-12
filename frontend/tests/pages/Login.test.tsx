import Login from "@pages/Login";
import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock auth provider
vi.mock("@/providers/authProvider", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/providers/authProvider")>();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

// Mock router
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

import { useAuth } from "@/providers/authProvider";
import { useNavigate } from "react-router";

const mockLogin = vi.fn();
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

describe("Login Page Validation", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockNavigate.mockClear();

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      errors: null,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
      updateProfile: vi.fn(),
      verify: vi.fn(),
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders login form with correct fields", () => {
    render(<Login />);

    expect(screen.getByLabelText(/username \/ email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });

  it("shows validation error for empty username", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for empty password", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username \/ email/i), {
      target: { value: "testuser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace username", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username \/ email/i), {
      target: { value: "   " },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace password", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username \/ email/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "   " },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login with valid credentials", async () => {
    mockLogin.mockResolvedValue({ success: true });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username \/ email/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
    });
  });

  it("shows server error", async () => {
    mockLogin.mockResolvedValue({
      success: false,
      errors: { global: "Invalid credentials" },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username \/ email/i), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders register link", () => {
    render(<Login />);

    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("redirects when user is already logged in", () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      user: mockUser,
      errors: null,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
      updateProfile: vi.fn(),
      verify: vi.fn(),
    });

    render(<Login />);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});