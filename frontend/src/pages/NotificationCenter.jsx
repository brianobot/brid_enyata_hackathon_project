import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, AlertCircle, Info, 
  Trash2, Filter, ChevronRight, Settings 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Verification Approved',
    message: 'Your CAC Registration documents have been successfully verified. Your trust score has increased by 15 points.',
    time: '2 hours ago',
    read: false,
    category: 'Verification'
  },
  {
    id: 2,
    type: 'alert',
    title: 'Action Required: Director Info',
    message: 'We noticed a mismatch in the Director ID provided. Please re-upload a clear copy of the National ID.',
    time: '5 hours ago',
    read: false,
    category: 'Verification'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Login Detected',
    message: 'Your account was accessed from a new device in Lagos, Nigeria. If this wasn\'t you, please change your password.',
    time: 'Yesterday',
    read: true,
    category: 'Security'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('All');

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifs = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-900" /> Notifications
          </h1>
          <p className="text-gray-500 mt-1">Stay updated with your verification progress and account security.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllRead}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Mark all as read
          </button>
          <Link to="/settings/profile" className="p-2.5 bg-gray-100 rounded-xl text-gray-500 hover:bg-gray-200 transition-all">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Verification', 'Security'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
              filter === cat 
              ? 'bg-blue-900 border-blue-900 text-white shadow-lg shadow-blue-900/20' 
              : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredNotifs.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredNotifs.map((n) => (
              <div 
                key={n.id} 
                className={`p-6 flex gap-4 transition-colors hover:bg-gray-50/50 group ${!n.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className="mt-1">
                  <NotificationIcon type={n.type} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {n.title}
                    </h4>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{n.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{n.message}</p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">
                      {n.category}
                    </span>
                    <button 
                      onClick={() => deleteNotif(n.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-200" />
            </div>
            <h3 className="font-bold text-gray-900">All caught up!</h3>
            <p className="text-sm text-gray-400">No new notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationIcon({ type }) {
  switch (type) {
    case 'success':
      return <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>;
    case 'alert':
      return <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><AlertCircle className="w-5 h-5" /></div>;
    default:
      return <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Info className="w-5 h-5" /></div>;
  }
}