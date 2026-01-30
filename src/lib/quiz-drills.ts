import { javascriptQuizDrills } from "./quiz-drills-javascript";
import { typescriptQuizDrills } from "./quiz-drills-typescript";
import { nodejsQuizDrills } from "./quiz-drills-nodejs";
import { nextjsQuizDrills } from "./quiz-drills-nextjs";
import { awsQuizDrills } from "./quiz-drills-aws";
import { gcpQuizDrills } from "./quiz-drills-gcp";

export type QuizQuestionType =
  | "fill-in-blank"
  | "multiple-choice"
  | "output-prediction";

export interface QuizDrill {
  id: string;
  trackId: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  type: QuizQuestionType;
  question: string;
  codeSnippet?: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  tags: string[];
}

export const allQuizDrills: QuizDrill[] = [
  ...javascriptQuizDrills,
  ...typescriptQuizDrills,
  ...nodejsQuizDrills,
  ...nextjsQuizDrills,
  ...awsQuizDrills,
  ...gcpQuizDrills,
];

export function getQuizDrillsByTrack(trackId: string): QuizDrill[] {
  return allQuizDrills.filter((d) => d.trackId === trackId);
}

export function getQuizDrillById(id: string): QuizDrill | undefined {
  return allQuizDrills.find((d) => d.id === id);
}
