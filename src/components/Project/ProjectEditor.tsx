"use client";

import { useState, useCallback } from "react";
import type { ProjectTask } from "@/lib/projects";
import CodeEditor from "../CodeEditor";
import ProjectSlackMessage from "./ProjectSlackMessage";
import { cn } from "@/lib/utils";

interface ProjectEditorProps {
  task: ProjectTask;
  onComplete: () => void;
  isComplete: boolean;
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export default function ProjectEditor({ task, onComplete, isComplete }: ProjectEditorProps) {
  const [code, setCode] = useState(task.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentHint, setCurrentHint] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setTestResults([]);

    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(String).join(" "));
    };

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      fn();

      setOutput(logs);

      // Run tests
      const outputStr = logs.join("\n");
      const results: TestResult[] = task.tests.map((test, index) => {
        try {
          // eslint-disable-next-line no-new-func
          const testFn = new Function("output", "code", `return ${test.test}`);
          const passed = testFn(outputStr, code);
          return { name: test.name || `Test ${index + 1}`, passed: Boolean(passed) };
        } catch (error) {
          return {
            name: test.name || `Test ${index + 1}`,
            passed: false,
            error: (error as Error).message,
          };
        }
      });

      setTestResults(results);

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        onComplete();
      }
    } catch (error) {
      setOutput([`Error: ${(error as Error).message}`]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  }, [code, task.tests, onComplete]);

  const allTestsPassed = testResults.length > 0 && testResults.every((r) => r.passed);

  return (
    <div className="space-y-6">
      {/* Slack Context Message */}
      <ProjectSlackMessage message={task.context} />

      {/* Task Description */}
      <div className="bg-sand-900 rounded-xl border border-sand-800 overflow-hidden">
        <div className="px-4 py-3 bg-sand-800 border-b border-sand-700">
          <h3 className="text-lg font-semibold text-sand-100">{task.title}</h3>
          <p className="text-sm text-sand-400 mt-1">{task.description}</p>
        </div>

        {/* Requirements */}
        <div className="px-4 py-3 border-b border-sand-700">
          <p className="text-xs font-semibold text-sand-500 uppercase mb-2">Requirements</p>
          <ul className="space-y-1">
            {task.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-sand-300">
                <span className="text-sand-500 mt-0.5">-</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Code Editor */}
        <div className="h-72">
          <CodeEditor
            value={code}
            language="javascript"
            onChange={(value) => setCode(value || "")}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 px-4 py-3 bg-sand-800 border-t border-sand-700">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium disabled:opacity-50"
          >
            {isRunning ? "Running..." : "Run & Test"}
          </button>
          <button
            onClick={() => {
              if (currentHint < task.hints.length - 1) {
                setCurrentHint(currentHint + 1);
              }
            }}
            disabled={currentHint >= task.hints.length - 1}
            className="px-4 py-2 bg-coral-500/20 text-coral-400 rounded-lg hover:bg-coral-500/30 transition-colors disabled:opacity-50"
          >
            Hint ({currentHint + 1}/{task.hints.length})
          </button>
          <button
            onClick={() => {
              setCode(task.starterCode);
              setOutput([]);
              setTestResults([]);
              setCurrentHint(-1);
              setShowSolution(false);
            }}
            className="px-4 py-2 bg-sand-700 text-sand-300 rounded-lg hover:bg-sand-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 text-sand-500 hover:text-sand-300 transition-colors ml-auto"
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>

        {/* Hint */}
        {currentHint >= 0 && (
          <div className="px-4 py-3 bg-coral-500/10 border-t border-coral-500/20">
            <p className="text-sm text-coral-300">
              <span className="font-semibold">Hint:</span> {task.hints[currentHint]}
            </p>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="px-4 py-3 bg-teal-500/10 border-t border-teal-500/20">
            <p className="text-sm text-teal-400 font-semibold mb-2">Solution:</p>
            <pre className="text-sm text-sand-300 font-mono whitespace-pre-wrap bg-sand-900 p-3 rounded-lg">
              {task.solution}
            </pre>
          </div>
        )}

        {/* Output */}
        {output.length > 0 && (
          <div className="px-4 py-3 border-t border-sand-700">
            <p className="text-sm font-semibold text-sand-400 mb-2">Output:</p>
            <pre className="text-sm font-mono bg-sand-950 p-3 rounded-lg text-teal-300">
              {output.join("\n")}
            </pre>
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="px-4 py-3 border-t border-sand-700">
            <p className="text-sm font-semibold text-sand-400 mb-2">Tests:</p>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    result.passed ? "text-teal-400" : "text-coral-400"
                  )}
                >
                  {result.passed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {result.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success */}
        {allTestsPassed && (
          <div className="px-4 py-4 bg-teal-500/20 border-t border-teal-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-teal-300 font-semibold">Task Complete!</p>
                <p className="text-teal-400/80 text-sm">
                  All tests passing. Great work!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
