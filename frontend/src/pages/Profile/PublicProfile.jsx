// import { useParams } from 'react-router-dom';
import {
  Shield,
  MapPin,
  Calendar,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  Star,
  Building2,
  Search,
  FileText,
  Flag,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const business = {
  name: "TechFlow Solutions Ltd",
  category: "Technology & Software",
  location: "Lagos, Nigeria",
  founded: 2015,
  verifiedDate: "January 2026",
  trustScore: 92,
  trustLabel: "Excellent",
  communityRating: 4.7,
  stats: [
    { value: "150+", label: "Projects" },
    { value: "96%", label: "Satisfaction" },
    { value: "94%", label: "Response Rate" },
  ],
  description:
    "TechFlow Solutions is a leading software development company specialising in enterprise solutions, mobile applications, and cloud infrastructure. We help businesses transform digitally with cutting-edge technology solutions.",
  contact: {
    phone: "+234 802 345 6789",
    email: "contact@techflowsolutions.com",
    website: "www.techflowsolutions.com",
    address: "Lagos, Nigeria",
  },
  performance: [
    { label: "Client Satisfaction", value: 96 },
    { label: "Response Rate", value: 94 },
  ],
  compliance: [
    { title: "CAC Registration", subtitle: "Corporate identity verified" },
    { title: "Tax Compliance", subtitle: "Current and compliant" },
    { title: "Directors Verified", subtitle: "All directors background checked" },
  ],
  reviews: [
    {
      company: "BuildCorp Nigeria",
      industry: "Construction",
      date: "Feb 15, 2026",
      rating: 5,
      text: "Excellent service delivery. They completed our enterprise software project on time and within budget. The team was professional and responsive throughout.",
    },
    {
      company: "RetailMax Ltd",
      industry: "Retail",
      date: "Jan 28, 2026",
      rating: 5,
      text: "Professional team with great technical expertise. They understood our requirements perfectly and delivered beyond expectations. Highly recommend for any software development needs.",
    },
    {
      company: "FinanceHub Consulting",
      industry: "Financial Services",
      date: "Jan 10, 2026",
      rating: 4,
      text: "Good experience overall. The project was delivered successfully and the final product works well. Communication could be improved but we're satisfied with the results.",
    },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ rating, max = 5, size = "w-4 h-4" }) {
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
  const r = 36;
  const circ = 2 * Math.PI * r;
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
      <div
        className="h-full bg-gray-800 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function PublicProfile() {
  // const { businessId } = useParams();
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium">
          <Globe className="w-3.5 h-3.5" /> Public Trust Profile
        </span>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-4">

        {/* ── BUSINESS HEADER CARD ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                    {business.category}
                    <span className="text-gray-300">·</span>
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {business.location}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full ml-4 flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div className="flex items-center gap-5 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Founded {business.founded}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Verified {business.verifiedDate}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <MessageSquare className="w-4 h-4" /> Contact Business
                </button>
                <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Visit Website
                </button>
              </div>
            </div>
          </div>

          <hr className="my-5 border-gray-100" />

          <p className="text-sm text-gray-600 leading-relaxed">{business.description}</p>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="flex gap-4 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 space-y-4 min-w-0">

            {/* Trust & Credibility Score */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Trust &amp; Credibility Score</h2>

              <div className="flex items-center justify-between mb-6">
                {/* Circle */}
                <div className="flex items-center gap-4">
                  <CircleScore score={business.trustScore} />
                  <div>
                    <p className="text-sm font-semibold text-green-600">Trust Score</p>
                    <p className="text-xs text-gray-400">{business.trustLabel}</p>
                  </div>
                </div>

                {/* Community rating */}
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Community Rating</p>
                  <div className="flex items-center gap-2 justify-end">
                    <StarRating rating={business.communityRating} />
                    <span className="text-sm font-semibold text-gray-700">{business.communityRating}/5</span>
                  </div>
                </div>
              </div>

              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-3">
                {business.stats.map((s) => (
                  <div key={s.label} className="border border-gray-100 rounded-xl p-4 text-center">
                    <p className={`text-2xl font-bold ${s.label === "Satisfaction" ? "text-green-500" : s.label === "Response Rate" ? "text-purple-500" : "text-blue-600"}`}>
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification & Compliance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-green-500" />
                Verification &amp; Compliance
              </h2>
              <div className="space-y-3">
                {business.compliance.map((c) => (
                  <div key={c.title} className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{c.title}</p>
                        <p className="text-xs text-gray-500">{c.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-green-600">Verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Recommendations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">
                Community Recommendations ({business.reviews.length})
              </h2>
              <div className="space-y-5">
                {business.reviews.map((r, i) => (
                  <div key={i} className={i < business.reviews.length - 1 ? "pb-5 border-b border-gray-100" : ""}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.company}</p>
                        <p className="text-xs text-gray-400">{r.industry} • {r.date}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <StarRating rating={r.rating} />
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mt-2">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-64 flex-shrink-0 space-y-4">

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <a href={`tel:${business.contact.phone}`} className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {business.contact.phone}
                </a>
                <a href={`mailto:${business.contact.email}`} className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline break-all">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {business.contact.email}
                </a>
                <a href="#" className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline">
                  <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {business.contact.website}
                </a>
                <span className="flex items-center gap-2.5 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {business.contact.address}
                </span>
              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                <MessageSquare className="w-4 h-4" /> Send Message
              </button>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                {business.performance.map((p) => (
                  <div key={p.label}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>{p.label}</span>
                      <span className="font-semibold text-gray-800">{p.value}%</span>
                    </div>
                    <ProgressBar value={p.value} />
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Business badge */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <Shield className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Verified Business</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                This business has completed InterVerify's comprehensive verification process
                including background checks and compliance verification.
              </p>
              <p className="text-xs text-gray-400 mt-2">Last verified: January 2026</p>
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