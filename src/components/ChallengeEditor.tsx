"use client";

import { useState, useCallback } from "react";
import type { CodeChallenge } from "@/lib/lessons";
import CodeEditor from "./CodeEditor";

interface ChallengeEditorProps {
  challenge: CodeChallenge;
  onComplete?: (quality?: number) => void;
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export default function ChallengeEditor({
  challenge,
  onComplete,
}: ChallengeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentHint, setCurrentHint] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setTestResults([]);

    // Capture console.log output
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(String).join(" "));
    };

    // Pre-process: strip ES module syntax so new Function() can parse it
    const processedCode = code
      .replace(/export\s+default\s+/g, "")
      .replace(/^export\s+(?=function|class|const|let|var|async)/gm, "");

    // Check if code contains JSX (can't be executed by new Function)
    const hasJSX = /<[A-Za-z][A-Za-z0-9]*[\s>\/]/.test(processedCode);

    let runtimeError: string | null = null;

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(processedCode);
      fn();
      setOutput(logs);
    } catch (error) {
      runtimeError = (error as Error).message;
      // Only show error output for non-JSX syntax errors
      // JSX code is expected to fail in new Function() — tests handle it via code analysis
      if (!hasJSX) {
        setOutput([`Error: ${runtimeError}`]);
      }
    }

    // Run tests
    const outputStr = logs.join("\n");
    const results: TestResult[] = challenge.tests.map((test, index) => {
      const testName = test.name || test.description || `Test ${index + 1}`;
      try {
        if (test.test) {
          // Runtime test expression (e.g., `output.includes("3")`)
          // eslint-disable-next-line no-new-func
          const testFn = new Function("output", "code", `return ${test.test}`);
          const passed = testFn(outputStr, code);
          return { name: testName, passed: Boolean(passed) };
        } else if (test.input !== undefined && test.expected !== undefined) {
          // Input/expected test format — try evaluating code + test expression
          try {
            // eslint-disable-next-line no-new-func
            const testFn = new Function(
              processedCode + `;\nreturn String(${test.input});`
            );
            const result = testFn();
            return { name: testName, passed: result === test.expected };
          } catch {
            // Runtime evaluation failed (e.g., JSX in code) — fall back to code analysis
            if (test.input.startsWith("typeof ")) {
              const varName = test.input.replace("typeof ", "").trim();
              const defPattern = new RegExp(
                `(?:function|async\\s+function|class|const|let|var)\\s+${varName}\\b`
              );
              const inferredType = defPattern.test(code) ? "function" : "undefined";
              return { name: testName, passed: inferredType === test.expected };
            }
            return { name: testName, passed: false, error: "Could not evaluate test" };
          }
        }
        return { name: testName, passed: false };
      } catch (error) {
        return {
          name: testName,
          passed: false,
          error: (error as Error).message,
        };
      }
    });

    setTestResults(results);

    // Check if all tests pass — compute quality score
    const allPassed = results.every((r) => r.passed);
    if (allPassed && onComplete) {
      let quality = 5; // Perfect — no help used
      if (showSolution) {
        quality = 1; // Viewed solution
      } else if (currentHint >= 0) {
        quality = 3; // Used hints
      }
      onComplete(quality);
    }

    console.log = originalLog;
    setIsRunning(false);
  }, [code, challenge.tests, onComplete, showSolution, currentHint]);

  const nextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setOutput([]);
    setTestResults([]);
    setCurrentHint(-1);
    setShowSolution(false);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every((r) => r.passed);

  return (
    <div className="bg-sand-900 rounded-xl border border-sand-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-sand-800 border-b border-sand-700">
        <h3 className="text-lg font-semibold text-sand-100">
          {challenge.title}
        </h3>
        <p className="text-sm text-sand-400 mt-1">{challenge.description}</p>
      </div>

      {/* Editor */}
      <div className="h-64">
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
          {isRunning ? "Running..." : "Run Code"}
        </button>
        <button
          onClick={nextHint}
          disabled={currentHint >= challenge.hints.length - 1}
          className="px-4 py-2 bg-coral-500/20 text-coral-400 rounded-lg hover:bg-coral-500/30 transition-colors disabled:opacity-50"
        >
          Hint ({currentHint + 1}/{challenge.hints.length})
        </button>
        <button
          onClick={resetCode}
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

      {/* Hint Display */}
      {currentHint >= 0 && (
        <div className="px-4 py-3 bg-coral-500/10 border-t border-coral-500/20">
          <p className="text-sm text-coral-300">
            <span className="font-semibold">Hint:</span>{" "}
            {challenge.hints[currentHint]}
          </p>
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="px-4 py-3 bg-teal-500/10 border-t border-teal-500/20">
          <p className="text-sm text-teal-400 font-semibold mb-2">Solution:</p>
          <pre className="text-sm text-sand-300 font-mono whitespace-pre-wrap bg-sand-900 p-3 rounded-lg">
            {challenge.solution}
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
                className={`flex items-center gap-2 text-sm ${
                  result.passed ? "text-teal-400" : "text-coral-400"
                }`}
              >
                {result.passed ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {result.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Message */}
      {allTestsPassed && (
        <div className="px-4 py-4 bg-teal-500/20 border-t border-teal-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-teal-300 font-semibold">Challenge Complete!</p>
              <p className="text-teal-400/80 text-sm">
                Great job! You can move on to the next lesson.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
