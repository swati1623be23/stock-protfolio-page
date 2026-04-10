const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Get user favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json(user.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add favorite stock
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { symbol, name } = req.body
    const user = await User.findById(req.userId)
    
    // Check if already exists
    const exists = user.favorites.find(f => f.symbol === symbol)
    if (exists) {
      return res.status(400).json({ message: 'Stock already in favorites' })
    }
    
    user.favorites.push({ symbol, name })
    await user.save()
    
    res.json({ message: 'Added to favorites', favorites: user.favorites })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Remove favorite stock
router.delete('/:symbol', authMiddleware, async (req, res) => {
  try {
    const { symbol } = req.params
    const user = await User.findById(req.userId)
    
    user.favorites = user.favorites.filter(f => f.symbol !== symbol)
    await user.save()
    
    res.json({ message: 'Removed from favorites', favorites: user.favorites })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router