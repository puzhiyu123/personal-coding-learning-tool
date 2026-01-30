"use client";

import { useState, useMemo } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import type { ArchitecturePrompt } from "@/lib/architecture-prompts";
import { cn } from "@/lib/utils";
import { useProgressContext } from "@/components/ProgressProvider";
import { useThemeContext } from "@/components/ThemeProvider";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

interface ArchitecturePromptProps {
  prompt: ArchitecturePrompt;
}

const difficultyStyles: Record<
  ArchitecturePrompt["difficulty"],
  string
> = {
  beginner: "bg-primary-500/20 text-primary-400",
  intermediate: "bg-amber-500/20 text-amber-400",
  advanced: "bg-coral-500/20 text-coral-400",
};

export default function ArchitecturePromptComponent({
  prompt,
}: ArchitecturePromptProps) {
  const [phase, setPhase] = useState<"prompt" | "reveal" | "reflect">("prompt");
  const { completedArchPrompts, completeArchPrompt } = useProgressContext();
  const { isDark } = useThemeContext();

  const isCompleted = completedArchPrompts.includes(prompt.id);

  const highlightedCode = useMemo(() => {
    const lang = hljs.getLanguage(prompt.suggestedApproach.codeSketch.language)
      ? prompt.suggestedApproach.codeSketch.language
      : "javascript";
    try {
      return hljs.highlight(prompt.suggestedApproach.codeSketch.code, {
        language: lang,
      }).value;
    } catch {
      return hljs.highlightAuto(prompt.suggestedApproach.codeSketch.code).value;
    }
  }, [
    prompt.suggestedApproach.codeSketch.code,
    prompt.suggestedApproach.codeSketch.language,
  ]);

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden transition-all",
        isDark
          ? "bg-sand-900 border-sand-800"
          : "bg-white border-sand-200"
      )}
    >
      {/* Header */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                "bg-primary-500/20 text-primary-400"
              )}
            >
              {prompt.category}
            </span>
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full capitalize",
                difficultyStyles[prompt.difficulty]
              )}
            >
              {prompt.difficulty}
            </span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 text-green-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
        </div>
        <h3
          className={cn(
            "text-lg font-semibold",
            isDark ? "text-sand-100" : "text-sand-900"
          )}
        >
          {prompt.title}
        </h3>
      </div>

      {/* Prompt Phase: Think About Questions */}
      <div
        className={cn(
          "px-5 pb-5 space-y-4",
          isDark ? "border-t border-sand-800" : "border-t border-sand-200"
        )}
      >
        <div className="pt-4">
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-wider mb-3",
              isDark ? "text-sand-500" : "text-sand-400"
            )}
          >
            Think About
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            {prompt.thinkAbout.map((question, i) => (
              <li
                key={i}
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-sand-300" : "text-sand-600"
                )}
              >
                {question}
              </li>
            ))}
          </ol>
        </div>

        {/* Show Suggested Approach button */}
        {phase === "prompt" && (
          <button
            onClick={() => setPhase("reveal")}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Show Suggested Approach
          </button>
        )}

        {/* Reveal Phase: Suggested Approach */}
        {(phase === "reveal" || phase === "reflect") && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            {/* Components */}
            <div>
              <p
                className={cn(
                  "text-xs font-medium uppercase tracking-wider mb-2",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Components
              </p>
              <div className="flex flex-wrap gap-2">
                {prompt.suggestedApproach.components.map((component, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      isDark
                        ? "bg-sand-800 text-sand-300"
                        : "bg-sand-100 text-sand-600"
                    )}
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Model */}
            <div>
              <p
                className={cn(
                  "text-xs font-medium uppercase tracking-wider mb-2",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Data Model
              </p>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-sand-300" : "text-sand-600"
                )}
              >
                {prompt.suggestedApproach.dataModel}
              </p>
            </div>

            {/* Tricky Parts */}
            <div>
              <p
                className={cn(
                  "text-xs font-medium uppercase tracking-wider mb-2",
                  isDark ? "text-sand-500" : "text-sand-400"
                )}
              >
                Tricky Parts
              </p>
              <ul className="space-y-2">
                {prompt.suggestedApproach.trickyParts.map((part, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        isDark ? "text-sand-300" : "text-sand-600"
                      )}
                    >
                      {part}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Sketch */}
            <div
              className={cn(
                "rounded-lg overflow-hidden border",
                isDark ? "border-sand-700" : "border-sand-300"
              )}
            >
              <div
                className={cn(
                  "px-3 py-2 text-xs font-medium",
                  isDark
                    ? "bg-sand-800 text-sand-400"
                    : "bg-sand-100 text-sand-500"
                )}
              >
                {prompt.suggestedApproach.codeSketch.title}
              </div>
              <pre
                className={cn(
                  "p-4 text-sm font-mono overflow-x-auto",
                  isDark ? "bg-sand-950" : "bg-sand-50"
                )}
              >
                <code
                  className="hljs"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>

            {/* Show Key Insight button */}
            {phase === "reveal" && (
              <button
                onClick={() => setPhase("reflect")}
                className="w-full py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                Show Key Insight
              </button>
            )}
          </div>
        )}

        {/* Reflect Phase: Key Insight + Mark Complete */}
        {phase === "reflect" && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            {/* Key Insight Callout */}
            <div
              className={cn(
                "flex items-start gap-2 p-3 rounded-lg",
                isDark ? "bg-primary-500/10" : "bg-primary-50"
              )}
            >
              <svg
                className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                className={cn(
                  "text-sm font-medium",
                  isDark ? "text-primary-300" : "text-primary-700"
                )}
              >
                {prompt.keyInsight}
              </p>
            </div>

            {/* Mark as Completed */}
            {!isCompleted && (
              <button
                onClick={() => completeArchPrompt(prompt.id)}
                className="w-full py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
