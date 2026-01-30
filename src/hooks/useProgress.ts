"use client";

import { useState, useEffect, useCallback } from "react";

export interface PracticeSession {
  date: string; // YYYY-MM-DD
  exercisesCompleted: number;
  exerciseIds: string[];
}

export interface ReviewItem {
  challengeId: string;
  trackId: string;
  nextReviewDate: string; // YYYY-MM-DD
  interval: number; // days
  easeFactor: number;
  repetitions: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
}

export interface FlashcardProgress {
  cardId: string;
  nextReviewDate: string; // YYYY-MM-DD
  interval: number; // days
  easeFactor: number;
  repetitions: number;
}

export interface GuidedBuildSaveState {
  projectId: string;
  currentStepIndex: number;
  stepProgress: {
    stepId: string;
    completed: boolean;
    method: "self" | "assisted" | "skipped";
  }[];
  fileContents: Record<string, string>;
  lastSavedAt: string;
}

interface Progress {
  completedLessons: string[];
  completedChallenges: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  lastVisitedLesson?: string;
  startedAt?: string;
  // Daily practice fields
  practiceHistory: PracticeSession[];
  streakData: StreakData;
  reviewPool: ReviewItem[];
  activeTracks: string[];
  shownTipIds: string[];
  completedDrills: string[];
  // Guided builds
  guidedBuilds: Record<string, GuidedBuildSaveState>;
  completedGuidedBuilds: string[];
  // Learning tools
  flashcardProgress: FlashcardProgress[];
  completedArchPrompts: string[];
  viewedComparisons: string[];
}

const STORAGE_KEY = "codeforge-progress";

