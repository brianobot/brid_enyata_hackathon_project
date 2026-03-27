import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  Building2, ScrollText, Landmark, ShieldCheck, CheckCircle2,
  TrendingUp, Lock, AlertCircle, Info, ArrowRight
} from "lucide-react";
import SideBar from "../../components/SideBar";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";


// ── PRE-VERIFICATION VIEW ──
function PreVerificationView({ user }) {
  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "User";

  // Use flags if the backend provides them, otherwise fallback to presence of details
  const steps = [
    {
      id: 1,
      title: "CAC Registration",
      description: "Company registration & legal entity verification.",
      completed: user?.cac_is_verified || !!user?.business_cac_number,
      icon: Building2,
    },
    {
      id: 2,
      title: "Tax ID (TIN)",
      description: "Tax identification number and compliance check.",
      completed: user?.tin_is_verified || !!user?.business_tin,
      icon: ScrollText,
    },
    {
      id: 3,
      title: "Address Verification",
      description: "Physical business location and utility bill proof.",
      completed: user?.address_is_verified || !!user?.business_address,
      icon: Landmark,
    },
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const totalRequired = steps.length;
  const progressPercent = (completedCount / totalRequired) * 100;

  return (
    <div className="space-y-5">
      {/* Welcome banner */}
      <div className="bg-slate-100 rounded-2xl px-8 py-10 min-h-[220px] flex flex-col justify-center">
        <h2 className="text-4xl font-black text-gray-900 mb-3">Welcome, {displayName}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-md">
          Start your identity verification today to unlock the full potential of InterVerify.
        </p>
        <div>
          <Link to="/verify">
            <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
              Start Verification
            </button>
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Verification Progress</h3>
          <span className="text-xs text-gray-400">{completedCount} of {totalRequired} completed</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-gray-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">Complete the steps to earn your Trust Seal</p>
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {steps.map((step) => {
          const isCompleted = step.completed;
          return (
            <div key={step.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${isCompleted ? 'bg-green-50' : 'bg-gray-50'} rounded-2xl flex items-center justify-center mb-4`}>
                <step.icon className={`w-6 h-6 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{step.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                  isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? 'Completed' : 'Not Started'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Locked stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Trust Score</p>
          <p className="text-4xl font-black text-gray-300">—/100</p>
          <p className="text-xs text-gray-400 mt-3 leading-snug max-w-[140px]">
            Complete your verification to generate your global trust score.
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Recommendations</p>
          <div className="h-1.5 bg-gray-200 rounded-full w-3/4 mb-2" />
          <div className="h-1.5 bg-gray-100 rounded-full w-1/2 mb-auto" />
          <div className="flex items-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-bold text-blue-600">Coming Soon</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Profile Views</p>
          <p className="text-4xl font-black text-gray-300 mt-1">0</p>
          <p className="text-xs text-gray-400 mt-3 leading-snug">
            Visibility begins after verification
          </p>
        </div>
      </div>
    </div>
  );
}

// ── POST-VERIFICATION VIEW ──
function PostVerificationView({ user }) {
  const [trustScore, setTrustScore] = useState(null);
  const [scoreLoading, setScoreLoading] = useState(true);
  const [scoreError, setScoreError] = useState(false);
  // const [userLoading, setUserLoading] = useState(true); // Track user fetch

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "User";

  // Helper function for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  useEffect(() => {
    const fetchTrustScore = async () => {
      try {
        setScoreLoading(true);
        setScoreError(false);
        const response = await api.get("/businesses/verification/score");
        const score = parseFloat(response.data);
        setTrustScore(isNaN(score) ? null : score);
      } catch (err) {
        console.error("[Dashboard] Failed to fetch trust score:", err);
        setScoreError(true);
      } finally {
        setScoreLoading(false);
      }
    };
    fetchTrustScore();
  }, []);

const verificationItems = [
  {
    id: 1,
    title: "CAC Registration",
    desc: "Company registration",
    verified: !!user?.cac_is_verified,
    updatedDate: formatDate(user?.date_updated)
  },
  {
    id: 2,
    title: "Tax Compliance",
    desc: "Tax identification",
    verified: !!user?.tin_is_verified,
    updatedDate: formatDate(user?.date_updated)
  },
  {
    id: 3,
    title: "Address Verification",
    desc: "Business address proof",
    verified: !!user?.address_is_verified,
    updatedDate: formatDate(user?.date_updated)
  },
];

  return (
    <div className="space-y-5">
      {/* Verified banner */}
      <div className="bg-green-50 border border-green-100 rounded-2xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Good news, {displayName} — your business is verified</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Your business profile is active and visible to potential clients.
            </p>
            <div className="w-44 h-1.5 bg-green-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full w-full" />
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-white border border-green-200 px-3 py-1.5 rounded-full flex-shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Trust Score</p>
            {trustScore !== null && !scoreError && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp className="w-3 h-3" />
              </span>
            )}
          </div>
          {scoreLoading ? (
            <div className="animate-pulse mt-1">
              <div className="h-10 bg-gray-200 rounded-lg w-16 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ) : scoreError ? (
            <div className="mt-1">
              <p className="text-2xl font-black text-gray-300">—</p>
              <p className="text-xs text-red-400 mt-2">Could not load score.</p>
              <button
                onClick={() => {
                  setScoreLoading(true);
                  setScoreError(false);
                  api.get("/businesses/verification/score")
                    .then((r) => {
                      const s = parseFloat(r.data);
                      setTrustScore(isNaN(s) ? null : s);
                    })
                    .catch(() => setScoreError(true))
                    .finally(() => setScoreLoading(false));
                }}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <p className="text-4xl font-black text-gray-900 mt-1">{trustScore}</p>
              <p className="text-xs text-gray-400 mt-3 leading-snug">
                HINT: Complete pending verifications to increase your score
              </p>
            </>
          )}
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Recommendations</p>
          <div className="h-1.5 bg-gray-200 rounded-full w-3/4 mb-2" />
          <div className="h-1.5 bg-gray-100 rounded-full w-1/2 mb-auto" />
          <div className="flex items-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-bold text-blue-600">Coming Soon</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Profile views</p>
          <div className="h-1.5 bg-gray-200 rounded-full w-3/4 mb-2" />
          <div className="h-1.5 bg-gray-100 rounded-full w-1/2 mb-auto" />
          <div className="flex items-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-bold text-blue-600">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Verification Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Verification Overview</h3>
        <div className="divide-y divide-gray-50">
          {verificationItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc} • Updated {item.updatedDate}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">
                {item.verified ? "Verified" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, loading } = useAuth();

  // Determine if the user has completed the verification form
  const isVerified = !!(user?.business_name && user?.business_cac_number && user?.business_tin);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="w-44 bg-white border-r border-gray-100 flex flex-col animate-pulse">
          <div className="h-16 bg-gray-200 m-4 rounded-lg" />
          <div className="space-y-2 px-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-gray-200 rounded-lg" />)}
          </div>
        </div>
        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-100 animate-pulse" />
          <div className="flex-1 p-6 space-y-6">
            <div className="h-48 bg-gray-200 rounded-2xl" />
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl" />)}
            </div>
            <div className="h-32 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // If user is still null (should be caught by useEffect, but as a fallback)
  if (!user) {
    return null; // or a minimal spinner while redirecting
  }

  // Render dashboard with appropriate view
  return (
    <div className="flex h-screen bg-gray-50  font-sans overflow-hidden">
      <SideBar />

      <div className="flex-1 flex flex-col pt-10 px-5 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 px-2">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Welcome back, {user.first_name || "User"}
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-1">
              {isVerified
                ? "Your business is fully verified."
                : "Complete your verification to build trust."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <span className="text-xs font-bold text-blue-600">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {isVerified ? (
            <PostVerificationView user={user} />
          ) : (
            <PreVerificationView user={user} />
          )}
        </main>
      </div>
    </div>
  );
}