import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: String,
    email: String,
    photoUrl: String,
    phoneNumber: String,
    bio: String,
    socialHandle: String,
    interests: [String],
    showEmail: { type: Boolean, default: false},
    showPhoneNumber: { type: Boolean, default: false },
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User