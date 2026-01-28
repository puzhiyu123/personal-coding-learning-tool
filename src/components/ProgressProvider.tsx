"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProgress } from "@/hooks/useProgress";

interface ProgressContextType {
  completedLessons: string[];
  completedChallenges: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  lastVisitedLesson?: string;
  isLoaded: boolean;
  completeLesson: (lessonSlug: string) => void;
  completeChallenge: (challengeId: string) => void;
  completeQuiz: (quizId: string) => void;
  completeProject: (projectId: string) => void;
  visitLesson: (lessonSlug: string) => void;
  isLessonComplete: (lessonSlug: string) => boolean;
  isChallengeComplete: (challengeId: string) => boolean;
  isQuizComplete: (quizId: string) => boolean;
  isProjectComplete: (projectId: string) => boolean;
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
        completedQuizzes: progressState.progress.completedQuizzes || [],
        completedProjects: progressState.progress.completedProjects || [],
        lastVisitedLesson: progressState.progress.lastVisitedLesson,
        isLoaded: progressState.isLoaded,
        completeLesson: progressState.completeLesson,
        completeChallenge: progressState.completeChallenge,
        completeQuiz: progressState.completeQuiz,
        completeProject: progressState.completeProject,
        visitLesson: progressState.visitLesson,
        isLessonComplete: progressState.isLessonComplete,
        isChallengeComplete: progressState.isChallengeComplete,
        isQuizComplete: progressState.isQuizComplete,
        isProjectComplete: progressState.isProjectComplete,
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
