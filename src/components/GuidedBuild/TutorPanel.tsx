"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CodeBlock from "../CodeBlock";
import type { GuidedBuildStep, GuidedBuildSaveState } from "@/lib/guided-builds";

interface ValidationResult {
  description: string;
  passed: boolean;
}

interface TutorPanelProps {
  currentStep: GuidedBuildStep;
  currentStepIndex: number;
  totalSteps: number;
  stepProgress: GuidedBuildSaveState["stepProgress"];
  isStepComplete: boolean;
  isAllComplete: boolean;
  validationResults: ValidationResult[] | null;
  onCheckCode: () => ValidationResult[];
  onNextStep: () => void;
  onPrevStep: () => void;
  onShowMe: () => void;
  onSkip: () => void;
  onGoToStep: (index: number) => void;
}

export default function TutorPanel({
  currentStep,
  currentStepIndex,
  totalSteps,
  stepProgress,
  isStepComplete,
  isAllComplete,
  validationResults,
  onCheckCode,
  onNextStep,
  onPrevStep,
  onShowMe,
  onSkip,
  onGoToStep,
}: TutorPanelProps) {
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [showConfirmShowMe, setShowConfirmShowMe] = useState(false);

  const allValidationsPassed =
    validationResults && validationResults.every((r) => r.passed);
  const completedCount = stepProgress.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const handleCheckCode = () => {
    onCheckCode();
  };

  const handleShowMe = () => {
    setShowConfirmShowMe(false);
    onShowMe();
  };

  // Determine the code language from file extension
  const getLanguage = (path: string): string => {
    if (path.endsWith(".jsx") || path.endsWith(".js")) return "javascript";
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return "typescript";
    if (path.endsWith(".css")) return "css";
    if (path.endsWith(".html")) return "html";
    if (path.endsWith(".json")) return "json";
    return "javascript";
  };

  return (
    <div className="flex flex-col h-full min-w-0">
      {/* Header: Progress */}
      <div className="p-3 border-b border-sand-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-sand-400">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-xs text-sand-500">{progressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-sand-800 rounded-full h-1.5 mb-2">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex gap-1 flex-wrap">
          {stepProgress.map((sp, i) => (
            <button
              key={sp.stepId}
              onClick={() => onGoToStep(i)}
              className={cn(
                "w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center transition-all",
                i === currentStepIndex
                  ? "bg-primary-500 text-white ring-2 ring-primary-500/30"
                  : sp.completed
                  ? sp.method === "self"
                    ? "bg-teal-500 text-white"
                    : sp.method === "assisted"
                    ? "bg-yellow-500 text-sand-900"
                    : "bg-sand-600 text-sand-300"
                  : "bg-sand-800 text-sand-500 hover:bg-sand-700"
              )}
              title={
                sp.completed
                  ? sp.method === "self"
                    ? "Completed on your own"
                    : sp.method === "assisted"
                    ? "Completed with help"
                    : "Skipped"
                  : `Step ${i + 1}`
              }
            >
              {sp.completed ? (
                sp.method === "skipped" ? (
                  "−"
                ) : (
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
                )
              ) : (
                i + 1
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide p-4 space-y-4 min-w-0">
        {/* All complete celebration */}
        {isAllComplete && (
          <div className="text-center py-6 bg-teal-500/10 rounded-xl border border-teal-500/20 mb-4">
            <div className="text-4xl mb-2">*</div>
            <p className="text-teal-300 font-semibold text-lg">
              Project Complete!
            </p>
            <p className="text-teal-400/70 text-sm mt-1">
              You built the entire {currentStep ? "" : ""}project. Great work!
            </p>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              <span className="text-teal-400">
                {stepProgress.filter((s) => s.method === "self").length} on your
                own
              </span>
              <span className="text-yellow-400">
                {stepProgress.filter((s) => s.method === "assisted").length}{" "}
                assisted
              </span>
              <span className="text-sand-500">
                {stepProgress.filter((s) => s.method === "skipped").length}{" "}
                skipped
              </span>
            </div>
          </div>
        )}

        {/* Step title */}
        <div>
          <h3 className="text-base font-semibold text-sand-100 font-serif">
            {currentStep.title}
          </h3>
        </div>

        {/* Instruction */}
        <div className="text-sm text-sand-300 leading-relaxed">
          <p>{currentStep.instruction}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-primary-400">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <code className="font-mono">{currentStep.targetFile}</code>
          </div>
        </div>

        {/* Code block */}
        <CodeBlock
          code={currentStep.codeToWrite}
          language={getLanguage(currentStep.targetFile)}
        />

        {/* WHY explanation */}
        <div className="bg-sand-800/50 rounded-lg p-3 border border-sand-700/50">
          <h4 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-1.5">
            Why?
          </h4>
          <p className="text-sm text-sand-300 leading-relaxed">
            {currentStep.explanation}
          </p>
        </div>

        {/* Concepts */}
        <div className="flex flex-wrap gap-1.5">
          {currentStep.concepts.map((concept) => (
            <span
              key={concept}
              className="px-2 py-0.5 text-[10px] font-medium bg-primary-500/10 text-primary-400 rounded-full"
            >
              {concept}
            </span>
          ))}
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
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span>{result.description}</span>
              </div>
            ))}
          </div>
        )}

        {/* Deep explanation */}
        {currentStep.deepExplanation && (
          <div>
            <button
              onClick={() => setShowDeepExplanation(!showDeepExplanation)}
              className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
            >
              <svg
                className={cn(
                  "w-3 h-3 transition-transform",
                  showDeepExplanation && "rotate-90"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Explain More
            </button>
            {showDeepExplanation && (
              <div className="mt-2 p-3 bg-sand-800/30 rounded-lg border border-sand-700/30 text-sm text-sand-400 leading-relaxed">
                {currentStep.deepExplanation}
              </div>
            )}
          </div>
        )}

        {/* Confirmation dialog for Show Me */}
        {showConfirmShowMe && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-300 mb-2">
              This will insert the code for you. You&apos;ll still learn the
              concept, but the step will be marked as &quot;assisted&quot;.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleShowMe}
                className="px-3 py-1.5 text-xs bg-yellow-500 text-sand-900 rounded-md font-medium hover:bg-yellow-400 transition-colors"
              >
                Insert Code
              </button>
              <button
                onClick={() => setShowConfirmShowMe(false)}
                className="px-3 py-1.5 text-xs bg-sand-800 text-sand-300 rounded-md hover:bg-sand-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed action bar */}
      <div className="p-3 border-t border-sand-800 space-y-2">
        {/* Primary action */}
        {!isStepComplete ? (
          <button
            onClick={handleCheckCode}
            className="w-full px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Check My Code
          </button>
        ) : currentStepIndex < totalSteps - 1 ? (
          <button
            onClick={onNextStep}
            className="w-full px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Next Step →
          </button>
        ) : null}

        {/* After validation passes but step isn't yet marked complete */}
        {allValidationsPassed && !isStepComplete && (
          <button
            onClick={onNextStep}
            className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
          >
            Next Step →
          </button>
        )}

        {/* Secondary actions */}
        {!isStepComplete && !showConfirmShowMe && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirmShowMe(true)}
              className="flex-1 px-3 py-2 bg-sand-800 text-sand-300 rounded-lg hover:bg-sand-700 transition-colors text-xs"
            >
              Show Me
            </button>
            <button
              onClick={onSkip}
              className="flex-1 px-3 py-2 bg-sand-800 text-sand-400 rounded-lg hover:bg-sand-700 transition-colors text-xs"
            >
              Skip
            </button>
          </div>
        )}

        {/* Step navigation */}
        <div className="flex justify-between pt-1">
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex === 0}
            className="text-xs text-sand-500 hover:text-sand-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= totalSteps - 1}
            className="text-xs text-sand-500 hover:text-sand-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
