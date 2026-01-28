import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { tracks } from "@/lib/lessons";
import { cn } from "@/lib/utils";

const trackColorClasses = {
  primary: {
    bg: "bg-primary-500/10 hover:bg-primary-500/20",
    border: "border-primary-500/30 hover:border-primary-500/50",
    icon: "bg-primary-500 text-white",
    text: "text-primary-400",
  },
  accent: {
    bg: "bg-accent-500/10 hover:bg-accent-500/20",
    border: "border-accent-500/30 hover:border-accent-500/50",
    icon: "bg-accent-500 text-white",
    text: "text-accent-400",
  },
  blue: {
    bg: "bg-blue-500/10 hover:bg-blue-500/20",
    border: "border-blue-500/30 hover:border-blue-500/50",
    icon: "bg-blue-500 text-white",
    text: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10 hover:bg-purple-500/20",
    border: "border-purple-500/30 hover:border-purple-500/50",
    icon: "bg-purple-500 text-white",
    text: "text-purple-400",
  },
  orange: {
    bg: "bg-orange-500/10 hover:bg-orange-500/20",
    border: "border-orange-500/30 hover:border-orange-500/50",
    icon: "bg-orange-500 text-white",
    text: "text-orange-400",
  },
  green: {
    bg: "bg-green-500/10 hover:bg-green-500/20",
    border: "border-green-500/30 hover:border-green-500/50",
    icon: "bg-green-500 text-white",
    text: "text-green-400",
  },
};

export default function LessonsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-sand-100 mb-4 font-serif">
            Learning <span className="text-primary-400">Tracks</span>
          </h1>
          <p className="text-sand-400 text-lg max-w-2xl mx-auto">
            Choose a technology to master. Each track contains structured lessons
            from fundamentals to advanced topics with hands-on challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const colors = trackColorClasses[track.color];
            const lessonCount = track.lessons.length;
            const totalMinutes = track.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);
            const hours = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;

            return (
              <Link
                key={track.id}
                href={`/lessons/${track.slug}`}
                className={cn(
                  "group rounded-xl border p-6 transition-all duration-200 card-hover",
                  colors.bg,
                  colors.border
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                      colors.icon
                    )}
                  >
                    {track.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={cn("text-xl font-semibold mb-1", colors.text)}>
                      {track.name}
                    </h2>
                    <p className="text-sand-400 text-sm mb-4 line-clamp-2">
                      {track.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-sand-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {lessonCount} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-sand-600 group-hover:text-sand-400 group-hover:translate-x-1 transition-all shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats summary */}
        <div className="mt-12 p-6 rounded-xl bg-sand-900 border border-sand-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-400">{tracks.length}</p>
              <p className="text-sm text-sand-500">Tracks</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sand-100">
                {tracks.reduce((acc, t) => acc + t.lessons.length, 0)}
              </p>
              <p className="text-sm text-sand-500">Total Lessons</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sand-100">
                {Math.floor(tracks.reduce((acc, t) => acc + t.lessons.reduce((a, l) => a + l.estimatedMinutes, 0), 0) / 60)}h
              </p>
              <p className="text-sm text-sand-500">Content</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent-400">
                {tracks.reduce((acc, t) => acc + t.lessons.filter(l => l.challenge).length, 0)}
              </p>
              <p className="text-sm text-sand-500">Challenges</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
