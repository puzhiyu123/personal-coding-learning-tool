"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useWebContainer } from "@/hooks/useWebContainer";
import { useGuidedBuild } from "@/hooks/useGuidedBuild";
import { useProgressContext } from "../ProgressProvider";
import type { GuidedBuildProject } from "@/lib/guided-builds";
import GuidedBuildLayout from "./GuidedBuildLayout";
import TutorPanel from "./TutorPanel";
import CodeEditor from "../CodeEditor";
import ImmersiveFileTree from "../Project/ImmersiveFileTree";
import LivePreview from "../Project/LivePreview";
import { cn } from "@/lib/utils";

type SetupPhase =
  | "booting"
  | "writing"
  | "installing"
  | "starting"
  | "ready"
  | "error";

interface GuidedBuildWorkspaceProps {
  project: GuidedBuildProject;
}

export default function GuidedBuildWorkspace({
  project,
}: GuidedBuildWorkspaceProps) {
  const {
    status,
    error: containerError,
    writeFiles,
    installDependencies,
    startDevServer,
  } = useWebContainer();

  const {
    saveGuidedBuild,
    getGuidedBuildSave,
    completeGuidedBuild,
    isGuidedBuildComplete,
  } = useProgressContext();

  // Setup state
  const [setupPhase, setSetupPhase] = useState<SetupPhase>("booting");
  const [setupError, setSetupError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [activeOutputTab, setActiveOutputTab] = useState<
    "preview" | "console"
  >("preview");

  // Editor state
  const [activeFile, setActiveFile] = useState<string | null>(
    project.files.find((f) => !f.readOnly)?.path ||
      project.files[0]?.path ||
      null
  );
  const [openTabs, setOpenTabs] = useState<string[]>(() => {
    const editable = project.files.find((f) => !f.readOnly);
    return editable ? [editable.path] : [];
  });

  // Refs
  const writeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setupRanRef = useRef(false);

  // Get saved state
  const savedState = getGuidedBuildSave(project.id);

  // Guided build hook
  const guidedBuild = useGuidedBuild(
    project,
    savedState,
    saveGuidedBuild,
    () => completeGuidedBuild(project.id)
  );

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

  // Console output
  const appendConsole = useCallback((data: string) => {
    setConsoleOutput((prev) => [...prev, data]);
  }, []);

  // Setup lifecycle
  useEffect(() => {
    if (status !== "ready" || setupRanRef.current) return;
    setupRanRef.current = true;

    const setup = async () => {
      try {
        setSetupPhase("writing");
        appendConsole("Writing project files...\n");

        // Use the hook's file contents (may include saved state)
        await writeFiles(guidedBuild.fileContents);
        appendConsole("Files written successfully.\n");

        setSetupPhase("installing");
        appendConsole("\nRunning npm install...\n");

        const exitCode = await installDependencies((data) => {
          appendConsole(data);
        });

        if (exitCode !== 0) {
          throw new Error(`npm install failed with exit code ${exitCode}`);
        }
        appendConsole("\nDependencies installed.\n");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Handle container boot error
  useEffect(() => {
    if (status === "error") {
      setSetupPhase("error");
      setSetupError(containerError || "Failed to boot WebContainer");
    }
  }, [status, containerError]);

  // When step changes, auto-open the target file
  useEffect(() => {
    if (guidedBuild.currentStep?.targetFile) {
      const target = guidedBuild.currentStep.targetFile;
      setActiveFile(target);
      if (!openTabs.includes(target)) {
        setOpenTabs((tabs) => [...tabs, target]);
      }
    }
  }, [guidedBuild.currentStepIndex, guidedBuild.currentStep?.targetFile, openTabs]);

  // File selection
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

      // Update guided build state
      guidedBuild.updateFileContent(activeFile, value);

      // Debounce writing to WebContainer FS
      if (writeTimeoutRef.current) {
        clearTimeout(writeTimeoutRef.current);
      }
      writeTimeoutRef.current = setTimeout(async () => {
        try {
          await writeFiles({ [activeFile]: value });
        } catch {
          // Silently fail
        }
      }, 300);
    },
    [activeFile, writeFiles, guidedBuild]
  );

  // Handle "Show Me" - auto-insert code and write to WebContainer
  const handleShowMe = useCallback(() => {
    guidedBuild.autoInsertCode();

    // Write updated file to WebContainer after a tick
    setTimeout(async () => {
      const targetFile = guidedBuild.currentStep?.targetFile;
      if (targetFile && guidedBuild.fileContents[targetFile]) {
        try {
          await writeFiles({ [targetFile]: guidedBuild.fileContents[targetFile] });
        } catch {
          // Silently fail
        }
      }
    }, 50);
  }, [guidedBuild, writeFiles]);

  const getFileName = (path: string) => path.split("/").pop() || path;

  // Current target files for file tree highlighting
  const currentTargetFiles = guidedBuild.currentStep
    ? [guidedBuild.currentStep.targetFile]
    : [];

  // Convert project files to the format ImmersiveFileTree expects
  const fileTreeFiles = project.files.map((f) => ({
    ...f,
    content: guidedBuild.fileContents[f.path] ?? f.content,
  }));

  // --- Render ---

  const fileTree = (
    <ImmersiveFileTree
      files={fileTreeFiles}
      activeFile={activeFile}
      targetFiles={currentTargetFiles}
      onFileSelect={handleFileSelect}
    />
  );

  const editorArea = (
    <div className="flex flex-col h-full min-w-0">
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
              <svg
                className="w-3 h-3 text-sand-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(tab);
              }}
              className="text-sand-600 hover:text-sand-300 flex-shrink-0"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0 relative">
        {activeFile ? (
          <CodeEditor
            value={guidedBuild.fileContents[activeFile] || ""}
            language={getFileLanguage(activeFile)}
            onChange={
              isFileReadOnly(activeFile) ? undefined : handleEditorChange
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sand-500 text-sm">
            Select a file from the tree to start editing
          </div>
        )}
      </div>
    </div>
  );

  const outputPanel = (
    <div className="flex flex-col h-full">
      {/* Tab header */}
      <div className="flex border-b border-sand-800">
        <button
          onClick={() => setActiveOutputTab("preview")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeOutputTab === "preview"
              ? "text-primary-400 border-b-2 border-primary-500"
              : "text-sand-500 hover:text-sand-300"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveOutputTab("console")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeOutputTab === "console"
              ? "text-primary-400 border-b-2 border-primary-500"
              : "text-sand-500 hover:text-sand-300"
          )}
        >
          Console
        </button>
      </div>
      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-auto scrollbar-hide">
        {activeOutputTab === "preview" ? (
          <LivePreview
            url={previewUrl}
            setupPhase={setupPhase}
            error={setupError}
          />
        ) : (
          <div className="p-3 font-mono text-xs text-sand-400 whitespace-pre-wrap">
            {consoleOutput.length === 0 ? (
              <span className="text-sand-600">
                Console output will appear here...
              </span>
            ) : (
              consoleOutput.map((line, i) => <span key={i}>{line}</span>)
            )}
          </div>
        )}
      </div>
    </div>
  );

  const tutorPanel = (
    <TutorPanel
      currentStep={guidedBuild.currentStep}
      currentStepIndex={guidedBuild.currentStepIndex}
      totalSteps={guidedBuild.totalSteps}
      stepProgress={guidedBuild.stepProgress}
      isStepComplete={guidedBuild.isStepComplete}
      isAllComplete={guidedBuild.isAllComplete}
      validationResults={guidedBuild.validationResults}
      onCheckCode={guidedBuild.validateStep}
      onNextStep={guidedBuild.nextStep}
      onPrevStep={guidedBuild.prevStep}
      onShowMe={handleShowMe}
      onSkip={guidedBuild.skipStep}
      onGoToStep={guidedBuild.goToStep}
    />
  );

  return (
    <div className="flex flex-col h-screen bg-sand-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sand-900 border-b border-sand-800">
        <div className="flex items-center gap-3">
          <a
            href="/builds"
            className="text-sand-500 hover:text-sand-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
          <h1 className="text-sm font-semibold text-sand-200">
            {project.title}
          </h1>
          <span className="text-xs text-sand-500">|</span>
          <span className="text-xs text-sand-400">Guided Build</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-sand-500">
          <span>
            Step {guidedBuild.currentStepIndex + 1}/{guidedBuild.totalSteps}
          </span>
          {setupPhase === "ready" && (
            <span className="flex items-center gap-1 text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Live
            </span>
          )}
          {isGuidedBuildComplete(project.id) && (
            <span className="flex items-center gap-1 text-teal-400">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Complete
            </span>
          )}
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
        <GuidedBuildLayout
          fileTree={fileTree}
          editor={editorArea}
          output={outputPanel}
          tutorPanel={tutorPanel}
        />
      </div>
    </div>
  );
}
