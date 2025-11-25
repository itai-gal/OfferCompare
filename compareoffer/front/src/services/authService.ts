import { apiFetch } from "./apiClient";
import type {
    RegisterPayload,
    LoginPayload,
    AuthResponse,
} from "../types";

// POST /auth/register
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

// POST /auth/login
export async function login(payload: LoginPayload): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

// GET /auth/me
export async function getMe(token: string): Promise<AuthResponse["user"]> {
    return apiFetch<AuthResponse["user"]>("/api/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
