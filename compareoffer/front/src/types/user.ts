export type UserRole = "user" | "admin";

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    firstName?: string;
    lastName?: string;
}
