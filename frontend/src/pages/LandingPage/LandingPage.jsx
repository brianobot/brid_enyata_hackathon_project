// ─────────────────────────────────────────────────────────────────────────────
// pages/LandingPage.jsx
//
// Responsible for ONE thing: assemble the landing page layout.
// No API calls. No business logic. No data definitions.
// If something looks wrong on the page, the bug is probably NOT here.
//
// Where to look instead:
//   copy/data changes     → constants/landingData.js
//   search state/logic    → hooks/useBusinessSearch.js
//   API call / mapping    → services/searchService.js
//   search UI pieces      → components/search/
//   FAQ accordion         → components/landing/FAQItem.jsx
// ─────────────────────────────────────────────────────────────────────────────

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
import BusinessProfileModal  from '../../components/search/BusinessProfileModal';

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

  // All search state + handlers come from the hook — zero search logic here
  const search = useBusinessSearch();

  // ── FULL RESULTS PAGE ──────────────────────────────────────────────────────
  // When the user submits a search, swap the whole page for the results view
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
        <BusinessProfileModal
          business={search.selectedBusiness}
          onClose={search.handleCloseModal}
        />
      </>
    );
  }

  // ── MAIN PAGE ──────────────────────────────────────────────────────────────
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Verify Business Credibility
            <br />
            Before You Engage
          </h1>
          <p className="text-gray-500 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Instantly check company registration, ownership, financial health,
            and compliance status across 230+ countries.
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
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              Trusted by 12,000+ compliance professionals
            </span>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">
              Powerful Tools
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Tools for
              <br />
              Business Verification
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
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 flex-shrink-0">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Verify Businesses with Confidence
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Our streamlined process gives you verified business intelligence
              in three simple steps — no expertise required.
            </p>
            <button className="text-sm bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm">
              Learn more
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
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

      {/* ── PRICING ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">
              Pricing
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Simple pricing for
              <br />
              Business Verification
            </h2>
            <p className="text-sm text-gray-400 mt-3">Start free, scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Free tier */}
            <div className="border border-gray-200 rounded-2xl p-7">
              <div className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Starter Plan</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Free</div>
              <p className="text-sm text-gray-400 mb-6">Perfect for occasional checks</p>
              <ul className="space-y-2.5 mb-6">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                  </li>
                ))}
                {FREE_MISSING.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <X className="w-4 h-4 text-gray-300 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                Get started free
              </button>
            </div>

            {/* Pro tier */}
            <div className="bg-blue-600 rounded-2xl p-7 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-1 text-xs font-semibold text-blue-200 uppercase tracking-widest">Pro Business</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-bold">$50</span>
                <span className="text-blue-200 text-sm mb-1">.000</span>
                <span className="text-blue-200 text-sm mb-1">/month</span>
              </div>
              <p className="text-sm text-blue-200 mb-6">For teams that need complete verification</p>
              <ul className="space-y-2.5 mb-6">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                    <Check className="w-4 h-4 text-blue-200 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-blue-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
                Start Pro Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">FAQ</h2>
            <p className="text-sm text-gray-400">
              Everything you need to know about VerifyBiz and how it works.
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
      <section className="bg-slate-900 py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to verify businesses
            <br />
            with confidence?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Join thousands of compliance teams who trust VerifyBiz.
          </p>
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden max-w-md mx-auto">
            <input
              type="email"
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="flex-1 px-4 py-3 text-sm bg-transparent text-white placeholder-slate-500 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 transition-colors whitespace-nowrap flex items-center gap-1.5">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal lives here so it sits above everything else */}
      <BusinessProfileModal
        business={search.selectedBusiness}
        onClose={search.handleCloseModal}
      />
    </div>
  );
};

export default LandingPage;