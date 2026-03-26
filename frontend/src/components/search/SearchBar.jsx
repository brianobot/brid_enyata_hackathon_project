import { Search, X, AlertCircle, Loader2 } from 'lucide-react';
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
    <div className="relative max-w-2xl mx-auto mb-10" ref={searchRef}>
      {/* Search Container with Glassmorphism and Ring Glow */}
      <div className="group relative flex items-center bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-xl shadow-blue-500/5 transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 focus-within:shadow-blue-500/10 overflow-hidden">
        
        {/* Animated Icon: Changes color on focus */}
        <div className="pl-5 pr-2 transition-colors duration-300 group-focus-within:text-blue-600 text-slate-400">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          placeholder="Enter company name or registration number..."
          className="flex-1 py-4 text-base outline-none text-slate-700 bg-transparent placeholder-slate-400 font-medium"
        />

        {/* Action Buttons Container */}
        <div className="flex items-center gap-1 pr-2">
          {query && (
            <button
              onClick={onClear}
              className="p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-full transition-all"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onSearch}
            className="bg-[#154470] hover:bg-[#61a979] active:scale-95 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-md shadow-blue-600/20 mr-1"
          >
            Search
          </button>
        </div>
      </div>

      {/* Live dropdown with matching style */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <SearchDropdown
            results={dropdownResults}
            query={query}
            loading={loading}
            onSelect={onSelectBusiness}
            onViewAll={onViewAll}
          />
        </div>
      )}

      {/* Error message with subtle animation */}
      {searchError && !showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-4 flex items-center gap-3 bg-red-50/90 backdrop-blur-sm border border-red-100 text-red-600 text-sm py-3 px-4 rounded-2xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">{searchError}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;