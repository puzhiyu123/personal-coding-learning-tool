import type { QuizDrill } from "./quiz-drills";

export const nodejsQuizDrills: QuizDrill[] = [
  // ─── Event Loop ──────────────────────────────────────────────────────
  {
    id: "quiz-node-event-loop-01",
    trackId: "nodejs",
    category: "Event Loop",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which phase of the Node.js event loop handles `setTimeout` and `setInterval` callbacks?",
    options: [
      { label: "A", text: "Poll" },
      { label: "B", text: "Timers" },
      { label: "C", text: "Check" },
      { label: "D", text: "Close callbacks" },
    ],
    correctAnswer: "B",
    explanation:
      "The timers phase executes callbacks scheduled by `setTimeout` and `setInterval` once their threshold has elapsed.",
    hint: "Think about which phase name directly relates to time-based scheduling.",
    tags: ["event-loop", "timers", "fundamentals"],
  },
  {
    id: "quiz-node-event-loop-02",
    trackId: "nodejs",
    category: "Event Loop",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
console.log("main");`,
    options: [
      { label: "A", text: "main, nextTick, timeout, immediate" },
      { label: "B", text: "main, nextTick, immediate, timeout" },
      { label: "C", text: "main, timeout, immediate, nextTick" },
      { label: "D", text: "nextTick, main, timeout, immediate" },
    ],
    correctAnswer: "A",
    explanation:
      "Synchronous code runs first (`main`), then `process.nextTick` fires before any I/O or timer phase. When called from the main module (outside an I/O cycle), the order between `setTimeout(fn,0)` and `setImmediate` is non-deterministic, but `timeout` before `immediate` is the most commonly observed ordering in the main module context.",
    hint: "`process.nextTick` always fires before any other async callback in the current phase.",
    tags: ["event-loop", "nextTick", "setImmediate", "setTimeout"],
  },
  {
    id: "quiz-node-event-loop-03",
    trackId: "nodejs",
    category: "Event Loop",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "In which event loop phase does `setImmediate` execute its callback?",
    options: [
      { label: "A", text: "Timers" },
      { label: "B", text: "Poll" },
      { label: "C", text: "Check" },
      { label: "D", text: "Idle / Prepare" },
    ],
    correctAnswer: "C",
    explanation:
      "The check phase is specifically designed to execute `setImmediate` callbacks after the poll phase completes.",
    hint: "This phase comes right after the poll phase.",
    tags: ["event-loop", "setImmediate", "phases"],
  },
  {
    id: "quiz-node-event-loop-04",
    trackId: "nodejs",
    category: "Event Loop",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});`,
    options: [
      { label: "A", text: "timeout, immediate" },
      { label: "B", text: "immediate, timeout" },
      { label: "C", text: "The order is always random" },
      { label: "D", text: "Only immediate is printed" },
    ],
    correctAnswer: "B",
    explanation:
      "Inside an I/O callback the check phase (setImmediate) always runs before the timers phase on the next iteration, so `immediate` is guaranteed to print before `timeout`.",
    hint: "Inside an I/O callback, `setImmediate` is always scheduled before `setTimeout(fn, 0)`.",
    tags: ["event-loop", "setImmediate", "setTimeout", "I/O"],
  },

  // ─── Streams ─────────────────────────────────────────────────────────
  {
    id: "quiz-node-streams-01",
    trackId: "nodejs",
    category: "Streams",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To pipe a readable stream into a writable stream you call `readable.____(writable)`.",
    options: [
      { label: "A", text: "pipe" },
      { label: "B", text: "send" },
      { label: "C", text: "write" },
      { label: "D", text: "connect" },
    ],
    correctAnswer: "A",
    explanation:
      "The `.pipe()` method connects a readable stream to a writable stream, automatically managing back-pressure.",
    hint: "This method name is also a Unix concept for connecting processes.",
    tags: ["streams", "pipe", "basics"],
  },
  {
    id: "quiz-node-streams-02",
    trackId: "nodejs",
    category: "Streams",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which of the following is NOT one of the four fundamental stream types in Node.js?",
    options: [
      { label: "A", text: "Readable" },
      { label: "B", text: "Writable" },
      { label: "C", text: "Observable" },
      { label: "D", text: "Transform" },
    ],
    correctAnswer: "C",
    explanation:
      "The four fundamental stream types are Readable, Writable, Duplex, and Transform. Observable is not a native Node.js stream type.",
    hint: "One of these options comes from the reactive programming paradigm, not from Node.js core.",
    tags: ["streams", "types", "fundamentals"],
  },
  {
    id: "quiz-node-streams-03",
    trackId: "nodejs",
    category: "Streams",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To consume a readable stream using the async iterator pattern, you use `for await (const chunk of ____)`.",
    options: [
      { label: "A", text: "stream" },
      { label: "B", text: "stream.read()" },
      { label: "C", text: "stream.pipe()" },
      { label: "D", text: "stream.on('data')" },
    ],
    correctAnswer: "A",
    explanation:
      "Node.js readable streams implement the async iterable protocol, so you can use `for await...of` directly on the stream object.",
    hint: "Readable streams are async iterables, so you pass the stream object itself.",
    tags: ["streams", "async-iteration", "readable"],
  },
  {
    id: "quiz-node-streams-04",
    trackId: "nodejs",
    category: "Streams",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "The `stream` module provides `stream.____()` as a safer alternative to `.pipe()` that automatically destroys streams on error.",
    options: [
      { label: "A", text: "pipeline" },
      { label: "B", text: "compose" },
      { label: "C", text: "merge" },
      { label: "D", text: "chain" },
    ],
    correctAnswer: "A",
    explanation:
      "`stream.pipeline()` pipes streams together and properly forwards errors, destroying all streams if any stream in the pipeline errors.",
    hint: "This utility function shares its name with a CI/CD concept.",
    tags: ["streams", "pipeline", "error-handling"],
  },

  // ─── File System ─────────────────────────────────────────────────────
  {
    id: "quiz-node-fs-01",
    trackId: "nodejs",
    category: "File System",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To read a file asynchronously with a callback in Node.js, you call `fs.____(path, encoding, callback)`.",
    options: [
      { label: "A", text: "readFile" },
      { label: "B", text: "read" },
      { label: "C", text: "open" },
      { label: "D", text: "load" },
    ],
    correctAnswer: "A",
    explanation:
      "`fs.readFile()` reads the entire contents of a file asynchronously and passes the data to a callback.",
    hint: "The method name literally describes reading a file.",
    tags: ["fs", "readFile", "async"],
  },
  {
    id: "quiz-node-fs-02",
    trackId: "nodejs",
    category: "File System",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const fs = require("fs");

console.log("start");
fs.readFile("example.txt", "utf8", (err, data) => {
  console.log("file read");
});
console.log("end");`,
    options: [
      { label: "A", text: "start, file read, end" },
      { label: "B", text: "start, end, file read" },
      { label: "C", text: "file read, start, end" },
      { label: "D", text: "start, end" },
    ],
    correctAnswer: "B",
    explanation:
      "`fs.readFile` is asynchronous, so `start` and `end` print synchronously first, then the callback fires after the file is read.",
    hint: "Async callbacks run after all synchronous code has finished.",
    tags: ["fs", "async", "callback"],
  },
  {
    id: "quiz-node-fs-03",
    trackId: "nodejs",
    category: "File System",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To use promise-based file system methods, you import `fs` from `fs/____`.",
    options: [
      { label: "A", text: "promises" },
      { label: "B", text: "async" },
      { label: "C", text: "await" },
      { label: "D", text: "promisify" },
    ],
    correctAnswer: "A",
    explanation:
      "The `fs/promises` module provides promise-based versions of all `fs` methods, enabling async/await usage.",
    hint: "The subpath is the plural form of the word 'promise'.",
    tags: ["fs", "promises", "async-await"],
  },

  // ─── HTTP / HTTPS ────────────────────────────────────────────────────
  {
    id: "quiz-node-http-01",
    trackId: "nodejs",
    category: "HTTP",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a basic HTTP server in Node.js you call `http.____(requestListener)`.",
    options: [
      { label: "A", text: "createServer" },
      { label: "B", text: "listen" },
      { label: "C", text: "newServer" },
      { label: "D", text: "startServer" },
    ],
    correctAnswer: "A",
    explanation:
      "`http.createServer()` creates a new HTTP server instance and optionally accepts a request listener callback.",
    hint: "The method name combines 'create' with 'server'.",
    tags: ["http", "server", "basics"],
  },
  {
    id: "quiz-node-http-02",
    trackId: "nodejs",
    category: "HTTP",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const http = require("http");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello\\n");
});
console.log(typeof server);`,
    options: [
      { label: "A", text: "undefined" },
      { label: "B", text: "function" },
      { label: "C", text: "object" },
      { label: "D", text: "server" },
    ],
    correctAnswer: "C",
    explanation:
      "`http.createServer()` returns an `http.Server` instance, which is an object. `typeof` any object returns `\"object\"`.",
    hint: "`typeof` returns one of the primitive type strings; instances of classes are always a certain type.",
    tags: ["http", "typeof", "server"],
  },
  {
    id: "quiz-node-http-03",
    trackId: "nodejs",
    category: "HTTP",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What must you call on the `res` object to signal the response is complete and send it to the client?",
    options: [
      { label: "A", text: "res.send()" },
      { label: "B", text: "res.finish()" },
      { label: "C", text: "res.end()" },
      { label: "D", text: "res.close()" },
    ],
    correctAnswer: "C",
    explanation:
      "`res.end()` signals to the server that the response headers and body have been sent and the message is complete.",
    hint: "This method name suggests finishing or terminating the response.",
    tags: ["http", "response", "end"],
  },

  // ─── Express Middleware ──────────────────────────────────────────────
  {
    id: "quiz-node-express-01",
    trackId: "nodejs",
    category: "Express Middleware",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To parse incoming JSON request bodies in Express, you add the built-in middleware `express.____()`.",
    options: [
      { label: "A", text: "json" },
      { label: "B", text: "bodyParser" },
      { label: "C", text: "parseJSON" },
      { label: "D", text: "jsonParser" },
    ],
    correctAnswer: "A",
    explanation:
      "Since Express 4.16+, `express.json()` is a built-in middleware that parses incoming JSON payloads and populates `req.body`.",
    hint: "This built-in middleware shares its name with the data format it parses.",
    tags: ["express", "middleware", "json", "body-parser"],
  },
  {
    id: "quiz-node-express-02",
    trackId: "nodejs",
    category: "Express Middleware",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following Express code when a GET request is made to `/test`?",
    codeSnippet: `const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("A");
  next();
});

app.use((req, res, next) => {
  console.log("B");
  next();
});

app.get("/test", (req, res) => {
  console.log("C");
  res.send("OK");
});`,
    options: [
      { label: "A", text: "C" },
      { label: "B", text: "A, B" },
      { label: "C", text: "A, B, C" },
      { label: "D", text: "B, A, C" },
    ],
    correctAnswer: "C",
    explanation:
      "Express middleware runs in the order it is registered. Each `next()` call passes control to the next middleware, so A, B, then C execute in sequence.",
    hint: "Middleware executes in the order it was registered with `app.use()`.",
    tags: ["express", "middleware", "execution-order"],
  },
  {
    id: "quiz-node-express-03",
    trackId: "nodejs",
    category: "Express Middleware",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "How does Express identify an error-handling middleware function?",
    options: [
      { label: "A", text: "It is registered with `app.error()`" },
      { label: "B", text: "It has four parameters: (err, req, res, next)" },
      { label: "C", text: "It returns a Promise that rejects" },
      { label: "D", text: "It has `isError: true` in its options" },
    ],
    correctAnswer: "B",
    explanation:
      "Express detects error-handling middleware by its function signature having exactly four arguments: `(err, req, res, next)`.",
    hint: "Express looks at the function's argument count to determine its purpose.",
    tags: ["express", "error-handling", "middleware"],
  },

  // ─── CommonJS / ES Modules ──────────────────────────────────────────
  {
    id: "quiz-node-modules-01",
    trackId: "nodejs",
    category: "CommonJS/ES Modules",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In CommonJS, you export a value by assigning it to `module.____`.",
    options: [
      { label: "A", text: "exports" },
      { label: "B", text: "default" },
      { label: "C", text: "output" },
      { label: "D", text: "return" },
    ],
    correctAnswer: "A",
    explanation:
      "`module.exports` is the object that is returned when another module calls `require()` on this module.",
    hint: "The property name describes what the module makes available to others.",
    tags: ["modules", "commonjs", "exports"],
  },
  {
    id: "quiz-node-modules-02",
    trackId: "nodejs",
    category: "CommonJS/ES Modules",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which file extension or `package.json` field enables ES module syntax (`import`/`export`) in Node.js?",
    options: [
      { label: "A", text: "Use `.cjs` extension" },
      { label: "B", text: "Set `\"type\": \"module\"` in package.json or use `.mjs` extension" },
      { label: "C", text: "Set `\"esm\": true` in package.json" },
      { label: "D", text: "Use `--harmony` flag when running Node" },
    ],
    correctAnswer: "B",
    explanation:
      "Node.js treats `.mjs` files as ES modules. Alternatively, setting `\"type\": \"module\"` in package.json makes all `.js` files in that package use ES module syntax.",
    hint: "There is a dedicated file extension and a package.json configuration option.",
    tags: ["modules", "esm", "package-json"],
  },
  {
    id: "quiz-node-modules-03",
    trackId: "nodejs",
    category: "CommonJS/ES Modules",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following Node.js CommonJS code?",
    codeSnippet: `// counter.js
let count = 0;
module.exports = { count, increment: () => { count++; } };

// main.js
const counter = require("./counter");
counter.increment();
counter.increment();
console.log(counter.count);`,
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "0" },
      { label: "C", text: "undefined" },
      { label: "D", text: "NaN" },
    ],
    correctAnswer: "B",
    explanation:
      "`count` is a primitive (number), so `module.exports.count` holds a copy of the value at export time. The `increment` function modifies the local `count` variable, not the exported copy.",
    hint: "Primitive values are copied by value, not by reference, when assigned to an object property.",
    tags: ["modules", "commonjs", "primitives", "exports"],
  },

  // ─── Error Handling ──────────────────────────────────────────────────
  {
    id: "quiz-node-error-01",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To catch unhandled promise rejections globally, you listen for the `process.on('____', handler)` event.",
    options: [
      { label: "A", text: "unhandledRejection" },
      { label: "B", text: "promiseError" },
      { label: "C", text: "rejectionHandled" },
      { label: "D", text: "uncaughtException" },
    ],
    correctAnswer: "A",
    explanation:
      "The `unhandledRejection` event fires when a Promise is rejected and no error handler is attached within a turn of the event loop.",
    hint: "The event name describes a rejection that has not been handled.",
    tags: ["error-handling", "promises", "process"],
  },
  {
    id: "quiz-node-error-02",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `async function fail() {
  throw new Error("oops");
}

async function main() {
  try {
    await fail();
    console.log("after");
  } catch (e) {
    console.log("caught:", e.message);
  }
  console.log("done");
}

main();`,
    options: [
      { label: "A", text: "after, done" },
      { label: "B", text: "caught: oops, done" },
      { label: "C", text: "caught: oops" },
      { label: "D", text: "UnhandledPromiseRejection" },
    ],
    correctAnswer: "B",
    explanation:
      "The `await` causes the thrown error to be caught by the `catch` block. After the catch, execution continues to the `console.log(\"done\")` statement.",
    hint: "`await` converts a rejected promise into a thrown exception that `try/catch` can handle.",
    tags: ["error-handling", "async-await", "try-catch"],
  },
  {
    id: "quiz-node-error-03",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What is the conventional first parameter of a Node.js callback function?",
    options: [
      { label: "A", text: "The result data" },
      { label: "B", text: "The error object (or null)" },
      { label: "C", text: "The request object" },
      { label: "D", text: "A status code" },
    ],
    correctAnswer: "B",
    explanation:
      "Node.js follows the error-first callback convention where the first argument is an error object (or `null` if no error), and subsequent arguments contain the result data.",
    hint: "This convention is sometimes called 'error-first callbacks'.",
    tags: ["error-handling", "callbacks", "convention"],
  },
  {
    id: "quiz-node-error-04",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("error", (err) => {
  console.log("handled:", err.message);
});

emitter.emit("error", new Error("boom"));
console.log("after");`,
    options: [
      { label: "A", text: "The process crashes with an uncaught error" },
      { label: "B", text: "handled: boom, after" },
      { label: "C", text: "handled: boom" },
      { label: "D", text: "after" },
    ],
    correctAnswer: "B",
    explanation:
      "When an `error` event listener is registered, the EventEmitter calls it instead of throwing. Execution continues normally, printing both messages.",
    hint: "EventEmitters only throw on `error` events when there is no listener for them.",
    tags: ["error-handling", "events", "EventEmitter"],
  },

  // ─── Buffer / Binary ────────────────────────────────────────────────
  {
    id: "quiz-node-buffer-01",
    trackId: "nodejs",
    category: "Buffer",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a Buffer from a UTF-8 string, you call `Buffer.____(string)`.",
    options: [
      { label: "A", text: "from" },
      { label: "B", text: "create" },
      { label: "C", text: "new" },
      { label: "D", text: "of" },
    ],
    correctAnswer: "A",
    explanation:
      "`Buffer.from()` creates a new Buffer from a string, array, or another buffer. Using `new Buffer()` is deprecated.",
    hint: "This factory method shares its name with `Array.from()`.",
    tags: ["buffer", "creation", "basics"],
  },
  {
    id: "quiz-node-buffer-02",
    trackId: "nodejs",
    category: "Buffer",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const buf = Buffer.alloc(4);
buf.writeUInt8(72, 0);
buf.writeUInt8(105, 1);
buf.writeUInt8(33, 2);
buf.writeUInt8(0, 3);
console.log(buf.toString("utf8", 0, 3));`,
    options: [
      { label: "A", text: "72 105 33" },
      { label: "B", text: "Hi!" },
      { label: "C", text: "Hi!\\0" },
      { label: "D", text: "Buffer<48 69 21 00>" },
    ],
    correctAnswer: "B",
    explanation:
      "72, 105, and 33 are the ASCII codes for 'H', 'i', and '!' respectively. `toString('utf8', 0, 3)` converts bytes 0-2 to a UTF-8 string, producing `Hi!`.",
    hint: "The numbers correspond to ASCII character codes.",
    tags: ["buffer", "ascii", "toString"],
  },
  {
    id: "quiz-node-buffer-03",
    trackId: "nodejs",
    category: "Buffer",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const buf = Buffer.from("Hello");
console.log(buf.length);`,
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "10" },
      { label: "C", text: "undefined" },
      { label: "D", text: "0" },
    ],
    correctAnswer: "A",
    explanation:
      "`Buffer.length` returns the number of bytes. 'Hello' in UTF-8 is 5 bytes (one byte per ASCII character).",
    hint: "Each ASCII character occupies exactly one byte in UTF-8 encoding.",
    tags: ["buffer", "length", "utf8"],
  },

  // ─── Child Processes ─────────────────────────────────────────────────
  {
    id: "quiz-node-child-01",
    trackId: "nodejs",
    category: "Child Processes",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To run a shell command and buffer the output, you use `child_process.____(command, callback)`.",
    options: [
      { label: "A", text: "exec" },
      { label: "B", text: "spawn" },
      { label: "C", text: "fork" },
      { label: "D", text: "run" },
    ],
    correctAnswer: "A",
    explanation:
      "`child_process.exec()` spawns a shell, executes the command, and buffers the entire stdout and stderr to pass to the callback.",
    hint: "This method name is short for 'execute' and works like running a command in a shell.",
    tags: ["child-process", "exec", "shell"],
  },
  {
    id: "quiz-node-child-02",
    trackId: "nodejs",
    category: "Child Processes",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What is the key difference between `child_process.spawn()` and `child_process.exec()`?",
    options: [
      { label: "A", text: "`spawn` is synchronous, `exec` is asynchronous" },
      { label: "B", text: "`spawn` streams data via events, `exec` buffers the entire output" },
      { label: "C", text: "`spawn` only works on Linux, `exec` is cross-platform" },
      { label: "D", text: "`spawn` can only run Node.js scripts" },
    ],
    correctAnswer: "B",
    explanation:
      "`spawn` returns a stream-based child process suitable for large outputs, while `exec` buffers the entire stdout/stderr and passes them to a callback. Both are asynchronous.",
    hint: "Think about how each method delivers the output data to your code.",
    tags: ["child-process", "spawn", "exec", "comparison"],
  },
  {
    id: "quiz-node-child-03",
    trackId: "nodejs",
    category: "Child Processes",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "To spawn a new Node.js process with an IPC channel for message passing, you use `child_process.____(modulePath)`.",
    options: [
      { label: "A", text: "fork" },
      { label: "B", text: "spawn" },
      { label: "C", text: "exec" },
      { label: "D", text: "cluster" },
    ],
    correctAnswer: "A",
    explanation:
      "`child_process.fork()` is a special case of `spawn` that always creates a new Node.js process with a built-in IPC channel for parent-child communication via `send()` and `on('message')`.",
    hint: "This method name is borrowed from Unix process terminology.",
    tags: ["child-process", "fork", "ipc"],
  },

  // ─── Cluster / Worker Threads ────────────────────────────────────────
  {
    id: "quiz-node-cluster-02",
    trackId: "nodejs",
    category: "Cluster/Worker Threads",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What is the main difference between `cluster` workers and `worker_threads`?",
    options: [
      { label: "A", text: "`cluster` uses threads, `worker_threads` uses processes" },
      { label: "B", text: "`cluster` forks separate processes, `worker_threads` runs threads within one process sharing memory" },
      { label: "C", text: "They are identical but with different APIs" },
      { label: "D", text: "`worker_threads` is only available on Windows" },
    ],
    correctAnswer: "B",
    explanation:
      "`cluster` creates separate OS processes (each with its own V8 instance and memory), while `worker_threads` creates threads within a single process that can share memory via `SharedArrayBuffer`.",
    hint: "Think about the OS-level difference between processes and threads.",
    tags: ["cluster", "worker-threads", "concurrency"],
  },
  {
    id: "quiz-node-cluster-03",
    trackId: "nodejs",
    category: "Cluster/Worker Threads",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "To share memory between worker threads, you pass a `____` via the `workerData` option or through `postMessage`.",
    options: [
      { label: "A", text: "SharedArrayBuffer" },
      { label: "B", text: "ArrayBuffer" },
      { label: "C", text: "Buffer" },
      { label: "D", text: "SharedMemory" },
    ],
    correctAnswer: "A",
    explanation:
      "`SharedArrayBuffer` allows multiple threads to read and write to the same block of memory. Regular `ArrayBuffer` is transferred (moved), not shared.",
    hint: "The name starts with 'Shared' and is a built-in JavaScript type.",
    tags: ["worker-threads", "shared-memory", "SharedArrayBuffer"],
  },

  // ─── Additional mixed questions ──────────────────────────────────────
  {
    id: "quiz-node-event-loop-05",
    trackId: "nodejs",
    category: "Event Loop",
    difficulty: "beginner",
    type: "multiple-choice",
    question: "Node.js runs JavaScript on a single thread. What handles asynchronous I/O operations?",
    options: [
      { label: "A", text: "A second JavaScript thread" },
      { label: "B", text: "The libuv thread pool and OS async primitives" },
      { label: "C", text: "Web Workers automatically created by V8" },
      { label: "D", text: "The garbage collector" },
    ],
    correctAnswer: "B",
    explanation:
      "Node.js delegates asynchronous I/O to libuv, which uses a thread pool for file system operations and OS-level async APIs (epoll, kqueue, IOCP) for network I/O.",
    hint: "Node.js relies on a C library that manages an internal pool of threads.",
    tags: ["event-loop", "libuv", "async-io", "fundamentals"],
  },
  {
    id: "quiz-node-express-04",
    trackId: "nodejs",
    category: "Express Middleware",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To serve static files from a `public` directory in Express, you use `express.____(\"public\")`.",
    options: [
      { label: "A", text: "static" },
      { label: "B", text: "serve" },
      { label: "C", text: "files" },
      { label: "D", text: "public" },
    ],
    correctAnswer: "A",
    explanation:
      "`express.static()` is a built-in middleware that serves static files such as HTML, CSS, images, and JavaScript from a given directory.",
    hint: "The middleware name describes the type of files it serves.",
    tags: ["express", "static", "middleware"],
  },
  {
    id: "quiz-node-buffer-04",
    trackId: "nodejs",
    category: "Buffer",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following Node.js code?",
    codeSnippet: `const buf1 = Buffer.from("abc");
const buf2 = Buffer.from("abc");
console.log(buf1 === buf2);
console.log(buf1.equals(buf2));`,
    options: [
      { label: "A", text: "true, true" },
      { label: "B", text: "false, true" },
      { label: "C", text: "false, false" },
      { label: "D", text: "true, false" },
    ],
    correctAnswer: "B",
    explanation:
      "`===` compares object references (different Buffer instances), so it returns `false`. `.equals()` compares the actual byte content, returning `true` because both contain the same data.",
    hint: "`===` checks reference identity, not value equality, for objects.",
    tags: ["buffer", "equality", "comparison"],
  },
];
