"use client";

import Link from "next/link";
import { useState } from "react";
import type { Quiz } from "@/lib/quizzes";
import { cn } from "@/lib/utils";

interface QuizPromptProps {
  quiz: Quiz;
  onDismiss?: () => void;
}

export default function QuizPrompt({ quiz, onDismiss }: QuizPromptProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-sand-100 mb-1">
            Ready for a Quiz?
          </h3>
          <p className="text-sand-400 text-sm mb-4">
            You&apos;ve made great progress! Test your knowledge with{" "}
            <span className="text-primary-400 font-medium">{quiz.title}</span>.
          </p>
          <p className="text-sand-500 text-xs mb-4">
            {quiz.questions.length} questions • No grades, just learning reinforcement
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/lessons/${quiz.trackSlug}/quiz/${quiz.id}`}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
            >
              Take Quiz
            </Link>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 bg-sand-800 text-sand-300 rounded-lg hover:bg-sand-700 transition-colors text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
