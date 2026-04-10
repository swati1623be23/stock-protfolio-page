const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const newUser = new User({ name, email, password })
    await newUser.save()
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    return res.json({ success: true, token, user: { id: newUser._id, name, email } })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })    
    if (!user) return res.status(401).json({ error: 'Invalid' })    
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid' })    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    return res.json({ success: true, token, user: { id: user._id, name: user.name, email } })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

module.exports = router
