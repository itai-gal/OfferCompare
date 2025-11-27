import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Offer } from "../types";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getMyOffers, deleteOffer } from "../services/offerService";

const formatSalary = (salary?: number | null): string => {
    if (!salary || salary <= 0) return "-";
    return `₪${salary.toLocaleString("he-IL")}`;
};

const OffersListPage = () => {
    const { token } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        setError(null);

        getMyOffers(token)
            .then((data) => {
                setOffers(data);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load your offers.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const handleGoToAddOffer = () => {
        navigate("/offers/new");
    };

    const handleGoToCompare = () => {
        navigate("/compare");
    };

    const handleDelete = async (id: string) => {
        if (!token) {
            showToast("You must be logged in to delete offers.", "error");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this offer?"
        );
        if (!confirmed) return;

        try {
            setDeletingId(id);
            await deleteOffer(token, id);
            setOffers((prev) => prev.filter((o) => o.id !== id));
            showToast("Offer deleted.", "success");
        } catch (err) {
            console.error(err);
            showToast("Failed to delete offer.", "error");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/offers/${id}/edit`);
    };

    if (!token) {
        return (
            <main className="page-container">
                <h1 className="page-title">My offers</h1>
                <p>You must be logged in to see your offers.</p>
            </main>
        );
    }

    const hasOffers = offers.length > 0;

    return (
        <main className="page-container">
            <div className="page-header-row">
                <div>
                    <h1 className="page-title">My offers</h1>
                    <p className="page-subtitle">
                        All the offers you added are listed here. You can edit, delete, or go
                        to the compare view.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <button
                        type="button"
                        onClick={handleGoToCompare}
                        className="btn-secondary"
                    >
                        Back to compare
                    </button>
                    <button
                        type="button"
                        onClick={handleGoToAddOffer}
                        className="btn-primary"
                    >
                        + Add a new offer
                    </button>
                </div>
            </div>

            {loading && <p>Loading your offers...</p>}

            {!loading && error && (
                <p style={{ color: "red", marginTop: "0.75rem" }}>{error}</p>
            )}

            {!loading && !error && !hasOffers && (
                <div className="card" style={{ marginTop: "1rem" }}>
                    <p style={{ marginBottom: "0.5rem" }}>
                        You do not have any offers yet.
                    </p>
                    <button
                        type="button"
                        onClick={handleGoToAddOffer}
                        className="btn-primary"
                    >
                        Add your first offer
                    </button>
                </div>
            )}

            {!loading && !error && hasOffers && (
                <div
                    className="card"
                    style={{
                        marginTop: "1rem",
                        padding: "0.75rem 0.75rem",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "minmax(120px, 2fr) minmax(120px, 2fr) 100px 130px 130px",
                            columnGap: "0.75rem",
                            rowGap: "0.5rem",
                            fontSize: "0.85rem",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 600,
                                color: "#4b5563",
                            }}
                        >
                            Company
                        </div>
                        <div
                            style={{
                                fontWeight: 600,
                                color: "#4b5563",
                            }}
                        >
                            Title
                        </div>
                        <div
                            style={{
                                fontWeight: 600,
                                color: "#4b5563",
                            }}
                        >
                            Salary
                        </div>
                        <div
                            style={{
                                fontWeight: 600,
                                color: "#4b5563",
                            }}
                        >
                            Work mode
                        </div>
                        <div />

                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                style={{
                                    borderTop: "1px solid #e5e7eb",
                                    paddingTop: "0.45rem",
                                    display: "contents",
                                }}
                            >
                                <div
                                    style={{
                                        paddingTop: "0.45rem",
                                        paddingBottom: "0.45rem",
                                    }}
                                >
                                    <div style={{ fontWeight: 500 }}>
                                        {offer.company}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.8rem",
                                            color: "#6b7280",
                                        }}
                                    >
                                        {offer.location || "-"}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        paddingTop: "0.45rem",
                                        paddingBottom: "0.45rem",
                                    }}
                                >
                                    {offer.title}
                                </div>

                                <div
                                    style={{
                                        paddingTop: "0.45rem",
                                        paddingBottom: "0.45rem",
                                    }}
                                >
                                    {formatSalary(offer.salary)}
                                </div>

                                <div
                                    style={{
                                        paddingTop: "0.45rem",
                                        paddingBottom: "0.45rem",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {offer.workMode}
                                </div>

                                <div
                                    style={{
                                        paddingTop: "0.3rem",
                                        paddingBottom: "0.3rem",
                                        display: "flex",
                                        gap: "0.4rem",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(offer.id)}
                                        className="btn-small-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(offer.id)}
                                        className="btn-small-danger"
                                        disabled={deletingId === offer.id}
                                    >
                                        {deletingId === offer.id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
};

export default OffersListPage;