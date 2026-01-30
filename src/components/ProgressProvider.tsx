"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProgress } from "@/hooks/useProgress";
import type { ReviewItem, StreakData, PracticeSession, GuidedBuildSaveState, FlashcardProgress } from "@/hooks/useProgress";

interface ProgressContextType {
  completedLessons: string[];
  completedChallenges: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  completedDrills: string[];
  lastVisitedLesson?: string;
  isLoaded: boolean;
  // Lesson/challenge/quiz/project methods
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
  // Drill methods
  completeDrill: (drillId: string) => void;
  isDrillComplete: (drillId: string) => boolean;
  // Practice / streak / review methods
  practiceHistory: PracticeSession[];
  streakData: StreakData;
  reviewPool: ReviewItem[];
  shownTipIds: string[];
  recordPracticeSession: (exerciseIds: string[]) => void;
  addToReviewPool: (item: ReviewItem) => void;
  updateReviewItem: (challengeId: string, updates: Partial<ReviewItem>) => void;
  getReviewsDue: () => ReviewItem[];
  markTipShown: (tipId: string) => void;
  // Guided build methods
  guidedBuilds: Record<string, GuidedBuildSaveState>;
  completedGuidedBuilds: string[];
  saveGuidedBuild: (state: GuidedBuildSaveState) => void;
  getGuidedBuildSave: (projectId: string) => GuidedBuildSaveState | null;
  completeGuidedBuild: (projectId: string) => void;
  isGuidedBuildComplete: (projectId: string) => boolean;
  // Learning tools methods
  flashcardProgress: FlashcardProgress[];
  completedArchPrompts: string[];
  viewedComparisons: string[];
  updateFlashcardProgress: (cardId: string, quality: number) => void;
  getFlashcardsDue: () => FlashcardProgress[];
  completeArchPrompt: (id: string) => void;
  markComparisonViewed: (id: string) => void;
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
        completedDrills: progressState.progress.completedDrills || [],
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
        // Drill methods
        completeDrill: progressState.completeDrill,
        isDrillComplete: progressState.isDrillComplete,
        // Practice / streak / review
        practiceHistory: progressState.progress.practiceHistory || [],
        streakData: progressState.progress.streakData || {
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
        },
        reviewPool: progressState.progress.reviewPool || [],
        shownTipIds: progressState.progress.shownTipIds || [],
        recordPracticeSession: progressState.recordPracticeSession,
        addToReviewPool: progressState.addToReviewPool,
        updateReviewItem: progressState.updateReviewItem,
        getReviewsDue: progressState.getReviewsDue,
        markTipShown: progressState.markTipShown,
        // Guided build methods
        guidedBuilds: progressState.progress.guidedBuilds || {},
        completedGuidedBuilds: progressState.progress.completedGuidedBuilds || [],
        saveGuidedBuild: progressState.saveGuidedBuild,
        getGuidedBuildSave: progressState.getGuidedBuildSave,
        completeGuidedBuild: progressState.completeGuidedBuild,
        isGuidedBuildComplete: progressState.isGuidedBuildComplete,
        // Learning tools
        flashcardProgress: progressState.progress.flashcardProgress || [],
        completedArchPrompts: progressState.progress.completedArchPrompts || [],
        viewedComparisons: progressState.progress.viewedComparisons || [],
        updateFlashcardProgress: progressState.updateFlashcardProgress,
        getFlashcardsDue: progressState.getFlashcardsDue,
        completeArchPrompt: progressState.completeArchPrompt,
        markComparisonViewed: progressState.markComparisonViewed,
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
