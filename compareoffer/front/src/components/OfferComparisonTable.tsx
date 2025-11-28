import type { Offer } from "../types";
import { getWorkModeLabel } from "../utils/offerScoring";

interface OfferComparisonTableProps {
    offers: Offer[];
    computeScore: (offer: Offer) => number;
    bestOfferId: string | null;
}

const OfferComparisonTable = ({
    offers,
    computeScore,
    bestOfferId,
}: OfferComparisonTableProps) => {
    if (offers.length === 0) return null;

    return (
        <div className="comparison-table-wrapper">
            <table className="comparison-table">
                <thead>
                    <tr className="comparison-table-header-row">
                        <th className="comparison-table-criteria-header">
                            Criteria
                        </th>
                        {offers.map((offer) => (
                            <th
                                key={offer.id}
                                className="comparison-table-offer-header"
                            >
                                <div className="comparison-table-offer-company">
                                    {offer.company}
                                </div>
                                <div className="comparison-table-offer-title">
                                    {offer.title}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* Salary row */}
                    <tr className="comparison-table-row">
                        <td className="comparison-table-criteria-cell">
                            Salary (gross)
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                className="comparison-table-cell"
                            >
                                {offer.salary
                                    ? `₪${offer.salary.toLocaleString("he-IL")}`
                                    : "Not provided"}
                            </td>
                        ))}
                    </tr>

                    {/* Location row */}
                    <tr className="comparison-table-row">
                        <td className="comparison-table-criteria-cell">
                            Location
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                className="comparison-table-cell"
                            >
                                {offer.location || "—"}
                            </td>
                        ))}
                    </tr>

                    {/* Work mode row */}
                    <tr className="comparison-table-row">
                        <td className="comparison-table-criteria-cell">
                            Work mode
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                className="comparison-table-cell"
                            >
                                {getWorkModeLabel(offer.workMode)}
                            </td>
                        ))}
                    </tr>

                    {/* Score row */}
                    <tr>
                        <td className="comparison-table-criteria-cell comparison-table-score-label">
                            Overall score
                        </td>
                        {offers.map((offer) => {
                            const score = computeScore(offer);
                            const isBest = bestOfferId === offer.id;

                            return (
                                <td
                                    key={offer.id}
                                    className={
                                        "comparison-table-cell comparison-table-score-cell" +
                                        (isBest
                                            ? " comparison-table-score-cell-best"
                                            : "")
                                    }
                                >
                                    {score.toFixed(2)}
                                    {isBest && (
                                        <span className="comparison-table-score-best-badge">
                                            (best)
                                        </span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OfferComparisonTable;