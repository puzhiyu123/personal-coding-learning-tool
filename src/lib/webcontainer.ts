import { WebContainer } from "@webcontainer/api";

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

export type WebContainerStatus = "idle" | "booting" | "ready" | "error";

export async function getWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) {
    return webcontainerInstance;
  }

  // Cache the boot promise to prevent concurrent boot() calls
  // (React Strict Mode calls effects twice in development)
  if (!bootPromise) {
    bootPromise = WebContainer.boot().then((instance) => {
      webcontainerInstance = instance;
      return instance;
    });
  }

  return bootPromise;
}

export function getWebContainerInstance(): WebContainer | null {
  return webcontainerInstance;
}
