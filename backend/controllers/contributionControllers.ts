import { Request, Response } from "express";
import Contribution from "../models/contributionModels";
import Event from "../models/eventModels";
import mongoose from "mongoose";

export const createContribution = async (req: Request, res: Response ) => {
    try {
        const { eventId } = req.params;
        const { amount } = req.body;
        const contributorUid = (req as any).uid;
        if(!amount || amount < 0) 
            return res.status(400).json({ message: "Invalid Contribution Amount" });
        const event = await Event.findById(eventId);
        if(!event) 
            return res.status(404).json({ message: "Event not found" });
        if(event.fundingStatus !== "open")
            return res.status(400).json({ message: "Funding is closed for this event" });
        const contribution = new Contribution({
            eventId: event._id,
            contributionUid: contributorUid,
            amount: amount
        });
        await contribution.save();
        event.currentAmount += amount;
        await event.save();
        res.status(201).json({ message: "Contribution successful", contribution });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getContributions = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const contributions = await Contribution.find({ eventId }).sort({ createdAt: -1 });
        res.status(200).json({ contributions });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}