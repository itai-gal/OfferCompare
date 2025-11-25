import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(128).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(128).required(),
});

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = registerSchema.validate(req.body, {
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

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = loginSchema.validate(req.body, {
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
