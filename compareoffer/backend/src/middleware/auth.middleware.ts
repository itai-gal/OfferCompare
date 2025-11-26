import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface JwtPayload {
    id: string;
    email: string;
    role?: string;
}

// Extend Express Request to include user
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const auth = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.header("Authorization");
        const tokenHeader = req.header("x-auth-token");

        let token = "";

        // Support "Authorization: Bearer <token>"
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (tokenHeader) {
            // Also support "x-auth-token: <token>" (for Postman / old clients)
            token = tokenHeader;
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const requireAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
};
