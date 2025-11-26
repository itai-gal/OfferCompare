import type { Offer } from "../types";

interface OfferCardProps {
    offer: Offer;
    onEdit: () => void;
    onDelete: () => void;
}

const OfferCard = ({ offer, onEdit, onDelete }: OfferCardProps) => {
    return (
        <article
            style={{
                padding: "1rem 1.25rem",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(15, 23, 42, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            }}
        >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ margin: 0 }}>{offer.company}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#4b5563" }}>{offer.title}</p>
                </div>
                <span
                    style={{
                        fontSize: "0.75rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: 999,
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        textTransform: "capitalize",
                    }}
                >
                    {offer.workMode}
                </span>
            </header>

            {offer.salary && (
                <p style={{ margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
                    <strong>Salary:</strong> {offer.salary.toLocaleString()} ₪
                </p>
            )}

            {offer.location && (
                <p style={{ margin: "0.1rem 0 0", fontSize: "0.9rem", color: "#4b5563" }}>
                    <strong>Location:</strong> {offer.location}
                </p>
            )}

            {offer.notes && (
                <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem", color: "#6b7280" }}>
                    {offer.notes}
                </p>
            )}

            <footer
                style={{
                    marginTop: "0.75rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.5rem",
                }}
            >
                <button
                    type="button"
                    onClick={onEdit}
                    style={{
                        padding: "0.25rem 0.7rem",
                        fontSize: "0.85rem",
                        borderRadius: 6,
                        border: "1px solid #d1d5db",
                        background: "#ffffff",
                        cursor: "pointer",
                    }}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    style={{
                        padding: "0.25rem 0.7rem",
                        fontSize: "0.85rem",
                        borderRadius: 6,
                        border: "1px solid #fecaca",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        cursor: "pointer",
                    }}
                >
                    Delete
                </button>
            </footer>
        </article>
    );
};

export default OfferCard;
