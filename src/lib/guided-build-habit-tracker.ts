import type { GuidedBuildProject } from "./guided-builds";

export const habitTrackerProject: GuidedBuildProject = {
  id: "guided-habit-tracker",
  title: "Habit Tracker",
  subtitle: "Build a habit tracker with localStorage persistence",
  difficulty: "intermediate",
  estimatedMinutes: 35,
  conceptsSummary: [
    "useState with Arrays",
    "CRUD Operations",
    "useEffect",
    "localStorage",
    "List Rendering",
    "Component Composition",
  ],
  description:
    "Build a daily habit tracker that persists data to localStorage. You'll learn array state management (add, toggle, delete), side effects with useEffect, and how to break your UI into reusable components. This project teaches patterns you'll use in every real React app.",
  packageJson: {
    name: "habit-tracker",
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
    <title>Habit Tracker</title>
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
          name: "habit-tracker",
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
import './styles.css'

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
      content: `// Habit Tracker App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "javascript",
    },
    {
      path: "src/HabitItem.jsx",
      content: `// HabitItem component — you'll build this in a later step

export default function HabitItem() {
  return null
}`,
      language: "javascript",
    },
    {
      path: "src/styles.css",
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
  padding: 40px 20px;
}

.app {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 8px;
  color: #50fa7b;
  font-size: 1.75rem;
}

.subtitle {
  text-align: center;
  color: #6272a4;
  font-size: 0.875rem;
  margin-bottom: 24px;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.add-form input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #44475a;
  background: #282a36;
  color: #f8f8f2;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.add-form input:focus {
  border-color: #50fa7b;
}

.add-form button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #50fa7b;
  color: #282a36;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.add-form button:hover {
  opacity: 0.9;
}

.habit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #282a36;
  border-radius: 10px;
  border: 1px solid #44475a;
  transition: all 0.2s;
}

.habit-item.completed {
  opacity: 0.6;
  border-color: #50fa7b33;
}

.habit-item .checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #6272a4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  background: transparent;
  color: transparent;
  font-size: 14px;
}

.habit-item.completed .checkbox {
  border-color: #50fa7b;
  background: #50fa7b;
  color: #282a36;
}

.habit-item .name {
  flex: 1;
  font-size: 0.95rem;
}

.habit-item.completed .name {
  text-decoration: line-through;
  color: #6272a4;
}

.habit-item .streak {
  font-size: 0.75rem;
  color: #ffb86c;
  background: #ffb86c22;
  padding: 2px 8px;
  border-radius: 12px;
}

.habit-item .delete-btn {
  background: none;
  border: none;
  color: #ff5555;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 1.1rem;
  padding: 4px;
}

.habit-item:hover .delete-btn {
  opacity: 1;
}

.stats {
  margin-top: 24px;
  padding: 16px;
  background: #282a36;
  border-radius: 10px;
  border: 1px solid #44475a;
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #50fa7b;
}

.stat-label {
  font-size: 0.75rem;
  color: #6272a4;
  margin-top: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6272a4;
}

.empty-state .icon {
  font-size: 2rem;
  margin-bottom: 8px;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "ht-step-1",
      order: 1,
      title: "Import React hooks",
      instruction:
        "Replace line 1 of App.jsx with imports for both `useState` and `useEffect` from React.",
      explanation:
        "We need `useState` for managing our habits array and form input, and `useEffect` for syncing data to localStorage. These two hooks cover 90% of what you'll ever need in React.",
      targetFile: "src/App.jsx",
      codeToWrite: `import { useState, useEffect } from 'react'`,
      placement: { type: "replace-range", startLine: 1, endLine: 1 },
      highlightLines: [1, 1],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{[^}]*useState[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "useState is imported from React",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{[^}]*useEffect[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "useEffect is imported from React",
        },
      ],
      concepts: ["useState", "useEffect", "imports"],
    },
    {
      id: "ht-step-2",
      order: 2,
      title: "Import HabitItem component",
      instruction:
        "On line 2, add an import for the HabitItem component we'll build later.",
      explanation:
        "Component composition is key to React. We'll build HabitItem as a separate component so each habit row is self-contained. Importing it now means we can use it once we build the list.",
      targetFile: "src/App.jsx",
      codeToWrite: `import HabitItem from './HabitItem'`,
      placement: { type: "line", line: 2 },
      highlightLines: [2, 2],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+HabitItem\\s+from\\s+['\"]\\./HabitItem['\"]",
          description: "HabitItem component is imported",
        },
      ],
      concepts: ["component imports", "composition"],
    },
    {
      id: "ht-step-3",
      order: 3,
      title: "Add habits state with localStorage initialization",
      instruction:
        "Inside the App function (around line 7), add state for the habits array. We'll initialize it from localStorage using a function initializer.",
      explanation:
        "The function form of `useState(() => ...)` is called 'lazy initialization'. The function only runs once on mount, not on every render. This is important when the initial value is expensive to compute (like reading from localStorage and parsing JSON).",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  const [newHabit, setNewHabit] = useState('')`,
      placement: { type: "line", line: 7 },
      highlightLines: [7, 11],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[habits\\s*,\\s*setHabits\\]\\s*=\\s*useState\\(",
          description: "habits state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "localStorage\\.getItem\\(['\"]habits['\"]\\)",
          description: "Initial state reads from localStorage",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[newHabit\\s*,\\s*setNewHabit\\]\\s*=\\s*useState\\(['\"]['\"]\\)",
          description: "newHabit input state is declared",
        },
      ],
      deepExplanation:
        "Why use `useState(() => ...)` instead of `useState(localStorage.getItem(...))`? Without the function wrapper, `localStorage.getItem()` would run on every render, even though useState ignores the initial value after the first render. With the function wrapper, React only calls it once. This is a performance optimization that matters when the initialization involves I/O or complex computation. The `JSON.parse()` converts the stored string back to an array, and `?? []` provides a fallback empty array if nothing is stored yet.",
      concepts: ["lazy initialization", "localStorage", "JSON.parse", "fallback values"],
    },
    {
      id: "ht-step-4",
      order: 4,
      title: "Sync habits to localStorage with useEffect",
      instruction:
        "After the state declarations (around line 12), add a useEffect that saves habits to localStorage whenever they change.",
      explanation:
        "useEffect lets you run side effects (things that interact with the outside world) after React renders. The dependency array `[habits]` means this effect runs only when `habits` changes, not on every render.",
      targetFile: "src/App.jsx",
      codeToWrite: `  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])`,
      placement: { type: "line", line: 13 },
      highlightLines: [13, 15],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "useEffect\\(",
          description: "useEffect is used for side effects",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "localStorage\\.setItem\\(['\"]habits['\"]",
          description: "Habits are saved to localStorage",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "JSON\\.stringify\\(habits\\)",
          description: "Habits array is stringified for storage",
        },
      ],
      deepExplanation:
        "useEffect follows a mental model of 'synchronization'. You're saying: 'keep localStorage in sync with the habits state.' The dependency array `[habits]` tells React: 'only re-run this effect when habits changes.' If you omit the array, it runs after every render. If you pass an empty array `[]`, it runs only once on mount. The `JSON.stringify()` is necessary because localStorage can only store strings. This is a common pattern: useState for reading, useEffect for writing back.",
      concepts: ["useEffect", "dependency array", "localStorage", "JSON.stringify", "side effects"],
    },
    {
      id: "ht-step-5",
      order: 5,
      title: "Add the addHabit function",
      instruction:
        "After the useEffect (around line 17), add a function to create a new habit.",
      explanation:
        "When adding items to an array in React, you must create a new array (never mutate the existing one). The spread operator `...habits` copies existing items, then we add the new one. Each habit gets a unique ID using `Date.now()`.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const addHabit = () => {
    if (!newHabit.trim()) return
    setHabits([...habits, {
      id: Date.now(),
      name: newHabit.trim(),
      completedToday: false,
      streak: 0,
    }])
    setNewHabit('')
  }`,
      placement: { type: "line", line: 17 },
      highlightLines: [17, 26],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+addHabit\\s*=",
          description: "addHabit function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setHabits\\(\\[\\.\\.\\.",
          description: "New habit is added with spread operator",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "id:\\s*Date\\.now\\(\\)",
          description: "Habit gets a unique ID",
        },
      ],
      deepExplanation:
        "Immutability is a core React principle. When you write `setHabits([...habits, newItem])`, you're creating a brand new array with all old items plus the new one. React compares the new array reference to the old one and sees they're different, so it re-renders. If you did `habits.push(newItem); setHabits(habits)`, React would see the same array reference and might skip the re-render! The `newHabit.trim()` check prevents adding empty or whitespace-only habits. After adding, we clear the input by setting `newHabit` back to an empty string.",
      concepts: ["immutability", "spread operator", "Date.now", "trim", "array state"],
    },
    {
      id: "ht-step-6",
      order: 6,
      title: "Add toggle and delete functions",
      instruction:
        "After the addHabit function (around line 27), add functions to toggle completion and delete habits.",
      explanation:
        "Both functions use `.map()` and `.filter()` — the two essential array methods for updating state immutably. Map creates a new array with one item changed, filter creates a new array with one item removed.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const toggleHabit = (id) => {
    setHabits(habits.map(h =>
      h.id === id
        ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : h.streak - 1 }
        : h
    ))
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id))
  }`,
      placement: { type: "line", line: 27 },
      highlightLines: [27, 37],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+toggleHabit\\s*=",
          description: "toggleHabit function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "habits\\.map\\(",
          description: "Toggle uses .map() for immutable update",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+deleteHabit\\s*=",
          description: "deleteHabit function is defined",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "habits\\.filter\\(",
          description: "Delete uses .filter() for immutable removal",
        },
      ],
      deepExplanation:
        "`.map()` iterates over every item and returns a new array. For the matching ID, we return a modified copy (`{ ...h, completedToday: !h.completedToday }`); for all others, we return the original `h`. The spread `...h` copies all existing properties, then we override just the ones we want to change. `.filter()` creates a new array with only the items that pass the test. `h.id !== id` keeps everything except the one we're deleting. These two patterns — map-to-update and filter-to-delete — are the foundation of all CRUD operations in React.",
      concepts: ["map", "filter", "immutable updates", "spread operator", "CRUD"],
    },
    {
      id: "ht-step-7",
      order: 7,
      title: "Add computed stats",
      instruction:
        "After the delete function (around line 38), add derived values for the stats display.",
      explanation:
        "Just like in the tip calculator, we derive values from state rather than storing them. These stats update automatically whenever the habits array changes.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const completedCount = habits.filter(h => h.completedToday).length
  const totalCount = habits.length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0`,
      placement: { type: "line", line: 38 },
      highlightLines: [38, 40],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+completedCount\\s*=\\s*habits\\.filter",
          description: "Completed count is derived from habits",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+completionRate",
          description: "Completion rate is calculated",
        },
      ],
      concepts: ["derived state", "filter", "Math.round", "conditional expressions"],
    },
    {
      id: "ht-step-8",
      order: 8,
      title: "Add the date subtitle",
      instruction:
        "Inside the return, after the `<h1>`, replace the `{/* Your code will go here */}` comment with a subtitle showing today's date.",
      explanation:
        "Displaying the date gives context. `toLocaleDateString` formats dates according to the user's locale — much better than manually formatting with month/day/year.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <p className="subtitle">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>`,
      placement: { type: "replace-range", startLine: 46, endLine: 46 },
      highlightLines: [46, 48],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "toLocaleDateString",
          description: "Date is formatted with toLocaleDateString",
        },
      ],
      concepts: ["Date", "toLocaleDateString", "internationalization"],
    },
    {
      id: "ht-step-9",
      order: 9,
      title: "Add the input form",
      instruction:
        "After the subtitle paragraph, add the form to create new habits with an input and button.",
      explanation:
        "The `onKeyDown` handler lets users press Enter to add a habit — a quality-of-life detail. The `onSubmit`-style pattern prevents the default form behavior while keeping the form accessible.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="add-form">
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
        />
        <button onClick={addHabit}>Add</button>
      </div>`,
      placement: { type: "line", line: 49 },
      highlightLines: [49, 58],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "value=\\{newHabit\\}",
          description: "Input value is bound to newHabit state",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "onKeyDown.*Enter.*addHabit",
          description: "Enter key triggers addHabit",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "onClick=\\{addHabit\\}",
          description: "Button click triggers addHabit",
        },
      ],
      concepts: ["controlled inputs", "onKeyDown", "keyboard events", "event handling"],
    },
    {
      id: "ht-step-10",
      order: 10,
      title: "Render the habit list",
      instruction:
        "After the add form, render the list of habits. We'll use the HabitItem component for each one, and show an empty state when there are no habits.",
      explanation:
        "This maps over the habits array, passing each habit's data and callback functions as props. Each HabitItem doesn't need to know about the full habits array — it just receives its own data and functions to call when the user interacts with it.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="habit-list">
        {habits.length === 0 ? (
          <div className="empty-state">
            <div className="icon">+</div>
            <p>No habits yet. Add one above!</p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={() => toggleHabit(habit.id)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))
        )}
      </div>`,
      placement: { type: "line", line: 59 },
      highlightLines: [59, 75],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "habits\\.map\\(",
          description: "Habits are rendered with .map()",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "<HabitItem",
          description: "HabitItem component is used",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "key=\\{habit\\.id\\}",
          description: "Each HabitItem has a unique key",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "habits\\.length\\s*===\\s*0",
          description: "Empty state is shown when no habits",
        },
      ],
      deepExplanation:
        "The `key={habit.id}` prop is crucial. React uses keys to match items between renders. Without unique keys, React might re-use the wrong DOM element when items are reordered or deleted, causing bugs. Using array index as key (`key={i}`) is bad because indices shift when items are added/removed. `Date.now()` IDs are unique and stable. The arrow function `() => toggleHabit(habit.id)` creates a closure that captures the specific habit's ID — without this wrapper, we couldn't pass the ID to toggleHabit.",
      concepts: ["map rendering", "keys", "props", "closures", "empty state", "component composition"],
    },
    {
      id: "ht-step-11",
      order: 11,
      title: "Add the stats section",
      instruction:
        "After the habit list (after its closing `</div>`), add a stats section showing completion progress.",
      explanation:
        "The stats section uses our derived values (completedCount, completionRate) to show progress. Conditional rendering with `totalCount > 0` hides stats when there are no habits.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {totalCount > 0 && (
        <div className="stats">
          <div>
            <div className="stat-value">{completedCount}/{totalCount}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div>
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">Done Today</div>
          </div>
        </div>
      )}`,
      placement: { type: "line", line: 76 },
      highlightLines: [76, 87],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "totalCount\\s*>\\s*0\\s*&&",
          description: "Stats are conditionally rendered",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "completedCount.*totalCount",
          description: "Completion count is displayed",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "completionRate",
          description: "Completion rate is displayed",
        },
      ],
      concepts: ["conditional rendering", "derived state display"],
    },
    {
      id: "ht-step-12",
      order: 12,
      title: "Build the HabitItem component",
      instruction:
        "Now switch to `src/HabitItem.jsx`. Replace the entire file contents with a proper component that receives props and renders a single habit row.",
      explanation:
        "This is component composition in action. HabitItem receives data and callbacks as props. It doesn't know how habits are stored or managed — it just renders one habit and calls functions when the user interacts. This separation makes components reusable and testable.",
      targetFile: "src/HabitItem.jsx",
      codeToWrite: `export default function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <div className={"habit-item" + (habit.completedToday ? " completed" : "")}>
      <button className="checkbox" onClick={onToggle}>
        {habit.completedToday ? "\\u2713" : ""}
      </button>
      <span className="name">{habit.name}</span>
      {habit.streak > 0 && (
        <span className="streak">{habit.streak} day streak</span>
      )}
      <button className="delete-btn" onClick={onDelete}>
        \\u00d7
      </button>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 16],
      validation: [
        {
          targetFile: "src/HabitItem.jsx",
          pattern: "function\\s+HabitItem\\s*\\(\\s*\\{\\s*habit",
          description: "HabitItem accepts destructured props",
        },
        {
          targetFile: "src/HabitItem.jsx",
          pattern: "onClick=\\{onToggle\\}",
          description: "Checkbox calls onToggle prop",
        },
        {
          targetFile: "src/HabitItem.jsx",
          pattern: "onClick=\\{onDelete\\}",
          description: "Delete button calls onDelete prop",
        },
        {
          targetFile: "src/HabitItem.jsx",
          pattern: "habit\\.completedToday",
          description: "Component reads from habit prop",
        },
      ],
      deepExplanation:
        "Props destructuring `{ habit, onToggle, onDelete }` is cleaner than writing `props.habit`, `props.onToggle`, etc. This component is a 'presentational' component — it only renders UI and delegates actions to parent-provided callbacks. The parent (App) owns the state and logic; HabitItem just displays it. This pattern is called 'lifting state up' — state lives in the highest component that needs it, and child components receive data and callbacks via props. The Unicode characters `\\u2713` (checkmark) and `\\u00d7` (multiplication sign) provide icons without needing an icon library.",
      concepts: ["props destructuring", "presentational components", "lifting state up", "callbacks"],
    },
    {
      id: "ht-step-13",
      order: 13,
      title: "Add form submission prevention",
      instruction:
        "Back in App.jsx, wrap the add-form div with a form element to properly handle Enter key submission. Replace the `<div className=\"add-form\">` opening tag and its closing `</div>` with a `<form>` element.",
      explanation:
        "Using a `<form>` element with `onSubmit` is more accessible than handling keyboard events manually. It works with screen readers, mobile keyboards, and follows HTML semantics. The `e.preventDefault()` stops the page from refreshing (the default form behavior).",
      targetFile: "src/App.jsx",
      codeToWrite: `      <form className="add-form" onSubmit={(e) => { e.preventDefault(); addHabit() }}>
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>`,
      placement: { type: "replace-range", startLine: 49, endLine: 58 },
      highlightLines: [49, 57],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "<form\\s+className=\"add-form\"",
          description: "Input is wrapped in a form element",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "e\\.preventDefault\\(\\)",
          description: "Form default submission is prevented",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "type=\"submit\"",
          description: "Button is type submit",
        },
      ],
      deepExplanation:
        "HTML forms have built-in behavior: pressing Enter in an input field submits the form. By using `<form onSubmit={...}>` instead of `<div onKeyDown={...}>`, we get this behavior for free, plus accessibility benefits. Screen readers announce the form, and `type=\"submit\"` tells the browser this button submits the form. Always prefer semantic HTML when possible — it's more accessible and requires less custom JavaScript. The `e.preventDefault()` is needed because the default form submission would cause a full page reload (it tries to send a GET/POST request).",
      concepts: ["form semantics", "preventDefault", "accessibility", "HTML forms"],
    },
    {
      id: "ht-step-14",
      order: 14,
      title: "Add a reset all button",
      instruction:
        "After the stats section (before the closing `</div>` of the app), add a small reset button that marks all habits as incomplete for a new day.",
      explanation:
        "The reset function demonstrates another `.map()` pattern — transforming every item in an array. It creates a new array where every habit has `completedToday: false`, which is exactly what you'd want at the start of a new day.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {totalCount > 0 && (
        <button
          onClick={() => setHabits(habits.map(h => ({ ...h, completedToday: false })))}
          style={{ marginTop: 16, width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #44475a', background: 'transparent', color: '#6272a4', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          Reset for New Day
        </button>
      )}`,
      placement: { type: "line", line: 88 },
      highlightLines: [88, 95],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "completedToday:\\s*false",
          description: "Reset sets all habits to incomplete",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "Reset for New Day",
          description: "Reset button is present",
        },
      ],
      concepts: ["map transformation", "inline styles", "batch updates"],
    },
  ],
};
