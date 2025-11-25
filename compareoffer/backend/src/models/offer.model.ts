import { Schema, model, Document, Types } from "mongoose";

export type WorkMode = "onsite" | "hybrid" | "remote";

export interface IOffer extends Document {
    userId: Types.ObjectId;
    company: string;
    title: string;
    salary?: number;
    location?: string;
    workMode: WorkMode;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: Number,
        },
        location: {
            type: String,
            trim: true,
        },
        workMode: {
            type: String,
            enum: ["onsite", "hybrid", "remote"],
            default: "hybrid",
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Offer = model<IOffer>("Offer", offerSchema);
