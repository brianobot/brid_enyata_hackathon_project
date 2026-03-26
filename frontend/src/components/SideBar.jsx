import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { assets } from '../assets/assets.js'
import { useState } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  User,
  Settings,
  Bell,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",    icon: LayoutDashboard, to: "/dashboard" },
  { label: "Verification", icon: ShieldCheck,     to: "/verify"    },
  { label: "Profile",      icon: User,            to: "/settings/profile"   },
  { label: "Settings",     icon: Settings,        to: "/settings"  },
];

const SideBar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeNav, setActiveNav]               = useState("Dashboard");
    const { logout, user, loading } = useAuth();

    return (
        <div>
            <aside
            className={`relative flex flex-col bg-white border-r h-[100%] border-gray-100 transition-all duration-300 ease-in-out flex-shrink-0
            ${sidebarCollapsed ? "w-16" : "w-44"}`}
        >
            {/* Logo */}
            <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-100 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
            {!sidebarCollapsed ? (
                <div>
                    <img src={assets.logo}/>
                </div>) :
            
            (<div>
                <img src={assets.logoIcon}/>
            </div>)
        }
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
        </div>
    )
}

export default SideBar
