// Immersive multi-file project types and registry

export interface ImmersiveProjectFile {
  path: string; // e.g. "src/components/ExpenseForm.jsx"
  content: string;
  language: string;
  readOnly?: boolean; // e.g. package.json, main.jsx
}

export interface ImmersiveTaskValidation {
  type: "file-content" | "file-exists";
  targetFile?: string;
  pattern: string; // regex
  description: string;
}

export interface ImmersiveTask {
  id: string;
  title: string;
  description: string;
  context: string; // Slack message
  targetFiles: string[]; // highlighted in file tree
  requirements: string[];
  hints: string[];
  validation: ImmersiveTaskValidation[];
}

export interface ImmersiveProject {
  id: string;
  title: string;
  companyTier: 1 | 2 | 3 | 4;
  companyName: string;
  companyDescription: string;
  trackSlug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  scenario: string;
  files: ImmersiveProjectFile[];
  packageJson: Record<string, unknown>;
  tasks: ImmersiveTask[];
}

// Import all immersive project data
import { reactImmersiveProjects } from "./immersive-projects-react";

// All immersive projects combined
export const immersiveProjects: ImmersiveProject[] = [
  ...reactImmersiveProjects,
];

// Get immersive project by ID
export function getImmersiveProjectById(
  projectId: string
): ImmersiveProject | undefined {
  return immersiveProjects.find((p) => p.id === projectId);
}

// Get immersive projects by track
export function getImmersiveProjectsByTrack(
  trackSlug: string
): ImmersiveProject[] {
  return immersiveProjects.filter((p) => p.trackSlug === trackSlug);
}

// Get immersive projects by tier
export function getImmersiveProjectsByTier(
  tier: 1 | 2 | 3 | 4
): ImmersiveProject[] {
  return immersiveProjects.filter((p) => p.companyTier === tier);
}
