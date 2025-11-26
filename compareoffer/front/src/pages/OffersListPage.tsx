import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOffers, deleteOffer } from "../services/offerService";
import type { Offer } from "../types";
import { useNavigate } from "react-router-dom";
import OfferCard from "../components/OfferCard";

const OffersListPage = () => {
    const { token, loading: authLoading } = useAuth();
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        getMyOffers(token)
            .then((data) => setOffers(data))
            .catch((err: any) => {
                setError(err?.message || "Failed to load offers.");
            })
            .finally(() => setLoading(false));
    }, [token]);

    const handleDelete = async (id: string) => {
        if (!token) return;

        try {
            await deleteOffer(token, id);
            setOffers((prev) => prev.filter((o) => o.id !== id));
        } catch (err: any) {
            setError(err?.message || "Failed to delete offer.");
        }
    };

    if (authLoading) return <p>Loading...</p>;
    if (!token) return <p>You must be logged in to view your offers.</p>;

    return (
        <section style={{ maxWidth: 900, margin: "0 auto" }}>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <div>
                    <h1>Your Offers</h1>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#4b5563" }}>
                        Manage and compare all the offers you received.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/offers/new")}
                    style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: 999,
                        border: "none",
                        background: "#3b82f6",
                        color: "#ffffff",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                    }}
                >
                    + Add Offer
                </button>
            </header>

            {error && (
                <div
                    style={{
                        marginBottom: "0.75rem",
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

            {loading && <p>Loading your offers...</p>}

            {!loading && offers.length === 0 && <p>You have no offers yet.</p>}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "1rem",
                }}
            >
                {offers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        onEdit={() => navigate(`/offers/${offer.id}/edit`)}
                        onDelete={() => handleDelete(offer.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default OffersListPage;
