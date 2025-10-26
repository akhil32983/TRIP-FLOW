import { createContext, useContext, useState, type ReactNode } from "react";

import type { LoginRequest, RegisterRequest } from "@/types/auth";
import type { PublicUser } from "@/types/user";

import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/services/authService";

import {
  removeFromLocalStorage,
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorageUtils";

export const AUTH_LOCAL_STORAGE_KEY = "user";

type AuthResult = {
  success: boolean;
  errors?: Record<string, string>;
};

type AuthContextType = {
  user: PublicUser | null;
  errors: Record<string, string> | null;
  login: (req: LoginRequest) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  register: (req: RegisterRequest) => Promise<AuthResult>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedUser =
    retrieveFromLocalStorage<PublicUser>(AUTH_LOCAL_STORAGE_KEY) || null;
  const [user, setUser] = useState<PublicUser | null>(storedUser);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  /**
   * Handles user login by calling the login service.
   * If successful, updates the user state and saves the user to local storage.
   *
   * @param req - The login request containing username and password.
   * @return A promise that resolves to an AuthResult indicating success or failure.
   */
  const login = async (req: LoginRequest): Promise<AuthResult> => {
    const res = await loginService(req);

    if (res.status === "SUCCESS") {
      setUser(res.user);
      saveToLocalStorage(AUTH_LOCAL_STORAGE_KEY, res.user);
      return { success: true };
    } else {
      // Transform error messages to a more user-friendly format
      const error: Record<string, string> =
        res.message === "Bad credentials"
          ? { password: "Contraseña incorrecta" }
          : { global: res.message ?? "Ha ocurrido un error desconocido" };
      setErrors(error);

      removeFromLocalStorage(AUTH_LOCAL_STORAGE_KEY);
      return { success: false, errors: error };
    }
  };

  /**
   * Handles user logout by calling the logout service.
   * If successful, clears the user state and removes the user from local storage.
   *
   * @return A promise that resolves to an AuthResult indicating success or failure.
   */
  const logout = async (): Promise<AuthResult> => {
    setUser(null);
    removeFromLocalStorage(AUTH_LOCAL_STORAGE_KEY);

    if (!navigator.onLine) {
      console.warn("You are offline. Logout may not be fully processed.");
      return { success: true };
    }

    const res = await logoutService();
    if (res.status === "SUCCESS") {
      return { success: true };
    } else {
      setErrors(res.errors || { global: res.message });
      console.error(res.message || "Logout failed");
      return { success: false, errors: res.errors || { global: res.message } };
    }
  };

  /**
   * Registers a new user by calling the register service.
   * If successful, redirects to the login page.
   *
   * @param req - The registration request containing user details.
   * @return A promise that resolves to an AuthResult indicating success or failure.
   */
  const register = async (req: RegisterRequest): Promise<AuthResult> => {
    const res = await registerService(req);

    if (res.status === "SUCCESS") {
      // Registration successful, redirect to login or show success message
      return { success: true };
    } else {
      // Transform error messages to a more user-friendly format
      const error: Record<string, string> =
        res.errors.username === "User already exists with username"
          ? { username: "El nombre de usuario ya está en uso" }
          : { global: res.message ?? "Ha ocurrido un error desconocido" };
      setErrors(error);
      return { success: false, errors: error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
