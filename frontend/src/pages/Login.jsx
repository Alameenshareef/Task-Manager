"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log(email);
    console.log(password);
    
    

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl gap-10 md:grid-cols-[1.1fr,1fr] items-stretch">
        {/* Left side - branding */}
        <div className="hidden md:flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-500/25 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-4 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Task Manager · MERN + Vite
            </span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Stay on top of your work with a{" "}
              <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                crystal‑clear
              </span>{" "}
              task board.
            </h1>
            <p className="mt-4 text-sm text-slate-300/90 max-w-md">
              Organise tasks by priority, keep an eye on due dates and never miss an important deadline again.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-xs text-slate-200/80">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/40 px-4 py-3">
                <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">Tasks</p>
                <p className="mt-1 text-lg font-semibold">Smart filters</p>
              </div>
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/40 px-4 py-3">
                <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">Priorities</p>
                <p className="mt-1 text-lg font-semibold">Colour labels</p>
              </div>
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/40 px-4 py-3">
                <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">Files</p>
                <p className="mt-1 text-lg font-semibold">Attach docs</p>
              </div>
            </div>
            <p className="text-[0.7rem] text-slate-400">
              Designed with Tailwind CSS · Fully responsive
            </p>
          </div>
        </div>

        {/* Right side - form */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-50">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-400">Login to your account to manage your tasks.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
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
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-400 hover:to-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing you in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
