import type { CodeChallenge } from "./lessons";
import { nextjsDrills } from "./drills-nextjs";
import { nodejsDrills } from "./drills-nodejs";

export interface Drill {
  id: string;
  title: string;
  description: string;
  trackId: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  challenge: CodeChallenge;
  tags: string[];
}

export const allDrills: Drill[] = [...nextjsDrills, ...nodejsDrills];

export function getDrillById(id: string): Drill | undefined {
  return allDrills.find((d) => d.id === id);
}

export function getDrillsByTrack(trackId: string): Drill[] {
  return allDrills.filter((d) => d.trackId === trackId);
}

export function getDrillsByCategory(trackId: string): Map<string, Drill[]> {
  const drills = getDrillsByTrack(trackId);
  const categories = new Map<string, Drill[]>();
  for (const drill of drills) {
    const existing = categories.get(drill.category) || [];
    categories.set(drill.category, [...existing, drill]);
  }
  return categories;
}

export function getDrillsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Drill[] {
  return allDrills.filter((d) => d.difficulty === difficulty);
}
