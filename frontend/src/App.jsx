import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx';
import SignupPage from './pages/Auth/Signup' 
import LoginPage from './pages/Auth/LoginPage'
import LandingPage from './pages/LandingPage/LandingPage'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Redirect unknown routes back home */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  ) 
}

export default App