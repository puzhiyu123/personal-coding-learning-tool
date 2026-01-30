"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useProgressContext } from "./ProgressProvider";
import { useThemeContext } from "./ThemeProvider";
import ChallengeEditor from "./ChallengeEditor";
import DailyTipComponent from "./DailyTip";
import PracticeSessionSummary from "./PracticeSessionSummary";
import StreakBadge from "./StreakBadge";
import { getDailyExercises, detectActiveTracks, createReviewItem, calculateNextReview } from "@/lib/daily-practice";
import { getDailyTip } from "@/lib/daily-tips";
import type { DailyExercise } from "@/lib/daily-practice";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Phase = "tip" | "practice" | "summary";

export default function DailyPractice() {
  const {
    completedDrills,
    completedLessons,
    streakData,
    reviewPool,
    shownTipIds,
    completeDrill,
    recordPracticeSession,
    addToReviewPool,
    updateReviewItem,
    getReviewsDue,
    markTipShown,
    isLoaded,
  } = useProgressContext();

  const { isDark } = useThemeContext();

  const [phase, setPhase] = useState<Phase>("tip");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showTipDuringPractice, setShowTipDuringPractice] = useState(false);

  const activeTracks = useMemo(
    () => detectActiveTracks(completedLessons),
    [completedLessons]
  );

  const reviewsDue = useMemo(() => getReviewsDue(), [getReviewsDue]);

  const exercises: DailyExercise[] = useMemo(() => {
    if (!isLoaded) return [];
    return getDailyExercises(
      activeTracks,
      completedDrills,
      reviewsDue,
      completedLessons
    );
  }, [isLoaded, activeTracks, completedDrills, reviewsDue, completedLessons]);

  const dailyTip = useMemo(() => {
    if (!isLoaded) return null;
    return getDailyTip(activeTracks, shownTipIds);
  }, [isLoaded, activeTracks, shownTipIds]);

  // Mark tip as shown on mount
  useEffect(() => {
    if (dailyTip) {
      markTipShown(dailyTip.id);
    }
  }, [dailyTip?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExerciseComplete = useCallback(
    (quality?: number) => {
      const exercise = exercises[currentIndex];
      if (!exercise) return;

      const q = quality ?? 5;
      const drillId = exercise.drill.id;
      const trackId = exercise.drill.trackId;

      // Mark drill complete
      completeDrill(drillId);
      setCompletedIds((prev) => [...new Set([...prev, drillId])]);

      // Update or create review item
      const existingReview = reviewPool.find(
        (r) => r.challengeId === drillId
      );
      if (existingReview) {
        const updated = calculateNextReview(existingReview, q);
        updateReviewItem(drillId, updated);
      } else {
        const newItem = createReviewItem(drillId, trackId, q);
        addToReviewPool(newItem);
      }

      // Auto-advance after a short delay
      setTimeout(() => {
        if (currentIndex < exercises.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // All done
          const allIds = [
            ...new Set([...completedIds, drillId]),
          ];
          recordPracticeSession(allIds);
          setPhase("summary");
        }
      }, 1500);
    },
    [
      exercises,
      currentIndex,
      completedIds,
      completeDrill,
      reviewPool,
      updateReviewItem,
      addToReviewPool,
      recordPracticeSession,
    ]
  );

  const handleSkip = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      recordPracticeSession(completedIds);
      setPhase("summary");
    }
  }, [currentIndex, exercises.length, completedIds, recordPracticeSession]);

  const handlePracticeAgain = () => {
    setPhase("tip");
    setCurrentIndex(0);
    setCompletedIds([]);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className={cn("animate-spin w-8 h-8 border-2 rounded-full", isDark ? "border-sand-700 border-t-primary-500" : "border-sand-200 border-t-primary-500")} />
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className={cn("text-xl font-bold font-serif", isDark ? "text-sand-100" : "text-sand-900")}>
          No exercises available
        </h2>
        <p className={cn("text-sm max-w-md mx-auto", isDark ? "text-sand-400" : "text-sand-500")}>
          Start some lessons first to unlock daily practice drills, or browse the drills library.
        </p>
      </div>
    );
  }

  // Phase: Daily Tip
  if (phase === "tip") {
    return (
      <div className="space-y-6">
        {/* Streak */}
        <div className="flex items-center justify-between">
          <h1 className={cn("text-2xl font-bold font-serif", isDark ? "text-sand-100" : "text-sand-900")}>
            Daily Practice
          </h1>
          <StreakBadge streak={streakData.currentStreak} />
        </div>

        {/* Tip */}
        {dailyTip && (
          <DailyTipComponent tip={dailyTip} isDark={isDark} />
        )}

        {/* Learning Tools */}
        <div className="space-y-3">
          <h2 className={cn("text-sm font-medium uppercase tracking-wider", isDark ? "text-sand-500" : "text-sand-400")}>
            Learning Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                href: "/practice/drills/daily",
                title: "Quick Quiz",
                description: "10 rapid-fire questions",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                href: "/practice/architect",
                title: "Build X",
                description: "Architecture thinking",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                href: "/practice/flashcards",
                title: "Flashcards",
                description: "Pattern decisions",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                href: "/practice/compare",
                title: "Compare",
                description: "Code trade-offs",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all hover:-translate-y-0.5",
                  isDark
                    ? "bg-sand-900 border-sand-800 hover:border-sand-700"
                    : "bg-white border-sand-200 hover:border-sand-300"
                )}
              >
                <div className="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 flex-shrink-0">
                  {tool.icon}
                </div>
                <div>
                  <p className={cn("text-sm font-semibold", isDark ? "text-sand-100" : "text-sand-900")}>
                    {tool.title}
                  </p>
                  <p className={cn("text-xs", isDark ? "text-sand-500" : "text-sand-400")}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => setPhase("practice")}
          className="w-full py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold text-lg"
        >
          Start Practice ({exercises.length} exercises)
        </button>

        {/* Quick Info */}
        <div className={cn("grid grid-cols-3 gap-3", isDark ? "text-sand-400" : "text-sand-500")}>
          {[
            {
              label: "Review",
              count: exercises.filter((e) => e.type === "review").length,
            },
            {
              label: "New",
              count: exercises.filter((e) => e.type === "new").length,
            },
            {
              label: "Stretch",
              count: exercises.filter((e) => e.type === "stretch").length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "text-center p-3 rounded-lg",
                isDark ? "bg-sand-900 border border-sand-800" : "bg-sand-50 border border-sand-200"
              )}
            >
              <p className={cn("text-lg font-bold", isDark ? "text-sand-200" : "text-sand-700")}>
                {item.count}
              </p>
              <p className="text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Phase: Practice
  if (phase === "practice") {
    const currentExercise = exercises[currentIndex];
    const typeLabels: Record<string, string> = {
      review: "Review",
      new: "New",
      stretch: "Stretch",
    };
    const typeColors: Record<string, string> = {
      review: "bg-blue-500/20 text-blue-400",
      new: "bg-primary-500/20 text-primary-400",
      stretch: "bg-amber-500/20 text-amber-400",
    };

    return (
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className={cn("h-2 rounded-full overflow-hidden", isDark ? "bg-sand-800" : "bg-sand-200")}>
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / exercises.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <span className={cn("text-sm font-medium whitespace-nowrap", isDark ? "text-sand-400" : "text-sand-500")}>
            {currentIndex + 1} / {exercises.length}
          </span>
          <StreakBadge streak={streakData.currentStreak} size="sm" showLabel={false} />
        </div>

        {/* Exercise Type Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                typeColors[currentExercise.type]
              )}
            >
              {typeLabels[currentExercise.type]}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                isDark ? "bg-sand-800 text-sand-400" : "bg-sand-100 text-sand-500"
              )}
            >
              {currentExercise.drill.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {dailyTip && (
              <button
                onClick={() => setShowTipDuringPractice(!showTipDuringPractice)}
                className={cn(
                  "text-xs px-2 py-1 rounded-lg transition-colors",
                  isDark
                    ? "text-sand-500 hover:text-sand-300 hover:bg-sand-800"
                    : "text-sand-400 hover:text-sand-600 hover:bg-sand-100"
                )}
              >
                {showTipDuringPractice ? "Hide Tip" : "Show Tip"}
              </button>
            )}
            <button
              onClick={handleSkip}
              className={cn(
                "text-xs px-3 py-1 rounded-lg transition-colors",
                isDark
                  ? "text-sand-500 hover:text-sand-300 hover:bg-sand-800"
                  : "text-sand-400 hover:text-sand-600 hover:bg-sand-100"
              )}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Collapsible Tip */}
        {showTipDuringPractice && dailyTip && (
          <DailyTipComponent
            tip={dailyTip}
            isDark={isDark}
            onDismiss={() => setShowTipDuringPractice(false)}
          />
        )}

        {/* Challenge Editor */}
        <ChallengeEditor
          key={currentExercise.drill.id}
          challenge={{
            ...currentExercise.drill.challenge,
            title: currentExercise.drill.title,
            description: currentExercise.drill.description,
          }}
          onComplete={handleExerciseComplete}
        />
      </div>
    );
  }

  // Phase: Summary
  return (
    <PracticeSessionSummary
      exercises={exercises}
      completedIds={completedIds}
      streak={streakData.currentStreak}
      isDark={isDark}
      onPracticeAgain={handlePracticeAgain}
    />
  );
}
