import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { tracks, getTrackBySlug, getCategoriesByTrack } from "@/lib/lessons";
import { cn } from "@/lib/utils";
import TrackLessonsList from "@/components/TrackLessonsList";

interface TrackPageProps {
  params: Promise<{ track: string }>;
}

export function generateStaticParams() {
  return tracks.map((track) => ({
    track: track.slug,
  }));
}

export async function generateMetadata({ params }: TrackPageProps) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    return { title: "Track Not Found" };
  }

  return {
    title: `${track.name} Lessons | CodeForge`,
    description: track.description,
  };
}

const trackColorClasses = {
  primary: {
    badge: "bg-primary-500/20 text-primary-400 border-primary-500/30",
    heading: "text-primary-400",
  },
  accent: {
    badge: "bg-accent-500/20 text-accent-400 border-accent-500/30",
    heading: "text-accent-400",
  },
  blue: {
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    heading: "text-blue-400",
  },
  purple: {
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    heading: "text-purple-400",
  },
  orange: {
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    heading: "text-orange-400",
  },
  green: {
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
    heading: "text-green-400",
  },
};

export default async function TrackPage({ params }: TrackPageProps) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  const categories = getCategoriesByTrack(trackSlug);
  const colors = trackColorClasses[track.color];

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
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
            <li className={colors.heading}>{track.name}</li>
          </ol>
        </nav>

        {/* Track Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={cn("px-3 py-1 text-xs font-medium rounded-full border", colors.badge)}>
              {track.lessons.length} lessons
            </span>
            <span className="text-sand-500 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor(track.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0) / 60)}h{" "}
              {track.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0) % 60}m total
            </span>
          </div>
          <h1 className="text-3xl font-bold text-sand-100 mb-2 font-serif">
            <span className={colors.heading}>{track.name}</span> Lessons
          </h1>
          <p className="text-sand-400">
            {track.description}
          </p>
        </div>

        <TrackLessonsList
          track={track}
          categories={categories}
        />
      </main>
      <Footer />
    </div>
  );
}
