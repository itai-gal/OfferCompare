import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyOffers, deleteOffer } from "../services/offerService";
import type { Offer } from "../types";

const OffersListPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        setError(null);

        getMyOffers(token)
            .then((data) => {
                setOffers(data);
            })
            .catch(() => {
                setError("Failed to load your offers.");
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
        } catch {
            alert("Failed to delete offer.");
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/offers/${id}/edit`);
    };

    if (!token) {
        return (
            <main style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
                <h1>My offers</h1>
                <p>Please log in to see your offers.</p>
            </main>
        );
    }

    return (
        <main style={{ maxWidth: 1000, margin: "2rem auto", padding: "1rem" }}>
            {/* header row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    gap: "1rem",
                }}
            >
                <div>
                    <h1 style={{ marginBottom: "0.4rem" }}>My offers</h1>
                    <p style={{ fontSize: "0.95rem", color: "#4b5563" }}>
                        All the job offers you saved in one place.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                        type="button"
                        onClick={handleAddOffer}
                        style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: 999,
                            border: "none",
                            backgroundColor: "#3b82f6",
                            color: "#ffffff",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        + Add a new offer
                    </button>

                    <button
                        type="button"
                        onClick={handleBackToCompare}
                        style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: 999,
                            border: "1px solid #d1d5db",
                            backgroundColor: "#ffffff",
                            color: "#111827",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Back to compare
                    </button>
                </div>
            </div>

            {loading && <p>Loading your offers...</p>}

            {!loading && error && (
                <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
                    {error}
                </p>
            )}

            {!loading && !error && offers.length === 0 && (
                <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                    You don’t have any offers yet. Click{" "}
                    <button
                        type="button"
                        onClick={handleAddOffer}
                        style={{
                            border: "none",
                            background: "none",
                            color: "#2563eb",
                            cursor: "pointer",
                            textDecoration: "underline",
                            padding: 0,
                            fontSize: "0.9rem",
                        }}
                    >
                        here
                    </button>{" "}
                    to add your first offer.
                </p>
            )}

            {!loading && !error && offers.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                        gap: "1rem",
                    }}
                >
                    {offers.map((offer) => (
                        <article
                            key={offer.id}
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: 10,
                                border: "1px solid #e5e7eb",
                                padding: "1rem",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.4rem",
                            }}
                        >
                            <header>
                                <h2
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        marginBottom: "0.15rem",
                                    }}
                                >
                                    {offer.company}
                                </h2>
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "#4b5563",
                                    }}
                                >
                                    {offer.title}
                                </p>
                            </header>

                            <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                                Salary:{" "}
                                {offer.salary ? `₪${offer.salary.toLocaleString()}` : "N/A"}
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                                Location: {offer.location || "N/A"}
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                                Work mode: {offer.workMode}
                            </p>

                            {offer.notes && (
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "#4b5563",
                                        marginTop: "0.25rem",
                                    }}
                                >
                                    {offer.notes}
                                </p>
                            )}

                            <div
                                style={{
                                    marginTop: "0.6rem",
                                    display: "flex",
                                    gap: "0.4rem",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleEdit(offer.id)}
                                    style={{
                                        padding: "0.35rem 0.9rem",
                                        borderRadius: 999,
                                        border: "1px solid #d1d5db",
                                        backgroundColor: "#f9fafb",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(offer.id)}
                                    style={{
                                        padding: "0.35rem 0.9rem",
                                        borderRadius: 999,
                                        border: "1px solid #fee2e2",
                                        backgroundColor: "#fef2f2",
                                        color: "#b91c1c",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
};

export default OffersListPage;
