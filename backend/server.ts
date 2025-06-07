import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Event from "./models/eventModels.js"
import userRoutes from "./routes/userRoutes"
import User from "./models/userModels.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes)

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("MongoDB Connected"))
  .catch((error : Error) => console.log("DB Error: ", error.message))


app.post("/api/users", async(req, res) => {
    try {
        const {uid, name, email, photoUrl} = req.body
        let user  = await User.findOne({uid})
        if(!user){
            user = new User({uid, name, email, photoUrl})
            await user.save()
        }
        res.status(201).json({ message: "User saved successfully!" });
    } catch (error : any) {
        res.status(500).json({success: false, error : error.message})
    }
})

app.post("/api/events", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: "Event created successfully!", event });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/events", async(req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json(events)
    } catch (error : any) {
        res.status(501).json({error: error.message})
    }
})

app.post("/api/events/:id/join", async(req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if(!event) return res.status(404).json({error : "Event not found"})
        event.participants.push(req.body.userId)
        await event.save()
        res.json({message : "Joined Event successfully", event})
    } catch (error : any) {
        res.status(500).json({error : error.message})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
