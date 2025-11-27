import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyOffers, deleteOffer } from "../services/offerService";
import type { Offer } from "../types";
import { useToast } from "../context/ToastContext";

const OffersListPage = () => {
    const { token } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        setError(null);

        getMyOffers(token)
            .then((data) => {
                setOffers(data);
            })
            .catch(() => {
                setError("Failed to load your offers. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const handleAddOffer = () => {
        navigate("/offers/new");
    };

    const handleBackToCompare = () => {
        navigate("/compare");
    };

    const handleDelete = async (id: string) => {
        if (!token) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this offer?"
        );
        if (!confirmDelete) return;

        try {
            await deleteOffer(token, id);
            setOffers((prev) => prev.filter((o) => o.id !== id));
            showToast("Offer deleted successfully", "success");
        } catch (err) {
            console.error(err);
            showToast("Failed to delete offer", "error");
        }
    };

    const filteredOffers = offers.filter((offer) => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;

        return (
            offer.company.toLowerCase().includes(term) ||
            offer.title.toLowerCase().includes(term) ||
            (offer.location ?? "").toLowerCase().includes(term)
        );
    });

    if (!token) {
        return (
            <div className="page">
                <h1>Your offers</h1>
                <p>Please log in to manage your offers.</p>
            </div>
        );
    }

    return (
        <div className="page">
            {/* header row */}
            <div className="page-header">
                <div className="page-header-main">
                    <h1 className="page-title">Your offers</h1>
                    <p className="page-subtitle">
                        Manage the offers you saved and keep them up to date.
                    </p>
                </div>

                <div className="page-header-actions">
                    <button
                        type="button"
                        className="btn btn-secondary small"
                        onClick={handleBackToCompare}
                    >
                        Back to compare
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary small"
                        onClick={handleAddOffer}
                    >
                        + Add a new offer
                    </button>
                </div>
            </div>

            {/* search box */}
            <div style={{ marginBottom: "1rem" }}>
                <label
                    style={{
                        display: "block",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                    }}
                >
                    Search by company, title or location
                </label>
                <input
                    type="text"
                    placeholder="Type to filter your offers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* states */}
            {loading && <p className="text-muted">Loading your offers...</p>}

            {!loading && error && (
                <p className="text-error" style={{ marginBottom: "1rem" }}>
                    {error}
                </p>
            )}

            {!loading && !error && offers.length === 0 && (
                <p className="text-muted">
                    You do not have any offers yet. Start by adding your first offer.
                </p>
            )}

            {!loading && !error && offers.length > 0 && (
                <>
                    {filteredOffers.length === 0 ? (
                        <p className="text-muted">
                            No offers match your search. Try a different keyword.
                        </p>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                gap: "1rem",
                            }}
                        >
                            {filteredOffers.map((offer) => (
                                <article key={offer.id} className="card">
                                    <header style={{ marginBottom: "0.5rem" }}>
                                        <h3 style={{ marginBottom: "0.15rem" }}>{offer.company}</h3>
                                        <p
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            {offer.title}
                                        </p>
                                    </header>

                                    <p style={{ fontSize: "0.85rem" }}>
                                        <strong>Salary:</strong>{" "}
                                        {offer.salary ? `${offer.salary.toLocaleString()} ₪` : "N/A"}
                                    </p>
                                    <p style={{ fontSize: "0.85rem" }}>
                                        <strong>Location:</strong> {offer.location || "N/A"}
                                    </p>
                                    <p style={{ fontSize: "0.85rem" }}>
                                        <strong>Work mode:</strong> {offer.workMode}
                                    </p>

                                    {offer.notes && (
                                        <p
                                            style={{
                                                fontSize: "0.8rem",
                                                marginTop: "0.35rem",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            {offer.notes}
                                        </p>
                                    )}

                                    <div
                                        style={{
                                            marginTop: "0.75rem",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        {/* feature: button Edit */}
                                        <button
                                            type="button"
                                            className="btn btn-secondary small"
                                            onClick={() =>
                                                navigate(`/offers/${offer.id}/edit`)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline small"
                                            onClick={() => handleDelete(offer.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OffersListPage;