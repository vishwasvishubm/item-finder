import { useState, useCallback } from "react";

const KEY = "nearbyiq-recent-searches";
const MAX = 8;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  const addSearch = useCallback((term: string) => {
    const t = term.trim().toLowerCase();
    if (!t) return;
    setSearches((prev) => {
      const next = [t, ...prev.filter((s) => s !== t)].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    localStorage.removeItem(KEY);
    setSearches([]);
  }, []);

  return { searches, addSearch, clearSearches };
}
