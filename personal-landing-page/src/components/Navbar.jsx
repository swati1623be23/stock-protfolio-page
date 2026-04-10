import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { logout } from '../services/api'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    setIsLoggedIn(!!token)
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [location])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUser(null)
    navigate('/')
  }

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={isLoggedIn ? "/home" : "/"} className="logo">Swati</Link>
        {isLoggedIn && (
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <span className="user-greeting">Welcome, {user?.name}!</span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar


