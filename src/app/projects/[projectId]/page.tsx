import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { projects, getProjectById } from "@/lib/projects";
import {
  immersiveProjects,
  getImmersiveProjectById,
} from "@/lib/immersive-projects";
import { ProjectContainer } from "@/components/Project";
import ImmersiveBriefing from "@/components/Project/ImmersiveBriefing";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({
      projectId: project.id,
    })),
    ...immersiveProjects.map((project) => ({
      projectId: project.id,
    })),
  ];
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  const immersiveProject = getImmersiveProjectById(projectId);

  const found = project || immersiveProject;

  if (!found) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${found.title} | ${found.companyName} | CodeForge`,
    description: found.scenario,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  const immersiveProject = getImmersiveProjectById(projectId);

  if (!project && !immersiveProject) {
    notFound();
  }

  const found = (project || immersiveProject)!;

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
            <li>
              <Link href="/projects" className="hover:text-sand-300 transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-sand-300">{found.title}</li>
          </ol>
        </nav>

        {immersiveProject ? (
          <ImmersiveBriefing project={immersiveProject} />
        ) : (
          <ProjectContainer project={project!} />
        )}
      </main>
      <Footer />
    </div>
  );
}
