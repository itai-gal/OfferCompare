import type { Offer } from "../types";

interface OfferCardProps {
    offer: Offer;
    onEdit: () => void;
    onDelete: () => void;
}

const OfferCard = ({ offer, onEdit, onDelete }: OfferCardProps) => {
    return (
        <article className="card offer-card">
            <header className="offer-card-header">
                <div>
                    <h3 className="offer-card-company">{offer.company}</h3>
                    <p className="offer-card-title">{offer.title}</p>
                </div>
                <span className="offer-card-tag">{offer.workMode}</span>
            </header>

            {offer.salary && (
                <p className="offer-card-row">
                    <strong>Salary:</strong>{" "}
                    {offer.salary.toLocaleString()} ₪
                </p>
            )}

            {offer.location && (
                <p className="offer-card-row offer-card-row-muted">
                    <strong>Location:</strong> {offer.location}
                </p>
            )}

            {offer.notes && (
                <p className="offer-card-notes">{offer.notes}</p>
            )}

            <footer className="offer-card-actions">
                <button
                    type="button"
                    onClick={onEdit}
                    className="btn btn-secondary small"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="btn btn-outline-danger small"
                >
                    Delete
                </button>
            </footer>
        </article>
    );
};

export default OfferCard;