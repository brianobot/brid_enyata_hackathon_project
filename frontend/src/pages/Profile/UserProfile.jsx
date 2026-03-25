import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Camera, ShieldCheck, 
  Key, Bell, CreditCard, ChevronRight, Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Mock handling for profile update
  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-3xl flex items-center justify-center text-3xl font-black text-blue-900 border-4 border-white shadow-xl">
              {user?.first_name?.[0]}{user?.last_name?.[0] || 'U'}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2.5 bg-white rounded-xl shadow-lg border border-gray-100 text-blue-900 hover:bg-gray-50 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" /> {user?.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Account
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            isEditing ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="First Name" value={user?.first_name} icon={User} isEditing={isEditing} />
              <ProfileField label="Last Name" value={user?.last_name} icon={User} isEditing={isEditing} />
              <ProfileField label="Email Address" value={user?.email} icon={Mail} isEditing={false} />
              <ProfileField label="Phone Number" value="+234 812 345 6789" icon={Phone} isEditing={isEditing} />
              <div className="md:col-span-2">
                <ProfileField label="Location" value="Uyo, Akwa Ibom, Nigeria" icon={MapPin} isEditing={isEditing} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
            <div className="space-y-4">
              <SecurityItem icon={Key} title="Change Password" desc="Update your password regularly to stay secure." />
              <SecurityItem icon={ShieldCheck} title="Two-Factor Authentication" desc="Add an extra layer of security to your account." />
            </div>
          </div>
        </div>

        {/* Right Column: Account Stats / Quick Links */}
        <div className="space-y-6">
          <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20">
            <h3 className="font-bold text-lg mb-4">Verification Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black italic">85%</div>
              <div className="text-blue-200 text-xs leading-tight">
                Your profile is almost <br /> fully verified.
              </div>
            </div>
            <div className="mt-6 w-full bg-blue-800/50 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
            <Link to="/notifications" className="block w-full">
                <QuickLink icon={Bell} title="Notifications" />
            </Link>
            <QuickLink icon={CreditCard} title="Subscription Plan" />
            <QuickLink icon={ShieldCheck} title="Privacy Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ProfileField({ label, value, icon: Icon, isEditing }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        isEditing ? 'border-blue-200 bg-blue-50/30' : 'border-gray-50 bg-gray-50/50'
      }`}>
        <Icon className="w-4 h-4 text-gray-400" />
        {isEditing ? (
          <input type="text" defaultValue={value} className="bg-transparent text-sm font-semibold w-full outline-none text-gray-900" />
        ) : (
          <span className="text-sm font-semibold text-gray-700">{value}</span>
        )}
      </div>
    </div>
  );
}

function SecurityItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-white transition-colors">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </div>
  );
}

function QuickLink({ icon: Icon, title }) {
  return (
    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group text-gray-600 hover:text-blue-900">
      <div className="flex items-center gap-3 text-sm font-bold">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}