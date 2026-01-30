// Types and registry for Guided Build projects
// Step-by-step, tutor-led coding projects

export interface GuidedBuildStep {
  id: string;
  order: number; // 1-indexed
  title: string; // "Import useState"
  instruction: string; // "Add this import on line 1 of App.jsx"
  explanation: string; // WHY this code pattern exists
  targetFile: string; // "src/App.jsx"
  codeToWrite: string; // The exact code to type
  placement:
    | { type: "line"; line: number }
    | { type: "replace-range"; startLine: number; endLine: number }
    | { type: "append" };
  highlightLines?: [number, number]; // [start, end] to highlight in editor
  validation: {
    targetFile: string;
    pattern: string; // regex
    description: string;
  }[];
  deepExplanation?: string; // Pre-authored deeper dive
  concepts: string[]; // ["useState", "hooks"]
}

export interface GuidedBuildProject {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  conceptsSummary: string[];
  description: string;
  files: { path: string; content: string; language: string; readOnly?: boolean }[];
  packageJson: Record<string, unknown>;
  steps: GuidedBuildStep[];
}

// Save/Resume
export type StepCompletionMethod = "self" | "assisted" | "skipped";

export interface GuidedBuildSaveState {
  projectId: string;
  currentStepIndex: number;
  stepProgress: {
    stepId: string;
    completed: boolean;
    method: StepCompletionMethod;
  }[];
  fileContents: Record<string, string>; // Full file snapshot for exact resume
  lastSavedAt: string;
}

// --- Registry ---

import { tipCalculatorProject } from "./guided-build-tip-calculator";
import { countdownTimerProject } from "./guided-build-countdown-timer";
import { contactFormProject } from "./guided-build-contact-form";
import { habitTrackerProject } from "./guided-build-habit-tracker";
import { weatherDashboardProject } from "./guided-build-weather-app";
import { themeSwitcherProject } from "./guided-build-theme-switcher";
import { productListProject } from "./guided-build-product-list";
import { useLocalStorageProject } from "./guided-build-use-local-storage";
import { nodeApiProject } from "./guided-build-node-api";
import { markdownEditorProject } from "./guided-build-markdown-editor";
import { nextjsBlogProject } from "./guided-build-nextjs-blog";
import { taskBoardProject } from "./guided-build-task-board";

const guidedBuildProjects: GuidedBuildProject[] = [
  tipCalculatorProject,
  countdownTimerProject,
  contactFormProject,
  habitTrackerProject,
  weatherDashboardProject,
  themeSwitcherProject,
  productListProject,
  useLocalStorageProject,
  nodeApiProject,
  markdownEditorProject,
  nextjsBlogProject,
  taskBoardProject,
];

export function getGuidedBuildById(
  projectId: string
): GuidedBuildProject | undefined {
  return guidedBuildProjects.find((p) => p.id === projectId);
}

export function getAllGuidedBuilds(): GuidedBuildProject[] {
  return guidedBuildProjects;
}
