"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllGuidedBuilds } from "@/lib/guided-builds";
import { useProgressContext } from "../ProgressProvider";

const difficultyColors = {
  beginner: "text-primary-400 bg-primary-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  advanced: "text-accent-400 bg-accent-500/20",
};

export default function GuidedBuildGallery() {
  const projects = getAllGuidedBuilds();
  const { guidedBuilds, completedGuidedBuilds, isGuidedBuildComplete } =
    useProgressContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-sand-100 font-serif">
          Guided Builds
        </h2>
        <p className="text-sand-400 mt-2">
          Step-by-step projects where you type real code with a tutor guiding
          every line. Learn why each pattern exists, not just what to type.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => {
          const saved = guidedBuilds[project.id];
          const isComplete = isGuidedBuildComplete(project.id);
          const completedSteps = saved
            ? saved.stepProgress.filter((s) => s.completed).length
            : 0;
          const progressPercent = saved
            ? Math.round((completedSteps / project.steps.length) * 100)
            : 0;
          const hasProgress = saved && completedSteps > 0;

          return (
            <Link
              key={project.id}
              href={`/builds/${project.id}`}
              className={cn(
                "block bg-sand-900 rounded-xl border border-sand-800 overflow-hidden hover:border-sand-700 transition-all group",
                isComplete && "border-teal-500/30"
              )}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-sand-100 font-serif group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-sand-400 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                  {isComplete && (
                    <span className="flex items-center gap-1 text-xs text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Done
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 mt-3 text-xs text-sand-500">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full font-medium",
                      difficultyColors[project.difficulty]
                    )}
                  >
                    {project.difficulty}
                  </span>
                  <span>{project.steps.length} steps</span>
                  <span>~{project.estimatedMinutes} min</span>
                </div>

                {/* Concepts */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.conceptsSummary.slice(0, 4).map((concept) => (
                    <span
                      key={concept}
                      className="px-2 py-0.5 text-[10px] font-medium bg-sand-800 text-sand-400 rounded-full"
                    >
                      {concept}
                    </span>
                  ))}
                  {project.conceptsSummary.length > 4 && (
                    <span className="px-2 py-0.5 text-[10px] text-sand-500">
                      +{project.conceptsSummary.length - 4} more
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {hasProgress && !isComplete && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-sand-500">Progress</span>
                      <span className="text-primary-400">
                        {completedSteps}/{project.steps.length} (
                        {progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-sand-800 rounded-full h-1.5">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
