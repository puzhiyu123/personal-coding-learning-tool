"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ImmersiveProjectFile } from "@/lib/immersive-projects";

interface FileTreeNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
  language?: string;
  readOnly?: boolean;
}

interface ImmersiveFileTreeProps {
  files: ImmersiveProjectFile[];
  activeFile: string | null;
  targetFiles: string[];
  onFileSelect: (path: string) => void;
}

function buildTree(files: ImmersiveProjectFile[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const isFile = i === parts.length - 1;
      const pathSoFar = parts.slice(0, i + 1).join("/");

      const existing = current.find((n) => n.name === name);

      if (existing) {
        if (existing.type === "folder" && existing.children) {
          current = existing.children;
        }
      } else if (isFile) {
        current.push({
          name,
          path: file.path,
          type: "file",
          language: file.language,
          readOnly: file.readOnly,
        });
      } else {
        const folder: FileTreeNode = {
          name,
          path: pathSoFar,
          type: "folder",
          children: [],
        };
        current.push(folder);
        current = folder.children!;
      }
    }
  }

  // Sort: folders first, then files, alphabetically
  const sortNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
    return nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    }).map((n) =>
      n.children ? { ...n, children: sortNodes(n.children) } : n
    );
  };

  return sortNodes(root);
}

const fileIcons: Record<string, string> = {
  javascript: "JS",
  typescript: "TS",
  json: "{}",
  html: "<>",
  css: "#",
};

function FileIcon({ language, readOnly }: { language?: string; readOnly?: boolean }) {
  if (readOnly) {
    return (
      <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold text-sand-500">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </span>
    );
  }

  const icon = language ? fileIcons[language] : "F";
  return (
    <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold text-sand-400 bg-sand-700 rounded">
      {icon || "F"}
    </span>
  );
}

function TreeNode({
  node,
  depth,
  activeFile,
  targetFiles,
  onFileSelect,
}: {
  node: FileTreeNode;
  depth: number;
  activeFile: string | null;
  targetFiles: string[];
  onFileSelect: (path: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const isTarget = targetFiles.includes(node.path);
  const isActive = activeFile === node.path;

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-1.5 w-full px-2 py-1 text-left text-sm hover:bg-sand-800/60 rounded transition-colors",
            "text-sand-400"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <svg
            className={cn(
              "w-3 h-3 text-sand-500 transition-transform",
              expanded && "rotate-90"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className={cn("w-4 h-4", expanded ? "text-primary-400" : "text-sand-500")}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {expanded ? (
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clipRule="evenodd"
              />
            ) : (
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            )}
          </svg>
          <span className="truncate">{node.name}</span>
        </button>
        {expanded && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                targetFiles={targetFiles}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(node.path)}
      className={cn(
        "flex items-center gap-1.5 w-full px-2 py-1 text-left text-sm rounded transition-colors",
        isActive
          ? "bg-primary-500/15 text-primary-300"
          : isTarget
          ? "text-primary-400 hover:bg-sand-800/60"
          : "text-sand-400 hover:bg-sand-800/60"
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <FileIcon language={node.language} readOnly={node.readOnly} />
      <span className="truncate">{node.name}</span>
      {isTarget && !isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
      )}
    </button>
  );
}

export default function ImmersiveFileTree({
  files,
  activeFile,
  targetFiles,
  onFileSelect,
}: ImmersiveFileTreeProps) {
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div className="py-2 text-sm">
      <div className="px-3 py-1.5 text-xs font-semibold text-sand-500 uppercase tracking-wider">
        Files
      </div>
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          activeFile={activeFile}
          targetFiles={targetFiles}
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
}
