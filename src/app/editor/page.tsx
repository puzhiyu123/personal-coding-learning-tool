"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import EditorLayout from "@/components/layouts/EditorLayout";
import CodeEditor from "@/components/CodeEditor";
import ConsoleOutput, { LogEntry } from "@/components/ConsoleOutput";
import Terminal from "@/components/Terminal";
import ChatPanel from "@/components/ChatPanel";
import ProjectPicker from "@/components/ProjectPicker";
import HintPanel from "@/components/HintPanel";
import { getLanguageDisplayName } from "@/lib/language";
import { useWebContainer } from "@/hooks/useWebContainer";
import { useProject } from "@/hooks/useProject";
import { useEditorShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useCodeSuggestions } from "@/hooks/useCodeSuggestions";
import { useExportProject } from "@/hooks/useExportProject";
import { Terminal as XTerm } from "@xterm/xterm";

// Define file type
interface FileData {
  id: string;
  name: string;
  content: string;
  language: string;
}

// Initial files for new projects
const initialFiles: FileData[] = [
  {
    id: "1",
    name: "index.js",
    language: "javascript",
    content: `// Welcome to CodeForge!
// Start coding below...

function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");

// Try some more!
console.log("2 + 2 =", 2 + 2);
console.log("Current time:", new Date().toLocaleTimeString());
`,
  },
  {
    id: "2",
    name: "styles.css",
    language: "css",
    content: `/* Add your styles here */

body {
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
  background: #1a1a1a;
  color: white;
}
`,
  },
  {
    id: "3",
    name: "README.md",
    language: "markdown",
    content: `# My Project

This is a sample project in CodeForge.

## Getting Started

1. Edit the files
2. Run the code
3. See the output
`,
  },
];

