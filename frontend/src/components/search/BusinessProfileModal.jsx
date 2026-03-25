// ─────────────────────────────────────────────────────────────────────────────
// components/search/BusinessProfileModal.jsx
//
// Modal overlay shown when a user clicks a business result.
// No state. No logic. Pure display component.
// ─────────────────────────────────────────────────────────────────────────────

import { Building2, MapPin, CheckCircle, X } from 'lucide-react';

const BusinessProfileModal = ({ business, onClose }) => {
  if (!business) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
              {business.status === 'verified' && (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {business.location}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 mb-5">
          {[
            { label: 'Registration No.', value: business.regNumber        },
            { label: 'Industry',         value: business.category         },
            { label: 'Founded',          value: business.founded          },
            { label: 'Trust Score',      value: `${business.trustScore} / 100` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-800 transition-colors">
            View Full Profile
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileModal;
