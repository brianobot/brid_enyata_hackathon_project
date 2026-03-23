import React from 'react'
// Added Navigate and fixed the alias usage
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/Auth/Signup' 
import LoginPage from './pages/Auth/LoginPage'
import LandingPage from './pages/LandingPage/LandingPage'

const App = () => {
  return (
    <Router> {/* Use the 'Router' alias from your import */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Redirect unknown routes back home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  ) 
}

export default App