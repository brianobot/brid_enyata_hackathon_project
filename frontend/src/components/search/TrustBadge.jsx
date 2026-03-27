// ─────────────────────────────────────────────────────────────────────────────
// components/search/TrustBadge.jsx
//
// Displays the REAL trust score from the API.
// Score comes from the `score` field in the search results response.
// Handles null/undefined gracefully while data loads.
//
// Green ≥ 70  |  Yellow ≥ 40  |  Red < 40  |  Grey = not available
// ─────────────────────────────────────────────────────────────────────────────

const TrustBadge = ({ score }) => {
  // Score not available yet (null, undefined, or not a number)
  if (score === null || score === undefined || typeof score !== 'number') {
    return (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full border text-gray-400 bg-gray-50 border-gray-200">
        N/A
      </span>
    );
  }

  const color =
    score >= 70 ? 'text-green-600 bg-green-50 border-green-100' :
    score >= 40 ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
                  'text-red-500 bg-red-50 border-red-100';

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}>
      {score}
    </span>
  );
};

export default TrustBadge;