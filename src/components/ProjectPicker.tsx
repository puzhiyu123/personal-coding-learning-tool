"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
  files: { id: string; name: string; language: string }[];
}

interface ProjectPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (projectId: string) => void;
  onNew: () => void;
  currentProjectId?: string;
}

export default function ProjectPicker({
  isOpen,
  onClose,
  onSelect,
  onNew,
  currentProjectId,
}: ProjectPickerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load projects when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);

      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProjects(data);
          } else {
            setError("Failed to load projects");
          }
        })
        .catch(() => setError("Failed to load projects"))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-sand-900 rounded-xl shadow-xl w-full max-w-md mx-4 border border-sand-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand-800">
          <h2 className="text-lg font-semibold text-sand-100">Projects</h2>
          <button
            onClick={onClose}
            className="text-sand-400 hover:text-sand-100 text-xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* New Project Button */}
          <button
            onClick={() => {
              onNew();
              onClose();
            }}
            className="w-full mb-4 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            + New Project
          </button>

          {/* Projects List */}
          {isLoading ? (
            <div className="text-center py-8 text-sand-400">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-coral-400">{error}</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-sand-400">
              No projects yet. Create your first one!
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelect(project.id);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    project.id === currentProjectId
                      ? "bg-teal-600/20 text-teal-300 border border-teal-600/30"
                      : "bg-sand-800 text-sand-200 hover:bg-sand-700 border border-sand-700"
                  }`}
                >
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-sand-400 mt-1">
                    {project.files.length} file
                    {project.files.length !== 1 ? "s" : ""} &middot; Updated{" "}
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
