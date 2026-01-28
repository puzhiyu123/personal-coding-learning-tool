import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-950">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sand-100 text-center">
          Welcome to <span className="text-teal-400">Code</span>
          <span className="text-coral-400">Forge</span>
        </h1>
        <p className="text-sand-400 text-center max-w-md text-lg">
          Learn to code by building real projects. Interactive lessons,
          a powerful editor, and AI-powered tutoring.
        </p>
        <div className="flex gap-4">
          <Link href="/editor">
            <Button variant="primary" size="lg">Get Started</Button>
          </Link>
          <Link href="/lessons">
            <Button variant="secondary" size="lg">View Lessons</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full">
          <Card title="Learn" variant="default" hover>
            <p>Step-by-step lessons designed for beginners.</p>
          </Card>
          <Card title="Code" variant="teal" hover>
            <p>Write and run code directly in your browser.</p>
          </Card>
          <Card title="Build" variant="coral" hover>
            <p>Create real projects to showcase your skills.</p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
