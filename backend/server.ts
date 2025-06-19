import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes"
import eventRoutes from "./routes/eventRoutes"
import contributionRoutes from "./routes/contributionRoutes"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/contributions", contributionRoutes)


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("MongoDB Connected"))
  .catch((error : Error) => console.log("DB Error: ", error.message))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
