"use client";

import { useEffect, useRef, useMemo } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import type { CodeComparison } from "@/lib/code-comparisons";
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

interface CodeComparisonProps {
  comparison: CodeComparison;
}

export default function CodeComparisonComponent({
  comparison,
}: CodeComparisonProps) {
  const { isDark } = useThemeContext();
  const { viewedComparisons, markComparisonViewed } = useProgressContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const isViewed = viewedComparisons.includes(comparison.id);

  // Auto-mark as viewed when component mounts or scrolls into view
  useEffect(() => {
    if (isViewed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markComparisonViewed(comparison.id);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [comparison.id, isViewed, markComparisonViewed]);

  const highlightedCodeA = useMemo(() => {
    const lang = hljs.getLanguage(comparison.approachA.language)
      ? comparison.approachA.language
      : "javascript";
    try {
      return hljs.highlight(comparison.approachA.code, { language: lang })
        .value;
    } catch {
      return hljs.highlightAuto(comparison.approachA.code).value;
    }
  }, [comparison.approachA.code, comparison.approachA.language]);

  const highlightedCodeB = useMemo(() => {
    const lang = hljs.getLanguage(comparison.approachB.language)
      ? comparison.approachB.language
      : "javascript";
    try {
      return hljs.highlight(comparison.approachB.code, { language: lang })
        .value;
    } catch {
      return hljs.highlightAuto(comparison.approachB.code).value;
    }
  }, [comparison.approachB.code, comparison.approachB.language]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-xl border overflow-hidden",
        isDark ? "bg-sand-900 border-sand-800" : "bg-white border-sand-200"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-5 py-4 flex items-center justify-between",
          isDark ? "border-b border-sand-800" : "border-b border-sand-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h3
              className={cn(
                "text-base font-semibold",
                isDark ? "text-sand-100" : "text-sand-900"
              )}
            >
              {comparison.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-500/20 text-primary-400">
            {comparison.category}
          </span>
          {isViewed && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-400">
              Viewed
            </span>
          )}
        </div>
      </div>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
        {/* Approach A */}
        <ApproachColumn
          label="A"
          approach={comparison.approachA}
          highlightedCode={highlightedCodeA}
          isDark={isDark}
          accentClasses="bg-blue-500/20 text-blue-400"
        />

        {/* Approach B */}
        <ApproachColumn
          label="B"
          approach={comparison.approachB}
          highlightedCode={highlightedCodeB}
          isDark={isDark}
          accentClasses="bg-purple-500/20 text-purple-400"
        />
      </div>

      {/* Footer */}
      <div
        className={cn(
          "px-5 pb-5 space-y-4",
          isDark ? "border-t border-sand-800" : "border-t border-sand-200"
        )}
      >
        {/* Verdict */}
        <div
          className={cn(
            "mt-4 p-4 rounded-lg border",
            isDark
              ? "bg-sand-800/50 border-sand-700"
              : "bg-sand-50 border-sand-200"
          )}
        >
          <div className="flex items-start gap-2">
            <svg
              className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                isDark ? "text-sand-400" : "text-sand-500"
              )}
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
            <div>
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider mb-1",
                  isDark ? "text-sand-400" : "text-sand-500"
                )}
              >
                Verdict
              </p>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-sand-200" : "text-sand-700"
                )}
              >
                {comparison.verdict}
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
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
            {comparison.keyTakeaway}
          </p>
        </div>

        {/* Mark as viewed button */}
        <div className="flex justify-end">
          {isViewed ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium",
                "text-green-400"
              )}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Viewed
            </span>
          ) : (
            <button
              onClick={() => markComparisonViewed(comparison.id)}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
                isDark
                  ? "bg-sand-800 text-sand-300 hover:bg-sand-700 hover:text-sand-100"
                  : "bg-sand-100 text-sand-600 hover:bg-sand-200 hover:text-sand-800"
              )}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Mark as viewed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Approach Column sub-component                                     */
/* ------------------------------------------------------------------ */

interface ApproachColumnProps {
  label: string;
  approach: CodeComparison["approachA"];
  highlightedCode: string;
  isDark: boolean;
  accentClasses: string;
}

function ApproachColumn({
  label,
  approach,
  highlightedCode,
  isDark,
  accentClasses,
}: ApproachColumnProps) {
  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden",
        isDark ? "border-sand-700" : "border-sand-200"
      )}
    >
      {/* Approach header */}
      <div
        className={cn(
          "px-4 py-3 flex items-center gap-2",
          isDark ? "bg-sand-800" : "bg-sand-50"
        )}
      >
        <span
          className={cn(
            "text-xs font-bold w-5 h-5 rounded flex items-center justify-center",
            accentClasses
          )}
        >
          {label}
        </span>
        <h4
          className={cn(
            "text-sm font-bold",
            isDark ? "text-sand-100" : "text-sand-900"
          )}
        >
          {approach.title}
        </h4>
      </div>

      {/* Code block */}
      <pre
        className={cn(
          "p-4 text-sm font-mono overflow-x-auto border-b",
          isDark
            ? "bg-sand-950 border-sand-700"
            : "bg-sand-50 border-sand-200"
        )}
      >
        <code
          className="hljs"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>

      {/* Details sections */}
      <div
        className={cn("p-4 space-y-4", isDark ? "bg-sand-900" : "bg-white")}
      >
        {/* When to use */}
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-wider mb-2",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            When to use
          </p>
          <ul className="space-y-1.5">
            {approach.whenToUse.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span
                  className={cn(
                    "text-sm",
                    isDark ? "text-sand-300" : "text-sand-600"
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pros */}
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-wider mb-2",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            Pros
          </p>
          <ul className="space-y-1.5">
            {approach.pros.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span
                  className={cn(
                    "text-sm",
                    isDark ? "text-sand-300" : "text-sand-600"
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-wider mb-2",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            Cons
          </p>
          <ul className="space-y-1.5">
            {approach.cons.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span
                  className={cn(
                    "text-sm",
                    isDark ? "text-sand-300" : "text-sand-600"
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
