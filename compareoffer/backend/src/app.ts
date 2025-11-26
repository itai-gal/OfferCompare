import express, {
    type Application,
    type Request,
    type Response,
    type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./config/db";
import authRoutes from "./routes/auth.routes";
import offerRoutes from "./routes/offer.routes";

export function createApp(): Application {
    const app = express();

    // Connect to MongoDB
    connectDb();

    // Middlewares
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
        res.json({ status: "ok", service: "CompareOffer API" });
    });

    // Auth routes: /api/auth/...
    app.use("/api/auth", authRoutes);

    // Offer routes: /api/offers/...
    app.use("/api/offers", offerRoutes);

    // 404 handler
    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found" });
    });

    // Global error handler
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error("Unhandled error:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    );

    return app;
}
