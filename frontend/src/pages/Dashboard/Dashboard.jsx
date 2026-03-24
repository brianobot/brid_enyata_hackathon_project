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
  { label: "Documents",    icon: FileText,        to: "/documents" },
  { label: "Profile",      icon: User,            to: "/profile"   },
  { label: "Settings",     icon: Settings,        to: "/settings"  },
];

const stepsRemaining = MOCK_VERIFICATION_STEPS.filter(
  (s) => s.status !== "completed"
).length;

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen]               = useState(false);
  const [notifications, setNotifications]       = useState(MOCK_NOTIFICATIONS);
  const [activeNav, setActiveNav]               = useState("Dashboard");

  const { logout, user } = useAuth();

  const initials = user ? `${user.first_name[0]}${user.last_name[0]}` : "??";

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

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
          {/* Logout Button added at the bottom of the navigation section */}
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
        {!sidebarCollapsed && (
          <div className="mx-3 mb-4 bg-gray-900 rounded-2xl p-4 text-white">
            <p className="text-[10px] font-bold tracking-widest text-blue-400 mb-1">ENTERPRISE</p>
            <p className="text-xs text-gray-300 leading-snug mb-3">
              Unlock advanced background checks.
            </p>
            <button className="w-full bg-white text-gray-900 text-xs font-semibold py-2 rounded-xl hover:bg-gray-100 transition-colors">
              Upgrade to Business
            </button>
          </div>
        )}

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

        {/* ── TOPBAR ── */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-52">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search verification..."
                className="bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none w-full"
              />
            </div>

            {/* Bell */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4.5 h-4.5 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Help */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
              <HelpCircle className="w-4.5 h-4.5 text-gray-500" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">{initials}</span>
            </div>
          </div>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* ── WELCOME BANNER ── */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-between px-8 py-8 relative min-h-[200px]">
            <div className="max-w-md">
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Welcome, {user?.first_name || 'User'}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Your profile is {MOCK_USER.profileComplete}% complete. Start your identity
                verification today to unlock the full potential of InterVerify.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/verify">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                    Start Verification
                  </button>
                </Link>
                <button className="border border-gray-200 bg-white text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  View Roadmap
                </button>
              </div>
            </div>

            {/* Decorative image placeholder */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
              <div className="flex flex-col items-center gap-3 opacity-40">
                <div className="w-10 h-14 bg-white rounded-lg shadow-sm" />
                <div className="w-7 h-10 bg-white rounded-lg shadow-sm -mt-6 ml-8" />
              </div>
            </div>
          </div>

          {/* ── VERIFICATION STEPS ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Verification Steps</h3>
                <p className="text-xs text-gray-400 mt-0.5">Complete these steps to earn your Trust Seal.</p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                {stepsRemaining} Steps Remaining
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {MOCK_VERIFICATION_STEPS.map((step) => {
                const Icon   = step.icon;
                const status = STATUS[step.status];
                return (
                  <div
                    key={step.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 ${step.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${step.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        <span className={`text-[10px] font-bold tracking-widest ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Action button */}
                    <div>
                      {step.status === "completed" && (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Verified
                        </div>
                      )}
                      {step.status === "in_progress" && (
                        <Link to="/verify">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                            Resume <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                      )}
                      {step.status === "not_started" && (
                        <Link to="/verify">
                          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition-colors">
                            Start
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div className="grid grid-cols-3 gap-4">

            {/* Trust Score */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <BarChart2 className="w-8 h-8 text-gray-200 mb-3" />
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">TRUST SCORE</p>
              <p className="text-4xl font-black text-gray-200">—/100</p>
              <p className="text-xs text-gray-400 mt-2 leading-snug">
                Complete your verification to generate your global trust score.
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between min-h-[180px]">
              <p className="text-[10px] font-bold tracking-widest text-gray-400">RECOMMENDATIONS</p>
              <div className="flex flex-col items-start gap-2 mt-4">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Lock className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm font-bold text-blue-600">Unlock Feature</p>
                <p className="text-xs text-gray-400 leading-snug">
                  Complete verification to get personalised business recommendations.
                </p>
              </div>
            </div>

            {/* Profile Views */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between min-h-[180px]">
              <p className="text-[10px] font-bold tracking-widest text-gray-400">PROFILE VIEWS</p>
              <div className="flex-1 flex flex-col items-start justify-center mt-3">
                <p className="text-4xl font-black text-gray-300">0</p>
                <p className="text-xs text-gray-400 leading-snug mt-2">
                  Visibility begins after seal approval.
                </p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full w-full mt-3" />
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="flex items-center justify-between pt-2 pb-1 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Security Audit</a>
            </div>
            <p className="text-xs text-gray-400">
              © 2024 InterVerify Inc. All connections are end-to-end encrypted.
            </p>
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