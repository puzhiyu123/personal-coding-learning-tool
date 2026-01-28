import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getTrackBySlug, tracks } from "@/lib/lessons";
import { getQuizById, getQuizzesByTrack } from "@/lib/quizzes";
import { QuizContainer } from "@/components/Quiz";

interface QuizPageProps {
  params: Promise<{ track: string; quizId: string }>;
}

export function generateStaticParams() {
  const params: { track: string; quizId: string }[] = [];

  for (const track of tracks) {
    const trackQuizzes = getQuizzesByTrack(track.slug);
    for (const quiz of trackQuizzes) {
      params.push({
        track: track.slug,
        quizId: quiz.id,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { quizId } = await params;
  const quiz = getQuizById(quizId);

  if (!quiz) {
    return { title: "Quiz Not Found" };
  }

  return {
    title: `${quiz.title} | CodeForge`,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { track: trackSlug, quizId } = await params;
  const track = getTrackBySlug(trackSlug);
  const quiz = getQuizById(quizId);

  if (!track || !quiz || quiz.trackSlug !== trackSlug) {
    notFound();
  }

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
            <li className="text-sand-300">{quiz.title}</li>
          </ol>
        </nav>

        <QuizContainer quiz={quiz} trackName={track.name} />
      </main>
      <Footer />
    </div>
  );
}
