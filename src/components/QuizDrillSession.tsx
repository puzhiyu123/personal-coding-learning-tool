"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useProgressContext } from "./ProgressProvider";
import { useThemeContext } from "./ThemeProvider";
import QuizSessionSummary from "./QuizSessionSummary";
import StreakBadge from "./StreakBadge";
import {
  getDailyQuizExercises,
  type DailyQuizExercise,
} from "@/lib/daily-quiz-practice";
import { detectActiveTracks, createReviewItem, calculateNextReview } from "@/lib/daily-practice";
import type { QuizDrill } from "@/lib/quiz-drills";
import { cn } from "@/lib/utils";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("yaml", yaml);

interface QuizResult {
  quiz: QuizDrill;
  selectedAnswer: string;
  correct: boolean;
  usedHint: boolean;
}

type Phase = "ready" | "quiz" | "summary";

export default function QuizDrillSession() {
  const {
    completedQuizDrills,
    completedLessons,
    streakData,
    quizDrillReviewPool,
    completeQuizDrill,
    addToQuizReviewPool,
    updateQuizReviewItem,
    getQuizReviewsDue,
    recordQuizPracticeSession,
    isLoaded,
  } = useProgressContext();

  const { isDark } = useThemeContext();

  const [phase, setPhase] = useState<Phase>("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTracks = useMemo(
    () => detectActiveTracks(completedLessons),
    [completedLessons]
  );

  const reviewsDue = useMemo(() => getQuizReviewsDue(), [getQuizReviewsDue]);

  const exercises: DailyQuizExercise[] = useMemo(() => {
    if (!isLoaded) return [];
    return getDailyQuizExercises(
      activeTracks,
      completedQuizDrills,
      reviewsDue,
      completedLessons
    );
  }, [isLoaded, activeTracks, completedQuizDrills, reviewsDue, completedLessons]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const currentExercise = exercises[currentIndex];

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null) return; // Already answered
      if (!currentExercise) return;

      setSelectedAnswer(answer);
      const correct = answer === currentExercise.quiz.correctAnswer;
      const quiz = currentExercise.quiz;

      // Calculate quality for SM-2
      let quality: number;
      if (correct && !hintUsed) {
        quality = 5;
      } else if (correct && hintUsed) {
        quality = 4;
      } else {
        quality = 2;
      }

      // Mark complete
      completeQuizDrill(quiz.id);

      // Update review pool
      const existingReview = quizDrillReviewPool.find(
        (r) => r.challengeId === quiz.id
      );
      if (existingReview) {
        const updated = calculateNextReview(existingReview, quality);
        updateQuizReviewItem(quiz.id, updated);
      } else {
        const newItem = createReviewItem(quiz.id, quiz.trackId, quality);
        addToQuizReviewPool(newItem);
      }

      const result: QuizResult = {
        quiz,
        selectedAnswer: answer,
        correct,
        usedHint: hintUsed,
      };
      const newResults = [...results, result];
      setResults(newResults);

      // Auto-advance after 1.5s
      advanceTimerRef.current = setTimeout(() => {
        if (currentIndex < exercises.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowHint(false);
          setHintUsed(false);
        } else {
          // Session complete
          const allIds = newResults.map((r) => r.quiz.id);
          recordQuizPracticeSession(allIds);
          setPhase("summary");
        }
      }, 1500);
    },
    [
      selectedAnswer,
      currentExercise,
      hintUsed,
      results,
      currentIndex,
      exercises.length,
      completeQuizDrill,
      quizDrillReviewPool,
      updateQuizReviewItem,
      addToQuizReviewPool,
      recordQuizPracticeSession,
    ]
  );

  const handleNext = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setHintUsed(false);
    } else {
      const allIds = results.map((r) => r.quiz.id);
      recordQuizPracticeSession(allIds);
      setPhase("summary");
    }
  }, [currentIndex, exercises.length, results, recordQuizPracticeSession]);

  const handlePracticeAgain = () => {
    setPhase("ready");
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowHint(false);
    setHintUsed(false);
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  // Render highlighted code snippet
  const renderCodeSnippet = (code: string, isFillInBlank: boolean) => {
    let highlighted: string;
    try {
      const result = hljs.highlightAuto(code);
      highlighted = result.value;
    } catch {
      highlighted = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    // Highlight ____ blanks in fill-in-blank questions
    if (isFillInBlank) {
      highlighted = highlighted.replace(
        /____/g,
        '<span class="quiz-blank">____</span>'
      );
    }

    return (
      <div
        className={cn(
          "rounded-lg p-4 overflow-x-auto font-mono text-sm",
          isDark ? "bg-sand-950 border border-sand-800" : "bg-sand-50 border border-sand-200"
        )}
      >
        <pre className="whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
        <style jsx>{`
          :global(.quiz-blank) {
            background: ${isDark ? "rgba(224, 122, 95, 0.3)" : "rgba(224, 122, 95, 0.2)"};
            color: ${isDark ? "#e07a5f" : "#c55a3f"};
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
            border-bottom: 2px solid ${isDark ? "#e07a5f" : "#c55a3f"};
          }
        `}</style>
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div
          className={cn(
            "animate-spin w-8 h-8 border-2 rounded-full",
            isDark
              ? "border-sand-700 border-t-primary-500"
              : "border-sand-200 border-t-primary-500"
          )}
        />
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary-500"
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
        </div>
        <h2
          className={cn(
            "text-xl font-bold font-serif",
            isDark ? "text-sand-100" : "text-sand-900"
          )}
        >
          No quiz questions available
        </h2>
        <p
          className={cn(
            "text-sm max-w-md mx-auto",
            isDark ? "text-sand-400" : "text-sand-500"
          )}
        >
          Start some lessons first to unlock daily quiz drills.
        </p>
      </div>
    );
  }

  // Phase: Ready
  if (phase === "ready") {
    const reviewCount = exercises.filter((e) => e.type === "review").length;
    const newCount = exercises.filter((e) => e.type === "new").length;
    const stretchCount = exercises.filter((e) => e.type === "stretch").length;

    return (
      <div className="space-y-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className={cn(
              "text-2xl font-bold font-serif",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            Quick Quiz
          </h1>
          <StreakBadge streak={streakData.currentStreak} />
        </div>

        {/* Quiz Info */}
        <div
          className={cn(
            "p-6 rounded-xl text-center space-y-4",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-white border border-sand-200"
          )}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2
              className={cn(
                "text-lg font-bold font-serif",
                isDark ? "text-sand-100" : "text-sand-900"
              )}
            >
              {exercises.length} Questions Ready
            </h2>
            <p
              className={cn(
                "text-sm mt-1",
                isDark ? "text-sand-400" : "text-sand-500"
              )}
            >
              Multiple choice, fill-in-blank, and output prediction
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div
          className={cn(
            "grid grid-cols-3 gap-3",
            isDark ? "text-sand-400" : "text-sand-500"
          )}
        >
          {[
            { label: "Review", count: reviewCount },
            { label: "New", count: newCount },
            { label: "Stretch", count: stretchCount },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "text-center p-3 rounded-lg",
                isDark
                  ? "bg-sand-900 border border-sand-800"
                  : "bg-sand-50 border border-sand-200"
              )}
            >
              <p
                className={cn(
                  "text-lg font-bold",
                  isDark ? "text-sand-200" : "text-sand-700"
                )}
              >
                {item.count}
              </p>
              <p className="text-xs">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={() => setPhase("quiz")}
          className="w-full py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold text-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Phase: Quiz
  if (phase === "quiz" && currentExercise) {
    const quiz = currentExercise.quiz;
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === quiz.correctAnswer;

    const typeLabels: Record<string, string> = {
      "fill-in-blank": "Fill in Blank",
      "multiple-choice": "Multiple Choice",
      "output-prediction": "Output Prediction",
    };

    const exerciseTypeLabels: Record<string, string> = {
      review: "Review",
      new: "New",
      stretch: "Stretch",
    };

    const exerciseTypeColors: Record<string, string> = {
      review: "bg-blue-500/20 text-blue-400",
      new: "bg-primary-500/20 text-primary-400",
      stretch: "bg-amber-500/20 text-amber-400",
    };

    return (
      <div className="space-y-4 max-w-lg mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div
              className={cn(
                "h-2 rounded-full overflow-hidden",
                isDark ? "bg-sand-800" : "bg-sand-200"
              )}
            >
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / exercises.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <span
            className={cn(
              "text-sm font-medium whitespace-nowrap",
              isDark ? "text-sand-400" : "text-sand-500"
            )}
          >
            {currentIndex + 1} / {exercises.length}
          </span>
          <StreakBadge
            streak={streakData.currentStreak}
            size="sm"
            showLabel={false}
          />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              exerciseTypeColors[currentExercise.type]
            )}
          >
            {exerciseTypeLabels[currentExercise.type]}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isDark
                ? "bg-sand-800 text-sand-400"
                : "bg-sand-100 text-sand-500"
            )}
          >
            {quiz.category}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isDark
                ? "bg-sand-800 text-sand-400"
                : "bg-sand-100 text-sand-500"
            )}
          >
            {typeLabels[quiz.type]}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isDark
                ? "bg-sand-800 text-sand-400"
                : "bg-sand-100 text-sand-500"
            )}
          >
            {quiz.difficulty}
          </span>
        </div>

        {/* Question */}
        <div
          className={cn(
            "p-4 rounded-xl",
            isDark
              ? "bg-sand-900 border border-sand-800"
              : "bg-white border border-sand-200"
          )}
        >
          <p
            className={cn(
              "text-base font-medium leading-relaxed",
              isDark ? "text-sand-100" : "text-sand-900"
            )}
          >
            {quiz.question}
          </p>
        </div>

        {/* Code Snippet */}
        {quiz.codeSnippet && renderCodeSnippet(quiz.codeSnippet, quiz.type === "fill-in-blank")}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quiz.options.map((option) => {
            let optionClasses: string;

            if (!isAnswered) {
              optionClasses = cn(
                "p-4 rounded-xl border text-left transition-all cursor-pointer hover:-translate-y-0.5",
                isDark
                  ? "bg-sand-900 border-sand-800 hover:border-sand-600"
                  : "bg-white border-sand-200 hover:border-sand-400"
              );
            } else if (option.label === quiz.correctAnswer) {
              optionClasses = cn(
                "p-4 rounded-xl border text-left",
                isDark
                  ? "bg-green-500/10 border-green-500/50"
                  : "bg-green-50 border-green-300"
              );
            } else if (
              option.label === selectedAnswer &&
              !isCorrect
            ) {
              optionClasses = cn(
                "p-4 rounded-xl border text-left",
                isDark
                  ? "bg-coral-500/10 border-coral-500/50"
                  : "bg-red-50 border-red-300"
              );
            } else {
              optionClasses = cn(
                "p-4 rounded-xl border text-left opacity-50",
                isDark
                  ? "bg-sand-900 border-sand-800"
                  : "bg-white border-sand-200"
              );
            }

            return (
              <button
                key={option.label}
                onClick={() => handleAnswer(option.label)}
                disabled={isAnswered}
                className={optionClasses}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      isAnswered && option.label === quiz.correctAnswer
                        ? "bg-green-500 text-white"
                        : isAnswered &&
                            option.label === selectedAnswer &&
                            !isCorrect
                          ? "bg-coral-500 text-white"
                          : isDark
                            ? "bg-sand-800 text-sand-300"
                            : "bg-sand-100 text-sand-600"
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      isDark ? "text-sand-200" : "text-sand-800"
                    )}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint Button / Panel */}
        {!isAnswered && (
          <div>
            {!showHint ? (
              <button
                onClick={handleShowHint}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-lg transition-colors",
                  isDark
                    ? "text-sand-500 hover:text-sand-300 hover:bg-sand-800"
                    : "text-sand-400 hover:text-sand-600 hover:bg-sand-100"
                )}
              >
                Show Hint
              </button>
            ) : (
              <div
                className={cn(
                  "p-3 rounded-lg text-sm animate-[slide-down_0.2s_ease-out]",
                  isDark
                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                    : "bg-amber-50 border border-amber-200 text-amber-700"
                )}
              >
                <span className="font-medium">Hint: </span>
                {quiz.hint}
              </div>
            )}
          </div>
        )}

        {/* Explanation Panel (shown after answering) */}
        {isAnswered && (
          <div
            className={cn(
              "p-4 rounded-xl animate-[slide-up_0.3s_ease-out] space-y-3",
              isCorrect
                ? isDark
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-green-50 border border-green-200"
                : isDark
                  ? "bg-coral-500/10 border border-coral-500/30"
                  : "bg-red-50 border border-red-200"
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <svg
                  className="w-5 h-5 text-green-500"
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
              ) : (
                <svg
                  className={cn("w-5 h-5", isDark ? "text-coral-400" : "text-red-500")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span
                className={cn(
                  "font-semibold text-sm",
                  isCorrect
                    ? "text-green-500"
                    : isDark
                      ? "text-coral-400"
                      : "text-red-600"
                )}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <p
              className={cn(
                "text-sm",
                isDark ? "text-sand-300" : "text-sand-700"
              )}
            >
              {quiz.explanation}
            </p>
            <button
              onClick={handleNext}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg transition-colors font-medium",
                isDark
                  ? "bg-sand-800 text-sand-300 hover:bg-sand-700"
                  : "bg-sand-100 text-sand-600 hover:bg-sand-200"
              )}
            >
              {currentIndex < exercises.length - 1
                ? "Next Question"
                : "See Results"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Phase: Summary
  return (
    <QuizSessionSummary
      exercises={exercises}
      results={results}
      streak={streakData.currentStreak}
      isDark={isDark}
      onPracticeAgain={handlePracticeAgain}
    />
  );
}
