import type { GuidedBuildProject } from "./guided-builds";

export const tipCalculatorProject: GuidedBuildProject = {
  id: "guided-tip-calculator",
  title: "Tip Calculator",
  subtitle: "Build a tip calculator with React state management",
  difficulty: "beginner",
  estimatedMinutes: 20,
  conceptsSummary: ["useState", "Event Handlers", "Conditional Rendering", "Computed Values"],
  description:
    "Build a tip calculator from scratch using React. You'll learn how to manage form state with useState, handle user input events, compute derived values, and conditionally render results. Every restaurant app needs one!",
  packageJson: {
    name: "tip-calculator",
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
    <title>Tip Calculator</title>
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
          name: "tip-calculator",
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
      content: `// Tip Calculator App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Tip Calculator</h1>
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
  background: #1a1a2e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  background: #16213e;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #e94560;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  color: #a0a0b0;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #0f3460;
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus, .input-group select:focus {
  border-color: #e94560;
}

.tip-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tip-buttons button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #0f3460;
  color: #e0e0e0;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tip-buttons button:hover {
  background: #1a4a7a;
}

.tip-buttons button.active {
  background: #e94560;
  border-color: #e94560;
  color: white;
}

.results {
  background: #0f3460;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.95rem;
}

.result-row.total {
  border-top: 1px solid #2a2a4a;
  margin-top: 8px;
  padding-top: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #e94560;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "tc-step-1",
      order: 1,
      title: "Import useState",
      instruction:
        "Add a useState import at the very top of the file (line 1). This hook is what lets your component remember things like input values.",
      explanation:
        "React components are just functions — they don't naturally remember values between renders. `useState` is a Hook that gives your component a piece of \"state\" (a value that persists and triggers a re-render when changed). Without it, every variable would reset to its initial value each time React re-renders.",
      targetFile: "src/App.jsx",
      codeToWrite: `import { useState } from 'react'`,
      placement: { type: "line", line: 1 },
      highlightLines: [1, 1],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s*\\{[^}]*useState[^}]*\\}\\s*from\\s*['\"]react['\"]",
          description: "useState is imported from React",
        },
      ],
      deepExplanation:
        "Hooks were introduced in React 16.8 to let you use state and other React features in function components. Before hooks, you'd need to write a class component with `this.state` and `this.setState()`. The `useState` hook is the simplest hook — it takes an initial value and returns `[currentValue, setterFunction]`. React knows which component called the hook, so it can store the state internally and return it on re-renders.",
      concepts: ["useState", "hooks", "imports"],
    },
    {
      id: "tc-step-2",
      order: 2,
      title: "Add bill amount state",
      instruction:
        "Inside the App function, before the return statement (around line 6), add a state variable to track the bill amount. Put it right after the function declaration line.",
      explanation:
        "We need to store the bill amount that the user types in. `useState('')` starts with an empty string because form inputs work with strings. We'll convert it to a number when we need to calculate.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [billAmount, setBillAmount] = useState('')`,
      placement: { type: "line", line: 6 },
      highlightLines: [6, 6],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[billAmount\\s*,\\s*setBillAmount\\]\\s*=\\s*useState\\(",
          description: "billAmount state variable is declared",
        },
      ],
      deepExplanation:
        "The array destructuring `[billAmount, setBillAmount]` is a React convention. The first element is the current value, the second is a function to update it. When you call `setBillAmount('50')`, React will: (1) store the new value internally, (2) schedule a re-render of this component, (3) on the next render, `billAmount` will be `'50'`. The naming convention `[thing, setThing]` isn't required but is standard practice.",
      concepts: ["useState", "destructuring", "state initialization"],
    },
    {
      id: "tc-step-3",
      order: 3,
      title: "Add tip percentage state",
      instruction:
        "Right after the billAmount state (line 7), add another state variable for the tip percentage. We'll default it to 15%.",
      explanation:
        "The tip percentage is a separate piece of state because it changes independently from the bill amount. Starting at 15 (representing 15%) is a sensible default.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [tipPercent, setTipPercent] = useState(15)`,
      placement: { type: "line", line: 7 },
      highlightLines: [7, 7],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[tipPercent\\s*,\\s*setTipPercent\\]\\s*=\\s*useState\\(15\\)",
          description: "tipPercent state is declared with default 15",
        },
      ],
      deepExplanation:
        "Notice we use a number (15) here instead of a string like we did for billAmount. That's because tip percentage is selected from buttons, not typed in an input. Inputs deal in strings, but we can use any type for state: numbers, booleans, arrays, objects. The type of the initial value sets the type that TypeScript infers for the state.",
      concepts: ["useState", "state types"],
    },
    {
      id: "tc-step-4",
      order: 4,
      title: "Calculate tip and total",
      instruction:
        "After your state declarations (around line 8), add computed values that calculate the tip amount and total. These aren't state — they're derived from state.",
      explanation:
        "These are 'derived values' — they're computed from state, not stored as state themselves. This is a key React pattern: store the minimum state needed, and calculate everything else. If we stored tipAmount as separate state, we'd have to keep it in sync with billAmount and tipPercent manually.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const bill = parseFloat(billAmount) || 0
  const tipAmount = bill * (tipPercent / 100)
  const totalAmount = bill + tipAmount`,
      placement: { type: "line", line: 9 },
      highlightLines: [9, 11],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+bill\\s*=\\s*parseFloat\\(billAmount\\)",
          description: "Bill is parsed from string to number",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+tipAmount\\s*=\\s*bill\\s*\\*",
          description: "Tip amount is calculated from bill",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+totalAmount\\s*=\\s*bill\\s*\\+\\s*tipAmount",
          description: "Total amount is bill + tip",
        },
      ],
      deepExplanation:
        "This is the \"derived state\" pattern. Every time React re-renders (because billAmount or tipPercent changed), these const values are recalculated automatically. The `|| 0` after `parseFloat()` is a guard: if the input is empty or not a number, `parseFloat` returns `NaN`, and `NaN || 0` gives us 0. This prevents showing `NaN` in the UI. You should only use useState for values that can't be computed from other state.",
      concepts: ["derived state", "parseFloat", "NaN guard"],
    },
    {
      id: "tc-step-5",
      order: 5,
      title: "Add the bill input field",
      instruction:
        "Inside the return statement, replace the `{/* Your code will go here */}` comment with a bill amount input group. Add it right after the `<h1>` tag.",
      explanation:
        "The `onChange` handler receives an event object. We extract the typed value with `e.target.value` and pass it to our state setter. This is called a 'controlled input' — React state is the single source of truth for the input's value.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="input-group">
        <label>Bill Amount</label>
        <input
          type="number"
          placeholder="0.00"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
      </div>`,
      placement: { type: "replace-range", startLine: 16, endLine: 16 },
      highlightLines: [16, 24],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "value=\\{billAmount\\}",
          description: "Input value is bound to billAmount state",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "onChange=\\{.*setBillAmount.*\\}",
          description: "onChange handler updates billAmount",
        },
      ],
      deepExplanation:
        "A 'controlled input' means React controls the input's value. The cycle is: user types → onChange fires → setBillAmount updates state → React re-renders → input shows new value from state. This may seem circular, but it gives you full control: you could validate, format, or reject input before updating state. The alternative is an 'uncontrolled input' using refs, which is simpler but gives less control. Controlled inputs are the standard approach in React.",
      concepts: ["controlled inputs", "event handlers", "onChange"],
    },
    {
      id: "tc-step-6",
      order: 6,
      title: "Add tip percentage buttons",
      instruction:
        "After the input group you just added (after the closing `</div>` of the input-group), add a row of tip percentage buttons.",
      explanation:
        "We map over an array of percentages to create buttons. The `active` CSS class is applied conditionally when the button's percentage matches the current state. Clicking a button calls `setTipPercent` with that percentage.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="input-group">
        <label>Tip Percentage</label>
      </div>
      <div className="tip-buttons">
        {[10, 15, 20, 25].map((pct) => (
          <button
            key={pct}
            className={tipPercent === pct ? 'active' : ''}
            onClick={() => setTipPercent(pct)}
          >
            {pct}%
          </button>
        ))}
      </div>`,
      placement: { type: "line", line: 25 },
      highlightLines: [25, 38],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "\\[10,\\s*15,\\s*20,\\s*25\\]\\.map",
          description: "Tip percentage buttons are rendered with .map()",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "onClick=\\{.*setTipPercent",
          description: "Clicking a button updates tipPercent state",
        },
      ],
      deepExplanation:
        "Using `.map()` to render a list is a core React pattern. Each element in the array produces a JSX element. The `key={pct}` prop is required by React to efficiently track which items changed during re-renders. For the conditional class, `tipPercent === pct ? 'active' : ''` is a ternary expression: if the condition is true, use 'active', otherwise empty string. This pattern of highlighting the selected option is common in toggle buttons, tabs, and navigation.",
      concepts: ["map rendering", "keys", "conditional classes", "onClick"],
    },
    {
      id: "tc-step-7",
      order: 7,
      title: "Show the results",
      instruction:
        "After the tip buttons (after the closing `</div>` of tip-buttons), add a results section that shows the calculated tip and total. We only show it when the user has entered a bill amount.",
      explanation:
        "The `{bill > 0 && (...)}` pattern is conditional rendering — the results section only appears when there's a valid bill amount. The `.toFixed(2)` method formats numbers to exactly 2 decimal places, perfect for money.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {bill > 0 && (
        <div className="results">
          <div className="result-row">
            <span>Tip Amount</span>
            <span>${"${tipAmount.toFixed(2)}"}</span>
          </div>
          <div className="result-row total">
            <span>Total</span>
            <span>${"${totalAmount.toFixed(2)}"}</span>
          </div>
        </div>
      )}`,
      placement: { type: "line", line: 39 },
      highlightLines: [39, 50],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "bill\\s*>\\s*0\\s*&&",
          description: "Results are conditionally rendered when bill > 0",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "tipAmount\\.toFixed\\(2\\)",
          description: "Tip amount is formatted to 2 decimal places",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "totalAmount\\.toFixed\\(2\\)",
          description: "Total amount is formatted to 2 decimal places",
        },
      ],
      deepExplanation:
        "Conditional rendering with `&&` works because of JavaScript's short-circuit evaluation: if the left side is falsy, JavaScript doesn't evaluate the right side at all. So when `bill` is 0 (falsy), React renders nothing. When `bill > 0` is true, React renders the JSX on the right side. The alternative is a ternary: `bill > 0 ? <Results /> : null`. Both are common. The `${}` syntax inside backtick strings is a template literal — it embeds an expression inside a string. Combined with `.toFixed(2)`, it formats `15.5` as `$15.50`.",
      concepts: ["conditional rendering", "short-circuit evaluation", "toFixed", "template literals"],
    },
    {
      id: "tc-step-8",
      order: 8,
      title: "Add a custom tip input",
      instruction:
        "After the tip buttons div (line 39, before the results), add a custom tip percentage input so users can enter any tip amount they want.",
      explanation:
        "This gives users flexibility beyond the preset buttons. When they type a custom value, we parse it as a number and update the same `tipPercent` state. The preset buttons and custom input both control the same state — demonstrating that multiple UI elements can share state.",
      targetFile: "src/App.jsx",
      codeToWrite: `      <div className="input-group">
        <label>Custom Tip %</label>
        <input
          type="number"
          placeholder="Enter custom %"
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value) || 0)}
        />
      </div>`,
      placement: { type: "line", line: 39 },
      highlightLines: [39, 47],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "Number\\(e\\.target\\.value\\)",
          description: "Custom tip input converts string to number",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "value=\\{tipPercent\\}",
          description: "Custom input shows current tipPercent value",
        },
      ],
      deepExplanation:
        "Notice how the custom input and the buttons are in sync: click a 20% button, and the custom input shows 20. Type 18 in the custom input, and no button is highlighted. This happens because they both read from and write to the same `tipPercent` state. This is the power of the controlled component pattern — there's one source of truth, and all UI stays in sync automatically. `Number()` is preferred over `parseInt()` here because it handles decimal percentages like 12.5.",
      concepts: ["shared state", "Number conversion", "controlled inputs"],
    },
    {
      id: "tc-step-9",
      order: 9,
      title: "Add a split bill feature",
      instruction:
        "Add one more state variable for the number of people splitting the bill. Add it after the tipPercent state declaration (around line 8).",
      explanation:
        "Adding a split feature demonstrates how easy it is to extend a React app — add state, compute from it, render it. The pattern is always the same.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [splitCount, setSplitCount] = useState(1)`,
      placement: { type: "line", line: 8 },
      highlightLines: [8, 8],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[splitCount\\s*,\\s*setSplitCount\\]\\s*=\\s*useState\\(1\\)",
          description: "splitCount state is declared with default 1",
        },
      ],
      concepts: ["useState", "feature extension"],
    },
    {
      id: "tc-step-10",
      order: 10,
      title: "Add per-person calculation and UI",
      instruction:
        "After the totalAmount calculation (around line 13), add a per-person amount calculation. Then, after the custom tip input and before the results section, add a number-of-people input. Finally, add a per-person row in the results.",
      explanation:
        "We divide the total by the number of people. `Math.max(splitCount, 1)` prevents division by zero. This step ties everything together: state, derived values, input binding, and conditional rendering all working in concert.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const perPerson = totalAmount / Math.max(splitCount, 1)`,
      placement: { type: "line", line: 13 },
      highlightLines: [13, 13],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+perPerson\\s*=\\s*totalAmount\\s*/\\s*Math\\.max",
          description: "Per-person amount is calculated safely",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "splitCount",
          description: "splitCount is used in the component",
        },
      ],
      deepExplanation:
        "`Math.max(splitCount, 1)` is a defensive pattern — it ensures we never divide by zero or a negative number. Even if the user somehow enters 0 or -1, the calculation won't break. This is important in user-facing code: always guard against edge cases in math. The division creates a derived value, just like tipAmount and totalAmount. The more you work with React, the more you'll see this pattern: minimal state, maximum derived values.",
      concepts: ["Math.max", "division safety", "derived state", "feature extension"],
    },
  ],
};
