import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import {
    getMyOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
} from "../controllers/offer.controller";


const router = Router();

// GET /api/offers
router.get("/", auth, getMyOffers);

// GET /api/offers/:id
router.get("/:id", auth, getOfferById);

// POST /api/offers
router.post("/", auth, createOffer);

// PUT /api/offers/:id
router.put("/:id", auth, updateOffer);

// DELETE /api/offers/:id
router.delete("/:id", auth, deleteOffer);

export default router;