// ─────────────────────────────────────────────────────────────────────────────
// components/landing/FAQItem.jsx
//
// A single expandable FAQ row.
// Has its own open/close state — that's intentional, it belongs to the item.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ q, a }) => {
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
        {open
          ? <ChevronUp   className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />}
      </button>
      {open && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
};

export default FAQItem;
