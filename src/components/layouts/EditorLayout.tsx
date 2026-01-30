"use client";

import { useState } from "react";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

interface EditorLayoutProps {
  sidebar: React.ReactNode;
  editor: React.ReactNode;
  output: React.ReactNode;
  terminal?: React.ReactNode;
  preview?: React.ReactNode;
  chat?: React.ReactNode;
  statusBar?: React.ReactNode;
}

type OutputTab = "console" | "terminal" | "preview";

export default function EditorLayout({
  sidebar,
  editor,
  output,
  terminal,
  preview,
  chat,
  statusBar,
}: EditorLayoutProps) {
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>(
    preview ? "preview" : "console"
  );
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex flex-1 bg-sand-950 overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col h-full bg-sand-900 border-r border-sand-800 overflow-y-auto scrollbar-hide">
        {sidebar}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <PanelGroup orientation="vertical">
          {/* Editor area */}
          <Panel defaultSize={70} minSize={30}>
            <div className="h-full">{editor}</div>
          </Panel>

          <PanelResizeHandle className="h-1 bg-sand-800 hover:bg-primary-500 transition-colors cursor-row-resize" />

          {/* Output panel with tabs */}
          <Panel defaultSize={30} minSize={15}>
            <div className="flex flex-col h-full bg-sand-900">
              {/* Tab header */}
              <div className="flex border-b border-sand-800">
                {preview && (
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
                )}
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
                {terminal && (
                  <button
                    onClick={() => setActiveOutputTab("terminal")}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors",
                      activeOutputTab === "terminal"
                        ? "text-primary-400 border-b-2 border-primary-500"
                        : "text-sand-500 hover:text-sand-300"
                    )}
                  >
                    Terminal
                  </button>
                )}
                {/* AI Chat toggle */}
                {chat && (
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className={cn(
                      "ml-auto px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2",
                      showChat
                        ? "text-accent-400"
                        : "text-sand-500 hover:text-sand-300"
                    )}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {showChat ? "Hide AI" : "Ask AI"}
                  </button>
                )}
              </div>
              {/* Tab content */}
              <div className="flex-1 min-h-0 overflow-auto scrollbar-hide">
                {activeOutputTab === "preview"
                  ? preview
                  : activeOutputTab === "console"
                  ? output
                  : terminal}
              </div>
            </div>
          </Panel>
        </PanelGroup>

        {/* Status bar */}
        {statusBar && (
          <div className="flex items-center justify-between px-4 py-1.5 bg-sand-900 border-t border-sand-800 text-xs text-sand-500">
            {statusBar}
          </div>
        )}
      </div>

      {/* Chat panel */}
      {showChat && chat && (
        <div className="w-80 flex-shrink-0 h-full border-l border-sand-800 overflow-hidden animate-slide-up">
          {chat}
        </div>
      )}
    </div>
  );
}
