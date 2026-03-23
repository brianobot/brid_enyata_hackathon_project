import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Shield,
  FileText,
  Building2,
  Globe,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const STATS = [
  { value: "500+", label: "Business Databases" },
  { value: "230+", label: "Countries Covered" },
  { value: "99.9%", label: "Uptime Guarantee" },
];

const FEATURES = [
  {
    icon: <Building2 className="w-5 h-5 text-blue-600" />,
    title: "Business Identity Verification",
    description:
      "Verify business registration, legal status, and ownership structures across global registries instantly.",
    tag1: "Registry",
    tag2: "Ownership",
  },
  {
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    title: "Global Business Search",
    description:
      "Search and verify businesses across 230+ countries and jurisdictions with real-time data access.",
    tag1: "Global",
    tag2: "Real-time",
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    title: "Due Diligence Reports",
    description:
      "Generate comprehensive due diligence reports with financial data, legal filings, and risk indicators.",
    tag1: "Reports",
    tag2: "Risk",
  },
  {
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    title: "Compliance Screening",
    description:
      "Screen businesses against sanctions lists, PEP databases, and adverse media sources automatically.",
    tag1: "Sanctions",
    tag2: "AML",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Enter Business Details",
    desc: "Input the company name, registration number, or other identifying information to start the verification process.",
  },
  {
    num: "2",
    title: "Instant Data Retrieval",
    desc: "Our system queries hundreds of authoritative sources simultaneously, returning comprehensive business data in seconds.",
  },
  {
    num: "3",
    title: "Review & Act",
    desc: "Receive a structured report with verification status, risk indicators, and actionable insights for confident decision-making.",
  },
];

const FREE_FEATURES = [
  "5 business lookups per month",
  "Basic company information",
  "Registration status",
  "Country of incorporation",
];

const FREE_MISSING = [
  "Director & shareholder data",
  "Financial statements",
  "Sanctions screening",
  "API access",
];

const PRO_FEATURES = [
  "Unlimited business lookups",
  "Full ownership structure",
  "Director & shareholder data",
  "Financial statements access",
  "Sanctions & PEP screening",
  "API access included",
  "Bulk upload & processing",
  "Priority support",
];

const FAQS = [
  {
    q: "What databases does VerifyBiz connect to?",
    a: "We connect to over 500 official government registries, commercial databases, and authoritative sources across 230+ countries. This includes Companies House (UK), SEC EDGAR (US), EU business registries, and many more.",
  },
  {
    q: "How accurate is the business verification data?",
    a: "Our data is sourced directly from official registries and updated in real-time where possible. Accuracy rates exceed 99% for registered entities in our primary coverage countries.",
  },
  {
    q: "Can I integrate VerifyBiz into my existing workflow?",
    a: "Yes — our REST API allows seamless integration with your CRM, onboarding tools, or compliance platform. We provide SDKs for Node.js, Python, and Ruby.",
  },
  {
    q: "What does a due diligence report include?",
    a: "Reports include registration details, ownership structure, director information, financial summaries where available, sanctions screening results, adverse media hits, and a composite risk score.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [footerQuery, setFooterQuery] = useState("");

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      {/* HERO */}
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

          {/* Search bar */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-lg mx-auto mb-6">
            <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter company name or registration number..."
              className="flex-1 px-3 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 transition-colors">
              Search
            </button>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
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

      {/* FEATURES */}
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
                    {f.icon}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {f.tag1}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      {f.tag2}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          {/* Left */}
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

          {/* Steps */}
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

      {/* PRICING */}
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
            <p className="text-sm text-gray-400 mt-3">
              Start free, scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Free */}
            <div className="border border-gray-200 rounded-2xl p-7">
              <div className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Starter Plan
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Free</div>
              <p className="text-sm text-gray-400 mb-6">
                Perfect for occasional checks
              </p>

              <ul className="space-y-2.5 mb-6">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {FREE_MISSING.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                Get started free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-blue-600 rounded-2xl p-7 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-1 text-xs font-semibold text-blue-200 uppercase tracking-widest">
                Pro Business
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-bold">$50</span>
                <span className="text-blue-200 text-sm mb-1">.000</span>
                <span className="text-blue-200 text-sm mb-1">/month</span>
              </div>
              <p className="text-sm text-blue-200 mb-6">
                For teams that need complete verification
              </p>

              <ul className="space-y-2.5 mb-6">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                    <Check className="w-4 h-4 text-blue-200 flex-shrink-0" />
                    {f}
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

      {/* FAQ */}
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

      {/* CTA BANNER */}
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
              value={footerQuery}
              onChange={(e) => setFooterQuery(e.target.value)}
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
    </div>
  );
}

export default LandingPage;