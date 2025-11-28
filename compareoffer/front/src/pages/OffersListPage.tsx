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
                const msg = "Failed to load your offers. Please try again.";
                setError(msg);
                showToast(msg, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token, showToast]);

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
        } catch {
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

                <div className="page-header-actions btn-group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleBackToCompare}
                    >
                        Back to compare
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddOffer}
                    >
                        + Add a new offer
                    </button>
                </div>
            </div>

            {/* search box */}
            <div className="offers-search">
                <label className="offers-search-label">
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
                <p className="text-error mb-1">
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
                        <div className="offers-grid">
                            {filteredOffers.map((offer) => (
                                <article key={offer.id} className="card offers-card">
                                    <header className="offers-card-header">
                                        <h3 className="offers-card-company">
                                            {offer.company}
                                        </h3>
                                        <p className="offers-card-title">
                                            {offer.title}
                                        </p>
                                    </header>

                                    <p className="offers-card-text">
                                        <strong>Salary:</strong>{" "}
                                        {offer.salary
                                            ? `${offer.salary.toLocaleString()} ₪`
                                            : "N/A"}
                                    </p>
                                    <p className="offers-card-text">
                                        <strong>Location:</strong>{" "}
                                        {offer.location || "N/A"}
                                    </p>
                                    <p className="offers-card-text">
                                        <strong>Work mode:</strong> {offer.workMode}
                                    </p>

                                    {offer.notes && (
                                        <p className="offers-card-notes">
                                            {offer.notes}
                                        </p>
                                    )}

                                    <div className="offers-card-actions">
                                        <button
                                            type="button"
                                            className="btn btn-secondary small"
                                            onClick={() => navigate(`/offers/${offer.id}/edit`)}
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