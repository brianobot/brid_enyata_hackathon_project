// ─────────────────────────────────────────────────────────────────────────────
// hooks/useBusinessSearch.js
//
// Manages all search state and logic. Calls the real API via searchService.
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

  const debounceRef = useRef(null);
  const searchRef   = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Called from input's onChange — debounced API call
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
        const { results } = await searchBusinesses(value);
        setDropdownResults(results.slice(0, 5)); // max 5 in dropdown
        setAllResults(results);
        setSearchError(null);
      } catch (err) {
        console.error('[useBusinessSearch] Search failed:', err);
        setSearchError('Search is temporarily unavailable. Please try again.');
        setDropdownResults([]);
        setAllResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowDropdown(false);

    // Trigger a fresh full search and navigate to results page
    setLoading(true);
    searchBusinesses(query)
      .then(({ results }) => {
        setAllResults(results);
        setShowResultsPage(true);
      })
      .catch((err) => {
        console.error('[useBusinessSearch] Search failed:', err);
        setSearchError('Search is temporarily unavailable. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSelectBusiness = (biz) => {
    setShowDropdown(false);
    setShowResultsPage(false);
    setSelectedBusiness(biz);
  };

  const handleViewAll = () => {
    setShowDropdown(false);
    setShowResultsPage(true);
  };

  const handleBack = () => {
    setShowResultsPage(false);
    setQuery('');
    setAllResults([]);
    setDropdownResults([]);
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery('');
    setDropdownResults([]);
    setAllResults([]);
    setShowDropdown(false);
    setLoading(false);
    setSearchError(null);
  };

  const handleCloseModal = () => setSelectedBusiness(null);

  return {
    query,
    dropdownResults,
    allResults,
    loading,
    showDropdown,
    showResultsPage,
    selectedBusiness,
    searchError,
    searchRef,
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
