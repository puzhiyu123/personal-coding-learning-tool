import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonContent from "@/components/LessonContent";
import {
  getLessonBySlug,
  getNextLesson,
  getPreviousLesson,
  lessons,
} from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const nextLesson = getNextLesson(slug);
  const previousLesson = getPreviousLesson(slug);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-sand-900 border-b border-sand-800">
          <div className="max-w-4xl mx-auto px-8 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/lessons"
                className="text-sand-400 hover:text-teal-400"
              >
                Lessons
              </Link>
              <span className="text-sand-600">/</span>
              <span className="text-sand-300">{lesson.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-8">
          <LessonContent
            lesson={lesson}
            nextLesson={nextLesson}
            previousLesson={previousLesson}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
