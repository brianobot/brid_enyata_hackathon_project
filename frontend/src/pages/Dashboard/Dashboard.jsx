import { useState } from "react";
import { Link } from "react-router-dom";
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

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "info",
    title: "Document Upload Required",
    message: "Please upload your incorporation certificate to continue the Legal Documents step.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Identity Check Passed",
    message: "Your government ID and biometric verification was successful.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Profile Incomplete",
    message: "Your profile is only 15% complete. Add more details to improve your trust score.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "Welcome to InterVerify",
    message: "Get started by completing your identity verification to earn your Trust Seal.",
    time: "3 days ago",
    read: true,
  },
];

const NAV_ITEMS = [
  { label: "Dashboard",    icon: LayoutDashboard, to: "/dashboard" },
  { label: "Verification", icon: ShieldCheck,     to: "/verify"    },
  // { label: "Documents",    icon: FileText,        to: "/documents" },
  { label: "Profile",      icon: User,            to: "/settings/profile"   },
  { label: "Settings",     icon: Settings,        to: "/settings"  },
];

const stepsRemaining = MOCK_VERIFICATION_STEPS.filter(
  (s) => s.status !== "completed"
).length;

// ── PRE-VERIFICATION VIEW ──
function PreVerificationView({ user }) {
  // Use real user data or fallback to mock
  const displayName = user?.first_name 
    ? `${user.first_name} ${user.last_name || ''}`.trim() 
    : MOCK_USER.name;
  const profileComplete = user?.profile_complete ?? MOCK_USER.profileComplete;

  const total = MOCK_VERIFICATION_ITEMS.length;
  const done  = 0; // replace with real completed count from API

  return (
    <div className="space-y-5">

      {/* Welcome banner */}
      <div className="bg-slate-100 rounded-2xl px-8 py-10 min-h-[220px] flex flex-col justify-center">
        <h2 className="text-4xl font-black text-gray-900 mb-3">Welcome, {displayName}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-md">
          Your profile is {profileComplete}% complete. Start your identity
          verification today to unlock the full potential of interverify
        </p>
        <div>
          <Link to="/verify">
            <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
              Start Verfication
            </button>
          </Link>
        </div>
      </div>

      {/* Verification Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Verification Progress</h3>
          <span className="text-xs text-gray-400">{done} of {total} completed</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-gray-400 rounded-full transition-all duration-500"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">complete the steps to earn your Trust Seal</p>
      </div>

      {/* Verification steps list */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Complete you verification</h3>
        <div className="divide-y divide-gray-50">
          {MOCK_VERIFICATION_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <Link to="/verify">
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  Start <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row — empty/locked */}
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
          <p className="text-xs text-gray-400 mb-3">profile Views</p>
          <p className="text-4xl font-black text-gray-300 mt-1">0</p>
          <p className="text-xs text-gray-400 mt-3 leading-snug">
            Visibility begins after verification
          </p>
        </div>
      </div>
    </div>
  );
}

// ── POST-VERIFICATION VIEW (mock, as before but with safe user fields) ──
function PostVerificationView({ user }) {
  const displayName = user?.first_name 
    ? `${user.first_name} ${user.last_name || ''}`.trim() 
    : MOCK_USER.name;
  // Mock values – replace with real API data when available
  const mockStats = {
    trustScore: 78,
    trustScoreDelta: "+12",
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
            <p className="text-sm font-bold text-gray-900">Your Business is verified</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Your business profile is active and visible to potential clients. Last updated {mockStats.lastUpdated}.
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

      {/* Stats — live */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Trust Score</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="w-3 h-3" /> {mockStats.trustScoreDelta}
            </span>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-1">{mockStats.trustScore}</p>
          <p className="text-xs text-gray-400 mt-3 leading-snug">
            HINT : Complete pending verifications to increase your score
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Recommendations</p>
            <span className="w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {mockStats.recommendationsPending}
            </span>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-1">{mockStats.recommendations}</p>
          <p className="text-xs text-gray-400 mt-3">{mockStats.recommendationsPending} Pending</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">profile Views</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="w-3 h-3" /> {mockStats.profileViewsDelta}
            </span>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-1">{mockStats.profileViews.toLocaleString()}</p>
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

  // ── DEV TOGGLE ────────────────────────────────────────────────────────────
  // const [isVerified, setIsVerified] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen]               = useState(false);
  const [notifications, setNotifications]       = useState(MOCK_NOTIFICATIONS);
  const [activeNav, setActiveNav]               = useState("Dashboard");

  const { logout, user, loading } = useAuth();  // <-- also get loading

  // Safe initials
  const initials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : "??";

  const isVerified = !!(user?.business_name && user?.business_cac_number && user?.business_tin);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  // Show a loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is still null after loading, maybe redirect to login (but AuthProvider should handle that)
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Unable to load user data. Please try logging in again.</p>
          <Link to="/login" className="mt-4 inline-block text-blue-600 hover:underline">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside
        className={`relative flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex-shrink-0
          ${sidebarCollapsed ? "w-16" : "w-44"}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-100 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">InterVerify</p>
              <p className="text-[9px] text-gray-400 tracking-widest font-medium mt-0.5">TRUST REIMAGINED</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setActiveNav(item.label)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group
                  ${isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}
                  ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
          {/* Logout Button */}
          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors w-full text-red-500 hover:bg-red-50 mt-auto
              ${sidebarCollapsed ? "justify-center px-0" : ""}`}
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0 text-red-400" />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </nav>

        {/* Enterprise upgrade card */}


        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-10"
        >
          {sidebarCollapsed
            ? <ChevronRight className="w-3 h-3 text-gray-500" />
            : <ChevronLeft  className="w-3 h-3 text-gray-500" />}
        </button>
      </aside>

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
              onClick={() => setNotifOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
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


          {/* Footer */}
          <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Security Audit</a>
            </div>
            <p className="text-xs text-gray-400">© 2024 InterVerify Inc. All connections are end-to-end encrypted.</p>
          </div>
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
            {unreadCount > 0 && (
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setNotifOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Bell className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-400">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                  !n.read ? "bg-blue-50/40" : ""
                }`}
              >
                <div className="mt-0.5">
                  <NotifIcon type={n.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs font-semibold ${!n.read ? "text-gray-900" : "text-gray-600"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-gray-300 mt-1.5">{n.time}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <button className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors text-center">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}