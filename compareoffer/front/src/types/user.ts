export type UserRole = "user" | "admin";

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}
