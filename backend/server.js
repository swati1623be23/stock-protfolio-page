const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ MongoDB connected')
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message)
})

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

// Test route
app.post("/api/test-signup", async (req, res) => {
  try {
    return res.json({ success: true, message: "Test route works" })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/favorites', require('./routes/favorites'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
