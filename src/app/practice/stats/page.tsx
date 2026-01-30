"use client";

import { useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StreakBadge from "@/components/StreakBadge";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";
import { allDrills } from "@/lib/drills";
import { tracks } from "@/lib/lessons";
import { cn } from "@/lib/utils";

function getLast30Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
}

function getDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function StatsPage() {
  const {
    streakData,
    practiceHistory,
    completedLessons,
    completedChallenges,
    completedDrills,
    reviewPool,
  } = useProgressContext();
  const { isDark } = useThemeContext();

  const last30 = useMemo(() => getLast30Days(), []);

  const practiceByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const session of practiceHistory) {
      map.set(session.date, (map.get(session.date) || 0) + session.exercisesCompleted);
    }
    return map;
  }, [practiceHistory]);

  const totalSessions = practiceHistory.length;
  const totalExercises = practiceHistory.reduce(
    (acc, s) => acc + s.exercisesCompleted,
    0
  );
  const avgPerSession =
    totalSessions > 0 ? Math.round(totalExercises / totalSessions) : 0;

  const reviewsDueCount = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return reviewPool.filter((r) => r.nextReviewDate <= today).length;
  }, [reviewPool]);

  // Per-track progress
  const trackProgress = useMemo(() => {
    return tracks
      .filter((t) => ["nextjs", "nodejs", "javascript", "typescript"].includes(t.id))
      .map((track) => {
        const lessonsComplete = track.lessons.filter((l) =>
          completedLessons.includes(l.slug)
        ).length;
        const challengesComplete = track.lessons.filter(
          (l) => l.challenge && completedChallenges.includes(l.slug)
        ).length;
        const totalChallenges = track.lessons.filter((l) => l.challenge).length;
        const trackDrills = allDrills.filter((d) => d.trackId === track.id);
        const drillsComplete = trackDrills.filter((d) =>
          completedDrills.includes(d.id)
        ).length;

        return {
          id: track.id,
          name: track.name,
          color: track.color,
          lessons: { done: lessonsComplete, total: track.lessons.length },
          challenges: { done: challengesComplete, total: totalChallenges },
          drills: { done: drillsComplete, total: trackDrills.length },
        };
      });
  }, [completedLessons, completedChallenges, completedDrills]);

  const colorMap: Record<string, string> = {
    primary: "bg-primary-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    accent: "bg-accent-500",
  };

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link
              href="/practice"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              Practice
            </Link>
            <span className="text-sand-600">/</span>
            <span className={isDark ? "text-sand-400" : "text-sand-500"}>
              Stats
            </span>
          </div>
          <h1
            className={cn(
              "text-3xl font-bold font-serif",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            Practice <span className="text-primary-400">Stats</span>
          </h1>
        </div>

        {/* Streak Section */}
        <div
          className={cn(
            "p-6 rounded-xl",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-white border border-sand-200"
          )}
        >
          <h2
            className={cn(
              "text-lg font-semibold mb-4",
              isDark ? "text-sand-200" : "text-sand-800"
            )}
          >
            Streak
          </h2>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <StreakBadge streak={streakData.currentStreak} size="lg" />
              <p
                className={cn(
                  "text-xs mt-2",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Current
              </p>
            </div>
            <div className="text-center">
              <p
                className={cn(
                  "text-2xl font-bold",
                  isDark ? "text-sand-200" : "text-sand-700"
                )}
              >
                {streakData.longestStreak}
              </p>
              <p
                className={cn(
                  "text-xs",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Longest
              </p>
            </div>
          </div>

          {/* 30-day Calendar Heatmap */}
          <div className="mt-6">
            <p
              className={cn(
                "text-xs font-medium mb-3",
                isDark ? "text-sand-500" : "text-sand-400"
              )}
            >
              Last 30 Days
            </p>
            <div className="flex gap-1 flex-wrap">
              {last30.map((dateStr) => {
                const count = practiceByDate.get(dateStr) || 0;
                const intensity =
                  count === 0
                    ? 0
                    : count <= 2
                      ? 1
                      : count <= 4
                        ? 2
                        : 3;
                const intensityClasses = [
                  isDark ? "bg-sand-800" : "bg-sand-200",
                  "bg-primary-500/30",
                  "bg-primary-500/60",
                  "bg-primary-500",
                ];
                return (
                  <div
                    key={dateStr}
                    className={cn(
                      "w-6 h-6 rounded-sm transition-colors",
                      intensityClasses[intensity]
                    )}
                    title={`${getDateLabel(dateStr)}: ${count} exercises`}
                  >
                    <span className="sr-only">
                      {getDayLabel(dateStr)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  "text-xs",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Less
              </span>
              {[0, 1, 2, 3].map((i) => {
                const cls = [
                  isDark ? "bg-sand-800" : "bg-sand-200",
                  "bg-primary-500/30",
                  "bg-primary-500/60",
                  "bg-primary-500",
                ];
                return (
                  <div
                    key={i}
                    className={cn("w-4 h-4 rounded-sm", cls[i])}
                  />
                );
              })}
              <span
                className={cn(
                  "text-xs",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                More
              </span>
            </div>
          </div>
        </div>

        {/* Practice Summary */}
        <div
          className={cn(
            "p-6 rounded-xl",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-white border border-sand-200"
          )}
        >
          <h2
            className={cn(
              "text-lg font-semibold mb-4",
              isDark ? "text-sand-200" : "text-sand-800"
            )}
          >
            Practice Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Sessions", value: totalSessions },
              { label: "Total Exercises", value: totalExercises },
              { label: "Avg per Session", value: avgPerSession },
              {
                label: "Reviews Due",
                value: reviewsDueCount,
                highlight: reviewsDueCount > 0,
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className={cn(
                    "text-2xl font-bold",
                    stat.highlight
                      ? "text-amber-400"
                      : isDark
                        ? "text-sand-100"
                        : "text-sand-900"
                  )}
                >
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    isDark ? "text-sand-500" : "text-sand-400"
                  )}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Per-Track Progress */}
        <div
          className={cn(
            "p-6 rounded-xl",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-white border border-sand-200"
          )}
        >
          <h2
            className={cn(
              "text-lg font-semibold mb-4",
              isDark ? "text-sand-200" : "text-sand-800"
            )}
          >
            Track Progress
          </h2>
          <div className="space-y-6">
            {trackProgress.map((track) => {
              const totalItems =
                track.lessons.total +
                track.challenges.total +
                track.drills.total;
              const doneItems =
                track.lessons.done +
                track.challenges.done +
                track.drills.done;
              const pct =
                totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
              return (
                <div key={track.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={cn(
                        "font-medium",
                        isDark ? "text-sand-200" : "text-sand-700"
                      )}
                    >
                      {track.name}
                    </h3>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isDark ? "text-sand-300" : "text-sand-600"
                      )}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-2 rounded-full overflow-hidden mb-2",
                      isDark ? "bg-sand-800" : "bg-sand-200"
                    )}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        colorMap[track.color] || "bg-primary-500"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div
                    className={cn(
                      "flex gap-4 text-xs",
                      isDark ? "text-sand-500" : "text-sand-400"
                    )}
                  >
                    <span>
                      Lessons: {track.lessons.done}/{track.lessons.total}
                    </span>
                    <span>
                      Challenges: {track.challenges.done}/
                      {track.challenges.total}
                    </span>
                    <span>
                      Drills: {track.drills.done}/{track.drills.total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link
            href="/practice"
            className="flex-1 text-center px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
          >
            Start Practice
          </Link>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
