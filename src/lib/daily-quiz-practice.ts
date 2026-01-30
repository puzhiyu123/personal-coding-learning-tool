import type { QuizDrill } from "./quiz-drills";
import type { ReviewItem } from "@/hooks/useProgress";
import { allQuizDrills } from "./quiz-drills";
import { detectActiveTracks } from "./daily-practice";
import { tracks } from "./lessons";

// Date-seeded PRNG (mulberry32) — same as daily-practice.ts
function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

function nextDifficulty(
  current: "beginner" | "intermediate" | "advanced"
): "beginner" | "intermediate" | "advanced" {
  if (current === "beginner") return "intermediate";
  if (current === "intermediate") return "advanced";
  return "advanced";
}

function getTrackDifficulty(
  trackId: string,
  completedLessons: string[]
): "beginner" | "intermediate" | "advanced" {
  const track = tracks.find((t) => t.id === trackId);
  if (!track) return "beginner";
  const completed = track.lessons.filter((l) =>
    completedLessons.includes(l.slug)
  ).length;
  const pct = completed / track.lessons.length;
  if (pct >= 0.67) return "advanced";
  if (pct >= 0.34) return "intermediate";
  return "beginner";
}

export interface DailyQuizExercise {
  quiz: QuizDrill;
  type: "review" | "new" | "stretch";
}

/**
 * Get daily quiz exercises for a user.
 * Returns 10 questions: 2-3 review, 5-6 new, 1-2 stretch.
 * Deterministic per day (date-seeded PRNG).
 */
export function getDailyQuizExercises(
  activeTracks: string[],
  completedQuizDrills: string[],
  reviewsDue: ReviewItem[],
  completedLessons: string[],
  dateStr?: string
): DailyQuizExercise[] {
  const today = dateStr || new Date().toISOString().split("T")[0];
  const rng = mulberry32(dateSeed(today + "-quiz-drills"));

  const usedTracks =
    activeTracks.length > 0 ? activeTracks : ["nextjs", "nodejs"];

  const exercises: DailyQuizExercise[] = [];
  const usedIds = new Set<string>();

  // Phase 1: Review items (2-3)
  const reviewQuizzes: DailyQuizExercise[] = [];
  for (const review of reviewsDue) {
    const quiz = allQuizDrills.find((d) => d.id === review.challengeId);
    if (quiz && usedTracks.includes(quiz.trackId)) {
      reviewQuizzes.push({ quiz, type: "review" });
    }
  }
  const shuffledReviews = shuffle(reviewQuizzes, rng);
  const reviewCount = Math.min(shuffledReviews.length, 3);
  for (let i = 0; i < reviewCount; i++) {
    exercises.push(shuffledReviews[i]);
    usedIds.add(shuffledReviews[i].quiz.id);
  }

  // Phase 2: New quizzes (fill to 8)
  const trackDifficulties = new Map<
    string,
    "beginner" | "intermediate" | "advanced"
  >();
  for (const trackId of usedTracks) {
    trackDifficulties.set(
      trackId,
      getTrackDifficulty(trackId, completedLessons)
    );
  }

  const newQuizzes = allQuizDrills.filter((d) => {
    if (usedIds.has(d.id)) return false;
    if (completedQuizDrills.includes(d.id)) return false;
    if (!usedTracks.includes(d.trackId)) return false;
    const trackDiff = trackDifficulties.get(d.trackId) || "beginner";
    return difficultyOrder[d.difficulty] <= difficultyOrder[trackDiff];
  });
  const shuffledNew = shuffle(newQuizzes, rng);
  const newTarget = 8 - exercises.length;
  for (let i = 0; i < Math.min(shuffledNew.length, newTarget); i++) {
    exercises.push({ quiz: shuffledNew[i], type: "new" });
    usedIds.add(shuffledNew[i].id);
  }

  // Phase 3: Stretch (1-2 quizzes above current level)
  const stretchQuizzes = allQuizDrills.filter((d) => {
    if (usedIds.has(d.id)) return false;
    if (!usedTracks.includes(d.trackId)) return false;
    const trackDiff = trackDifficulties.get(d.trackId) || "beginner";
    return d.difficulty === nextDifficulty(trackDiff);
  });
  const shuffledStretch = shuffle(stretchQuizzes, rng);
  const stretchTarget = 10 - exercises.length;
  for (
    let i = 0;
    i < Math.min(shuffledStretch.length, stretchTarget);
    i++
  ) {
    exercises.push({ quiz: shuffledStretch[i], type: "stretch" });
    usedIds.add(shuffledStretch[i].id);
  }

  // Fill remaining from completed quizzes as review
  if (exercises.length < 10) {
    const fallback = allQuizDrills.filter(
      (d) =>
        !usedIds.has(d.id) &&
        usedTracks.includes(d.trackId) &&
        completedQuizDrills.includes(d.id)
    );
    const shuffledFallback = shuffle(fallback, rng);
    for (
      let i = 0;
      i < shuffledFallback.length && exercises.length < 10;
      i++
    ) {
      exercises.push({ quiz: shuffledFallback[i], type: "review" });
      usedIds.add(shuffledFallback[i].id);
    }
  }

  // Final fill from any available quizzes
  if (exercises.length < 10) {
    const anyQuizzes = allQuizDrills.filter(
      (d) => !usedIds.has(d.id) && usedTracks.includes(d.trackId)
    );
    const shuffledAny = shuffle(anyQuizzes, rng);
    for (
      let i = 0;
      i < shuffledAny.length && exercises.length < 10;
      i++
    ) {
      exercises.push({ quiz: shuffledAny[i], type: "new" });
      usedIds.add(shuffledAny[i].id);
    }
  }

  // Final shuffle for variety
  return shuffle(exercises, rng);
}
