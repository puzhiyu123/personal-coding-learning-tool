"use client";

import { use } from "react";
import { useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeEditor from "@/components/ChallengeEditor";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import { getDrillById } from "@/lib/drills";
import { createReviewItem, calculateNextReview } from "@/lib/daily-practice";
import { cn } from "@/lib/utils";

interface DrillPageProps {
  params: Promise<{ drillId: string }>;
}

const trackLabels: Record<string, string> = {
  nextjs: "Next.js",
  nodejs: "Node.js",
};

const trackColors: Record<string, string> = {
  nextjs: "bg-purple-500/20 text-purple-400",
  nodejs: "bg-green-500/20 text-green-400",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-primary-500/20 text-primary-400",
  intermediate: "bg-amber-500/20 text-amber-400",
  advanced: "bg-coral-500/20 text-coral-400",
};

export default function DrillPage({ params }: DrillPageProps) {
  const { drillId } = use(params);
  const drill = getDrillById(drillId);
  const { isDark } = useThemeContext();
  const {
    completeDrill,
    isDrillComplete,
    addToReviewPool,
    updateReviewItem,
    reviewPool,
  } = useProgressContext();

  const handleComplete = useCallback(
    (quality?: number) => {
      if (!drill) return;
      const q = quality ?? 5;
      completeDrill(drill.id);

      const existingReview = reviewPool.find(
        (r) => r.challengeId === drill.id
      );
      if (existingReview) {
        const updated = calculateNextReview(existingReview, q);
        updateReviewItem(drill.id, updated);
      } else {
        const newItem = createReviewItem(drill.id, drill.trackId, q);
        addToReviewPool(newItem);
      }
    },
    [drill, completeDrill, reviewPool, updateReviewItem, addToReviewPool]
  );

  if (!drill) {
    return (
      <div className="flex min-h-screen flex-col bg-sand-950">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-sand-100 font-serif">
              Drill Not Found
            </h1>
            <p className="text-sand-400">
              The drill you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/practice/drills"
              className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Browse Drills
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const completed = isDrillComplete(drill.id);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link
            href="/practice"
            className="text-primary-500 hover:text-primary-400 transition-colors"
          >
            Practice
          </Link>
          <span className="text-sand-600">/</span>
          <Link
            href="/practice/drills"
            className="text-primary-500 hover:text-primary-400 transition-colors"
          >
            Drills
          </Link>
          <span className="text-sand-600">/</span>
          <span className={isDark ? "text-sand-400" : "text-sand-500"}>
            {drill.title}
          </span>
        </div>

        {/* Drill Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                trackColors[drill.trackId]
              )}
            >
              {trackLabels[drill.trackId] || drill.trackId}
            </span>
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
            {completed && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                Completed
              </span>
            )}
          </div>
          <h1
            className={cn(
              "text-2xl font-bold font-serif mb-2",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            {drill.title}
          </h1>
          <p className={cn("text-sm", isDark ? "text-sand-400" : "text-sand-500")}>
            {drill.description}
          </p>
          {drill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {drill.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    isDark
                      ? "bg-sand-800 text-sand-400"
                      : "bg-sand-100 text-sand-500"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Challenge Editor */}
        <ChallengeEditor
          challenge={{
            ...drill.challenge,
            title: drill.title,
            description: drill.description,
          }}
          onComplete={handleComplete}
        />
      </main>
      <Footer />
    </div>
  );
}
