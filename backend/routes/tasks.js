import express from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { auth } from "../middleware/auth.js"
import Task from "../models/Task.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["application/pdf", "image/jpeg", "image/png", "image/gif"]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only PDF and image files are allowed"), false)
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

// Get all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ dueDate: 1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create task
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, dueDate, priority, status } = req.body

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" })
    }

    const task = new Task({
      userId: req.userId,
      title,
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      status: status || "todo",
      attachment: req.file
        ? {
            filename: req.file.filename,
            path: `/api/uploads/${req.file.filename}`,
            mimetype: req.file.mimetype,
          }
        : null,
    })

    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Update task
router.put("/:id", auth, upload.single("file"), async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId })
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (req.body.title) task.title = req.body.title
    if (req.body.dueDate) task.dueDate = new Date(req.body.dueDate)
    if (req.body.status) task.status = req.body.status
    if (req.body.priority) task.priority = req.body.priority

    if (req.file) {
      task.attachment = {
        filename: req.file.filename,
        path: `/api/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
      }
    }

    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
