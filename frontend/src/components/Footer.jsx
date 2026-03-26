import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-200 border-t border-slate-800 px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 ">
            <div className="flex items-center  gap-2 mb-3">
              <div className="">
                <img src={assets.logo} alt="Logo" className="w-30 h-[60px]" />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Building trust in business relationships through verified credibility.
            </p>
          </div>


        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © 2026 InterVerify. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Powered by The Real Awesome People.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
