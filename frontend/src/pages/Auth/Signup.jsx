import { useState } from "react";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext'; 

export default function SignupPage() {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handle = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const signupData = {
      first_name: form.firstName,
      last_name: form.lastName,
      business_name: form.businessName,
      email: form.email,
      password: form.password,
    };

    try {
      await api.post("/auth/signup", signupData);
      const loginData = new URLSearchParams();
      loginData.append("username", form.email);
      loginData.append("password", form.password);

      const loginResponse = await api.post("/auth/token", loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      login(loginResponse.data.access_token);
      navigate("/dashboard");
      toast.success("Account created! Welcome aboard 🎉");
    } catch (err) {
      let message = "Signup failed. Please try again.";
      if (err.response?.data) {
        if (typeof err.response.data === "object" && err.response.data.detail) {
          message = err.response.data.detail;
          if (Array.isArray(message)) message = message[0]?.msg || message;
        } else if (typeof err.response.data === "string") {
          message = err.response.data;
        }
      }
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Container setup for the background mesh
    <div className="min-h-screen relative overflow-hidden font-sans flex items-center justify-center py-12">
      
      {/* 2. Animated Background Layers */}
      <div className="absolute inset-0 animate-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 w-full max-w-xl px-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Create Your Account</h1>
        <p className="text-slate-500 text-base mb-8 font-medium text-center">Start building trust in your business relationships</p>

        {/* 3. Glassmorphism Card Upgrade */}
        <div className="w-full bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-10 py-10 transition-all duration-500">
          
          {/* Segmented Toggle Styling */}
          <div className="flex items-center p-1 bg-slate-200/50 rounded-2xl mb-8">
            <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all">
              Login
            </Link>
            <button className="flex-1 py-2.5 text-center text-sm font-bold bg-white text-blue-900 rounded-xl shadow-sm">
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">First Name</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handle("firstName")}
                  placeholder="First name"
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handle("lastName")}
                  placeholder="Last name"
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Business Name</label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={handle("businessName")}
                placeholder="Your business name"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Business Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handle("email")}
                placeholder="you@example.com"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handle("password")}
                  placeholder="Create a strong password"
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handle("confirmPassword")}
                  placeholder="Re-enter password"
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 4. Shimmering Sign Up Button */}
            <button 
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-[#154470] hover:bg-[#61a979] text-white font-bold py-4 rounded-xl text-sm transition-all mt-2 disabled:opacity-70 shadow-lg shadow-blue-900/20 active:scale-[0.98] group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-500 transform -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full"></span>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 
                  Processing...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm text-slate-400 mt-2 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}