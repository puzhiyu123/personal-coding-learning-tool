"use client";

import { useEffect, useCallback } from "react";

interface ShortcutMap {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Build key combination string
      const parts: string[] = [];
      if (event.metaKey || event.ctrlKey) parts.push("mod");
      if (event.shiftKey) parts.push("shift");
      if (event.altKey) parts.push("alt");
      parts.push(event.key.toLowerCase());

      const combo = parts.join("+");

      // Check if this combo matches any shortcut
      if (shortcuts[combo]) {
        event.preventDefault();
        shortcuts[combo]();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

// Predefined shortcuts for the editor
export function useEditorShortcuts({
  onSave,
  onRun,
  onNewFile,
}: {
  onSave?: () => void;
  onRun?: () => void;
  onNewFile?: () => void;
}) {
  const shortcuts: ShortcutMap = {};

  if (onSave) shortcuts["mod+s"] = onSave;
  if (onRun) shortcuts["mod+enter"] = onRun;
  if (onNewFile) shortcuts["mod+n"] = onNewFile;

  useKeyboardShortcuts(shortcuts);
}
