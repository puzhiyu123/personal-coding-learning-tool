"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProgress } from "@/hooks/useProgress";

interface ProgressContextType {
  completedLessons: string[];
  completedChallenges: string[];
  lastVisitedLesson?: string;
  isLoaded: boolean;
  completeLesson: (lessonSlug: string) => void;
  completeChallenge: (challengeId: string) => void;
  visitLesson: (lessonSlug: string) => void;
  isLessonComplete: (lessonSlug: string) => boolean;
  isChallengeComplete: (challengeId: string) => boolean;
  resetProgress: () => void;
  getStats: (
    totalLessons: number,
    totalChallenges: number
  ) => {
    lessonsCompleted: number;
    challengesCompleted: number;
    lessonsTotal: number;
    challengesTotal: number;
    percentComplete: number;
    daysSinceStart: number;
  };
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressState = useProgress();

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: progressState.progress.completedLessons,
        completedChallenges: progressState.progress.completedChallenges,
        lastVisitedLesson: progressState.progress.lastVisitedLesson,
        isLoaded: progressState.isLoaded,
        completeLesson: progressState.completeLesson,
        completeChallenge: progressState.completeChallenge,
        visitLesson: progressState.visitLesson,
        isLessonComplete: progressState.isLessonComplete,
        isChallengeComplete: progressState.isChallengeComplete,
        resetProgress: progressState.resetProgress,
        getStats: progressState.getStats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgressContext must be used within a ProgressProvider");
  }
  return context;
}
