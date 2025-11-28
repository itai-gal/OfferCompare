import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/user.model";

interface JwtPayload {
    id: string;
    email: string;
    role?: string;
}

function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
}

// POST /api/auth/register
export const registerHandler = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        const displayName =
            `${firstName ?? ""} ${lastName ?? ""}`.trim() ||
            (typeof email === "string" ? email.split("@")[0] : "User");

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: displayName,
            email,
            password: hashed,
            role: "user",
        });

        const token = signToken({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return res.status(201).json({
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch {
        return res.status(500).json({ message: "Failed to register user" });
    }
};

// POST /api/auth/login
export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = signToken({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return res.json({
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch {
        return res.status(500).json({ message: "Failed to login" });
    }
};

// GET /api/auth/me
export const meHandler = async (req: Request, res: Response) => {
    try {
        const authHeader = req.header("Authorization");
        const tokenHeader = req.header("x-auth-token");

        let token = "";

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (tokenHeader) {
            token = tokenHeader;
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
