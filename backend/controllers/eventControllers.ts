import { Request, Response } from "express"
import Event from "../models/eventModels"
import User from "../models/userModels"
import mongoose from "mongoose"

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({message: "Error fetching events"})
    }
}

export const createEvents = async (req: Request, res: Response) => {
    try {
        const event = new Event(req.body)
        await event.save()
        res.status(201).json({message: "Event created successfully", event})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}

export const joinEvents = async (req: Request, res: Response) => {
    const { userId } = req.body
    const eventId = req.params.id
    try {
        const event  = await Event.findById(eventId)
        const user = await User.findOne({ uid: userId })
        if(!event) return res.status(404).json({message: "Event not found"})
        if(!user) return res.status(404).json({message: "Missing user"})
        if(!event.participants.includes(userId)){
            event.participants.push(userId)
            await event.save()
        }
        if(!user.joinedEvents.includes(event._id as mongoose.Types.ObjectId)){
            user.joinedEvents.push(event._id as mongoose.Types.ObjectId)
            await user.save()
        }
        res.json({message: "Joined the event"})
    } catch (err: any) {
        res.status(500).json({message: "Join event failed", error: err.message})
    }
}