"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import type { DailyTip as DailyTipType } from "@/lib/daily-tips";
import { cn } from "@/lib/utils";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

interface DailyTipProps {
  tip: DailyTipType;
  isDark?: boolean;
  onDismiss?: () => void;
}

const trackLabels: Record<string, string> = {
  nextjs: "Next.js",
  nodejs: "Node.js",
};

const trackColors: Record<string, string> = {
  nextjs: "bg-purple-500/20 text-purple-400",
  nodejs: "bg-green-500/20 text-green-400",
};

export default function DailyTipComponent({
  tip,
  isDark = true,
  onDismiss,
}: DailyTipProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const highlightedCode = useMemo(() => {
    const lang = hljs.getLanguage(tip.codeExample.language) ? tip.codeExample.language : "javascript";
    try {
      return hljs.highlight(tip.codeExample.code, { language: lang }).value;
    } catch {
      return hljs.highlightAuto(tip.codeExample.code).value;
    }
  }, [tip.codeExample.code, tip.codeExample.language]);

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
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-5 py-4 transition-colors",
          isDark ? "hover:bg-sand-800/50" : "hover:bg-sand-50"
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="text-left">
            <p
              className={cn(
                "text-xs font-medium uppercase tracking-wider",
                isDark ? "text-sand-500" : "text-sand-400"
              )}
            >
              Today&apos;s Tip
            </p>
            <h3
              className={cn(
                "text-base font-semibold",
                isDark ? "text-sand-100" : "text-sand-900"
              )}
            >
              {tip.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trackColors[tip.trackId] || "bg-sand-700 text-sand-300"
            )}
          >
            {trackLabels[tip.trackId] || tip.trackId}
          </span>
          <svg
            className={cn(
              "w-5 h-5 transition-transform",
              isDark ? "text-sand-500" : "text-sand-400",
              isExpanded ? "rotate-180" : ""
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className={cn("px-5 pb-5 space-y-4", isDark ? "border-t border-sand-800" : "border-t border-sand-200")}>
          {/* Explanation */}
          <div className="pt-4">
            <p className={cn("text-base leading-relaxed whitespace-pre-line", isDark ? "text-sand-300" : "text-sand-600")}>
              {tip.content}
            </p>
          </div>

          {/* Code Example */}
          <div className={cn("rounded-lg overflow-hidden border", isDark ? "border-sand-700" : "border-sand-300")}>
            <div className={cn("px-3 py-2 text-xs font-medium", isDark ? "bg-sand-800 text-sand-400" : "bg-sand-100 text-sand-500")}>
              {tip.codeExample.title}
            </div>
            <pre className={cn("p-4 text-sm font-mono overflow-x-auto", isDark ? "bg-sand-950" : "bg-sand-50")}>
              <code className="hljs" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
          </div>

          {/* Key Takeaway */}
          <div className={cn("flex items-start gap-2 p-3 rounded-lg", isDark ? "bg-primary-500/10" : "bg-primary-50")}>
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
            <p className={cn("text-sm font-medium", isDark ? "text-primary-300" : "text-primary-700")}>
              {tip.keyTakeaway}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {tip.relatedDrillId && (
              <Link
                href={`/practice/drills/${tip.relatedDrillId}`}
                className="text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-1"
              >
                Practice this
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className={cn(
                  "text-sm ml-auto transition-colors",
                  isDark
                    ? "text-sand-500 hover:text-sand-300"
                    : "text-sand-400 hover:text-sand-600"
                )}
              >
                Got it
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
