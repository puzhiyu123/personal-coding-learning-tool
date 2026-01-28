"use client";

import { useState } from "react";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quizzes";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (answer: string | string[], isCorrect: boolean) => void;
  showResult: boolean;
  selectedAnswer: string | string[] | null;
}

export default function QuizQuestion({
  question,
  onAnswer,
  showResult,
  selectedAnswer,
}: QuizQuestionProps) {
  const [fillBlankAnswer, setFillBlankAnswer] = useState("");

  const checkAnswer = (answer: string | string[]): boolean => {
    const correct = question.correctAnswer;
    if (Array.isArray(correct)) {
      if (Array.isArray(answer)) {
        return correct.every((c, i) => c.toLowerCase() === answer[i]?.toLowerCase());
      }
      return correct.some((c) => c.toLowerCase() === answer.toLowerCase());
    }
    if (Array.isArray(answer)) {
      return answer.some((a) => a.toLowerCase() === correct.toLowerCase());
    }
    return answer.toLowerCase() === correct.toLowerCase();
  };

  const handleOptionClick = (option: string) => {
    if (showResult) return;
    const isCorrect = checkAnswer(option);
    onAnswer(option, isCorrect);
  };

  const handleFillBlankSubmit = () => {
    if (showResult || !fillBlankAnswer.trim()) return;
    const isCorrect = checkAnswer(fillBlankAnswer.trim());
    onAnswer(fillBlankAnswer.trim(), isCorrect);
  };

  const renderCode = () => {
    if (!question.code) return null;
    return (
      <pre className="bg-sand-950 border border-sand-700 rounded-lg p-4 overflow-x-auto mb-4">
        <code className="text-sm font-mono text-sand-200">{question.code}</code>
      </pre>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption =
            Array.isArray(question.correctAnswer)
              ? question.correctAnswer.includes(option)
              : question.correctAnswer === option;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showResult}
              className={cn(
                "w-full p-4 text-left rounded-lg border transition-all",
                !showResult &&
                  "hover:border-primary-500 hover:bg-sand-800/50 cursor-pointer",
                showResult && isCorrectOption && "border-teal-500 bg-teal-500/10",
                showResult && isSelected && !isCorrectOption && "border-coral-500 bg-coral-500/10",
                !showResult && isSelected && "border-primary-500 bg-primary-500/10",
                !showResult && !isSelected && "border-sand-700 bg-sand-900"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    showResult && isCorrectOption && "bg-teal-500 text-white",
                    showResult && isSelected && !isCorrectOption && "bg-coral-500 text-white",
                    !showResult && isSelected && "bg-primary-500 text-white",
                    !showResult && !isSelected && "bg-sand-800 text-sand-400"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span
                  className={cn(
                    "text-sand-200",
                    showResult && isCorrectOption && "text-teal-300",
                    showResult && isSelected && !isCorrectOption && "text-coral-300"
                  )}
                >
                  {option}
                </span>
                {showResult && isCorrectOption && (
                  <svg className="w-5 h-5 text-teal-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <svg className="w-5 h-5 text-coral-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderFillBlank = () => {
    const isCorrect = showResult && checkAnswer(fillBlankAnswer.trim());
    return (
      <div className="space-y-4">
        {question.code && (
          <pre className="bg-sand-950 border border-sand-700 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-sand-200">{question.code}</code>
          </pre>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            value={fillBlankAnswer}
            onChange={(e) => setFillBlankAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFillBlankSubmit()}
            disabled={showResult}
            placeholder="Type your answer..."
            className={cn(
              "flex-1 px-4 py-3 rounded-lg border bg-sand-900 text-sand-100 placeholder-sand-500 focus:outline-none focus:ring-2",
              showResult && isCorrect && "border-teal-500 focus:ring-teal-500",
              showResult && !isCorrect && "border-coral-500 focus:ring-coral-500",
              !showResult && "border-sand-700 focus:ring-primary-500"
            )}
          />
          {!showResult && (
            <button
              onClick={handleFillBlankSubmit}
              disabled={!fillBlankAnswer.trim()}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
        {showResult && (
          <p className={cn("text-sm", isCorrect ? "text-teal-400" : "text-coral-400")}>
            {isCorrect ? "Correct!" : `The correct answer is: ${Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}`}
          </p>
        )}
      </div>
    );
  };

  const renderTrueFalse = () => {
    return renderMultipleChoice();
  };

  const renderCodeOutput = () => {
    return (
      <>
        {renderCode()}
        {renderMultipleChoice()}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold text-sand-100 mb-4">{question.question}</h2>

        {/* Question type badge */}
        <span className={cn(
          "inline-block px-2 py-1 rounded text-xs font-medium mb-4",
          question.type === "multiple-choice" && "bg-blue-500/20 text-blue-400",
          question.type === "code-output" && "bg-purple-500/20 text-purple-400",
          question.type === "fill-blank" && "bg-orange-500/20 text-orange-400",
          question.type === "true-false" && "bg-teal-500/20 text-teal-400"
        )}>
          {question.type === "multiple-choice" && "Multiple Choice"}
          {question.type === "code-output" && "Code Output"}
          {question.type === "fill-blank" && "Fill in the Blank"}
          {question.type === "true-false" && "True/False"}
        </span>
      </div>

      {/* Answer options based on type */}
      {question.type === "multiple-choice" && renderMultipleChoice()}
      {question.type === "code-output" && renderCodeOutput()}
      {question.type === "fill-blank" && renderFillBlank()}
      {question.type === "true-false" && renderTrueFalse()}
    </div>
  );
}
