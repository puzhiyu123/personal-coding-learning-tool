"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState, useCallback } from "react";
import type { editor } from "monaco-editor";

// Dynamic import with SSR disabled - Monaco only runs in the browser
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-sand-950 text-sand-500">
      Loading editor...
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  onSuggestionRequest?: (
    code: string,
    cursorLine: number,
    cursorColumn: number,
    language: string
  ) => void;
  suggestion?: string;
  suggestionLoading?: boolean;
  onAcceptSuggestion?: () => string;
}

export default function CodeEditor({
  value,
  language = "javascript",
  onChange,
  onSuggestionRequest,
  suggestion,
  suggestionLoading,
  onAcceptSuggestion,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    // Listen for cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      if (onSuggestionRequest && e.reason === 0) {
        // 0 = NotSet (user typing)
        const model = editor.getModel();
        if (model) {
          const position = e.position;
          const line = model.getLineContent(position.lineNumber);

          // Only request suggestions if the line has content and we're at the end
          if (line.trim() && position.column >= line.length) {
            onSuggestionRequest(
              model.getValue(),
              position.lineNumber,
              position.column,
              language
            );
          }
        }
      }
    });

    // Handle Tab key to accept suggestion
    editor.addCommand(
      // Monaco.KeyCode.Tab = 2
      2,
      () => {
        if (suggestion && onAcceptSuggestion) {
          const accepted = onAcceptSuggestion();
          if (accepted) {
            const position = editor.getPosition();
            if (position) {
              editor.executeEdits("suggestion", [
                {
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                  text: accepted,
                },
              ]);
              // Move cursor to end of inserted text
              const lines = accepted.split("\n");
              const lastLine = lines[lines.length - 1];
              editor.setPosition({
                lineNumber: position.lineNumber + lines.length - 1,
                column:
                  lines.length === 1
                    ? position.column + lastLine.length
                    : lastLine.length + 1,
              });
            }
          }
          setShowSuggestion(false);
        } else {
          // Default tab behavior
          editor.trigger("keyboard", "tab", null);
        }
      }
    );

    // Handle Escape to dismiss suggestion
    editor.addCommand(
      // Monaco.KeyCode.Escape = 9
      9,
      () => {
        if (showSuggestion) {
          setShowSuggestion(false);
        } else {
          editor.trigger("keyboard", "escape", null);
        }
      }
    );
  };

  // Update suggestion visibility and position
  useEffect(() => {
    if (suggestion && editorRef.current) {
      const position = editorRef.current.getPosition();
      if (position) {
        const coords = editorRef.current.getScrolledVisiblePosition(position);
        if (coords && containerRef.current) {
          const editorRect = containerRef.current.getBoundingClientRect();
          setSuggestionPosition({
            top: coords.top + coords.height + 4,
            left: Math.min(coords.left, editorRect.width - 300),
          });
          setShowSuggestion(true);
        }
      }
    } else {
      setShowSuggestion(false);
    }
  }, [suggestion]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <Editor
          width="100%"
          height="100%"
          language={language}
          value={value}
          theme="vs-dark"
          onChange={onChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
          }}
        />
      </div>

      {/* AI Suggestion Popup */}
      {(showSuggestion || suggestionLoading) && (
        <div
          className="absolute z-50 max-w-sm bg-sand-900 border border-sand-700 rounded-lg shadow-xl overflow-hidden"
          style={{
            top: suggestionPosition.top,
            left: suggestionPosition.left,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-sand-800 border-b border-sand-700">
            <span className="text-xs text-teal-400 font-medium">AI Suggestion</span>
            {suggestionLoading && (
              <span className="text-xs text-sand-500">thinking...</span>
            )}
          </div>
          {suggestion && (
            <>
              <pre className="p-3 text-sm text-sand-200 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                {suggestion}
              </pre>
              <div className="flex items-center justify-between px-3 py-1.5 bg-sand-800 border-t border-sand-700">
                <span className="text-xs text-sand-500">
                  Press <kbd className="px-1 py-0.5 bg-sand-700 rounded text-sand-300">Tab</kbd> to accept
                </span>
                <span className="text-xs text-sand-500">
                  <kbd className="px-1 py-0.5 bg-sand-700 rounded text-sand-300">Esc</kbd> to dismiss
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
