import { Response, NextFunction } from "express";
import * as offerService from "../services/offer.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createOfferHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const offer = await offerService.createOffer(req.user.id, req.body);
        res.status(201).json(offer);
    } catch (error) {
        next(error);
    }
};

export const getMyOffersHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const offers = await offerService.getUserOffers(req.user.id);
        res.status(200).json(offers);
    } catch (error) {
        next(error);
    }
};

export const getOfferByIdHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const offer = await offerService.getOfferById(
            req.user.id,
            req.params.id as string
        );

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json(offer);
    } catch (error) {
        next(error);
    }
};

export const updateOfferHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const offer = await offerService.updateOffer(
            req.user.id,
            req.params.id as string,
            req.body
        );

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json(offer);
    } catch (error) {
        next(error);
    }
};

export const deleteOfferHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const deleted = await offerService.deleteOffer(
            req.user.id,
            req.params.id as string
        );

        if (!deleted) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        next(error);
    }
};
