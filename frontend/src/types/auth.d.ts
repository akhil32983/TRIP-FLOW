import type { PublicUser } from "@/types/user";

export type AuthStatus = "SUCCESS" | "FAILURE";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    email: string;
    confirmPassword: string;
}

export interface AuthResponse {
    status: AuthStatus;
    message: string;
    errors: Record<string, string>;
    user: PublicUser;
}
