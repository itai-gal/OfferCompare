import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { RegisterPayload } from "../types";

const RegisterPage = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterPayload>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [validationDetails, setValidationDetails] = useState<string[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationDetails([]);

        try {
            await register(form);
            navigate("/compare");
        } catch (err: any) {
            setError(err?.message || "Registration failed");
            if (Array.isArray(err?.details)) {
                setValidationDetails(err.details);
            }
        }
    };

    return (
        <section style={{ maxWidth: 450, margin: "0 auto" }}>
            <h1>Register</h1>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
                Create an account to manage and compare all your job offers in one place.
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
                    {validationDetails.length > 0 && (
                        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
                            {validationDetails.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                    <label
                        htmlFor="firstName"
                        style={{ display: "block", marginBottom: 4 }}
                    >
                        First name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                    <label
                        htmlFor="lastName"
                        style={{ display: "block", marginBottom: 4 }}
                    >
                        Last name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

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
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </section>
    );
};

export default RegisterPage;
