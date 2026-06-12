import { createContext, useContext, useState, type ReactNode } from "react";

import type { LoginRequest, RegisterRequest, VerifyAccountRequest } from "@/types/auth";
import type { PublicUser, UpdateProfileRequest } from "@/types/user";

import { STORAGE_KEYS } from "@/constants/storageKeys";

import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  verify as verifyService,
} from "@/services/authService";

import {
    updateProfile as updateProfileService
} from "@/services/userService";

import {
  removeFromLocalStorage,
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorageUtils";

type AuthResult = {
  success: boolean;
  verified?: boolean;
  errors?: Record<string, string>;
};

type AuthContextType = {
  user: PublicUser | null;
  errors: Record<string, string> | null;
  login: (req: LoginRequest) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  register: (req: RegisterRequest) => Promise<AuthResult>;
  verify: (req: VerifyAccountRequest) => Promise<AuthResult>;
  updateProfile: (req: UpdateProfileRequest) => Promise<PublicUser>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedUser =
    retrieveFromLocalStorage<PublicUser>(STORAGE_KEYS.AUTH) || null;
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
      saveToLocalStorage(STORAGE_KEYS.AUTH, res.user);
      return { success: true, verified: true };
    } else {

      if (res.message === "Account not verified") {
        return { success: false, verified: false };
      }

      // Transform error messages to a more user-friendly format
      const error: Record<string, string> =
        res.message === "Invalid credentials"
          ? { password: "Incorrect password" }
          : { global: res.message ?? "An unknown error occurred" };
      setErrors(error);

      removeFromLocalStorage(STORAGE_KEYS.AUTH);
      return { success: false, errors: error, verified: true };
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
    removeFromLocalStorage(STORAGE_KEYS.AUTH);

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
      return { success: true };
    } else {
      const error: Record<string, string> = {};
      if (res.errors.email === "User already exists with email") {
        error.email = "The email is already in use.";
      } else if (res.errors.username === "User already exists with username") {
        error.username = "The username is already in use.";
      } else {
        error.global = "An unknown error occurred.";
      }

      setErrors(error);
      return { success: false, errors: error };
    }
  };

  /**
   * Verifies a user account by calling the verify service.
   *
   * @param req - The verification request containing username and code.
   * @return A promise that resolves to an AuthResult indicating success or failure.
   */
  const verify = async (req: VerifyAccountRequest): Promise<AuthResult> => {
    const res = await verifyService(req);

    if (res.status === "SUCCESS") {
      if (res.user) {
        setUser(res.user);
        saveToLocalStorage(STORAGE_KEYS.AUTH, res.user);
      }
      return { success: true, verified: true };
    } else {
        const error: Record<string, string> = {};
        error.global = "Verification error.";
        setErrors(error);
        return { success: false, errors: error };
    }
  };

  /**
   * Updates the profile of the user with the given username.
   *
   * @param req - The update profile request containing user details.
   * @return A promise that resolves to the updated public user.
   */
  const updateProfile = async (req: UpdateProfileRequest): Promise<PublicUser> => {
    if (!user?.username) {
        throw new Error("User not found");
    }

    const res = await updateProfileService(user.username, req);
    if (res && res.username) {
        setUser(res);
        saveToLocalStorage(STORAGE_KEYS.AUTH, res);
        return res;
    } else {
        throw new Error("Update profile failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, login, logout, register, verify, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
