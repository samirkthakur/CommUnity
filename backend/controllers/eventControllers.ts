import { Request, Response } from "express";
import Event from "../models/eventModels";
import User from "../models/userModels";
import mongoose from "mongoose";

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Create a new event
export const createEvents = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get event by id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event)
      return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Join an event
export const joinEvents = async (req: Request, res: Response) => {
  const uid = (req as any).uid;
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    const user = await User.findOne({ uid });

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!user) return res.status(404).json({ message: "Missing user" });

    if (!event.participants.includes(uid)) {
      event.participants.push(uid);
      await event.save();
    }

    if (!user.joinedEvents.includes(event._id as mongoose.Types.ObjectId)) {
      user.joinedEvents.push(event._id as mongoose.Types.ObjectId);
      await user.save();
    }

    res.json({ message: "Joined the event" });
  } catch (err: any) {
    res.status(500).json({ message: "Join event failed", error: err.message });
  }
};

// Add a member to organizing committee directly
export const addCommitteeMember = async (req: Request, res: Response) => {
  const { uid, role, name, photoUrl } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.organizingCommittee.push({ uid, role, name, photoUrl });
    await event.save();

    res.json({ message: "Member added to committee" });
  } catch (error) {
    res.status(500).json({ message: "Error adding committee member" });
  }
};

// Remove a member from organizing committee
export const removeCommitteeMember = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.organizingCommittee = event.organizingCommittee.filter(
      member => member.uid !== req.params.uid
    );

    await event.save();
    res.json({ message: "Member removed from committee" });
  } catch (error) {
    res.status(500).json({ message: "Error removing committee member" });
  }
};

// Get current organizing committee
export const getCommittee = async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  res.json(event.organizingCommittee);
};

// Request to join the committee
export const requestToJoinCommittee = async (req: Request, res: Response) => {
  const { uid, name, photoUrl } = req.body;
  const event = await Event.findById(req.params.eventId);

  if (!event) return res.status(404).json({ message: "Event not found" });

  const alreadyRequested = event.committeeRequests.find(r => r.uid === uid);
  if (alreadyRequested) return res.status(400).json({ message: "Already requested" });

  event.committeeRequests.push({ uid, name, photoUrl, status: "pending" });
  await event.save();

  res.status(201).json({ message: "Request submitted" });
};

// Get own request status
export const getOwnCommitteeRequest = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const event = await Event.findById(req.params.eventId);

  if (!event) return res.status(404).json({ message: "Event not found" });

  const request = event.committeeRequests.find(r => r.uid === uid);
  if (!request) return res.status(404).json({ message: "Request not found" });

  res.json(request);
};

// Get all committee requests (creator only)
export const getAllRequests = async (req: Request, res: Response) => {
  const uid = (req as any).uid;
  
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy !== uid) return res.status(403).json({ message: "Unauthorized" });

  res.json(event.committeeRequests);
};

// Handle request (approve/reject)
export const handleRequest = async (req: Request, res: Response) => {
  const creatorUid = (req as any).uid;
  const { uid: requestUid, action } = req.body;

  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy !== creatorUid) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const request = event.committeeRequests.find(r => r.uid === requestUid);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = action;

  if(action !== "approved" && action !== "rejected") {
    return res.status(400).json({ message: "Invalid action" });
  }

  if (action === "approved") {
    event.organizingCommittee.push({
      uid: request.uid,
      name: request.name,
      photoUrl: request.photoUrl,
      role: "Member"
    });
  }

  await event.save();
  res.status(201).json({ message: `Request ${action}` });
};

export const updateFundingStatus = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { fundingStatus } = req.body;
    const uid = (req as any).uid;
    if(!["open", "closed"].includes(fundingStatus)){
      return res.status(400).json({ message: "Invalid funding status" });
    }
    const event = await Event.findById(eventId);
    if(!event)
      return res.status(404).json({ message: "Event not found" });
    if(event.createdBy !== uid)
      return res.status(403).json({ message: "Unauthorized access" });
    event.fundingStatus = fundingStatus;
    await event.save();
    res.status(200).json({ message: "Funding status updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
