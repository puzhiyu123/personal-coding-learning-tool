"use client";

import { useState, useRef, useCallback } from "react";

interface SuggestionState {
  suggestion: string;
  isLoading: boolean;
  cursorLine: number;
  cursorColumn: number;
}

export function useCodeSuggestions() {
  const [state, setState] = useState<SuggestionState>({
    suggestion: "",
    isLoading: false,
    cursorLine: 0,
    cursorColumn: 0,
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback(
    async (code: string, cursorLine: number, cursorColumn: number, language: string) => {
      // Cancel any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Clear any existing debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Debounce the request
      debounceRef.current = setTimeout(async () => {
        abortControllerRef.current = new AbortController();

        setState((prev) => ({
          ...prev,
          isLoading: true,
          cursorLine,
          cursorColumn,
        }));

        try {
          const response = await fetch("/api/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, cursorLine, cursorColumn, language }),
            signal: abortControllerRef.current.signal,
          });

          if (!response.ok) {
            throw new Error("Failed to fetch suggestion");
          }

          const data = await response.json();

          setState((prev) => ({
            ...prev,
            suggestion: data.suggestion || "",
            isLoading: false,
          }));
        } catch (error) {
          if ((error as Error).name !== "AbortError") {
            setState((prev) => ({
              ...prev,
              suggestion: "",
              isLoading: false,
            }));
          }
        }
      }, 500); // 500ms debounce
    },
    []
  );

  const clearSuggestion = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState({
      suggestion: "",
      isLoading: false,
      cursorLine: 0,
      cursorColumn: 0,
    });
  }, []);

  const acceptSuggestion = useCallback(() => {
    const suggestion = state.suggestion;
    clearSuggestion();
    return suggestion;
  }, [state.suggestion, clearSuggestion]);

  return {
    suggestion: state.suggestion,
    isLoading: state.isLoading,
    cursorLine: state.cursorLine,
    cursorColumn: state.cursorColumn,
    fetchSuggestion,
    clearSuggestion,
    acceptSuggestion,
  };
}
