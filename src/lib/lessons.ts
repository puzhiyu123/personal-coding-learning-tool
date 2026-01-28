export interface CodeChallenge {
  id?: string;
  title?: string;
  description?: string;
  starterCode: string;
  solution: string;
  tests: {
    name?: string;
    input?: string;
    expected?: string;
    description?: string;
    test?: string;
  }[];
  hints: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  content: string;
  codeExamples: {
    title: string;
    code: string;
    language?: string;
    explanation?: string;
  }[];
  challenge?: CodeChallenge;
}

// Import all track lessons
import { allJavascriptLessons } from "./lessons-javascript";
import { allTypescriptLessons } from "./lessons-typescript";
import { allNodejsLessons } from "./lessons-nodejs";
import { allNextjsLessons } from "./lessons-nextjs";
import { allAwsLessons } from "./lessons-aws";
import { allGcpLessons } from "./lessons-gcp";

// Track definitions
export interface Track {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: "primary" | "accent" | "blue" | "purple" | "orange" | "green";
  lessons: Lesson[];
}

export const tracks: Track[] = [
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "Master the fundamentals of JavaScript, from basics to advanced patterns",
    icon: "JS",
    color: "primary",
    lessons: allJavascriptLessons,
  },
  {
    id: "typescript",
    name: "TypeScript",
    slug: "typescript",
    description: "Add type safety to your JavaScript with TypeScript",
    icon: "TS",
    color: "blue",
    lessons: allTypescriptLessons,
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "nodejs",
    description: "Build server-side applications with Node.js and Express",
    icon: "Node",
    color: "green",
    lessons: allNodejsLessons,
  },
  {
    id: "nextjs",
    name: "Next.js",
    slug: "nextjs",
    description: "Create full-stack React applications with Next.js",
    icon: "Next",
    color: "purple",
    lessons: allNextjsLessons,
  },
  {
    id: "aws",
    name: "AWS",
    slug: "aws",
    description: "Deploy and scale applications on Amazon Web Services",
    icon: "AWS",
    color: "orange",
    lessons: allAwsLessons,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    slug: "gcp",
    description: "Build on Google Cloud Platform infrastructure",
    icon: "GCP",
    color: "accent",
    lessons: allGcpLessons,
  },
];

// All lessons combined (for backward compatibility)
export const lessons: Lesson[] = tracks.flatMap((track) => track.lessons);

// Get track by slug
export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((track) => track.slug === slug);
}

// Get all lessons for a specific track
export function getLessonsByTrack(trackSlug: string): Lesson[] {
  const track = getTrackBySlug(trackSlug);
  return track?.lessons || [];
}

// Get lesson by slug (searches all tracks)
export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

// Get lesson by slug within a specific track
export function getLessonBySlugInTrack(trackSlug: string, lessonSlug: string): Lesson | undefined {
  const track = getTrackBySlug(trackSlug);
  return track?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

// Get categories within a track
export function getCategoriesByTrack(trackSlug: string): Map<string, Lesson[]> {
  const trackLessons = getLessonsByTrack(trackSlug);
  const categories = new Map<string, Lesson[]>();

  for (const lesson of trackLessons) {
    const existing = categories.get(lesson.category) || [];
    categories.set(lesson.category, [...existing, lesson]);
  }

  for (const [category, categoryLessons] of categories) {
    categories.set(category, categoryLessons.sort((a, b) => a.order - b.order));
  }

  return categories;
}

// Legacy function for backward compatibility
export function getLessonsByCategory(): Map<string, Lesson[]> {
  const categories = new Map<string, Lesson[]>();
  for (const lesson of lessons) {
    const existing = categories.get(lesson.category) || [];
    categories.set(lesson.category, [...existing, lesson]);
  }
  for (const [category, categoryLessons] of categories) {
    categories.set(category, categoryLessons.sort((a, b) => a.order - b.order));
  }
  return categories;
}

// Get next lesson within the same track
export function getNextLessonInTrack(trackSlug: string, currentSlug: string): Lesson | undefined {
  const trackLessons = getLessonsByTrack(trackSlug);
  const currentIndex = trackLessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === trackLessons.length - 1) return undefined;
  return trackLessons[currentIndex + 1];
}

// Get previous lesson within the same track
export function getPreviousLessonInTrack(trackSlug: string, currentSlug: string): Lesson | undefined {
  const trackLessons = getLessonsByTrack(trackSlug);
  const currentIndex = trackLessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex <= 0) return undefined;
  return trackLessons[currentIndex - 1];
}

// Legacy functions for backward compatibility
export function getNextLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) return undefined;
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex <= 0) return undefined;
  return lessons[currentIndex - 1];
}

// Find which track a lesson belongs to
export function getTrackForLesson(lessonSlug: string): Track | undefined {
  return tracks.find((track) =>
    track.lessons.some((lesson) => lesson.slug === lessonSlug)
  );
}
