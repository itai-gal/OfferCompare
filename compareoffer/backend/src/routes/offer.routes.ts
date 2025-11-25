import { Router } from "express";
import {
    createOfferHandler,
    getMyOffersHandler,
    getOfferByIdHandler,
    updateOfferHandler,
    deleteOfferHandler,
} from "../controllers/offer.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import {
    validateCreateOffer,
    validateUpdateOffer,
} from "../validations/offer.validation";

const router = Router();

// All routes require auth
router.use(authMiddleware);

// POST /api/offers
router.post("/", validateCreateOffer, createOfferHandler);

// GET /api/offers
router.get("/", getMyOffersHandler);

// GET /api/offers/:id
router.get("/:id", getOfferByIdHandler);

// PUT /api/offers/:id
router.put("/:id", validateUpdateOffer, updateOfferHandler);

// DELETE /api/offers/:id
router.delete("/:id", deleteOfferHandler);

export default router;
