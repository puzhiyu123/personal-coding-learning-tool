"use client";

import { useMemo } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const highlighted = useMemo(() => {
    const lang = hljs.getLanguage(language) ? language : "javascript";
    try {
      return hljs.highlight(code, { language: lang }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [code, language]);

  const lines = highlighted.split("\n");

  return (
    <div className="bg-sand-950 rounded-xl overflow-hidden border border-sand-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sand-900 border-b border-sand-800">
        <span className="text-xs text-teal-400 uppercase font-medium">{language}</span>
        <button
          className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono hljs">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-sand-600 text-right pr-4 select-none flex-shrink-0">
                  {index + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: line || " " }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
