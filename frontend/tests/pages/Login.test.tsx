import Login from "@pages/Login";
import { render, screen, fireEvent, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the auth provider's useAuth hook
vi.mock("@/providers/authProvider", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("@/providers/authProvider")
  >();
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

// Import the mocked functions after mocking
import { useAuth } from "@/providers/authProvider";
import { useNavigate } from "react-router";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

// Mock user data that matches PublicUser type
const mockUser = {
  id: "1",
  username: "existinguser",
  name: "Test User",
  description: "Test description",
  location: "Test location",
  createdAt: "2024-01-01T00:00:00Z",
  role: "USER" as const,
};

describe("Login Page Validation", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockNavigate.mockClear();

    // Setup mocks
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      errors: null,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders login form with correct fields", () => {
    render(<Login />);

    expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar sesión" })
    ).toBeInTheDocument();
  });

  it("shows validation error for empty username", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for empty password", async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace-only username", async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    fireEvent.change(usernameInput, { target: { value: "   " } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace-only password", async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "   " } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation errors for both empty fields", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login with valid credentials", async () => {
    mockLogin.mockResolvedValue({ success: true });

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "validpassword" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "validpassword",
      });
    });
  });

  it("navigates to dashboard on successful login", async () => {
    mockLogin.mockResolvedValue({ success: true });

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "validpassword" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("displays server errors on login failure", async () => {
    mockLogin.mockResolvedValue({
      success: false,
      errors: {
        global: "Credenciales inválidas",
      },
    });

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("displays specific field errors from server", async () => {
    mockLogin.mockResolvedValue({
      success: false,
      errors: {
        username: "Usuario no encontrado",
        password: "Contraseña incorrecta",
      },
    });

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "nonexistent" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Usuario no encontrado")).toBeInTheDocument();
      expect(screen.getByText("Contraseña incorrecta")).toBeInTheDocument();
    });
  });

  it("clears previous errors when resubmitting valid form", async () => {
    // First submission with errors
    mockLogin.mockResolvedValueOnce({
      success: false,
      errors: {
        global: "Error del servidor",
      },
    });

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error del servidor")).toBeInTheDocument();
    });

    // Second submission with success
    mockLogin.mockResolvedValueOnce({ success: true });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Error del servidor")).not.toBeInTheDocument();
    });
  });

  it("renders signup alternative link", () => {
    render(<Login />);

    expect(screen.getByText("¿No tienes una cuenta?")).toBeInTheDocument();

    const signupLink = screen.getByRole("link", { name: "Regístrate aquí" });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  it("handles login with special characters in username (edge case)", async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "user@test" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    // Should not show validation error for simple validation (login uses simple=true)
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "user@test",
        password: "password",
      });
    });
  });

  it("handles very long username (edge case)", async () => {
    const longUsername = "a".repeat(100);

    render(<Login />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: longUsername } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    // Should still work with simple validation
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: longUsername,
        password: "password",
      });
    });
  });

  it("redirects to home if user is already logged in", () => {
    // Mock user being logged in for this specific test
    vi.mocked(useAuth).mockReturnValueOnce({
      user: mockUser,
      errors: null,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(<Login />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
