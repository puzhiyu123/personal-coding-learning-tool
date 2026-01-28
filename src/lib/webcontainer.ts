import { WebContainer } from "@webcontainer/api";

let webcontainerInstance: WebContainer | null = null;

export type WebContainerStatus = "idle" | "booting" | "ready" | "error";

export async function getWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) {
    return webcontainerInstance;
  }

  webcontainerInstance = await WebContainer.boot();
  return webcontainerInstance;
}

export function getWebContainerInstance(): WebContainer | null {
  return webcontainerInstance;
}
