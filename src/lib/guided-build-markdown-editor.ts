import type { GuidedBuildProject } from "./guided-builds";

export const markdownEditorProject: GuidedBuildProject = {
  id: "guided-markdown-editor",
  title: "Markdown Note Editor",
  subtitle: "Build a multi-note markdown editor with live preview",
  difficulty: "advanced",
  estimatedMinutes: 45,
  conceptsSummary: [
    "useRef for DOM",
    "useCallback",
    "Debouncing",
    "dangerouslySetInnerHTML",
    "Multi-Component Architecture",
    "localStorage with Arrays",
  ],
  description:
    "Build a full-featured markdown note editor with live preview, note management, and auto-save. You'll learn useRef for DOM manipulation, useCallback for performance, debouncing for efficiency, dangerouslySetInnerHTML for rendering HTML, and multi-component architecture. Includes a regex-based markdown parser!",
  packageJson: {
    name: "markdown-editor",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.0.0",
      vite: "^5.0.0",
    },
  },
  files: [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markdown Editor</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      language: "html",
      readOnly: true,
    },
    {
      path: "vite.config.js",
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      language: "javascript",
      readOnly: true,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "markdown-editor",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: { dev: "vite", build: "vite build" },
          dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
          devDependencies: { "@vitejs/plugin-react": "^4.0.0", vite: "^5.0.0" },
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "src/main.jsx",
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
      language: "javascript",
      readOnly: true,
    },
    {
      path: "src/App.jsx",
      content: `// Markdown Note Editor App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Markdown Editor</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "javascript",
    },
    {
      path: "src/NoteList.jsx",
      content: `// NoteList component — you'll build this in a later step

export default function NoteList() {
  return null
}`,
      language: "javascript",
    },
    {
      path: "src/Editor.jsx",
      content: `// Editor component — you'll build this in a later step

export default function Editor() {
  return null
}`,
      language: "javascript",
    },
    {
      path: "src/Preview.jsx",
      content: `// Preview component — you'll build this in a later step

export default function Preview() {
  return null
}`,
      language: "javascript",
    },
    {
      path: "src/App.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
  min-height: 100vh;
}

.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.app > h1 {
  display: none;
}

/* Sidebar */
.sidebar {
  grid-row: 1 / -1;
  background: #161b22;
  border-right: 1px solid #21262d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #21262d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-size: 0.9rem;
  color: #58a6ff;
}

.sidebar-header button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #30363d;
  background: #21262d;
  color: #c9d1d9;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.sidebar-header button:hover {
  background: #30363d;
  border-color: #58a6ff;
}

.search-input {
  margin: 8px 16px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #30363d;
  background: #0d1117;
  color: #c9d1d9;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #58a6ff;
}

.note-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.note-item {
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2px;
  transition: background 0.15s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-item:hover {
  background: #21262d;
}

.note-item.active {
  background: #1f6feb22;
  border: 1px solid #1f6feb44;
}

.note-item .title {
  font-size: 0.85rem;
  color: #c9d1d9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.note-item .delete-btn {
  opacity: 0;
  background: none;
  border: none;
  color: #f85149;
  cursor: pointer;
  padding: 2px 6px;
  font-size: 0.9rem;
  transition: opacity 0.15s;
}

.note-item:hover .delete-btn {
  opacity: 1;
}

/* Editor area */
.editor-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.editor-pane {
  grid-column: 1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #21262d;
}

.preview-pane {
  grid-column: 2;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pane-header {
  padding: 8px 16px;
  border-bottom: 1px solid #21262d;
  font-size: 0.75rem;
  color: #484f58;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #161b22;
}

.editor-textarea {
  flex: 1;
  padding: 16px;
  background: #0d1117;
  color: #c9d1d9;
  border: none;
  outline: none;
  font-family: 'SFMono-Regular', 'Menlo', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  resize: none;
  tab-size: 2;
}

.preview-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  line-height: 1.6;
}

.preview-content h1 { font-size: 1.5rem; margin: 16px 0 8px; color: #c9d1d9; border-bottom: 1px solid #21262d; padding-bottom: 8px; }
.preview-content h2 { font-size: 1.25rem; margin: 14px 0 6px; color: #c9d1d9; }
.preview-content h3 { font-size: 1.1rem; margin: 12px 0 4px; color: #c9d1d9; }
.preview-content p { margin: 8px 0; color: #c9d1d9; }
.preview-content strong { color: #f0f6fc; }
.preview-content em { color: #d2a8ff; }
.preview-content code {
  background: #161b22;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SFMono-Regular', monospace;
  font-size: 0.85em;
  color: #79c0ff;
}
.preview-content ul, .preview-content ol {
  margin: 8px 0;
  padding-left: 24px;
}
.preview-content li { margin: 4px 0; }
.preview-content hr {
  border: none;
  border-top: 1px solid #21262d;
  margin: 16px 0;
}

.status-bar {
  grid-column: 1 / -1;
  padding: 4px 16px;
  background: #161b22;
  border-top: 1px solid #21262d;
  font-size: 0.75rem;
  color: #484f58;
  display: flex;
  justify-content: space-between;
}

.empty-editor {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #484f58;
  font-size: 0.9rem;
  grid-column: 1 / -1;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "md-step-1",
      order: 1,
      title: "Import hooks",
      instruction:
        "Replace line 1 of App.jsx with imports for `useState`, `useEffect`, `useRef`, and `useCallback` from React.",
      explanation:
        "This project uses four hooks: `useState` for notes and editor state, `useEffect` for auto-save and keyboard shortcuts, `useRef` for DOM references (auto-focus), and `useCallback` for memoizing the debounced save function.",
      targetFile: "src/App.jsx",
      codeToWrite: `import { useState, useEffect, useRef, useCallback } from 'react'`,
      placement: { type: "replace-range", startLine: 1, endLine: 1 },
      highlightLines: [1, 1],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{[^}]*useState[^}]*useEffect[^}]*useRef[^}]*useCallback[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "All four hooks are imported",
        },
      ],
      deepExplanation:
        "Each hook serves a specific purpose: `useState` for reactive values, `useEffect` for side effects, `useRef` for mutable containers that don't trigger re-renders (DOM refs, interval IDs), and `useCallback` for creating stable function references. `useCallback` is new here — it memoizes a function so it doesn't get recreated on every render, which is important when that function is a dependency of useEffect or passed as a prop to child components.",
      concepts: ["useState", "useEffect", "useRef", "useCallback", "hooks"],
    },
    {
      id: "md-step-2",
      order: 2,
      title: "Create simple markdown parser function",
      instruction:
        "After the imports (line 2), create a function that converts markdown text to HTML using regex patterns. This goes outside the component.",
      explanation:
        "Regex-based parsing isn't as robust as a full parser library, but it teaches regex patterns and is sufficient for basic markdown. Each `.replace()` handles one markdown syntax: headings, bold, italic, code, lists, and horizontal rules.",
      targetFile: "src/App.jsx",
      codeToWrite: `
function parseMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\\n{2,}/g, '</p><p>')
    .replace(/^(?!<[hluopc])/gm, function(match) { return match === '' ? '<p>' : match })
}`,
      placement: { type: "line", line: 2 },
      highlightLines: [2, 16],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "function\\s+parseMarkdown",
          description: "parseMarkdown function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "\\.replace\\(",
          description: "Regex replacements are used",
        },
      ],
      deepExplanation:
        "Order matters in regex parsing — we process `###` before `##` before `#` so that `### heading` doesn't match the `#` rule first. The regex flags: `g` = global (replace all matches), `m` = multiline (^ and $ match line starts/ends, not just string start/end). The `.+?` is a non-greedy match — `*bold*` matches just the first pair of asterisks instead of spanning multiple pairs. This parser is intentionally simple. Production apps use libraries like `marked` or `remark`, but building one from scratch teaches regex fundamentals.",
      concepts: ["regex", "string replacement", "markdown", "parsing"],
    },
    {
      id: "md-step-3",
      order: 3,
      title: "Add notes state with localStorage initialization",
      instruction:
        "Inside the App function (around line 20), add state for the notes array, initialized from localStorage. Include a default welcome note.",
      explanation:
        "We store notes as an array of objects with id, title, content, and timestamp. The lazy initializer reads from localStorage, falling back to a welcome note. This teaches localStorage with complex data structures.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('markdown-notes')
    if (saved) return JSON.parse(saved)
    return [{
      id: Date.now(),
      title: 'Welcome',
      content: '# Welcome to Markdown Editor\\n\\nStart writing **markdown** and see it rendered in *real-time*!\\n\\n## Features\\n\\n- Live preview\\n- Auto-save\\n- Multiple notes',
      updatedAt: new Date().toISOString(),
    }]
  })`,
      placement: { type: "line", line: 20 },
      highlightLines: [20, 31],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[notes\\s*,\\s*setNotes\\]\\s*=\\s*useState\\(",
          description: "notes state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "localStorage\\.getItem\\(['\"]markdown-notes['\"]\\)",
          description: "Notes are loaded from localStorage",
        },
      ],
      deepExplanation:
        "Storing arrays of objects in localStorage requires JSON serialization. Each note has: `id` (unique identifier), `title` (extracted from content for display), `content` (the markdown text), and `updatedAt` (for sorting). The default note uses real markdown syntax so the user immediately sees the preview working. The `toISOString()` format (`2024-01-15T10:30:00.000Z`) is standard for timestamps — it sorts correctly as a string and works across time zones.",
      concepts: ["localStorage", "JSON", "lazy initialization", "data modeling"],
    },
    {
      id: "md-step-4",
      order: 4,
      title: "Add active note state and editor content",
      instruction:
        "After the notes state, add state for the active note ID and the current editor content.",
      explanation:
        "We track which note is selected (by ID) and keep a separate `editorContent` state for the textarea. Separating editor content from the notes array lets us implement debounced auto-save — the textarea updates immediately but the notes array updates after a delay.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [activeNoteId, setActiveNoteId] = useState(() => notes[0]?.id || null)
  const [editorContent, setEditorContent] = useState(() => notes[0]?.content || '')`,
      placement: { type: "line", line: 32 },
      highlightLines: [32, 33],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[activeNoteId\\s*,\\s*setActiveNoteId\\]",
          description: "activeNoteId state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[editorContent\\s*,\\s*setEditorContent\\]",
          description: "editorContent state is declared",
        },
      ],
      deepExplanation:
        "Why separate `editorContent` from the notes array? Performance and UX. If we updated the notes array on every keystroke, we'd be: (1) cloning the entire notes array, (2) serializing it to localStorage, (3) re-rendering every component that reads notes — all on every single character typed. Instead, `editorContent` updates instantly for responsive typing, and we periodically sync it back to the notes array (debounced auto-save). This separation of 'draft state' from 'persisted state' is a common pattern.",
      concepts: ["state separation", "draft state", "optional chaining", "performance"],
    },
    {
      id: "md-step-5",
      order: 5,
      title: "Build the Editor component",
      instruction:
        "In `src/Editor.jsx`, replace the entire file with a textarea component that receives content and an onChange callback.",
      explanation:
        "The Editor is a controlled textarea. It receives content and onChange as props — it doesn't manage its own state. The parent (App) owns the content state, keeping the data flow unidirectional.",
      targetFile: "src/Editor.jsx",
      codeToWrite: `import { useRef, useEffect } from 'react'

export default function Editor({ content, onChange, editorRef }) {
  useEffect(() => {
    if (editorRef?.current) {
      editorRef.current.focus()
    }
  }, [editorRef])

  return (
    <div className="editor-pane">
      <div className="pane-header">Editor</div>
      <textarea
        ref={editorRef}
        className="editor-textarea"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your markdown here..."
        spellCheck={false}
      />
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 23],
      validation: [
        {
          targetFile: "src/Editor.jsx",
          pattern: "function\\s+Editor\\s*\\(\\s*\\{\\s*content",
          description: "Editor accepts content prop",
        },
        {
          targetFile: "src/Editor.jsx",
          pattern: "ref=\\{editorRef\\}",
          description: "Textarea uses ref prop",
        },
        {
          targetFile: "src/Editor.jsx",
          pattern: "onChange.*e\\.target\\.value",
          description: "onChange passes value to parent",
        },
      ],
      deepExplanation:
        "The Editor receives a `ref` via the `editorRef` prop — this lets the parent control focus. The `useEffect` auto-focuses the textarea when the component mounts or the ref changes. `spellCheck={false}` disables browser spell checking, which is distracting when writing code/markdown. The component is intentionally simple — it's a 'dumb' presentational component that delegates all logic to the parent.",
      concepts: ["controlled textarea", "ref forwarding", "auto-focus", "presentational components"],
    },
    {
      id: "md-step-6",
      order: 6,
      title: "Build the Preview component with dangerouslySetInnerHTML",
      instruction:
        "In `src/Preview.jsx`, replace the entire file with a component that renders parsed markdown as HTML.",
      explanation:
        "React normally escapes HTML in JSX for security. `dangerouslySetInnerHTML` bypasses this to render raw HTML. It's called 'dangerous' because injecting user-provided HTML can cause XSS attacks — but since we're parsing our own markdown locally, it's safe here.",
      targetFile: "src/Preview.jsx",
      codeToWrite: `export default function Preview({ html }) {
  return (
    <div className="preview-pane">
      <div className="pane-header">Preview</div>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 11],
      validation: [
        {
          targetFile: "src/Preview.jsx",
          pattern: "function\\s+Preview\\s*\\(\\s*\\{\\s*html",
          description: "Preview accepts html prop",
        },
        {
          targetFile: "src/Preview.jsx",
          pattern: "dangerouslySetInnerHTML",
          description: "dangerouslySetInnerHTML is used for rendering",
        },
      ],
      deepExplanation:
        "React uses `dangerouslySetInnerHTML` instead of a simple `innerHTML` property to make developers think twice. The `__html` key is intentionally awkward — it's a reminder that you're opting out of React's XSS protection. Safe uses: rendering HTML from your own parser (like here), server-rendered HTML from a trusted source, or sanitized user content (using a library like DOMPurify). Unsafe uses: rendering raw user input without sanitization. In production, you'd use a library like `marked` + `DOMPurify` for security.",
      concepts: ["dangerouslySetInnerHTML", "XSS", "HTML rendering", "security"],
    },
    {
      id: "md-step-7",
      order: 7,
      title: "Wire editor and preview side-by-side",
      instruction:
        "In App.jsx, import the Editor and Preview components. Add them to the JSX with the parsed markdown preview.",
      explanation:
        "The split-pane layout shows editor and preview side-by-side. The preview updates in real-time as you type because every keystroke updates `editorContent`, which triggers `parseMarkdown` to produce new HTML.",
      targetFile: "src/App.jsx",
      codeToWrite: `import Editor from './Editor'
import Preview from './Preview'`,
      placement: { type: "line", line: 2 },
      highlightLines: [2, 3],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+Editor\\s+from\\s+['\"]\\./Editor['\"]",
          description: "Editor is imported",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+Preview\\s+from\\s+['\"]\\./Preview['\"]",
          description: "Preview is imported",
        },
      ],
      concepts: ["component imports", "split-pane layout"],
    },
    {
      id: "md-step-8",
      order: 8,
      title: "Build NoteList component",
      instruction:
        "In `src/NoteList.jsx`, replace the entire file with a component that renders the list of notes with click-to-select and delete buttons.",
      explanation:
        "NoteList receives the notes array, active note ID, and callback functions as props. It renders each note as a clickable item with a delete button that appears on hover. The active note is highlighted.",
      targetFile: "src/NoteList.jsx",
      codeToWrite: `export default function NoteList({ notes, activeNoteId, onSelect, onDelete, onNew, searchQuery, onSearchChange }) {
  const filteredNotes = searchQuery
    ? notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={onNew}>+ New</button>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="note-list">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className={\`note-item\${note.id === activeNoteId ? ' active' : ''}\`}
            onClick={() => onSelect(note.id)}
          >
            <span className="title">{note.title || 'Untitled'}</span>
            <button
              className="delete-btn"
              onClick={(e) => { e.stopPropagation(); onDelete(note.id) }}
            >
              \u00d7
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 38],
      validation: [
        {
          targetFile: "src/NoteList.jsx",
          pattern: "function\\s+NoteList\\s*\\(",
          description: "NoteList component is defined",
        },
        {
          targetFile: "src/NoteList.jsx",
          pattern: "filteredNotes",
          description: "Notes are filtered by search query",
        },
        {
          targetFile: "src/NoteList.jsx",
          pattern: "e\\.stopPropagation\\(\\)",
          description: "Delete click doesn't propagate to select",
        },
      ],
      deepExplanation:
        "The `e.stopPropagation()` on the delete button prevents the click from bubbling up to the parent div's `onClick` (which selects the note). Without it, clicking delete would also select the note. This is event bubbling in action — events travel up the DOM tree from child to parent. `stopPropagation()` stops that travel. The search filtering happens inside the component using `.filter()` — this is a pattern called 'derived rendering' where we compute what to display from props rather than storing it as separate state.",
      concepts: ["event propagation", "stopPropagation", "filtering", "list rendering"],
    },
    {
      id: "md-step-9",
      order: 9,
      title: "Add New Note functionality",
      instruction:
        "In App.jsx, add a function to create a new note and add it to the notes array. Also add the note selection handler.",
      explanation:
        "Creating a new note adds an object to the array, sets it as active, and clears the editor. Selecting a note loads its content into the editor. These operations follow the same immutable update patterns from the habit tracker.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled',
      content: '',
      updatedAt: new Date().toISOString(),
    }
    setNotes(prev => [newNote, ...prev])
    setActiveNoteId(newNote.id)
    setEditorContent('')
  }

  const selectNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (note) {
      setActiveNoteId(id)
      setEditorContent(note.content)
    }
  }`,
      placement: { type: "line", line: 36 },
      highlightLines: [36, 55],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+createNote\\s*=",
          description: "createNote function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+selectNote\\s*=",
          description: "selectNote function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setNotes\\(prev\\s*=>\\s*\\[newNote",
          description: "New note is prepended to array",
        },
      ],
      concepts: ["CRUD operations", "array prepend", "find", "state updates"],
    },
    {
      id: "md-step-10",
      order: 10,
      title: "Add delete note with confirmation",
      instruction:
        "After the selectNote function, add a deleteNote function that asks for confirmation before removing a note.",
      explanation:
        "Destructive actions should have confirmation. `window.confirm()` is the simplest way — it shows a native browser dialog. After deleting, if we deleted the active note, we switch to the next available note.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const deleteNote = (id) => {
    if (!window.confirm('Delete this note?')) return
    const remaining = notes.filter(n => n.id !== id)
    setNotes(remaining)
    if (id === activeNoteId) {
      const next = remaining[0]
      setActiveNoteId(next?.id || null)
      setEditorContent(next?.content || '')
    }
  }`,
      placement: { type: "line", line: 56 },
      highlightLines: [56, 65],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+deleteNote\\s*=",
          description: "deleteNote function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "window\\.confirm",
          description: "Confirmation dialog is shown",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "notes\\.filter\\(",
          description: "Note is removed with filter",
        },
      ],
      concepts: ["confirmation dialogs", "filter", "edge case handling", "fallback selection"],
    },
    {
      id: "md-step-11",
      order: 11,
      title: "Add auto-save with useCallback + debounce",
      instruction:
        "Add a debounced save function using useCallback and useRef for the timeout. This saves the editor content to the notes array after a delay.",
      explanation:
        "Debouncing means 'wait until the user stops typing for X ms, then save.' Without debouncing, every keystroke would trigger a save. useCallback ensures the function identity is stable (doesn't change on re-renders), and useRef holds the timeout ID.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const saveTimeoutRef = useRef(null)

  const debouncedSave = useCallback((content, noteId) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      setNotes(prev => prev.map(n =>
        n.id === noteId
          ? { ...n, content, title: content.split('\\n')[0].replace(/^#+ /, '') || 'Untitled', updatedAt: new Date().toISOString() }
          : n
      ))
    }, 500)
  }, [])

  const handleEditorChange = (content) => {
    setEditorContent(content)
    if (activeNoteId) {
      debouncedSave(content, activeNoteId)
    }
  }`,
      placement: { type: "line", line: 66 },
      highlightLines: [66, 83],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+saveTimeoutRef\\s*=\\s*useRef",
          description: "Timeout ref is created",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+debouncedSave\\s*=\\s*useCallback",
          description: "debouncedSave uses useCallback",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "clearTimeout\\(saveTimeoutRef\\.current\\)",
          description: "Previous timeout is cleared (debounce)",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setTimeout\\(",
          description: "Save is delayed with setTimeout",
        },
      ],
      deepExplanation:
        "Debouncing is a fundamental technique: each keystroke cancels the previous timer and starts a new one. Only when 500ms pass without a keystroke does the save actually happen. This reduces saves from hundreds (every keystroke) to a few (after typing pauses). `useCallback(fn, [])` memoizes the function — it's created once and reused, preventing unnecessary re-renders of child components that receive it as a prop. `useRef` holds the timeout ID because we need to clear it on the next keystroke but don't want changing it to trigger a re-render. The title extraction uses `split('\\n')[0]` to get the first line and regex to strip heading markers.",
      concepts: ["debouncing", "useCallback", "useRef", "setTimeout", "clearTimeout", "memoization"],
    },
    {
      id: "md-step-12",
      order: 12,
      title: "Add search/filter notes",
      instruction:
        "Add a `searchQuery` state to App and pass it to NoteList. The NoteList already handles filtering internally.",
      explanation:
        "Search state lives in App because it might affect other components in the future. NoteList handles the filtering logic — it receives the query and filters its display. This keeps concerns separated.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [searchQuery, setSearchQuery] = useState('')`,
      placement: { type: "line", line: 36 },
      highlightLines: [36, 36],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[searchQuery\\s*,\\s*setSearchQuery\\]\\s*=\\s*useState\\(['\"]['\"]\\)",
          description: "searchQuery state is declared",
        },
      ],
      concepts: ["search state", "filtering", "state lifting"],
    },
    {
      id: "md-step-13",
      order: 13,
      title: "Use useRef for auto-focus on editor",
      instruction:
        "Add a ref for the editor textarea and pass it to the Editor component. The editor should auto-focus when a note is selected.",
      explanation:
        "useRef creates a reference to a DOM element. By passing it to the Editor's textarea, we can programmatically focus it. The Editor component already handles the focus logic in its useEffect.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const editorRef = useRef(null)`,
      placement: { type: "line", line: 37 },
      highlightLines: [37, 37],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+editorRef\\s*=\\s*useRef\\(null\\)",
          description: "editorRef is created",
        },
      ],
      concepts: ["useRef", "DOM references", "auto-focus"],
    },
    {
      id: "md-step-14",
      order: 14,
      title: "Add word and character count display",
      instruction:
        "Add derived values for word count and character count, then add a status bar to the JSX.",
      explanation:
        "Word count uses `.trim().split()` to split on whitespace. Character count is just `.length`. These are derived values — no state needed. The status bar gives writers useful feedback.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const wordCount = editorContent.trim() ? editorContent.trim().split(/\\s+/).length : 0
  const charCount = editorContent.length`,
      placement: { type: "line", line: 88 },
      highlightLines: [88, 89],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+wordCount\\s*=",
          description: "wordCount is calculated",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+charCount\\s*=\\s*editorContent\\.length",
          description: "charCount is calculated",
        },
      ],
      deepExplanation:
        "`.split(/\\s+/)` splits on one or more whitespace characters (spaces, tabs, newlines). The regex `\\s+` is more robust than `.split(' ')` which would count multiple spaces as empty words. The ternary check `editorContent.trim() ? ... : 0` prevents an empty string from being counted as 1 word (since `''.split()` returns `['']`). These are pure derived values — they compute from state without side effects, recalculating automatically on every render. No useState needed.",
      concepts: ["derived values", "regex split", "word counting", "string methods"],
    },
    {
      id: "md-step-15",
      order: 15,
      title: "Add keyboard shortcuts",
      instruction:
        "Add a useEffect that listens for keyboard shortcuts: Ctrl+S to save immediately, Ctrl+N to create a new note.",
      explanation:
        "Keyboard shortcuts improve productivity. We use useEffect to add and clean up the event listener. The `e.preventDefault()` stops the browser's default Ctrl+S (save page) behavior. The cleanup function removes the listener when the component unmounts.",
      targetFile: "src/App.jsx",
      codeToWrite: `  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (activeNoteId) {
          setNotes(prev => prev.map(n =>
            n.id === activeNoteId
              ? { ...n, content: editorContent, title: editorContent.split('\\n')[0].replace(/^#+ /, '') || 'Untitled', updatedAt: new Date().toISOString() }
              : n
          ))
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        createNote()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeNoteId, editorContent, createNote])

  useEffect(() => {
    localStorage.setItem('markdown-notes', JSON.stringify(notes))
  }, [notes])`,
      placement: { type: "line", line: 90 },
      highlightLines: [90, 113],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "e\\.ctrlKey\\s*\\|\\|\\s*e\\.metaKey",
          description: "Ctrl/Cmd key is detected",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "e\\.key\\s*===\\s*['\"]s['\"]",
          description: "S key is detected for save",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "addEventListener\\(['\"]keydown['\"]",
          description: "Keyboard listener is added",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "removeEventListener\\(['\"]keydown['\"]",
          description: "Keyboard listener is cleaned up",
        },
      ],
      deepExplanation:
        "This effect demonstrates the full useEffect lifecycle: (1) Setup — add the event listener. (2) Cleanup — remove it before re-running or on unmount. The `e.metaKey` check handles Cmd on macOS (equivalent to Ctrl on Windows). `e.preventDefault()` is essential — without it, Ctrl+S would open the browser's 'Save Page' dialog. The dependency array `[activeNoteId, editorContent, createNote]` ensures the handler always has access to current values. The localStorage sync effect runs whenever `notes` changes, persisting the save.",
      concepts: ["keyboard events", "event listeners", "useEffect cleanup", "preventDefault", "localStorage sync"],
    },
  ],
};
