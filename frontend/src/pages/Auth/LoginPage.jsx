import { useState } from "react";
import { Shield, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
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

    try {
      const response = await api.post("/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      login(response.data.access_token);
      navigate("/dashboard");
      toast.success("Welcome back!");
    } catch (err) {
      const message = err.response?.data?.detail?.[0]?.msg || "Invalid email or password";
      toast.error(`Login failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Changed bg-gray-100 to relative overflow-hidden to contain the mesh
    <div className="min-h-screen relative overflow-hidden font-sans flex items-center justify-center">
      
      <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-2 text-slate-400 hover:text-blue-900 mb-8 transition-colors text-sm font-bold"
        >
          <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
      </button>

      {/* 2. Added the Background Mesh Layer */}
      <div className="absolute inset-0 animate-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 w-full max-w-xl px-4 my-10 flex flex-col items-center">
        {/* Heading Styling */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome Back!</h1>
        <p className="text-slate-500 text-base mb-10 font-medium">
          Log in to access your verification dashboard
        </p>

        {/* 3. Glassmorphism Card Upgrade */}
        <div className="w-full bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-10 py-10 transition-all duration-500">
          
          {/* Segmented Toggle Styling */}
          <div className="flex items-center p-1 bg-slate-200/50 rounded-2xl mb-8">
            <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-bold bg-white text-blue-900 rounded-xl shadow-sm transition-all">
                Login
            </Link>
            <Link to="/signup" className="flex-1 py-2.5 text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all">
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                // 4. Input Focus Ring Glow
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input 
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-500 transition-all"
                  />
                  <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* 5. Shimmering Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-[#154470] hover:bg-blue-800 text-white font-bold py-4 rounded-xl text-sm transition-all mt-2 disabled:opacity-70 shadow-lg shadow-blue-900/20 active:scale-[0.98] group"
              >
                {/* Shimmer Span */}
                <span className="absolute inset-0 w-full h-full transition duration-500 transform -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full"></span>
                
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
            </button>

            <p className="text-center text-sm text-slate-700 mt-2 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#154470] font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}