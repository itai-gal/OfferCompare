import type { Offer } from "../types";

interface BestOfferSummaryProps {
    offers: Offer[];
    computeScore: (offer: Offer) => number;
}

const BestOfferSummary = ({ offers, computeScore }: BestOfferSummaryProps) => {
    if (offers.length === 0) return null;

    const sorted = [...offers].sort(
        (a, b) => computeScore(b) - computeScore(a)
    );

    const best = sorted[0];
    const bestScore = computeScore(best);

    return (
        <section
            style={{
                marginBottom: "1rem",
                padding: "0.85rem 1rem",
                borderRadius: 10,
                border: "1px solid #dbeafe",
                backgroundColor: "#eff6ff",
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#1d4ed8",
                    fontWeight: 600,
                }}
            >
                Recommendation
            </p>

            <h2
                style={{
                    margin: "0.2rem 0 0.3rem",
                    fontSize: "1rem",
                }}
            >
                Best offer right now:{" "}
                <span style={{ fontWeight: 700 }}>
                    {best.company}- {best.title}
                </span>
            </h2>

            <p
                style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#374151",
                }}
            >
                Score:{" "}
                <span style={{ fontWeight: 600, color: "#1d4ed8" }}>
                    {bestScore}
                </span>
            </p>

            <p
                style={{
                    margin: "0.3rem 0 0",
                    fontSize: "0.85rem",
                    color: "#4b5563",
                }}
            >
                The score is based on salary, work mode (remote / hybrid gets a bonus)
                and additional notes. You can tweak these later if you want to change
                how you compare offers.
            </p>
        </section>
    );
};

export default BestOfferSummary;
