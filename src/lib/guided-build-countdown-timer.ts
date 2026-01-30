import type { GuidedBuildProject } from "./guided-builds";

export const countdownTimerProject: GuidedBuildProject = {
  id: "guided-countdown-timer",
  title: "Countdown Timer",
  subtitle: "Build a countdown timer with useEffect cleanup and useRef",
  difficulty: "beginner",
  estimatedMinutes: 25,
  conceptsSummary: [
    "useEffect Cleanup",
    "useRef",
    "setInterval",
    "Time Formatting",
    "Conditional Rendering",
  ],
  description:
    "Build a countdown timer from scratch. You'll learn how to use setInterval with useEffect, why cleanup functions matter (memory leaks!), how useRef holds values across renders without triggering re-renders, and how to format seconds into MM:SS. Includes Pomodoro-style presets!",
  packageJson: {
    name: "countdown-timer",
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
    <title>Countdown Timer</title>
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
          name: "countdown-timer",
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
      content: `// Countdown Timer App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Countdown Timer</h1>
      {/* Your code will go here */}
    </div>
  )
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
  background: #0a0a1a;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  background: #12122a;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  text-align: center;
}

h1 {
  margin-bottom: 24px;
  color: #7c5cfc;
  font-size: 1.5rem;
}

.timer-display {
  font-size: 5rem;
  font-weight: 200;
  font-variant-numeric: tabular-nums;
  margin: 24px 0;
  letter-spacing: 4px;
  color: #e0e0e0;
  transition: color 0.3s;
}

.timer-display.warning {
  color: #ff6b6b;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timer-display.finished {
  color: #51cf66;
}

.duration-input {
  margin-bottom: 20px;
}

.duration-input label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #8888aa;
}

.duration-input input {
  width: 120px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #2a2a4a;
  background: #1a1a3a;
  color: #e0e0e0;
  font-size: 1.1rem;
  text-align: center;
  outline: none;
  transition: border-color 0.2s;
}

.duration-input input:focus {
  border-color: #7c5cfc;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 20px 0;
}

.controls button {
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-start {
  background: #7c5cfc;
  color: white;
}

.btn-start:hover {
  background: #6a4ce0;
}

.btn-pause {
  background: #fcc05c;
  color: #1a1a3a;
}

.btn-pause:hover {
  background: #e0a840;
}

.btn-reset {
  background: transparent;
  border: 1px solid #2a2a4a !important;
  color: #8888aa;
}

.btn-reset:hover {
  border-color: #ff6b6b !important;
  color: #ff6b6b;
}

.presets {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
}

.presets button {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #1a1a3a;
  color: #8888aa;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.presets button:hover {
  border-color: #7c5cfc;
  color: #7c5cfc;
}

.alarm-message {
  margin-top: 16px;
  padding: 12px;
  background: #51cf6622;
  border-radius: 10px;
  color: #51cf66;
  font-weight: 600;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "ct-step-1",
      order: 1,
      title: "Import useState, useEffect, useRef",
      instruction:
        "Add imports for `useState`, `useEffect`, and `useRef` at the top of App.jsx (line 1).",
      explanation:
        "We need three hooks: `useState` for tracking time and running state, `useEffect` for the interval side effect, and `useRef` to hold the interval ID without causing re-renders.",
      targetFile: "src/App.jsx",
      codeToWrite: `import { useState, useEffect, useRef } from 'react'`,
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
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{[^}]*useRef[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "useRef is imported from React",
        },
      ],
      deepExplanation:
        "These three hooks cover most of what you need for timer logic. `useState` manages reactive values that trigger re-renders (time remaining, whether the timer is running). `useEffect` lets you start/stop the interval as a side effect. `useRef` is the hidden gem here — it gives you a mutable container (like a box) that persists across renders but doesn't trigger re-renders when changed. Perfect for storing interval IDs.",
      concepts: ["useState", "useEffect", "useRef", "hooks", "imports"],
    },
    {
      id: "ct-step-2",
      order: 2,
      title: "Add state for time, running status, and duration",
      instruction:
        "Inside the App function (around line 6), add three state variables: seconds remaining, whether the timer is running, and the initial duration in minutes.",
      explanation:
        "We track time in seconds (easier for countdown math), a boolean for running status, and the initial duration so we can reset. Keeping duration in minutes matches how users think about time.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(5)`,
      placement: { type: "line", line: 6 },
      highlightLines: [6, 8],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[secondsLeft\\s*,\\s*setSecondsLeft\\]\\s*=\\s*useState\\(0\\)",
          description: "secondsLeft state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[isRunning\\s*,\\s*setIsRunning\\]\\s*=\\s*useState\\(false\\)",
          description: "isRunning state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[duration\\s*,\\s*setDuration\\]\\s*=\\s*useState\\(5\\)",
          description: "duration state is declared with default 5",
        },
      ],
      deepExplanation:
        "Why three separate state variables instead of one object? React convention is to split state by how it changes. `secondsLeft` changes every second during countdown. `isRunning` changes on start/pause. `duration` changes when the user picks a new time. They change independently, so they should be separate states. This also makes the code easier to read — `setIsRunning(true)` is clearer than `setState(prev => ({ ...prev, isRunning: true }))`.",
      concepts: ["useState", "state design", "boolean state"],
    },
    {
      id: "ct-step-3",
      order: 3,
      title: "Add duration input",
      instruction:
        "Inside the return statement, replace the `{/* Your code will go here */}` comment with a duration input that lets users set minutes.",
      explanation:
        "The input lets users type how many minutes they want. We also set the initial secondsLeft when the duration changes, converting minutes to seconds.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="duration-input">
        <label>Duration (minutes)</label>
        <input
          type="number"
          min="1"
          max="120"
          value={duration}
          onChange={(e) => {
            const mins = Number(e.target.value) || 1
            setDuration(mins)
            if (!isRunning) setSecondsLeft(mins * 60)
          }}
          disabled={isRunning}
        />
      </div>`,
      placement: { type: "replace-range", startLine: 13, endLine: 13 },
      highlightLines: [13, 27],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "type=\"number\"",
          description: "Input is a number type",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setDuration\\(",
          description: "Duration state is updated on change",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "disabled=\\{isRunning\\}",
          description: "Input is disabled while timer runs",
        },
      ],
      deepExplanation:
        "We disable the input while the timer is running to prevent confusing behavior. The `if (!isRunning)` check ensures we only update secondsLeft when the timer is stopped — otherwise changing the duration mid-countdown would jump the display. `Number(e.target.value) || 1` converts the input string to a number, defaulting to 1 if the input is empty or invalid.",
      concepts: ["controlled inputs", "disabled state", "Number conversion"],
    },
    {
      id: "ct-step-4",
      order: 4,
      title: "Create useEffect with setInterval",
      instruction:
        "After the state declarations (around line 9), add a useEffect that runs a setInterval to count down every second.",
      explanation:
        "This is the timer engine. `setInterval` calls a function every 1000ms (1 second). We only start it when `isRunning` is true. The effect re-runs whenever `isRunning` changes.",
      targetFile: "src/App.jsx",
      codeToWrite: `  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning])`,
      placement: { type: "line", line: 10 },
      highlightLines: [10, 24],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "useEffect\\(",
          description: "useEffect is used",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setInterval\\(",
          description: "setInterval creates the countdown",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "clearInterval\\(",
          description: "clearInterval cleans up the interval",
        },
      ],
      deepExplanation:
        "This effect demonstrates several important patterns: (1) Early return — if not running, we skip the interval entirely. (2) Functional state update — `setSecondsLeft(prev => prev - 1)` uses the previous value, avoiding stale closure issues. If we wrote `setSecondsLeft(secondsLeft - 1)`, `secondsLeft` would be captured at the time the effect was created and never update. (3) Auto-stop — when we reach 0, we stop the timer by setting isRunning to false.",
      concepts: ["useEffect", "setInterval", "functional updates", "stale closures"],
    },
    {
      id: "ct-step-5",
      order: 5,
      title: "Understand the cleanup function",
      instruction:
        "The `return () => clearInterval(id)` in the useEffect is already there from the last step. Let's understand why it's critical. Read the explanation, then move on.",
      explanation:
        "The cleanup function runs when: (1) the component unmounts, or (2) before the effect re-runs (when dependencies change). Without it, every time `isRunning` toggles, a NEW interval would start without stopping the old one — creating multiple intervals counting down simultaneously. This is a memory leak.",
      targetFile: "src/App.jsx",
      codeToWrite: `  // The cleanup function: return () => clearInterval(id)
  // This runs BEFORE the effect re-runs and on unmount
  // Without it, pausing and resuming would create multiple intervals!`,
      placement: { type: "line", line: 25 },
      highlightLines: [25, 27],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "return\\s*\\(\\)\\s*=>\\s*clearInterval",
          description: "Cleanup function clears the interval",
        },
      ],
      deepExplanation:
        "Cleanup is the most important concept in useEffect. Think of it as 'undo what I just did.' If the effect starts an interval, the cleanup stops it. If the effect adds an event listener, the cleanup removes it. If the effect opens a WebSocket, the cleanup closes it. React guarantees cleanup runs before the next effect and on unmount. Without cleanup, you get: (1) Memory leaks — intervals/listeners pile up, (2) Bugs — multiple intervals cause double-speed countdown, (3) Stale references — old closures reference outdated state. Always ask: 'does my effect create something that needs to be cleaned up?'",
      concepts: ["useEffect cleanup", "memory leaks", "clearInterval"],
    },
    {
      id: "ct-step-6",
      order: 6,
      title: "Use useRef to hold interval ID",
      instruction:
        "After the state declarations (around line 9), add a useRef to store the interval ID. Then update the useEffect to use it instead of a local variable.",
      explanation:
        "useRef creates a container that persists across renders. Unlike state, changing a ref doesn't trigger a re-render. It's perfect for storing the interval ID because we need to access it in the cleanup function but don't want to re-render when it changes.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const intervalRef = useRef(null)`,
      placement: { type: "line", line: 10 },
      highlightLines: [10, 10],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+intervalRef\\s*=\\s*useRef\\(null\\)",
          description: "intervalRef is created with useRef",
        },
      ],
      deepExplanation:
        "useRef returns an object with a `.current` property. Unlike a regular variable (which resets each render) or state (which triggers re-renders), a ref persists across renders silently. Common uses: (1) Storing interval/timeout IDs, (2) Holding DOM element references, (3) Tracking previous values, (4) Any mutable value that shouldn't trigger re-renders. Think of it as an 'instance variable' for function components.",
      concepts: ["useRef", "mutable refs", "render behavior"],
    },
    {
      id: "ct-step-7",
      order: 7,
      title: "Add start/pause toggle button",
      instruction:
        "After the duration input in the JSX (inside the return), add the control buttons. The start/pause button toggles `isRunning` and initializes seconds if needed.",
      explanation:
        "One button handles both start and pause. When starting, we check if `secondsLeft` is 0 and initialize it from `duration`. The button text changes based on the running state.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="controls">
        <button
          className={isRunning ? 'btn-pause' : 'btn-start'}
          onClick={() => {
            if (!isRunning && secondsLeft === 0) {
              setSecondsLeft(duration * 60)
            }
            setIsRunning(!isRunning)
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>`,
      placement: { type: "line", line: 43 },
      highlightLines: [43, 55],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "setIsRunning\\(!isRunning\\)",
          description: "Button toggles isRunning state",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "isRunning\\s*\\?\\s*['\"]Pause['\"]\\s*:\\s*['\"]Start['\"]",
          description: "Button text changes based on state",
        },
      ],
      deepExplanation:
        "The toggle pattern `setIsRunning(!isRunning)` flips the boolean. When we start, we check if secondsLeft is 0 (timer hasn't been initialized or has finished) and set it from the duration. This way, pressing start after the timer finishes resets it. The conditional className switches between 'btn-start' (purple) and 'btn-pause' (yellow) for visual feedback. This single-button toggle pattern is common in media players, timers, and any start/stop UI.",
      concepts: ["boolean toggle", "conditional rendering", "conditional className"],
    },
    {
      id: "ct-step-8",
      order: 8,
      title: "Add reset button",
      instruction:
        "Inside the controls div, after the start/pause button, add a reset button that stops the timer and resets the time.",
      explanation:
        "Reset needs to do three things: stop the timer (set isRunning to false), reset the display to the full duration, and clear any running interval via the state change.",
      targetFile: "src/App.jsx",
      codeToWrite: `        <button
          className="btn-reset"
          onClick={() => {
            setIsRunning(false)
            setSecondsLeft(duration * 60)
          }}
        >
          Reset
        </button>`,
      placement: { type: "line", line: 55 },
      highlightLines: [55, 63],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "setIsRunning\\(false\\)",
          description: "Reset stops the timer",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setSecondsLeft\\(duration\\s*\\*\\s*60\\)",
          description: "Reset restores full duration",
        },
      ],
      concepts: ["state reset", "multiple state updates"],
    },
    {
      id: "ct-step-9",
      order: 9,
      title: "Format seconds into MM:SS display",
      instruction:
        "Before the return statement (around line 28), add a formatting function. Then add the timer display in the JSX between the duration input and controls.",
      explanation:
        "We use integer division (`Math.floor`) and modulo (`%`) to split total seconds into minutes and seconds. `String().padStart(2, '0')` ensures single digits get a leading zero (e.g., `5` becomes `05`).",
      targetFile: "src/App.jsx",
      codeToWrite: `  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = \`\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\``,
      placement: { type: "line", line: 29 },
      highlightLines: [29, 31],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "Math\\.floor\\(secondsLeft\\s*/\\s*60\\)",
          description: "Minutes calculated with Math.floor",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "secondsLeft\\s*%\\s*60",
          description: "Seconds calculated with modulo",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "padStart\\(2",
          description: "Numbers are zero-padded",
        },
      ],
      deepExplanation:
        "Integer division and modulo are the standard way to convert between time units. `Math.floor(125 / 60)` = 2 minutes. `125 % 60` = 5 seconds. So 125 seconds = 02:05. The `padStart(2, '0')` method pads a string to a minimum length with a fill character. `'5'.padStart(2, '0')` = '05', but `'12'.padStart(2, '0')` = '12' (already 2 chars). This ensures consistent formatting like a real clock display. These are derived values — not state — they recalculate automatically every render.",
      concepts: ["Math.floor", "modulo", "padStart", "time formatting", "derived values"],
    },
    {
      id: "ct-step-10",
      order: 10,
      title: "Add the timer display with visual warning",
      instruction:
        "In the JSX, between the duration input and the controls div, add the timer display. It should turn red and pulse when under 10 seconds.",
      explanation:
        "Conditional CSS classes based on state create visual feedback. When the timer is under 10 seconds, the 'warning' class triggers a CSS pulse animation. When it hits 0 and isn't running, we show 'finished' style.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className={\`timer-display\${secondsLeft <= 10 && secondsLeft > 0 && isRunning ? ' warning' : ''}\${secondsLeft === 0 && !isRunning && duration > 0 ? ' finished' : ''}\`}>
        {display}
      </div>`,
      placement: { type: "line", line: 45 },
      highlightLines: [45, 47],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "timer-display",
          description: "Timer display element exists",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "warning",
          description: "Warning class is conditionally applied",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "\\{display\\}",
          description: "Formatted time is displayed",
        },
      ],
      deepExplanation:
        "Template literals with conditional expressions let us build dynamic class names. The pattern `\\`base\\${condition ? ' extra' : ''}\\`` adds a class only when the condition is true. The CSS for `.warning` includes a pulse animation (`@keyframes pulse`) that creates an opacity fade in/out, drawing attention when time is almost up. This kind of visual feedback makes apps feel polished and responsive to state changes.",
      concepts: ["template literals", "conditional classes", "CSS animations", "visual feedback"],
    },
    {
      id: "ct-step-11",
      order: 11,
      title: "Add alarm notification when timer hits 0",
      instruction:
        "After the controls div, add a message that appears when the timer finishes (secondsLeft is 0 and the timer was started).",
      explanation:
        "We show a completion message when the timer reaches 0. We track this by checking if secondsLeft is 0 and the timer isn't running (it auto-stopped). The duration > 0 check prevents showing the message on initial load.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {secondsLeft === 0 && !isRunning && duration > 0 && (
        <div className="alarm-message">
          Time is up!
        </div>
      )}`,
      placement: { type: "line", line: 68 },
      highlightLines: [68, 72],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "secondsLeft\\s*===\\s*0\\s*&&\\s*!isRunning",
          description: "Alarm shows when timer finishes",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "alarm-message",
          description: "Alarm message element exists",
        },
      ],
      concepts: ["conditional rendering", "multiple conditions", "short-circuit evaluation"],
    },
    {
      id: "ct-step-12",
      order: 12,
      title: "Add preset duration buttons (Pomodoro)",
      instruction:
        "After the alarm message (before the closing `</div>` of the app), add preset buttons for common durations: 5, 15, and 25 minutes (Pomodoro technique).",
      explanation:
        "Preset buttons improve UX by offering one-click setup. The Pomodoro technique uses 25-minute work sessions — including it teaches users about productivity patterns while demonstrating how multiple UI elements can update the same state.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="presets">
        {[5, 15, 25].map(mins => (
          <button
            key={mins}
            onClick={() => {
              setDuration(mins)
              setSecondsLeft(mins * 60)
              setIsRunning(false)
            }}
          >
            {mins} min
          </button>
        ))}
      </div>`,
      placement: { type: "line", line: 73 },
      highlightLines: [73, 86],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "\\[5,\\s*15,\\s*25\\]\\.map",
          description: "Preset buttons are rendered with .map()",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setDuration\\(mins\\)",
          description: "Preset updates duration state",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setSecondsLeft\\(mins\\s*\\*\\s*60\\)",
          description: "Preset initializes secondsLeft",
        },
      ],
      deepExplanation:
        "Each preset button updates three pieces of state: duration (for the input), secondsLeft (for the display), and isRunning (to stop any running timer). React batches these three `set` calls into a single re-render — you won't see intermediate states. The `.map()` pattern is the same as the tip calculator buttons. The Pomodoro Technique (25-minute focused work followed by a 5-minute break) is a popular productivity method — this timer could actually be used for it!",
      concepts: ["map rendering", "state batching", "multiple state updates", "UX patterns"],
    },
  ],
};
