import mongoose from "mongoose";
import { env } from "./env";

export async function connectDb(): Promise<void> {
    try {
        await mongoose.connect(env.mongoUri);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}