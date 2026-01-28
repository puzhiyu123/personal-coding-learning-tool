// Map file extensions to Monaco language IDs
export function getLanguageFromFilename(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "js":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "html":
      return "html";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "py":
      return "python";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "h":
      return "c";
    case "hpp":
      return "cpp";
    case "sh":
      return "shell";
    case "bash":
      return "shell";
    case "sql":
      return "sql";
    case "yaml":
    case "yml":
      return "yaml";
    case "xml":
      return "xml";
    case "svg":
      return "xml";
    default:
      return "plaintext";
  }
}

// Get display name for a language
export function getLanguageDisplayName(language: string): string {
  const names: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    css: "CSS",
    scss: "SCSS",
    html: "HTML",
    json: "JSON",
    markdown: "Markdown",
    python: "Python",
    ruby: "Ruby",
    go: "Go",
    rust: "Rust",
    java: "Java",
    c: "C",
    cpp: "C++",
    shell: "Shell",
    sql: "SQL",
    yaml: "YAML",
    xml: "XML",
    plaintext: "Plain Text",
  };

  return names[language] || language;
}
