import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  User,
  Settings,
  Bell,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Circle,
  LogOut,
  Fingerprint,
  ScrollText,
  Landmark,
  BarChart2,
  Lock,
  Eye,
  X,
  Upload,
  TrendingUp,
  Building2,
  AlertCircle,
  Info,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";
import SideBar from "../../components/SideBar"
import api from "../../api/axios";

// ── MOCK DATA ─────────────────────────────────────────────────────────────────
const MOCK_USER = {
  name: "Alex",
  initials: "AX",
  profileComplete: 15,
  email: "alex@techflow.com",
};

const MOCK_VERIFICATION_STEPS = [
  {
    id: 1,
    title: "Identity Check",
    description: "Government ID and biometric face match verification.",
    status: "completed", // completed | in_progress | not_started
    icon: Fingerprint,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    id: 2,
    title: "Legal Documents",
    description: "Uploading incorporation and tax residency certificates.",
    status: "in_progress",
    icon: ScrollText,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    id: 3,
    title: "Financial Nexus",
    description: "Bank account validation and transaction history audit.",
    status: "not_started",
    icon: Landmark,
    iconColor: "text-gray-400",
    iconBg: "bg-gray-100",
  },
];

const MOCK_VERIFICATION_ITEMS = [
  { id: 1, title: "CAC Registration",     desc: "Upload your CAC documents", updatedDate: "Jan 2026" },
  { id: 2, title: "Tax Compliance",        desc: "Upload your tax documents",  updatedDate: "Feb 2026" },
  { id: 3, title: "Director Verification", desc: "Verify director identity",   updatedDate: "Jan 2026" },
  { id: 4, title: "Financial Records",     desc: "Upload financial documents", updatedDate: "Jan 2026" },
];



