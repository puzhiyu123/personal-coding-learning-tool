import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ProjectGallery } from "@/components/Project";

export const metadata = {
  title: "Projects | CodeForge",
  description: "Real-world coding projects at simulated companies of different sizes",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-sand-500">
            <li>
              <Link href="/" className="hover:text-sand-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-sand-300">Projects</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-sand-100 font-serif mb-3">
            Real-World Projects
          </h1>
          <p className="text-sand-400 text-lg max-w-2xl">
            Apply your skills in simulated work environments. From small startups to Big-5
            companies, experience what real engineering work feels like.
          </p>
        </div>

        <ProjectGallery />
      </main>
      <Footer />
    </div>
  );
}
