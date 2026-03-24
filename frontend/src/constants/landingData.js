// ─────────────────────────────────────────────────────────────────────────────
// constants/landingData.js
//
// Pure data — no logic, no JSX, no imports.
// Every array/object the landing page needs lives here.
// To update copy, pricing, FAQs, or features — edit ONLY this file.
// ─────────────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: "500+",  label: "Business Databases" },
  { value: "230+",  label: "Countries Covered"  },
  { value: "99.9%", label: "Uptime Guarantee"   },
];

export const FEATURES = [
  {
    iconName: "Building2",
    title: "Business Identity Verification",
    description:
      "Verify business registration, legal status, and ownership structures across global registries instantly.",
    tag1: "Registry",
    tag2: "Ownership",
  },
  {
    iconName: "Globe",
    title: "Global Business Search",
    description:
      "Search and verify businesses across 230+ countries and jurisdictions with real-time data access.",
    tag1: "Global",
    tag2: "Real-time",
  },
  {
    iconName: "FileText",
    title: "Due Diligence Reports",
    description:
      "Generate comprehensive due diligence reports with financial data, legal filings, and risk indicators.",
    tag1: "Reports",
    tag2: "Risk",
  },
  {
    iconName: "Shield",
    title: "Compliance Screening",
    description:
      "Screen businesses against sanctions lists, PEP databases, and adverse media sources automatically.",
    tag1: "Sanctions",
    tag2: "AML",
  },
];

export const STEPS = [
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

export const FREE_FEATURES = [
  "5 business lookups per month",
  "Basic company information",
  "Registration status",
  "Country of incorporation",
];

export const FREE_MISSING = [
  "Director & shareholder data",
  "Financial statements",
  "Sanctions screening",
  "API access",
];

export const PRO_FEATURES = [
  "Unlimited business lookups",
  "Full ownership structure",
  "Director & shareholder data",
  "Financial statements access",
  "Sanctions & PEP screening",
  "API access included",
  "Bulk upload & processing",
  "Priority support",
];

export const FAQS = [
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

// ── MOCK DATA ─────────────────────────────────────────────────────────────────
// Used as a fallback in searchService.js while Brian's API is in development.
// Once the real API is stable, delete this export and remove the import in
// searchService.js.
export const MOCK_BUSINESSES = [
  { id: 1,  name: "TechFlow Solutions Ltd",      regNumber: "RC 1234567", category: "Technology & Software", location: "Lagos, Nigeria",         status: "verified", trustScore: 92, founded: 2015 },
  { id: 2,  name: "BuildCorp Nigeria",            regNumber: "RC 7654321", category: "Construction",          location: "Abuja, Nigeria",          status: "verified", trustScore: 87, founded: 2010 },
  { id: 3,  name: "RetailMax Ltd",                regNumber: "RC 2345678", category: "Retail",                location: "Port Harcourt, Nigeria",   status: "verified", trustScore: 79, founded: 2018 },
  { id: 4,  name: "FinanceHub Consulting",        regNumber: "RC 3456789", category: "Financial Services",    location: "Lagos, Nigeria",          status: "verified", trustScore: 95, founded: 2012 },
  { id: 5,  name: "GreenField Agriculture Ltd",   regNumber: "RC 4567890", category: "Agriculture",           location: "Kano, Nigeria",           status: "pending",  trustScore: 61, founded: 2020 },
  { id: 6,  name: "MediCare Health Services",     regNumber: "RC 5678901", category: "Healthcare",            location: "Enugu, Nigeria",          status: "verified", trustScore: 88, founded: 2016 },
  { id: 7,  name: "LogiTrans Freight Ltd",        regNumber: "RC 6789012", category: "Logistics & Transport", location: "Lagos, Nigeria",          status: "verified", trustScore: 74, founded: 2014 },
  { id: 8,  name: "EduBridge Schools",            regNumber: "RC 7890123", category: "Education",             location: "Ibadan, Nigeria",         status: "pending",  trustScore: 55, founded: 2021 },
  { id: 9,  name: "Apex Manufacturing Co.",       regNumber: "RC 8901234", category: "Manufacturing",         location: "Kaduna, Nigeria",         status: "verified", trustScore: 83, founded: 2008 },
  { id: 10, name: "InterVerify Solutions",        regNumber: "RC 9012345", category: "Technology & Software", location: "Lagos, Nigeria",          status: "verified", trustScore: 98, founded: 2019 },
];
