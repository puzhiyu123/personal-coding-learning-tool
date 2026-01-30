"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import { allDrills } from "@/lib/drills";
import { cn } from "@/lib/utils";

type TrackFilter = "all" | "nextjs" | "nodejs";
type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";

const trackLabels: Record<string, string> = {
  nextjs: "Next.js",
  nodejs: "Node.js",
};

const trackColorClasses: Record<string, string> = {
  nextjs: "bg-purple-500/20 text-purple-400",
  nodejs: "bg-green-500/20 text-green-400",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-primary-500/20 text-primary-400",
  intermediate: "bg-amber-500/20 text-amber-400",
  advanced: "bg-coral-500/20 text-coral-400",
};

export default function DrillsLibraryPage() {
  const { isDrillComplete } = useProgressContext();
  const { isDark } = useThemeContext();

  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");

  const filteredDrills = useMemo(() => {
    return allDrills.filter((d) => {
      if (trackFilter !== "all" && d.trackId !== trackFilter) return false;
      if (difficultyFilter !== "all" && d.difficulty !== difficultyFilter)
        return false;
      return true;
    });
  }, [trackFilter, difficultyFilter]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filteredDrills>();
    for (const drill of filteredDrills) {
      const key = `${drill.trackId}:${drill.category}`;
      const existing = map.get(key) || [];
      map.set(key, [...existing, drill]);
    }
    return map;
  }, [filteredDrills]);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/practice"
              className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
            >
              Practice
            </Link>
            <span className="text-sand-600">/</span>
            <span className="text-sm text-sand-400">Drills Library</span>
          </div>
          <h1
            className={cn(
              "text-3xl font-bold font-serif mb-2",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            Coding <span className="text-primary-400">Drills</span>
          </h1>
          <p className={cn("text-sm", isDark ? "text-sand-400" : "text-sand-500")}>
            Practice specific skills with focused coding exercises. Complete
            drills to add them to your spaced repetition review.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Track Filter */}
          <div className="flex gap-1">
            {(["all", "nextjs", "nodejs"] as TrackFilter[]).map((value) => (
              <button
                key={value}
                onClick={() => setTrackFilter(value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  trackFilter === value
                    ? "bg-primary-500 text-white"
                    : isDark
                      ? "bg-sand-800 text-sand-400 hover:text-sand-200"
                      : "bg-sand-100 text-sand-500 hover:text-sand-700"
                )}
              >
                {value === "all" ? "All Tracks" : trackLabels[value]}
              </button>
            ))}
          </div>
          {/* Difficulty Filter */}
          <div className="flex gap-1">
            {(
              ["all", "beginner", "intermediate", "advanced"] as DifficultyFilter[]
            ).map((value) => (
              <button
                key={value}
                onClick={() => setDifficultyFilter(value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
                  difficultyFilter === value
                    ? "bg-primary-500 text-white"
                    : isDark
                      ? "bg-sand-800 text-sand-400 hover:text-sand-200"
                      : "bg-sand-100 text-sand-500 hover:text-sand-700"
                )}
              >
                {value === "all" ? "All Levels" : value}
              </button>
            ))}
          </div>
        </div>

        {/* Drills Grid */}
        {grouped.size === 0 ? (
          <div className="text-center py-12">
            <p className={cn("text-sm", isDark ? "text-sand-400" : "text-sand-500")}>
              No drills match your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {[...grouped.entries()].map(([key, drills]) => {
              const [trackId, category] = key.split(":");
              return (
                <div key={key}>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        trackColorClasses[trackId]
                      )}
                    >
                      {trackLabels[trackId]}
                    </span>
                    <h2
                      className={cn(
                        "text-lg font-semibold",
                        isDark ? "text-sand-200" : "text-sand-800"
                      )}
                    >
                      {category}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drills.map((drill) => {
                      const completed = isDrillComplete(drill.id);
                      return (
                        <Link
                          key={drill.id}
                          href={`/practice/drills/${drill.id}`}
                          className={cn(
                            "group rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5",
                            isDark
                              ? "bg-sand-900 border-sand-800 hover:border-sand-700"
                              : "bg-white border-sand-200 hover:border-sand-300",
                            completed && "ring-1 ring-primary-500/30"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3
                              className={cn(
                                "font-semibold text-sm line-clamp-2",
                                isDark ? "text-sand-100" : "text-sand-900"
                              )}
                            >
                              {drill.title}
                            </h3>
                            {completed && (
                              <svg
                                className="w-5 h-5 text-primary-500 flex-shrink-0 ml-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <p
                            className={cn(
                              "text-xs line-clamp-2 mb-3",
                              isDark ? "text-sand-400" : "text-sand-500"
                            )}
                          >
                            {drill.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full capitalize",
                                difficultyColors[drill.difficulty]
                              )}
                            >
                              {drill.difficulty}
                            </span>
                            <span
                              className={cn(
                                "text-xs",
                                isDark ? "text-sand-500" : "text-sand-400"
                              )}
                            >
                              ~{drill.estimatedMinutes} min
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        <div
          className={cn(
            "mt-8 p-4 rounded-xl text-center",
            isDark ? "bg-sand-900 border border-sand-800" : "bg-sand-50 border border-sand-200"
          )}
        >
          <p className={cn("text-sm", isDark ? "text-sand-400" : "text-sand-500")}>
            {filteredDrills.length} drills available
            {filteredDrills.filter((d) => isDrillComplete(d.id)).length > 0 && (
              <span className="text-primary-500">
                {" "}
                ({filteredDrills.filter((d) => isDrillComplete(d.id)).length}{" "}
                completed)
              </span>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
