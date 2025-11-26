import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOffers } from "../services/offerService";
import BestOfferSummary from "../components/BestOfferSummary";
import { useNavigate } from "react-router-dom";
import type { Offer } from "../types";
import type { ChangeEvent } from "react";

const ComparePage = () => {
    const { token, loading: authLoading } = useAuth();
    const [offers, setOffers] = useState<Offer[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        getMyOffers(token)
            .then((data) => {
                setOffers(data);
                setSelectedIds(data.slice(0, 3).map((o) => o.id));
            })
            .catch((err: any) => {
                setError(err?.message || "Failed to load offers for comparison.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const handleToggle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const { checked } = e.target;
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
        );
    };

    const selectedOffers = useMemo(
        () => offers.filter((o) => selectedIds.includes(o.id)),
        [offers, selectedIds]
    );

    const computeScore = (offer: Offer): number => {
        let score = 0;

        if (offer.salary) {
            score += offer.salary / 1000;
        }

        if (offer.workMode === "remote") score += 10;
        if (offer.workMode === "hybrid") score += 6;

        if (offer.notes && offer.notes.length > 0) score += 2;

        return Math.round(score * 10) / 10;
    };

    if (authLoading) {
        return <p>Loading...</p>;
    }

    if (!token) {
        return <p>You must be logged in to compare offers.</p>;
    }

    return (
        <section style={{ maxWidth: 1000, margin: "0 auto" }}>
            <header style={{ marginBottom: "1.5rem" }}>
                <h1>Compare your offers</h1>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#4b5563" }}>
                    Select the offers you want to compare and see a clear side-by-side
                    overview, including a simple score for each one.
                </p>
            </header>

            {error && (
                <div
                    style={{
                        marginBottom: "1rem",
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

            {loading && <p>Loading offers…</p>}

            {!loading && offers.length === 0 && (
                <div>
                    <p>
                        You don't have any offers yet. Start by adding an offer, then come
                        back here to compare them.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/offers")}
                        style={{
                            marginTop: "0.5rem",
                            padding: "0.4rem 0.9rem",
                            borderRadius: 999,
                            border: "none",
                            background: "#3b82f6",
                            color: "#ffffff",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                        }}
                    >
                        Go to my offers
                    </button>
                </div>
            )}

            {!loading && offers.length > 0 && (
                <>
                    <div
                        style={{
                            marginBottom: "1.5rem",
                            padding: "0.75rem 1rem",
                            borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f9fafb",
                        }}
                    >
                        <p
                            style={{
                                marginTop: 0,
                                marginBottom: "0.5rem",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                            }}
                        >
                            Select offers to compare:
                        </p>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.75rem",
                            }}
                        >
                            {offers.map((offer) => {
                                const checked = selectedIds.includes(offer.id);
                                return (
                                    <label
                                        key={offer.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.4rem",
                                            padding: "0.35rem 0.7rem",
                                            borderRadius: 999,
                                            border: checked
                                                ? "1px solid #3b82f6"
                                                : "1px solid #d1d5db",
                                            backgroundColor: checked ? "#eff6ff" : "#ffffff",
                                            cursor: "pointer",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => handleToggle(e, offer.id)}
                                        />
                                        <span>
                                            {offer.company} – {offer.title}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {selectedOffers.length > 0 && (
                        <BestOfferSummary
                            offers={selectedOffers}
                            computeScore={computeScore}
                        />
                    )}

                    {selectedOffers.length > 0 ? (
                        <div
                            style={{
                                overflowX: "auto",
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    minWidth: 600,
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "#f3f4f6",
                                            textAlign: "left",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Company</th>
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Title</th>
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Salary</th>
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Location</th>
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Work mode</th>
                                        <th style={{ padding: "0.6rem 0.75rem" }}>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOffers.map((offer) => (
                                        <tr key={offer.id} style={{ fontSize: "0.9rem" }}>
                                            <td style={{ padding: "0.5rem 0.75rem" }}>
                                                {offer.company}
                                            </td>
                                            <td style={{ padding: "0.5rem 0.75rem" }}>
                                                {offer.title}
                                            </td>
                                            <td style={{ padding: "0.5rem 0.75rem" }}>
                                                {offer.salary
                                                    ? `${offer.salary.toLocaleString()} ₪`
                                                    : "-"}
                                            </td>
                                            <td style={{ padding: "0.5rem 0.75rem" }}>
                                                {offer.location || "-"}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "0.5rem 0.75rem",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {offer.workMode}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "0.5rem 0.75rem",
                                                    fontWeight: 600,
                                                    color: "#1d4ed8",
                                                }}
                                            >
                                                {computeScore(offer)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Select at least one offer to see the comparison table.</p>
                    )}
                </>
            )}
        </section>
    );
};

export default ComparePage;
