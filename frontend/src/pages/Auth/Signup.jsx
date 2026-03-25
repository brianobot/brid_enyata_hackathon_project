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
  const [agreed, setAgreed] = useState(false);

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

    // Validate passwords match
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
      // 1. Create the account
      await api.post("/auth/signup", signupData);

      // 2. Automatically log the user in using the same credentials
      const loginData = new URLSearchParams();
      loginData.append("username", form.email);
      loginData.append("password", form.password);

      const loginResponse = await api.post("/auth/token", loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // 3. Save token and update auth context
      login(loginResponse.data.access_token);

      // 4. Navigate to dashboard
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
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="flex flex-col items-center pt-12 pb-16 px-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Create Your Account</h1>
        <p className="text-gray-500 text-base mb-8">Start building trust in your business relationships</p>

        <div className="w-full max-w-xl bg-gray-50 rounded-2xl shadow-sm px-10 py-8">
          <div className="flex items-center justify-center gap-0 mb-8 bg-gray-50 rounded-xl p-1">
            <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-colors hover:text-blue-900">
              Login
            </Link>
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-blue-900 text-white shadow-sm">
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">First Name</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handle("firstName")}
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Last Name</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handle("lastName")}
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Business Name</label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={handle("businessName")}
                placeholder="Your business name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Business Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handle("email")}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handle("password")}
                  placeholder="Create a strong password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handle("confirmPassword")}
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              // disabled={loading || !agreed}
              className={`w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors mt-2 `}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}