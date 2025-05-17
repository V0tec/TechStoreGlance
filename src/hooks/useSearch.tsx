// src/hooks/useSearch.js
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function useSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize search query from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("query");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Submitting search for:", searchQuery.trim());
      // Use navigate with { replace: false } to ensure a new history entry
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`, {
        replace: false,
      });
    }
  };

  // Handle Enter key press in search field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log("Enter key pressed, searching for:", searchQuery.trim());
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`, {
          replace: false,
        });
      }
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearchInputChange,
    handleSearchSubmit,
    handleKeyDown,
  };
}

export default useSearch;
