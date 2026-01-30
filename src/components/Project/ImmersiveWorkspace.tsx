"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useWebContainer } from "@/hooks/useWebContainer";
import { useProgressContext } from "../ProgressProvider";
import type { ImmersiveProject, ImmersiveProjectFile } from "@/lib/immersive-projects";
import EditorLayout from "../layouts/EditorLayout";
import CodeEditor from "../CodeEditor";
import LivePreview from "./LivePreview";
import TaskPanel from "./TaskPanel";
import ImmersiveFileTree from "./ImmersiveFileTree";
import { cn } from "@/lib/utils";
import type { ValidationResult } from "./TaskPanel";

type SetupPhase = "booting" | "writing" | "installing" | "starting" | "ready" | "error";

interface ImmersiveWorkspaceProps {
  project: ImmersiveProject;
}

export default function ImmersiveWorkspace({ project }: ImmersiveWorkspaceProps) {
  const {
    status,
    error: containerError,
    writeFiles,
    installDependencies,
    startDevServer,
  } = useWebContainer();

  const { completeProject } = useProgressContext();

  // Setup state
  const [setupPhase, setSetupPhase] = useState<SetupPhase>("booting");
  const [setupError, setSetupError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Editor state
  const [fileContents, setFileContents] = useState<Record<string, string>>(() => {
    const contents: Record<string, string> = {};
    for (const file of project.files) {
      contents[file.path] = file.content;
    }
    return contents;
  });
  const [activeFile, setActiveFile] = useState<string | null>(
    project.files.find((f) => !f.readOnly)?.path || project.files[0]?.path || null
  );
  const [openTabs, setOpenTabs] = useState<string[]>(() => {
    // Open the first non-readOnly file by default
    const editable = project.files.find((f) => !f.readOnly);
    return editable ? [editable.path] : [];
  });

  // Task state
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Debounce ref for writing files back to WebContainer
  const writeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setupRanRef = useRef(false);

  // Get language for a file path
  const getFileLanguage = useCallback(
    (path: string): string => {
      const file = project.files.find((f) => f.path === path);
      if (file) return file.language;
      if (path.endsWith(".jsx") || path.endsWith(".js")) return "javascript";
      if (path.endsWith(".tsx") || path.endsWith(".ts")) return "typescript";
      if (path.endsWith(".css")) return "css";
      if (path.endsWith(".html")) return "html";
      if (path.endsWith(".json")) return "json";
      return "plaintext";
    },
    [project.files]
  );

  // Check if file is read-only
  const isFileReadOnly = useCallback(
    (path: string): boolean => {
      const file = project.files.find((f) => f.path === path);
      return file?.readOnly ?? false;
    },
    [project.files]
  );

  // Append console output
  const appendConsole = useCallback((data: string) => {
    setConsoleOutput((prev) => [...prev, data]);
  }, []);

  // Setup lifecycle: boot → write files → install → start dev server
  useEffect(() => {
    if (status !== "ready" || setupRanRef.current) return;
    setupRanRef.current = true;

    const setup = async () => {
      try {
        // Phase 1: Write files
        setSetupPhase("writing");
        appendConsole("Writing project files...\n");

        const filesToWrite: Record<string, string> = {};
        for (const file of project.files) {
          filesToWrite[file.path] = file.content;
        }
        await writeFiles(filesToWrite);
        appendConsole("Files written successfully.\n");

        // Phase 2: Install dependencies
        setSetupPhase("installing");
        appendConsole("\nRunning npm install...\n");

        const exitCode = await installDependencies((data) => {
          appendConsole(data);
        });

        if (exitCode !== 0) {
          throw new Error(`npm install failed with exit code ${exitCode}`);
        }
        appendConsole("\nDependencies installed.\n");

        // Phase 3: Start dev server
        setSetupPhase("starting");
        appendConsole("\nStarting dev server...\n");

        const url = await startDevServer((data) => {
          appendConsole(data);
        });

        setPreviewUrl(url);
        setSetupPhase("ready");
        appendConsole(`\nDev server ready at ${url}\n`);
      } catch (err) {
        setSetupPhase("error");
        const msg = err instanceof Error ? err.message : "Setup failed";
        setSetupError(msg);
        appendConsole(`\nError: ${msg}\n`);
      }
    };

    setup();
  }, [status, project.files, writeFiles, installDependencies, startDevServer, appendConsole]);

  // Handle container boot error
  useEffect(() => {
    if (status === "error") {
      setSetupPhase("error");
      setSetupError(containerError || "Failed to boot WebContainer");
    }
  }, [status, containerError]);

  // Open file in editor
  const handleFileSelect = useCallback(
    (path: string) => {
      setActiveFile(path);
      if (!openTabs.includes(path)) {
        setOpenTabs((tabs) => [...tabs, path]);
      }
    },
    [openTabs]
  );

  // Close tab
  const handleCloseTab = useCallback(
    (path: string) => {
      setOpenTabs((tabs) => {
        const newTabs = tabs.filter((t) => t !== path);
        if (activeFile === path) {
          setActiveFile(newTabs[newTabs.length - 1] || null);
        }
        return newTabs;
      });
    },
    [activeFile]
  );

  // Handle editor change with debounced write to WebContainer
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (!activeFile || value === undefined) return;

      // Update local state immediately
      setFileContents((prev) => ({ ...prev, [activeFile]: value }));

      // Debounce writing to WebContainer FS
      if (writeTimeoutRef.current) {
        clearTimeout(writeTimeoutRef.current);
      }
      writeTimeoutRef.current = setTimeout(async () => {
        try {
          await writeFiles({ [activeFile]: value });
        } catch {
          // Silently fail — file will be written on next save
        }
      }, 300);
    },
    [activeFile, writeFiles]
  );

  // Validate current task
  const handleCheckWork = useCallback((): ValidationResult[] => {
    const task = project.tasks[currentTaskIndex];
    if (!task) return [];

    const results: ValidationResult[] = task.validation.map((v) => {
      const targetContent = v.targetFile ? fileContents[v.targetFile] : "";
      let passed = false;

      if (v.type === "file-content" && targetContent) {
        try {
          const regex = new RegExp(v.pattern);
          passed = regex.test(targetContent);
        } catch {
          passed = false;
        }
      } else if (v.type === "file-exists" && v.targetFile) {
        passed = v.targetFile in fileContents;
      }

      return { validation: v, passed };
    });

    // If all pass, mark task complete
    if (results.every((r) => r.passed)) {
      setCompletedTasks((prev) => {
        const next = new Set(prev);
        next.add(task.id);

        // Check if all tasks complete → mark project complete
        if (project.tasks.every((t) => next.has(t.id))) {
          completeProject(project.id);
        }

        return next;
      });
    }

    return results;
  }, [currentTaskIndex, project, fileContents, completeProject]);

  // Advance to next task
  const handleNextTask = useCallback(() => {
    if (currentTaskIndex < project.tasks.length - 1) {
      const nextIndex = currentTaskIndex + 1;
      setCurrentTaskIndex(nextIndex);

      // Open target files for new task
      const nextTask = project.tasks[nextIndex];
      if (nextTask?.targetFiles.length > 0) {
        const firstTarget = nextTask.targetFiles[0];
        handleFileSelect(firstTarget);
      }
    }
  }, [currentTaskIndex, project.tasks, handleFileSelect]);

  // Get target files for current task
  const currentTargetFiles = project.tasks[currentTaskIndex]?.targetFiles || [];

  // Get filename from path for tabs
  const getFileName = (path: string) => path.split("/").pop() || path;

  // Sidebar: task panel + file tree
  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <TaskPanel
          tasks={project.tasks}
          currentTaskIndex={currentTaskIndex}
          completedTasks={completedTasks}
          onCheckWork={handleCheckWork}
          onNextTask={handleNextTask}
          onSelectTask={setCurrentTaskIndex}
        />
      </div>
      <div className="border-t border-sand-800 overflow-y-auto scrollbar-hide max-h-64">
        <ImmersiveFileTree
          files={project.files}
          activeFile={activeFile}
          targetFiles={currentTargetFiles}
          onFileSelect={handleFileSelect}
        />
      </div>
    </div>
  );

  // Editor with tab bar
  const editorArea = (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex bg-sand-900 border-b border-sand-800 overflow-x-auto scrollbar-hide">
        {openTabs.map((tab) => (
          <div
            key={tab}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm border-r border-sand-800 cursor-pointer min-w-0 shrink-0",
              tab === activeFile
                ? "bg-sand-950 text-sand-200"
                : "text-sand-500 hover:text-sand-300 hover:bg-sand-800/50"
            )}
            onClick={() => setActiveFile(tab)}
          >
            <span className="truncate text-xs">{getFileName(tab)}</span>
            {isFileReadOnly(tab) && (
              <svg className="w-3 h-3 text-sand-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(tab);
              }}
              className="text-sand-600 hover:text-sand-300 flex-shrink-0"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0">
        {activeFile ? (
          <CodeEditor
            value={fileContents[activeFile] || ""}
            language={getFileLanguage(activeFile)}
            onChange={isFileReadOnly(activeFile) ? undefined : handleEditorChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sand-500 text-sm">
            Select a file from the tree to start editing
          </div>
        )}
      </div>
    </div>
  );

  // Console output
  const consolePanel = (
    <div className="p-3 font-mono text-xs text-sand-400 whitespace-pre-wrap">
      {consoleOutput.length === 0 ? (
        <span className="text-sand-600">Console output will appear here...</span>
      ) : (
        consoleOutput.map((line, i) => <span key={i}>{line}</span>)
      )}
    </div>
  );

  // Live preview
  const preview = (
    <LivePreview
      url={previewUrl}
      setupPhase={setupPhase}
      error={setupError}
    />
  );

  // Status bar
  const statusBar = (
    <>
      <span>{project.id}</span>
      <span>{activeFile || "No file selected"}</span>
      <span>{activeFile ? getFileLanguage(activeFile) : ""}</span>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-sand-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sand-900 border-b border-sand-800">
        <div className="flex items-center gap-3">
          <a
            href={`/projects/${project.id}`}
            className="text-sand-500 hover:text-sand-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 className="text-sm font-semibold text-sand-200">{project.title}</h1>
          <span className="text-xs text-sand-500">|</span>
          <span className="text-xs text-sand-400">{project.companyName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-sand-500">
          <span>
            {completedTasks.size}/{project.tasks.length} tasks
          </span>
          {setupPhase === "ready" && (
            <span className="flex items-center gap-1 text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 min-h-0">
        <EditorLayout
          sidebar={sidebar}
          editor={editorArea}
          output={consolePanel}
          preview={preview}
          statusBar={statusBar}
        />
      </div>
    </div>
  );
}
