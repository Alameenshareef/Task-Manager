"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()
const API_URL = import.meta.env.VITE_API_URL || "https://task-manager-2-501n.onrender.com"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    setLoading(false)
  }, [token])

  const register = async (name,email,password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {name,email,password })
    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem("token", response.data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
    return response.data
  }

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem("token", response.data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
    return response.data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
