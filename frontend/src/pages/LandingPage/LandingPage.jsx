import { useState } from 'react';
import {
  Star, Building2, Globe, FileText, Shield,
  Check, X, ArrowRight,
} from 'lucide-react';
import Navbar    from '../../components/Navbar';
import Footer    from '../../components/Footer';
import FAQItem   from '../../components/landing/FAQItem';
import SearchBar             from '../../components/search/SearchBar';
import SearchResultsPage     from '../../components/search/SearchResultsPage';
import StatsSection from "../../components/StatsSection"
import { useBusinessSearch } from '../../hooks/useBusinessSearch';
import {
  STATS, FEATURES, STEPS,
  FREE_FEATURES, FREE_MISSING, PRO_FEATURES, FAQS,
} from '../../constants/landingData';

// Icons for feature cards — keyed by the iconName string stored in landingData.js
const FEATURE_ICONS = {
  Building2: <Building2 className="w-5 h-5 text-blue-600" />,
  Globe:     <Globe     className="w-5 h-5 text-blue-600" />,
  FileText:  <FileText  className="w-5 h-5 text-blue-600" />,
  Shield:    <Shield    className="w-5 h-5 text-blue-600" />,
};

const LandingPage = () => {
  const [footerEmail, setFooterEmail] = useState('');

  const search = useBusinessSearch();

  if (search.showResultsPage) {
    return (
      <>
        <Navbar />
        <SearchResultsPage
          query={search.query}
          results={search.allResults}
          onBack={search.handleBack}
          onSelect={search.handleSelectBusiness}
        />
        <Footer />
      </>
    );
  }

  // ── MAIN PAGE ──────────────────────────────────────────────────────────────
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="home"
       className="pt-36 pb-16 px-6 mb-1 bg-gradient-to-b from-slate-50 to-white text-center "
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-gray-900 leading-tight mb-4 
          
            font-bold bg-gradient-to-b from-white via-slate-300 to-slate-500 bg-clip-text tracking-tight
          ">
            <span className="text-[#209547]">Verify</span> Business <span className="text-[#154470]">Credibility</span>
            <br />
            Before You Engage
          </h1>
          <p className="text-gray-500 text-base my-8 max-w-lg mx-auto leading-relaxed">
            InterVerify helps you make informed decisions by providing trusted <br /> business <span className="#61a979">verification</span> data and credibility profiles across Nigeria.
          </p>

          <SearchBar
            query={search.query}
            loading={search.loading}
            showDropdown={search.showDropdown}
            dropdownResults={search.dropdownResults}
            searchError={search.searchError}
            searchRef={search.searchRef}
            onQueryChange={search.handleQueryChange}
            onKeyDown={search.handleKeyDown}
            onSearch={search.handleSearch}
            onClear={search.handleClear}
            onSelectBusiness={search.handleSelectBusiness}
            onViewAll={search.handleViewAll}
          />

          {/* Trust row */}
          <div className="flex items-center justify-center gap-1 mb-10 ">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              Trusted by 2+ businesses
            </span>
          </div>

          {/* Stats */}
          <StatsSection />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
       className="py-32 px-6 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">
              Powerful Tools
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Tools for
              <br />
              Business<span className="text-[#209547]"> Verification</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    {FEATURE_ICONS[f.iconName]}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{f.tag1}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{f.tag2}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
       className="py-20 px-6  bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 items-start">
          <div className="text-center mx-auto flex-shrink-0">
            <p className="text-xs text-[#134470] font-semibold uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-[#209547]">Verify</span> Businesses with Confidence
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              InterVerify helps you search, review, and verify businesses using trusted compliance data and credibility insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full text-blue-600 border border-gray-300 bg-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.num}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{s.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
       className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">FAQ</h2>
            <p className="text-sm text-gray-400">
              Everything you need to know about verifying businesses <br /> on <span className="text-[#154470]">Inter</span><span className="text-[#209547]">Verify</span>
            </p>
          </div>
          <div>
            {FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#134470] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to verify businesses
            <br />
            with confidence?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Join thousands of compliance teams who trust InterVerify.
          </p>
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <input
              type="email"
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="flex-1 px-4 py-3 text-sm bg-transparent text-white placeholder-slate-500 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 transition-colors whitespace-nowrap m-1 rounded-full flex items-center gap-1.5">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;