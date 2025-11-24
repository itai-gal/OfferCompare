import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 5000;

// Middlewares
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

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 CompareOffer Backend running on http://localhost:${PORT}`);
});
