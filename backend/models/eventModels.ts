import mongoose, { Document, Schema } from "mongoose"

export interface IEvent extends Document {
    title: string,
    description: string,
    date: Date,
    location: string,
    createdBy: string,
    participants: string[]

}

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    createdBy: { type: String, required: true },
    participants: [{ type: String }]
}, {timestamps: true})

const Event = mongoose.model<IEvent>("Event", eventSchema)
export default Event