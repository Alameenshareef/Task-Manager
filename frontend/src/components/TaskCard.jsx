"use client"

import { format } from "date-fns"
import { Trash2, Download } from "lucide-react"

export default function TaskCard({ task, onUpdate, onDelete }) {
  const priorityStyles = {
    low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    medium: "bg-amber-50 text-amber-700 ring-amber-100",
    high: "bg-rose-50 text-rose-700 ring-rose-100",
  }

  const statusStyles = {
    todo: "bg-slate-100 text-slate-700 ring-slate-200",
    "in-progress": "bg-blue-50 text-blue-700 ring-blue-100",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    overdue: "bg-rose-50 text-rose-700 ring-rose-100",
  }

  const dueDate = task.dueDate ? new Date(task.dueDate) : null
  const isOverdue = dueDate && task.status !== "completed" && dueDate < new Date()

  const handleStatusChange = (e) => {
    const value = e.target.value

    console.log(value);
    
    // Make sure this ID matches your data: _id or id
    onUpdate(task._id, { status: value })
  }

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      onDelete(task._id)
    }
  }

  return (
    <article className="group flex flex-col rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-md shadow-slate-200/80 backdrop-blur transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          aria-label="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </header>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem]">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ring-1 ${
            priorityStyles[task.priority] || priorityStyles.medium
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current/70" />
          {task.priority
            ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            : "Medium"}
        </span>

        {dueDate && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ring-1 ${
              isOverdue
                ? "bg-rose-50 text-rose-700 ring-rose-100"
                : "bg-slate-100 text-slate-700 ring-slate-200"
            }`}
          >
            {isOverdue ? "Overdue · " : "Due · "}
            {format(dueDate, "dd MMM, yyyy")}
          </span>
        )}

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ring-1 ${
            statusStyles[isOverdue ? "overdue" : task.status] || statusStyles.todo
          }`}
        >
          {isOverdue
            ? "Overdue"
            : task.status === "in-progress"
            ? "In progress"
            : task.status}
        </span>
      </div>

      {task.file && (
        <button
          type="button"
          className="mb-3 inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.7rem] font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => window.open(task.file, "_blank")}
        >
          <Download className="h-3.5 w-3.5" />
          Download attachment
        </button>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-dashed border-slate-200">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </article>
  )
}
