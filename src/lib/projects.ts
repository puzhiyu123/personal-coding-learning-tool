export interface ProjectTest {
  name: string;
  test: string;
  expected: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  context: string; // Simulated "Slack message" context
  requirements: string[];
  starterCode: string;
  solution: string;
  tests: ProjectTest[];
  hints: string[];
}

export interface Project {
  id: string;
  title: string;
  companyTier: 1 | 2 | 3 | 4;
  companyName: string;
  companyDescription: string;
  trackSlug: string;
  requiredLessons: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  scenario: string;
  tasks: ProjectTask[];
}

// Import all track projects
import { javascriptProjects } from "./projects-javascript";

// All projects combined
export const projects: Project[] = [
  ...javascriptProjects,
];

// Get project by ID
export function getProjectById(projectId: string): Project | undefined {
  return projects.find((p) => p.id === projectId);
}

// Get projects by track
export function getProjectsByTrack(trackSlug: string): Project[] {
  return projects.filter((p) => p.trackSlug === trackSlug);
}

// Get projects by company tier
export function getProjectsByTier(tier: 1 | 2 | 3 | 4): Project[] {
  return projects.filter((p) => p.companyTier === tier);
}

// Get projects by difficulty
export function getProjectsByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): Project[] {
  return projects.filter((p) => p.difficulty === difficulty);
}
