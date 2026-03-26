import React, { useState, useEffect } from 'react'; // Added useEffect and useState
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state

  const NAV_LINKS = ["Home", "Features", "How it works", "FAQ"];

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((l) => {
        // Map link label to section ID
        const sectionId = l === "Home" ? "home" : l.toLowerCase().replace(/\s+/g, '-');
        const scrollToSection = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        };
        return (
          <button
            key={l}
            onClick={scrollToSection}
            className="text-sm font-semibold text-gray-600 hover:text-[#154470] transition-colors"
          >
            {l}
          </button>
        );
      })}
    </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl transition-all font-bold border border-red-100"
            >
              Logout
            </button>
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

export default Navbar;