export default function EditorPage() {
  const [files, setFiles] = useState<FileData[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState("1");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [shellStarted, setShellStarted] = useState(false);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [lastError, setLastError] = useState<string | undefined>();
  const terminalRef = useRef<XTerm | null>(null);

  // Hooks
  const {
    status: wcStatus,
    writeFiles,
    runCommand,
    startShell,
    writeToShell,
  } = useWebContainer();

  const {
    currentProject,
    isSaving,
    loadProject,
    saveProject,
    newProject,
  } = useProject();

  const {
    suggestion,
    isLoading: suggestionLoading,
    fetchSuggestion,
    clearSuggestion,
    acceptSuggestion,
  } = useCodeSuggestions();

  const { exportAsZip, isExporting } = useExportProject();

  // Find active file
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Derived state
  const lineCount = activeFile.content.split("\n").length;
  const charCount = activeFile.content.length;

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [files]);

  // Update file content
  const updateFileContent = (content: string) => {
    setFiles(
      files.map((f) =>
        f.id === activeFileId ? { ...f, content } : f
      )
    );
  };

  // Handle AI suggestion request
  const handleSuggestionRequest = useCallback(
    (code: string, cursorLine: number, cursorColumn: number, language: string) => {
      if (aiSuggestionsEnabled) {
        fetchSuggestion(code, cursorLine, cursorColumn, language);
      }
    },
    [aiSuggestionsEnabled, fetchSuggestion]
  );

  // Add log entry
  const addLog = (message: string, type: LogEntry["type"] = "log") => {
    const newLog: LogEntry = {
      id: Date.now().toString() + Math.random(),
      type,
      message,
      timestamp: new Date(),
    };
    setLogs((prev) => [...prev, newLog]);

    // Track errors for hint system
    if (type === "error") {
      setLastError(message);
    }
  };

  // Clear logs
  const clearLogs = () => {
    setLogs([]);
  };

  // Handle terminal ready
  const handleTerminalReady = useCallback((terminal: XTerm) => {
    terminalRef.current = terminal;
  }, []);

  // Handle terminal input
  const handleTerminalData = useCallback(
    (data: string) => {
      writeToShell(data);
    },
    [writeToShell]
  );

  // Start shell when WebContainer is ready
  useEffect(() => {
    if (wcStatus === "ready" && terminalRef.current && !shellStarted) {
      setShellStarted(true);
      startShell((data) => {
        terminalRef.current?.write(data);
      });
    }
  }, [wcStatus, shellStarted, startShell]);

  // Run code with WebContainer
  const runCode = async () => {
    if (activeFile.language !== "javascript") {
      addLog(`Cannot run ${activeFile.language} files yet`, "warn");
      return;
    }

    if (wcStatus !== "ready") {
      addLog("WebContainer is still starting up, please wait...", "warn");
      return;
    }

    setIsRunning(true);
    addLog(`Running ${activeFile.name}...`, "info");

    try {
      // Write the file to WebContainer
      await writeFiles({
        [activeFile.name]: activeFile.content,
      });

      // Run with Node.js
      const exitCode = await runCommand("node", [activeFile.name], (output) => {
        // Parse output and add as logs
        const lines = output.split("\n").filter((line) => line.trim());
        lines.forEach((line) => addLog(line));
      });

      if (exitCode === 0) {
        addLog("Execution complete", "info");
      } else {
        addLog(`Process exited with code ${exitCode}`, "error");
      }
    } catch (error) {
      addLog(String(error), "error");
    } finally {
      setIsRunning(false);
    }
  };

  // Save project
  const handleSave = async () => {
    try {
      await saveProject(projectName, files);
      setHasUnsavedChanges(false);
      addLog("Project saved!", "info");
    } catch (error) {
      addLog(`Failed to save: ${error}`, "error");
    }
  };

  // Load project
  const handleLoadProject = async (projectId: string) => {
    try {
      const project = await loadProject(projectId);
      if (project) {
        setProjectName(project.name);
        setFiles(
          project.files.map((f: FileData, index: number) => ({
            ...f,
            id: f.id || String(index + 1),
          }))
        );
        setActiveFileId(project.files[0]?.id || "1");
        setHasUnsavedChanges(false);
        addLog(`Loaded project: ${project.name}`, "info");
      }
    } catch (error) {
      addLog(`Failed to load project: ${error}`, "error");
    }
  };

  // New project
  const handleNewProject = () => {
    newProject();
    setProjectName("Untitled Project");
    setFiles(initialFiles);
    setActiveFileId("1");
    setHasUnsavedChanges(false);
    addLog("Created new project", "info");
  };

  // Keyboard shortcuts
  useEditorShortcuts({
    onSave: handleSave,
    onRun: runCode,
    onNewFile: handleNewProject,
  });

  // Get status indicator color
  const getStatusColor = () => {
    switch (wcStatus) {
      case "ready":
        return "bg-teal-500";
      case "booting":
        return "bg-yellow-500";
      case "error":
        return "bg-coral-500";
      default:
        return "bg-sand-500";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <EditorLayout
        sidebar={
          <div className="p-4 flex flex-col h-full">
            {/* Project Name */}
            <div className="mb-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-full bg-sand-800 text-sand-100 text-sm px-3 py-2 rounded-lg border border-sand-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Project name"
              />
            </div>

            {/* Project Actions */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowProjectPicker(true)}
                className="flex-1 px-3 py-2 text-xs bg-sand-800 text-sand-300 rounded-lg hover:bg-sand-700 border border-sand-700 transition-colors"
              >
                Open
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                  hasUnsavedChanges
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-sand-800 text-sand-500 border border-sand-700"
                }`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={async () => {
                const success = await exportAsZip(projectName, files);
                if (success) {
                  addLog("Project exported as ZIP!", "info");
                } else {
                  addLog("Failed to export project", "error");
                }
              }}
              disabled={isExporting}
              className="w-full mb-4 px-3 py-2 text-xs bg-sand-800 text-sand-300 rounded-lg hover:bg-sand-700 border border-sand-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isExporting ? "Exporting..." : "Export as ZIP"}
            </button>

            {/* Files */}
            <h2 className="text-sm font-semibold text-sand-400 uppercase tracking-wide mb-2">
              Files
            </h2>
            <div className="space-y-1 flex-1 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                    file.id === activeFileId
                      ? "bg-teal-600/20 text-teal-300 border border-teal-600/30"
                      : "text-sand-400 hover:bg-sand-800"
                  }`}
                >
                  {file.name}
                </div>
              ))}
            </div>

            {/* Run Button */}
            <div className="mt-4">
              <button
                onClick={runCode}
                disabled={isRunning || wcStatus !== "ready"}
                className={`w-full px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-all ${
                  isRunning || wcStatus !== "ready"
                    ? "bg-sand-700 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 shadow-md hover:shadow-lg"
                }`}
              >
                {isRunning ? "Running..." : "Run Code"}
              </button>
            </div>

            {/* Hint Panel */}
            <div className="mt-4">
              <HintPanel
                code={activeFile.content}
                language={activeFile.language}
                lastError={lastError}
              />
            </div>

            {/* AI Suggestions Toggle */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-sand-400">AI Suggestions</span>
              <button
                onClick={() => setAiSuggestionsEnabled(!aiSuggestionsEnabled)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  aiSuggestionsEnabled ? "bg-teal-500" : "bg-sand-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    aiSuggestionsEnabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* WebContainer status */}
            <div className="mt-4 flex items-center gap-2 text-xs text-sand-500">
              <span className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              <span>
                {wcStatus === "ready"
                  ? "Runtime ready"
                  : wcStatus === "booting"
                  ? "Starting runtime..."
                  : wcStatus === "error"
                  ? "Runtime error"
                  : "Initializing..."}
              </span>
            </div>
          </div>
        }
        editor={
          <div className="flex flex-col h-full">
            {/* Tab bar */}
            <div className="flex bg-sand-900 border-b border-sand-800">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`px-4 py-2 text-sm border-r border-sand-800 transition-colors ${
                    file.id === activeFileId
                      ? "bg-sand-950 text-teal-400"
                      : "text-sand-500 hover:text-sand-300 hover:bg-sand-800"
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>
            {/* Editor */}
            <div className="flex-1 min-h-0">
              <CodeEditor
                value={activeFile.content}
                language={activeFile.language}
                onChange={(value) => {
                  updateFileContent(value || "");
                  clearSuggestion();
                }}
                onSuggestionRequest={handleSuggestionRequest}
                suggestion={suggestion}
                suggestionLoading={suggestionLoading}
                onAcceptSuggestion={acceptSuggestion}
              />
            </div>
          </div>
        }
        output={<ConsoleOutput logs={logs} onClear={clearLogs} />}
        terminal={
          <Terminal onData={handleTerminalData} onReady={handleTerminalReady} />
        }
        chat={
          <ChatPanel code={activeFile.content} language={activeFile.language} />
        }
        statusBar={
          <>
            <span>
              {projectName}
              {hasUnsavedChanges ? " *" : ""}
              {currentProject ? ` (${currentProject.id.slice(0, 8)})` : ""}
            </span>
            <span>
              {getLanguageDisplayName(activeFile.language)} | Lines: {lineCount} | Chars: {charCount}
            </span>
          </>
        }
      />

      {/* Project Picker Modal */}
      <ProjectPicker
        isOpen={showProjectPicker}
        onClose={() => setShowProjectPicker(false)}
        onSelect={handleLoadProject}
        onNew={handleNewProject}
        currentProjectId={currentProject?.id}
      />
    </div>
  );
}
