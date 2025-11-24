import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

// POST /api/auth/register
export const registerHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// POST /api/auth/login
export const loginHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me
export const meHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // For now this is a fake user. Later we will read from JWT.
        const result = await authService.getCurrentUser();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
