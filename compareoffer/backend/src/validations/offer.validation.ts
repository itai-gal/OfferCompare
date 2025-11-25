import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const workModeValues = ["onsite", "hybrid", "remote"] as const;

const createOfferSchema = Joi.object({
    company: Joi.string().min(2).max(100).required(),
    title: Joi.string().min(2).max(100).required(),
    salary: Joi.number().min(0).optional(),
    location: Joi.string().min(2).max(100).optional(),
    workMode: Joi.string()
        .valid(...workModeValues)
        .optional(),
    notes: Joi.string().max(1000).optional(),
});

const updateOfferSchema = createOfferSchema.fork(
    ["company", "title"],
    (schema) => schema.optional()
);

export const validateCreateOffer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = createOfferSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map((d) => d.message),
        });
    }

    next();
};

export const validateUpdateOffer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = updateOfferSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map((d) => d.message),
        });
    }

    next();
};
