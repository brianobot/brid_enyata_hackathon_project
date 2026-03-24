// ─────────────────────────────────────────────────────────────────────────────
// components/search/SearchBar.jsx
//
// Responsible for ONE thing: render the search input area.
// No state. No API calls. Receives everything via props from useBusinessSearch.
// ─────────────────────────────────────────────────────────────────────────────

import { Search, X, AlertCircle } from 'lucide-react';
import SearchDropdown from './SearchDropdown';

const SearchBar = ({
  query,
  loading,
  showDropdown,
  dropdownResults,
  searchError,
  searchRef,
  onQueryChange,
  onKeyDown,
  onSearch,
  onClear,
  onSelectBusiness,
  onViewAll,
}) => {
  return (
    <div className="relative max-w-lg mx-auto mb-6" ref={searchRef}>
      {/* Input row */}
      <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" />

        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          onFocus={() => query && true} // dropdown visibility controlled by hook
          placeholder="Enter company name or registration number..."
          className="flex-1 px-3 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
        />

        {/* Clear button — only shown when there's text */}
        {query && (
          <button
            onClick={onClear}
            className="text-gray-300 hover:text-gray-500 px-2 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Live dropdown */}
      {showDropdown && (
        <SearchDropdown
          results={dropdownResults}
          query={query}
          loading={loading}
          onSelect={onSelectBusiness}
          onViewAll={onViewAll}
        />
      )}

      {/* Error message — only shown if API fails AND fallback also fails */}
      {searchError && !showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs px-4 py-2.5 rounded-xl shadow-sm">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {searchError}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
