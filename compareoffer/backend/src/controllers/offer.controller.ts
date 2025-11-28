import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Offer, type IOffer } from "../models/offer.model";

/**
 * GET /api/offers
 * Get all offers for the logged-in user.
 */
export const getMyOffers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const offers = await Offer.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });

        return res.json(
            offers.map((offer: IOffer) => ({
                id: offer._id.toString(),
                company: offer.company,
                title: offer.title,
                salary: offer.salary,
                location: offer.location,
                workMode: offer.workMode,
                notes: offer.notes,
                createdAt: offer.createdAt,
                updatedAt: offer.updatedAt,
            }))
        );
    } catch {
        return res.status(500).json({ message: "Failed to load offers" });
    }
};

/**
 * GET /api/offers/:id
 */
export const getOfferById = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        const offer = await Offer.findOne({ _id: id, userId: req.user.id });

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        return res.json({
            id: offer._id.toString(),
            company: offer.company,
            title: offer.title,
            salary: offer.salary,
            location: offer.location,
            workMode: offer.workMode,
            notes: offer.notes,
            createdAt: offer.createdAt,
            updatedAt: offer.updatedAt,
        });
    } catch {
        return res.status(500).json({ message: "Failed to load offer" });
    }
};

/**
 * POST /api/offers
 */
export const createOffer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { company, title, salary, location, workMode, notes } = req.body;

        const offer = await Offer.create({
            userId: req.user.id,
            company,
            title,
            salary,
            location,
            workMode,
            notes,
        });

        return res.status(201).json({
            id: offer._id.toString(),
            company: offer.company,
            title: offer.title,
            salary: offer.salary,
            location: offer.location,
            workMode: offer.workMode,
            notes: offer.notes,
            createdAt: offer.createdAt,
            updatedAt: offer.updatedAt,
        });
    } catch {
        return res.status(500).json({ message: "Failed to create offer" });
    }
};

/**
 * PUT /api/offers/:id
 */
export const updateOffer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const { company, title, salary, location, workMode, notes } = req.body;

        const offer = await Offer.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { company, title, salary, location, workMode, notes },
            { new: true }
        );

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        return res.json({
            id: offer._id.toString(),
            company: offer.company,
            title: offer.title,
            salary: offer.salary,
            location: offer.location,
            workMode: offer.workMode,
            notes: offer.notes,
            createdAt: offer.createdAt,
            updatedAt: offer.updatedAt,
        });
    } catch {
        return res.status(500).json({ message: "Failed to update offer" });
    }
};

/**
 * DELETE /api/offers/:id
 */
export const deleteOffer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        const offer = await Offer.findOneAndDelete({
            _id: id,
            userId: req.user.id,
        });

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        return res.json({ message: "Offer deleted" });
    } catch {
        return res.status(500).json({ message: "Failed to delete offer" });
    }
};