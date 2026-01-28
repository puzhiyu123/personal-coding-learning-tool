// Quiz question types
export type QuizQuestionType = "multiple-choice" | "code-output" | "fill-blank" | "true-false";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  code?: string; // Code snippet for code-based questions
  options?: string[]; // For multiple-choice and true-false
  correctAnswer: string | string[]; // Single or multiple correct answers
  explanation: string;
  hint?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  trackSlug: string;
  afterLesson: string; // Lesson slug this quiz appears after
  questions: QuizQuestion[];
}

// Import all track quizzes
import { javascriptQuizzes } from "./quizzes-javascript";

// All quizzes combined
export const quizzes: Quiz[] = [
  ...javascriptQuizzes,
];

// Get quiz by ID
export function getQuizById(quizId: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === quizId);
}

// Get quizzes for a specific track
export function getQuizzesByTrack(trackSlug: string): Quiz[] {
  return quizzes.filter((quiz) => quiz.trackSlug === trackSlug);
}

// Get quiz that appears after a specific lesson
export function getQuizAfterLesson(trackSlug: string, lessonSlug: string): Quiz | undefined {
  return quizzes.find(
    (quiz) => quiz.trackSlug === trackSlug && quiz.afterLesson === lessonSlug
  );
}

// Check if a lesson has a quiz after it
export function hasQuizAfterLesson(trackSlug: string, lessonSlug: string): boolean {
  return quizzes.some(
    (quiz) => quiz.trackSlug === trackSlug && quiz.afterLesson === lessonSlug
  );
}
