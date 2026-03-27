// ─────────────────────────────────────────────────────────────────────────────
// constants/landingData.js
//
// Pure data — no logic, no JSX, no imports.
// Every array/object the landing page needs lives here.
// To update copy, pricing, FAQs, or features — edit ONLY this file.
// ─────────────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: "5+",  label: "Business Databases" },
  { value: "2+",  label: "Countries Covered"  },
  { value: "99.9%", label: "Uptime Guarantee"   },
];

export const FEATURES = [
  {
    iconName: "Building2",
    title: "Search and Verify any business",
    description:
      "Instantly check the credibility of any company using its name, CAC registration number, website, or phone number.",
    tag1: "Search",
    tag2: "Verify",
  },
  {
    iconName: "Globe",
    title: "Clear Trust Score Insights",
    description:
      "Understand a company's credibility with a transparent trust score based on compliance history, financial credibility, and reviews",
    tag1: "Trust",
    tag2: "Insights",
  },
  {
    iconName: "FileText",
    title: "Verified Compliance Data",
    description:
      "Access official compliance information including CAC registration, tax status, and directore verification in one trusted platform",
    tag1: "Reports",
    tag2: "Risk",
  },
  {
    iconName: "Shield",
    title: "Professional Recommendations",
    description:
      "Read recommendations and reviews from businesses and professionals who have worked with the company before.",
    tag1: "Recommended",
    tag2: "Trust",
  },
];

export const STEPS = [
  {
    num: "1",
    title: "Search and Verify any Business",
    desc: "Search for any company using it name, CAC registration number, website, or phone number.",
  },
  {
    num: "2",
    title: "Review trust Signals",
    desc: "Check trust scores, compliance records and recommendations from professionals who have worked with the company.",
  },
  {
    num: "3",
    title: "Decide with Confidence",
    desc: "Use verified data and credibility insights to make safer and more informed business decisions.",
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
    q: "What's included in the verification process?",
    a: "InterVerify reviews official business information such as CAC registration records, tax compliance data, and supporting documents during verification.",
  },
  {
    q: "How accurate is the business verification data?",
    a: "Our data is sourced directly from official registries and updated in real-time where possible. Accuracy rates exceed 99% for registered entities in our primary coverage countries.",
  },
  {
    q: "Who can use InterVerify?",
    a: "InterVerify is designed for businesses, freelancers, investors, and professionals who want to verify the credibility of companies before working with them.",
  },
  // --- NEW ADDITIONS BELOW ---
  {
    q: "How is the Trust Score calculated?",
    a: "The Trust Score is a proprietary metric derived from your verification level (CAC, TIN, Address), age of business, and history of successful compliance. Higher scores lead to better placement in search results.",
  },
  {
    q: "How long does the verification process take?",
    a: "Once you submit your documents through our 5-step flow, initial automated checks happen instantly. Manual document review typically takes 24–48 hours depending on the complexity.",
  },
  {
    q: "Can I update my documents after submission?",
    a: "Yes. If a document expires or your business details change, you can update your information from your dashboard to maintain your verification badge and trust rating.",
  },
  {
    q: "Is my business data secure with InterVerify?",
    a: "Security is our priority. All sensitive documents (like Director IDs and Tax filings) are encrypted at rest and are only used for the sole purpose of credibility assessment.",
  },
  {
    q: "What happens if my verification is rejected?",
    a: "If an application is rejected, you will receive a specific reason (e.g., blurry document or mismatched TIN). You can resolve the issue and resubmit without starting the entire process over.",
  },
];