const defaultProgress: Progress = {
  completedLessons: [],
  completedChallenges: [],
  completedQuizzes: [],
  completedProjects: [],
  practiceHistory: [],
  streakData: {
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
  },
  reviewPool: [],
  activeTracks: [],
  shownTipIds: [],
  completedDrills: [],
  guidedBuilds: {},
  completedGuidedBuilds: [],
  flashcardProgress: [],
  completedArchPrompts: [],
  viewedComparisons: [],
};

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults so new fields don't break existing data
        setProgress({
          ...defaultProgress,
          ...parsed,
          streakData: {
            ...defaultProgress.streakData,
            ...(parsed.streakData || {}),
          },
        });
      } else {
        // First time user
        const newProgress = {
          ...defaultProgress,
          startedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        setProgress(newProgress);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: Progress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }, []);

  // Mark a lesson as complete
  const completeLesson = useCallback(
    (lessonSlug: string) => {
      if (!progress.completedLessons.includes(lessonSlug)) {
        const newProgress = {
          ...progress,
          completedLessons: [...progress.completedLessons, lessonSlug],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Mark a challenge as complete
  const completeChallenge = useCallback(
    (challengeId: string) => {
      if (!progress.completedChallenges.includes(challengeId)) {
        const newProgress = {
          ...progress,
          completedChallenges: [...progress.completedChallenges, challengeId],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Mark a quiz as complete
  const completeQuiz = useCallback(
    (quizId: string) => {
      if (!progress.completedQuizzes?.includes(quizId)) {
        const newProgress = {
          ...progress,
          completedQuizzes: [...(progress.completedQuizzes || []), quizId],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Mark a project as complete
  const completeProject = useCallback(
    (projectId: string) => {
      if (!progress.completedProjects?.includes(projectId)) {
        const newProgress = {
          ...progress,
          completedProjects: [...(progress.completedProjects || []), projectId],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Track the last visited lesson
  const visitLesson = useCallback(
    (lessonSlug: string) => {
      if (progress.lastVisitedLesson !== lessonSlug) {
        const newProgress = {
          ...progress,
          lastVisitedLesson: lessonSlug,
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Check if a lesson is complete
  const isLessonComplete = useCallback(
    (lessonSlug: string) => {
      return progress.completedLessons.includes(lessonSlug);
    },
    [progress.completedLessons]
  );

  // Check if a challenge is complete
  const isChallengeComplete = useCallback(
    (challengeId: string) => {
      return progress.completedChallenges.includes(challengeId);
    },
    [progress.completedChallenges]
  );

  // Check if a quiz is complete
  const isQuizComplete = useCallback(
    (quizId: string) => {
      return progress.completedQuizzes?.includes(quizId) || false;
    },
    [progress.completedQuizzes]
  );

  // Check if a project is complete
  const isProjectComplete = useCallback(
    (projectId: string) => {
      return progress.completedProjects?.includes(projectId) || false;
    },
    [progress.completedProjects]
  );

  // Mark a drill as complete
  const completeDrill = useCallback(
    (drillId: string) => {
      if (!progress.completedDrills.includes(drillId)) {
        const newProgress = {
          ...progress,
          completedDrills: [...progress.completedDrills, drillId],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  const isDrillComplete = useCallback(
    (drillId: string) => {
      return progress.completedDrills.includes(drillId);
    },
    [progress.completedDrills]
  );

  // Record a practice session and update streak
  const recordPracticeSession = useCallback(
    (exerciseIds: string[]) => {
      const today = getTodayStr();
      const yesterday = getYesterdayStr();

      // Check if already practiced today
      const existingToday = progress.practiceHistory.find(
        (s) => s.date === today
      );

      let updatedHistory: PracticeSession[];
      if (existingToday) {
        // Merge with existing session
        const mergedIds = [
          ...new Set([...existingToday.exerciseIds, ...exerciseIds]),
        ];
        updatedHistory = progress.practiceHistory.map((s) =>
          s.date === today
            ? {
                ...s,
                exercisesCompleted: mergedIds.length,
                exerciseIds: mergedIds,
              }
            : s
        );
      } else {
        updatedHistory = [
          ...progress.practiceHistory,
          {
            date: today,
            exercisesCompleted: exerciseIds.length,
            exerciseIds,
          },
        ];
      }

      // Update streak
      const lastDate = progress.streakData.lastPracticeDate;
      let newStreak = progress.streakData.currentStreak;

      if (lastDate === today) {
        // Already practiced today, streak unchanged
      } else if (lastDate === yesterday) {
        newStreak += 1;
      } else {
        // Streak broken or first time
        newStreak = 1;
      }

      const longestStreak = Math.max(
        progress.streakData.longestStreak,
        newStreak
      );

      const newProgress: Progress = {
        ...progress,
        practiceHistory: updatedHistory,
        streakData: {
          currentStreak: newStreak,
          longestStreak,
          lastPracticeDate: today,
        },
      };

      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Add or update a review item in the pool
  const addToReviewPool = useCallback(
    (item: ReviewItem) => {
      const existing = progress.reviewPool.findIndex(
        (r) => r.challengeId === item.challengeId
      );
      let newPool: ReviewItem[];
      if (existing >= 0) {
        newPool = progress.reviewPool.map((r, i) =>
          i === existing ? item : r
        );
      } else {
        newPool = [...progress.reviewPool, item];
      }
      saveProgress({ ...progress, reviewPool: newPool });
    },
    [progress, saveProgress]
  );

  // Update a review item after practice
  const updateReviewItem = useCallback(
    (challengeId: string, updates: Partial<ReviewItem>) => {
      const newPool = progress.reviewPool.map((r) =>
        r.challengeId === challengeId ? { ...r, ...updates } : r
      );
      saveProgress({ ...progress, reviewPool: newPool });
    },
    [progress, saveProgress]
  );

  // Get review items due today or earlier
  const getReviewsDue = useCallback(() => {
    const today = getTodayStr();
    return progress.reviewPool.filter((r) => r.nextReviewDate <= today);
  }, [progress.reviewPool]);

  // Mark a tip as shown
  const markTipShown = useCallback(
    (tipId: string) => {
      if (!progress.shownTipIds.includes(tipId)) {
        saveProgress({
          ...progress,
          shownTipIds: [...progress.shownTipIds, tipId],
        });
      }
    },
    [progress, saveProgress]
  );

  // Save guided build state
  const saveGuidedBuild = useCallback(
    (state: GuidedBuildSaveState) => {
      const newProgress = {
        ...progress,
        guidedBuilds: {
          ...progress.guidedBuilds,
          [state.projectId]: state,
        },
      };
      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Get guided build save state
  const getGuidedBuildSave = useCallback(
    (projectId: string): GuidedBuildSaveState | null => {
      return progress.guidedBuilds?.[projectId] || null;
    },
    [progress.guidedBuilds]
  );

  // Mark a guided build as complete
  const completeGuidedBuild = useCallback(
    (projectId: string) => {
      if (!progress.completedGuidedBuilds?.includes(projectId)) {
        const newProgress = {
          ...progress,
          completedGuidedBuilds: [
            ...(progress.completedGuidedBuilds || []),
            projectId,
          ],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Check if a guided build is complete
  const isGuidedBuildComplete = useCallback(
    (projectId: string): boolean => {
      return progress.completedGuidedBuilds?.includes(projectId) || false;
    },
    [progress.completedGuidedBuilds]
  );

  // Update flashcard progress with SM-2 scheduling
  const updateFlashcardProgress = useCallback(
    (cardId: string, quality: number) => {
      const today = new Date();
      const existing = progress.flashcardProgress.find(
        (f) => f.cardId === cardId
      );

      let interval: number;
      let easeFactor: number;
      let repetitions: number;

      if (existing) {
        interval = existing.interval;
        easeFactor = existing.easeFactor;
        repetitions = existing.repetitions;
      } else {
        interval = 0;
        easeFactor = 2.5;
        repetitions = 0;
      }

      if (quality >= 3) {
        if (repetitions === 0) interval = 1;
        else if (repetitions === 1) interval = 3;
        else if (repetitions === 2) interval = 7;
        else if (repetitions === 3) interval = 14;
        else if (repetitions === 4) interval = 30;
        else interval = Math.round(interval * easeFactor);
        repetitions += 1;
      } else {
        repetitions = 0;
        interval = 1;
      }

      easeFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      );

      const nextDate = new Date(today);
      nextDate.setDate(nextDate.getDate() + interval);
      const nextReviewDate = nextDate.toISOString().split("T")[0];

      const newItem: FlashcardProgress = {
        cardId,
        nextReviewDate,
        interval,
        easeFactor,
        repetitions,
      };

      let newPool: FlashcardProgress[];
      if (existing) {
        newPool = progress.flashcardProgress.map((f) =>
          f.cardId === cardId ? newItem : f
        );
      } else {
        newPool = [...progress.flashcardProgress, newItem];
      }

      saveProgress({ ...progress, flashcardProgress: newPool });
    },
    [progress, saveProgress]
  );

  // Get flashcards due for review
  const getFlashcardsDue = useCallback(() => {
    const today = getTodayStr();
    return progress.flashcardProgress.filter(
      (f) => f.nextReviewDate <= today
    );
  }, [progress.flashcardProgress]);

  // Mark architecture prompt as completed
  const completeArchPrompt = useCallback(
    (id: string) => {
      if (!progress.completedArchPrompts.includes(id)) {
        saveProgress({
          ...progress,
          completedArchPrompts: [...progress.completedArchPrompts, id],
        });
      }
    },
    [progress, saveProgress]
  );

  // Mark code comparison as viewed
  const markComparisonViewed = useCallback(
    (id: string) => {
      if (!progress.viewedComparisons.includes(id)) {
        saveProgress({
          ...progress,
          viewedComparisons: [...progress.viewedComparisons, id],
        });
      }
    },
    [progress, saveProgress]
  );

  // Reset all progress
  const resetProgress = useCallback(() => {
    const newProgress = {
      ...defaultProgress,
      startedAt: new Date().toISOString(),
    };
    saveProgress(newProgress);
  }, [saveProgress]);

  // Get stats
  const getStats = useCallback(
    (totalLessons: number, totalChallenges: number) => {
      return {
        lessonsCompleted: progress.completedLessons.length,
        challengesCompleted: progress.completedChallenges.length,
        lessonsTotal: totalLessons,
        challengesTotal: totalChallenges,
        percentComplete: Math.round(
          (progress.completedLessons.length / totalLessons) * 100
        ),
        daysSinceStart: progress.startedAt
          ? Math.floor(
              (Date.now() - new Date(progress.startedAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0,
      };
    },
    [progress]
  );

  return {
    progress,
    isLoaded,
    completeLesson,
    completeChallenge,
    completeQuiz,
    completeProject,
    completeDrill,
    isDrillComplete,
    visitLesson,
    isLessonComplete,
    isChallengeComplete,
    isQuizComplete,
    isProjectComplete,
    resetProgress,
    getStats,
    // New practice methods
    recordPracticeSession,
    addToReviewPool,
    updateReviewItem,
    getReviewsDue,
    markTipShown,
    // Guided build methods
    saveGuidedBuild,
    getGuidedBuildSave,
    completeGuidedBuild,
    isGuidedBuildComplete,
    // Learning tools methods
    updateFlashcardProgress,
    getFlashcardsDue,
    completeArchPrompt,
    markComparisonViewed,
  };
}
