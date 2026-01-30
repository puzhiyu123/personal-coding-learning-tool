import type { GuidedBuildProject } from "./guided-builds";

export const taskBoardProject: GuidedBuildProject = {
  id: "guided-task-board",
  title: "Full-Stack Task Board",
  subtitle: "Build a Kanban-style task board with React frontend and Express backend",
  difficulty: "advanced",
  estimatedMinutes: 50,
  conceptsSummary: [
    "Full-Stack Architecture",
    "Fetch API",
    "CRUD Operations",
    "Optimistic Updates",
    "TypeScript Types",
    "Loading/Error States",
  ],
  description:
    "Build a complete full-stack Kanban task board with a React + TypeScript frontend and Express.js backend. You'll learn how to structure shared types, make fetch requests to your own API, implement CRUD operations, handle loading and error states, add optimistic updates for snappy UI, and recover from failed API calls. This ties together everything from the previous projects.",
  packageJson: {
    name: "task-board",
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
      express: "^4.18.2",
      cors: "^2.8.5",
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      typescript: "^5.0.0",
      vite: "^5.0.0",
      concurrently: "^8.0.0",
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
    <title>Task Board</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
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
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})`,
      language: "javascript",
      readOnly: true,
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
            lib: ["ES2020", "DOM", "DOM.Iterable"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
          },
          include: ["src"],
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "task-board",
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
            express: "^4.18.2",
            cors: "^2.8.5",
          },
          devDependencies: {
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@vitejs/plugin-react": "^4.0.0",
            typescript: "^5.0.0",
            vite: "^5.0.0",
            concurrently: "^8.0.0",
          },
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "src/main.tsx",
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
      language: "typescript",
      readOnly: true,
    },
    {
      path: "src/types.ts",
      content: `// Shared types — you'll define these first

export {}`,
      language: "typescript",
    },
    {
      path: "src/App.tsx",
      content: `// Task Board App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Task Board</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "typescript",
    },
    {
      path: "src/components/Board.tsx",
      content: `// Board component — you'll build this step by step

export default function Board() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/components/Column.tsx",
      content: `// Column component — you'll build this step by step

export default function Column() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/components/TaskCard.tsx",
      content: `// TaskCard component — you'll build this step by step

export default function TaskCard() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/components/AddTaskForm.tsx",
      content: `// AddTaskForm component — you'll build this step by step

export default function AddTaskForm() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "server/index.js",
      content: `// Express backend — you'll build this step by step

// Your code will go here
`,
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
  padding: 20px;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
}

.app > h1 {
  text-align: center;
  color: #58a6ff;
  margin-bottom: 24px;
  font-size: 1.75rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  min-height: 500px;
}

.column {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #30363d;
}

.column-header h2 {
  font-size: 1rem;
  font-weight: 600;
}

.column-header .count {
  background: #30363d;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  color: #8b949e;
}

