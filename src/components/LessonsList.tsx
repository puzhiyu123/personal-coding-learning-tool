"use client";

import Link from "next/link";
import { useProgressContext } from "./ProgressProvider";
import type { Lesson } from "@/lib/lessons";

interface LessonsListProps {
  lessons: Lesson[];
  categories: Map<string, Lesson[]>;
}

export default function LessonsList({ lessons, categories }: LessonsListProps) {
  const { isLessonComplete, isChallengeComplete, getStats, isLoaded } =
    useProgressContext();

  const stats = getStats(
    lessons.length,
    lessons.filter((l) => l.challenge).length
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-teal-400 bg-teal-500/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20";
      case "advanced":
        return "text-coral-400 bg-coral-500/20";
      default:
        return "text-sand-400 bg-sand-500/20";
    }
  };

  return (
    <>
      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-400">
              {isLoaded ? stats.lessonsCompleted : "-"}/{stats.lessonsTotal}
            </p>
            <p className="text-sm text-sand-400">Lessons</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-coral-400">
              {isLoaded ? stats.challengesCompleted : "-"}/{stats.challengesTotal}
            </p>
            <p className="text-sm text-sand-400">Challenges</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-sand-200">
              {isLoaded ? `${stats.percentComplete}%` : "-"}
            </p>
            <p className="text-sm text-sand-400">Complete</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-sand-200">
              {lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0)}
            </p>
            <p className="text-sm text-sand-400">Minutes</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isLoaded && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-sand-400">Your Progress</span>
            <span className="text-sm text-teal-400">
              {stats.percentComplete}% complete
            </span>
          </div>
          <div className="h-2 bg-sand-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500"
              style={{ width: `${stats.percentComplete}%` }}
            />
          </div>
        </div>
      )}

      {/* Lessons by Category */}
      {Array.from(categories.entries()).map(([category, categoryLessons]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-sand-200 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            {category}
          </h2>
          <div className="space-y-3">
            {categoryLessons.map((lesson, index) => {
              const lessonCompleted = isLoaded && isLessonComplete(lesson.slug);
              const challengeCompleted =
                isLoaded &&
                lesson.challenge &&
                isChallengeComplete(lesson.challenge.id);

              return (
                <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                  <div
                    className={`bg-sand-900 border rounded-xl p-4 hover:border-teal-500/50 hover:bg-sand-900/80 transition-all group ${
                      lessonCompleted
                        ? "border-teal-500/30"
                        : "border-sand-800"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Lesson Number / Check */}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                          lessonCompleted
                            ? "bg-teal-500 text-white"
                            : "bg-sand-800 text-sand-400 group-hover:bg-teal-500/20 group-hover:text-teal-400"
                        }`}
                      >
                        {lessonCompleted ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-lg font-semibold transition-colors ${
                              lessonCompleted
                                ? "text-teal-400"
                                : "text-sand-100 group-hover:text-teal-400"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(
                              lesson.difficulty
                            )}`}
                          >
                            {lesson.difficulty}
                          </span>
                        </div>
                        <p className="text-sand-400 text-sm mb-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-sand-500">
                          <span className="flex items-center gap-1">
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {lesson.estimatedMinutes} min
                          </span>
                          {lesson.challenge && (
                            <span
                              className={`flex items-center gap-1 ${
                                challengeCompleted
                                  ? "text-teal-400"
                                  : "text-coral-400"
                              }`}
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
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {challengeCompleted
                                ? "Challenge Complete"
                                : "Has Challenge"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-5 h-5 text-sand-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all"
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
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
