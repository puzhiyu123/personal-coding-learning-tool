import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonsList from "@/components/LessonsList";
import { lessons, getLessonsByCategory } from "@/lib/lessons";

export default function LessonsPage() {
  const categories = getLessonsByCategory();

  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sand-100 mb-2">
            Learn <span className="text-teal-400">JavaScript</span>
          </h1>
          <p className="text-sand-400">
            Start from the basics and build your coding skills step by step.
            Each lesson includes interactive challenges.
          </p>
        </div>

        <LessonsList lessons={lessons} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
