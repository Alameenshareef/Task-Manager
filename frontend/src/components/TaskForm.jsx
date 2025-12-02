"use client"

import { useState } from "react"

export default function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("medium")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!title || !dueDate) {
      setError("Title and due date are required")
      return
    }

    onSubmit({ title, dueDate, priority, file })
    setTitle("")
    setDueDate("")
    setPriority("medium")
    setFile(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 shadow-lg shadow-slate-200/80 backdrop-blur sm:px-6 sm:py-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900">New task</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-medium text-slate-500 hover:text-slate-700"
        >
          Close
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Design homepage, fix API bug..."
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">Attachment</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0] || null)}
          className="block w-full text-[0.7rem] text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-50 hover:file:bg-slate-800"
        />
        <p className="text-[0.7rem] text-slate-400">Optional. Add screenshots, docs or any reference.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-slate-300/80 transition hover:bg-slate-800"
        >
          Create task
        </button>
      </div>
    </form>
  )
}
