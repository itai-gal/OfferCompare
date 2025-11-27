import type { Offer } from "../types";

type ComparisonTableProps = {
    offers: Offer[];
    computeScore: (offer: Offer) => number;
};

const ComparisonTable = ({ offers, computeScore }: ComparisonTableProps) => {
    if (offers.length === 0) {
        return (
            <p className="text-muted">
                Select at least one offer to see the comparison table.
            </p>
        );
    }

    return (
        <section className="compare-section">
            <h2 className="section-title">Detailed comparison</h2>

            <div className="compare-table-wrapper">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Work mode</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer.id}>
                                <td>{offer.company}</td>
                                <td>{offer.title}</td>
                                <td>{offer.salary ? `₪${offer.salary.toLocaleString()}` : "-"}</td>
                                <td>{offer.location || "-"}</td>
                                <td>{offer.workMode}</td>
                                <td>{computeScore(offer).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ComparisonTable;