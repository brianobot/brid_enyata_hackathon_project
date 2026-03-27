// ─────────────────────────────────────────────────────────────────────────────
// services/searchService.js
//
// Calls the real search API and maps the response to the shape the UI expects.
// ─────────────────────────────────────────────────────────────────────────────

import api from '../api/axios';

// ── MAPPER ────────────────────────────────────────────────────────────────────
// Translates one result item from the API response into the shape our
// UI components (SearchDropdown, SearchResultsPage, TrustBadge) expect.
//
// Real API response shape (from swagger):
// {
//   email, score,
//   bvn_is_verified, cac_is_verified, tin_is_verified, address_is_verified,
//   business_name, business_description,
//   business_phone_number, business_website, business_address
// }
//
const mapBusiness = (raw, index) => ({
  // Use email as a stable unique key since there's no id field in the response
  id: raw.email ?? index,

  // Display fields
  name:        raw.business_name        ?? 'Unknown Business',
  description: raw.business_description ?? '',
  location:    raw.business_address     ?? '',
  phone:       raw.business_phone_number ?? '',
  website:     raw.business_website     ?? '',
  email:       raw.email                ?? '',

  // The real trust score from the API — used directly by TrustBadge
  trustScore: typeof raw.score === 'number' ? raw.score : null,

  // Derive verified status from the individual verification flags.
  // A business is "verified" if at least CAC and TIN are verified.
  status: (raw.cac_is_verified && raw.tin_is_verified) ? 'verified' : 'pending',

  // Individual verification flags — used by PublicProfile compliance section
  cac_is_verified:     raw.cac_is_verified     ?? false,
  tin_is_verified:     raw.tin_is_verified      ?? false,
  bvn_is_verified:     raw.bvn_is_verified      ?? false,
  address_is_verified: raw.address_is_verified  ?? false,

  // These fields don't come from search — will be null until profile page loads
  category:   null,
  regNumber:  null,
  founded:    null,
});

// ── SEARCH FUNCTION ───────────────────────────────────────────────────────────
// Returns Promise<{ results: Business[], totalCount: number, totalPages: number }>
//
export const searchBusinesses = async (keyword) => {
  
  const response = await api.get('/businesses/search', {
    params: { keyword },
  });

  // API returns: { count, total_pages, results: [...] }
  const data = response.data;
  const rawResults = Array.isArray(data?.results) ? data.results : [];

  return {
    results:     rawResults.map(mapBusiness),
    totalCount:  data?.count       ?? rawResults.length,
    totalPages:  data?.total_pages ?? 1,
  };
};