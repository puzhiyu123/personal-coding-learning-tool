"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/lessons";
import { useProgressContext } from "./ProgressProvider";
import LessonViewer from "./LessonViewer";
import ChallengeEditor from "./ChallengeEditor";
import CodeBlock from "./CodeBlock";

interface LessonContentProps {
  lesson: Lesson;
  nextLesson?: Lesson;
  previousLesson?: Lesson;
}

export default function LessonContent({
  lesson,
  nextLesson,
  previousLesson,
}: LessonContentProps) {
  const {
    visitLesson,
    completeLesson,
    completeChallenge,
    isLessonComplete,
    isChallengeComplete,
    isLoaded,
  } = useProgressContext();

  // Track lesson visit
  useEffect(() => {
    if (isLoaded) {
      visitLesson(lesson.slug);
    }
  }, [lesson.slug, visitLesson, isLoaded]);

  // Handle challenge completion
  const handleChallengeComplete = () => {
    if (lesson.challenge) {
      completeChallenge(lesson.challenge.id);
      completeLesson(lesson.slug);
    }
  };

  // Handle manual lesson completion
  const handleMarkComplete = () => {
    completeLesson(lesson.slug);
  };

  const lessonCompleted = isLoaded && isLessonComplete(lesson.slug);
  const challengeCompleted =
    isLoaded && lesson.challenge && isChallengeComplete(lesson.challenge.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-teal-400 bg-teal-500/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20";
      case "advanced":
        return "text-coral-400 bg-coral-500/20";
      default:
        return "text-sand-400 bg-sand-500/20";
    }
  };

  return (
    <>
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sand-500 text-sm">Lesson {lesson.order}</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(
              lesson.difficulty
            )}`}
          >
            {lesson.difficulty}
          </span>
          <span className="text-sand-500 text-sm flex items-center gap-1">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {lesson.estimatedMinutes} min
          </span>
          {lessonCompleted && (
            <span className="flex items-center gap-1 text-teal-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-sand-100">{lesson.title}</h1>
        <p className="text-sand-400 mt-2">{lesson.description}</p>
      </div>

      {/* Lesson Content */}
      <div className="mb-12">
        <LessonViewer lesson={lesson} />
      </div>

      {/* Code Examples */}
      {lesson.codeExamples.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-sand-100 mb-4">
            Code Examples
          </h2>
          <div className="space-y-6">
            {lesson.codeExamples.map((example, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-sand-200 mb-2">
                  {example.title}
                </h3>
                <CodeBlock code={example.code} language={example.language} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge */}
      {lesson.challenge && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold text-sand-100">
              <span className="text-coral-400">Challenge</span>
            </h2>
            {challengeCompleted && (
              <span className="flex items-center gap-1 px-2 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Completed
              </span>
            )}
          </div>
          <ChallengeEditor
            challenge={lesson.challenge}
            onComplete={handleChallengeComplete}
          />
        </div>
      )}

      {/* Mark Complete Button (for lessons without challenges) */}
      {!lesson.challenge && !lessonCompleted && (
        <div className="mb-12">
          <button
            onClick={handleMarkComplete}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            Mark Lesson as Complete
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-sand-800">
        {previousLesson ? (
          <Link
            href={`/lessons/${previousLesson.slug}`}
            className="flex items-center gap-2 text-sand-400 hover:text-teal-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="text-left">
              <p className="text-xs text-sand-500">Previous</p>
              <p className="font-medium">{previousLesson.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className="flex items-center gap-2 text-sand-400 hover:text-teal-400 transition-colors"
          >
            <div className="text-right">
              <p className="text-xs text-sand-500">Next</p>
              <p className="font-medium">{nextLesson.title}</p>
            </div>
            <svg
              className="w-5 h-5"
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
        ) : (
          <Link
            href="/lessons"
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Back to Lessons
            <svg
              className="w-5 h-5"
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
          </Link>
        )}
      </div>
    </>
  );
}
