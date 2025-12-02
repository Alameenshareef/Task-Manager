"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTask(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token && id) {
      fetchTask()
    }
  }, [id, token])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        Loading task...
      </div>
    )
  }

  if (!task) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-200">
        <p className="mb-4 text-sm">Task not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-xs font-medium text-slate-400 hover:text-slate-200"
        >
          ← Back to dashboard
        </button>

        <h1 className="text-2xl font-semibold text-slate-50">{task.title}</h1>
        {task.description && (
          <p className="mt-2 text-sm text-slate-300">{task.description}</p>
        )}

        <div className="mt-4 grid gap-3 text-xs text-slate-200 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
            <p className="text-[0.7rem] text-slate-400">Status</p>
            <p className="mt-1 text-sm font-semibold">{task.status}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
            <p className="text-[0.7rem] text-slate-400">Priority</p>
            <p className="mt-1 text-sm font-semibold capitalize">{task.priority}</p>
          </div>
          {task.dueDate && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
              <p className="text-[0.7rem] text-slate-400">Due date</p>
              <p className="mt-1 text-sm font-semibold">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {task.file && (
          <button
            onClick={() => window.open(task.file, "_blank")}
            className="mt-5 inline-flex items-center rounded-2xl bg-slate-200 px-4 py-2 text-xs font-medium text-slate-900"
          >
            Download attachment
          </button>
        )}
      </div>
    </div>
  )
}
