"use client";

import { useCallback, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface FileData {
  id: string;
  name: string;
  content: string;
  language: string;
}

export function useExportProject() {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsZip = useCallback(
    async (projectName: string, files: FileData[]) => {
      setIsExporting(true);

      try {
        const zip = new JSZip();

        // Add each file to the ZIP
        files.forEach((file) => {
          zip.file(file.name, file.content);
        });

        // Add a simple README if one doesn't exist
        const hasReadme = files.some(
          (f) => f.name.toLowerCase() === "readme.md"
        );
        if (!hasReadme) {
          const readmeContent = `# ${projectName}

Created with CodeForge

## Files
${files.map((f) => `- ${f.name}`).join("\n")}

## Getting Started

1. Open the project in your favorite code editor
2. Run with: \`node index.js\` (for JavaScript files)
`;
          zip.file("README.md", readmeContent);
        }

        // Generate the ZIP file
        const blob = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 },
        });

        // Sanitize project name for filename
        const safeName = projectName
          .replace(/[^a-z0-9]/gi, "-")
          .replace(/-+/g, "-")
          .toLowerCase();

        // Download the file
        saveAs(blob, `${safeName}.zip`);

        return true;
      } catch (error) {
        console.error("Export failed:", error);
        return false;
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return {
    exportAsZip,
    isExporting,
  };
}