.column.todo .column-header h2 { color: #58a6ff; }
.column.in-progress .column-header h2 { color: #d29922; }
.column.done .column-header h2 { color: #3fb950; }

.task-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-card {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 12px;
  transition: border-color 0.2s;
}

.task-card:hover {
  border-color: #58a6ff;
}

.task-card .title {
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.task-card .actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.task-card .actions button {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #30363d;
  background: transparent;
  color: #8b949e;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.task-card .actions button:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}

.task-card .actions button.delete:hover {
  border-color: #f85149;
  color: #f85149;
}

.add-task-form {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.add-task-form input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #30363d;
  background: #0d1117;
  color: #c9d1d9;
  font-size: 0.85rem;
  outline: none;
}

.add-task-form input:focus {
  border-color: #58a6ff;
}

.add-task-form button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #238636;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.add-task-form button:hover {
  background: #2ea043;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #8b949e;
}

.error-banner {
  background: #f8514922;
  border: 1px solid #f85149;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: #f85149;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-banner button {
  background: none;
  border: none;
  color: #f85149;
  cursor: pointer;
  font-size: 1.1rem;
}

.empty-column {
  text-align: center;
  padding: 20px;
  color: #484f58;
  font-size: 0.85rem;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "tb-step-1",
      order: 1,
      title: "Define shared types",
      instruction:
        "In `src/types.ts`, define the shared types that both frontend and backend will use: Task, TaskStatus, and Column type.",
      explanation:
        "Shared types are the contract between frontend and backend. By defining `TaskStatus` as a union type and `Task` with typed fields, we ensure both sides agree on the data shape.",
      targetFile: "src/types.ts",
      codeToWrite: `export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: number
  title: string
  status: TaskStatus
}

export interface ColumnConfig {
  id: TaskStatus
  title: string
}

export const COLUMNS: ColumnConfig[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]`,
      placement: { type: "replace-range", startLine: 1, endLine: 3 },
      highlightLines: [1, 18],
      validation: [
        {
          targetFile: "src/types.ts",
          pattern: "type\\s+TaskStatus\\s*=",
          description: "TaskStatus union type is defined",
        },
        {
          targetFile: "src/types.ts",
          pattern: "interface\\s+Task\\s*\\{",
          description: "Task interface is defined",
        },
        {
          targetFile: "src/types.ts",
          pattern: "status:\\s*TaskStatus",
          description: "Task status uses the union type",
        },
        {
          targetFile: "src/types.ts",
          pattern: "COLUMNS",
          description: "Column configuration is defined",
        },
      ],
      deepExplanation:
        "The `TaskStatus` union type restricts status values to exactly three options. This prevents bugs like setting status to 'in_progress' (underscore instead of hyphen). The `ColumnConfig` interface maps statuses to display titles. The `COLUMNS` array drives the board layout — adding a column is as simple as adding an entry. In a real full-stack app, you'd put these types in a shared package that both frontend and backend import.",
      concepts: ["union types", "shared types", "interface", "type safety"],
    },
    {
      id: "tb-step-2",
      order: 2,
      title: "Set up Express server with task store",
      instruction:
        "In `server/index.js`, set up the Express server with CORS, JSON parsing, and an in-memory task store.",
      explanation:
        "The backend serves the API that the frontend will consume. CORS (Cross-Origin Resource Sharing) allows the frontend (on port 5173) to make requests to the backend (on port 3001). The proxy in vite.config.js handles this in development.",
      targetFile: "server/index.js",
      codeToWrite: `import express from 'express'

const app = express()
app.use(express.json())

let nextId = 4
const tasks = [
  { id: 1, title: 'Design the UI mockup', status: 'done' },
  { id: 2, title: 'Set up project structure', status: 'in-progress' },
  { id: 3, title: 'Write API documentation', status: 'todo' },
]`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 11],
      validation: [
        {
          targetFile: "server/index.js",
          pattern: "import\\s+express",
          description: "Express is imported",
        },
        {
          targetFile: "server/index.js",
          pattern: "express\\.json\\(\\)",
          description: "JSON body parser is used",
        },
        {
          targetFile: "server/index.js",
          pattern: "const\\s+tasks\\s*=",
          description: "Tasks array is defined",
        },
      ],
      concepts: ["Express setup", "CORS", "in-memory store"],
    },
    {
      id: "tb-step-3",
      order: 3,
      title: "Add GET /api/tasks endpoint",
      instruction:
        "After the task store, add a GET endpoint that returns all tasks.",
      explanation:
        "This is the endpoint the frontend will call on mount to load the initial task list. It returns the full array as JSON.",
      targetFile: "server/index.js",
      codeToWrite: `app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})`,
      placement: { type: "line", line: 13 },
      highlightLines: [13, 15],
      validation: [
        {
          targetFile: "server/index.js",
          pattern: "app\\.get\\(['\"]\\/?api\\/tasks['\"]",
          description: "GET /api/tasks endpoint exists",
        },
      ],
      concepts: ["GET endpoint", "res.json"],
    },
    {
      id: "tb-step-4",
      order: 4,
      title: "Add POST /api/tasks endpoint",
      instruction:
        "After the GET endpoint, add POST, PUT, and DELETE endpoints, then start the server.",
      explanation:
        "The full CRUD API: POST creates tasks, PUT updates status, DELETE removes tasks. The server listens on port 3001 to avoid conflicting with Vite's port 5173.",
      targetFile: "server/index.js",
      codeToWrite: `app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'Title required' })
  const task = { id: nextId++, title, status: 'todo' }
  tasks.push(task)
  res.status(201).json(task)
})

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) return res.status(404).json({ error: 'Task not found' })
  if (req.body.title !== undefined) task.title = req.body.title
  if (req.body.status !== undefined) task.status = req.body.status
  res.json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Task not found' })
  tasks.splice(index, 1)
  res.status(204).send()
})

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001')
})`,
      placement: { type: "line", line: 17 },
      highlightLines: [17, 42],
      validation: [
        {
          targetFile: "server/index.js",
          pattern: "app\\.post",
          description: "POST endpoint exists",
        },
        {
          targetFile: "server/index.js",
          pattern: "app\\.put",
          description: "PUT endpoint exists",
        },
        {
          targetFile: "server/index.js",
          pattern: "app\\.delete",
          description: "DELETE endpoint exists",
        },
        {
          targetFile: "server/index.js",
          pattern: "app\\.listen\\(3001",
          description: "Server runs on port 3001",
        },
      ],
      deepExplanation:
        "The backend provides four operations: list all tasks (GET), create a task (POST), update a task (PUT), and delete a task (DELETE). Each uses appropriate HTTP methods and status codes: 201 for created, 400 for bad input, 404 for not found, 204 for deleted. The server runs on port 3001 while Vite runs on 5173. The Vite proxy config forwards `/api` requests to the backend, so the frontend can use relative URLs like `/api/tasks`.",
      concepts: ["CRUD endpoints", "HTTP methods", "status codes", "port separation"],
    },
    {
      id: "tb-step-5",
      order: 5,
      title: "Build TaskCard component",
      instruction:
        "In `src/components/TaskCard.tsx`, build a card component that displays a task with action buttons.",
      explanation:
        "TaskCard receives a task and callbacks for status changes and deletion. The available status transitions depend on the current status — a 'todo' task can move to 'in-progress', but not directly to 'done'.",
      targetFile: "src/components/TaskCard.tsx",
      codeToWrite: `import type { Task, TaskStatus } from '../types'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const statusTransitions: Record<TaskStatus, { label: string; status: TaskStatus }[]> = {
    'todo': [{ label: 'Start', status: 'in-progress' }],
    'in-progress': [
      { label: 'Done', status: 'done' },
      { label: 'Back', status: 'todo' },
    ],
    'done': [{ label: 'Reopen', status: 'todo' }],
  }

  return (
    <div className="task-card">
      <div className="title">{task.title}</div>
      <div className="actions">
        {statusTransitions[task.status].map(({ label, status }) => (
          <button key={status} onClick={() => onStatusChange(task.id, status)}>
            {label}
          </button>
        ))}
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 34],
      validation: [
        {
          targetFile: "src/components/TaskCard.tsx",
          pattern: "interface\\s+TaskCardProps",
          description: "Props interface is defined",
        },
        {
          targetFile: "src/components/TaskCard.tsx",
          pattern: "onStatusChange.*TaskStatus",
          description: "Status change callback is typed",
        },
        {
          targetFile: "src/components/TaskCard.tsx",
          pattern: "statusTransitions",
          description: "Status transitions are defined",
        },
      ],
      deepExplanation:
        "The `statusTransitions` object is a state machine definition — it maps each status to its valid transitions. A `Record<TaskStatus, ...>` type ensures every status is covered. This prevents invalid transitions (e.g., 'done' directly back to 'in-progress'). Each transition has a user-friendly label and the target status. The component is purely presentational — it doesn't know about the API or how tasks are stored.",
      concepts: ["state machines", "Record type", "status transitions", "presentational components"],
    },
    {
      id: "tb-step-6",
      order: 6,
      title: "Build Column component",
      instruction:
        "In `src/components/Column.tsx`, create a column that renders filtered tasks.",
      explanation:
        "Each Column receives all tasks and filters them by status. It renders TaskCards for matching tasks and shows an empty state when the column is empty.",
      targetFile: "src/components/Column.tsx",
      codeToWrite: `import type { Task, TaskStatus, ColumnConfig } from '../types'
import TaskCard from './TaskCard'

interface ColumnProps {
  config: ColumnConfig
  tasks: Task[]
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export default function Column({ config, tasks, onStatusChange, onDelete }: ColumnProps) {
  const columnTasks = tasks.filter(t => t.status === config.id)

  return (
    <div className={\`column \${config.id}\`}>
      <div className="column-header">
        <h2>{config.title}</h2>
        <span className="count">{columnTasks.length}</span>
      </div>
      <div className="task-list">
        {columnTasks.length === 0 ? (
          <div className="empty-column">No tasks</div>
        ) : (
          columnTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 36],
      validation: [
        {
          targetFile: "src/components/Column.tsx",
          pattern: "tasks\\.filter\\(t\\s*=>\\s*t\\.status",
          description: "Tasks are filtered by column status",
        },
        {
          targetFile: "src/components/Column.tsx",
          pattern: "<TaskCard",
          description: "TaskCards are rendered",
        },
        {
          targetFile: "src/components/Column.tsx",
          pattern: "columnTasks\\.length",
          description: "Task count is shown",
        },
      ],
      concepts: ["filtering", "component composition", "empty state"],
    },
    {
      id: "tb-step-7",
      order: 7,
      title: "Build Board component with three columns",
      instruction:
        "In `src/components/Board.tsx`, create the board that renders three columns using the COLUMNS config.",
      explanation:
        "The Board component maps over the COLUMNS configuration array to render each column. It passes tasks and callbacks down. This data-driven approach means adding a column only requires a config change.",
      targetFile: "src/components/Board.tsx",
      codeToWrite: `import type { Task, TaskStatus } from '../types'
import { COLUMNS } from '../types'
import Column from './Column'

interface BoardProps {
  tasks: Task[]
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export default function Board({ tasks, onStatusChange, onDelete }: BoardProps) {
  return (
    <div className="board">
      {COLUMNS.map(col => (
        <Column
          key={col.id}
          config={col}
          tasks={tasks}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 25],
      validation: [
        {
          targetFile: "src/components/Board.tsx",
          pattern: "COLUMNS\\.map",
          description: "Columns are rendered from config",
        },
        {
          targetFile: "src/components/Board.tsx",
          pattern: "<Column",
          description: "Column components are rendered",
        },
      ],
      concepts: ["data-driven UI", "component composition", "config arrays"],
    },
    {
      id: "tb-step-8",
      order: 8,
      title: "Fetch tasks on mount with useEffect",
      instruction:
        "In `src/App.tsx`, set up state and fetch tasks from the API on mount.",
      explanation:
        "The App component owns the task state and fetches from the API. The `useEffect` with empty deps `[]` runs once on mount. We track loading and error states to show appropriate UI during the fetch.",
      targetFile: "src/App.tsx",
      codeToWrite: `import { useState, useEffect } from 'react'
import type { Task, TaskStatus } from './types'
import Board from './components/Board'
import AddTaskForm from './components/AddTaskForm'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tasks')
        return res.json()
      })
      .then((data: Task[]) => {
        setTasks(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])`,
      placement: { type: "replace-range", startLine: 1, endLine: 11 },
      highlightLines: [1, 25],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useState<Task\\[\\]>",
          description: "Tasks state is typed",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "fetch\\(['\"]\\/?api\\/tasks['\"]\\)",
          description: "Tasks are fetched from API",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "setLoading",
          description: "Loading state is managed",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "setError",
          description: "Error state is managed",
        },
      ],
      deepExplanation:
        "The fetch lifecycle has three states: loading (waiting for response), success (data received), and error (request failed). We track all three with state. The `!res.ok` check catches HTTP errors (like 500) that fetch doesn't treat as exceptions — fetch only rejects on network errors. The `.catch()` handles both network errors and our thrown error. Setting `loading: false` in both success and error paths ensures the loading spinner always disappears.",
      concepts: ["useEffect", "fetch API", "loading states", "error handling", "data fetching"],
    },
    {
      id: "tb-step-9",
      order: 9,
      title: "Add loading and error UI",
      instruction:
        "Add the return statement with loading, error, and success rendering states.",
      explanation:
        "The three states (loading, error, data) each get their own UI. Error includes a dismiss button. The Board and AddTaskForm only render when data is loaded successfully.",
      targetFile: "src/App.tsx",
      codeToWrite: `  const handleAddTask = async (title: string) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!res.ok) throw new Error('Failed to create task')
    const newTask: Task = await res.json()
    setTasks(prev => [...prev, newTask])
  }

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    // Optimistic update
    const previousTasks = [...tasks]
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))

    try {
      const res = await fetch(\`/api/tasks/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update task')
    } catch {
      // Rollback on failure
      setTasks(previousTasks)
      setError('Failed to update task. Change has been reverted.')
    }
  }

  const handleDelete = async (id: number) => {
    const previousTasks = [...tasks]
    setTasks(prev => prev.filter(t => t.id !== id))

    try {
      const res = await fetch(\`/api/tasks/\${id}\`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
    } catch {
      setTasks(previousTasks)
      setError('Failed to delete task. It has been restored.')
    }
  }

  if (loading) {
    return (
      <div className="app">
        <h1>Task Board</h1>
        <div className="loading">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Task Board</h1>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>\u00d7</button>
        </div>
      )}

      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <AddTaskForm onAdd={handleAddTask} />
    </div>
  )
}`,
      placement: { type: "line", line: 26 },
      highlightLines: [26, 97],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "handleAddTask",
          description: "Add task handler exists",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "handleStatusChange",
          description: "Status change handler exists",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "handleDelete",
          description: "Delete handler exists",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "previousTasks",
          description: "Previous state saved for rollback",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "loading",
          description: "Loading state is rendered",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "error-banner",
          description: "Error state is rendered",
        },
      ],
      deepExplanation:
        "This step implements the core full-stack pattern: UI action -> optimistic update -> API call -> rollback on failure. The `handleStatusChange` first saves the current state (`previousTasks`), then immediately updates the UI (optimistic), then makes the API call. If the API fails, it restores the saved state (rollback). This makes the UI feel instant while keeping data consistent. The `handleAddTask` is not optimistic because we need the server-assigned ID before we can display the task.",
      concepts: ["optimistic updates", "rollback", "async/await", "fetch POST/PUT/DELETE", "error recovery"],
    },
    {
      id: "tb-step-10",
      order: 10,
      title: "Build AddTaskForm component",
      instruction:
        "In `src/components/AddTaskForm.tsx`, create a form for adding new tasks.",
      explanation:
        "AddTaskForm takes an `onAdd` callback and manages its own input state. On submit, it calls the callback and clears the input.",
      targetFile: "src/components/AddTaskForm.tsx",
      codeToWrite: `import { useState } from 'react'

interface AddTaskFormProps {
  onAdd: (title: string) => Promise<void>
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || submitting) return
    setSubmitting(true)
    try {
      await onAdd(title.trim())
      setTitle('')
    } catch {
      // Error handled by parent
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new task..."
        disabled={submitting}
      />
      <button type="submit" disabled={submitting || !title.trim()}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 40],
      validation: [
        {
          targetFile: "src/components/AddTaskForm.tsx",
          pattern: "onAdd:\\s*\\(title:\\s*string\\)\\s*=>\\s*Promise<void>",
          description: "onAdd callback accepts string and returns Promise",
        },
        {
          targetFile: "src/components/AddTaskForm.tsx",
          pattern: "await\\s+onAdd",
          description: "Form awaits the async callback",
        },
        {
          targetFile: "src/components/AddTaskForm.tsx",
          pattern: "setSubmitting",
          description: "Submitting state prevents double-submit",
        },
      ],
      deepExplanation:
        "The `Promise<void>` return type on `onAdd` lets the form `await` the async operation. This means the form knows when the task was successfully added and can clear the input. The `finally` block ensures `submitting` resets even if the callback throws. The `disabled` prop on both input and button prevents interaction during submission — a common UX pattern to prevent duplicate submissions.",
      concepts: ["async callbacks", "Promise<void>", "form submission", "double-submit prevention"],
    },
    {
      id: "tb-step-11",
      order: 11,
      title: "Verify POST creates task and updates state",
      instruction:
        "The POST flow is already implemented: AddTaskForm calls `onAdd` -> `handleAddTask` sends POST to `/api/tasks` -> server returns the created task with ID -> frontend adds it to state.",
      explanation:
        "The create flow is straightforward: send data to API, get back the created resource with its server-assigned ID, add it to local state. This ensures the frontend and backend are in sync.",
      targetFile: "src/App.tsx",
      codeToWrite: `  // POST flow:
  // 1. User types title in AddTaskForm, submits
  // 2. handleAddTask sends POST /api/tasks with { title }
  // 3. Server creates task with auto-incremented ID, returns it
  // 4. setTasks adds the new task to local state`,
      placement: { type: "line", line: 35 },
      highlightLines: [35, 39],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "method:\\s*['\"]POST['\"]",
          description: "POST method is used",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "setTasks\\(prev\\s*=>\\s*\\[\\.\\.\\.prev",
          description: "New task is appended to state",
        },
      ],
      concepts: ["create flow", "POST request", "state sync"],
    },
    {
      id: "tb-step-12",
      order: 12,
      title: "Verify status change with PUT",
      instruction:
        "The status change flow uses optimistic updates: update UI immediately, then send PUT to the API. If the API fails, roll back to the previous state.",
      explanation:
        "Optimistic updates make the UI feel instant. Instead of waiting for the server to confirm, we update the UI first and assume success. If the server reports an error, we undo the change.",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Optimistic status change flow:
  // 1. Save current tasks (for potential rollback)
  // 2. Update UI immediately (setTasks with new status)
  // 3. Send PUT /api/tasks/:id to backend
  // 4. If PUT fails -> restore saved state (rollback) + show error`,
      placement: { type: "line", line: 45 },
      highlightLines: [45, 49],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "const\\s+previousTasks",
          description: "Previous state is saved for rollback",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "method:\\s*['\"]PUT['\"]",
          description: "PUT method is used",
        },
      ],
      concepts: ["optimistic updates", "PUT request", "rollback"],
    },
    {
      id: "tb-step-13",
      order: 13,
      title: "Verify DELETE removes task",
      instruction:
        "The delete flow is also optimistic: remove from UI immediately, then send DELETE to API. On failure, restore the removed task.",
      explanation:
        "Delete follows the same optimistic pattern as status change. The task disappears from the board immediately. If the DELETE request fails, the task reappears (rollback).",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Optimistic delete flow:
  // 1. Save current tasks
  // 2. Remove task from UI with .filter()
  // 3. Send DELETE /api/tasks/:id
  // 4. On failure -> restore saved state + show error`,
      placement: { type: "line", line: 55 },
      highlightLines: [55, 59],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "method:\\s*['\"]DELETE['\"]",
          description: "DELETE method is used",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "prev\\.filter",
          description: "Task is removed with filter",
        },
      ],
      concepts: ["optimistic delete", "DELETE request", "rollback"],
    },
    {
      id: "tb-step-14",
      order: 14,
      title: "Review optimistic update pattern",
      instruction:
        "Optimistic updates are already implemented for both status change and delete. Let's review the pattern: save previous state -> update UI -> API call -> rollback on error.",
      explanation:
        "The optimistic update pattern has three parts: (1) snapshot current state, (2) apply change to UI immediately, (3) send to server asynchronously. If the server fails, restore the snapshot. This gives users instant feedback while maintaining data consistency.",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Optimistic update pattern (used for status change and delete):
  //
  // const previousState = [...currentState]  // 1. Snapshot
  // setState(optimisticNewState)             // 2. Update UI
  // try {
  //   await fetch(...)                       // 3. Send to server
  // } catch {
  //   setState(previousState)               // 4. Rollback on error
  //   setError('Something went wrong')
  // }`,
      placement: { type: "line", line: 60 },
      highlightLines: [60, 69],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "previousTasks",
          description: "State snapshot exists for rollback",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "setTasks\\(previousTasks\\)",
          description: "Rollback restores previous state",
        },
      ],
      deepExplanation:
        "Optimistic updates are used by major apps like Twitter (now X), Facebook, and Notion. When you 'like' a tweet, the heart fills immediately — the API call happens in the background. If it fails, the heart unfills. This approach works well when: (1) most requests succeed (>99%), (2) the operation is reversible, (3) instant feedback matters. It wouldn't be appropriate for irreversible operations like sending money. The key is always saving the previous state so you can roll back.",
      concepts: ["optimistic updates", "rollback pattern", "UX responsiveness", "error recovery"],
    },
    {
      id: "tb-step-15",
      order: 15,
      title: "Verify error recovery and dismissal",
      instruction:
        "Error recovery is already implemented. When an optimistic update fails, the UI reverts to the previous state and an error banner appears. The user can dismiss it with the X button.",
      explanation:
        "The error banner pattern provides non-blocking error feedback. It doesn't prevent the user from continuing to use the app. The dismiss button clears the error by setting it to null. Errors from optimistic update failures are descriptive — they tell the user what happened and that it was reverted.",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Error recovery flow:
  // 1. API call fails in try/catch
  // 2. Rollback restores previous state
  // 3. setError shows descriptive error banner
  // 4. User clicks X to dismiss -> setError(null)
  // 5. App continues working normally`,
      placement: { type: "line", line: 70 },
      highlightLines: [70, 75],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "setError\\(null\\)",
          description: "Error can be dismissed",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "error-banner",
          description: "Error banner is shown",
        },
      ],
      concepts: ["error recovery", "error dismissal", "non-blocking errors", "resilient UI"],
    },
  ],
};
