import type { ChangeEvent } from "react";
import type { Offer } from "../types";

type OfferSelectorProps = {
    offers: Offer[];
    selectedIds: string[];
    hasOffers: boolean;
    onToggle: (offerId: string, checked: boolean) => void;
    onAddOfferClick: () => void;
};

const OfferSelector = ({
    offers,
    selectedIds,
    hasOffers,
    onToggle,
    onAddOfferClick,
}: OfferSelectorProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        onToggle(id, event.target.checked);
    };

    return (
        <section className="compare-section">
            <h2 className="section-title">
                {hasOffers ? "Select offers to compare" : "You do not have any offers yet"}
            </h2>

            <div className="compare-tags-wrapper">
                {!hasOffers && (
                    <p className="text-muted">
                        Start by creating at least one offer in the system.{" "}
                        <button
                            type="button"
                            className="link-button"
                            onClick={onAddOfferClick}
                        >
                            Click here
                        </button>{" "}
                        to add your first offer.
                    </p>
                )}

                {hasOffers && (
                    <div className="compare-tag-list">
                        {offers.map((offer) => {
                            const checked = selectedIds.includes(offer.id);
                            return (
                                <label
                                    key={offer.id}
                                    className={
                                        checked
                                            ? "compare-tag compare-tag-checked"
                                            : "compare-tag"
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e) => handleChange(e, offer.id)}
                                    />
                                    <span>
                                        {offer.company} – {offer.title}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OfferSelector;