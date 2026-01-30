import type { DailyTip } from "./daily-tips";

export const nodejsDailyTips: DailyTip[] = [
  // ─── Event Loop ───────────────────────────────────────────────────────
  {
    id: "node-tip-event-loop-basics",
    trackId: "nodejs",
    category: "Event Loop",
    title: "Understanding the Node.js Event Loop",
    content:
      "The event loop is the heart of Node.js. It allows Node to perform non-blocking I/O operations despite JavaScript being single-threaded. When your Node.js application starts, it initializes the event loop, processes the provided input script, and then begins processing the event loop.\n\nThe event loop continuously checks whether there are pending callbacks, timers, or I/O operations to process. When you call something like fs.readFile(), Node delegates the actual file reading to the operating system via libuv, freeing the main thread to handle other work. Once the OS finishes the read, the callback is placed in the appropriate queue for the event loop to pick up.\n\nThis architecture is what makes Node.js incredibly efficient for I/O-heavy workloads like web servers. Instead of spawning a new thread per request (like traditional servers), Node handles thousands of concurrent connections on a single thread by never blocking on I/O.",
    codeExample: {
      code: `console.log("1 - Script start");

setTimeout(() => {
  console.log("2 - setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise resolved");
});

process.nextTick(() => {
  console.log("4 - process.nextTick");
});

console.log("5 - Script end");

// Output order:
// 1 - Script start
// 5 - Script end
// 4 - process.nextTick
// 3 - Promise resolved
// 2 - setTimeout callback`,
      language: "javascript",
      title: "Event loop execution order",
    },
    keyTakeaway:
      "Remember: The event loop processes synchronous code first, then microtasks (nextTick, Promises), and finally macrotasks (setTimeout, setInterval, I/O callbacks).",
    relatedDrillId: "drill-node-event-loop",
  },
  {
    id: "node-tip-microtasks-macrotasks",
    trackId: "nodejs",
    category: "Event Loop",
    title: "Microtasks vs Macrotasks",
    content:
      "In the Node.js event loop, tasks are divided into two categories: microtasks and macrotasks. Understanding the difference is critical to predicting the order of asynchronous execution in your applications.\n\nMicrotasks include process.nextTick() callbacks and resolved Promise callbacks (.then, .catch, .finally). These are processed immediately after the current operation completes, before the event loop moves to the next phase. The microtask queue is drained completely before any macrotask runs.\n\nMacrotasks include setTimeout, setInterval, setImmediate, and I/O callbacks. Each iteration of the event loop processes one macrotask, then drains the entire microtask queue before picking up the next macrotask. This means if a microtask schedules another microtask, it will be processed in the same cycle, which can potentially starve macrotasks if you are not careful.",
    codeExample: {
      code: `// Microtasks always run before the next macrotask
setTimeout(() => console.log("macrotask: setTimeout"), 0);
setImmediate(() => console.log("macrotask: setImmediate"));

Promise.resolve()
  .then(() => {
    console.log("microtask: Promise 1");
    // This nested microtask runs before any macrotask
    return Promise.resolve();
  })
  .then(() => console.log("microtask: Promise 2"));

process.nextTick(() => {
  console.log("microtask: nextTick 1");
  // nextTick inside nextTick also runs before macrotasks
  process.nextTick(() => console.log("microtask: nextTick 2"));
});

// Output:
// microtask: nextTick 1
// microtask: nextTick 2
// microtask: Promise 1
// microtask: Promise 2
// macrotask: setTimeout
// macrotask: setImmediate`,
      language: "javascript",
      title: "Microtask vs macrotask scheduling",
    },
    keyTakeaway:
      "Remember: process.nextTick() fires before Promise callbacks, and all microtasks are drained before the event loop proceeds to the next macrotask.",
  },
  {
    id: "node-tip-event-loop-phases",
    trackId: "nodejs",
    category: "Event Loop",
    title: "The Six Phases of the Event Loop",
    content:
      "The Node.js event loop operates in six distinct phases, each with its own FIFO queue of callbacks: timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Understanding these phases helps you reason about when your callbacks will execute.\n\nThe timers phase executes callbacks scheduled by setTimeout() and setInterval(). The poll phase retrieves new I/O events and executes I/O-related callbacks. The check phase executes setImmediate() callbacks. This is why setImmediate() always runs after I/O callbacks in the same loop iteration.\n\nA practical implication: when you call setTimeout(fn, 0) and setImmediate(fn) from within an I/O callback, setImmediate will always fire first because the check phase comes right after the poll phase. Outside of I/O callbacks, the order between setTimeout(fn, 0) and setImmediate(fn) is non-deterministic.",
    codeExample: {
      code: `import { readFile } from "node:fs";

// Outside I/O: order is non-deterministic
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));

// Inside I/O callback: setImmediate always fires first
readFile(__filename, () => {
  setTimeout(() => console.log("IO -> timeout"), 0);
  setImmediate(() => console.log("IO -> immediate"));
});

// When run inside the I/O callback:
// IO -> immediate  (check phase comes right after poll)
// IO -> timeout    (timers phase is at the start of next iteration)`,
      language: "javascript",
      title: "Event loop phases and execution order",
    },
    keyTakeaway:
      "Remember: Inside an I/O callback, setImmediate() always executes before setTimeout(fn, 0) because the check phase immediately follows the poll phase.",
  },

  // ─── Streams ──────────────────────────────────────────────────────────
  {
    id: "node-tip-readable-streams",
    trackId: "nodejs",
    category: "Streams",
    title: "Readable Streams: Processing Data Piece by Piece",
    content:
      "Readable streams are one of the most powerful abstractions in Node.js. They let you consume data piece by piece as it becomes available, rather than loading everything into memory at once. This is critical when working with large files, network responses, or any data source that could be too large to fit in memory.\n\nReadable streams operate in two modes: flowing and paused. In flowing mode, data is read automatically and provided via events. In paused mode, you must explicitly call stream.read() to get chunks. The most common way to consume a readable stream is by listening to the 'data' event or using the for-await-of syntax introduced in modern Node.js.\n\nCommon readable streams include fs.createReadStream(), HTTP request objects (incoming), process.stdin, and responses from HTTP client requests. When you use createReadStream instead of readFile, you can start processing data immediately without waiting for the entire file to load.",
    codeExample: {
      code: `import { createReadStream } from "node:fs";

// Reading a large file efficiently with streams
const stream = createReadStream("large-log-file.txt", {
  encoding: "utf-8",
  highWaterMark: 64 * 1024, // 64KB chunks
});

let lineCount = 0;

// Modern async iteration approach
async function countLines() {
  for await (const chunk of stream) {
    // Count newlines in each chunk
    lineCount += chunk.split("\\n").length - 1;
  }
  console.log(\`Total lines: \${lineCount}\`);
}

countLines().catch(console.error);

// Even for a 10GB file, memory usage stays constant
// because we only hold one chunk at a time`,
      language: "javascript",
      title: "Using readable streams with async iteration",
    },
    keyTakeaway:
      "Remember: Use createReadStream instead of readFile for large files to keep memory usage constant regardless of file size.",
    relatedDrillId: "drill-node-streams-readable",
  },
  {
    id: "node-tip-writable-streams",
    trackId: "nodejs",
    category: "Streams",
    title: "Writable Streams: Outputting Data Efficiently",
    content:
      "Writable streams are the counterpart to readable streams. They represent a destination to which data can be written, such as files, HTTP responses, or standard output. Understanding writable streams is essential for building efficient data pipelines.\n\nThe key method on writable streams is .write(chunk), which returns a boolean indicating whether you should continue writing immediately. When it returns false, the internal buffer is full and you should wait for the 'drain' event before writing more. Ignoring this backpressure signal can lead to excessive memory consumption.\n\nAlways call .end() when you are done writing to signal that no more data will be written. This triggers the 'finish' event once all data has been flushed to the underlying resource. Forgetting to call .end() is a common source of bugs where files appear incomplete or HTTP responses hang.",
    codeExample: {
      code: `import { createWriteStream } from "node:fs";

const output = createWriteStream("output.csv");

// Write CSV header
output.write("id,name,score\\n");

// Respect backpressure when writing lots of data
async function writeRecords(records) {
  for (const record of records) {
    const line = \`\${record.id},\${record.name},\${record.score}\\n\`;
    const canContinue = output.write(line);

    if (!canContinue) {
      // Buffer is full, wait for it to drain
      await new Promise((resolve) => output.once("drain", resolve));
    }
  }

  // Signal we are done writing
  output.end();

  // Wait for all data to be flushed
  await new Promise((resolve) => output.once("finish", resolve));
  console.log("All records written successfully");
}

const records = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  name: \`user_\${i + 1}\`,
  score: Math.floor(Math.random() * 100),
}));

writeRecords(records).catch(console.error);`,
      language: "javascript",
      title: "Writing data with backpressure handling",
    },
    keyTakeaway:
      "Remember: Always check the return value of stream.write() and wait for the 'drain' event when it returns false to prevent memory issues.",
  },
  {
    id: "node-tip-transform-streams",
    trackId: "nodejs",
    category: "Streams",
    title: "Transform Streams: Processing Data in Flight",
    content:
      "Transform streams are duplex streams that read input, process it, and produce output. They sit between a readable and writable stream, modifying data as it flows through. Common built-in transform streams include zlib compression streams and crypto cipher streams.\n\nCreating custom transform streams lets you build composable data processing pipelines. Each chunk passes through your _transform method where you can modify, filter, or expand the data before pushing it downstream. This pattern is far more memory-efficient than loading all data, processing it, and then writing it out.\n\nTransform streams are especially useful for ETL (Extract, Transform, Load) operations, log processing, and real-time data transformation. They compose naturally with pipe(), letting you build complex processing pipelines from simple, focused transforms.",
    codeExample: {
      code: `import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

// Custom transform: convert CSV lines to uppercase
// and filter out lines with low scores
class ScoreFilter extends Transform {
  constructor(minScore) {
    super({ objectMode: false });
    this.minScore = minScore;
    this.buffer = "";
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split("\\n");
    // Keep the last partial line in the buffer
    this.buffer = lines.pop();

    for (const line of lines) {
      const parts = line.split(",");
      const score = parseInt(parts[2], 10);
      if (!isNaN(score) && score >= this.minScore) {
        this.push(line.toUpperCase() + "\\n");
      }
    }
    callback();
  }

  _flush(callback) {
    // Process any remaining data
    if (this.buffer.trim()) {
      this.push(this.buffer.toUpperCase() + "\\n");
    }
    callback();
  }
}

await pipeline(
  createReadStream("scores.csv"),
  new ScoreFilter(70),
  createWriteStream("high-scores.csv")
);
console.log("Pipeline complete");`,
      language: "javascript",
      title: "Custom transform stream for data processing",
    },
    keyTakeaway:
      "Remember: Transform streams let you build composable, memory-efficient data pipelines that process data chunk by chunk as it flows through.",
    relatedDrillId: "drill-node-streams-transform",
  },
  {
    id: "node-tip-stream-piping",
    trackId: "nodejs",
    category: "Streams",
    title: "Stream Piping and the pipeline() Utility",
    content:
      "Piping streams together is the idiomatic way to connect a data source to a destination through optional transforms. While the classic .pipe() method works, it has a significant flaw: it does not propagate errors or clean up streams when something goes wrong, potentially leading to memory leaks.\n\nThe stream.pipeline() function (and its promise-based version from stream/promises) solves these problems. It properly forwards errors, destroys all streams in the chain when one fails, and calls your callback (or resolves/rejects the promise) when the pipeline is complete. Always prefer pipeline() over manual .pipe() chains in production code.\n\nPipeline also supports async generators, which lets you mix streams with generator functions for a more flexible processing model. This is particularly powerful for building quick data transformations without creating a full Transform stream class.",
    codeExample: {
      code: `import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

// BAD: .pipe() does not handle errors properly
// createReadStream("input.txt")
//   .pipe(createGzip())
//   .pipe(createWriteStream("input.txt.gz"));
// If createReadStream errors, the write stream leaks!

// GOOD: pipeline() handles errors and cleanup
async function compressFile(input, output) {
  try {
    await pipeline(
      createReadStream(input),
      createGzip(),
      createWriteStream(output)
    );
    console.log(\`Compressed \${input} -> \${output}\`);
  } catch (err) {
    console.error("Pipeline failed:", err.message);
    // All streams are properly destroyed on error
  }
}

// You can also use async generators in a pipeline
async function processLogs(inputPath, outputPath) {
  async function* filterErrors(source) {
    for await (const chunk of source) {
      const lines = chunk.toString().split("\\n");
      for (const line of lines) {
        if (line.includes("ERROR")) {
          yield line + "\\n";
        }
      }
    }
  }

  await pipeline(
    createReadStream(inputPath),
    filterErrors,
    createWriteStream(outputPath)
  );
}

await compressFile("data.log", "data.log.gz");`,
      language: "javascript",
      title: "Safe stream piping with pipeline()",
    },
    keyTakeaway:
      "Remember: Always use pipeline() from 'stream/promises' instead of .pipe() to ensure proper error handling and resource cleanup.",
  },

  // ─── Error Handling ───────────────────────────────────────────────────
  {
    id: "node-tip-operational-vs-programmer-errors",
    trackId: "nodejs",
    category: "Error Handling",
    title: "Operational Errors vs Programmer Errors",
    content:
      "Node.js errors fall into two fundamentally different categories, and handling them correctly is crucial for building robust applications. Operational errors are runtime problems that happen during normal operation: a file not found, a network timeout, invalid user input, or a database connection failure. These are expected and your code should handle them gracefully.\n\nProgrammer errors are bugs in your code: reading a property of undefined, passing the wrong type to a function, or forgetting to handle a promise rejection. These are unexpected and typically indicate a logic flaw that needs to be fixed in the code itself, not handled at runtime.\n\nThe critical distinction is in how you respond. Operational errors should be caught and handled with a recovery strategy (retry, return an error response, use a fallback). Programmer errors should crash the process so you can find and fix the bug. Trying to 'handle' a programmer error by catching it often leads to the application continuing in a corrupt state.",
    codeExample: {
      code: `import { readFile } from "node:fs/promises";

// OPERATIONAL ERROR: File might not exist (expected scenario)
async function loadConfig(filePath) {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File not found is an operational error - handle gracefully
      console.log("Config file not found, using defaults");
      return { port: 3000, host: "localhost" };
    }
    if (err instanceof SyntaxError) {
      // Invalid JSON is also operational - the file is corrupt
      throw new Error(\`Invalid config file: \${err.message}\`);
    }
    // Unknown errors should propagate
    throw err;
  }
}

// PROGRAMMER ERROR: Should crash so you find and fix the bug
function processUser(user) {
  // Don't do this:
  // if (!user) return null;  // Hides the bug!

  // Let it crash so you can fix the caller:
  const name = user.name.toUpperCase();
  return { ...user, name };
}

// The crash tells you: "someone called processUser(undefined)"
// which is a bug at the call site that needs fixing`,
      language: "javascript",
      title: "Distinguishing operational and programmer errors",
    },
    keyTakeaway:
      "Remember: Handle operational errors with recovery strategies, but let programmer errors crash the process so the underlying bug gets discovered and fixed.",
  },
  {
    id: "node-tip-async-try-catch",
    trackId: "nodejs",
    category: "Error Handling",
    title: "Async Error Handling with try/catch",
    content:
      "One of the best things about async/await in Node.js is that it lets you use familiar try/catch blocks for asynchronous error handling. Before async/await, catching errors in callbacks required checking error-first arguments, and Promise chains required .catch() handlers. With async/await, the control flow looks synchronous and errors propagate naturally.\n\nWhen an awaited promise rejects, the rejection is thrown as an exception at the await point, and you can catch it just like a synchronous error. This makes it easy to wrap multiple async operations in a single try/catch, or to handle each one individually depending on your recovery strategy.\n\nA common mistake is forgetting to wrap an async function call in try/catch or forgetting to add a .catch() to the returned promise. In modern Node.js, unhandled promise rejections will terminate the process, so it is important to always handle errors at the top level of your application.",
    codeExample: {
      code: `import { readFile, writeFile } from "node:fs/promises";

// Wrapping multiple async operations with try/catch
async function migrateData(sourcePath, destPath) {
  try {
    const raw = await readFile(sourcePath, "utf-8");
    const data = JSON.parse(raw);

    // Transform the data
    const migrated = data.map((record) => ({
      ...record,
      version: 2,
      updatedAt: new Date().toISOString(),
    }));

    await writeFile(destPath, JSON.stringify(migrated, null, 2));
    console.log(\`Migrated \${migrated.length} records\`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(\`File not found: \${err.path}\`);
    } else if (err instanceof SyntaxError) {
      console.error("Source file contains invalid JSON");
    } else {
      console.error("Migration failed:", err.message);
    }
    // Re-throw if the caller needs to know it failed
    throw err;
  }
}

// Always handle errors at the top level
migrateData("old-data.json", "new-data.json").catch((err) => {
  process.exitCode = 1;
});`,
      language: "javascript",
      title: "Using try/catch with async/await",
    },
    keyTakeaway:
      "Remember: With async/await, rejected promises become thrown exceptions that you can catch with try/catch, but always ensure the top-level call has error handling.",
    relatedDrillId: "drill-node-error-handling",
  },

  // ─── Express ──────────────────────────────────────────────────────────
  {
    id: "node-tip-express-middleware",
    trackId: "nodejs",
    category: "Express",
    title: "Express Middleware Chain Explained",
    content:
      "Express middleware functions are the building blocks of any Express application. Each middleware is a function that has access to the request object (req), the response object (res), and the next middleware function (next). Middleware functions can execute code, modify req and res, end the request-response cycle, or call next() to pass control to the next middleware.\n\nMiddleware is executed in the order it is defined. Application-level middleware added with app.use() runs for every request, while route-level middleware only runs for specific routes. This ordering is crucial: if you place your authentication middleware after your route handlers, the routes will be unprotected.\n\nThe middleware pattern enables clean separation of concerns. Instead of cramming authentication, logging, validation, and business logic into a single route handler, you split each concern into its own middleware function. This makes code easier to test, reuse, and maintain.",
    codeExample: {
      code: `import express from "express";

const app = express();

// 1. Logging middleware - runs for every request
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.url} \${res.statusCode} \${duration}ms\`);
  });
  next();
});

// 2. JSON body parser
app.use(express.json());

// 3. Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }
  // In real apps, verify the token here
  req.userId = "user-123"; // Attach user info to request
  next();
}

// 4. Public route - no auth needed
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 5. Protected routes - auth middleware runs first
app.get("/profile", authenticate, (req, res) => {
  res.json({ userId: req.userId, name: "Alice" });
});

app.listen(3000);`,
      language: "javascript",
      title: "Express middleware execution chain",
    },
    keyTakeaway:
      "Remember: Express middleware runs in the order it is defined. Place authentication and parsing middleware before your route handlers, not after.",
    relatedDrillId: "drill-node-express-middleware",
  },
  {
    id: "node-tip-express-next-patterns",
    trackId: "nodejs",
    category: "Express",
    title: "Express next() Patterns and Error Handling",
    content:
      "The next() function in Express does more than just pass control to the next middleware. How you call it determines what happens next in the request lifecycle. Calling next() with no arguments moves to the next matching middleware or route handler. Calling next(err) with an error argument skips all remaining regular middleware and jumps directly to the error-handling middleware.\n\nError-handling middleware is identified by having exactly four parameters: (err, req, res, next). This is not just a convention; Express uses the function's arity (number of parameters) to distinguish error handlers from regular middleware. Always define your error-handling middleware at the end of your middleware stack.\n\nThere is also next('route'), which skips the remaining handlers on the current route and moves to the next matching route. This is useful for conditional route handling, where you want to skip the rest of a route's middleware chain based on some condition.",
    codeExample: {
      code: `import express from "express";

const app = express();
app.use(express.json());

// Async wrapper to catch errors automatically
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Validation middleware - passes error to next(err)
function validateBody(req, res, next) {
  if (!req.body.email) {
    const err = new Error("Email is required");
    err.status = 400;
    return next(err); // Skips to error handler
  }
  next(); // Continues to next middleware
}

app.post(
  "/users",
  validateBody,
  asyncHandler(async (req, res) => {
    // If validation passes, this runs
    // If this throws, asyncHandler catches it and calls next(err)
    const user = await createUser(req.body);
    res.status(201).json(user);
  })
);

// Error-handling middleware (4 params - Express checks arity!)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(3000);`,
      language: "javascript",
      title: "Using next() for error propagation in Express",
    },
    keyTakeaway:
      "Remember: Calling next(err) skips all regular middleware and jumps to the error handler. Error handlers must have exactly 4 parameters (err, req, res, next).",
    relatedDrillId: "drill-node-express-errors",
  },

  // ─── Modules ──────────────────────────────────────────────────────────
  {
    id: "node-tip-cjs-vs-esm",
    trackId: "nodejs",
    category: "Modules",
    title: "CommonJS vs ES Modules in Node.js",
    content:
      "Node.js supports two module systems: CommonJS (CJS) and ES Modules (ESM). CommonJS has been the default since Node.js was created and uses require() and module.exports. ES Modules use the import/export syntax standardized in ES2015 and are now the recommended approach for new projects.\n\nTo use ES Modules in Node.js, you can either set \"type\": \"module\" in your package.json (which makes all .js files treated as ESM), or use the .mjs file extension for individual files. CommonJS files can use the .cjs extension when your project defaults to ESM. ES Modules are always in strict mode, have top-level await support, and use static analysis for imports.\n\nOne key difference: ESM imports are asynchronous and statically analyzable, meaning tools can tree-shake unused exports. CJS require() is synchronous and dynamic, meaning you can call require() inside conditionals or loops. When migrating from CJS to ESM, note that __dirname and __filename are not available in ESM. Use import.meta.url and the URL/path utilities instead.",
    codeExample: {
      code: `// ── CommonJS (traditional) ──
// math.cjs
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
module.exports = { add, multiply };

// app.cjs
const { add, multiply } = require("./math.cjs");
console.log(add(2, 3));

// ── ES Modules (modern) ──
// math.js (with "type": "module" in package.json)
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// app.js
import { add, multiply } from "./math.js";
console.log(add(2, 3));

// ESM replacement for __dirname and __filename
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = join(__dirname, "config.json");
console.log("Config at:", configPath);

// Top-level await works in ESM
const data = await fetch("https://api.example.com/config");
const config = await data.json();`,
      language: "javascript",
      title: "CommonJS vs ES Modules syntax comparison",
    },
    keyTakeaway:
      "Remember: Use ES Modules for new Node.js projects (set \"type\": \"module\" in package.json) and replace __dirname with import.meta.url utilities.",
  },

  // ─── Patterns ─────────────────────────────────────────────────────────
  {
    id: "node-tip-buffer-basics",
    trackId: "nodejs",
    category: "Patterns",
    title: "Buffer Basics: Working with Binary Data",
    content:
      "Buffers are Node.js's way of handling raw binary data. Unlike JavaScript strings, which are encoded in UTF-16, Buffers represent fixed-length sequences of bytes. They are essential when working with file I/O, network protocols, cryptography, or any scenario involving binary data.\n\nBuffers can be created from strings, arrays, or allocated with a specific size. When you read a file without specifying an encoding, Node.js returns a Buffer. When working with network protocols like TCP or WebSockets, data arrives as Buffers. Understanding how to convert between Buffers and strings (using encodings like utf-8, hex, base64) is fundamental.\n\nModern Node.js also provides the Uint8Array class from the Web Platform, and Buffer is actually a subclass of Uint8Array. For new code that does not need Buffer-specific methods, you can often use Uint8Array directly, which improves cross-platform compatibility with browser and Deno code.",
    codeExample: {
      code: `// Creating Buffers
const buf1 = Buffer.from("Hello, Node.js!", "utf-8");
const buf2 = Buffer.alloc(16); // 16 zero-filled bytes
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"

// Converting between formats
console.log(buf1.toString("utf-8"));   // "Hello, Node.js!"
console.log(buf1.toString("hex"));     // "48656c6c6f2c204e6f64652e6a7321"
console.log(buf1.toString("base64"));  // "SGVsbG8sIE5vZGUuanMh"

// Buffer operations
const part1 = Buffer.from("Hello ");
const part2 = Buffer.from("World");
const combined = Buffer.concat([part1, part2]);
console.log(combined.toString()); // "Hello World"

// Comparing buffers
const a = Buffer.from("abc");
const b = Buffer.from("abc");
console.log(a.equals(b));        // true
console.log(Buffer.compare(a, b)); // 0 (equal)

// Writing to specific positions
const header = Buffer.alloc(8);
header.writeUInt32BE(0x01020304, 0); // Write 4 bytes at offset 0
header.writeUInt32BE(0x05060708, 4); // Write 4 bytes at offset 4
console.log(header.toString("hex")); // "0102030405060708"`,
      language: "javascript",
      title: "Working with Node.js Buffers",
    },
    keyTakeaway:
      "Remember: Buffers handle raw binary data in Node.js. Use Buffer.from() to create them and .toString(encoding) to convert them to strings in any encoding.",
  },
  {
    id: "node-tip-process-signals",
    trackId: "nodejs",
    category: "Patterns",
    title: "Process Signals and Graceful Shutdown",
    content:
      "When deploying Node.js applications in production, handling process signals correctly is critical. Signals like SIGTERM (sent by process managers like PM2 or Kubernetes) and SIGINT (sent when you press Ctrl+C) tell your application to shut down. Without proper handling, your app will terminate immediately, potentially dropping active requests or leaving data in an inconsistent state.\n\nA graceful shutdown means your application stops accepting new connections, finishes processing in-flight requests, closes database connections, flushes logs, and then exits cleanly. This prevents data loss and ensures users do not see broken responses.\n\nIn Kubernetes, the default grace period is 30 seconds. After sending SIGTERM, the orchestrator waits for your app to exit, then sends SIGKILL if it has not. Your shutdown handler should complete well within this window. Always include a forced exit timeout as a safety net in case cleanup hangs.",
    codeExample: {
      code: `import http from "node:http";

const server = http.createServer((req, res) => {
  // Simulate some async work
  setTimeout(() => {
    res.writeHead(200);
    res.end("OK");
  }, 100);
});

server.listen(3000, () => console.log("Server listening on :3000"));

// Graceful shutdown handler
async function shutdown(signal) {
  console.log(\`\\nReceived \${signal}. Starting graceful shutdown...\`);

  // 1. Stop accepting new connections
  server.close(() => {
    console.log("HTTP server closed");
  });

  // 2. Close database connections, flush queues, etc.
  try {
    // await db.disconnect();
    // await messageQueue.flush();
    console.log("Cleanup complete");
  } catch (err) {
    console.error("Error during cleanup:", err);
  }

  // 3. Safety timeout - force exit if cleanup hangs
  const forceTimeout = setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000); // 10 second safety net

  forceTimeout.unref(); // Don't keep process alive just for this timer
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`,
      language: "javascript",
      title: "Implementing graceful shutdown",
    },
    keyTakeaway:
      "Remember: Always handle SIGTERM and SIGINT to gracefully shut down your server, close connections, and include a forced-exit timeout as a safety net.",
    relatedDrillId: "drill-node-graceful-shutdown",
  },
  {
    id: "node-tip-callback-patterns",
    trackId: "nodejs",
    category: "Patterns",
    title: "Understanding the Error-First Callback Pattern",
    content:
      "The error-first callback pattern is one of the oldest conventions in Node.js. Callback functions always receive an error as their first argument, and the result as the second. If no error occurred, the first argument is null. This pattern is still used extensively in the Node.js core API and many npm packages, so understanding it is important even if you prefer Promises.\n\nThe convention exists because JavaScript does not have built-in checked exceptions, and in the callback world there was no standard way to signal errors. By placing the error first, it forces you to at least acknowledge the error argument before accessing the data. Ignoring the error argument is a common source of bugs.\n\nModern Node.js provides util.promisify() to convert callback-based functions to promise-based ones, and most core modules now have a promises sub-module (like fs/promises). However, you will still encounter the callback pattern in older libraries, native addon APIs, and some performance-critical code where the overhead of promises is undesirable.",
    codeExample: {
      code: `import { readFile } from "node:fs";
import { promisify } from "node:util";

// Traditional error-first callback pattern
readFile("config.json", "utf-8", (err, data) => {
  if (err) {
    // ALWAYS check the error first
    console.error("Failed to read config:", err.message);
    return;
  }
  const config = JSON.parse(data);
  console.log("Config loaded:", config);
});

// Creating your own callback-style function
function fetchUser(id, callback) {
  setTimeout(() => {
    if (!id) {
      // Error first, data second
      return callback(new Error("User ID is required"), null);
    }
    callback(null, { id, name: "Alice", role: "admin" });
  }, 100);
}

// Converting callbacks to promises with util.promisify
const fetchUserAsync = promisify(fetchUser);

async function main() {
  try {
    const user = await fetchUserAsync("user-123");
    console.log("User:", user);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();`,
      language: "javascript",
      title: "Error-first callbacks and promisification",
    },
    keyTakeaway:
      "Remember: Error-first callbacks pass (err, result). Always check err before using the result, and use util.promisify() to convert them to promises.",
  },
  {
    id: "node-tip-promise-all-vs-allsettled",
    trackId: "nodejs",
    category: "Patterns",
    title: "Promise.all vs Promise.allSettled",
    content:
      "When running multiple async operations concurrently, Promise.all and Promise.allSettled serve different purposes. Promise.all takes an array of promises and resolves when all succeed, but rejects immediately when any single promise rejects. This is a fail-fast behavior: one failure means you get none of the results.\n\nPromise.allSettled waits for all promises to complete regardless of whether they fulfill or reject. It returns an array of result objects, each with a status of either 'fulfilled' (with a value property) or 'rejected' (with a reason property). This gives you full visibility into what succeeded and what failed.\n\nUse Promise.all when all operations must succeed for the overall operation to be meaningful (like loading all required configuration files). Use Promise.allSettled when you want partial results and need to handle each failure individually (like sending notifications to multiple users where some might fail).",
    codeExample: {
      code: `// Promise.all: Fail-fast - rejects on first failure
async function loadAllConfigs() {
  try {
    const [db, cache, auth] = await Promise.all([
      loadConfig("database"),
      loadConfig("cache"),
      loadConfig("auth"),
    ]);
    // Only reaches here if ALL three succeed
    return { db, cache, auth };
  } catch (err) {
    // If ANY config fails, we end up here
    console.error("Cannot start: missing config:", err.message);
    process.exit(1);
  }
}

// Promise.allSettled: Wait for everything, handle individually
async function notifyAllUsers(userIds, message) {
  const results = await Promise.allSettled(
    userIds.map((id) => sendNotification(id, message))
  );

  const succeeded = results.filter((r) => r.status === "fulfilled");
  const failed = results.filter((r) => r.status === "rejected");

  console.log(\`Sent: \${succeeded.length}/\${results.length}\`);

  if (failed.length > 0) {
    console.warn("Failed notifications:");
    failed.forEach((r) => console.warn(\`  - \${r.reason.message}\`));
  }

  return { succeeded: succeeded.length, failed: failed.length };
}

// Promise.all with concurrency limit (common pattern)
async function mapWithLimit(items, limit, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}`,
      language: "javascript",
      title: "Choosing between Promise.all and Promise.allSettled",
    },
    keyTakeaway:
      "Remember: Use Promise.all when every operation must succeed (fail-fast), and Promise.allSettled when you need individual results from all operations regardless of failures.",
    relatedDrillId: "drill-node-promise-patterns",
  },
  {
    id: "node-tip-unhandled-rejections",
    trackId: "nodejs",
    category: "Patterns",
    title: "Handling Unhandled Promise Rejections",
    content:
      "In modern Node.js (v15+), unhandled promise rejections cause the process to exit with a non-zero exit code by default. This means if you forget to catch a rejected promise, your application will crash. While this might seem harsh, it is much better than silently swallowing errors, which is what older versions did.\n\nThe 'unhandledRejection' event on the process object lets you add a global safety net for uncaught promise rejections. This is the right place to log the error, report it to your monitoring system, and then let the process exit. You should not use this handler to prevent the crash, because an unhandled rejection means something unexpected happened and your application may be in an inconsistent state.\n\nThe best practice is to always handle rejections where they occur. Add .catch() to promise chains, use try/catch with async/await, and use wrapper functions in Express to catch async route handler errors. The global handler should be your last line of defense, not your primary error-handling strategy.",
    codeExample: {
      code: `// Global safety net for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise);
  console.error("Reason:", reason);

  // Report to monitoring (Sentry, DataDog, etc.)
  // reportError(reason);

  // Exit with failure code
  // The process should exit because state may be corrupted
  process.exit(1);
});

// Global safety net for uncaught exceptions
process.on("uncaughtException", (err, origin) => {
  console.error("Uncaught Exception:", err);
  console.error("Origin:", origin);
  process.exit(1);
});

// Common mistake: forgetting to await or catch
async function riskyOperation() {
  throw new Error("Something went wrong");
}

// BAD: No catch, will trigger unhandledRejection
// riskyOperation();

// GOOD: Always handle the rejection
riskyOperation().catch((err) => {
  console.error("Handled:", err.message);
});

// GOOD: Or use try/catch in an async context
async function main() {
  try {
    await riskyOperation();
  } catch (err) {
    console.error("Handled:", err.message);
  }
}

main();`,
      language: "javascript",
      title: "Global and local promise rejection handling",
    },
    keyTakeaway:
      "Remember: Always catch promise rejections locally with try/catch or .catch(), and set up a global unhandledRejection handler as a safety net for your monitoring.",
  },

  // ─── Security ─────────────────────────────────────────────────────────
  {
    id: "node-tip-helmet-security",
    trackId: "nodejs",
    category: "Security",
    title: "Securing Express Apps with Helmet",
    content:
      "Helmet is a middleware collection that sets various HTTP response headers to help protect your Express app from common web vulnerabilities. It is one of the first packages you should add to any Express application. With a single line of code, it enables about 15 security-related headers.\n\nHelmet sets headers like Content-Security-Policy (which prevents XSS by controlling what resources can load), X-Content-Type-Options (which prevents MIME sniffing), Strict-Transport-Security (which enforces HTTPS), and X-Frame-Options (which prevents clickjacking). Each of these headers addresses a specific attack vector.\n\nYou can customize each header individually. For example, you might need to relax the Content-Security-Policy to allow loading scripts from a CDN, or disable the X-Frame-Options header if your app needs to be embedded in iframes. The key is to start with helmet() defaults and then relax only what you need.",
    codeExample: {
      code: `import express from "express";
import helmet from "helmet";

const app = express();

// Basic usage: enables all default protections
app.use(helmet());

// Custom configuration for specific needs
app.use(
  helmet({
    // Allow loading scripts from your CDN
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.example.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://images.example.com"],
        connectSrc: ["'self'", "https://api.example.com"],
      },
    },
    // Enable strict HTTPS (after you have TLS set up)
    strictTransportSecurity: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    // Allow your app to be framed by same origin only
    frameguard: { action: "sameorigin" },
  })
);

// Your routes here
app.get("/", (req, res) => {
  res.json({ message: "Secured with Helmet" });
});

app.listen(3000);

// Without Helmet: 0 security headers
// With Helmet: ~15 security headers set automatically`,
      language: "javascript",
      title: "Adding Helmet security headers to Express",
    },
    keyTakeaway:
      "Remember: Add helmet() as one of the first middleware in your Express app to automatically set security headers that protect against XSS, clickjacking, and other attacks.",
  },
  {
    id: "node-tip-cors-configuration",
    trackId: "nodejs",
    category: "Security",
    title: "Configuring CORS Correctly",
    content:
      "Cross-Origin Resource Sharing (CORS) controls which domains can make requests to your API from a browser. Misconfigured CORS is a common security vulnerability. The default browser behavior blocks cross-origin requests, and CORS headers tell the browser which origins to allow.\n\nThe most common mistake is setting Access-Control-Allow-Origin to '*' (allow everything) for APIs that handle sensitive data or use cookies. This essentially disables the browser's same-origin policy protection. Instead, explicitly whitelist the origins that should have access.\n\nFor APIs that use cookies or authorization headers, you must also set Access-Control-Allow-Credentials to true and specify an explicit origin (not '*'). The browser will reject responses with credentials if the origin is set to wildcard. Always validate the origin against your whitelist rather than reflecting the request's Origin header, which would make any site able to access your API.",
    codeExample: {
      code: `import express from "express";
import cors from "cors";

const app = express();

// BAD: Allows any website to access your API
// app.use(cors()); // origin: "*" by default

// GOOD: Whitelist specific origins
const allowedOrigins = [
  "https://myapp.com",
  "https://staging.myapp.com",
  "http://localhost:3000", // for local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(\`Origin \${origin} not allowed by CORS\`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and auth headers
    maxAge: 86400, // Cache preflight for 24 hours
  })
);

// Route-specific CORS (more restrictive for sensitive endpoints)
const strictCors = cors({
  origin: "https://myapp.com", // Only production
  methods: ["POST"],
  credentials: true,
});

app.post("/api/payments", strictCors, (req, res) => {
  res.json({ status: "processed" });
});

app.listen(3000);`,
      language: "javascript",
      title: "Secure CORS configuration for Express",
    },
    keyTakeaway:
      "Remember: Never use origin '*' with credentials. Whitelist specific origins and use route-level CORS for sensitive endpoints.",
  },
  {
    id: "node-tip-rate-limiting",
    trackId: "nodejs",
    category: "Security",
    title: "Rate Limiting to Prevent Abuse",
    content:
      "Rate limiting controls how many requests a client can make to your API within a given time window. Without rate limiting, your API is vulnerable to denial-of-service attacks, brute-force login attempts, and excessive resource consumption from misbehaving clients.\n\nThe express-rate-limit package provides a simple middleware that tracks requests by IP address and returns a 429 (Too Many Requests) response when the limit is exceeded. For production, you should use an external store like Redis instead of the default in-memory store, which does not work across multiple server instances.\n\nApply different rate limits to different endpoints based on their sensitivity. Login endpoints should have strict limits (e.g., 5 attempts per minute) to prevent brute-force attacks, while general API endpoints might allow 100 requests per minute. Always return a Retry-After header so clients know when they can try again.",
    codeExample: {
      code: `import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

// General API rate limit: 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  message: {
    error: "Too many requests, please try again later",
    retryAfter: "15 minutes",
  },
});

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 attempts per minute
  message: {
    error: "Too many login attempts, please wait before trying again",
  },
  // Use a custom key generator for more control
  keyGenerator: (req) => {
    return req.ip + ":" + req.body?.email;
  },
});

// Apply general limiter to all API routes
app.use("/api/", apiLimiter);

// Apply strict limiter to auth routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.post("/api/auth/login", express.json(), (req, res) => {
  // Login logic here
  res.json({ token: "jwt-token" });
});

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

app.listen(3000);`,
      language: "javascript",
      title: "Implementing rate limiting in Express",
    },
    keyTakeaway:
      "Remember: Apply strict rate limits (5/minute) to authentication endpoints and moderate limits (100/15min) to general API routes. Use Redis for multi-instance deployments.",
    relatedDrillId: "drill-node-rate-limiting",
  },
  {
    id: "node-tip-input-sanitization",
    trackId: "nodejs",
    category: "Security",
    title: "Input Validation and Sanitization",
    content:
      "Never trust user input. Every piece of data coming from a client, whether from request bodies, URL parameters, query strings, or headers, must be validated and sanitized before use. Failing to do so opens your application to injection attacks (SQL injection, NoSQL injection, XSS), path traversal, and other exploits.\n\nValidation checks that the input conforms to expected formats and constraints: Is this email address valid? Is this number within the expected range? Is this string a valid UUID? Libraries like Zod, Joi, or express-validator provide declarative schemas for validation. Sanitization modifies the input to remove or escape dangerous content, like HTML tags or special characters.\n\nValidation should happen as early as possible in your request pipeline, ideally in middleware before the request reaches your business logic. This creates a clean boundary: everything past the validation layer is known to be safe. This is far more reliable than trying to sanitize data at the point of use, scattered across your codebase.",
    codeExample: {
      code: `import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

// Define a schema for user creation
const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .trim(),
  email: z.string().email("Invalid email address").toLowerCase(),
  age: z.number().int().min(13).max(120).optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

// Validation middleware factory
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    // Replace body with parsed and sanitized data
    req.body = result.data;
    next();
  };
}

app.post("/api/users", validate(createUserSchema), (req, res) => {
  // req.body is now fully validated and typed
  const { name, email, age, role } = req.body;
  console.log(\`Creating user: \${name} (\${email})\`);
  res.status(201).json({ name, email, age, role });
});

// Sanitize path parameters to prevent path traversal
app.get("/api/files/:filename", (req, res) => {
  const filename = req.params.filename.replace(/\\.\\.[\\/\\\\]/g, "");
  // Never use user input directly in file paths
  res.sendFile(filename, { root: "./public/uploads" });
});

app.listen(3000);`,
      language: "javascript",
      title: "Input validation with Zod in Express",
    },
    keyTakeaway:
      "Remember: Validate all input at the boundary of your application using schemas (Zod, Joi), and always replace raw input with the parsed, sanitized result.",
    relatedDrillId: "drill-node-input-validation",
  },

  // ─── Performance ──────────────────────────────────────────────────────
  {
    id: "node-tip-clustering",
    trackId: "nodejs",
    category: "Performance",
    title: "Clustering for Multi-Core Performance",
    content:
      "Node.js runs on a single thread by default, which means it can only use one CPU core. On a modern server with 8 or 16 cores, you are leaving most of your processing power unused. The built-in cluster module lets you fork multiple worker processes that share the same server port, effectively utilizing all available cores.\n\nThe cluster module uses a primary-worker model. The primary process manages the workers and distributes incoming connections. Each worker is a separate Node.js process with its own event loop and memory. When a worker crashes, the primary can detect it and spawn a replacement, giving you basic process-level resilience.\n\nIn production, you typically use a process manager like PM2 that handles clustering, monitoring, and zero-downtime restarts for you. However, understanding the cluster module helps you debug issues and make informed decisions about your deployment architecture. Note that workers do not share memory, so you need an external store (like Redis) for shared state.",
    codeExample: {
      code: `import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import http from "node:http";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(\`Primary process \${process.pid} starting \${numCPUs} workers\`);

  // Fork one worker per CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart crashed workers
  cluster.on("exit", (worker, code, signal) => {
    console.warn(
      \`Worker \${worker.process.pid} died (code: \${code}). Restarting...\`
    );
    cluster.fork();
  });

  // Track active workers
  cluster.on("online", (worker) => {
    console.log(\`Worker \${worker.process.pid} is online\`);
  });
} else {
  // Worker processes handle HTTP requests
  const server = http.createServer((req, res) => {
    // Each request is handled by whichever worker picks it up
    res.writeHead(200);
    res.end(\`Handled by worker \${process.pid}\\n\`);
  });

  server.listen(3000, () => {
    console.log(\`Worker \${process.pid} listening on port 3000\`);
  });

  // Graceful shutdown per worker
  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
}`,
      language: "javascript",
      title: "Using the cluster module for multi-core scaling",
    },
    keyTakeaway:
      "Remember: Use the cluster module or PM2 to run one worker per CPU core. Workers do not share memory, so use Redis or a database for shared state.",
  },
  {
    id: "node-tip-worker-threads",
    trackId: "nodejs",
    category: "Performance",
    title: "Worker Threads for CPU-Intensive Tasks",
    content:
      "While the cluster module forks separate processes, worker threads run JavaScript in parallel within the same process. They are ideal for CPU-intensive tasks like image processing, data compression, complex calculations, or parsing large JSON files without blocking the main event loop.\n\nUnlike child processes, worker threads share memory using SharedArrayBuffer and can transfer data efficiently using the structured clone algorithm. Each worker thread has its own V8 isolate and event loop, so they truly run in parallel. Communication between the main thread and workers happens via message passing using postMessage and the 'message' event.\n\nUse worker threads when a single operation would block the event loop for more than a few milliseconds. Common use cases include: hashing passwords (bcrypt), resizing images, running complex regex on large texts, or performing mathematical computations. For I/O-bound work, stick with the regular async APIs.",
    codeExample: {
      code: `import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

if (isMainThread) {
  // Main thread: delegate heavy work to a worker
  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL(import.meta.url), {
        workerData: data,
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(\`Worker exited with code \${code}\`));
      });
    });
  }

  // Process multiple heavy tasks in parallel
  async function main() {
    console.log("Starting heavy computations...");
    const start = Date.now();

    const results = await Promise.all([
      runWorker({ start: 0, end: 25_000_000 }),
      runWorker({ start: 25_000_000, end: 50_000_000 }),
      runWorker({ start: 50_000_000, end: 75_000_000 }),
      runWorker({ start: 75_000_000, end: 100_000_000 }),
    ]);

    const totalPrimes = results.reduce((sum, r) => sum + r.count, 0);
    console.log(\`Found \${totalPrimes} primes in \${Date.now() - start}ms\`);
  }

  main();
} else {
  // Worker thread: do the heavy computation
  const { start, end } = workerData;
  let count = 0;

  for (let n = Math.max(2, start); n < end; n++) {
    if (isPrime(n)) count++;
  }

  function isPrime(n) {
    for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  parentPort.postMessage({ count, start, end });
}`,
      language: "javascript",
      title: "Parallel computation with worker threads",
    },
    keyTakeaway:
      "Remember: Use worker threads for CPU-intensive tasks that would block the event loop. For I/O-bound work, regular async/await is more efficient.",
    relatedDrillId: "drill-node-worker-threads",
  },
  {
    id: "node-tip-performance-hooks",
    trackId: "nodejs",
    category: "Performance",
    title: "Measuring Performance with perf_hooks",
    content:
      "Node.js provides the perf_hooks module (Performance Hooks API) for high-resolution performance measurement. While console.time() works for basic timing, perf_hooks offers precise timestamps, custom performance marks, and integration with the Performance Observer API for monitoring performance entries.\n\nThe performance.mark() and performance.measure() methods let you define named markers and measure the duration between them. Performance entries can be collected by a PerformanceObserver, which fires callbacks whenever new entries are recorded. This is cleaner than scattering Date.now() calls throughout your code.\n\nFor HTTP server monitoring, you can use perf_hooks to measure request handling time, database query duration, or external API call latency. Combined with a monitoring system, this data helps you identify bottlenecks and track performance regressions over time.",
    codeExample: {
      code: `import {
  performance,
  PerformanceObserver,
} from "node:perf_hooks";

// Set up an observer to log all performance measurements
const obs = new PerformanceObserver((items) => {
  for (const entry of items.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`);
  }
});
obs.observe({ entryTypes: ["measure"] });

