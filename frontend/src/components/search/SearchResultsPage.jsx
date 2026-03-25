// ─────────────────────────────────────────────────────────────────────────────
// components/search/SearchResultsPage.jsx
//
// Full-page results view shown when the user submits a search.
// No state. No logic. Pure display component.
// ─────────────────────────────────────────────────────────────────────────────

import { Building2, MapPin, AlertCircle, BadgeCheck } from 'lucide-react';
import TrustBadge from './TrustBadge';

const SearchResultsPage = ({ query, results, onBack, onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline mb-5 flex items-center gap-1"
        >
          ← Back to home
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Search Results</h2>
        <p className="text-sm text-gray-400 mb-6">
          {results.length} business{results.length !== 1 ? 'es' : ''} found for{' '}
          <span className="font-semibold text-gray-600">"{query}"</span>
        </p>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <AlertCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-base font-semibold text-gray-500 mb-1">No businesses found</p>
            <p className="text-sm text-gray-400">Try a different name or registration number.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((biz) => (
              <button
                key={biz.id}
                onClick={() => onSelect(biz)}
                className="w-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {biz.name}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>{biz.regNumber}</span>
                        <span>·</span>
                        <span>{biz.category}</span>
                        <span>·</span>
                        <MapPin className="w-3 h-3" />
                        <span>{biz.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">Trust Score</p>
                      <TrustBadge score={biz.trustScore} />
                    </div>
                    <div className="flex flex-col items-center">
                      {biz.status === 'verified' ? (
                        <>
                          <BadgeCheck className="w-5 h-5 text-green-500" />
                          <span className="text-xs text-green-600 font-medium mt-0.5">Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                          <span className="text-xs text-yellow-600 font-medium mt-0.5">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
