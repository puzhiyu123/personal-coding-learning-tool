"use client";

import type { QuizQuestion } from "@/lib/quizzes";
import { cn } from "@/lib/utils";

interface QuizFeedbackProps {
  question: QuizQuestion;
  isCorrect: boolean;
  onContinue: () => void;
}

export default function QuizFeedback({
  question,
  isCorrect,
  onContinue,
}: QuizFeedbackProps) {
  return (
    <div
      className={cn(
        "mt-6 p-4 rounded-lg border",
        isCorrect
          ? "bg-teal-500/10 border-teal-500/30"
          : "bg-coral-500/10 border-coral-500/30"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
            isCorrect ? "bg-teal-500" : "bg-coral-500"
          )}
        >
          {isCorrect ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold text-lg",
              isCorrect ? "text-teal-300" : "text-coral-300"
            )}
          >
            {isCorrect ? "Correct!" : "Not quite right"}
          </h3>
          <p className="text-sand-300 mt-2">{question.explanation}</p>
        </div>
      </div>

      <button
        onClick={onContinue}
        className={cn(
          "mt-4 w-full py-3 rounded-lg font-medium transition-colors",
          isCorrect
            ? "bg-teal-500 hover:bg-teal-600 text-white"
            : "bg-coral-500 hover:bg-coral-600 text-white"
        )}
      >
        Continue
      </button>
    </div>
  );
}
