"use client";

import { useState, useCallback } from "react";

interface FileData {
  id?: string;
  name: string;
  content: string;
  language: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  files: FileData[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export function useProject() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Save project (create or update)
  const saveProject = useCallback(
    async (name: string, files: FileData[], description?: string) => {
      setIsSaving(true);
      setError(null);

      try {
        const url = currentProject
          ? `/api/projects/${currentProject.id}`
          : "/api/projects";
        const method = currentProject ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, files }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to save project");
        }

        const project = await response.json();
        setCurrentProject(project);
        return project;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to save";
        setError(message);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [currentProject]
  );

  // Load a project by ID
  const loadProject = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${id}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to load project");
      }

      const project = await response.json();
      setCurrentProject(project);
      return project;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // List all projects
  const listProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects");

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to list projects");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to list";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a project
  const deleteProject = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project");
      }

      // Clear current project if it was deleted
      setCurrentProject((current) => (current?.id === id ? null : current));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new project (clear current)
  const newProject = useCallback(() => {
    setCurrentProject(null);
    setError(null);
  }, []);

  return {
    currentProject,
    isSaving,
    isLoading,
    error,
    saveProject,
    loadProject,
    listProjects,
    deleteProject,
    newProject,
    setCurrentProject,
  };
}
