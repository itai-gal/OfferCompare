import type { Offer } from "../types";

export type ScoreWeights = {
    salary: number;
    workMode: number;
    location: number;
};

export const defaultWeights: ScoreWeights = {
    salary: 0.6,
    workMode: 0.25,
    location: 0.15,
};

export function normalizeSalary(salary: number | undefined): number {
    if (!salary || salary <= 0) return 0;
    const cap = 40000;
    const value = Math.min(salary, cap);
    return value / cap;
}

export function scoreWorkMode(workMode: Offer["workMode"]): number {
    if (workMode === "remote") return 1;
    if (workMode === "hybrid") return 0.7;
    return 0.4;
}

export function scoreLocation(location?: string): number {
    if (!location) return 0.4;
    const lower = location.toLowerCase();

    if (lower.includes("tel aviv")) return 1;
    if (lower.includes("center")) return 0.8;
    if (lower.includes("north") || lower.includes("south")) return 0.6;

    return 0.5;
}

export function computeOfferScore(offer: Offer, weights: ScoreWeights): number {
    const salaryScore = normalizeSalary(offer.salary);
    const workModeScore = scoreWorkMode(offer.workMode);
    const locationScore = scoreLocation(offer.location);

    return (
        salaryScore * weights.salary +
        workModeScore * weights.workMode +
        locationScore * weights.location
    );
}

export function getWorkModeLabel(mode: Offer["workMode"]): string {
    if (mode === "remote") return "Remote";
    if (mode === "hybrid") return "Hybrid";
    return "On-site";
}
