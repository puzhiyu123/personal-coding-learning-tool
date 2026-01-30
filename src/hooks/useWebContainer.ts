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

  // Ensure parent directories exist before writing a file
  const ensureDir = useCallback(
    async (filePath: string) => {
      if (!webcontainer) return;
      const parts = filePath.split("/");
      if (parts.length > 1) {
        const dir = parts.slice(0, -1).join("/");
        await webcontainer.fs.mkdir(dir, { recursive: true });
      }
    },
    [webcontainer]
  );

  // Write files to the WebContainer (supports nested paths like "src/components/App.jsx")
  const writeFiles = useCallback(
    async (files: Record<string, string>) => {
      if (!webcontainer) return;

      for (const [path, content] of Object.entries(files)) {
        await ensureDir(path);
        await webcontainer.fs.writeFile(path, content);
      }
    },
    [webcontainer, ensureDir]
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

  // Install npm dependencies, streaming output
  const installDependencies = useCallback(
    async (onOutput?: (data: string) => void): Promise<number> => {
      if (!webcontainer) {
        throw new Error("WebContainer not ready");
      }

      const process = await webcontainer.spawn("npm", ["install"]);

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            onOutput?.(data);
          },
        })
      );

      return process.exit;
    },
    [webcontainer]
  );

  // Start dev server (npm run dev) and resolve with preview URL on server-ready
  const startDevServer = useCallback(
    async (onOutput?: (data: string) => void): Promise<string> => {
      if (!webcontainer) {
        throw new Error("WebContainer not ready");
      }

      return new Promise<string>((resolve, reject) => {
        // Listen for server-ready event before spawning
        webcontainer.on("server-ready", (_port: number, url: string) => {
          resolve(url);
        });

        webcontainer
          .spawn("npm", ["run", "dev"])
          .then((process) => {
            process.output.pipeTo(
              new WritableStream({
                write(data) {
                  onOutput?.(data);
                },
              })
            );
          })
          .catch(reject);
      });
    },
    [webcontainer]
  );

  // Read a file from the WebContainer filesystem
  const readFile = useCallback(
    async (path: string): Promise<string> => {
      if (!webcontainer) {
        throw new Error("WebContainer not ready");
      }

      return webcontainer.fs.readFile(path, "utf-8");
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
    installDependencies,
    startDevServer,
    readFile,
    startShell,
    writeToShell,
    resizeShell,
  };
}
