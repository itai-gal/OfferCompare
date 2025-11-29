import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Offer } from "../types";
import { useAuth } from "../context/AuthContext";
import { getMyOffers } from "../services/offerService";
import BestOfferSummary from "../components/BestOfferSummary";
import OfferSelector from "../components/OfferSelector";
import ScoreSliders from "../components/ScoreSliders";
import ComparisonTable from "../components/ComparisonTable";

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

    function handleToggle(offerId: string, checked: boolean) {
        setSelectedIds((prev) =>
            checked ? [...prev, offerId] : prev.filter((id) => id !== offerId)
        );
    }

    function handleResetWeights() {
        setWeights(defaultWeights);
    }

    function handleGoToAddOffer() {
        navigate("/offers/new");
    }

    function handleGoToOffers() {
        navigate("/offers");
    }

    if (!token) {
        return (
            <main className="page compare-page">
                <header className="page-header">
                    <div>
                        <h1 className="page-title">Compare your offers</h1>
                        <p className="page-subtitle">
                            Log in or create an account to compare your job offers.
                        </p>
                    </div>
                </header>
            </main>
        );
    }

    const hasOffers = offers.length > 0;

    return (
        <main className="page compare-page">
            <header className="page-header compare-header">
                <div className="page-header-main">
                    <h1 className="page-title">Compare your offers</h1>
                    {!loading && !error && hasOffers && (
                        <p className="page-subtitle">
                            Select the offers you want to compare and see which one fits you
                            best.
                        </p>
                    )}
                </div>

                <div className="page-header-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleGoToOffers}
                    >
                        View all offers
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleGoToAddOffer}
                    >
                        + Add a new offer
                    </button>
                </div>
            </header>

            {!loading && !error && hasOffers && (
                <div className="compare-tip">
                    <strong>Tip:</strong> Focus on the offers you are seriously
                    considering. You can always add or remove offers later.
                </div>
            )}

            {!loading && error && (
                <p className="text-error">{error}</p>
            )}

            {loading && <p className="text-muted">Loading your offers...</p>}

            {!loading && !error && (
                <>
                    <OfferSelector
                        offers={offers}
                        selectedIds={selectedIds}
                        onToggle={handleToggle}
                        hasOffers={hasOffers}
                        onAddOfferClick={handleGoToAddOffer}
                    />

                    {hasOffers && (
                        <ScoreSliders
                            weights={weights}
                            onChange={setWeights}
                            onReset={handleResetWeights}
                        />
                    )}

                    {hasOffers && selectedOffers.length > 0 && (
                        <BestOfferSummary
                            offers={selectedOffers}
                            computeScore={computeScore}
                        />
                    )}

                    {hasOffers && (
                        <ComparisonTable
                            offers={selectedOffers}
                            computeScore={computeScore}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default ComparePage;
