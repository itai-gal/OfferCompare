import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOffers } from "../services/offerService";
import type { Offer } from "../types";
import { useAuth } from "../context/AuthContext";
import BestOfferSummary from "../components/BestOfferSummary";

type ScoreWeights = {
    salary: number;
    workMode: number;
    location: number;
};

const defaultWeights: ScoreWeights = {
    salary: 0.6,
    workMode: 0.25,
    location: 0.15,
};

function normalizeSalary(salary: number | undefined): number {
    if (!salary || salary <= 0) return 0;
    const cap = 40000;
    const value = Math.min(salary, cap);
    return value / cap;
}

function scoreWorkMode(workMode: Offer["workMode"]): number {
    if (workMode === "remote") return 1;
    if (workMode === "hybrid") return 0.7;
    return 0.4;
}

function scoreLocation(location?: string): number {
    if (!location) return 0.4;
    const lower = location.toLowerCase();
    if (lower.includes("tel aviv")) return 1;
    if (lower.includes("center")) return 0.8;
    if (lower.includes("north") || lower.includes("south")) return 0.6;
    return 0.5;
}

const ComparePage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [weights, setWeights] = useState<ScoreWeights>(defaultWeights);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        setError(null);

        getMyOffers(token)
            .then((data) => {
                setOffers(data);
                setSelectedIds(data.slice(0, 3).map((o) => o.id));
            })
            .catch(() => {
                setError("Something went wrong while loading your data.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const selectedOffers = useMemo(
        () => offers.filter((o) => selectedIds.includes(o.id)),
        [offers, selectedIds]
    );

    function computeScore(offer: Offer): number {
        const salaryScore = normalizeSalary(offer.salary);
        const workModeScore = scoreWorkMode(offer.workMode);
        const locationScore = scoreLocation(offer.location);

        return (
            salaryScore * weights.salary +
            workModeScore * weights.workMode +
            locationScore * weights.location
        );
    }

    function handleToggle(
        e: ChangeEvent<HTMLInputElement>,
        offerId: string
    ) {
        const checked = e.target.checked;
        setSelectedIds((prev) =>
            checked ? [...prev, offerId] : prev.filter((id) => id !== offerId)
        );
    }

    const handleResetWeights = () => {
        setWeights(defaultWeights);
    };

    const handleGoToAddOffer = () => {
        navigate("/offers/new");
    };

    const handleGoToOffersList = () => {
        navigate("/offers");
    };

    if (!token) {
        return (
            <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
                <h1>Compare your offers</h1>
                <p>Please log in to compare your offers.</p>
            </div>
        );
    }

    const hasOffers = offers.length > 0;

    return (
        <div style={{ maxWidth: 1000, margin: "2rem auto", padding: "1rem" }}>
            {/* header row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                }}
            >
                <div>
                    <h1 style={{ marginBottom: hasOffers ? "0.4rem" : 0 }}>
                        Compare your offers
                    </h1>

                    {!loading && !error && hasOffers && (
                        <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>
                            Select the offers you want to compare and see which one fits you best.
                        </p>
                    )}
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                        type="button"
                        onClick={handleGoToAddOffer}
                        style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: 999,
                            border: "none",
                            background: "#3b82f6",
                            color: "#ffffff",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            whiteSpace: "nowrap",
                        }}
                    >
                        + Add a new offer
                    </button>

                    <button
                        type="button"
                        onClick={handleGoToOffersList}
                        style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: 999,
                            border: "1px solid #d1d5db",
                            background: "#ffffff",
                            color: "#111827",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        View my offers
                    </button>
                </div>
            </div>

            {/* tip – only when there are offers */}
            {!loading && !error && hasOffers && (
                <div
                    style={{
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        backgroundColor: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        fontSize: "0.9rem",
                        marginBottom: "1.25rem",
                    }}
                >
                    <strong>Tip:</strong> Focus on the offers you are seriously considering.
                    You can always add or remove offers later.
                </div>
            )}

            {/* error message if loading failed */}
            {!loading && error && (
                <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
                    {error}
                </p>
            )}

            {loading && <p>Loading your offers...</p>}

            {!loading && !error && (
                <>
                    {/* selection area */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>
                            {hasOffers
                                ? "Select offers to compare"
                                : "You do not have any offers yet"}
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            }}
                        >
                            {!hasOffers && (
                                <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                                    Start by creating at least one offer in the system. Click{" "}
                                    <button
                                        type="button"
                                        onClick={handleGoToAddOffer}
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

                            {hasOffers &&
                                offers.map((offer) => {
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

                    {/* weights controls – only if there are offers */}
                    {hasOffers && (
                        <div
                            style={{
                                marginBottom: "1.5rem",
                                padding: "1rem",
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <h2 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
                                What matters most to you?
                            </h2>
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    color: "#6b7280",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Adjust the sliders to change how much each factor affects the
                                score.
                            </p>

                            <div style={{ display: "grid", gap: "0.75rem" }}>
                                <label style={{ fontSize: "0.85rem" }}>
                                    Salary ({Math.round(weights.salary * 100)}%)
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={weights.salary * 100}
                                        onChange={(e) => {
                                            const value = Number(e.target.value) / 100;
                                            const rest = 1 - value;
                                            setWeights({
                                                salary: value,
                                                workMode: rest * 0.6,
                                                location: rest * 0.4,
                                            });
                                        }}
                                        style={{ width: "100%" }}
                                    />
                                </label>

                                <label style={{ fontSize: "0.85rem" }}>
                                    Work mode ({Math.round(weights.workMode * 100)}%)
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={weights.workMode * 100}
                                        onChange={(e) => {
                                            const value = Number(e.target.value) / 100;
                                            const rest = 1 - value;
                                            setWeights({
                                                salary: rest * 0.6,
                                                workMode: value,
                                                location: rest * 0.4,
                                            });
                                        }}
                                        style={{ width: "100%" }}
                                    />
                                </label>

                                <label style={{ fontSize: "0.85rem" }}>
                                    Location ({Math.round(weights.location * 100)}%)
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={weights.location * 100}
                                        onChange={(e) => {
                                            const value = Number(e.target.value) / 100;
                                            const rest = 1 - value;
                                            setWeights({
                                                salary: rest * 0.6,
                                                workMode: rest * 0.25,
                                                location: value,
                                            });
                                        }}
                                        style={{ width: "100%" }}
                                    />
                                </label>
                            </div>

                            <button
                                type="button"
                                onClick={handleResetWeights}
                                style={{
                                    marginTop: "0.75rem",
                                    padding: "0.4rem 0.9rem",
                                    borderRadius: 999,
                                    border: "1px solid #d1d5db",
                                    backgroundColor: "#f9fafb",
                                    fontSize: "0.8rem",
                                    cursor: "pointer",
                                }}
                            >
                                Reset to default weights
                            </button>
                        </div>
                    )}

                    {/* best offer summary */}
                    {hasOffers && selectedOffers.length > 0 && (
                        <BestOfferSummary
                            offers={selectedOffers}
                            computeScore={computeScore}
                        />
                    )}

                    {/* comparison table placeholder */}
                    {hasOffers && (
                        <>
                            {selectedOffers.length > 0 ? (
                                <div
                                    style={{
                                        overflowX: "auto",
                                        borderRadius: 8,
                                        border: "1px solid #e5e7eb",
                                        backgroundColor: "#ffffff",
                                        marginTop: "1.25rem",
                                        padding: "1rem",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    <p>
                                        Here you can render your detailed comparison table (salary,
                                        work mode, location, score, etc.).
                                    </p>
                                </div>
                            ) : (
                                <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                                    Select at least one offer to see the comparison table.
                                </p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ComparePage;
