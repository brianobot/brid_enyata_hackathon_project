// ─────────────────────────────────────────────────────────────────────────────
// components/search/TrustBadge.jsx
//
// Displays a colour-coded trust score badge.
// Green ≥ 90  |  Yellow ≥ 70  |  Red < 70
// ─────────────────────────────────────────────────────────────────────────────

const TrustBadge = ({ score }) => {
  const color =
    score >= 90 ? 'text-green-600 bg-green-50 border-green-100' :
    score >= 70 ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
                  'text-red-500 bg-red-50 border-red-100';

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}>
      {score}
    </span>
  );
};

export default TrustBadge;
