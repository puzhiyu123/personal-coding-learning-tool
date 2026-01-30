"use client";

import { useState, useMemo, useCallback } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import type { PatternFlashcard } from "@/lib/pattern-flashcards";
import { cn } from "@/lib/utils";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

interface PatternFlashcardDeckProps {
  cards: PatternFlashcard[];
}

export default function PatternFlashcardDeck({
  cards,
}: PatternFlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const { updateFlashcardProgress } = useProgressContext();
  const { isDark } = useThemeContext();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(cards.map((c) => c.category)));
    return unique.sort();
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (!categoryFilter) return cards;
    return cards.filter((c) => c.category === categoryFilter);
  }, [cards, categoryFilter]);

  const currentCard = filteredCards[currentIndex];

  const highlightedCode = useMemo(() => {
    if (!currentCard?.back.codeExample) return null;
    const { code, language } = currentCard.back.codeExample;
    const lang = hljs.getLanguage(language) ? language : "javascript";
    try {
      return hljs.highlight(code, { language: lang }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [currentCard]);

  const goToPrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  }, [filteredCards.length]);

  const goToNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  }, [filteredCards.length]);

  const handleRate = useCallback(
    (quality: number) => {
      if (!currentCard) return;
      updateFlashcardProgress(currentCard.id, quality);
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex((prev) =>
          prev < filteredCards.length - 1 ? prev + 1 : 0
        );
      }, 500);
    },
    [currentCard, filteredCards.length, updateFlashcardProgress]
  );

  const handleCategoryFilter = useCallback(
    (category: string | null) => {
      setCategoryFilter(category);
      setCurrentIndex(0);
      setIsFlipped(false);
    },
    []
  );

  if (filteredCards.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border p-8 text-center",
          isDark ? "bg-sand-900 border-sand-800" : "bg-white border-sand-200"
        )}
      >
        <p
          className={cn(
            "text-base",
            isDark ? "text-sand-400" : "text-sand-500"
          )}
        >
          No flashcards available for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            categoryFilter === null
              ? "bg-primary-500 text-white"
              : isDark
                ? "bg-sand-800 text-sand-400"
                : "bg-sand-100 text-sand-500"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              categoryFilter === category
                ? "bg-primary-500 text-white"
                : isDark
                  ? "bg-sand-800 text-sand-400"
                  : "bg-sand-100 text-sand-500"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrev}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            isDark
              ? "bg-sand-800 text-sand-300 hover:bg-sand-700"
              : "bg-sand-100 text-sand-600 hover:bg-sand-200"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span
          className={cn(
            "text-sm font-medium",
            isDark ? "text-sand-400" : "text-sand-500"
          )}
        >
          {currentIndex + 1} of {filteredCards.length}
        </span>
        <button
          onClick={goToNext}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            isDark
              ? "bg-sand-800 text-sand-300 hover:bg-sand-700"
              : "bg-sand-100 text-sand-600 hover:bg-sand-200"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Flashcard */}
      <div
        className={cn(
          "rounded-xl border overflow-hidden transition-all",
          isDark ? "bg-sand-900 border-sand-800" : "bg-white border-sand-200"
        )}
      >
        {!isFlipped ? (
          /* Front View */
          <div className="p-6 flex flex-col items-center text-center min-h-[280px]">
            {/* Category Badge */}
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium mb-6",
                isDark
                  ? "bg-sand-800 text-sand-400"
                  : "bg-sand-100 text-sand-500"
              )}
            >
              {currentCard.category}
            </span>

            {/* Question */}
            <div className="flex-1 flex items-center justify-center">
              <p
                className={cn(
                  "text-xl font-serif leading-relaxed",
                  isDark ? "text-sand-100" : "text-sand-900"
                )}
              >
                {currentCard.front}
              </p>
            </div>

            {/* Flip Button */}
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-6 px-6 py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Flip
            </button>
          </div>
        ) : (
          /* Back View */
          <div className="p-6 space-y-5">
            {/* Category Badge */}
            <div className="flex justify-center">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  isDark
                    ? "bg-sand-800 text-sand-400"
                    : "bg-sand-100 text-sand-500"
                )}
              >
                {currentCard.category}
              </span>
            </div>

            {/* Answer */}
            <p
              className={cn(
                "text-base leading-relaxed",
                isDark ? "text-sand-300" : "text-sand-600"
              )}
            >
              {currentCard.back.answer}
            </p>

            {/* Examples */}
            {currentCard.back.examples.length > 0 && (
              <ul className="space-y-2">
                {currentCard.back.examples.map((example, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "text-sm",
                      isDark ? "text-sand-300" : "text-sand-600"
                    )}
                  >
                    <span
                      className={cn(
                        "font-semibold",
                        isDark ? "text-sand-200" : "text-sand-800"
                      )}
                    >
                      {example.label}
                    </span>{" "}
                    <span
                      className={cn(
                        isDark ? "text-sand-500" : "text-sand-400"
                      )}
                    >
                      &rarr;
                    </span>{" "}
                    {example.recommendation}
                  </li>
                ))}
              </ul>
            )}

            {/* Code Example */}
            {currentCard.back.codeExample && highlightedCode && (
              <div
                className={cn(
                  "rounded-lg overflow-hidden border",
                  isDark ? "border-sand-700" : "border-sand-300"
                )}
              >
                <div
                  className={cn(
                    "px-3 py-2 text-xs font-medium",
                    isDark
                      ? "bg-sand-800 text-sand-400"
                      : "bg-sand-100 text-sand-500"
                  )}
                >
                  {currentCard.back.codeExample.title}
                </div>
                <pre
                  className={cn(
                    "p-4 text-sm font-mono overflow-x-auto",
                    isDark ? "bg-sand-950" : "bg-sand-50"
                  )}
                >
                  <code
                    className="hljs"
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            )}

            {/* Self-Rating Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleRate(1)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Again
              </button>
              <button
                onClick={() => handleRate(3)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
              >
                Hard
              </button>
              <button
                onClick={() => handleRate(4)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
              >
                Good
              </button>
              <button
                onClick={() => handleRate(5)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
              >
                Easy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
