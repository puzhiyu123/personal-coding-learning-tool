"use client";

import type { Project } from "@/lib/projects";
import CompanyBadge from "./CompanyBadge";

interface ProjectBriefingProps {
  project: Project;
}

export default function ProjectBriefing({ project }: ProjectBriefingProps) {
  return (
    <div className="bg-sand-900 rounded-xl border border-sand-800 overflow-hidden">
      {/* Company Header */}
      <div className="p-6 bg-sand-800/50 border-b border-sand-700">
        <CompanyBadge
          tier={project.companyTier}
          companyName={project.companyName}
          size="lg"
        />
        <p className="text-sand-400 mt-3 text-sm">{project.companyDescription}</p>
      </div>

      {/* Scenario */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-sand-100 mb-3 font-serif">The Scenario</h3>
        <p className="text-sand-300 leading-relaxed">{project.scenario}</p>
      </div>

      {/* Project Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-sand-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {project.tasks.length} {project.tasks.length === 1 ? "task" : "tasks"}
          </div>
          <div className="flex items-center gap-2 text-sand-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {project.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
