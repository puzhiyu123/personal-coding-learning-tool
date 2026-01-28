"use client";

import { useState } from "react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";

interface EditorLayoutProps {
  sidebar: React.ReactNode;
  editor: React.ReactNode;
  output: React.ReactNode;
  terminal?: React.ReactNode;
  chat?: React.ReactNode;
  statusBar?: React.ReactNode;
}

type OutputTab = "console" | "terminal";

export default function EditorLayout({
  sidebar,
  editor,
  output,
  terminal,
  chat,
  statusBar,
}: EditorLayoutProps) {
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("console");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex flex-1 bg-sand-950 overflow-hidden">
      <PanelGroup orientation="horizontal">
        {/* Sidebar */}
        <Panel defaultSize={15} minSize={10} maxSize={30}>
          <aside className="flex flex-col h-full bg-sand-900 border-r border-sand-800">
            {sidebar}
          </aside>
        </Panel>

        <PanelResizeHandle className="w-1 bg-sand-800 hover:bg-teal-500 transition-colors" />

        {/* Main content area */}
        <Panel defaultSize={showChat && chat ? 60 : 85}>
          <div className="flex flex-col h-full min-w-0">
            <PanelGroup orientation="vertical">
              {/* Editor area */}
              <Panel defaultSize={70} minSize={30}>
                <div className="h-full">{editor}</div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-sand-800 hover:bg-teal-500 transition-colors" />

              {/* Output panel with tabs */}
              <Panel defaultSize={30} minSize={15}>
                <div className="flex flex-col h-full bg-sand-900">
                  {/* Tab header */}
                  <div className="flex border-b border-sand-800">
                    <button
                      onClick={() => setActiveOutputTab("console")}
                      className={`px-4 py-2 text-sm transition-colors ${
                        activeOutputTab === "console"
                          ? "text-teal-400 border-b-2 border-teal-500"
                          : "text-sand-500 hover:text-sand-300"
                      }`}
                    >
                      Console
                    </button>
                    {terminal && (
                      <button
                        onClick={() => setActiveOutputTab("terminal")}
                        className={`px-4 py-2 text-sm transition-colors ${
                          activeOutputTab === "terminal"
                            ? "text-teal-400 border-b-2 border-teal-500"
                            : "text-sand-500 hover:text-sand-300"
                        }`}
                      >
                        Terminal
                      </button>
                    )}
                    {/* AI Chat toggle */}
                    {chat && (
                      <button
                        onClick={() => setShowChat(!showChat)}
                        className={`ml-auto px-4 py-2 text-sm transition-colors ${
                          showChat
                            ? "text-coral-400"
                            : "text-sand-500 hover:text-sand-300"
                        }`}
                      >
                        {showChat ? "Hide AI" : "Ask AI"}
                      </button>
                    )}
                  </div>
                  {/* Tab content */}
                  <div className="flex-1 min-h-0">
                    {activeOutputTab === "console" ? output : terminal}
                  </div>
                </div>
              </Panel>
            </PanelGroup>

            {/* Status bar */}
            {statusBar && (
              <div className="flex items-center justify-between px-4 py-1 bg-sand-900 border-t border-sand-800 text-xs text-sand-500">
                {statusBar}
              </div>
            )}
          </div>
        </Panel>

        {/* Chat panel */}
        {showChat && chat && (
          <>
            <PanelResizeHandle className="w-1 bg-sand-800 hover:bg-teal-500 transition-colors" />
            <Panel defaultSize={25} minSize={20} maxSize={40}>
              <div className="h-full border-l border-sand-800">{chat}</div>
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}
