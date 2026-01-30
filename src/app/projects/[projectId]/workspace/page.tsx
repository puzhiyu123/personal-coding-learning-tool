"use client";

import { use } from "react";
import { getImmersiveProjectById } from "@/lib/immersive-projects";
import ImmersiveWorkspace from "@/components/Project/ImmersiveWorkspace";
import { ProgressProvider } from "@/components/ProgressProvider";

interface WorkspacePageProps {
  params: Promise<{ projectId: string }>;
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const { projectId } = use(params);
  const project = getImmersiveProjectById(projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-sand-950">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-sand-100 font-serif">
            Project Not Found
          </h1>
          <p className="text-sand-400">
            The workspace project you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/projects"
            className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <ProgressProvider>
      <ImmersiveWorkspace project={project} />
    </ProgressProvider>
  );
}
