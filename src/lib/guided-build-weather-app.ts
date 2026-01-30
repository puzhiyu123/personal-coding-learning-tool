import type { GuidedBuildProject } from "./guided-builds";

export const weatherDashboardProject: GuidedBuildProject = {
  id: "guided-weather-dashboard",
  title: "Weather Dashboard",
  subtitle: "Build a weather app with API fetching and async/await",
  difficulty: "intermediate",
  estimatedMinutes: 35,
  conceptsSummary: [
    "fetch API",
    "async/await",
    "Loading States",
    "Error Handling",
    "useEffect Dependencies",
    "localStorage",
  ],
  description:
    "Build a weather dashboard that fetches real data from an API. You'll learn the fetch API, async/await patterns, how to handle loading/error/success states, and how useEffect dependencies control when effects re-run. Uses the free wttr.in API — no API key needed!",
  packageJson: {
    name: "weather-dashboard",
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
    <title>Weather Dashboard</title>
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
          name: "weather-dashboard",
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
      content: `// Weather Dashboard App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "javascript",
    },
    {
      path: "src/WeatherCard.jsx",
      content: `// WeatherCard component — you'll build this in a later step

export default function WeatherCard() {
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
  background: #0b1121;
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
  margin-bottom: 24px;
  color: #38bdf8;
  font-size: 1.75rem;
}

.search-form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.search-form input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #1e3a5f;
  background: #0f1d32;
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-form input:focus {
  border-color: #38bdf8;
}

.search-form button {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: #38bdf8;
  color: #0b1121;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.search-form button:hover {
  opacity: 0.9;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #64748b;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #1e3a5f;
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 20px;
  background: #3b111122;
  border: 1px solid #ef4444;
  border-radius: 12px;
  color: #ef4444;
  margin-bottom: 16px;
}

.weather-card {
  background: #0f1d32;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #1e3a5f;
}

.weather-card .city-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.weather-card .condition {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.weather-card .temp-main {
  font-size: 3.5rem;
  font-weight: 200;
  color: #38bdf8;
  margin-bottom: 20px;
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  background: #0b1121;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
}

.detail-item .label {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 4px;
}

.detail-item .value {
  font-size: 1.1rem;
  font-weight: 600;
}

.recent-searches {
  margin-top: 20px;
}

.recent-searches h3 {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.recent-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.recent-list button {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #1e3a5f;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.recent-list button:hover {
  border-color: #38bdf8;
  color: #38bdf8;
}

.unit-toggle {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
}

.unit-toggle button {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #1e3a5f;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.unit-toggle button.active {
  background: #38bdf8;
  border-color: #38bdf8;
  color: #0b1121;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "wd-step-1",
      order: 1,
      title: "Import useState and useEffect",
      instruction:
        "Replace line 1 of App.jsx with imports for `useState` and `useEffect` from React.",
      explanation:
        "We need `useState` for managing city input, weather data, loading state, and error state. `useEffect` will trigger the API fetch when conditions change.",
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
      id: "wd-step-2",
      order: 2,
      title: "Add state for city, weather data, loading, and error",
      instruction:
        "Inside the App function (around line 6), add four state variables: city input, weather data (null initially), loading boolean, and error message.",
      explanation:
        "API-driven UIs have three states: loading, error, and success. We track all three explicitly. The `weatherData` starts as null (no data yet), and `city` starts with a default city so we can show something on load.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [city, setCity] = useState('London')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')`,
      placement: { type: "line", line: 6 },
      highlightLines: [6, 9],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[city\\s*,\\s*setCity\\]\\s*=\\s*useState\\(",
          description: "city state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[weatherData\\s*,\\s*setWeatherData\\]\\s*=\\s*useState\\(null\\)",
          description: "weatherData state starts as null",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[loading\\s*,\\s*setLoading\\]\\s*=\\s*useState\\(false\\)",
          description: "loading state starts as false",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[error\\s*,\\s*setError\\]\\s*=\\s*useState\\(",
          description: "error state is declared",
        },
      ],
      deepExplanation:
        "This four-state pattern (input, data, loading, error) is the standard for any API-driven component. Think of it as a state machine: Idle → Loading → Success/Error. `weatherData` is null initially because we haven't fetched anything yet. This lets us distinguish between 'no data loaded' and 'data loaded but empty'. The `error` is a string so we can display specific error messages to the user.",
      concepts: ["state design", "API states", "null initial state"],
    },
    {
      id: "wd-step-3",
      order: 3,
      title: "Create the city search form",
      instruction:
        "Inside the return statement, replace the `{/* Your code will go here */}` comment with a search form for entering a city name.",
      explanation:
        "The form uses `onSubmit` with `preventDefault` (like the habit tracker). The input is a controlled component bound to `city` state. When submitted, we'll trigger a fetch (which we'll write next).",
      targetFile: "src/App.jsx",
      codeToWrite: `      <form className="search-form" onSubmit={(e) => { e.preventDefault(); fetchWeather(city) }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>`,
      placement: { type: "replace-range", startLine: 15, endLine: 15 },
      highlightLines: [15, 23],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "onSubmit=",
          description: "Form has an onSubmit handler",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "fetchWeather",
          description: "Form submission calls fetchWeather",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "value=\\{city\\}",
          description: "Input value is bound to city state",
        },
      ],
      concepts: ["form submission", "controlled inputs", "preventDefault"],
    },
    {
      id: "wd-step-4",
      order: 4,
      title: "Write the async fetchWeather function",
      instruction:
        "After the state declarations (around line 10), add an async function that fetches weather data from the wttr.in API using try/catch.",
      explanation:
        "This is the core of API fetching in React. The `async/await` syntax makes asynchronous code read like synchronous code. We wrap it in try/catch to handle network errors gracefully. The state transitions (loading → success/error) give the user visual feedback.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        \`https://wttr.in/\${encodeURIComponent(searchCity)}?format=j1\`
      )
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }`,
      placement: { type: "line", line: 11 },
      highlightLines: [11, 28],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s+fetchWeather\\s*=\\s*async",
          description: "fetchWeather is an async function",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "await\\s+fetch\\(",
          description: "fetch API is used with await",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "try\\s*\\{",
          description: "Try/catch handles errors",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "setLoading\\(false\\)",
          description: "Loading is set to false when done",
        },
      ],
      deepExplanation:
        "Let's break down the async flow: (1) `setLoading(true)` shows a spinner immediately. (2) `setError('')` clears any previous error. (3) `await fetch(...)` makes an HTTP request and pauses until the response arrives. (4) `response.ok` checks the HTTP status (200-299 = ok). (5) `await response.json()` parses the response body as JSON. (6) On success, we store the data. (7) On failure, we store the error message. (8) `finally` always runs, ensuring loading is set to false whether the request succeeded or failed. The `encodeURIComponent` handles city names with spaces or special characters (e.g., 'New York' → 'New%20York').",
      concepts: ["async/await", "fetch API", "try/catch/finally", "encodeURIComponent", "response.ok"],
    },
    {
      id: "wd-step-5",
      order: 5,
      title: "Add loading state rendering",
      instruction:
        "In the JSX, after the search form, add a loading indicator that shows while data is being fetched.",
      explanation:
        "The loading state provides visual feedback so users know something is happening. Without it, there's a gap between clicking 'Search' and seeing results, which makes the app feel broken.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}`,
      placement: { type: "line", line: 41 },
      highlightLines: [41, 46],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "loading\\s*&&",
          description: "Loading indicator is conditionally rendered",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "spinner",
          description: "Spinner element is present",
        },
      ],
      deepExplanation:
        "The spinner is created purely with CSS (`border` + `border-top-color` + `animation: spin`). No external library needed. The `loading &&` pattern is short-circuit rendering — when loading is false (falsy), React renders nothing. This is one of three mutually exclusive states we handle: loading, error, or data display. In production apps, you might use a skeleton loader (gray placeholder shapes) instead of a spinner for a better UX.",
      concepts: ["conditional rendering", "loading states", "CSS animations", "UX feedback"],
    },
    {
      id: "wd-step-6",
      order: 6,
      title: "Add error state rendering",
      instruction:
        "After the loading indicator, add an error display that shows when a fetch fails.",
      explanation:
        "Error states are just as important as success states. Users need to know what went wrong and that the app didn't just silently fail. We show the error message from our catch block.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}`,
      placement: { type: "line", line: 47 },
      highlightLines: [47, 51],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "error\\s*&&",
          description: "Error is conditionally rendered",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "\\{error\\}",
          description: "Error message is displayed",
        },
      ],
      concepts: ["error states", "conditional rendering", "error display"],
    },
    {
      id: "wd-step-7",
      order: 7,
      title: "Parse and display weather data",
      instruction:
        "After the error display, add the main weather data display. We'll parse the wttr.in JSON response and show temperature, condition, and humidity.",
      explanation:
        "The wttr.in API returns nested JSON. `current_condition[0]` gives us the current weather. We extract temperature, description, and humidity. The `&&` ensures we only render when data exists.",
      targetFile: "src/App.jsx",
      codeToWrite: `      {weatherData && !loading && (
        <div className="weather-card">
          <div className="city-name">{weatherData.nearest_area?.[0]?.areaName?.[0]?.value || city}</div>
          <div className="condition">
            {weatherData.current_condition?.[0]?.weatherDesc?.[0]?.value || 'Unknown'}
          </div>
          <div className="temp-main">
            {weatherData.current_condition?.[0]?.temp_C || '--'}\u00b0C
          </div>
          <div className="weather-details">
            <div className="detail-item">
              <div className="label">Humidity</div>
              <div className="value">{weatherData.current_condition?.[0]?.humidity || '--'}%</div>
            </div>
            <div className="detail-item">
              <div className="label">Feels Like</div>
              <div className="value">{weatherData.current_condition?.[0]?.FeelsLikeC || '--'}\u00b0C</div>
            </div>
          </div>
        </div>
      )}`,
      placement: { type: "line", line: 52 },
      highlightLines: [52, 72],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "weatherData\\s*&&",
          description: "Weather data is conditionally rendered",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "current_condition",
          description: "Current condition data is accessed",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "temp_C",
          description: "Temperature is displayed",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "humidity",
          description: "Humidity is displayed",
        },
      ],
      deepExplanation:
        "Optional chaining (`?.`) is critical when working with API data. The chain `weatherData.current_condition?.[0]?.temp_C` means: 'access current_condition, if it exists access index 0, if that exists access temp_C.' If any link is null/undefined, the whole expression returns undefined instead of throwing an error. The `|| '--'` fallback shows dashes when data is missing. This defensive coding is essential for API work — you can never fully trust the shape of external data.",
      concepts: ["optional chaining", "API data parsing", "fallback values", "nested data"],
    },
    {
      id: "wd-step-8",
      order: 8,
      title: "Create WeatherCard component with props",
      instruction:
        "Switch to `src/WeatherCard.jsx`. Replace the entire file with a proper component that receives weather data as a prop and renders the card.",
      explanation:
        "Extracting the weather display into its own component follows the single responsibility principle. WeatherCard only cares about displaying weather data — it doesn't know about fetching, loading, or errors.",
      targetFile: "src/WeatherCard.jsx",
      codeToWrite: `export default function WeatherCard({ data, unit }) {
  const current = data.current_condition?.[0]
  if (!current) return null

  const temp = unit === 'F' ? current.temp_F : current.temp_C
  const feelsLike = unit === 'F' ? current.FeelsLikeF : current.FeelsLikeC
  const symbol = unit === 'F' ? 'F' : 'C'

  return (
    <div className="weather-card">
      <div className="city-name">{data.nearest_area?.[0]?.areaName?.[0]?.value || 'Unknown'}</div>
      <div className="condition">
        {current.weatherDesc?.[0]?.value || 'Unknown'}
      </div>
      <div className="temp-main">
        {temp || '--'}\u00b0{symbol}
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <div className="label">Humidity</div>
          <div className="value">{current.humidity || '--'}%</div>
        </div>
        <div className="detail-item">
          <div className="label">Feels Like</div>
          <div className="value">{feelsLike || '--'}\u00b0{symbol}</div>
        </div>
        <div className="detail-item">
          <div className="label">Wind</div>
          <div className="value">{current.windspeedKmph || '--'} km/h</div>
        </div>
        <div className="detail-item">
          <div className="label">Visibility</div>
          <div className="value">{current.visibility || '--'} km</div>
        </div>
      </div>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 39],
      validation: [
        {
          targetFile: "src/WeatherCard.jsx",
          pattern: "function\\s+WeatherCard\\s*\\(\\s*\\{\\s*data",
          description: "WeatherCard accepts data prop",
        },
        {
          targetFile: "src/WeatherCard.jsx",
          pattern: "current_condition",
          description: "Component reads from data prop",
        },
        {
          targetFile: "src/WeatherCard.jsx",
          pattern: "windspeedKmph",
          description: "Wind speed is displayed",
        },
      ],
      deepExplanation:
        "This component demonstrates several patterns: (1) Early return with `if (!current) return null` — a guard clause that prevents rendering if data is missing. (2) Props destructuring `{ data, unit }` for clean access. (3) Conditional values based on the unit prop — the same data source provides both Celsius and Fahrenheit. (4) Defensive rendering with `|| '--'` fallbacks. The component is 'dumb' — it receives data and renders it, with no internal state or side effects. This makes it easy to test and reuse.",
      concepts: ["component extraction", "props", "guard clauses", "conditional values"],
    },
    {
      id: "wd-step-9",
      order: 9,
      title: "Add useEffect to fetch on mount",
      instruction:
        "Back in App.jsx, after the fetchWeather function, add a useEffect that fetches weather data when the component first loads.",
      explanation:
        "This effect runs once on mount (empty dependency array would fetch once, but we use `[city]` only for initial load). We call fetchWeather with the default city so the app shows data immediately without the user having to click Search.",
      targetFile: "src/App.jsx",
      codeToWrite: `  useEffect(() => {
    fetchWeather(city)
  }, [])`,
      placement: { type: "line", line: 29 },
      highlightLines: [29, 31],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "useEffect\\(\\(\\)\\s*=>\\s*\\{\\s*fetchWeather",
          description: "useEffect calls fetchWeather on mount",
        },
      ],
      deepExplanation:
        "The empty dependency array `[]` means 'run once on mount.' This is perfect for initial data fetching — we want to load weather for the default city when the app first renders. If we used `[city]` as the dependency, the effect would re-run every time the user types a letter (since city state updates on every keystroke). That would flood the API with requests. Instead, we fetch on mount and let the form submission handle subsequent fetches. This is a deliberate design choice for search UIs.",
      concepts: ["useEffect", "empty dependency array", "mount effect", "initial data fetching"],
    },
    {
      id: "wd-step-10",
      order: 10,
      title: "Display wind, feels-like, and additional data",
      instruction:
        "In App.jsx, import the WeatherCard component and replace the inline weather display with it. Add the import on line 2 and replace the weather card section.",
      explanation:
        "Now we use our extracted WeatherCard component instead of the inline JSX. This cleans up App.jsx and lets WeatherCard handle all the display logic, including the extra weather details we added.",
      targetFile: "src/App.jsx",
      codeToWrite: `import WeatherCard from './WeatherCard'`,
      placement: { type: "line", line: 2 },
      highlightLines: [2, 2],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "import\\s+WeatherCard\\s+from\\s+['\"]\\./WeatherCard['\"]",
          description: "WeatherCard is imported",
        },
      ],
      concepts: ["component imports", "refactoring"],
    },
    {
      id: "wd-step-11",
      order: 11,
      title: "Add recent searches with localStorage",
      instruction:
        "After the error state, add recent searches functionality. Add a `recentSearches` state initialized from localStorage, update it when fetching, and render clickable buttons.",
      explanation:
        "Storing recent searches in localStorage provides history that persists across page reloads. We use a Set-like approach (filter out duplicates) and limit to 5 entries. This pattern is common in search UIs.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weather-recent')
    return saved ? JSON.parse(saved) : []
  })

  const addToRecent = (searchCity) => {
    const updated = [searchCity, ...recentSearches.filter(c => c !== searchCity)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('weather-recent', JSON.stringify(updated))
  }`,
      placement: { type: "line", line: 12 },
      highlightLines: [12, 21],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[recentSearches",
          description: "recentSearches state is declared",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "localStorage\\.getItem\\(['\"]weather-recent['\"]\\)",
          description: "Recent searches are loaded from localStorage",
        },
        {
          targetFile: "src/App.jsx",
          pattern: "slice\\(0,\\s*5\\)",
          description: "Recent searches are limited to 5",
        },
      ],
      deepExplanation:
        "The recent searches logic uses several array techniques: (1) `filter(c => c !== searchCity)` removes the city if it already exists (prevents duplicates). (2) `[searchCity, ...filtered]` puts the new search at the front (most recent first). (3) `.slice(0, 5)` keeps only the 5 most recent. This is a 'deduplicating queue' pattern. We write to localStorage immediately instead of using useEffect because we want to ensure persistence even if the component unmounts before the next render cycle.",
      concepts: ["localStorage", "lazy initialization", "deduplication", "array manipulation"],
    },
    {
      id: "wd-step-12",
      order: 12,
      title: "Add temperature unit toggle",
      instruction:
        "Add a `unit` state ('C' or 'F') and render toggle buttons above the weather card. The WeatherCard already supports a `unit` prop.",
      explanation:
        "The unit toggle doesn't require re-fetching data — the API returns both Celsius and Fahrenheit. We just change which field we display. This demonstrates how UI state (unit preference) can transform the same data without additional API calls.",
      targetFile: "src/App.jsx",
      codeToWrite: `  const [unit, setUnit] = useState('C')`,
      placement: { type: "line", line: 12 },
      highlightLines: [12, 12],
      validation: [
        {
          targetFile: "src/App.jsx",
          pattern: "const\\s*\\[unit\\s*,\\s*setUnit\\]\\s*=\\s*useState\\(['\"]C['\"]\\)",
          description: "unit state is declared with default 'C'",
        },
      ],
      deepExplanation:
        "This is a great example of UI state vs. server state. The `unit` preference only affects how we display data — it doesn't change what data we have. Many API responses include data in multiple formats. By storing both and letting the UI decide which to show, we avoid unnecessary API calls. The WeatherCard component's `unit` prop determines whether to render `temp_C` or `temp_F`. This separation of concerns keeps the code flexible.",
      concepts: ["UI state", "data transformation", "props", "separation of concerns"],
    },
  ],
};
