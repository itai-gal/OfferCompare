import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { createOffer } from "../services/offerService";
import type { Offer } from "../types";

const AddOfferPage = () => {
    const { token } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState<number | "">("");
    const [location, setLocation] = useState("");
    const [workMode, setWorkMode] = useState<Offer["workMode"]>("hybrid");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            showToast("You must be logged in to add an offer.", "error");
            return;
        }

        if (!company.trim() || !title.trim()) {
            showToast("Company and title are required.", "error");
            return;
        }

        setSubmitting(true);
        try {
            await createOffer(token, {
                company: company.trim(),
                title: title.trim(),
                salary: salary === "" ? undefined : Number(salary),
                location: location.trim() || undefined,
                workMode,
                notes: notes.trim() || undefined,
            });

            showToast("Offer added successfully.", "success");
            navigate("/offers");
        } catch (err) {
            console.error(err);
            showToast("Failed to add offer. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/offers");
    };

    if (!token) {
        return (
            <main className="page-container">
                <h1 className="page-title">Add a new offer</h1>
                <p>You must be logged in to add offers.</p>
            </main>
        );
    }

    return (
        <main className="page-container">
            <div className="page-header-row">
                <div>
                    <h1 className="page-title">Add a new offer</h1>
                    <p className="page-subtitle">
                        Fill in the details of the offer you received so you can compare it later.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="card"
                style={{ maxWidth: 550, marginTop: "1rem" }}
            >
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">
                            Company<span className="form-label-required">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company name"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">
                            Title<span className="form-label-required">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Position title"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Salary (gross, monthly)</label>
                        <input
                            className="form-input"
                            type="number"
                            min={0}
                            value={salary}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSalary(value === "" ? "" : Number(value));
                            }}
                            placeholder="e.g. 12000"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Location</label>
                        <input
                            className="form-input"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Tel Aviv"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Work mode</label>
                        <select
                            className="form-input"
                            value={workMode}
                            onChange={(e) => setWorkMode(e.target.value as Offer["workMode"])}
                        >
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                        <label className="form-label">Notes</label>
                        <textarea
                            className="form-input"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Anything important about this offer (stock, promotion path, manager, etc.)"
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.75rem",
                        marginTop: "1rem",
                    }}
                >
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-secondary"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Save offer"}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AddOfferPage;