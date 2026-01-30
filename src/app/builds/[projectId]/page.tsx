"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getGuidedBuildById } from "@/lib/guided-builds";
import { useProgressContext } from "@/components/ProgressProvider";
import Header from "@/components/Header";
import {
  GuidedBuildBriefing,
  GuidedBuildWorkspace,
} from "@/components/GuidedBuild";

export default function GuidedBuildPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const project = getGuidedBuildById(projectId);
  const { getGuidedBuildSave } = useProgressContext();
  const [showWorkspace, setShowWorkspace] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-sand-950">
        <Header />
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-sand-100 font-serif">
              Project Not Found
            </h1>
            <p className="text-sand-400 mt-2">
              The guided build you&apos;re looking for doesn&apos;t exist.
            </p>
            <a
              href="/builds"
              className="inline-block mt-4 text-primary-400 hover:text-primary-300 transition-colors"
            >
              ← Back to Builds
            </a>
          </div>
        </main>
      </div>
    );
  }

  if (showWorkspace) {
    return <GuidedBuildWorkspace project={project} />;
  }

  const savedState = getGuidedBuildSave(projectId);

  return (
    <div className="min-h-screen bg-sand-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-sand-500">
            <li>
              <a
                href="/builds"
                className="hover:text-sand-300 transition-colors"
              >
                Builds
              </a>
            </li>
            <li>
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-sand-300">{project.title}</li>
          </ol>
        </nav>

        <GuidedBuildBriefing
          project={project}
          savedState={savedState}
          onStart={() => setShowWorkspace(true)}
        />
      </main>
    </div>
  );
}
