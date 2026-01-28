import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  tracks,
  getTrackBySlug,
  getLessonBySlugInTrack,
  getNextLessonInTrack,
  getPreviousLessonInTrack,
} from "@/lib/lessons";
import TrackLessonContent from "@/components/TrackLessonContent";

interface LessonPageProps {
  params: Promise<{ track: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { track: string; slug: string }[] = [];

  for (const track of tracks) {
    for (const lesson of track.lessons) {
      params.push({
        track: track.slug,
        slug: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { track: trackSlug, slug } = await params;
  const lesson = getLessonBySlugInTrack(trackSlug, slug);
  const track = getTrackBySlug(trackSlug);

  if (!lesson || !track) {
    return { title: "Lesson Not Found" };
  }

  return {
    title: `${lesson.title} | ${track.name} | CodeForge`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { track: trackSlug, slug } = await params;
  const track = getTrackBySlug(trackSlug);
  const lesson = getLessonBySlugInTrack(trackSlug, slug);

  if (!track || !lesson) {
    notFound();
  }

  const nextLesson = getNextLessonInTrack(trackSlug, slug);
  const previousLesson = getPreviousLessonInTrack(trackSlug, slug);

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-sand-500">
            <li>
              <Link href="/lessons" className="hover:text-sand-300 transition-colors">
                Tracks
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href={`/lessons/${track.slug}`} className="hover:text-sand-300 transition-colors">
                {track.name}
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-sand-300">{lesson.title}</li>
          </ol>
        </nav>

        <TrackLessonContent
          track={track}
          lesson={lesson}
          nextLesson={nextLesson}
          previousLesson={previousLesson}
        />
      </main>
      <Footer />
    </div>
  );
}
