import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const RegisterPage = () => {
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErrorMessage(null);
        setSubmitting(true);

        try {
            await register({ firstName, lastName, email, password });
            showToast("Account created successfully. Welcome!", "success");
            navigate("/compare");
        } catch (error) {
            setErrorMessage(
                "Registration failed. Please check your details and try again."
            );
            showToast("Registration failed. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="page">
            <div className="form-card">
                <h1 className="form-title">Create your CompareOffer account</h1>
                <p className="form-subtitle">
                    Keep all your offers in one place and make a clearer decision about your next role.
                </p>

                {errorMessage && (
                    <div className="form-global-error">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-field">
                        <label className="form-label" htmlFor="firstName">
                            First name
                        </label>
                        <input
                            id="firstName"
                            className="form-input"
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="name here"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="lastName">
                            Last name
                        </label>
                        <input
                            id="lastName"
                            className="form-input"
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="last name here"
                        />
                    </div>

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
                            placeholder="name@example.com"
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? "Creating account..." : "Create account"}
                        </button>
                    </div>
                </form>

                <p className="form-hint">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default RegisterPage;
