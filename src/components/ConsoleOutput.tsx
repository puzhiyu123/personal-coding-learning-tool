"use client";

import { useEffect, useRef } from "react";

export interface LogEntry {
  id: string;
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: Date;
}

interface ConsoleOutputProps {
  logs: LogEntry[];
  onClear: () => void;
}

export default function ConsoleOutput({ logs, onClear }: ConsoleOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "error":
        return "text-coral-400";
      case "warn":
        return "text-yellow-400";
      case "info":
        return "text-teal-400";
      default:
        return "text-teal-300";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-sand-800">
        <h2 className="text-sm font-semibold text-sand-400 uppercase tracking-wide">
          Console
        </h2>
        <button
          onClick={onClear}
          className="text-xs text-sand-500 hover:text-sand-300 px-2 py-1 rounded-lg hover:bg-sand-800 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Log entries */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <div className="text-sand-600">{">"} Ready to run code...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`${getLogColor(log.type)} mb-1`}>
              <span className="text-sand-600 mr-2">
                [{log.timestamp.toLocaleTimeString()}]
              </span>
              {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
