import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const NAV_LINKS = ["Home","Features", "How it works", "FAQ"];
    return (
        <>
              <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7] border-b border-gray-100 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <Link to="/">
                    <img src={assets.logo} alt="Logo" className="w-30 h-[55px]" />
                    </Link>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l}
                      href={`#${l}`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {l}
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                    
                    <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Login
                    </Link>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    <Link to="/signup">
                        Get Started
                    </Link>
                  </button>
                </div>
              </nav>
    </>
  )
}

export default Navbar