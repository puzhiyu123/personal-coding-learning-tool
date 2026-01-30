import type { GuidedBuildProject } from "./guided-builds";

export const useLocalStorageProject: GuidedBuildProject = {
  id: "guided-use-local-storage",
  title: "Custom Hook: useLocalStorage",
  subtitle: "Build a reusable, type-safe useLocalStorage hook with generics",
  difficulty: "intermediate",
  estimatedMinutes: 30,
  conceptsSummary: [
    "Custom Hooks",
    "TypeScript Generics",
    "localStorage API",
    "JSON Serialization",
    "Lazy Initialization",
    "Error Handling",
  ],
  description:
    "Build a reusable `useLocalStorage` hook from scratch using TypeScript generics. You'll learn how to create custom hooks, use generic type parameters for type-safe storage, handle JSON serialization/deserialization, and manage edge cases. Then you'll build a Settings component that uses the hook for multiple data types.",
  packageJson: {
    name: "use-local-storage",
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
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      typescript: "^5.0.0",
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
    <title>useLocalStorage Hook</title>
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
          name: "use-local-storage",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: { dev: "vite", build: "vite build" },
          dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
          devDependencies: {
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@vitejs/plugin-react": "^4.0.0",
            typescript: "^5.0.0",
            vite: "^5.0.0",
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
      path: "src/App.tsx",
      content: `// useLocalStorage Hook Demo
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Settings</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "typescript",
    },
    {
      path: "src/hooks/useLocalStorage.ts",
      content: `// Custom useLocalStorage hook — you'll build this step by step

export function useLocalStorage() {
  // TODO: implement
}`,
      language: "typescript",
    },
    {
      path: "src/Settings.tsx",
      content: `// Settings component — uses the custom hook

export default function Settings() {
  return null
}`,
      language: "typescript",
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
  background: #0f0f23;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #ffd43b;
  font-size: 1.5rem;
}

.setting-group {
  margin-bottom: 20px;
  padding: 16px;
  background: #16213e;
  border-radius: 10px;
  border: 1px solid #2a2a4a;
}

.setting-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #a0a0b0;
}

.setting-group input[type="text"] {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #0f3460;
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
}

.setting-group input[type="text"]:focus {
  border-color: #ffd43b;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle-switch {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #2a2a4a;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-switch.active {
  background: #ffd43b;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
}

.toggle-switch.active::after {
  transform: translateX(20px);
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.favorites-list .tag {
  padding: 4px 12px;
  background: #0f3460;
  border-radius: 16px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.favorites-list .tag button {
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}

.add-favorite {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.add-favorite input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #0f3460;
  color: #e0e0e0;
  font-size: 0.85rem;
  outline: none;
}

.add-favorite button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ffd43b;
  color: #1a1a2e;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ff6b6b33;
  background: transparent;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 16px;
  transition: all 0.2s;
}

.clear-btn:hover {
  border-color: #ff6b6b;
  background: #ff6b6b11;
}

.storage-info {
  margin-top: 16px;
  padding: 12px;
  background: #16213e;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #6272a4;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "ls-step-1",
      order: 1,
      title: "Create the generic function signature",
      instruction:
        "In `src/hooks/useLocalStorage.ts`, replace the placeholder with a generic function signature. The `<T>` type parameter lets this hook work with any data type.",
      explanation:
        "TypeScript generics let you write functions that work with any type while maintaining type safety. The `<T>` is a type parameter — like a variable for types. When someone calls `useLocalStorage<string>('key', 'default')`, T becomes `string`.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // We'll build the implementation step by step
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 4],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "function\\s+useLocalStorage<T>",
          description: "Function has generic type parameter T",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "key:\\s*string",
          description: "key parameter is typed as string",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "initialValue:\\s*T",
          description: "initialValue uses the generic type T",
        },
      ],
      deepExplanation:
        "Generics are TypeScript's way of creating reusable, type-safe code. Without generics, we'd need separate hooks for each type: `useLocalStorageString`, `useLocalStorageNumber`, etc. With `<T>`, the type flows through: if `initialValue` is `string`, then `T = string`, and the return value will be typed as `string` too. The `key` is always a `string` because localStorage keys are strings. The `initialValue: T` means the initial value matches whatever type the caller specifies.",
      concepts: ["generics", "type parameters", "custom hooks"],
    },
    {
      id: "ls-step-2",
      order: 2,
      title: "Write the lazy initializer",
      instruction:
        "Inside the function body, add a `useState` with a lazy initializer function that reads from localStorage.",
      explanation:
        "The lazy initializer `() => { ... }` only runs once on mount. Inside it, we try to read from localStorage and parse the JSON. If the key doesn't exist, we fall back to the `initialValue`.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
      return initialValue
    }
  })
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [4, 12],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "useState<T>\\(\\(\\)\\s*=>",
          description: "State uses generic type with lazy initializer",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "localStorage\\.getItem\\(key\\)",
          description: "Reads from localStorage with the key",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "JSON\\.parse\\(item\\)\\s*as\\s*T",
          description: "Parsed value is cast to type T",
        },
      ],
      deepExplanation:
        "The `as T` type assertion tells TypeScript to trust that the parsed JSON matches type T. This is a necessary escape hatch because JSON.parse always returns `unknown` (or `any`) — TypeScript can't verify the shape of stored data at compile time. The try/catch handles corrupt data in localStorage (e.g., manually edited, or a different app wrote to the same key). Rather than crashing, we fall back to the initial value and log a warning. The `window.` prefix before localStorage is explicit — it helps with SSR safety checks later.",
      concepts: ["lazy initialization", "JSON.parse", "type assertion", "try/catch", "error recovery"],
    },
    {
      id: "ls-step-3",
      order: 3,
      title: "Add the setValue function",
      instruction:
        "After the useState, add a `setValue` function that updates both React state and localStorage.",
      explanation:
        "The `setValue` function mirrors `useState`'s setter — it accepts either a new value or a function that receives the previous value. It writes to both React state and localStorage, keeping them in sync.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(\`Error writing localStorage key "\${key}":\`, error)
    }
  }

  return [storedValue, setValue] as const
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 13 },
      highlightLines: [14, 23],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "value:\\s*T\\s*\\|\\s*\\(\\(prev:\\s*T\\)\\s*=>\\s*T\\)",
          description: "setValue accepts value or updater function",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "instanceof\\s+Function",
          description: "Checks if value is an updater function",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "JSON\\.stringify\\(valueToStore\\)",
          description: "Value is serialized before storing",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "as\\s+const",
          description: "Return tuple uses 'as const'",
        },
      ],
      deepExplanation:
        "The type `T | ((prev: T) => T)` mirrors React's useState setter API. Users can call `setValue('new')` or `setValue(prev => prev + 1)`. The `instanceof Function` check determines which form was used. `as const` on the return makes TypeScript infer a readonly tuple `[T, (value: ...) => void]` instead of a generic array `(T | Function)[]`. Without `as const`, destructuring would give both elements the union type, losing the distinction between the value and the setter.",
      concepts: ["union types", "function overloads", "JSON.stringify", "as const", "tuple types"],
    },
    {
      id: "ls-step-4",
      order: 4,
      title: "Build Settings with useLocalStorage<string>",
      instruction:
        "In `src/Settings.tsx`, import the hook and create a username setting that persists to localStorage.",
      explanation:
        "When we call `useLocalStorage<string>('username', '')`, TypeScript knows `username` is a `string` and `setUsername` only accepts strings. The hook handles all the localStorage read/write logic.",
      targetFile: "src/Settings.tsx",
      codeToWrite: `import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function Settings() {
  const [username, setUsername] = useLocalStorage<string>('username', '')

  return (
    <div>
      <div className="setting-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 20],
      validation: [
        {
          targetFile: "src/Settings.tsx",
          pattern: "useLocalStorage<string>\\(['\"]username['\"]",
          description: "useLocalStorage is called with string type",
        },
        {
          targetFile: "src/Settings.tsx",
          pattern: "value=\\{username\\}",
          description: "Input is controlled by hook value",
        },
      ],
      deepExplanation:
        "Notice how the hook call looks just like `useState` — that's intentional. Custom hooks should feel familiar. The `<string>` type parameter tells TypeScript that `username` is a `string`. If you tried `setUsername(42)`, TypeScript would error. The difference from plain useState is that the value survives page reloads — try entering a name, refreshing the page, and it'll still be there.",
      concepts: ["custom hook usage", "type parameters", "persistence"],
    },
    {
      id: "ls-step-5",
      order: 5,
      title: "Add useLocalStorage<boolean> for dark mode",
      instruction:
        "After the username setting, add a dark mode toggle using `useLocalStorage<boolean>`.",
      explanation:
        "Using the same hook with `<boolean>` instead of `<string>` shows generics in action. TypeScript enforces that `darkMode` is a `boolean` and `setDarkMode` only accepts booleans.",
      targetFile: "src/Settings.tsx",
      codeToWrite: `import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function Settings() {
  const [username, setUsername] = useLocalStorage<string>('username', '')
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false)

  return (
    <div>
      <div className="setting-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="setting-group">
        <label>Theme</label>
        <div className="toggle" onClick={() => setDarkMode(!darkMode)}>
          <div className={\`toggle-switch\${darkMode ? ' active' : ''}\`} />
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 20 },
      highlightLines: [6, 27],
      validation: [
        {
          targetFile: "src/Settings.tsx",
          pattern: "useLocalStorage<boolean>\\(['\"]darkMode['\"]",
          description: "Dark mode uses boolean type parameter",
        },
        {
          targetFile: "src/Settings.tsx",
          pattern: "setDarkMode\\(!darkMode\\)",
          description: "Dark mode toggles with negation",
        },
      ],
      deepExplanation:
        "The same hook handles both `string` and `boolean` types — that's the power of generics. Under the hood, `JSON.stringify(false)` stores `'false'` in localStorage, and `JSON.parse('false')` returns the boolean `false`. JSON serialization handles primitives (strings, numbers, booleans, null) and objects/arrays. The toggle UI uses a CSS-only switch — the `.active` class moves the circle with a CSS transform.",
      concepts: ["generics with different types", "boolean toggle", "CSS toggle switch"],
    },
    {
      id: "ls-step-6",
      order: 6,
      title: "Add useLocalStorage<string[]> for favorites",
      instruction:
        "Add a favorites list using `useLocalStorage<string[]>` with an add/remove interface.",
      explanation:
        "Using `<string[]>` shows the hook working with arrays. We use the functional updater form `setValue(prev => [...prev, newItem])` to add items immutably, just like regular React state.",
      targetFile: "src/Settings.tsx",
      codeToWrite: `import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function Settings() {
  const [username, setUsername] = useLocalStorage<string>('username', '')
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false)
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', [])
  const [newFavorite, setNewFavorite] = useState('')

  const addFavorite = () => {
    if (!newFavorite.trim() || favorites.includes(newFavorite.trim())) return
    setFavorites(prev => [...prev, newFavorite.trim()])
    setNewFavorite('')
  }

  const removeFavorite = (item: string) => {
    setFavorites(prev => prev.filter(f => f !== item))
  }

  return (
    <div>
      <div className="setting-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="setting-group">
        <label>Theme</label>
        <div className="toggle" onClick={() => setDarkMode(!darkMode)}>
          <div className={\`toggle-switch\${darkMode ? ' active' : ''}\`} />
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>

      <div className="setting-group">
        <label>Favorite Items</label>
        <div className="favorites-list">
          {favorites.map(item => (
            <span key={item} className="tag">
              {item}
              <button onClick={() => removeFavorite(item)}>\u00d7</button>
            </span>
          ))}
        </div>
        <div className="add-favorite">
          <input
            type="text"
            value={newFavorite}
            onChange={(e) => setNewFavorite(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addFavorite()}
            placeholder="Add a favorite..."
          />
          <button onClick={addFavorite}>Add</button>
        </div>
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 29 },
      highlightLines: [7, 18],
      validation: [
        {
          targetFile: "src/Settings.tsx",
          pattern: "useLocalStorage<string\\[\\]>\\(['\"]favorites['\"]",
          description: "Favorites uses string array type",
        },
        {
          targetFile: "src/Settings.tsx",
          pattern: "setFavorites\\(prev\\s*=>\\s*\\[\\.\\.\\.",
          description: "Favorites use functional updater with spread",
        },
        {
          targetFile: "src/Settings.tsx",
          pattern: "prev\\.filter\\(",
          description: "Remove uses filter for immutable deletion",
        },
      ],
      deepExplanation:
        "The functional updater `setFavorites(prev => [...prev, newItem])` is important here because our custom setValue mimics useState's API. It receives the current value and returns the new value. The `favorites.includes(newFavorite)` prevents duplicates. For removal, `.filter(f => f !== item)` creates a new array without the removed item. All three types — string, boolean, string[] — use the same hook. The JSON serialization handles arrays transparently: `JSON.stringify(['a', 'b'])` produces `'[\"a\",\"b\"]'`.",
      concepts: ["generic arrays", "functional updater", "immutable updates", "duplicate prevention"],
    },
    {
      id: "ls-step-7",
      order: 7,
      title: "Add SSR safety check",
      instruction:
        "In the `useLocalStorage` hook, add a check for the `window` object to handle server-side rendering safely.",
      explanation:
        "In Next.js and other SSR frameworks, code runs on the server where `window` and `localStorage` don't exist. Adding a `typeof window !== 'undefined'` check prevents crashes during server rendering.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(\`Error writing localStorage key "\${key}":\`, error)
    }
  }

  return [storedValue, setValue] as const
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 25 },
      highlightLines: [5, 7],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "typeof\\s+window\\s*!==\\s*['\"]undefined['\"]",
          description: "Window existence is checked for SSR safety",
        },
      ],
      deepExplanation:
        "The `typeof window` check is the standard way to detect server vs. client environments. On the server, `typeof window` returns `'undefined'` as a string. We check in two places: the initializer (don't try to read localStorage on the server) and setValue (don't try to write to localStorage on the server). On the server, the hook just uses the initial value and state updates happen in memory only. Once the app hydrates on the client, localStorage becomes available.",
      concepts: ["SSR safety", "typeof check", "window object", "hydration"],
    },
    {
      id: "ls-step-8",
      order: 8,
      title: "Add a 'clear all settings' button",
      instruction:
        "In `src/Settings.tsx`, add a button that clears all localStorage keys used by the Settings component.",
      explanation:
        "The clear button demonstrates `localStorage.removeItem()` for individual keys. We also reset the React state to initial values so the UI updates immediately.",
      targetFile: "src/Settings.tsx",
      codeToWrite: `      <button
        className="clear-btn"
        onClick={() => {
          setUsername('')
          setDarkMode(false)
          setFavorites([])
          localStorage.removeItem('username')
          localStorage.removeItem('darkMode')
          localStorage.removeItem('favorites')
        }}
      >
        Clear All Settings
      </button>

      <div className="storage-info">
        Stored keys: username, darkMode, favorites | Data persists across page reloads
      </div>`,
      placement: { type: "line", line: 63 },
      highlightLines: [63, 79],
      validation: [
        {
          targetFile: "src/Settings.tsx",
          pattern: "localStorage\\.removeItem",
          description: "localStorage items are removed on clear",
        },
        {
          targetFile: "src/Settings.tsx",
          pattern: "Clear All Settings",
          description: "Clear button is present",
        },
      ],
      deepExplanation:
        "We reset both React state and localStorage because our hook's setValue writes to both. Calling `setUsername('')` updates React state and localStorage via the hook, but using `localStorage.removeItem` is more thorough — it completely removes the key rather than storing an empty value. In a production app, you might add a `remove` function to the hook itself: `return [storedValue, setValue, remove] as const`.",
      concepts: ["localStorage.removeItem", "state reset", "cleanup"],
    },
    {
      id: "ls-step-9",
      order: 9,
      title: "Wire up App.tsx with Settings",
      instruction:
        "In `src/App.tsx`, import and render the Settings component.",
      explanation:
        "App.tsx is the shell that provides the layout. Settings contains all the hook usage.",
      targetFile: "src/App.tsx",
      codeToWrite: `// useLocalStorage Hook Demo
import Settings from './Settings'

export default function App() {
  return (
    <div className="app">
      <h1>Settings</h1>
      <Settings />
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 11 },
      highlightLines: [1, 11],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "import\\s+Settings\\s+from",
          description: "Settings component is imported",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "<Settings\\s*/>",
          description: "Settings component is rendered",
        },
      ],
      concepts: ["component composition", "imports"],
    },
    {
      id: "ls-step-10",
      order: 10,
      title: "Handle corrupt localStorage data gracefully",
      instruction:
        "The try/catch in the hook already handles corrupt data. Let's verify the error handling works by reviewing the pattern: if JSON.parse fails or localStorage throws, we fall back to initialValue.",
      explanation:
        "localStorage can have corrupt data (manual edits, different app versions, quota exceeded). The try/catch ensures the app never crashes due to storage issues. This is defensive programming — expect the unexpected.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `  // Error handling strategy:
  // - JSON.parse failure -> fall back to initialValue (corrupt data)
  // - localStorage.getItem failure -> fall back to initialValue (storage disabled)
  // - localStorage.setItem failure -> log warning (quota exceeded, private browsing)
  // The app always works, even if storage fails`,
      placement: { type: "line", line: 15 },
      highlightLines: [15, 19],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "try\\s*\\{[\\s\\S]*?catch",
          description: "Error handling with try/catch is present",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "console\\.warn",
          description: "Errors are logged as warnings",
        },
      ],
      concepts: ["error handling", "defensive programming", "graceful degradation"],
    },
    {
      id: "ls-step-11",
      order: 11,
      title: "Review the complete generic hook pattern",
      instruction:
        "The hook is complete. Let's review the full pattern: a generic function that reads from localStorage on mount, writes to localStorage on update, handles errors gracefully, and works with any serializable type.",
      explanation:
        "This hook demonstrates several advanced TypeScript and React patterns in a small, reusable package. Custom hooks are the primary way to share stateful logic between components in modern React.",
      targetFile: "src/hooks/useLocalStorage.ts",
      codeToWrite: `  // Hook API summary:
  // useLocalStorage<T>(key, initialValue) -> [value: T, setValue: (v: T | (prev: T) => T) => void]
  // - Generic <T> works with any serializable type
  // - Lazy initialization reads from localStorage once on mount
  // - setValue syncs React state + localStorage
  // - SSR-safe with typeof window check
  // - Error-resilient with try/catch`,
      placement: { type: "line", line: 20 },
      highlightLines: [20, 26],
      validation: [
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "useLocalStorage<T>",
          description: "Hook uses generic type parameter",
        },
        {
          targetFile: "src/hooks/useLocalStorage.ts",
          pattern: "as\\s+const",
          description: "Return type is a const tuple",
        },
      ],
      concepts: ["custom hooks", "generics", "reusability", "hook patterns"],
    },
  ],
};
