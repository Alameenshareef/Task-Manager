import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import "express-async-errors"
import cron from "node-cron"

// Import routes
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"

// Import cron job
import markOverdueTasks from "./cron/overdue-cron.js"

// Load environment variables
dotenv.config()

const app = express()

app.use(
  cors({
    origin: "https://task-manager-jer1.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://mudiir:UGgLAbbXMwRSVx5j@cluster0.n2gryin.mongodb.net/taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.json("Hello")
})
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || "Server error" })
})

// Cron job - Mark overdue tasks every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running daily overdue check...")
  markOverdueTasks()
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
