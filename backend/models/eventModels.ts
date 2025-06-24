import mongoose, { Document, Schema } from "mongoose"

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: string;
    participants: string[];
    organizingCommittee: {
        uid: string,
        role: string,
        name: string,
        photoUrl: string
    }[];
    committeeRequests: {
        uid: string,
        name: string,
        photoUrl: string,
        status: 'pending' | 'approved' | 'rejected'
    }[];
    fundingType: "public" | "private";
    goalAmount: number;
    currentAmount: number;
    fundingStatus: "open" | "closed";
}

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    createdBy: { type: String, required: true },
    participants: [{ type: String }],
    organizingCommittee: [{
        uid: String,
        role: String,
        name: String,
        photoUrl: String
    }],
    committeeRequests: [
        {
            uid: String,
            name: String,
            photoUrl: String,
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        }
    ],
    fundingType: { type: String, enum: ['public', 'private'], default: 'public'},
    goalAmount: { type: Number, default: 0 },
    currentAmount: { type: Number, default: 0 },
    fundingStatus: {type: String, enum: ['open', 'closed'], default: 'open'} 
}, { timestamps: true })

const Event = mongoose.model<IEvent>("Event", eventSchema)
export default Event