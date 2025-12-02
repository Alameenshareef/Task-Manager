import Task from "../models/Task.js"

const markOverdueTasks = async () => {
  try {
    const now = new Date()
    const result = await Task.updateMany(
      {
        dueDate: { $lt: now },
        status: { $ne: "completed" },
      },
      { status: "overdue" },
    )
    console.log(`Marked ${result.modifiedCount} tasks as overdue`)
  } catch (err) {
    console.error("Error marking overdue tasks:", err)
  }
}

export default markOverdueTasks
