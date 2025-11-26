import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginPayload } from "../types";

const LoginPage = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login(form);
            navigate("/compare"); // after login, redirect to compare page
        } catch (err: any) {
            setError(err?.message || "Login failed");
        }
    };

    return (
        <section style={{ maxWidth: 400, margin: "0 auto" }}>
            <h1>Login</h1>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
                Log in to see and compare your offers.
            </p>

            {error && (
                <div
                    style={{
                        marginTop: "1rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: 4,
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        fontSize: "0.85rem",
                    }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                    <label
                        htmlFor="email"
                        style={{ display: "block", marginBottom: 4 }}
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                    <label
                        htmlFor="password"
                        style={{ display: "block", marginBottom: 4 }}
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem 1rem",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link>
            </p>
        </section>
    );
};

export default LoginPage;
