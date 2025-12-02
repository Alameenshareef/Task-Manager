import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed", "overdue"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    attachment: {
      filename: String,
      path: String,
      mimetype: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Task", taskSchema)
