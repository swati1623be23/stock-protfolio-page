import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  const token = localStorage.getItem('token')

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" replace /> : <AuthPage />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/about" element={<ProtectedRoute element={<AboutPage />} />} />
        <Route path="/skills" element={<ProtectedRoute element={<SkillsPage />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App


