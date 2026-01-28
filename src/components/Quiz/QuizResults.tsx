"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Quiz, QuizQuestion } from "@/lib/quizzes";

interface QuizResultsProps {
  quiz: Quiz;
  answers: { question: QuizQuestion; answer: string | string[]; isCorrect: boolean }[];
  onRetry: () => void;
}

export default function QuizResults({ quiz, answers, onRetry }: QuizResultsProps) {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const getScoreMessage = () => {
    if (percentage === 100) return "Perfect score! You nailed it!";
    if (percentage >= 80) return "Great job! You have a solid understanding.";
    if (percentage >= 60) return "Good effort! Keep practicing.";
    if (percentage >= 40) return "Getting there! Review the material.";
    return "Keep learning! Consider revisiting the lessons.";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-teal-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-coral-400";
  };

  return (
    <div className="space-y-8">
      {/* Score Summary */}
      <div className="text-center">
        <div
          className={cn(
            "inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-4",
            percentage >= 80 && "border-teal-500",
            percentage >= 60 && percentage < 80 && "border-yellow-500",
            percentage < 60 && "border-coral-500"
          )}
        >
          <span className={cn("text-4xl font-bold", getScoreColor())}>
            {percentage}%
          </span>
        </div>
        <h2 className="text-2xl font-bold text-sand-100 font-serif mb-2">
          Quiz Complete!
        </h2>
        <p className="text-sand-400">
          You got {correctCount} out of {totalCount} questions correct
        </p>
        <p className={cn("text-lg font-medium mt-2", getScoreColor())}>
          {getScoreMessage()}
        </p>
      </div>

      {/* Question Review */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sand-200">Question Review</h3>
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border",
                answer.isCorrect
                  ? "border-teal-500/30 bg-teal-500/5"
                  : "border-coral-500/30 bg-coral-500/5"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                    answer.isCorrect ? "bg-teal-500" : "bg-coral-500"
                  )}
                >
                  {answer.isCorrect ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sand-200 font-medium">{answer.question.question}</p>
                  <div className="mt-2 text-sm">
                    <p className="text-sand-400">
                      Your answer:{" "}
                      <span className={answer.isCorrect ? "text-teal-400" : "text-coral-400"}>
                        {Array.isArray(answer.answer) ? answer.answer.join(", ") : answer.answer}
                      </span>
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sand-400 mt-1">
                        Correct answer:{" "}
                        <span className="text-teal-400">
                          {Array.isArray(answer.question.correctAnswer)
                            ? answer.question.correctAnswer.join(", ")
                            : answer.question.correctAnswer}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-3 bg-sand-800 text-sand-200 rounded-lg hover:bg-sand-700 transition-colors font-medium"
        >
          Try Again
        </button>
        <Link
          href={`/lessons/${quiz.trackSlug}`}
          className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-center"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
}
