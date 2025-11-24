import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

export function createApp() {
    const app = express();

    const PORT = 5000; // just for reference, not used here

    // Basic middlewares
    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );
    app.use(morgan("dev"));

    // Health check endpoint
    app.get("/api/health", (_req: Request, res: Response) => {
        res.json({ status: "ok", service: "CompareOffer API (basic)" });
    });

    // app.use("/api/auth", authRoutes);
    // app.use("/api/offers", offersRoutes);
    // app.use("/api/admin", adminRoutes);

    // for every undefined route under /api
    app.use("/api", (_req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found" });
    });

    // general error handler
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: any, _req: Request, res: Response, _next: any) => {
            console.error(err);
            res.status(err.status || 500).json({
                message: err.message || "Internal server error",
            });
        }
    );

    return app;
}
