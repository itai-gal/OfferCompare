export type WorkMode = "onsite" | "hybrid" | "remote";

export interface Offer {
    id: string; // frontend-friendly id (mapped from _id)
    company: string;
    title: string;
    salary?: number;
    location?: string;
    workMode: WorkMode;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
