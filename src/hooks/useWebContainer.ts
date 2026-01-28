"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WebContainer, WebContainerProcess } from "@webcontainer/api";
import { getWebContainer, WebContainerStatus } from "@/lib/webcontainer";

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
  const [status, setStatus] = useState<WebContainerStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const shellProcessRef = useRef<WebContainerProcess | null>(null);
  const shellInputRef = useRef<WritableStreamDefaultWriter | null>(null);

  // Boot WebContainer on mount
  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      setStatus("booting");
      setError(null);

      try {
        const container = await getWebContainer();
        if (mounted) {
          setWebcontainer(container);
          setStatus("ready");
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to boot WebContainer");
          setStatus("error");
        }
      }
    };

    boot();

    return () => {
      mounted = false;
    };
  }, []);

  // Write files to the WebContainer
  const writeFiles = useCallback(
    async (files: Record<string, string>) => {
      if (!webcontainer) return;

      for (const [path, content] of Object.entries(files)) {
        await webcontainer.fs.writeFile(path, content);
      }
    },
    [webcontainer]
  );

  // Run a command in the WebContainer
  const runCommand = useCallback(
    async (
      command: string,
      args: string[] = [],
      onOutput?: (data: string) => void
    ): Promise<number> => {
      if (!webcontainer) {
        throw new Error("WebContainer not ready");
      }

      const process = await webcontainer.spawn(command, args);

      // Stream output
      process.output.pipeTo(
        new WritableStream({
          write(data) {
            onOutput?.(data);
          },
        })
      );

      // Wait for process to exit
      return process.exit;
    },
    [webcontainer]
  );

  // Start an interactive shell
  const startShell = useCallback(
    async (onOutput: (data: string) => void): Promise<void> => {
      if (!webcontainer) {
        throw new Error("WebContainer not ready");
      }

      // Kill existing shell if any
      if (shellProcessRef.current) {
        shellProcessRef.current.kill();
      }

      const shellProcess = await webcontainer.spawn("jsh", {
        terminal: {
          cols: 80,
          rows: 24,
        },
      });

      shellProcessRef.current = shellProcess;
      shellInputRef.current = shellProcess.input.getWriter();

      // Stream output to terminal
      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            onOutput(data);
          },
        })
      );
    },
    [webcontainer]
  );

  // Write to shell input
  const writeToShell = useCallback(async (data: string) => {
    if (shellInputRef.current) {
      await shellInputRef.current.write(data);
    }
  }, []);

  // Resize shell terminal
  const resizeShell = useCallback(
    (cols: number, rows: number) => {
      if (shellProcessRef.current) {
        shellProcessRef.current.resize({ cols, rows });
      }
    },
    []
  );

  return {
    webcontainer,
    status,
    error,
    writeFiles,
    runCommand,
    startShell,
    writeToShell,
    resizeShell,
  };
}
