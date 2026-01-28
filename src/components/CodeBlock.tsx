interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div className="bg-sand-950 rounded-xl overflow-hidden border border-sand-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sand-900 border-b border-sand-800">
        <span className="text-xs text-teal-400 uppercase font-medium">{language}</span>
        <button className="text-xs text-sand-500 hover:text-sand-300 transition-colors">
          Copy
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-sand-600 text-right pr-4 select-none">
                  {index + 1}
                </span>
                <span className="text-sand-200">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
