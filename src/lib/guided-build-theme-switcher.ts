import type { GuidedBuildProject } from "./guided-builds";

export const themeSwitcherProject: GuidedBuildProject = {
  id: "guided-theme-switcher",
  title: "Theme Switcher",
  subtitle: "Build a theme system with useContext and useReducer",
  difficulty: "intermediate",
  estimatedMinutes: 35,
  conceptsSummary: [
    "createContext",
    "useContext",
    "useReducer",
    "Provider Pattern",
    "CSS Variables",
    "Custom Hooks",
  ],
  description:
    "Build a theme switcher that manages global state with React Context. You'll learn createContext and useContext for sharing state without prop drilling, useReducer for predictable state updates, the Provider pattern, and how CSS variables enable dynamic theming. Includes system preference detection!",
  packageJson: {
    name: "theme-switcher",
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
    <title>Theme Switcher</title>
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
          name: "theme-switcher",
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
      content: `// Theme Switcher App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Theme Switcher</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "javascript",
    },
    {
      path: "src/ThemeContext.jsx",
      content: `// ThemeContext — you'll build the context, provider, and custom hook here

export default {}`,
      language: "javascript",
    },
    {
      path: "src/ThemeToggle.jsx",
      content: `// ThemeToggle component — you'll build this in a later step

export default function ThemeToggle() {
  return null
}`,
      language: "javascript",
    },
    {
      path: "src/Card.jsx",
      content: `// Card component — you'll build this in a later step

export default function Card() {
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

:root {
  --bg-primary: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --bg-card: #16213e;
  --text-primary: #e0e0e0;
  --text-secondary: #8888aa;
  --accent: #e94560;
  --border: #2a2a4a;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  padding: 40px 20px;
  transition: background 0.3s, color 0.3s;
}

.app {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 8px;
  color: var(--accent);
  font-size: 1.75rem;
}

.subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 32px;
}

.theme-toggle-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.theme-toggle-group button {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.theme-toggle-group button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.theme-toggle-group button:hover:not(.active) {
  border-color: var(--accent);
  color: var(--accent);
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.card h3 {
  color: var(--accent);
  margin-bottom: 8px;
  font-size: 1rem;
}

.card p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}

.demo-section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.demo-section h2 {
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.demo-section p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.current-theme {
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  border: 1px solid var(--border);
  transition: all 0.3s;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "ts-step-1",
      order: 1,
      title: "Create ThemeContext with createContext",
      instruction:
        "In `src/ThemeContext.jsx`, replace the entire file. Start by importing createContext, useContext, useReducer, and useEffect from React. Then create the context.",
      explanation:
        "createContext creates a 'channel' that lets you pass data through the component tree without prop drilling. The `null` default is used when a component tries to read the context without a Provider above it.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `import { createContext, useContext, useReducer, useEffect } from 'react'

const ThemeContext = createContext(null)`,
      placement: { type: "replace-range", startLine: 1, endLine: 3 },
      highlightLines: [1, 3],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "import\\s*\\{[^}]*createContext[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "createContext is imported",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "const\\s+ThemeContext\\s*=\\s*createContext\\(",
          description: "ThemeContext is created",
        },
      ],
      deepExplanation:
        "React Context solves the 'prop drilling' problem. Imagine you have a theme value in App and a deeply nested Button component that needs it. Without context, you'd pass `theme` as a prop through every intermediate component. With context, any component can read the theme directly, no matter how deep. createContext creates the 'mailbox' — we'll create a Provider (the sender) and useContext (the receiver) next.",
      concepts: ["createContext", "prop drilling", "context API"],
    },
    {
      id: "ts-step-2",
      order: 2,
      title: "Define theme objects",
      instruction:
        "After the createContext line, define light and dark theme objects with CSS variable values.",
      explanation:
        "These objects map CSS variable names to their values for each theme. When the theme changes, we'll apply these values to the document, which updates all CSS that uses `var(--variable-name)`.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `
const themes = {
  light: {
    '--bg-primary': '#f5f5f5',
    '--bg-secondary': '#ffffff',
    '--bg-card': '#ffffff',
    '--text-primary': '#1a1a2e',
    '--text-secondary': '#666680',
    '--accent': '#e94560',
    '--border': '#e0e0e0',
  },
  dark: {
    '--bg-primary': '#0f0f1a',
    '--bg-secondary': '#1a1a2e',
    '--bg-card': '#16213e',
    '--text-primary': '#e0e0e0',
    '--text-secondary': '#8888aa',
    '--accent': '#e94560',
    '--border': '#2a2a4a',
  },
}`,
      placement: { type: "line", line: 4 },
      highlightLines: [4, 24],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "const\\s+themes\\s*=",
          description: "themes object is defined",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "light:\\s*\\{",
          description: "Light theme is defined",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "dark:\\s*\\{",
          description: "Dark theme is defined",
        },
      ],
      deepExplanation:
        "CSS custom properties (variables) are perfect for theming because they cascade and can be changed at runtime via JavaScript. When we set `document.documentElement.style.setProperty('--bg-primary', '#f5f5f5')`, every CSS rule using `var(--bg-primary)` updates instantly — no need to update individual elements. This is more efficient than inline styles or toggling class names, and it works with all CSS including pseudo-elements and media queries.",
      concepts: ["CSS variables", "theme objects", "design tokens"],
    },
    {
      id: "ts-step-3",
      order: 3,
      title: "Write a reducer for theme actions",
      instruction:
        "After the themes object, write a reducer function that handles TOGGLE_THEME and SET_THEME actions.",
      explanation:
        "A reducer is a function that takes the current state and an action, and returns the new state. It's like a state machine — each action type produces a predictable result. useReducer is preferred over useState when state transitions have complex logic.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `
function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
    case 'SET_THEME':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}`,
      placement: { type: "line", line: 25 },
      highlightLines: [25, 35],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "function\\s+themeReducer",
          description: "themeReducer function is defined",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "case\\s+['\"]TOGGLE_THEME['\"]",
          description: "TOGGLE_THEME action is handled",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "case\\s+['\"]SET_THEME['\"]",
          description: "SET_THEME action is handled",
        },
      ],
      deepExplanation:
        "Reducers come from the Redux pattern and are built into React via `useReducer`. The key principle is: state transitions are explicit and predictable. Instead of calling `setMode('dark')` directly (which could be called from anywhere), you dispatch `{ type: 'SET_THEME', payload: 'dark' }`. This makes it easier to: (1) understand all possible state changes by reading the reducer, (2) log/debug state changes, (3) add new actions without touching existing code. The `default` case returns unchanged state for unknown actions — a safety net.",
      concepts: ["useReducer", "reducer pattern", "actions", "switch statement", "immutable state"],
    },
    {
      id: "ts-step-4",
      order: 4,
      title: "Build ThemeProvider with useReducer",
      instruction:
        "After the reducer, create the ThemeProvider component that wraps children with the context Provider.",
      explanation:
        "The Provider component holds the state (via useReducer) and makes it available to all children. It also applies the theme CSS variables to the document whenever the theme changes.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, { mode: 'dark' })

  useEffect(() => {
    const themeVars = themes[state.mode]
    if (themeVars) {
      Object.entries(themeVars).forEach(([prop, value]) => {
        document.documentElement.style.setProperty(prop, value)
      })
    }
  }, [state.mode])

  return (
    <ThemeContext.Provider value={{ mode: state.mode, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}`,
      placement: { type: "line", line: 36 },
      highlightLines: [36, 53],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "export\\s+function\\s+ThemeProvider",
          description: "ThemeProvider is exported",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "useReducer\\(themeReducer",
          description: "useReducer is used with themeReducer",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "ThemeContext\\.Provider",
          description: "ThemeContext.Provider wraps children",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "document\\.documentElement\\.style\\.setProperty",
          description: "CSS variables are applied to document",
        },
      ],
      deepExplanation:
        "The Provider pattern has three parts: (1) `useReducer` manages the state and gives us a `dispatch` function. (2) `useEffect` syncs the state to CSS variables whenever `state.mode` changes. (3) The `Provider` component wraps children and passes `{ mode, dispatch }` as the context value. Any child component can now read `mode` and call `dispatch` without props. `Object.entries()` converts an object to `[key, value]` pairs for iteration. `document.documentElement` is the `<html>` element — setting CSS variables there makes them available globally.",
      concepts: ["Provider pattern", "useReducer", "useEffect", "Object.entries", "CSS variables"],
    },
    {
      id: "ts-step-5",
      order: 5,
      title: "Export useTheme custom hook",
      instruction:
        "After the ThemeProvider, export a custom hook `useTheme` that wraps useContext for cleaner API.",
      explanation:
        "Custom hooks let you create a clean, reusable API. Instead of importing both ThemeContext and useContext everywhere, consumers just call `useTheme()`. The error check ensures it's used inside a Provider.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}`,
      placement: { type: "line", line: 54 },
      highlightLines: [54, 61],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "export\\s+function\\s+useTheme",
          description: "useTheme is exported",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "useContext\\(ThemeContext\\)",
          description: "useTheme wraps useContext",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "throw\\s+new\\s+Error",
          description: "Error is thrown if used outside Provider",
        },
      ],
      deepExplanation:
        "This pattern — wrapping useContext in a named hook — is a React best practice. Benefits: (1) Consumers don't need to import the context object, just the hook. (2) The error message tells developers exactly what's wrong if they forget the Provider. (3) You can add extra logic later (memoization, derived values) without changing consumers. (4) The name `useTheme` follows the hook naming convention (starts with `use`). This pattern is used by virtually every React library: `useRouter` (Next.js), `useSelector` (Redux), `useQuery` (React Query).",
      concepts: ["custom hooks", "useContext", "error boundaries", "API design"],
    },
    {
      id: "ts-step-6",
      order: 6,
      title: "Wrap App with ThemeProvider",
      instruction:
        "In `src/App.jsx`, import ThemeProvider from ThemeContext and wrap the app content with it.",
      explanation:
        "The Provider must be above all components that need the theme in the component tree. By wrapping the entire App, every component can access the theme.",
      targetFile: "src/App.jsx",
      codeToWrite: `import { ThemeProvider } from './ThemeContext'
import ThemeToggle from './ThemeToggle'
import Card from './Card'`,
      placement: { type: "replace-range", startLine: 1, endLine: 1 },
      highlightLines: [1, 3],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{\\s*ThemeProvider\\s*\\}\\s*from\\s*['\"]\\./ThemeContext['\"]",
          description: "ThemeProvider is imported",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+ThemeToggle",
          description: "ThemeToggle is imported",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+Card",
          description: "Card is imported",
        },
      ],
      concepts: ["imports", "Provider pattern"],
    },
    {
      id: "ts-step-7",
      order: 7,
      title: "Build ThemeToggle component",
      instruction:
        "In `src/ThemeToggle.jsx`, replace the entire file with a component that uses the useTheme hook to toggle between light and dark modes.",
      explanation:
        "ThemeToggle imports our custom hook `useTheme` — not the context directly. It dispatches actions to change the theme. This component demonstrates how any component can interact with context state.",
      targetFile: "src/ThemeToggle.jsx",
      codeToWrite: `import { useTheme } from './ThemeContext'

export default function ThemeToggle() {
  const { mode, dispatch } = useTheme()

  return (
    <div className="theme-toggle-group">
      <button
        className={mode === 'light' ? 'active' : ''}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
      >
        Light
      </button>
      <button
        className={mode === 'dark' ? 'active' : ''}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
      >
        Dark
      </button>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 22],
      validation: [
        {
          targetFile: "src/ThemeToggle.jsx",
          pattern: "import\\s*\\{\\s*useTheme\\s*\\}\\s*from",
          description: "useTheme hook is imported",
        },
        {
          targetFile: "src/ThemeToggle.jsx",
          pattern: "const\\s*\\{\\s*mode\\s*,\\s*dispatch\\s*\\}\\s*=\\s*useTheme\\(",
          description: "useTheme is destructured",
        },
        {
          targetFile: "src/ThemeToggle.jsx",
          pattern: "dispatch\\(\\{\\s*type:\\s*['\"]SET_THEME['\"]",
          description: "dispatch is called with SET_THEME action",
        },
      ],
      deepExplanation:
        "Notice how ThemeToggle doesn't receive any props — it reads directly from context via `useTheme()`. This is the power of context: the component can be placed anywhere in the tree and it will work, as long as there's a ThemeProvider above it. The `dispatch({ type: 'SET_THEME', payload: 'light' })` call follows the action pattern from our reducer. The reducer processes this action and returns the new state, which triggers a re-render of all components consuming the context.",
      concepts: ["useTheme", "dispatch", "actions", "context consumption"],
    },
    {
      id: "ts-step-8",
      order: 8,
      title: "Apply theme via CSS variables",
      instruction:
        "Update App.jsx to wrap the content with ThemeProvider and add the ThemeToggle. Replace the return statement with the wrapped version.",
      explanation:
        "The ThemeProvider must wrap everything that needs theme access. When the theme changes, the useEffect in ThemeProvider updates CSS variables on the document root, and all styled elements update automatically via CSS `var()` references.",
      targetFile: "src/App.jsx",
      codeToWrite: `export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Theme Switcher</h1>
        <p className="subtitle">Global state with React Context</p>
        <ThemeToggle />
        {/* Cards will go here */}
      </div>
    </ThemeProvider>
  )
}`,
      placement: { type: "replace-range", startLine: 6, endLine: 13 },
      highlightLines: [6, 17],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "<ThemeProvider>",
          description: "App is wrapped with ThemeProvider",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "<ThemeToggle",
          description: "ThemeToggle is rendered",
        },
      ],
      deepExplanation:
        "The CSS variables approach means we don't need to pass the theme to every component. Instead, the ThemeProvider sets variables on `document.documentElement` (the `<html>` tag), and CSS rules throughout the app use `var(--bg-primary)`, `var(--text-primary)`, etc. When these variables change, every element using them updates automatically. This is more efficient than conditional styles or className toggles because CSS handles the updates natively. The transition properties in our CSS ensure smooth animation between themes.",
      concepts: ["Provider wrapping", "CSS variables", "global theming"],
    },
    {
      id: "ts-step-9",
      order: 9,
      title: "Build Card component that reads theme from context",
      instruction:
        "In `src/Card.jsx`, replace the entire file with a component that uses useTheme to display theme-aware content.",
      explanation:
        "The Card component reads the theme from context to show what mode is active. It demonstrates that any component, no matter where it is in the tree, can access context without receiving props.",
      targetFile: "src/Card.jsx",
      codeToWrite: `import { useTheme } from './ThemeContext'

