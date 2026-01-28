"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Lesson } from "@/lib/lessons";
import CodeBlock from "./CodeBlock";

interface LessonViewerProps {
  lesson: Lesson;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-sand-100 mb-4 mt-8 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-sand-100 mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-sand-200 mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sand-300 mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-sand-300 mb-4 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-sand-300 mb-4 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-sand-300">{children}</li>,
          strong: ({ children }) => (
            <strong className="text-teal-400 font-semibold">{children}</strong>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-sand-800 text-coral-400 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            // Block code is handled by pre
            return <code className={className}>{children}</code>;
          },
          pre: ({ children }) => {
            // Extract code content and language
            const codeElement = children as React.ReactElement<{
              className?: string;
              children?: React.ReactNode;
            }>;
            const className = codeElement?.props?.className || "";
            const match = /language-(\w+)/.exec(className);
            const language = match ? match[1] : "javascript";
            const code = String(codeElement?.props?.children || "").trim();

            return (
              <div className="my-4">
                <CodeBlock code={code} language={language} />
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-sand-700 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-sand-800">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-sand-700">{children}</tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-sand-200 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-sand-300">{children}</td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-teal-500 pl-4 my-4 text-sand-400 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-teal-400 hover:text-teal-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-sand-700 my-6" />,
        }}
      >
        {lesson.content}
      </ReactMarkdown>
    </div>
  );
}