// Measure a database query
async function queryUsers() {
  performance.mark("query-start");

  // Simulated database query
  await new Promise((resolve) => setTimeout(resolve, 150));
  const users = [{ id: 1, name: "Alice" }];

  performance.mark("query-end");
  performance.measure("DB: queryUsers", "query-start", "query-end");

  return users;
}

// Measure an API call
async function fetchExternalData() {
  performance.mark("api-start");

  await new Promise((resolve) => setTimeout(resolve, 200));
  const data = { temperature: 72 };

  performance.mark("api-end");
  performance.measure("API: fetchWeather", "api-start", "api-end");

  return data;
}

// Create a reusable timing utility
function createTimer(label) {
  const start = performance.now();
  return {
    stop() {
      const duration = performance.now() - start;
      console.log(\`[\${label}] \${duration.toFixed(2)}ms\`);
      return duration;
    },
  };
}

const timer = createTimer("full-request");
await queryUsers();
await fetchExternalData();
timer.stop();`,
      language: "javascript",
      title: "Using perf_hooks for precise measurements",
    },
    keyTakeaway:
      "Remember: Use performance.mark() and performance.measure() from perf_hooks for precise, named performance measurements instead of scattering Date.now() through your code.",
  },
  {
    id: "node-tip-memory-leak-prevention",
    trackId: "nodejs",
    category: "Performance",
    title: "Preventing Memory Leaks in Node.js",
    content:
      "Memory leaks in Node.js occur when the application retains references to objects that are no longer needed, preventing the garbage collector from reclaiming that memory. Over time, this causes memory usage to grow continuously until the process crashes with an out-of-memory error.\n\nThe most common causes of memory leaks in Node.js are: event listeners that are added but never removed (especially in long-lived objects), closures that capture large objects, growing caches without eviction policies, global variables accumulating data, and unfinished streams or timers. The 'MaxListenersExceededWarning' is often the first sign of an event listener leak.\n\nTo detect leaks, monitor your process memory over time using process.memoryUsage(). In development, use the --inspect flag with Chrome DevTools to take heap snapshots and compare them. The general rule is: if your heap size keeps growing under steady-state load, you likely have a leak. Fix it by ensuring cleanup in error paths, using WeakRef and WeakMap where appropriate, and always removing event listeners when they are no longer needed.",
    codeExample: {
      code: `import { EventEmitter } from "node:events";

// LEAK: Event listeners never removed
class BadConnection extends EventEmitter {
  connect(handler) {
    // Every call adds a new listener and never removes it!
    this.on("data", handler);
  }
}

// FIX: Properly manage event listener lifecycle
class GoodConnection extends EventEmitter {
  connect(handler) {
    this.on("data", handler);
    // Return a cleanup function
    return () => this.off("data", handler);
  }
}

// LEAK: Unbounded cache growth
const badCache = {};
function cacheResultBad(key, value) {
  badCache[key] = value; // Never evicts, grows forever
}

// FIX: Use an LRU cache with a size limit
class LRUCache {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    // Evict oldest entries when over limit
    if (this.cache.size > this.maxSize) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
  }
}

// Monitor memory usage periodically
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    heapUsed: \`\${(usage.heapUsed / 1024 / 1024).toFixed(1)} MB\`,
    rss: \`\${(usage.rss / 1024 / 1024).toFixed(1)} MB\`,
  });
}, 30000);`,
      language: "javascript",
      title: "Common memory leak patterns and fixes",
    },
    keyTakeaway:
      "Remember: Always remove event listeners when done, use bounded caches with eviction, and monitor process.memoryUsage() to catch leaks early.",
  },

  // ─── Debugging ────────────────────────────────────────────────────────
  {
    id: "node-tip-debugging-inspect",
    trackId: "nodejs",
    category: "Debugging",
    title: "Debugging Node.js with --inspect",
    content:
      "The --inspect flag starts a debugging server that allows you to connect Chrome DevTools (or VS Code) to your running Node.js process. This gives you full access to breakpoints, step-through execution, the call stack, variable inspection, and heap snapshots.\n\nUse --inspect to start debugging and keep the program running, or --inspect-brk to pause execution on the first line so you can set breakpoints before any code runs. The debugger listens on 127.0.0.1:9229 by default. Open Chrome and navigate to chrome://inspect to connect to the process.\n\nFor production debugging of issues that are hard to reproduce locally, you can start a process with --inspect=0.0.0.0:9229 and connect remotely. However, never expose the inspect port publicly as it gives full access to your process. Use SSH tunneling instead. Conditional breakpoints and logpoints (which log without pausing) are especially useful for debugging issues under load.",
    codeExample: {
      code: `// Start your app with the inspect flag:
// node --inspect server.js          (debug, keep running)
// node --inspect-brk server.js      (pause on first line)

// You can also start debugging programmatically
import { inspect } from "node:util";

// Use the debugger statement to set breakpoints in code
function processOrder(order) {
  const total = order.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Execution pauses here when debugger is attached
  debugger;

  const tax = total * 0.08;
  const finalTotal = total + tax;

  return { total, tax, finalTotal };
}

// Custom inspect for better debugging output
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Customize what shows in console.log and debugger
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return \`User { name: "\${this.name}", email: "\${this.email}" }\`;
    // Password is hidden from debug output
  }
}

const user = new User("Alice", "alice@example.com", "s3cret");
console.log(user); // User { name: "Alice", email: "alice@example.com" }
// Password never appears in logs or debugger`,
      language: "javascript",
      title: "Debugging with --inspect and custom inspect",
    },
    keyTakeaway:
      "Remember: Use 'node --inspect-brk' to debug from the first line, connect via chrome://inspect, and use debugger statements for code-level breakpoints.",
  },
  {
    id: "node-tip-console-table-debugging",
    trackId: "nodejs",
    category: "Debugging",
    title: "Advanced Console Methods for Debugging",
    content:
      "Most developers know console.log, but Node.js provides several other console methods that make debugging much more effective. console.table() displays tabular data in a readable table format. console.time() and console.timeEnd() measure how long a block of code takes. console.trace() shows the full call stack at the point it is called.\n\nconsole.dir() is particularly useful for inspecting objects with circular references or deeply nested structures, as it accepts options for depth and colors. console.group() and console.groupEnd() let you visually nest related log messages, which is invaluable when debugging middleware chains or recursive functions.\n\nconsole.count() tracks how many times a particular label has been counted, which helps identify how many times a code path executes. These methods are all available out of the box with no dependencies, and they work in both development and production (though you should strip verbose logging before deploying).",
    codeExample: {
      code: `// console.table() for structured data
const users = [
  { name: "Alice", role: "admin", logins: 42 },
  { name: "Bob", role: "user", logins: 15 },
  { name: "Charlie", role: "user", logins: 8 },
];
console.table(users);
// Outputs a formatted ASCII table in your terminal

// console.table with selected columns
console.table(users, ["name", "role"]);

// console.time/timeEnd for performance measurement
console.time("data-processing");
const result = Array.from({ length: 1_000_000 }, (_, i) => i * 2);
console.timeEnd("data-processing");
// data-processing: 23.456ms

// console.dir for deep object inspection
const nested = { a: { b: { c: { d: { e: "deep" } } } } };
console.dir(nested, { depth: null, colors: true });

// console.count to track execution frequency
function processItem(item) {
  console.count("processItem called");
  // ... processing logic
}
processItem("a"); // processItem called: 1
processItem("b"); // processItem called: 2

// console.group for organized output
console.group("Request #1234");
console.log("URL: /api/users");
console.log("Method: GET");
console.group("Database");
console.log("Query: SELECT * FROM users");
console.log("Duration: 12ms");
console.groupEnd(); // closes Database
console.log("Status: 200");
console.groupEnd(); // closes Request #1234

// console.trace to see call stack
function innerFunction() {
  console.trace("How did we get here?");
}
function outerFunction() { innerFunction(); }
outerFunction();`,
      language: "javascript",
      title: "Beyond console.log: advanced debugging methods",
    },
    keyTakeaway:
      "Remember: Use console.table() for arrays of objects, console.time() for measurements, console.dir() for deep inspection, and console.trace() to see the call stack.",
  },

  // ─── File System ──────────────────────────────────────────────────────
  {
    id: "node-tip-fs-promises",
    trackId: "nodejs",
    category: "File System",
    title: "Modern File Operations with fs/promises",
    content:
      "The fs/promises module provides promise-based versions of all file system operations, making them work seamlessly with async/await. This is the recommended approach for file operations in modern Node.js, replacing both the callback-based fs methods and the older util.promisify(fs.readFile) pattern.\n\nAll the familiar fs functions are available: readFile, writeFile, readdir, stat, mkdir, unlink, rename, and more. Since they return promises, you get proper error handling with try/catch and can easily compose them with other async operations using Promise.all.\n\nThe fs/promises module also includes the FileHandle class, which you get from fs.open(). FileHandles give you fine-grained control over file operations and are especially useful when you need to perform multiple operations on the same file. Always close FileHandles when done (or use a try/finally block) to avoid file descriptor leaks.",
    codeExample: {
      code: `import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Read and parse JSON config
async function loadConfig(configPath) {
  try {
    const raw = await readFile(configPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Create default config if it does not exist
      const defaults = { port: 3000, debug: false };
      await writeFile(configPath, JSON.stringify(defaults, null, 2));
      return defaults;
    }
    throw err;
  }
}

// Recursively list all files in a directory
async function listFilesRecursive(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await listFilesRecursive(fullPath);
      files.push(...nested);
    } else {
      const info = await stat(fullPath);
      files.push({
        path: fullPath,
        size: info.size,
        modified: info.mtime,
      });
    }
  }

  return files;
}

// Safely create nested directories
async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

// Write data atomically (write to temp, then rename)
import { rename } from "node:fs/promises";
import { randomUUID } from "node:crypto";

async function writeAtomic(filePath, data) {
  const tempPath = \`\${filePath}.\${randomUUID()}.tmp\`;
  await writeFile(tempPath, data);
  await rename(tempPath, filePath);
}

const config = await loadConfig("./config.json");
console.log("Config:", config);`,
      language: "javascript",
      title: "File operations with fs/promises",
    },
    keyTakeaway:
      "Remember: Always import from 'node:fs/promises' for modern, async/await-compatible file operations. Use { recursive: true } with mkdir and { withFileTypes: true } with readdir.",
    relatedDrillId: "drill-node-fs-promises",
  },
  {
    id: "node-tip-path-module",
    trackId: "nodejs",
    category: "File System",
    title: "Path Module Best Practices",
    content:
      "The path module is essential for working with file and directory paths in a cross-platform way. Manually concatenating paths with string operations and slashes is fragile and breaks across operating systems. The path module handles the differences between POSIX (/) and Windows (\\) path separators automatically.\n\npath.join() combines path segments using the correct separator for the current OS and normalizes the result (resolving . and .. segments). path.resolve() creates an absolute path by resolving segments from right to left against the current working directory. path.parse() breaks a path into its components (root, dir, base, name, ext), and path.format() does the reverse.\n\nA common anti-pattern is using __dirname with string concatenation instead of path.join(). While it might work on your development machine, it fails on Windows or when paths contain unusual characters. Always use the path module methods for any path manipulation.",
    codeExample: {
      code: `import { join, resolve, parse, basename, extname, relative } from "node:path";

// BAD: String concatenation for paths
// const filePath = __dirname + "/config/" + "database.json";

// GOOD: Use path.join for combining path segments
const configPath = join("config", "database.json");
// Result: "config/database.json" (POSIX) or "config\\database.json" (Windows)

// path.resolve creates absolute paths
const absolutePath = resolve("src", "utils", "helpers.js");
// Result: "/Users/you/project/src/utils/helpers.js"

// Parse a path into its components
const parsed = parse("/home/user/projects/app/index.ts");
console.log(parsed);
// {
//   root: "/",
//   dir: "/home/user/projects/app",
//   base: "index.ts",
//   name: "index",
//   ext: ".ts"
// }

// Extract specific parts
console.log(basename("/path/to/file.txt"));       // "file.txt"
console.log(basename("/path/to/file.txt", ".txt")); // "file"
console.log(extname("report.2024.csv"));           // ".csv"

// Get relative path between two locations
const from = "/home/user/projects/app/src";
const to = "/home/user/projects/app/dist/bundle.js";
console.log(relative(from, to)); // "../dist/bundle.js"

// For ESM: get __dirname equivalent
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "..", "data");`,
      language: "javascript",
      title: "Cross-platform path manipulation",
    },
    keyTakeaway:
      "Remember: Never concatenate paths with strings and slashes. Always use path.join() for combining segments and path.resolve() for creating absolute paths.",
  },
  {
    id: "node-tip-url-querystring",
    trackId: "nodejs",
    category: "File System",
    title: "URL and Query String Parsing",
    content:
      "Node.js provides the WHATWG URL API (the same one browsers use) for parsing, constructing, and manipulating URLs. The older url.parse() method is deprecated. The URL class handles the complexities of URL encoding, internationalized domain names, and edge cases in URL formats.\n\nThe URL constructor takes a URL string and an optional base URL. It parses the URL into components like protocol, hostname, pathname, and searchParams. The searchParams property is a URLSearchParams instance that provides methods for reading and modifying query parameters without manual string manipulation.\n\nURLSearchParams is especially useful for building API request URLs with multiple parameters. It automatically handles URL encoding of special characters, supports multiple values for the same key, and provides iteration methods. You should use this instead of manually building query strings with template literals.",
    codeExample: {
      code: `// Parse a complete URL
const url = new URL("https://api.example.com:8080/users?role=admin&active=true#section");

console.log(url.protocol);  // "https:"
console.log(url.hostname);  // "api.example.com"
console.log(url.port);      // "8080"
console.log(url.pathname);  // "/users"
console.log(url.hash);      // "#section"

// Work with query parameters
console.log(url.searchParams.get("role"));     // "admin"
console.log(url.searchParams.get("active"));   // "true"
console.log(url.searchParams.has("page"));     // false

// Build URLs with query parameters
const apiUrl = new URL("https://api.example.com/search");
apiUrl.searchParams.set("q", "node.js best practices");
apiUrl.searchParams.set("page", "1");
apiUrl.searchParams.set("limit", "20");
apiUrl.searchParams.append("tag", "backend");
apiUrl.searchParams.append("tag", "javascript");
console.log(apiUrl.toString());
// "https://api.example.com/search?q=node.js+best+practices&page=1&limit=20&tag=backend&tag=javascript"

// Multiple values for the same key
console.log(apiUrl.searchParams.getAll("tag")); // ["backend", "javascript"]

// Iterate over all parameters
for (const [key, value] of apiUrl.searchParams) {
  console.log(\`\${key} = \${value}\`);
}

// Resolve relative URLs (useful for web scraping, API clients)
const base = new URL("https://example.com/api/v2/");
const endpoint = new URL("users/123", base);
console.log(endpoint.toString()); // "https://example.com/api/v2/users/123"

// Parse URL from a request in an Express-like handler
function handleRequest(req) {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  return { pathname: url.pathname, page };
}`,
      language: "javascript",
      title: "Modern URL parsing and query string handling",
    },
    keyTakeaway:
      "Remember: Use the URL class and URLSearchParams instead of manual string manipulation. They handle encoding automatically and work the same way in browsers and Node.js.",
  },
];
