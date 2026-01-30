"use client";

import Link from "next/link";
import StreakBadge from "./StreakBadge";
import { cn } from "@/lib/utils";
import type { DailyExercise } from "@/lib/daily-practice";

interface PracticeSessionSummaryProps {
  exercises: DailyExercise[];
  completedIds: string[];
  streak: number;
  isDark?: boolean;
  onPracticeAgain?: () => void;
}

export default function PracticeSessionSummary({
  exercises,
  completedIds,
  streak,
  isDark = true,
  onPracticeAgain,
}: PracticeSessionSummaryProps) {
  const totalExercises = exercises.length;
  const completedCount = completedIds.length;
  const score = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Group by track
  const trackBreakdown = exercises.reduce<
    Record<string, { total: number; completed: number }>
  >((acc, ex) => {
    const track = ex.drill.trackId;
    if (!acc[track]) acc[track] = { total: 0, completed: 0 };
    acc[track].total += 1;
    if (completedIds.includes(ex.drill.id)) {
      acc[track].completed += 1;
    }
    return acc;
  }, {});

  const trackLabels: Record<string, string> = {
    nextjs: "Next.js",
    nodejs: "Node.js",
  };

  const trackColors: Record<string, string> = {
    nextjs: "bg-purple-500",
    nodejs: "bg-green-500",
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Score Circle */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              className={isDark ? "stroke-sand-800" : "stroke-sand-200"}
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              className="stroke-primary-500"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314} 314`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                "text-3xl font-bold",
                isDark ? "text-sand-100" : "text-sand-900"
              )}
            >
              {score}%
            </span>
          </div>
        </div>
        <h2
          className={cn(
            "text-xl font-bold font-serif",
            isDark ? "text-sand-100" : "text-sand-900"
          )}
        >
          {score === 100
            ? "Perfect Session!"
            : score >= 60
              ? "Great Practice!"
              : "Keep Going!"}
        </h2>
        <p className={cn("text-sm mt-1", isDark ? "text-sand-400" : "text-sand-500")}>
          {completedCount} of {totalExercises} exercises completed
        </p>
      </div>

      {/* Streak */}
      <div
        className={cn(
          "flex items-center justify-center gap-3 p-4 rounded-xl",
          isDark ? "bg-sand-900 border border-sand-800" : "bg-sand-50 border border-sand-200"
        )}
      >
        <StreakBadge streak={streak} size="lg" />
        {streak > 0 && (
          <span className={cn("text-sm", isDark ? "text-sand-400" : "text-sand-500")}>
            {streak === 1
              ? "You started a streak!"
              : `${streak} day streak!`}
          </span>
        )}
      </div>

      {/* Track Breakdown */}
      <div
        className={cn(
          "p-4 rounded-xl space-y-3",
          isDark ? "bg-sand-900 border border-sand-800" : "bg-sand-50 border border-sand-200"
        )}
      >
        <h3
          className={cn(
            "text-sm font-semibold",
            isDark ? "text-sand-300" : "text-sand-700"
          )}
        >
          Track Breakdown
        </h3>
        {Object.entries(trackBreakdown).map(([trackId, data]) => (
          <div key={trackId} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className={isDark ? "text-sand-300" : "text-sand-600"}>
                {trackLabels[trackId] || trackId}
              </span>
              <span className={isDark ? "text-sand-400" : "text-sand-500"}>
                {data.completed}/{data.total}
              </span>
            </div>
            <div
              className={cn(
                "h-2 rounded-full overflow-hidden",
                isDark ? "bg-sand-800" : "bg-sand-200"
              )}
            >
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  trackColors[trackId] || "bg-primary-500"
                )}
                style={{
                  width: `${data.total > 0 ? (data.completed / data.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {onPracticeAgain && (
          <button
            onClick={onPracticeAgain}
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
          >
            Practice Again
          </button>
        )}
        <div className="flex gap-3">
          <Link
            href="/practice/drills"
            className={cn(
              "flex-1 text-center px-4 py-3 rounded-xl font-medium transition-colors",
              isDark
                ? "bg-sand-800 text-sand-200 hover:bg-sand-700"
                : "bg-sand-100 text-sand-700 hover:bg-sand-200"
            )}
          >
            Browse Drills
          </Link>
          <Link
            href="/"
            className={cn(
              "flex-1 text-center px-4 py-3 rounded-xl font-medium transition-colors",
              isDark
                ? "bg-sand-800 text-sand-200 hover:bg-sand-700"
                : "bg-sand-100 text-sand-700 hover:bg-sand-200"
            )}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
