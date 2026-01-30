import type { GuidedBuildProject } from "./guided-builds";

export const nodeApiProject: GuidedBuildProject = {
  id: "guided-node-api",
  title: "REST API Server",
  subtitle: "Build a REST API with Express.js and middleware",
  difficulty: "intermediate",
  estimatedMinutes: 35,
  conceptsSummary: [
    "Express.js Setup",
    "HTTP Methods",
    "Route Parameters",
    "Middleware",
    "Request Validation",
    "Error Handling",
  ],
  description:
    "Build a complete REST API from scratch with Express.js. You'll learn how to set up a server, define routes for CRUD operations (GET, POST, PUT, DELETE), use route parameters, create custom middleware for logging, handle errors gracefully, and respond with proper HTTP status codes. This is the foundation of every Node.js backend.",
  packageJson: {
    name: "node-api",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      start: "node src/server.js",
    },
    dependencies: {
      express: "^4.18.2",
    },
  },
  files: [
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "node-api",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: { start: "node src/server.js" },
          dependencies: { express: "^4.18.2" },
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "src/server.js",
      content: `// REST API Server
// Follow the steps in the Tutor Panel to build this! -->

// Your code will go here
`,
      language: "javascript",
    },
    {
      path: "src/routes/tasks.js",
      content: `// Task routes — you'll build these step by step

export default function taskRoutes(app) {
  // Routes will go here
}`,
      language: "javascript",
    },
    {
      path: "src/middleware/logger.js",
      content: `// Logger middleware — you'll build this

export default function logger(req, res, next) {
  next()
}`,
      language: "javascript",
    },
  ],
  steps: [
    {
      id: "na-step-1",
      order: 1,
      title: "Import Express and create the app",
      instruction:
        "In `src/server.js`, replace the placeholder with Express import and app creation.",
      explanation:
        "Express is the most popular Node.js web framework. `express()` creates an application instance that handles HTTP requests. Think of it as a switchboard that routes incoming requests to the right handler.",
      targetFile: "src/server.js",
      codeToWrite: `import express from 'express'

const app = express()`,
      placement: { type: "replace-range", startLine: 1, endLine: 4 },
      highlightLines: [1, 3],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "import\\s+express\\s+from\\s*['\"]express['\"]",
          description: "Express is imported",
        },
        {
          targetFile: "src/server.js",
          pattern: "const\\s+app\\s*=\\s*express\\(\\)",
          description: "Express app is created",
        },
      ],
      deepExplanation:
        "Express follows the 'middleware pattern' — requests flow through a chain of functions, each one doing something with the request/response. The `express()` call creates this chain. We use ES module syntax (`import`) instead of CommonJS (`require`) because we set `\"type\": \"module\"` in package.json. Express handles: routing (matching URLs to handlers), middleware (processing requests), and response sending.",
      concepts: ["Express", "app creation", "ES modules"],
    },
    {
      id: "na-step-2",
      order: 2,
      title: "Add JSON body parsing middleware",
      instruction:
        "After creating the app (line 4), add middleware to parse JSON request bodies.",
      explanation:
        "`express.json()` is built-in middleware that parses incoming JSON request bodies and makes the data available on `req.body`. Without it, POST and PUT requests would have no way to receive data.",
      targetFile: "src/server.js",
      codeToWrite: `app.use(express.json())`,
      placement: { type: "line", line: 4 },
      highlightLines: [4, 4],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.use\\(express\\.json\\(\\)\\)",
          description: "JSON body parser middleware is added",
        },
      ],
      deepExplanation:
        "`app.use()` registers middleware that runs on every request. `express.json()` is a middleware function that: (1) checks if the Content-Type header is 'application/json', (2) reads the request body stream, (3) parses the JSON string into a JavaScript object, (4) attaches it to `req.body`. Without this middleware, `req.body` would be `undefined`. This is a common pattern — middleware transforms the request before your route handlers see it.",
      concepts: ["middleware", "body parsing", "app.use", "req.body"],
    },
    {
      id: "na-step-3",
      order: 3,
      title: "Create in-memory data store",
      instruction:
        "After the middleware (line 5), create an in-memory array to store tasks and a counter for IDs.",
      explanation:
        "We use a simple array as our data store. In production you'd use a database, but an in-memory array teaches the same CRUD patterns. The `nextId` counter ensures each task gets a unique ID.",
      targetFile: "src/server.js",
      codeToWrite: `let nextId = 4
const tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build REST API', completed: false },
  { id: 3, title: 'Add middleware', completed: false },
]`,
      placement: { type: "line", line: 6 },
      highlightLines: [6, 11],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "let\\s+nextId",
          description: "ID counter is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "const\\s+tasks\\s*=\\s*\\[",
          description: "Tasks array is defined with seed data",
        },
      ],
      deepExplanation:
        "Starting with seed data makes the API immediately usable — you can call GET right away without creating tasks first. The `nextId` counter starts at 4 (one more than the last seed item) to avoid ID conflicts. `let` (not `const`) because it needs to increment. In a real app, the database would handle ID generation (auto-increment, UUID, etc.).",
      concepts: ["in-memory store", "seed data", "ID generation"],
    },
    {
      id: "na-step-4",
      order: 4,
      title: "Add GET /api/tasks route",
      instruction:
        "After the data store (around line 12), add a GET route that returns all tasks.",
      explanation:
        "`app.get()` registers a handler for HTTP GET requests at the specified path. `res.json()` sends the response as JSON with the correct Content-Type header.",
      targetFile: "src/server.js",
      codeToWrite: `app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})`,
      placement: { type: "line", line: 13 },
      highlightLines: [13, 15],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.get\\(['\"]\\/?api\\/tasks['\"]",
          description: "GET /api/tasks route is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "res\\.json\\(tasks\\)",
          description: "Response sends all tasks as JSON",
        },
      ],
      deepExplanation:
        "REST APIs follow a convention: GET requests retrieve data, POST creates, PUT updates, DELETE removes. The path `/api/tasks` is a resource endpoint — it represents the collection of all tasks. `res.json(tasks)` is shorthand for `res.setHeader('Content-Type', 'application/json'); res.send(JSON.stringify(tasks))`. Express sends a 200 status code by default for successful responses.",
      concepts: ["GET route", "res.json", "REST conventions", "resource endpoints"],
    },
    {
      id: "na-step-5",
      order: 5,
      title: "Add GET /api/tasks/:id route",
      instruction:
        "After the GET all route, add a GET route with a route parameter to find a single task by ID.",
      explanation:
        "`:id` in the route path is a route parameter — Express captures whatever value appears in that URL position and makes it available on `req.params.id`. We use it to find a specific task.",
      targetFile: "src/server.js",
      codeToWrite: `app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  res.json(task)
})`,
      placement: { type: "line", line: 17 },
      highlightLines: [17, 23],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.get\\(['\"]\\/?api\\/tasks\\/:id['\"]",
          description: "GET /api/tasks/:id route is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "req\\.params\\.id",
          description: "Route parameter is accessed",
        },
        {
          targetFile: "src/server.js",
          pattern: "res\\.status\\(404\\)",
          description: "404 status is sent for missing tasks",
        },
      ],
      deepExplanation:
        "Route parameters like `:id` are a core Express feature. When someone requests `/api/tasks/42`, Express matches the `:id` parameter to `42` and puts it in `req.params.id`. It's always a string, so we use `parseInt()` to convert it to a number for comparison. The `404` status code means 'Not Found' — the resource doesn't exist. Returning early with `return res.status(404)...` prevents the code from continuing to `res.json(task)` when no task was found.",
      concepts: ["route parameters", "req.params", "status codes", "404 Not Found", "parseInt"],
    },
    {
      id: "na-step-6",
      order: 6,
      title: "Add POST /api/tasks route",
      instruction:
        "After the GET by ID route, add a POST route to create a new task with body validation.",
      explanation:
        "POST requests create new resources. We read the data from `req.body` (parsed by the JSON middleware), validate it, create a new task with an auto-incremented ID, and return it with a 201 status.",
      targetFile: "src/server.js",
      codeToWrite: `app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' })
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})`,
      placement: { type: "line", line: 25 },
      highlightLines: [25, 37],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.post\\(['\"]\\/?api\\/tasks['\"]",
          description: "POST /api/tasks route is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "req\\.body",
          description: "Request body is read",
        },
        {
          targetFile: "src/server.js",
          pattern: "res\\.status\\(400\\)",
          description: "400 status for invalid input",
        },
        {
          targetFile: "src/server.js",
          pattern: "res\\.status\\(201\\)",
          description: "201 status for created resource",
        },
      ],
      deepExplanation:
        "Status code `400` means 'Bad Request' — the client sent invalid data. `201` means 'Created' — a new resource was successfully created. The convention is to return the created resource in the response so the client knows the assigned ID. Input validation (`!title || typeof title !== 'string'`) is crucial in APIs — never trust client data. The `nextId++` post-increment assigns the current value and then increments, ensuring each task gets a unique ID.",
      concepts: ["POST route", "req.body", "input validation", "status 201", "status 400"],
    },
    {
      id: "na-step-7",
      order: 7,
      title: "Add PUT /api/tasks/:id route",
      instruction:
        "After the POST route, add a PUT route to update an existing task.",
      explanation:
        "PUT requests update existing resources. We find the task by ID, validate the input, update the fields, and return the updated task. Only provided fields are updated — this is a 'partial update' pattern.",
      targetFile: "src/server.js",
      codeToWrite: `app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  const { title, completed } = req.body
  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = completed
  res.json(task)
})`,
      placement: { type: "line", line: 39 },
      highlightLines: [39, 48],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.put\\(['\"]\\/?api\\/tasks\\/:id['\"]",
          description: "PUT /api/tasks/:id route is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "title\\s*!==\\s*undefined",
          description: "Title is conditionally updated",
        },
        {
          targetFile: "src/server.js",
          pattern: "completed\\s*!==\\s*undefined",
          description: "Completed is conditionally updated",
        },
      ],
      deepExplanation:
        "The `!== undefined` check allows partial updates — the client can send just `{ completed: true }` without providing a title, and only the `completed` field changes. This is technically more like a PATCH request (partial update) than a PUT (full replacement), but many APIs use PUT for both. Directly mutating `task.title = title` is fine here because it's in-memory data. With a database, you'd build an UPDATE query instead.",
      concepts: ["PUT route", "partial updates", "undefined checks", "CRUD operations"],
    },
    {
      id: "na-step-8",
      order: 8,
      title: "Add DELETE /api/tasks/:id route",
      instruction:
        "After the PUT route, add a DELETE route to remove a task.",
      explanation:
        "DELETE requests remove resources. We find the task index, remove it with `splice`, and return 204 (No Content) to indicate successful deletion with no response body.",
      targetFile: "src/server.js",
      codeToWrite: `app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }
  tasks.splice(index, 1)
  res.status(204).send()
})`,
      placement: { type: "line", line: 50 },
      highlightLines: [50, 57],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.delete\\(['\"]\\/?api\\/tasks\\/:id['\"]",
          description: "DELETE /api/tasks/:id route is defined",
        },
        {
          targetFile: "src/server.js",
          pattern: "tasks\\.splice\\(index,\\s*1\\)",
          description: "Task is removed from array",
        },
        {
          targetFile: "src/server.js",
          pattern: "res\\.status\\(204\\)",
          description: "204 No Content status is sent",
        },
      ],
      deepExplanation:
        "`findIndex` returns the index of the matching item, or -1 if not found. `splice(index, 1)` removes one element at that index, mutating the array in place. Status `204` means 'No Content' — the operation succeeded but there's nothing to return (the resource is gone). We use `.send()` instead of `.json()` because 204 responses shouldn't have a body. The `-1` check pattern is important: `splice(-1, 1)` would remove the last element, which would be a bug!",
      concepts: ["DELETE route", "findIndex", "splice", "status 204", "No Content"],
    },
    {
      id: "na-step-9",
      order: 9,
      title: "Create custom logger middleware",
      instruction:
        "In `src/middleware/logger.js`, build a logging middleware that records method, URL, and timestamp for each request.",
      explanation:
        "Custom middleware is a function with `(req, res, next)` parameters. It processes the request and calls `next()` to pass control to the next middleware/route handler. Without calling `next()`, the request hangs.",
      targetFile: "src/middleware/logger.js",
      codeToWrite: `export default function logger(req, res, next) {
  const start = Date.now()
  const timestamp = new Date().toISOString()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      \`[\${timestamp}] \${req.method} \${req.url} - \${res.statusCode} (\${duration}ms)\`
    )
  })

  next()
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 13],
      validation: [
        {
          targetFile: "src/middleware/logger.js",
          pattern: "function\\s+logger\\(req,\\s*res,\\s*next\\)",
          description: "Logger middleware has correct signature",
        },
        {
          targetFile: "src/middleware/logger.js",
          pattern: "req\\.method",
          description: "HTTP method is logged",
        },
        {
          targetFile: "src/middleware/logger.js",
          pattern: "req\\.url",
          description: "URL is logged",
        },
        {
          targetFile: "src/middleware/logger.js",
          pattern: "next\\(\\)",
          description: "next() is called to continue the chain",
        },
      ],
      deepExplanation:
        "The `res.on('finish', ...)` event fires after the response is sent. This lets us log the final status code and calculate duration accurately. The middleware pattern: do something before the route handler (record start time), call `next()` to let the handler run, then do something after (log the result). If you forget to call `next()`, the request will hang forever — the client will get a timeout error. Middleware runs in the order it's registered with `app.use()`.",
      concepts: ["custom middleware", "next()", "request logging", "response events", "timing"],
    },
    {
      id: "na-step-10",
      order: 10,
      title: "Add error-handling middleware",
      instruction:
        "In `src/server.js`, after all route definitions, add error-handling middleware (4-argument function) and import the logger.",
      explanation:
        "Express error handlers have 4 parameters: `(err, req, res, next)`. The extra `err` parameter tells Express this is an error handler, not regular middleware. It catches errors thrown in route handlers.",
      targetFile: "src/server.js",
      codeToWrite: `// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})`,
      placement: { type: "line", line: 59 },
      highlightLines: [59, 65],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.use\\(\\(err,\\s*req,\\s*res,\\s*next\\)",
          description: "Error handler has 4 parameters",
        },
        {
          targetFile: "src/server.js",
          pattern: "500",
          description: "Default 500 status for server errors",
        },
      ],
      deepExplanation:
        "Express identifies error handlers by their 4-parameter function signature — all four parameters must be declared, even if you don't use `next`. When any middleware or route handler calls `next(error)` or throws, Express skips to the next error handler. The `err.status || 500` pattern uses a custom status if set, otherwise defaults to 500 (Internal Server Error). Error handlers should be registered after all routes — Express tries them in order. In production, you'd avoid sending `err.message` to clients (it might leak implementation details).",
      concepts: ["error middleware", "4-argument function", "status 500", "error handling"],
    },
    {
      id: "na-step-11",
      order: 11,
      title: "Add 404 handler for unknown routes",
      instruction:
        "Before the error handler, add a catch-all route that returns 404 for any unmatched paths. Also import and use the logger middleware at the top.",
      explanation:
        "A 404 handler catches any request that didn't match a defined route. It must come after all route definitions but before the error handler. We also wire up the logger middleware.",
      targetFile: "src/server.js",
      codeToWrite: `import express from 'express'
import logger from './middleware/logger.js'

const app = express()

app.use(express.json())
app.use(logger)`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [2, 7],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "import\\s+logger\\s+from",
          description: "Logger middleware is imported",
        },
        {
          targetFile: "src/server.js",
          pattern: "app\\.use\\(logger\\)",
          description: "Logger middleware is registered",
        },
      ],
      concepts: ["middleware registration", "imports", "middleware order"],
    },
    {
      id: "na-step-12",
      order: 12,
      title: "Start the server with app.listen",
      instruction:
        "After the error handler, add the 404 catch-all and the `app.listen()` call to start the server.",
      explanation:
        "`app.listen(port)` starts the HTTP server on the specified port. The callback runs once the server is ready. The 404 catch-all uses `app.use()` without a path — it matches everything that wasn't caught by earlier routes.",
      targetFile: "src/server.js",
      codeToWrite: `// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: \`Route \${req.method} \${req.url} not found\` })
})

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`)
  console.log('Try: GET http://localhost:3000/api/tasks')
})`,
      placement: { type: "replace-range", startLine: 59, endLine: 65 },
      highlightLines: [59, 76],
      validation: [
        {
          targetFile: "src/server.js",
          pattern: "app\\.listen\\(",
          description: "Server starts listening",
        },
        {
          targetFile: "src/server.js",
          pattern: "PORT",
          description: "Port is defined as a constant",
        },
        {
          targetFile: "src/server.js",
          pattern: "Route.*not found",
          description: "404 catch-all is present",
        },
      ],
      deepExplanation:
        "`app.listen()` is the final step — it tells Node.js to start accepting HTTP connections on the specified port. The callback fires once the server is ready, confirming it started successfully. The order of middleware matters: (1) body parser and logger run first on every request, (2) route handlers try to match the URL, (3) if no route matches, the 404 handler catches it, (4) if any handler throws, the error handler catches it. This is the Express middleware stack — understanding this order is key to building APIs.",
      concepts: ["app.listen", "server startup", "404 catch-all", "middleware order"],
    },
  ],
};
