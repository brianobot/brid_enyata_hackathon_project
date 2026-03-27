import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  Star,
  Building2,
  Flag,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api/axios";

// ── SHARED UI HELPERS ─────────────────────────────────────────────────────────

function StarRating({ rating, max = 5, size = "w-4 h-4" }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-300 fill-gray-100"
          }`}
        />
      ))}
    </div>
  );
}

function CircleScore({ score }) {
  const r    = 36;
  const circ = 2 * Math.PI * r;

  if (score === null || score === undefined) {
    return (
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} strokeWidth="6" stroke="#e5e7eb" fill="none" />
        </svg>
        <span className="text-sm font-bold text-gray-400 z-10">N/A</span>
      </div>
    );
  }

  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} strokeWidth="6" stroke="#e5e7eb" fill="none" />
        <circle
          cx="40" cy="40" r={r}
          strokeWidth="6"
          stroke="#16a34a"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-bold text-gray-900 z-10">{score}</span>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gray-800 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
}

function getTrustLabel(score) {
  if (score === null || score === undefined) return '—';
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Low';
}

// Build compliance rows from the API's boolean verification flags
function buildComplianceItems(biz) {
  return [
    biz.cac_is_verified     !== undefined && { title: "CAC Registration",     subtitle: "Corporate identity verified",   verified: biz.cac_is_verified     },
    biz.tin_is_verified     !== undefined && { title: "Tax Compliance",        subtitle: "Current and compliant",         verified: biz.tin_is_verified     },
    biz.bvn_is_verified     !== undefined && { title: "Director Verification", subtitle: "Directors background checked",  verified: biz.bvn_is_verified     },
    biz.address_is_verified !== undefined && { title: "Address Verified",      subtitle: "Business address confirmed",    verified: biz.address_is_verified },
  ].filter(Boolean);
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function PublicProfile() {
  const location = useLocation();
  const navigate  = useNavigate();

  // Business data comes from the router state set by SearchResultsPage:
  //   navigate('/business/profile', { state: { business: bizObject } })
  // The bizObject already contains real data from the search API response.
  const bizFromSearch = location.state?.business ?? null;

  // ── Trust Score — from GET /v1/businesses/verification/score ─────────────
  // Seed with the score from the search result so the circle renders immediately
  const [trustScore, setTrustScore]     = useState(
    typeof bizFromSearch?.trustScore === 'number' ? bizFromSearch.trustScore : null
  );
  const [scoreLoading, setScoreLoading] = useState(true);
  const [scoreError, setScoreError]     = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        setScoreLoading(true);
        const res    = await api.get('/businesses/verification/score');
        const parsed = parseFloat(res.data);
        if (!isNaN(parsed)) setTrustScore(parsed);
      } catch (err) {
        console.error('[PublicProfile] Failed to fetch trust score:', err);
        setScoreError(true);
        // Keep the score from search result as a fallback
      } finally {
        setScoreLoading(false);
      }
    };
    fetchScore();
  }, []);

  // ── No data guard ─────────────────────────────────────────────────────────
  if (!bizFromSearch) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-base font-semibold text-gray-500 mb-2">Business not found</p>
          <p className="text-sm text-gray-400 mb-6">
            No business data was provided. Please search for a business first.
          </p>
          <button onClick={() => navigate('/')} className="text-sm text-blue-600 hover:underline">
            ← Back to search
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const biz             = bizFromSearch;
  const complianceItems = buildComplianceItems(biz);
  const trustLabel      = getTrustLabel(trustScore);
  const isVerified      = biz.status === 'verified';

  return (
    <div className="min-h-screen pt-32 bg-gray-100 font-sans text-gray-800">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-4">

        {/* Business Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{biz.name}</h1>
                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                    {biz.category ?? 'Business'}
                    {biz.location && (
                      <>
                        <span className="text-gray-300">·</span>
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {biz.location}
                      </>
                    )}
                  </p>
                </div>
                {isVerified && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full ml-4 flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4">
                {biz.phone && (
                  <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <MessageSquare className="w-4 h-4" /> Contact Business
                  </button>
                )}
                {biz.website && (
                  <a
                    href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {biz.description && (
            <>
              <hr className="my-5 border-gray-100" />
              <p className="text-sm text-gray-600 leading-relaxed">{biz.description}</p>
            </>
          )}
        </div>

        {/* Two-column layout */}
        <div className="flex gap-4 items-start">

          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-4 min-w-0">

            {/* Trust & Credibility Score */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Trust &amp; Credibility Score</h2>
              <div className="flex items-center gap-4 mb-6">
                {scoreLoading ? (
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-gray-300 animate-spin" />
                  </div>
                ) : (
                  <CircleScore score={trustScore} />
                )}
                <div>
                  <p className="text-sm font-semibold text-green-600">Trust Score</p>
                  <p className="text-xs text-gray-400">
                    {scoreLoading
                      ? 'Loading...'
                      : scoreError && trustScore === null
                      ? 'Unavailable'
                      : trustLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification & Compliance */}
            {complianceItems.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500" />
                  Verification &amp; Compliance
                </h2>
                <div className="space-y-3">
                  {complianceItems.map((c) => (
                    <div
                      key={c.title}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                        c.verified ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${c.verified ? 'text-green-500' : 'text-gray-300'}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{c.title}</p>
                          <p className="text-xs text-gray-500">{c.subtitle}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${c.verified ? 'text-green-600' : 'text-gray-400'}`}>
                        {c.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-64 flex-shrink-0 space-y-4">

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                {biz.phone && (
                  <a href={`tel:${biz.phone}`} className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline">
                    <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {biz.phone}
                  </a>
                )}
                {biz.email && (
                  <a href={`mailto:${biz.email}`} className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline break-all">
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {biz.email}
                  </a>
                )}
                {biz.website && (
                  <a
                    href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline"
                  >
                    <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {biz.website}
                  </a>
                )}
                {biz.location && (
                  <span className="flex items-center gap-2.5 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {biz.location}
                  </span>
                )}
              </div>
            </div>

            {/* Verified Business badge */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <Shield className={`w-8 h-8 mb-3 ${isVerified ? 'text-blue-600' : 'text-gray-300'}`} />
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {isVerified ? 'Verified Business' : 'Verification Pending'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {isVerified
                  ? "This business has completed InterVerify's comprehensive verification process including background checks and compliance verification."
                  : "This business has not yet completed the full verification process."}
              </p>
            </div>

            {/* Report an Issue */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Report an Issue</h3>
              <p className="text-xs text-gray-400 mb-4">
                Found incorrect information or have concerns about this business?
              </p>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Flag className="w-3.5 h-3.5" /> Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}