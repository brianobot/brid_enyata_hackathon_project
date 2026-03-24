import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="">
                <img src={assets.logo} alt="Logo" className="w-30 h-[60px]" />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Global business verification for modern compliance teams.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "API Docs", "Changelog"],
            },
            {
              title: "Resources",
              links: ["Blog", "Case Studies", "Webinars", "Help Center"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Press", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "GDPR"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © 2026 InterVerify. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Powered by 500+ official data sources
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
