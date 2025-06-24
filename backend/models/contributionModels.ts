import mongoose, { Document, Schema } from "mongoose";

export interface IContribution extends Document {
    eventId: String;
    contributionUid: String;
    amount: number;
    timestamp: Date;
}

const contributionSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    contributionUid: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true })

const Contribution = mongoose.model("Contribution", contributionSchema);
export default Contribution;