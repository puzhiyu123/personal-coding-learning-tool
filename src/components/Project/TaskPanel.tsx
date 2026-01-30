"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ImmersiveTask, ImmersiveTaskValidation } from "@/lib/immersive-projects";
import ProjectSlackMessage from "./ProjectSlackMessage";

interface ValidationResult {
  validation: ImmersiveTaskValidation;
  passed: boolean;
}

interface TaskPanelProps {
  tasks: ImmersiveTask[];
  currentTaskIndex: number;
  completedTasks: Set<string>;
  onCheckWork: () => ValidationResult[];
  onNextTask: () => void;
  onSelectTask: (index: number) => void;
}

export default function TaskPanel({
  tasks,
  currentTaskIndex,
  completedTasks,
  onCheckWork,
  onNextTask,
  onSelectTask,
}: TaskPanelProps) {
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(-1);
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null);
  const [checking, setChecking] = useState(false);

  const task = tasks[currentTaskIndex];
  if (!task) return null;

  const isComplete = completedTasks.has(task.id);
  const allComplete = tasks.every((t) => completedTasks.has(t.id));

  const handleCheck = () => {
    setChecking(true);
    const results = onCheckWork();
    setValidationResults(results);
    setChecking(false);
  };

  const handleNextHint = () => {
    if (!showHints) {
      setShowHints(true);
      setCurrentHint(0);
    } else if (currentHint < task.hints.length - 1) {
      setCurrentHint((h) => h + 1);
    }
  };

  const handleTaskSwitch = (index: number) => {
    onSelectTask(index);
    setValidationResults(null);
    setShowHints(false);
    setCurrentHint(-1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Task tabs */}
      <div className="flex flex-wrap gap-1 p-3 border-b border-sand-800">
        {tasks.map((t, i) => {
          const done = completedTasks.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => handleTaskSwitch(i)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md font-medium transition-colors",
                i === currentTaskIndex
                  ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                  : done
                  ? "bg-sand-800 text-teal-400 border border-sand-700"
                  : "bg-sand-800 text-sand-400 border border-sand-700 hover:text-sand-300"
              )}
            >
              {done ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {i + 1}
                </span>
              ) : (
                `Task ${i + 1}`
              )}
            </button>
          );
        })}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {/* Task title */}
        <div>
          <h3 className="text-base font-semibold text-sand-100 font-serif">
            {task.title}
          </h3>
          <p className="text-sm text-sand-400 mt-1">{task.description}</p>
        </div>

        {/* Slack context */}
        <div>
          <ProjectSlackMessage message={task.context} />
        </div>

        {/* Target files */}
        <div>
          <h4 className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
            Files to Edit
          </h4>
          <div className="space-y-1">
            {task.targetFiles.map((file) => (
              <div
                key={file}
                className="flex items-center gap-2 text-sm text-primary-400 bg-primary-500/10 px-2.5 py-1.5 rounded-md"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <code className="text-xs font-mono">{file}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
            Requirements
          </h4>
          <ul className="space-y-1.5">
            {task.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-sand-300">
                <span className="w-4 h-4 flex-shrink-0 rounded-full border border-sand-600 flex items-center justify-center mt-0.5 text-[10px] text-sand-500">
                  {i + 1}
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Validation results */}
        {validationResults && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
              Results
            </h4>
            {validationResults.map((result, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 text-sm px-2.5 py-1.5 rounded-md",
                  result.passed
                    ? "text-teal-400 bg-teal-500/10"
                    : "text-accent-400 bg-accent-500/10"
                )}
              >
                {result.passed ? (
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span>{result.validation.description}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hints */}
        {showHints && currentHint >= 0 && (
          <div>
            <h4 className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
              Hints
            </h4>
            <div className="space-y-2">
              {task.hints.slice(0, currentHint + 1).map((hint, i) => (
                <div
                  key={i}
                  className="text-sm text-yellow-300/90 bg-yellow-500/10 px-3 py-2 rounded-md border border-yellow-500/20"
                >
                  <span className="font-medium text-yellow-400">Hint {i + 1}:</span>{" "}
                  {hint}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All complete message */}
        {allComplete && (
          <div className="text-center py-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <svg
              className="w-8 h-8 mx-auto text-teal-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-teal-300 font-semibold">All tasks complete!</p>
            <p className="text-teal-400/70 text-sm mt-1">Project finished. Great work!</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-3 border-t border-sand-800 space-y-2">
        {!isComplete ? (
          <>
            <button
              onClick={handleCheck}
              disabled={checking}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check Work"}
            </button>
            <button
              onClick={handleNextHint}
              disabled={showHints && currentHint >= task.hints.length - 1}
              className="w-full px-4 py-2 bg-sand-800 text-sand-300 rounded-lg hover:bg-sand-700 transition-colors text-sm disabled:opacity-50"
            >
              {!showHints
                ? "Show Hint"
                : currentHint < task.hints.length - 1
                ? `Next Hint (${currentHint + 1}/${task.hints.length})`
                : "No More Hints"}
            </button>
          </>
        ) : currentTaskIndex < tasks.length - 1 ? (
          <button
            onClick={onNextTask}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Next Task →
          </button>
        ) : null}
      </div>
    </div>
  );
}

export type { ValidationResult };
