import { useState } from "react";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

toast.promise(
    api.post("/auth/token", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
    {
      loading: 'Verifying credentials...',
      success: (response) => {
        // Handle successful login
        login(response.data.access_token); 
        navigate("/dashboard");
        return "Welcome back!";
      },
      error: (err) => {
        // Handle specific error messages from the backend
        const message = err.response?.data?.detail?.[0]?.msg || "Invalid email or password";
        return `Login failed: ${message}`;
      },
    }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      <main className="flex flex-col items-center pt-16 pb-20 px-4">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-500 text-base mb-10">
          Log in to access your verification dashboard
        </p>

        {/* Card */}
        <div className="w-full max-w-xl bg-gray-50 rounded-2xl shadow-sm px-10 py-8">
          
          <div className="flex items-center justify-center gap-0 mb-8">
            <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-semibold bg-blue-900 text-white rounded-lg shadow-sm">
                Login
            </Link>
            <Link to="/signup" className="flex-1 py-2.5 text-center text-sm font-medium text-blue-700 rounded-lg hover:text-blue-900">
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter you password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setRemember(!remember)}
                    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                      remember
                        ? "bg-white border-blue-700"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {remember && (
                      <svg
                        viewBox="0 0 12 12"
                        className="w-3 h-3"
                        fill="none"
                      >
                        <polyline
                          points="1.5,6 4.5,9.5 10.5,2.5"
                          stroke="#1e3a6e"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:underline"
                >
                  Forgot Password ?
                </a>
              </div>
            </div>

            {/* Login button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors mt-1 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-400 mt-1">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}