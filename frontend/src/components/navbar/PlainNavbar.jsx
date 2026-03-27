import React, { useState, useEffect } from 'react'; // Added useEffect and useState
import { LinK,  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import { LayoutDashboard } from 'lucide-react';

const PlainNavbar = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state


  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3 flex items-center justify-between ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm py-2" // Glassmorphism
          : "bg-[#f7f7f7] border-b border-transparent py-4" // Default state
      }`}
    >
      <div className="flex items-center gap-2">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={assets.logo} alt="Logo" className="w-32 h-[45px] object-contain" />
        </Link>
      </div>

      <div className="flex flex-row gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm font-bold text-gray-600 hover:text-gray-900 flex gap-2 items-center transition-colors"
            >
              <LayoutDashboard className={`w-3.5 h-4.5 `} />
              Dashboard
            </Link>

          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link to="/signup">
              <button className="text-sm bg-[#154470] hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-blue-900/10">
                Get Verified
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default PlainNavbar;