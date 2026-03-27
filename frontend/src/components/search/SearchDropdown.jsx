import { Building2, MapPin, AlertCircle, Loader2, ArrowRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadge from './TrustBadge';

const SearchDropdown = ({ results, query, loading, onViewAll }) => {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Searching businesses...
        </div>

      ) : results.length === 0 ? (
        <div className="py-8 text-center">
          <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-500">No businesses found</p>
          <p className="text-xs text-gray-400 mt-1">
            Try searching by name or registration number
          </p>
        </div>

      ) : (
        <>
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>

          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
            {results.map((biz) => (
              <li key={biz.id}>
                <Link
                  to={`/profile/${biz.id}`}
                  state={{ business: biz }}  // pass business data to profile page
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700">
                        {biz.name}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <span>{biz.regNumber}</span>
                        <span>·</span>
                        <MapPin className="w-3 h-3" />
                        <span>{biz.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <TrustBadge score={biz.trustScore} />
                    {biz.status === 'verified' ? (
                      <BadgeCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* View all link – keep as button with onViewAll */}
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onViewAll}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              View all results for "{query}"
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchDropdown;