"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Quiz, QuizQuestion as QuizQuestionType } from "@/lib/quizzes";
import { useProgressContext } from "../ProgressProvider";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizFeedback from "./QuizFeedback";
import QuizResults from "./QuizResults";

interface QuizContainerProps {
  quiz: Quiz;
  trackName: string;
}

interface AnswerRecord {
  question: QuizQuestionType;
  answer: string | string[];
  isCorrect: boolean;
}

export default function QuizContainer({ quiz, trackName }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { completeQuiz, isQuizComplete } = useProgressContext();
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = useCallback(
    (answer: string | string[], correct: boolean) => {
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setShowResult(true);
    },
    []
  );

  const handleContinue = useCallback(() => {
    // Record the answer
    const newAnswers = [
      ...answers,
      {
        question: currentQuestion,
        answer: selectedAnswer!,
        isCorrect,
      },
    ];
    setAnswers(newAnswers);

    // Check if we're at the last question
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setQuizCompleted(true);
      // Mark quiz as complete in progress
      completeQuiz(quiz.id);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setIsCorrect(false);
    }
  }, [
    answers,
    currentQuestion,
    selectedAnswer,
    isCorrect,
    currentQuestionIndex,
    quiz.questions.length,
    quiz.id,
    completeQuiz,
  ]);

  const handleRetry = useCallback(() => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setAnswers([]);
    setQuizCompleted(false);
  }, []);

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <QuizResults quiz={quiz} answers={answers} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/lessons/${quiz.trackSlug}`}
          className="inline-flex items-center gap-2 text-sand-400 hover:text-primary-400 transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {trackName}
        </Link>
        <h1 className="text-2xl font-bold text-sand-100 font-serif mb-2">{quiz.title}</h1>
        <p className="text-sand-400">{quiz.description}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <QuizProgress
          current={currentQuestionIndex + 1}
          total={quiz.questions.length}
        />
      </div>

      {/* Question Card */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 p-6">
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          showResult={showResult}
          selectedAnswer={selectedAnswer}
        />

        {/* Feedback */}
        {showResult && (
          <QuizFeedback
            question={currentQuestion}
            isCorrect={isCorrect}
            onContinue={handleContinue}
          />
        )}
      </div>

      {/* Hint */}
      {!showResult && currentQuestion.hint && (
        <div className="mt-4 p-4 bg-sand-900/50 border border-sand-800 rounded-lg">
          <details className="group">
            <summary className="flex items-center gap-2 text-sand-400 cursor-pointer hover:text-sand-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Need a hint?
            </summary>
            <p className="mt-2 text-sand-400 text-sm pl-6">{currentQuestion.hint}</p>
          </details>
        </div>
      )}
    </div>
  );
}
