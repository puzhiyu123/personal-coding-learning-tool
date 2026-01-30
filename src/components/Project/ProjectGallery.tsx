"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import { immersiveProjects } from "@/lib/immersive-projects";
import { useProgressContext } from "../ProgressProvider";
import CompanyBadge from "./CompanyBadge";
import { cn } from "@/lib/utils";

const difficultyColors = {
  beginner: "text-primary-400 bg-primary-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  advanced: "text-accent-400 bg-accent-500/20",
};

interface GalleryProject {
  id: string;
  title: string;
  companyTier: 1 | 2 | 3 | 4;
  companyName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  scenario: string;
  taskCount: number;
  requiredLessons: string[];
  isImmersive: boolean;
}

export default function ProjectGallery() {
  const { isProjectComplete, completedLessons } = useProgressContext();

  // Merge single-file and immersive projects into a unified list
  const allProjects: GalleryProject[] = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      companyTier: p.companyTier,
      companyName: p.companyName,
      difficulty: p.difficulty,
      scenario: p.scenario,
      taskCount: p.tasks.length,
      requiredLessons: p.requiredLessons,
      isImmersive: false,
    })),
    ...immersiveProjects.map((p) => ({
      id: p.id,
      title: p.title,
      companyTier: p.companyTier,
      companyName: p.companyName,
      difficulty: p.difficulty,
      scenario: p.scenario,
      taskCount: p.tasks.length,
      requiredLessons: [] as string[],
      isImmersive: true,
    })),
  ];

  // Group projects by tier
  const projectsByTier = new Map<number, GalleryProject[]>();
  for (const project of allProjects) {
    const tier = project.companyTier;
    if (!projectsByTier.has(tier)) {
      projectsByTier.set(tier, []);
    }
    projectsByTier.get(tier)!.push(project);
  }

  const tierLabels: Record<number, string> = {
    1: "Tier 1: Small Startup",
    2: "Tier 2: Growing Startup",
    3: "Tier 3: Series-E Startup",
    4: "Tier 4: Big-5 Company",
  };

  const tierDescriptions: Record<number, string> = {
    1: "Fast iteration, minimal process, wear many hats",
    2: "Growing pains, some process, scaling challenges",
    3: "Established systems, technical debt, cross-team coordination",
    4: "Enterprise-scale, strict processes, massive codebase",
  };

  return (
    <div className="space-y-12">
      {[1, 2, 3, 4].map((tier) => {
        const tierProjects = projectsByTier.get(tier);
        if (!tierProjects || tierProjects.length === 0) return null;

        return (
          <div key={tier}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-sand-100 font-serif">{tierLabels[tier]}</h2>
              <p className="text-sand-400 mt-1">{tierDescriptions[tier]}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {tierProjects.map((project) => {
                const isComplete = isProjectComplete(project.id);
                const hasRequiredLessons = project.requiredLessons.every((slug) =>
                  completedLessons.includes(slug)
                );

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={cn(
                      "block bg-sand-900 rounded-xl border overflow-hidden transition-all hover:shadow-warm-lg",
                      isComplete
                        ? "border-teal-500/30 hover:border-teal-500/50"
                        : "border-sand-800 hover:border-sand-700"
                    )}
                  >
                    <div className="p-6">
                      {/* Company Badge */}
                      <div className="mb-4 flex items-center justify-between">
                        <CompanyBadge
                          tier={project.companyTier}
                          companyName={project.companyName}
                          size="sm"
                        />
                        {project.isImmersive && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            Multi-File IDE
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg font-semibold text-sand-100 mb-2">
                        {project.title}
                      </h3>

                      {/* Scenario Preview */}
                      <p className="text-sm text-sand-400 mb-4 line-clamp-2">
                        {project.scenario}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            difficultyColors[project.difficulty]
                          )}
                        >
                          {project.difficulty}
                        </span>
                        <span className="text-xs text-sand-500">
                          {project.taskCount} {project.taskCount === 1 ? "task" : "tasks"}
                        </span>
                        {project.isImmersive && (
                          <span className="text-xs text-sand-500">
                            React + Vite
                          </span>
                        )}
                        {isComplete && (
                          <span className="flex items-center gap-1 text-xs text-teal-400">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                        {!project.isImmersive && !hasRequiredLessons && (
                          <span className="flex items-center gap-1 text-xs text-sand-500">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Complete lessons to unlock
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
