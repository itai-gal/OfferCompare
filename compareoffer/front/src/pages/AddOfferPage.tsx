import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createOffer } from "../services/offerService";
import type { WorkMode } from "../types";

type OfferFormState = {
    company: string;
    title: string;
    salary: string;
    location: string;
    workMode: WorkMode;
    notes: string;
};

const AddOfferPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<OfferFormState>({
        company: "",
        title: "",
        salary: "",
        location: "",
        workMode: "onsite",
        notes: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError("You must be logged in.");
            return;
        }

        try {
            await createOffer(token, {
                company: form.company,
                title: form.title,
                salary: form.salary ? Number(form.salary) : undefined,
                location: form.location || undefined,
                workMode: form.workMode,
                notes: form.notes || undefined,
            });

            navigate("/offers");
        } catch (err: any) {
            setError(err?.message || "Failed to create offer.");
        }
    };

    return (
        <section style={{ maxWidth: 500, margin: "0 auto" }}>
            <h1>Add Offer</h1>

            {error && (
                <div
                    style={{
                        marginTop: "0.75rem",
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

            <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label htmlFor="salary">Salary</label>
                    <input
                        id="salary"
                        name="salary"
                        type="number"
                        value={form.salary}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label htmlFor="workMode">Work mode</label>
                    <select
                        id="workMode"
                        name="workMode"
                        value={form.workMode}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    >
                        <option value="onsite">On-site</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: "100%", padding: "0.5rem", resize: "vertical" }}
                    />
                </div>

                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                    Save
                </button>
            </form>
        </section>
    );
};

export default AddOfferPage;
