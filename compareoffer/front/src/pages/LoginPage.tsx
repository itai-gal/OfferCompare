import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const LoginPage = () => {
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErrorMessage(null);
        setSubmitting(true);

        try {
            await login({ email, password });
            showToast("Welcome back! Your offers are ready to compare.", "success");
            navigate("/compare");
        } catch (error) {
            setErrorMessage(
                "Login failed. Please check your details and try again."
            );
            showToast("Login failed. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="page">
            <div className="form-card">
                <h1 className="form-title">Sign in to CompareOffer</h1>
                <p className="form-subtitle">
                    Log in to access your saved offers and compare them side by side.
                </p>

                {errorMessage && (
                    <div className="form-global-error">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-field">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-input"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-input"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>

                <p className="form-hint">
                    New here?{" "}
                    <Link to="/register">
                        Create an account
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default LoginPage;