export default function Card({ title, children }) {
  const { mode } = useTheme()

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 12],
      validation: [
        {
          targetFile: "src/Card.jsx",
          pattern: "import\\s*\\{\\s*useTheme\\s*\\}\\s*from",
          description: "useTheme is imported",
        },
        {
          targetFile: "src/Card.jsx",
          pattern: "function\\s+Card\\s*\\(\\s*\\{\\s*title\\s*,\\s*children",
          description: "Card accepts title and children props",
        },
      ],
      concepts: ["context consumption", "children prop", "component composition"],
    },
    {
      id: "ts-step-10",
      order: 10,
      title: "Add system preference detection",
      instruction:
        "In ThemeContext.jsx, update the ThemeProvider to detect the user's system preference (light/dark) on mount using `window.matchMedia`.",
      explanation:
        "The `prefers-color-scheme` media query detects whether the user's OS is in dark mode. We use it to set the initial theme, respecting the user's system preference. This is how apps like GitHub and Twitter detect your preferred mode.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  }`,
      placement: { type: "line", line: 38 },
      highlightLines: [38, 43],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "window\\.matchMedia.*prefers-color-scheme",
          description: "System theme preference is detected",
        },
      ],
      deepExplanation:
        "`window.matchMedia` is a browser API that lets you test CSS media queries from JavaScript. `prefers-color-scheme: dark` matches when the user's OS is in dark mode (e.g., macOS Dark Mode, Windows dark theme). The `typeof window !== 'undefined'` check ensures this works during server-side rendering (where `window` doesn't exist). This is a progressive enhancement — if matchMedia isn't available, we default to dark.",
      concepts: ["matchMedia", "prefers-color-scheme", "progressive enhancement", "SSR safety"],
    },
    {
      id: "ts-step-11",
      order: 11,
      title: "Persist theme choice to localStorage",
      instruction:
        "Update the ThemeProvider to save the theme preference to localStorage and read it on initialization.",
      explanation:
        "Without persistence, the user's theme choice resets on every page reload. localStorage lets us remember their preference. We check localStorage first, then fall back to system preference, then default to dark.",
      targetFile: "src/ThemeContext.jsx",
      codeToWrite: `  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme-preference')
    if (saved === 'light' || saved === 'dark') return saved
    return getSystemTheme()
  }`,
      placement: { type: "line", line: 44 },
      highlightLines: [44, 48],
      validation: [
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "localStorage\\.getItem\\(['\"]theme-preference['\"]\\)",
          description: "Theme preference is read from localStorage",
        },
        {
          targetFile: "src/ThemeContext.jsx",
          pattern: "getSystemTheme\\(\\)",
          description: "Falls back to system theme",
        },
      ],
      concepts: ["localStorage", "initialization cascade", "user preferences"],
    },
    {
      id: "ts-step-12",
      order: 12,
      title: "Add a 'system' theme option",
      instruction:
        "Update the reducer to handle a SET_SYSTEM action, and add a 'System' button to ThemeToggle that follows the OS preference.",
      explanation:
        "A 'system' option lets users say 'just follow my OS setting.' This is common in modern apps. The reducer now handles three modes: light, dark, and system (which resolves to light or dark based on matchMedia).",
      targetFile: "src/ThemeToggle.jsx",
      codeToWrite: `import { useTheme } from './ThemeContext'

export default function ThemeToggle() {
  const { mode, dispatch } = useTheme()

  return (
    <div className="theme-toggle-group">
      <button
        className={mode === 'light' ? 'active' : ''}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
      >
        Light
      </button>
      <button
        className={mode === 'dark' ? 'active' : ''}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
      >
        Dark
      </button>
      <button
        className={mode === 'system' ? 'active' : ''}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'system' })}
      >
        System
      </button>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 22 },
      highlightLines: [1, 28],
      validation: [
        {
          targetFile: "src/ThemeToggle.jsx",
          pattern: "payload:\\s*['\"]system['\"]",
          description: "System theme option dispatches SET_THEME with system payload",
        },
      ],
      deepExplanation:
        "The 'system' mode is a meta-option — instead of directly setting light or dark, it delegates to the OS preference. This requires updating our ThemeProvider to resolve 'system' to an actual theme when applying CSS variables. The three-option pattern (light/dark/system) is the standard in modern apps like VS Code, GitHub, and Twitter. It balances user control with convenience.",
      concepts: ["system preference", "three-way toggle", "meta-options"],
    },
    {
      id: "ts-step-13",
      order: 13,
      title: "Add smooth CSS transitions",
      instruction:
        "In App.jsx, add sample cards to demonstrate the theme and show the current theme state. Replace the `{/* Cards will go here */}` comment.",
      explanation:
        "The cards demonstrate that the theme applies globally. The CSS already has `transition: all 0.3s` on themed elements, creating smooth color changes. The current-theme display proves context is being read correctly.",
      targetFile: "src/App.jsx",
      codeToWrite: `        <div className="card-grid">
          <Card title="Context API">
            Shares state globally without prop drilling through every component.
          </Card>
          <Card title="useReducer">
            Manages complex state transitions with predictable action-based updates.
          </Card>
          <Card title="CSS Variables">
            Dynamic theming via custom properties that cascade through all elements.
          </Card>
          <Card title="Custom Hooks">
            Reusable logic wrapped in a clean API that any component can consume.
          </Card>
        </div>
        <div className="demo-section">
          <h2>How It Works</h2>
          <p>
            The ThemeProvider at the top of the tree holds the current theme in a reducer.
            Any component can read or change it via the useTheme hook.
            CSS variables on the document root update instantly, and CSS transitions handle the animation.
          </p>
        </div>`,
      placement: { type: "replace-range", startLine: 13, endLine: 13 },
      highlightLines: [13, 33],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "<Card\\s+title=",
          description: "Card components are rendered",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "demo-section",
          description: "Demo section is rendered",
        },
      ],
      concepts: ["CSS transitions", "component composition", "demo content"],
    },
  ],
};
