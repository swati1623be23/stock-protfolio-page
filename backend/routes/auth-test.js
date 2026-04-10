const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }
    
    // Check if user exists
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    
    // Create user
    const newUser = new User({ name, email, password })
    await newUser.save()
    
    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    })
    
    return res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }
    
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    })
    
    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router
