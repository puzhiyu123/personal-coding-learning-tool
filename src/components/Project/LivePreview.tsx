"use client";

import { cn } from "@/lib/utils";

type SetupPhase = "booting" | "writing" | "installing" | "starting" | "ready" | "error";

interface LivePreviewProps {
  url: string | null;
  setupPhase: SetupPhase;
  error?: string | null;
}

const phaseMessages: Record<SetupPhase, string> = {
  booting: "Booting environment...",
  writing: "Writing project files...",
  installing: "Installing dependencies...",
  starting: "Starting dev server...",
  ready: "",
  error: "Something went wrong",
};

const phaseProgress: Record<SetupPhase, number> = {
  booting: 10,
  writing: 30,
  installing: 55,
  starting: 80,
  ready: 100,
  error: 0,
};

export default function LivePreview({ url, setupPhase, error }: LivePreviewProps) {
  if (setupPhase === "error") {
    return (
      <div className="flex items-center justify-center h-full bg-sand-950 text-sand-400">
        <div className="text-center space-y-3">
          <svg
            className="w-10 h-10 mx-auto text-accent-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-accent-400 font-medium">Preview Error</p>
          <p className="text-sm max-w-xs">{error || "Failed to start the dev server."}</p>
        </div>
      </div>
    );
  }

  if (setupPhase !== "ready" || !url) {
    return (
      <div className="flex items-center justify-center h-full bg-sand-950">
        <div className="text-center space-y-4 w-64">
          {/* Spinner */}
          <div className="mx-auto w-10 h-10 border-2 border-sand-700 border-t-primary-400 rounded-full animate-spin" />

          <p className="text-sand-300 font-medium text-sm">
            {phaseMessages[setupPhase]}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-sand-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn(
                "h-full bg-primary-500 rounded-full transition-all duration-700 ease-out"
              )}
              style={{ width: `${phaseProgress[setupPhase]}%` }}
            />
          </div>

          <p className="text-sand-500 text-xs">
            {setupPhase === "installing"
              ? "This may take a moment..."
              : "Setting up your workspace"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className="w-full h-full border-0 bg-white"
      title="Live Preview"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
    />
  );
}
