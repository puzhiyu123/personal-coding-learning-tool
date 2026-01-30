"use client";

import { cn } from "@/lib/utils";
import type { GuidedBuildProject, GuidedBuildSaveState } from "@/lib/guided-builds";

const difficultyColors = {
  beginner: "text-primary-400 bg-primary-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  advanced: "text-accent-400 bg-accent-500/20",
};

interface GuidedBuildBriefingProps {
  project: GuidedBuildProject;
  savedState: GuidedBuildSaveState | null;
  onStart: () => void;
}

export default function GuidedBuildBriefing({
  project,
  savedState,
  onStart,
}: GuidedBuildBriefingProps) {
  const completedSteps = savedState
    ? savedState.stepProgress.filter((s) => s.completed).length
    : 0;
  const resumePercent = savedState
    ? Math.round((completedSteps / project.steps.length) * 100)
    : 0;
  const hasProgress = savedState && completedSteps > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 overflow-hidden">
        <div className="p-6 bg-sand-800/50 border-b border-sand-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-sand-100 font-serif">
                {project.title}
              </h2>
              <p className="text-sand-400 text-sm mt-1">{project.subtitle}</p>
            </div>
            <span
              className={cn(
                "px-2.5 py-1 text-xs rounded-full font-medium",
                difficultyColors[project.difficulty]
              )}
            >
              {project.difficulty}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-6">
          <p className="text-sand-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-sand-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {project.steps.length} steps
            </div>
            <div className="flex items-center gap-2 text-sand-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ~{project.estimatedMinutes} min
            </div>
            <div className="flex items-center gap-2 text-sand-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 4v16"
                />
              </svg>
              {project.files.length} files
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Live Preview
            </div>
          </div>
        </div>
      </div>

      {/* Concepts */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 p-6">
        <h3 className="text-lg font-semibold text-sand-100 mb-3 font-serif">
          What You&apos;ll Learn
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.conceptsSummary.map((concept) => (
            <span
              key={concept}
              className="px-3 py-1.5 text-sm bg-primary-500/10 text-primary-400 rounded-lg border border-primary-500/20"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Steps preview */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 p-6">
        <h3 className="text-lg font-semibold text-sand-100 mb-4 font-serif">
          Steps Overview
        </h3>
        <div className="space-y-2">
          {project.steps.map((step, i) => {
            const progress = savedState?.stepProgress[i];
            const isComplete = progress?.completed;
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  isComplete ? "bg-teal-500/5" : "bg-sand-800/50"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-medium",
                    isComplete
                      ? "bg-teal-500 text-white"
                      : "bg-sand-700 text-sand-300"
                  )}
                >
                  {isComplete ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <div>
                  <h4
                    className={cn(
                      "text-sm font-medium",
                      isComplete ? "text-teal-300" : "text-sand-200"
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-sand-500 mt-0.5">
                    {step.targetFile}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resume progress bar */}
      {hasProgress && (
        <div className="bg-sand-900 rounded-xl border border-sand-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-sand-300">Your Progress</span>
            <span className="text-sm text-primary-400 font-medium">
              {completedSteps}/{project.steps.length} steps ({resumePercent}%)
            </span>
          </div>
          <div className="w-full bg-sand-800 rounded-full h-2">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${resumePercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Launch button */}
      <div className="flex justify-center pb-8">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-base font-semibold shadow-lg shadow-primary-500/20"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {hasProgress ? "Resume Building" : "Start Building"}
        </button>
      </div>
    </div>
  );
}
