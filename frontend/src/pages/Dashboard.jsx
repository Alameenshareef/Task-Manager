"use client"

import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import TaskForm from "../components/TaskForm"
import TaskCard from "../components/TaskCard"
import { LogOut, Plus } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTasks(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchTasks()
    }
  }, [token])

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => (filter === "all" ? true : task.status === filter))
      .filter((task) =>
        search.trim()
          ? task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description || "").toLowerCase().includes(search.toLowerCase())
          : true,
      )
  }, [tasks, filter, search])

  const stats = useMemo(() => {
    const total = tasks.length
    const todo = tasks.filter((t) => t.status === "todo").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const completed = tasks.filter((t) => t.status === "completed").length
    return { total, todo, inProgress, completed }
  }, [tasks])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleCreateTask = async ({ title, dueDate, priority, file }) => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("dueDate", dueDate)
      formData.append("priority", priority)
      if (file) {
        formData.append("file", file)
      }

      const res = await axios.post(`${API_URL}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTasks((prev) => [res.data, ...prev])
      setShowForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/tasks/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks((prev) => prev.map((task) => (task._id === id ? res.data : task)))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks((prev) => prev.filter((task) => task._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Task Manager
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-50 sm:text-3xl">
              Hi {user?.name || "there"},
              <span className="ml-2 bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text text-transparent">
                let&apos;s get things done.
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Create tasks, set priorities and keep your work flowing in a beautiful dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-md shadow-slate-400/40 transition hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              New task
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="mt-6 grid flex-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1.15fr)]">
          {/* Task list */}
          <section className="flex flex-col rounded-3xl border border-slate-800/60 bg-slate-900/60 p-4 backdrop-blur sm:p-5">
            <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {["all", "todo", "in-progress", "completed"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`rounded-2xl px-3 py-1.5 text-xs font-medium transition ${
                      filter === value
                        ? "bg-slate-50 text-slate-900 shadow-sm shadow-slate-300"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                    }`}
                  >
                    {value === "all"
                      ? "All"
                      : value === "todo"
                      ? "To do"
                      : value === "in-progress"
                      ? "In progress"
                      : "Completed"}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[0.7rem] text-slate-500">
                  ⌘K
                </span>
              </div>
            </div>

            <div className="mt-4 flex-1 overflow-auto">
              {loading ? (
                <div className="flex h-40 items-center justify-center text-sm text-slate-400">
                  Loading tasks...
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm font-medium text-slate-200">No tasks found</p>
                  <p className="max-w-xs text-xs text-slate-400">
                    Try changing the filter, clearing the search or creating a new task.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-4 lg:space-y-5">
            {/* Stats */}
            <div className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-4 backdrop-blur sm:p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Overview
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
                  <p className="text-[0.7rem] text-slate-400">Total</p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">{stats.total}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
                  <p className="text-[0.7rem] text-slate-400">To do</p>
                  <p className="mt-1 text-xl font-semibold text-amber-300">{stats.todo}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
                  <p className="text-[0.7rem] text-slate-400">In progress</p>
                  <p className="mt-1 text-xl font-semibold text-sky-300">{stats.inProgress}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3">
                  <p className="text-[0.7rem] text-slate-400">Completed</p>
                  <p className="mt-1 text-xl font-semibold text-emerald-300">{stats.completed}</p>
                </div>
              </div>
            </div>

            {/* Create task panel */}
            {showForm ? (
              <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="flex w-full items-center justify-between rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-4 text-left text-sm text-slate-200 shadow-sm shadow-slate-900/40 transition hover:border-blue-500/70 hover:bg-slate-900"
              >
                <div>
                  <p className="font-semibold text-slate-50">Quick add</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Capture a new task with due date, priority and attachment.
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 shadow-sm shadow-slate-200/80">
                  <Plus className="h-4 w-4" />
                </div>
              </button>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
