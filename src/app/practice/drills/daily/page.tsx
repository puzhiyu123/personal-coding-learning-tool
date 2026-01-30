"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizDrillSession from "@/components/QuizDrillSession";

export default function DailyQuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        <QuizDrillSession />
      </main>
      <Footer />
    </div>
  );
}
