import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({ email, password, name })
    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key", {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key", {
      expiresIn: "7d",
    })

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
