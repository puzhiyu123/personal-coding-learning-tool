"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import CodeComparisonComponent from "@/components/CodeComparison";
import { codeComparisons } from "@/lib/code-comparisons";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const { viewedComparisons } = useProgressContext();
  const { isDark } = useThemeContext();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(codeComparisons.map((c) => c.category));
    return Array.from(cats).sort();
  }, []);

  const filteredComparisons = useMemo(() => {
    if (!categoryFilter) return codeComparisons;
    return codeComparisons.filter((c) => c.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/practice"
            className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
          >
            Practice
          </Link>
          <span className="text-sand-600">/</span>
          <span className="text-sm text-sand-400">Code Comparisons</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className={cn(
              "text-3xl font-bold font-serif mb-2",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            Code <span className="text-primary-400">Comparisons</span>
          </h1>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            See two approaches side by side. Understand the trade-offs and learn
            when to reach for each pattern.
          </p>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "flex items-center gap-4 mb-6 p-3 rounded-lg",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-sand-50 border border-sand-200"
          )}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-primary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={cn(
                "text-sm",
                isDark ? "text-sand-300" : "text-sand-600"
              )}
            >
              {viewedComparisons.length} / {codeComparisons.length} viewed
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategoryFilter(null)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              categoryFilter === null
                ? "bg-primary-500 text-white"
                : isDark
                  ? "bg-sand-800 text-sand-400 hover:text-sand-200"
                  : "bg-sand-100 text-sand-500 hover:text-sand-700"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                categoryFilter === cat
                  ? "bg-primary-500 text-white"
                  : isDark
                    ? "bg-sand-800 text-sand-400 hover:text-sand-200"
                    : "bg-sand-100 text-sand-500 hover:text-sand-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Comparisons */}
        <div className="space-y-6">
          {filteredComparisons.map((comparison) => (
            <CodeComparisonComponent
              key={comparison.id}
              comparison={comparison}
            />
          ))}
        </div>

        {filteredComparisons.length === 0 && (
          <div className="text-center py-12">
            <p
              className={cn(
                "text-sm",
                isDark ? "text-sand-400" : "text-sand-500"
              )}
            >
              No comparisons match your filter.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
