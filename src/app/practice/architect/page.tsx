"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import ArchitecturePromptComponent from "@/components/ArchitecturePrompt";
import { architecturePrompts } from "@/lib/architecture-prompts";
import { cn } from "@/lib/utils";

function dateSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function ArchitectPage() {
  const { completedArchPrompts } = useProgressContext();
  const { isDark } = useThemeContext();
  const [showAll, setShowAll] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  const todaysPrompt = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const seed = dateSeed(today + "-architect");
    const index = seed % architecturePrompts.length;
    return architecturePrompts[index];
  }, []);

  const activePrompt = selectedPromptId
    ? architecturePrompts.find((p) => p.id === selectedPromptId) || todaysPrompt
    : todaysPrompt;

  const difficultyColors: Record<string, string> = {
    beginner: "bg-primary-500/20 text-primary-400",
    intermediate: "bg-amber-500/20 text-amber-400",
    advanced: "bg-coral-500/20 text-coral-400",
  };

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
          <span className="text-sm text-sand-400">How Would You Build X?</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className={cn(
              "text-3xl font-bold font-serif mb-2",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            How Would You{" "}
            <span className="text-primary-400">Build X?</span>
          </h1>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            Practice architectural thinking. Read the prompt, sketch your
            approach mentally, then compare with a suggested solution.
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
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={cn(
                "text-sm",
                isDark ? "text-sand-300" : "text-sand-600"
              )}
            >
              {completedArchPrompts.length} / {architecturePrompts.length}{" "}
              completed
            </span>
          </div>
        </div>

        {/* Today's Prompt */}
        {!showAll && (
          <div className="space-y-4">
            <h2
              className={cn(
                "text-sm font-medium uppercase tracking-wider",
                isDark ? "text-sand-500" : "text-sand-400"
              )}
            >
              {selectedPromptId ? "Selected Prompt" : "Today\u0027s Prompt"}
            </h2>
            <ArchitecturePromptComponent key={activePrompt.id} prompt={activePrompt} />
            <button
              onClick={() => setShowAll(true)}
              className={cn(
                "w-full py-3 rounded-xl border text-sm font-medium transition-colors",
                isDark
                  ? "border-sand-800 text-sand-400 hover:text-sand-200 hover:border-sand-700"
                  : "border-sand-200 text-sand-500 hover:text-sand-700 hover:border-sand-300"
              )}
            >
              Browse All Prompts ({architecturePrompts.length})
            </button>
          </div>
        )}

        {/* All Prompts */}
        {showAll && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2
                className={cn(
                  "text-sm font-medium uppercase tracking-wider",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                All Prompts
              </h2>
              <button
                onClick={() => {
                  setSelectedPromptId(null);
                  setShowAll(false);
                }}
                className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
              >
                Back to today&apos;s prompt
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {architecturePrompts.map((prompt) => {
                const isCompleted = completedArchPrompts.includes(prompt.id);
                return (
                  <button
                    key={prompt.id}
                    onClick={() => {
                      setSelectedPromptId(prompt.id);
                      setShowAll(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={cn(
                      "text-left p-4 rounded-xl border transition-all hover:-translate-y-0.5",
                      isDark
                        ? "bg-sand-900 border-sand-800 hover:border-sand-700"
                        : "bg-white border-sand-200 hover:border-sand-300",
                      isCompleted && "ring-1 ring-primary-500/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={cn(
                          "font-semibold text-sm",
                          isDark ? "text-sand-100" : "text-sand-900"
                        )}
                      >
                        {prompt.title}
                      </h3>
                      {isCompleted && (
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                        {prompt.category}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full capitalize",
                          difficultyColors[prompt.difficulty]
                        )}
                      >
                        {prompt.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