// ── PRE-VERIFICATION VIEW ──
function PreVerificationView({ user }) {
  // Use real user data or fallback to mock
  const displayName = user?.first_name 
    ? `${user.first_name} ${user.last_name || ''}`.trim() 
    : MOCK_USER.name;
  const profileComplete = user?.profile_complete ?? MOCK_USER.profileComplete;

  // Define required documents and their display info
  const requiredDocs = [
    { key: "cac", title: "CAC Registration", desc: "Upload your CAC registration certificate" },
    { key: "taxClearance", title: "Tax Compliance", desc: "Upload your tax clearance certificate" },
    { key: "proofAddress", title: "Proof of Address", desc: "Upload proof of business address" },
    // Add more if needed (director verification, etc.)
  ];

  // Determine which documents are uploaded (i.e., have a URL in user.documents)
  const uploadedDocs = user?.documents ? 
    requiredDocs.filter(doc => user.documents[doc.key] && typeof user.documents[doc.key] === 'string') 
    : [];

  const completedCount = uploadedDocs.length;
  const totalRequired = requiredDocs.length;
  const progressPercent = totalRequired ? (completedCount / totalRequired) * 100 : 0;

  return (
    <div className="space-y-5">

      {/* Welcome banner */}
      <div className="bg-slate-100 rounded-2xl px-8 py-10 min-h-[220px] flex flex-col justify-center">
        <h2 className="text-4xl font-black text-gray-900 mb-3">Welcome, {displayName}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-md">
          Your profile is {profileComplete}% complete. Start your identity
          verification today to unlock the full potential of InterVerify.
        </p>
        <div>
          <Link to="/verify">
            <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
              Start Verification
            </button>
          </Link>
        </div>
      </div>

      {/* Verification Progress */}
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

      {/* Verification steps list */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Complete your verification</h3>
        <div className="divide-y divide-gray-50">
          {requiredDocs.map((doc) => {
            const isUploaded = user?.documents && user.documents[doc.key] && typeof user.documents[doc.key] === 'string';
            return (
              <div key={doc.key} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isUploaded ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    {isUploaded ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Upload className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{doc.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
                <Link to="/verify">
                  <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                    {isUploaded ? "View" : "Start"} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row — empty/locked (same as before) */}
      <div className="grid grid-cols-3 gap-4">
        {/* Trust Score */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Trust Score</p>
          <p className="text-4xl font-black text-gray-300">—/100</p>
          <p className="text-xs text-gray-400 mt-3 leading-snug max-w-[140px]">
            Complete your verification to generate your global trust score.
          </p>
        </div>

        {/* Recommendations — locked */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col min-h-[200px]">
          <p className="text-xs text-gray-400 mb-3">Recommendations</p>
          <div className="h-1.5 bg-gray-200 rounded-full w-3/4 mb-2" />
          <div className="h-1.5 bg-gray-100 rounded-full w-1/2 mb-auto" />
          <div className="flex items-center gap-2 mt-4">
            <Lock className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-bold text-blue-600">Unlock Feature</p>
          </div>
        </div>

        {/* Profile Views */}
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
  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : MOCK_USER.name;

  // ── TRUST SCORE — real API ─────────────────────────────────────────────────
  // GET /v1/businesses/verification/score
  // Returns a plain string (the score), e.g. "72"
  const [trustScore, setTrustScore]       = useState(null);  // null = not loaded yet
  const [scoreLoading, setScoreLoading]   = useState(true);
  const [scoreError, setScoreError]       = useState(false);

  useEffect(() => {
    const fetchTrustScore = async () => {
      try {
        setScoreLoading(true);
        setScoreError(false);
        const response = await api.get("/businesses/verification/score");
        // The API returns a plain string — parse it to a number for display
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
  }, []); // runs once when PostVerificationView mounts

  // ── These remain mock until their own API endpoints are ready ─────────────
  const mockStats = {
    recommendations: 8,
    recommendationsPending: 2,
    profileViews: 1247,
    profileViewsDelta: "+18%",
    profileComplete: 85,
    lastUpdated: "Mar 2026",
  };

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

        {/* ── TRUST SCORE — wired to real API ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Trust Score</p>
            {/* Only show the trending badge once we have a real score */}
            {trustScore !== null && !scoreError && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp className="w-3 h-3" />
              </span>
            )}
          </div>

          {/* Three possible states: loading, error, or real score */}
          {scoreLoading ? (
            // Loading state — animated skeleton pulse
            <div className="animate-pulse mt-1">
              <div className="h-10 bg-gray-200 rounded-lg w-16 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ) : scoreError ? (
            // Error state — show a friendly message with a retry button
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
            // Success state — real score from API
            <>
              <p className="text-4xl font-black text-gray-900 mt-1">{trustScore}</p>
              <p className="text-xs text-gray-400 mt-3 leading-snug">
                HINT: Complete pending verifications to increase your score
              </p>
            </>
          )}
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Profile Completion</h3>
          <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Complete profile <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-500"
            style={{ width: `${mockStats.profileComplete}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          Your profile is almost complete! Add more information to increase visibility and trust.
        </p>
      </div>

      {/* Verification Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Verification Overview</h3>
        <div className="divide-y divide-gray-50">
          {MOCK_VERIFICATION_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Updated {item.updatedDate}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">Verified</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS = {
  completed:   { label: "COMPLETED",    color: "text-green-500",  dot: "bg-green-500"  },
  in_progress: { label: "IN PROGRESS",  color: "text-orange-500", dot: "bg-orange-500" },
  not_started: { label: "NOT STARTED",  color: "text-gray-400",   dot: "bg-gray-300"   },
};

// ── NOTIFICATION ICON ─────────────────────────────────────────────────────────
function NotifIcon({ type }) {
  if (type === "success") return <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />;
  if (type === "warning")  return <AlertCircle  className="w-4 h-4 text-yellow-500 flex-shrink-0" />;
  return <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Dashboard() {
  // const navigate = useNavigate();
  const [notifOpen, setNotifOpen]               = useState(false);

  const { user, loading } = useAuth();  // <-- also get loading

  // Safe initials
  const initials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : "??";

  const isVerified = !!(user?.business_name && user?.business_cac_number && user?.business_tin);

  // Show a loading spinner while auth is initializing
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

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <SideBar/>

      
      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-50 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-black text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back! Here's your verification status and profile overview.</p>
          </div>

          <div className="flex items-center gap-2">

            {/* Bell */}
            <button
              disabled
              title="Notifications coming soon"
              onClick={() => setNotifOpen(true)}
              className="p-2 text-slate-300 cursor-not-allowed opacity-50 hover:bg-transparent relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-500" />
              
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-gray-600">{initials}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {isVerified
            ? <PostVerificationView user={user} />
            : <PreVerificationView  user={user} />}
        </main>
      </div>

      {/* ── NOTIFICATION SIDEBAR OVERLAY ── */}
      {notifOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setNotifOpen(false)}
        />
      )}

      {/* ── NOTIFICATION SIDEBAR ── */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out
          ${notifOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="flex items-center gap-2">

            <button
              onClick={() => setNotifOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}