const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

// Basic middleware
app.use(cors())
app.use(express.json())

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-landing-page')
  .then(() => {
    console.log('✅ MongoDB connected')
    
    // Mount auth routes AFTER MongoDB connection
    const authRoutes = require('./routes/auth')
    app.use('/api/auth', authRoutes)
    
    const favoritesRoutes = require('./routes/favorites')
    app.use('/api/favorites', favoritesRoutes)
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message)
  })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`✅ Ready at http://localhost:${PORT}`)
})
