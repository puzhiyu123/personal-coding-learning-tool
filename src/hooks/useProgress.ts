"use client";

import { useState, useEffect, useCallback } from "react";

interface Progress {
  completedLessons: string[];
  completedChallenges: string[];
  lastVisitedLesson?: string;
  startedAt?: string;
}

const STORAGE_KEY = "codeforge-progress";

const defaultProgress: Progress = {
  completedLessons: [],
  completedChallenges: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
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
    visitLesson,
    isLessonComplete,
    isChallengeComplete,
    resetProgress,
    getStats,
  };
}
