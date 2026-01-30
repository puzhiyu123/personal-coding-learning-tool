"use client";

import { useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import PatternFlashcardComponent from "@/components/PatternFlashcard";
import { patternFlashcards } from "@/lib/pattern-flashcards";
import { cn } from "@/lib/utils";

export default function FlashcardsPage() {
  const { flashcardProgress, getFlashcardsDue } = useProgressContext();
  const { isDark } = useThemeContext();

  const dueCards = useMemo(() => getFlashcardsDue(), [getFlashcardsDue]);

  // Sort cards: due for review first, then unseen, then reviewed-not-due
  const sortedCards = useMemo(() => {
    const dueIds = new Set(dueCards.map((d) => d.cardId));
    const reviewedIds = new Set(flashcardProgress.map((f) => f.cardId));

    const due = patternFlashcards.filter((c) => dueIds.has(c.id));
    const unseen = patternFlashcards.filter(
      (c) => !reviewedIds.has(c.id)
    );
    const reviewedNotDue = patternFlashcards.filter(
      (c) => reviewedIds.has(c.id) && !dueIds.has(c.id)
    );

    return [...due, ...unseen, ...reviewedNotDue];
  }, [dueCards, flashcardProgress]);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/practice"
            className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
          >
            Practice
          </Link>
          <span className="text-sand-600">/</span>
          <span className="text-sm text-sand-400">Pattern Flashcards</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className={cn(
              "text-3xl font-bold font-serif mb-2",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            Pattern <span className="text-primary-400">Flashcards</span>
          </h1>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            Build decision-making intuition with spaced repetition. Flip cards,
            rate your confidence, and the system schedules reviews.
          </p>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-4 mb-6 p-3 rounded-lg",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-sand-50 border border-sand-200"
          )}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              className={cn(
                "text-sm",
                isDark ? "text-sand-300" : "text-sand-600"
              )}
            >
              {dueCards.length} due for review
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-primary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={cn(
                "text-sm",
                isDark ? "text-sand-300" : "text-sand-600"
              )}
            >
              {flashcardProgress.length} / {patternFlashcards.length} studied
            </span>
          </div>
        </div>

        {/* Flashcard Deck */}
        <PatternFlashcardComponent cards={sortedCards} />
      </main>
      <Footer />
    </div>
  );
}
