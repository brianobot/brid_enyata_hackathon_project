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
    const { logout } = useAuth();

    return (
        <aside
            className={`relative flex flex-col bg-white border-r h-screen border-gray-100 transition-all duration-300 ease-in-out 
            ${sidebarCollapsed ? "w-16" : "w-48"}`}
        >
            {/* Logo Section */}
                        {/* Logo */}
            <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-100 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
            <Link to='/'>
                {!sidebarCollapsed ? (
                    <div>
                        <img src={assets.logo}/>
                    </div>) :
                
                (<div>
                    <img src={assets.logoIcon} className="w-[150px]"/>
                </div>)  
                }
             </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col flex-1 px-3 pb-6">
                {/* 1. TOP SECTION: Use flex-1 to push everything else down */}
                <div className="flex-1 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = window.location.pathname === item.to;
                        return (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                                ${isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-900/5" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                                {!sidebarCollapsed && (
                                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* 2. BOTTOM SECTION: Logout stays at the bottom */}
                <div className="pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={logout}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full text-red-500 hover:bg-red-50
                        ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0 text-red-400 group-hover:text-red-500" />
                        {!sidebarCollapsed && (
                            <span className="text-sm font-bold tracking-tight">Logout</span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Collapse toggle */}
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all z-50 hover:scale-110"
            >
                {sidebarCollapsed ? <ChevronRight className="w-3 h-3 text-gray-500" /> : <ChevronLeft className="w-3 h-3 text-gray-500" />}
            </button>
        </aside>
    );
};

export default SideBar
