import dotenv from "dotenv";

dotenv.config();

/**
 * Helper to ensure required environment variables exist.
 */
function required(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

/**
 * All environment variables used by the backend.
 */
export const env = {
    nodeEnv: process.env.NODE_ENV || "development",

    port: parseInt(process.env.PORT || "5000", 10),

    mongoUri: required(process.env.MONGO_URI, "MONGO_URI"),

    jwtSecret: required(process.env.JWT_SECRET, "JWT_SECRET"),

    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};
