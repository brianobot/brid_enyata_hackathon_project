import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider.jsx';
import SignupPage from './pages/Auth/Signup' 
import LoginPage from './pages/Auth/LoginPage'
import LandingPage from './pages/LandingPage/LandingPage'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PublicProfile from './pages/Profile/PublicProfile.jsx';
import VerificationFlow from './pages/Verification/VerificationFlow';
import SettingsPage from './pages/settings/SettingsPage.jsx';
import UserProfile from './pages/Profile/UserProfile.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/:businessId" element={<PublicProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verify" 
            element={
              <ProtectedRoute>
                <VerificationFlow />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/settings/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  ) 
}

export default App