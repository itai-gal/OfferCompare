import mongoose from "mongoose";
import { env } from "./env";

/**
 * Connects to MongoDB using Mongoose.
 */
export async function connectToDatabase() {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(error);
        process.exit(1);
    }
}
