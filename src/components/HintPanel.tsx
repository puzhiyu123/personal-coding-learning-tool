"use client";

import { useState } from "react";
import { useHints } from "@/hooks/useHints";

interface HintPanelProps {
  code: string;
  language: string;
  lastError?: string;
}

export default function HintPanel({ code, language, lastError }: HintPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { hint, isLoading, error, getHint, clearHint } = useHints();

  const handleGetHint = async () => {
    setIsExpanded(true);
    await getHint(code, language, lastError);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={handleGetHint}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-coral-500/10 text-coral-400 rounded-lg hover:bg-coral-500/20 border border-coral-500/30 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {isLoading ? "Getting hint..." : "Need a hint?"}
      </button>
    );
  }

  return (
    <div className="bg-coral-500/10 border border-coral-500/30 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-coral-500/20">
        <div className="flex items-center gap-2 text-coral-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-medium">Hint</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGetHint}
            disabled={isLoading}
            className="text-xs text-coral-400 hover:text-coral-300 transition-colors"
          >
            {isLoading ? "Loading..." : "New hint"}
          </button>
          <button
            onClick={() => {
              clearHint();
              setIsExpanded(false);
            }}
            className="text-coral-400 hover:text-coral-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sand-400">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Thinking of a helpful hint...
          </div>
        ) : error ? (
          <p className="text-coral-400 text-sm">{error}</p>
        ) : hint ? (
          <p className="text-sand-200 text-sm leading-relaxed">{hint}</p>
        ) : (
          <p className="text-sand-400 text-sm">Click "New hint" to get a hint!</p>
        )}
      </div>
    </div>
  );
}
