import type { Drill } from "./drills";
import type { ReviewItem } from "@/hooks/useProgress";
import { allDrills } from "./drills";
import { tracks } from "./lessons";

// Date-seeded PRNG (mulberry32)
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

/**
 * Detect active tracks based on completed lessons.
 */
export function detectActiveTracks(completedLessons: string[]): string[] {
  const active: string[] = [];
  for (const track of tracks) {
    const hasCompleted = track.lessons.some((lesson) =>
      completedLessons.includes(lesson.slug)
    );
    if (hasCompleted) {
      active.push(track.id);
    }
  }
  // Default to nextjs and nodejs if no lessons completed
  if (active.length === 0) {
    return ["nextjs", "nodejs"];
  }
  return active;
}

/**
 * Get the user's current difficulty level for a track.
 * Based on percentage of track lessons completed.
 */
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

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

function nextDifficulty(
  current: "beginner" | "intermediate" | "advanced"
): "beginner" | "intermediate" | "advanced" {
  if (current === "beginner") return "intermediate";
  if (current === "intermediate") return "advanced";
  return "advanced";
}

export interface DailyExercise {
  drill: Drill;
  type: "review" | "new" | "stretch";
}

/**
 * Get the daily exercises for a user.
 * Returns 5 exercises: 1-2 review, 2-3 new, 1 stretch.
 * Deterministic per day (date-seeded PRNG).
 */
export function getDailyExercises(
  activeTracks: string[],
  completedDrills: string[],
  reviewsDue: ReviewItem[],
  completedLessons: string[],
  dateStr?: string
): DailyExercise[] {
  const today = dateStr || new Date().toISOString().split("T")[0];
  const rng = mulberry32(dateSeed(today + "-drills"));

  const usedTracks =
    activeTracks.length > 0 ? activeTracks : ["nextjs", "nodejs"];

  const exercises: DailyExercise[] = [];
  const usedIds = new Set<string>();

  // Phase 1: Review items (1-2)
  const reviewDrills: DailyExercise[] = [];
  for (const review of reviewsDue) {
    const drill = allDrills.find((d) => d.id === review.challengeId);
    if (drill && usedTracks.includes(drill.trackId)) {
      reviewDrills.push({ drill, type: "review" });
    }
  }
  const shuffledReviews = shuffle(reviewDrills, rng);
  const reviewCount = Math.min(shuffledReviews.length, 2);
  for (let i = 0; i < reviewCount; i++) {
    exercises.push(shuffledReviews[i]);
    usedIds.add(shuffledReviews[i].drill.id);
  }

  // Phase 2: New drills (fill to 4)
  const trackDifficulties = new Map<string, "beginner" | "intermediate" | "advanced">();
  for (const trackId of usedTracks) {
    trackDifficulties.set(trackId, getTrackDifficulty(trackId, completedLessons));
  }

  const newDrills = allDrills.filter((d) => {
    if (usedIds.has(d.id)) return false;
    if (completedDrills.includes(d.id)) return false;
    if (!usedTracks.includes(d.trackId)) return false;
    const trackDiff = trackDifficulties.get(d.trackId) || "beginner";
    return difficultyOrder[d.difficulty] <= difficultyOrder[trackDiff];
  });
  const shuffledNew = shuffle(newDrills, rng);
  const newTarget = 4 - exercises.length;
  for (let i = 0; i < Math.min(shuffledNew.length, newTarget); i++) {
    exercises.push({ drill: shuffledNew[i], type: "new" });
    usedIds.add(shuffledNew[i].id);
  }

  // Phase 3: Stretch (1 drill above current level)
  const stretchDrills = allDrills.filter((d) => {
    if (usedIds.has(d.id)) return false;
    if (!usedTracks.includes(d.trackId)) return false;
    const trackDiff = trackDifficulties.get(d.trackId) || "beginner";
    return d.difficulty === nextDifficulty(trackDiff);
  });
  const shuffledStretch = shuffle(stretchDrills, rng);
  if (shuffledStretch.length > 0 && exercises.length < 5) {
    exercises.push({ drill: shuffledStretch[0], type: "stretch" });
    usedIds.add(shuffledStretch[0].id);
  }

  // Fill remaining from completed drills as review
  if (exercises.length < 5) {
    const fallback = allDrills.filter(
      (d) =>
        !usedIds.has(d.id) &&
        usedTracks.includes(d.trackId) &&
        completedDrills.includes(d.id)
    );
    const shuffledFallback = shuffle(fallback, rng);
    for (
      let i = 0;
      i < shuffledFallback.length && exercises.length < 5;
      i++
    ) {
      exercises.push({ drill: shuffledFallback[i], type: "review" });
      usedIds.add(shuffledFallback[i].id);
    }
  }

  // Final fill from any available drills
  if (exercises.length < 5) {
    const anyDrills = allDrills.filter(
      (d) => !usedIds.has(d.id) && usedTracks.includes(d.trackId)
    );
    const shuffledAny = shuffle(anyDrills, rng);
    for (let i = 0; i < shuffledAny.length && exercises.length < 5; i++) {
      exercises.push({ drill: shuffledAny[i], type: "new" });
      usedIds.add(shuffledAny[i].id);
    }
  }

  return exercises;
}

/**
 * Simplified SM-2 algorithm for spaced repetition.
 * Returns updated review item fields.
 */
export function calculateNextReview(
  item: ReviewItem,
  quality: number // 1-5 scale
): Pick<ReviewItem, "nextReviewDate" | "interval" | "easeFactor" | "repetitions"> {
  const today = new Date();
  let { interval, easeFactor, repetitions } = item;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else if (repetitions === 2) {
      interval = 7;
    } else if (repetitions === 3) {
      interval = 14;
    } else if (repetitions === 4) {
      interval = 30;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect or poor — reset
    repetitions = 0;
    interval = 1;
  }

  // Adjust ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + interval);
  const nextReviewDate = nextDate.toISOString().split("T")[0];

  return { nextReviewDate, interval, easeFactor, repetitions };
}

/**
 * Create a new review item for a drill.
 */
export function createReviewItem(
  drillId: string,
  trackId: string,
  quality: number
): ReviewItem {
  const result = calculateNextReview(
    {
      challengeId: drillId,
      trackId,
      nextReviewDate: "",
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
    },
    quality
  );

  return {
    challengeId: drillId,
    trackId,
    ...result,
  };
}
