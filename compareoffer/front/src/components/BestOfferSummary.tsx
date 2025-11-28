import type { Offer } from "../types";

interface BestOfferSummaryProps {
    offers: Offer[];
    computeScore: (offer: Offer) => number;
}

const BestOfferSummary = ({ offers, computeScore }: BestOfferSummaryProps) => {
    if (offers.length === 0) return null;

    const sorted = [...offers].sort((a, b) => computeScore(b) - computeScore(a));
    const best = sorted[0];
    const bestScore = computeScore(best);

    return (
        <section className="best-offer">
            <p className="best-offer-label">Recommendation</p>

            <h2 className="best-offer-title">
                Best offer right now:{" "}
                <span className="best-offer-highlight">
                    {best.company} – {best.title}
                </span>
            </h2>

            <p className="best-offer-score">
                Score: <span>{bestScore.toFixed(2)}</span>
            </p>

            <p className="best-offer-description">
                The score is based on salary, work mode (remote / hybrid gets a bonus)
                and location. You can adjust the sliders to change how offers are
                compared.
            </p>
        </section>
    );
};

export default BestOfferSummary;
