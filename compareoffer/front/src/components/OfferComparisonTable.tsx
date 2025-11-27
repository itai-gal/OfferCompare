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
        <div
            style={{
                overflowX: "auto",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                marginTop: "1.25rem",
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
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <th
                            style={{
                                textAlign: "left",
                                padding: "0.8rem",
                                fontSize: "0.85rem",
                                color: "#6b7280",
                                width: "160px",
                            }}
                        >
                            Criteria
                        </th>
                        {offers.map((offer) => (
                            <th
                                key={offer.id}
                                style={{
                                    textAlign: "left",
                                    padding: "0.8rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: "0.15rem",
                                    }}
                                >
                                    {offer.company}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "#6b7280",
                                    }}
                                >
                                    {offer.title}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Salary row */}
                    <tr
                        style={{
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <td
                            style={{
                                padding: "0.7rem 0.8rem",
                                fontSize: "0.85rem",
                                color: "#374151",
                            }}
                        >
                            Salary (gross)
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                style={{
                                    padding: "0.7rem 0.8rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {offer.salary
                                    ? `₪${offer.salary.toLocaleString("he-IL")}`
                                    : "Not provided"}
                            </td>
                        ))}
                    </tr>

                    {/* Location row */}
                    <tr
                        style={{
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <td
                            style={{
                                padding: "0.7rem 0.8rem",
                                fontSize: "0.85rem",
                                color: "#374151",
                            }}
                        >
                            Location
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                style={{
                                    padding: "0.7rem 0.8rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {offer.location || "—"}
                            </td>
                        ))}
                    </tr>

                    {/* Work mode row */}
                    <tr
                        style={{
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <td
                            style={{
                                padding: "0.7rem 0.8rem",
                                fontSize: "0.85rem",
                                color: "#374151",
                            }}
                        >
                            Work mode
                        </td>
                        {offers.map((offer) => (
                            <td
                                key={offer.id}
                                style={{
                                    padding: "0.7rem 0.8rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {getWorkModeLabel(offer.workMode)}
                            </td>
                        ))}
                    </tr>

                    {/* Score row */}
                    <tr>
                        <td
                            style={{
                                padding: "0.8rem",
                                fontSize: "0.85rem",
                                color: "#111827",
                                fontWeight: 600,
                            }}
                        >
                            Overall score
                        </td>
                        {offers.map((offer) => {
                            const score = computeScore(offer);
                            const isBest = bestOfferId === offer.id;

                            return (
                                <td
                                    key={offer.id}
                                    style={{
                                        padding: "0.8rem",
                                        fontSize: "0.9rem",
                                        fontWeight: isBest ? 700 : 500,
                                        backgroundColor: isBest
                                            ? "#ecfdf5"
                                            : "transparent",
                                        color: isBest ? "#166534" : "#111827",
                                        borderLeft: "1px solid #e5e7eb",
                                    }}
                                >
                                    {score.toFixed(2)}
                                    {isBest && (
                                        <span
                                            style={{
                                                marginLeft: "0.4rem",
                                                fontSize: "0.8rem",
                                            }}
                                        >
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
