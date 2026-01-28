"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useProgressContext } from "../ProgressProvider";
import ProjectBriefing from "./ProjectBriefing";
import ProjectEditor from "./ProjectEditor";
import { cn } from "@/lib/utils";

interface ProjectContainerProps {
  project: Project;
}

export default function ProjectContainer({ project }: ProjectContainerProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showBriefing, setShowBriefing] = useState(true);

  const { completeProject } = useProgressContext();

  const handleTaskComplete = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);

    // Check if all tasks are done
    if (newCompleted.size === project.tasks.length) {
      completeProject(project.id);
    }
  };

  const allTasksComplete = completedTasks.size === project.tasks.length;

  if (showBriefing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <ProjectBriefing project={project} />

        <button
          onClick={() => setShowBriefing(false)}
          className="w-full px-6 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium text-lg"
        >
          Start Project
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Task Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setShowBriefing(true)}
            className="text-sand-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Briefing
          </button>
        </div>

        {/* Task Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {project.tasks.map((task, index) => {
            const isComplete = completedTasks.has(task.id);
            const isCurrent = index === currentTaskIndex;

            return (
              <button
                key={task.id}
                onClick={() => setCurrentTaskIndex(index)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border",
                  isCurrent
                    ? "bg-primary-500/20 text-primary-400 border-primary-500/30"
                    : isComplete
                      ? "bg-teal-500/10 text-teal-400 border-teal-500/30"
                      : "bg-sand-900 text-sand-400 border-sand-700 hover:border-sand-600"
                )}
              >
                {isComplete ? (
                  <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-sand-600 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                )}
                {task.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Task */}
      {!allTasksComplete && (
        <ProjectEditor
          key={project.tasks[currentTaskIndex].id}
          task={project.tasks[currentTaskIndex]}
          onComplete={() => handleTaskComplete(project.tasks[currentTaskIndex].id)}
          isComplete={completedTasks.has(project.tasks[currentTaskIndex].id)}
        />
      )}

      {/* All Tasks Complete */}
      {allTasksComplete && (
        <div className="bg-gradient-to-r from-teal-500/10 to-primary-500/10 border border-teal-500/30 rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-sand-100 font-serif mb-2">
            Project Complete!
          </h2>
          <p className="text-sand-400 mb-6">
            You&apos;ve successfully completed all tasks at {project.companyName}. Great work!
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/projects"
              className="px-6 py-3 bg-sand-800 text-sand-200 rounded-lg hover:bg-sand-700 transition-colors font-medium"
            >
              Browse More Projects
            </Link>
            <Link
              href={`/lessons/${project.trackSlug}`}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Continue Learning
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
