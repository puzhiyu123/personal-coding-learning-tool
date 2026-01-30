"use client";

import Link from "next/link";
import StreakBadge from "./StreakBadge";
import { cn } from "@/lib/utils";
import type { DailyQuizExercise } from "@/lib/daily-quiz-practice";
import type { QuizDrill } from "@/lib/quiz-drills";

interface QuizResult {
  quiz: QuizDrill;
  selectedAnswer: string;
  correct: boolean;
  usedHint: boolean;
}

interface QuizSessionSummaryProps {
  exercises: DailyQuizExercise[];
  results: QuizResult[];
  streak: number;
  isDark?: boolean;
  onPracticeAgain?: () => void;
}

export default function QuizSessionSummary({
  exercises,
  results,
  streak,
  isDark = true,
  onPracticeAgain,
}: QuizSessionSummaryProps) {
  const totalExercises = exercises.length;
  const correctCount = results.filter((r) => r.correct).length;
  const score =
    totalExercises > 0 ? Math.round((correctCount / totalExercises) * 100) : 0;

  const missedQuestions = results.filter((r) => !r.correct);

  // Group by track
  const trackBreakdown = exercises.reduce<
    Record<string, { total: number; correct: number }>
  >((acc, ex) => {
    const track = ex.quiz.trackId;
    if (!acc[track]) acc[track] = { total: 0, correct: 0 };
    acc[track].total += 1;
    const result = results.find((r) => r.quiz.id === ex.quiz.id);
    if (result?.correct) {
      acc[track].correct += 1;
    }
    return acc;
  }, {});

  const trackLabels: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    nextjs: "Next.js",
    nodejs: "Node.js",
    aws: "AWS",
    gcp: "GCP",
  };

  const trackColors: Record<string, string> = {
    javascript: "bg-yellow-500",
    typescript: "bg-blue-500",
    nextjs: "bg-purple-500",
    nodejs: "bg-green-500",
    aws: "bg-orange-500",
    gcp: "bg-red-500",
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Score Circle */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg
            className="w-32 h-32 transform -rotate-90"
            viewBox="0 0 120 120"
          >
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
            ? "Perfect Score!"
            : score >= 80
              ? "Great Job!"
              : score >= 60
                ? "Good Effort!"
                : "Keep Practicing!"}
        </h2>
        <p
          className={cn(
            "text-sm mt-1",
            isDark ? "text-sand-400" : "text-sand-500"
          )}
        >
          {correctCount} of {totalExercises} questions correct
        </p>
      </div>

      {/* Streak */}
      <div
        className={cn(
          "flex items-center justify-center gap-3 p-4 rounded-xl",
          isDark
            ? "bg-sand-900 border border-sand-800"
            : "bg-sand-50 border border-sand-200"
        )}
      >
        <StreakBadge streak={streak} size="lg" />
        {streak > 0 && (
          <span
            className={cn(
              "text-sm",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            {streak === 1 ? "You started a streak!" : `${streak} day streak!`}
          </span>
        )}
      </div>

      {/* Track Breakdown */}
      <div
        className={cn(
          "p-4 rounded-xl space-y-3",
          isDark
            ? "bg-sand-900 border border-sand-800"
            : "bg-sand-50 border border-sand-200"
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
                {data.correct}/{data.total}
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
                  width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Missed Questions */}
      {missedQuestions.length > 0 && (
        <div
          className={cn(
            "p-4 rounded-xl space-y-4",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-sand-50 border border-sand-200"
          )}
        >
          <h3
            className={cn(
              "text-sm font-semibold",
              isDark ? "text-sand-300" : "text-sand-700"
            )}
          >
            Missed Questions ({missedQuestions.length})
          </h3>
          {missedQuestions.map((result) => (
            <div
              key={result.quiz.id}
              className={cn(
                "p-3 rounded-lg space-y-2",
                isDark ? "bg-sand-800/50" : "bg-white"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    isDark
                      ? "bg-coral-500/20 text-coral-400"
                      : "bg-red-50 text-red-600"
                  )}
                >
                  {result.quiz.category}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-sand-200" : "text-sand-800"
                )}
              >
                {result.quiz.question}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className={isDark ? "text-coral-400" : "text-red-500"}>
                  Your answer: {result.selectedAnswer}
                </span>
                <span className="text-primary-500">
                  Correct: {result.quiz.correctAnswer}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs",
                  isDark ? "text-sand-400" : "text-sand-500"
                )}
              >
                {result.quiz.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

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
