"use client";

import { useState, useCallback } from "react";

interface HintState {
  hint: string;
  isLoading: boolean;
  error: string | null;
}

export function useHints() {
  const [state, setState] = useState<HintState>({
    hint: "",
    isLoading: false,
    error: null,
  });

  const getHint = useCallback(
    async (
      code: string,
      language: string,
      errorMessage?: string,
      cursorLine?: number
    ) => {
      setState({ hint: "", isLoading: true, error: null });

      try {
        const response = await fetch("/api/hint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, language, errorMessage, cursorLine }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hint");
        }

        const data = await response.json();

        setState({
          hint: data.hint || "",
          isLoading: false,
          error: null,
        });

        return data.hint;
      } catch (error) {
        setState({
          hint: "",
          isLoading: false,
          error: (error as Error).message,
        });
        return null;
      }
    },
    []
  );

  const clearHint = useCallback(() => {
    setState({ hint: "", isLoading: false, error: null });
  }, []);

  return {
    hint: state.hint,
    isLoading: state.isLoading,
    error: state.error,
    getHint,
    clearHint,
  };
}
