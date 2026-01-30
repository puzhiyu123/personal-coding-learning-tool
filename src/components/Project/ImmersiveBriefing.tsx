"use client";

import Link from "next/link";
import type { ImmersiveProject } from "@/lib/immersive-projects";
import CompanyBadge from "./CompanyBadge";
import { cn } from "@/lib/utils";

const difficultyColors = {
  beginner: "text-primary-400 bg-primary-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  advanced: "text-accent-400 bg-accent-500/20",
};

interface ImmersiveBriefingProps {
  project: ImmersiveProject;
}

export default function ImmersiveBriefing({ project }: ImmersiveBriefingProps) {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 overflow-hidden">
        <div className="p-6 bg-sand-800/50 border-b border-sand-700">
          <div className="flex items-center justify-between">
            <CompanyBadge
              tier={project.companyTier}
              companyName={project.companyName}
              size="lg"
            />
            <span
              className={cn(
                "px-2.5 py-1 text-xs rounded-full font-medium",
                difficultyColors[project.difficulty]
              )}
            >
              {project.difficulty}
            </span>
          </div>
          <p className="text-sand-400 mt-3 text-sm">
            {project.companyDescription}
          </p>
        </div>

        {/* Scenario */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-sand-100 mb-3 font-serif">
            The Scenario
          </h3>
          <p className="text-sand-300 leading-relaxed">{project.scenario}</p>
        </div>

        {/* Project info */}
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
              {project.tasks.length} tasks
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
              Multi-File IDE
            </div>
          </div>
        </div>
      </div>

      {/* Task overview */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 p-6">
        <h3 className="text-lg font-semibold text-sand-100 mb-4 font-serif">
          Tasks Overview
        </h3>
        <div className="space-y-3">
          {project.tasks.map((task, i) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 bg-sand-800/50 rounded-lg"
            >
              <span className="w-6 h-6 flex-shrink-0 rounded-full bg-sand-700 flex items-center justify-center text-xs font-medium text-sand-300">
                {i + 1}
              </span>
              <div>
                <h4 className="text-sm font-medium text-sand-200">
                  {task.title}
                </h4>
                <p className="text-xs text-sand-400 mt-0.5">
                  {task.targetFiles.length} file
                  {task.targetFiles.length !== 1 ? "s" : ""} to edit
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Launch button */}
      <div className="flex justify-center">
        <Link
          href={`/projects/${project.id}/workspace`}
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
          Launch Workspace
        </Link>
      </div>
    </div>
  );
}
