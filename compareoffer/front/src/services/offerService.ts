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

// Get all offers for the logged-in user
export function getMyOffers(token: string): Promise<Offer[]> {
    return apiFetch("/api/offers", {
        headers: { Authorization: `Bearer ${token}` },
    });
}

// Create new offer
export function createOffer(
    token: string,
    payload: OfferPayload
): Promise<Offer> {
    return apiFetch("/api/offers", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
}

// Update offer by id
export function updateOffer(
    token: string,
    id: string,
    payload: OfferPayload
): Promise<Offer> {
    return apiFetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
}

// Delete offer
export function deleteOffer(
    token: string,
    id: string
): Promise<{ message: string }> {
    return apiFetch(`/api/offers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
}

// Get single offer by id
export function getOfferById(
    token: string,
    id: string
): Promise<Offer> {
    return apiFetch(`/api/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
