"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await register(name, email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl gap-10 md:grid-cols-[1fr,1.1fr] items-stretch">
        {/* Left side - form */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-50">Create an account</h2>
              <p className="mt-1 text-sm text-slate-400">Sign up to start tracking your tasks in one place.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                placeholder="Alex Doe"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
              Login
            </Link>
          </p>
        </div>

        {/* Right side - highlight */}
        <div className="hidden md:flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-4 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80">
              Plan. Prioritise. Ship.
            </span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Turn messy to‑do lists into a{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                clean task pipeline.
              </span>
            </h1>
            <p className="mt-4 text-sm text-slate-200/90 max-w-md">
              Group tasks by status, highlight urgent work with priorities and attach documents for more context.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-xs text-slate-100/90">
            <div className="rounded-2xl border border-slate-700/90 bg-slate-900/50 px-4 py-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">Quick overview</p>
              <p className="mt-1 text-lg font-semibold">Dashboard view</p>
            </div>
            <div className="rounded-2xl border border-slate-700/90 bg-slate-900/50 px-4 py-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">Deadlines</p>
              <p className="mt-1 text-lg font-semibold">Due date badges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
