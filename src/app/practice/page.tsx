import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DailyPractice from "@/components/DailyPractice";

export default function PracticePage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <DailyPractice />
      </main>
      <Footer />
    </div>
  );
}
