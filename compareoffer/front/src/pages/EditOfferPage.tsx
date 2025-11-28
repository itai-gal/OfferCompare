import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getOfferById, updateOffer } from "../services/offerService";
import type { WorkMode } from "../types";

type OfferFormState = {
    company: string;
    title: string;
    salary: string;
    location: string;
    workMode: WorkMode;
    notes: string;
};

const EditOfferPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [form, setForm] = useState<OfferFormState | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !id) {
            setLoading(false);
            return;
        }

        setError(null);

        getOfferById(token, id)
            .then((offer) => {
                setForm({
                    company: offer.company,
                    title: offer.title,
                    salary: offer.salary ? offer.salary.toString() : "",
                    location: offer.location || "",
                    workMode: offer.workMode,
                    notes: offer.notes || "",
                });
            })
            .catch(() => {
                setError("Failed to load offer.");
                showToast("Failed to load offer. Please try again.", "error");
            })
            .finally(() => setLoading(false));
    }, [token, id, showToast]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (!form) return;
        const { name, value } = e.target;
        setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token || !id || !form) return;

        setError(null);

        try {
            await updateOffer(token, id, {
                company: form.company,
                title: form.title,
                salary: form.salary ? Number(form.salary) : undefined,
                location: form.location || undefined,
                workMode: form.workMode,
                notes: form.notes || undefined,
            });

            showToast("Offer updated successfully.", "success");
            navigate("/offers");
        } catch {
            setError("Failed to update offer.");
            showToast("Failed to update offer. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        navigate("/offers");
    };

    if (!token) {
        return (
            <main className="page-container">
                <h1 className="page-title">Edit offer</h1>
                <p>You must be logged in to edit offers.</p>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="page-container">
                <p className="text-muted">Loading offer...</p>
            </main>
        );
    }

    if (!form) {
        return (
            <main className="page-container">
                <p className="text-error">Offer not found.</p>
            </main>
        );
    }

    return (
        <main className="page-container">
            <div className="page-header-row">
                <div>
                    <h1 className="page-title">Edit offer</h1>
                    <p className="page-subtitle">
                        Update the details of this offer so your comparison stays accurate.
                    </p>
                </div>
            </div>

            {error && <div className="form-global-error">{error}</div>}

            <form
                onSubmit={handleSubmit}
                className="card offer-form-card"
            >
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label" htmlFor="company">
                            Company
                        </label>
                        <input
                            id="company"
                            name="company"
                            className="form-input"
                            type="text"
                            required
                            value={form.company}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            className="form-input"
                            type="text"
                            required
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="salary">
                            Salary (gross, monthly)
                        </label>
                        <input
                            id="salary"
                            name="salary"
                            className="form-input"
                            type="number"
                            min={0}
                            value={form.salary}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="location">
                            Location
                        </label>
                        <input
                            id="location"
                            name="location"
                            className="form-input"
                            type="text"
                            value={form.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="workMode">
                            Work mode
                        </label>
                        <select
                            id="workMode"
                            name="workMode"
                            className="form-input"
                            value={form.workMode}
                            onChange={handleChange}
                        >
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div className="form-field form-field-full">
                        <label className="form-label" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            className="form-input"
                            rows={4}
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </main>
    );
};

export default EditOfferPage;