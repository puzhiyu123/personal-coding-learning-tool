"use client";

import Header from "@/components/Header";
import { GuidedBuildGallery } from "@/components/GuidedBuild";

export default function BuildsPage() {
  return (
    <div className="min-h-screen bg-sand-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <GuidedBuildGallery />
      </main>
    </div>
  );
}
