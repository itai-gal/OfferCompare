import { Types } from "mongoose";
import { Offer, IOffer, WorkMode } from "../models/offer.model";

export type CreateOfferInput = {
    company: string;
    title: string;
    salary?: number;
    location?: string;
    workMode?: WorkMode;
    notes?: string;
};

export type UpdateOfferInput = Partial<CreateOfferInput>;

export const createOffer = async (
    userId: string,
    data: CreateOfferInput
): Promise<IOffer> => {
    const offer = await Offer.create({
        userId: new Types.ObjectId(userId),
        company: data.company,
        title: data.title,
        salary: data.salary,
        location: data.location,
        workMode: data.workMode || "hybrid",
        notes: data.notes,
    });

    return offer;
};

export const getUserOffers = async (userId: string): Promise<IOffer[]> => {
    return Offer.find({ userId: new Types.ObjectId(userId) }).sort({
        createdAt: -1,
    });
};

export const getOfferById = async (
    userId: string,
    offerId: string
): Promise<IOffer | null> => {
    return Offer.findOne({
        _id: new Types.ObjectId(offerId),
        userId: new Types.ObjectId(userId),
    });
};

export const updateOffer = async (
    userId: string,
    offerId: string,
    data: UpdateOfferInput
): Promise<IOffer | null> => {
    const updated = await Offer.findOneAndUpdate(
        {
            _id: new Types.ObjectId(offerId),
            userId: new Types.ObjectId(userId),
        },
        data,
        { new: true }
    );

    return updated;
};

export const deleteOffer = async (
    userId: string,
    offerId: string
): Promise<IOffer | null> => {
    const deleted = await Offer.findOneAndDelete({
        _id: new Types.ObjectId(offerId),
        userId: new Types.ObjectId(userId),
    });

    return deleted;
};
