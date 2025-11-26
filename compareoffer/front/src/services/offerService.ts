import { apiFetch } from "./apiClient";
import type { Offer } from "../types";

export interface OfferPayload {
    company: string;
    title: string;
    salary?: number;
    location?: string;
    workMode: "onsite" | "remote" | "hybrid";
    notes?: string;
}

// GET /offers – get all offers of logged user
export function getMyOffers(token: string): Promise<Offer[]> {
    return apiFetch<Offer[]>("/api/offers", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// POST /offers – create a new offer
export function createOffer(token: string, payload: OfferPayload): Promise<Offer> {
    return apiFetch<Offer>("/api/offers", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
}

// PUT /offers/:id – update an existing offer
export function updateOffer(token: string, id: string, payload: OfferPayload): Promise<Offer> {
    return apiFetch<Offer>(`/api/offers/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
}

// DELETE /offers/:id
export function deleteOffer(token: string, id: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/api/offers/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// GET /offers/:id – get a single offer
export function getOfferById(token: string, id: string): Promise<Offer> {
    return apiFetch<Offer>(`/api/offers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
