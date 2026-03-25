// ─────────────────────────────────────────────────────────────────────────────
// hooks/useBusinessSearch.js
//
// Responsible for ONE thing: manage all search-related state and logic.
// No JSX. No API calls (that's searchService's job).
//
// Any component that needs search behaviour just calls:
//   const search = useBusinessSearch();
// and gets back everything it needs.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { searchBusinesses } from '../services/searchService';

export const useBusinessSearch = () => {
  const [query, setQuery]                     = useState('');
  const [dropdownResults, setDropdownResults] = useState([]);
  const [allResults, setAllResults]           = useState([]);
  const [loading, setLoading]                 = useState(false);
  const [showDropdown, setShowDropdown]       = useState(false);
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchError, setSearchError]         = useState(null);

  // Holds the debounce timer. useRef so it persists across renders
  // without causing a re-render when it changes.
  const debounceRef = useRef(null);

  // Holds a ref to the search bar wrapper div — used by the
  // click-outside handler below to close the dropdown.
  const searchRef = useRef(null);

  // ── CLICK OUTSIDE ──────────────────────────────────────────────────────────
  // Close the dropdown when the user clicks anywhere outside the search bar.
  // This is a legitimate useEffect — it subscribes to a DOM event and
  // unsubscribes on cleanup. No setState in the effect body itself. ✅
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── QUERY CHANGE ───────────────────────────────────────────────────────────
  // Called from the search input's onChange.
  // Debounces the API call by 350ms so we don't fire on every keystroke.
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setDropdownResults([]);
      setAllResults([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setShowDropdown(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchBusinesses(value);
        setDropdownResults(results.slice(0, 5)); // max 5 shown in dropdown
        setAllResults(results);                  // full list for results page
        setSearchError(null);
      } catch (err) {
        // searchBusinesses catches most errors internally and returns mock data.
        // This catch only fires if something truly unexpected happens.
        setSearchError('Search is temporarily unavailable. Please try again.');
        setDropdownResults([]);
        setAllResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  // ── SEARCH SUBMIT ───────────────────────────────────────────────────────────
  // Called when the user clicks Search or presses Enter.
  // Cancels any pending debounce and navigates to the full results page.
  const handleSearch = () => {
    if (!query.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowDropdown(false);
    setShowResultsPage(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  // ── RESULT SELECTION ────────────────────────────────────────────────────────
  // Called when the user clicks a result in the dropdown or results page.
  const handleSelectBusiness = (biz) => {
    setShowDropdown(false);
    setShowResultsPage(false);
    setSelectedBusiness(biz);
  };

  // ── VIEW ALL ────────────────────────────────────────────────────────────────
  // Called from the "View all results" link at the bottom of the dropdown.
  const handleViewAll = () => {
    setShowDropdown(false);
    setShowResultsPage(true);
  };

  // ── BACK ────────────────────────────────────────────────────────────────────
  // Called from the results page back button.
  const handleBack = () => {
    setShowResultsPage(false);
    setQuery('');
    setAllResults([]);
    setDropdownResults([]);
  };

  // ── CLEAR ───────────────────────────────────────────────────────────────────
  // Called from the X button inside the search input.
  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery('');
    setDropdownResults([]);
    setAllResults([]);
    setShowDropdown(false);
    setLoading(false);
    setSearchError(null);
  };

  // ── CLOSE MODAL ─────────────────────────────────────────────────────────────
  const handleCloseModal = () => setSelectedBusiness(null);

  // Return everything the UI needs
  return {
    // State
    query,
    dropdownResults,
    allResults,
    loading,
    showDropdown,
    showResultsPage,
    selectedBusiness,
    searchError,
    // Refs (passed to JSX elements directly)
    searchRef,
    // Handlers
    handleQueryChange,
    handleSearch,
    handleKeyDown,
    handleSelectBusiness,
    handleViewAll,
    handleBack,
    handleClear,
    handleCloseModal,
  };
};
