import axios from 'axios'

const BACKEND_URL = 'https://stock-protfolio-page.onrender.com'
const API_KEY = 'd7btqlhr01quh9fboj00d7btqlhr01quh9fboj0g'
const BASE_URL = 'https://finnhub.io/api/v1'

// Create axios instance with auth token
const api = axios.create({
  baseURL: BACKEND_URL,
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Stock list
export const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' }
]

// Authentication functions
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', { name, email, password })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { success: true, user }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Signup failed' }
  }
}

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { success: true, user }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Favorites functions
export const getFavorites = async () => {
  try {
    const response = await api.get('/favorites')
    return { success: true, favorites: response.data }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to get favorites' }
  }
}

export const addFavorite = async (symbol, name) => {
  try {
    const response = await api.post('/favorites', { symbol, name })
    return { success: true, favorite: response.data }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to add favorite' }
  }
}

export const removeFavorite = async (symbol) => {
  try {
    const response = await api.delete(`/favorites/${symbol}`)
    return { success: true }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to remove favorite' }
  }
}

// Ek stock ka data lao
export const getStockQuote = async (symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol: symbol,
        token: API_KEY
      }
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error.message)
    // Return mock data if API fails
    return {
      c: 100 + Math.random() * 50,
      d: Math.random() * 10 - 5,
      dp: Math.random() * 5 - 2.5,
      h: 110 + Math.random() * 50,
      l: 90 + Math.random() * 50,
      o: 100 + Math.random() * 40,
      v: Math.floor(Math.random() * 10000000)
    }
  }
}

// Sab stocks ka data lao
export const getAllStocksData = async () => {
  try {
    const promises = STOCKS.map(stock => getStockQuote(stock.symbol))
    const results = await Promise.all(promises)
    
    return STOCKS.map((stock, index) => ({
      ...stock,
      data: results[index]
    }))
  } catch (error) {
    console.error('Error loading stocks:', error)
    // Return stocks with mock data if everything fails
    return STOCKS.map(stock => ({
      ...stock,
      data: {
        c: 100 + Math.random() * 50,
        d: Math.random() * 10 - 5,
        dp: Math.random() * 5 - 2.5,
        h: 110 + Math.random() * 50,
        l: 90 + Math.random() * 50,
        o: 100 + Math.random() * 40,
        v: Math.floor(Math.random() * 10000000)
      }
    }))
  }
}