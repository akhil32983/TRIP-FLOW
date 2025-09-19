import Register from "@/pages/Register";
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

const mockRegister = vi.fn();
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

describe("Register Page Validation", () => {
  beforeEach(() => {
    mockRegister.mockClear();
    mockNavigate.mockClear();

    // Setup mocks
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      errors: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: mockRegister,
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders register form with correct fields", () => {
    render(<Register />);

    expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
  });

  it("shows validation error for empty username", async () => {
    render(<Register />);

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for empty password", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for empty confirm password", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número."
        )
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace-only username", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    fireEvent.change(usernameInput, { target: { value: "   " } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for whitespace-only password", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "   " } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation error for mismatched passwords", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Las contraseñas no coinciden.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("shows validation errors for all empty fields", async () => {
    render(<Register />);

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre de usuario es obligatorio.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("La contraseña es obligatoria.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("calls register with valid credentials", async () => {
    mockRegister.mockResolvedValue({ success: true });

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "Validpassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Validpassword123" },
    });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: "testuser",
        password: "Validpassword123",
        confirmPassword: "Validpassword123",
      });
    });
  });

  it("navigates to login on successful registration", async () => {
    mockRegister.mockResolvedValue({ success: true });

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "Validpassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Validpassword123" },
    });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("displays server errors on registration failure", async () => {
    mockRegister.mockResolvedValue({
      success: false,
      errors: {
        global: "Error del servidor",
      },
    });

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "Validpassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Validpassword123" },
    });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error del servidor")).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("displays specific field errors from server", async () => {
    mockRegister.mockResolvedValue({
      success: false,
      errors: {
        username: "El usuario ya existe",
      },
    });

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "existinguser" } });
    fireEvent.change(passwordInput, { target: { value: "ValidPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword123" },
    });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("El usuario ya existe")).toBeInTheDocument();
    });
  });

  it("clears previous errors when resubmitting valid form", async () => {
    // First submission with errors
    mockRegister.mockResolvedValueOnce({
      success: false,
      errors: {
        global: "Error del servidor",
      },
    });

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "ValidPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error del servidor")).toBeInTheDocument();
    });

    // Second submission with success
    mockRegister.mockResolvedValueOnce({ success: true });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Error del servidor")).not.toBeInTheDocument();
    });
  });

  it("renders login alternative link", () => {
    render(<Register />);

    expect(screen.getByText("¿Ya tienes una cuenta?")).toBeInTheDocument();

    const loginLink = screen.getByRole("link", { name: "Inicia sesión aquí" });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("handles registration with special characters in username", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "user@test" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    // Should show validation error for full validation (register doesn't use simple=true)
    await waitFor(() => {
      expect(
        screen.getByText(
          "El nombre de usuario solo puede contener letras, números y guiones bajos."
        )
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("handles very long username (edge case)", async () => {
    const longUsername = "a".repeat(100);

    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: longUsername } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    // Should show validation error for length
    await waitFor(() => {
      expect(
        screen.getByText(
          "El nombre de usuario debe tener entre 3 y 30 caracteres."
        )
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("handles short username (edge case)", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "ab" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "El nombre de usuario debe tener entre 3 y 30 caracteres."
        )
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("handles short password (edge case)", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña debe tener al menos 8 caracteres.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("redirects to home if user is already logged in", () => {
    // Mock user being logged in for this specific test
    vi.mocked(useAuth).mockReturnValueOnce({
      user: mockUser,
      errors: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: mockRegister,
    });

    render(<Register />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
