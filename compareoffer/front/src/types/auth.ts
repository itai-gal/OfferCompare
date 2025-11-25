import type { AuthUser } from "./user";

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    user: AuthUser;
    token: string;
}
