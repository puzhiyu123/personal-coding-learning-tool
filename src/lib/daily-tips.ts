export interface DailyTip {
  id: string;
  trackId: string;
  category: string;
  title: string;
  content: string;
  codeExample: {
    code: string;
    language: string;
    title: string;
  };
  keyTakeaway: string;
  relatedDrillId?: string;
}

import { nextjsDailyTips } from "./daily-tips-nextjs";
import { nodejsDailyTips } from "./daily-tips-nodejs";

export const allDailyTips: DailyTip[] = [
  ...nextjsDailyTips,
  ...nodejsDailyTips,
];

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

/**
 * Select a daily tip based on the current date and user's active tracks.
 * Avoids recently shown tips when possible.
 */
export function getDailyTip(
  activeTracks: string[],
  shownTipIds: string[],
  dateStr?: string
): DailyTip | null {
  const today = dateStr || new Date().toISOString().split("T")[0];
  const rng = mulberry32(dateSeed(today + "-tip"));

  // Filter tips by active tracks (default to all if none)
  const tracks = activeTracks.length > 0 ? activeTracks : ["nextjs", "nodejs"];
  const trackTips = allDailyTips.filter((t) => tracks.includes(t.trackId));

  if (trackTips.length === 0) return null;

  // Prefer unshown tips
  const unshown = trackTips.filter((t) => !shownTipIds.includes(t.id));
  const pool = unshown.length > 0 ? unshown : trackTips;

  // Pick deterministically using date-seeded PRNG
  const index = Math.floor(rng() * pool.length);
  return pool[index];
}
