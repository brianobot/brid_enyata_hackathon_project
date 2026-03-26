// ─────────────────────────────────────────────────────────────────────────────
// services/searchService.js
//
// Responsible for ONE thing: talk to Brian's search API and return data.
// No state. No JSX. No UI logic.
//
// To swap in a different API endpoint, update ONLY this file.
// ─────────────────────────────────────────────────────────────────────────────

import api from '../api/axios';
// import { MOCK_BUSINESSES } from '../constants/landingData';

// ── MAPPER ────────────────────────────────────────────────────────────────────
// Translates Brian's API response shape → the shape our UI components expect.
//
// If Brian renames a field, update ONLY the LEFT side of the relevant line.
// The RIGHT side (our internal field names) never changes.
//
// Current API field names (dummy data — update when Brian confirms real names):
//   id, name, reg_number / regNumber / cac_number,
//   category / industry, location / city,
//   status / verified, trust_score / trustScore / score, founded / year_founded
//
const mapBusiness = (raw) => ({
  id:         raw.id,
  name:       raw.name,
  regNumber:  raw.reg_number   ?? raw.regNumber   ?? raw.cac_number  ?? '',
  category:   raw.category     ?? raw.industry    ?? '',
  location:   raw.location     ?? raw.city        ?? '',
  status:     raw.status       ?? (raw.verified ? 'verified' : 'pending'),
  trustScore: raw.trust_score  ?? raw.trustScore  ?? raw.score       ?? 0,
  founded:    raw.founded      ?? raw.year_founded ?? '',
});

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
// searchBusinesses(keyword)
//   → calls GET /v1/businesses/search?keyword=<keyword>
//   → returns Promise<Business[]>  (mapped to our internal shape)
//   → falls back to filtered MOCK_BUSINESSES if the API is unreachable
//
export const searchBusinesses = async (keyword) => {
  try {
    const response = await api.get('/businesses/search', {
      params: { keyword },
    });

    // Handle both response shapes Brian might return:
    //   { data: [...] }  OR  { results: [...] }  OR  just  [...]
    const raw = Array.isArray(response.data)
      ? response.data
      : response.data?.data ?? response.data?.results ?? [];

    return raw.map(mapBusiness);

  } catch (error) {
    // ── Error type guide ──────────────────────────────────────────────────────
    //
    // error.response        server replied with an error status
    //   .status 422         invalid/missing keyword  (won't happen — we guard
    //                       against empty input before calling this function)
    //   .status 401         token expired — axios interceptor auto-redirects
    //   .status 500         Brian's server crashed
    //
    // error.request         request fired but got NO response
    //                       (ngrok tunnel down, CORS not yet configured, offline)
    //
    // anything else         something broke before the request even fired
    //
    if (error.response) {
      console.error('[searchService] Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.warn('[searchService] No response — API may be down. Using mock data.');
    } else {
      console.error('[searchService] Unexpected error:', error.message);
    }

    // ── FALLBACK ──────────────────────────────────────────────────────────────
    // While Brian's API / ngrok is unavailable, filter mock data locally so the
    // UI remains functional during development.
    //
    // ⚠️  DELETE these lines (and the MOCK_BUSINESSES import above) once
    //     Brian's API is stable and CORS is resolved.
    //
    const q = keyword.toLowerCase();
    return MOCK_BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(q)        ||
        b.regNumber.toLowerCase().includes(q)   ||
        b.category.toLowerCase().includes(q)    ||
        b.location.toLowerCase().includes(q)
    );
  }
};
