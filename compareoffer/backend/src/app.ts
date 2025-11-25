import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import offerRoutes from "./routes/offer.routes";

export function createApp() {
    const app = express();

    // Basic middlewares
    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );
    app.use(morgan("dev"));

    // Health check
    app.get("/api/health", (_req: Request, res: Response) => {
        res.json({ status: "ok", service: "CompareOffer API (basic)" });
    });

    // Auth routes (register, login, me)
    app.use("/api/auth", authRoutes);

    // Offer routes
    app.use("/api/offers", offerRoutes);

    // 404 handler for unknown /api routes
    app.use("/api", (_req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found" });
    });

    // Global error handler
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error(err);
            res.status(err.status || 500).json({
                message: err.message || "Internal server error",
            });
        }
    );

    return app;
}
