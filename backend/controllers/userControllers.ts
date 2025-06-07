import { Request, Response } from "express"
import User from "../models/userModels"
import Event from "../models/eventModels"

export const createOrUpdateUser = async (req: Request, res: Response) => {
    const { uid, name, email, photoUrl } = req.body
    try {
        let user = await User.findOne({ uid })
        if(!user){
            user = new User({ uid, name, email, photoUrl })
            await user.save()
        }
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({ err: "Error saving user" })
    }
}

export const getUserByUID = async (req: Request, res: Response) =>{
    try {
        const user = await User.findOne({ uid: req.params.uid })
        if(!user) return res.status(404).json({ message: "User not found" })
        res.json(user)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid
        const user = await User.findOne({ uid })
        if(!user) return res.status(404).json({ message: "User not found" })
        const joinedEvents = await Event.find({ participants: uid})
        const createdEvents = await Event.find({ createdBy: uid })
        

        res.json({
            name: user.name,
            email: user.showEmail ? user.email : null,
            photoUrl: user.photoUrl,
            bio: user.bio,
            phoneNumber: user.showPhoneNumber ? user.phoneNumber : null,
            socialHandle: user.socialHandle,
            interests: user.interests,
            showEmail: user.showEmail,
            showPhoneNumber: user.showPhoneNumber,
            joinedEvents,
            createdEvents
        })
    } catch (err) {
        res.status(500).json({ message: "Server error: Fetching user failed" })
    }
}

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const {
            bio,
            phoneNumber,
            socialHandle,
            interests,
            showEmail,
            showPhoneNumber
        } = req.body;
        const user = await User.findOneAndUpdate(
            { uid },
            {
                bio,
                phoneNumber,
                socialHandle,
                interests,
                showEmail,
                showPhoneNumber
            },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error: Updating user profile failed" })
    }
}