"use client";

import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";

interface GuidedBuildLayoutProps {
  fileTree: React.ReactNode;
  editor: React.ReactNode;
  output: React.ReactNode;
  tutorPanel: React.ReactNode;
}

export default function GuidedBuildLayout({
  fileTree,
  editor,
  output,
  tutorPanel,
}: GuidedBuildLayoutProps) {
  return (
    <div className="flex h-full overflow-hidden">
      {/* File Tree — fixed width sidebar */}
      <aside className="w-48 flex-shrink-0 h-full bg-sand-900 border-r border-sand-800 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {fileTree}
      </aside>

      {/* Center: Editor + Output — flex fills remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <PanelGroup orientation="vertical">
          {/* Editor */}
          <Panel defaultSize={65} minSize={30}>
            <div className="h-full">{editor}</div>
          </Panel>

          <PanelResizeHandle className="h-1 bg-sand-800 hover:bg-primary-500 transition-colors cursor-row-resize" />

          {/* Preview/Console */}
          <Panel defaultSize={35} minSize={15}>
            <div className="h-full bg-sand-900">{output}</div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Tutor Panel — fixed width sidebar */}
      <aside className="w-96 flex-shrink-0 h-full bg-sand-900 border-l border-sand-800 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {tutorPanel}
      </aside>
    </div>
  );
}
