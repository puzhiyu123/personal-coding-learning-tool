"use client";

import Link from "next/link";
import { useProgressContext } from "./ProgressProvider";
import type { Lesson, Track } from "@/lib/lessons";
import { cn } from "@/lib/utils";

interface TrackLessonsListProps {
  track: Track;
  categories: Map<string, Lesson[]>;
}

const trackColorClasses = {
  primary: {
    progress: "from-primary-500 to-primary-400",
    badge: "text-primary-400 bg-primary-500/20",
    checkBg: "bg-primary-500",
    hoverBorder: "hover:border-primary-500/50",
  },
  accent: {
    progress: "from-accent-500 to-accent-400",
    badge: "text-accent-400 bg-accent-500/20",
    checkBg: "bg-accent-500",
    hoverBorder: "hover:border-accent-500/50",
  },
  blue: {
    progress: "from-blue-500 to-blue-400",
    badge: "text-blue-400 bg-blue-500/20",
    checkBg: "bg-blue-500",
    hoverBorder: "hover:border-blue-500/50",
  },
  purple: {
    progress: "from-purple-500 to-purple-400",
    badge: "text-purple-400 bg-purple-500/20",
    checkBg: "bg-purple-500",
    hoverBorder: "hover:border-purple-500/50",
  },
  orange: {
    progress: "from-orange-500 to-orange-400",
    badge: "text-orange-400 bg-orange-500/20",
    checkBg: "bg-orange-500",
    hoverBorder: "hover:border-orange-500/50",
  },
  green: {
    progress: "from-green-500 to-green-400",
    badge: "text-green-400 bg-green-500/20",
    checkBg: "bg-green-500",
    hoverBorder: "hover:border-green-500/50",
  },
};

export default function TrackLessonsList({ track, categories }: TrackLessonsListProps) {
  const { isLessonComplete, isChallengeComplete, isLoaded } = useProgressContext();
  const colors = trackColorClasses[track.color];

  // Calculate progress stats
  const lessonsCompleted = isLoaded
    ? track.lessons.filter((l) => isLessonComplete(l.slug)).length
    : 0;
  const challengesTotal = track.lessons.filter((l) => l.challenge).length;
  const challengesCompleted = isLoaded
    ? track.lessons.filter((l) => l.challenge && isChallengeComplete(l.challenge.id || `${l.slug}-challenge`)).length
    : 0;
  const percentComplete = Math.round((lessonsCompleted / track.lessons.length) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-primary-400 bg-primary-500/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20";
      case "advanced":
        return "text-accent-400 bg-accent-500/20";
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
            <p className={cn("text-2xl font-bold", colors.badge.split(" ")[0])}>
              {isLoaded ? lessonsCompleted : "-"}/{track.lessons.length}
            </p>
            <p className="text-sm text-sand-400">Lessons</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-400">
              {isLoaded ? challengesCompleted : "-"}/{challengesTotal}
            </p>
            <p className="text-sm text-sand-400">Challenges</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-sand-200">
              {isLoaded ? `${percentComplete}%` : "-"}
            </p>
            <p className="text-sm text-sand-400">Complete</p>
          </div>
        </div>
        <div className="bg-sand-900 border border-sand-800 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-sand-200">
              {track.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0)}
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
            <span className={cn("text-sm", colors.badge.split(" ")[0])}>
              {percentComplete}% complete
            </span>
          </div>
          <div className="h-2 bg-sand-800 rounded-full overflow-hidden">
            <div
              className={cn("h-full bg-gradient-to-r transition-all duration-500", colors.progress)}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      )}

      {/* Lessons by Category */}
      {Array.from(categories.entries()).map(([category, categoryLessons]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-sand-200 mb-4 flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", colors.checkBg)} />
            {category}
          </h2>
          <div className="space-y-6">
            {categoryLessons.map((lesson) => {
              const lessonCompleted = isLoaded && isLessonComplete(lesson.slug);
              const challengeCompleted =
                isLoaded &&
                lesson.challenge &&
                isChallengeComplete(lesson.challenge.id || `${lesson.slug}-challenge`);

              return (
                <Link key={lesson.id} href={`/lessons/${track.slug}/${lesson.slug}`} className="block">
                  <div
                    className={cn(
                      "bg-sand-900 border rounded-xl p-4 hover:bg-sand-900/80 transition-all group",
                      lessonCompleted
                        ? cn("border-sand-700", colors.hoverBorder.replace("hover:", ""))
                        : cn("border-sand-800", colors.hoverBorder)
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Lesson Number / Check */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors shrink-0",
                          lessonCompleted
                            ? cn(colors.checkBg, "text-white")
                            : cn("bg-sand-800 text-sand-400 group-hover:bg-sand-700")
                        )}
                      >
                        {lessonCompleted ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          lesson.order
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sand-100 group-hover:text-white transition-colors">
                            {lesson.title}
                          </h3>
                          {lesson.challenge && (
                            <span
                              className={cn(
                                "px-2 py-0.5 text-xs rounded-full",
                                challengeCompleted
                                  ? "bg-primary-500/20 text-primary-400"
                                  : "bg-accent-500/20 text-accent-400"
                              )}
                            >
                              {challengeCompleted ? "Solved" : "Challenge"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-sand-500 line-clamp-1">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-sand-600">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full",
                              getDifficultyColor(lesson.difficulty)
                            )}
                          >
                            {lesson.difficulty}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {lesson.estimatedMinutes} min
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-5 h-5 text-sand-600 group-hover:text-sand-400 group-hover:translate-x-1 transition-all shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
