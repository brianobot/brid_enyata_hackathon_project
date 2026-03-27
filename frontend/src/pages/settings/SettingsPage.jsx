import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { Lock, Bell, CreditCard, X, User, Save, ArrowLeft, LogIn, ShieldCheck } from 'lucide-react';
import SideBar from '../../components/SideBar'


export default function Settings() {
  useAuth();
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Notification preferences (load from localStorage or default to true)
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const stored = localStorage.getItem('emailNotifications');
    return stored !== null ? JSON.parse(stored) : true;
  });
  const [profileViewAlerts, setProfileViewAlerts] = useState(() => {
    const stored = localStorage.getItem('profileViewAlerts');
    return stored !== null ? JSON.parse(stored) : true;
  });
  const [recommendationRequests, setRecommendationRequests] = useState(() => {
    const stored = localStorage.getItem('recommendationRequests');
    return stored !== null ? JSON.parse(stored) : false;
  });
  const [notifSuccess, setNotifSuccess] = useState('');
  const [isSavingNotifs, setIsSavingNotifs] = useState(false);

  // Save notification preferences to localStorage and show success
  const saveNotificationPreferences = () => {
    setIsSavingNotifs(true);
    setTimeout(() => {
      localStorage.setItem('emailNotifications', JSON.stringify(emailNotifications));
      localStorage.setItem('profileViewAlerts', JSON.stringify(profileViewAlerts));
      localStorage.setItem('recommendationRequests', JSON.stringify(recommendationRequests));
      setNotifSuccess('Preferences saved successfully');
      setTimeout(() => setNotifSuccess(''), 3000);
      setIsSavingNotifs(false);
    }, 500); // Simulate network delay (you can replace with an actual API call)
  };

  // Handle password change via PATCH /auth/me
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await api.patch('/auth/me', {
        old_password: currentPassword,
        new_password: newPassword,
      });
      // On success, clear form and show success message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordSuccess('Password updated successfully');
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (error) {
      console.error('Password update failed:', error);
      if (error.response?.status === 401) {
        setPasswordError('Current password is incorrect');
      } else if (error.response?.data?.detail) {
        setPasswordError(error.response.data.detail);
      } else {
        setPasswordError('Failed to update password. Please try again.');
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="flex">
      <SideBar />

      
      <div className="m-5 flex-grow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-xl">{passwordSuccess}</div>
              )}

              <div className="flex gap-3 pt-2">

                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="flex items-center gap-2 px-6 py-2 bg-[#154470] hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Profile View Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when someone views your profile</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileViewAlerts(!profileViewAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    profileViewAlerts ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profileViewAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Recommendation Requests</p>
                  <p className="text-sm text-gray-500">Alerts for new recommendation requests</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRecommendationRequests(!recommendationRequests)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    recommendationRequests ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      recommendationRequests ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {notifSuccess && (
              <div className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-xl">{notifSuccess}</div>
            )}

            <div className="mt-6">
              <button
                disabled
                title="FEATURE COMING SOON"
                onClick={saveNotificationPreferences}
                // disabled={isSavingNotifs}
                className="flex items-center gap-2 px-6 py-2 bg-gray-800 cursor-not-allowed opacity-50 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSavingNotifs ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>      
    </div>
    </div>
  );
}