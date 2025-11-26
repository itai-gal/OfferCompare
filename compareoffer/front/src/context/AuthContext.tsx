import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";

import type {
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "../types";
import * as authService from "../services/authService";

const TOKEN_KEY = "compareoffer_token";

interface AuthContextValue {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Load token from localStorage on first mount
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (!storedToken) {
            setLoading(false);
            return;
        }

        setToken(storedToken);

        authService
            .getMe(storedToken)
            .then((u) => {
                setUser(u);
            })
            .catch(() => {
                // If token is invalid, clear it
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleLogin = async (payload: LoginPayload) => {
        setLoading(true);
        try {
            const result = await authService.login(payload);
            setUser(result.user);
            setToken(result.token);
            localStorage.setItem(TOKEN_KEY, result.token);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (payload: RegisterPayload) => {
        setLoading(true);
        try {
            const result = await authService.register(payload);
            setUser(result.user);
            setToken(result.token);
            localStorage.setItem(TOKEN_KEY, result.token);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
    };

    const value: AuthContextValue = {
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
