import type { Drill } from "./drills";

export const nodejsDrills: Drill[] = [
  // ──────────────────────────────────────────────────
  // 1. Express Route Handler (beginner)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-1",
    title: "Express GET Route Handler",
    description:
      "Define a function that simulates an Express GET route handler. It should accept a path and return a JSON response object with status and data fields.",
    trackId: "nodejs",
    category: "Express",
    difficulty: "beginner",
    estimatedMinutes: 3,
    challenge: {
      starterCode: `// Define a route handler that returns a JSON response object.
// The handler receives a path string and returns an object
// with { status: 200, body: { message: '...', path: '...' } }.

function handleGet(path) {
  // TODO: Return an object with status 200
  // TODO: body should have message "OK" and the path
}`,
      solution: `function handleGet(path) {
  return {
    status: 200,
    body: {
      message: "OK",
      path: path,
    },
  };
}`,
      tests: [
        {
          name: "Returns status 200",
          input: "handleGet('/api/users').status",
          expected: "200",
        },
        {
          name: "Includes path in body",
          input: "handleGet('/api/users').body.path",
          expected: "/api/users",
        },
        {
          name: "Includes OK message",
          input: "handleGet('/').body.message",
          expected: "OK",
        },
        {
          name: "Function is defined",
          test: "typeof handleGet === 'function'",
        },
      ],
      hints: [
        "Return a plain object literal with status and body keys.",
        "The body should itself be an object with message and path properties.",
        "Use the path parameter directly inside the returned body object.",
      ],
    },
    tags: ["express", "routes", "json", "rest-api"],
  },

  // ──────────────────────────────────────────────────
  // 2. Express Middleware (beginner)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-2",
    title: "Logger Middleware",
    description:
      "Create a middleware-style function that logs request info. It should accept a request object, attach a timestamp, and call a next callback.",
    trackId: "nodejs",
    category: "Middleware",
    difficulty: "beginner",
    estimatedMinutes: 4,
    challenge: {
      starterCode: `// Create a logger middleware function.
// It receives (req, res, next).
// - Attach req.loggedAt with the current ISO timestamp
// - Attach req.logMessage with "METHOD PATH" (e.g. "GET /api")
// - Call next()

function loggerMiddleware(req, res, next) {
  // TODO: Set req.loggedAt to new Date().toISOString()
  // TODO: Set req.logMessage to req.method + ' ' + req.path
  // TODO: Call next()
}`,
      solution: `function loggerMiddleware(req, res, next) {
  req.loggedAt = new Date().toISOString();
  req.logMessage = req.method + ' ' + req.path;
  next();
}`,
      tests: [
        {
          name: "Calls next callback",
          test: `
            var called = false;
            var req = { method: 'GET', path: '/test' };
            loggerMiddleware(req, {}, function() { called = true; });
            called === true;
          `,
        },
        {
          name: "Attaches loggedAt timestamp",
          test: `
            var req = { method: 'GET', path: '/api' };
            loggerMiddleware(req, {}, function() {});
            typeof req.loggedAt === 'string' && req.loggedAt.length > 0;
          `,
        },
        {
          name: "Attaches correct logMessage",
          test: `
            var req = { method: 'POST', path: '/users' };
            loggerMiddleware(req, {}, function() {});
            req.logMessage === 'POST /users';
          `,
        },
      ],
      hints: [
        "new Date().toISOString() gives you the current time as a string.",
        "Concatenate req.method and req.path with a space in between.",
        "next is a function -- just call it with no arguments at the end.",
      ],
    },
    tags: ["express", "middleware", "logging"],
  },

  // ──────────────────────────────────────────────────
  // 3. Error Handling Middleware (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-3",
    title: "Error Handling Middleware",
    description:
      "Implement an Express-style error handling middleware with the (err, req, res, next) signature. It should return a structured error response.",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    challenge: {
      starterCode: `// Create an error handling middleware.
// It receives (err, req, res, next).
// Return an object with:
//   status: err.statusCode or 500
//   body: { error: err.message, code: err.code or 'INTERNAL_ERROR' }

function errorHandler(err, req, res, next) {
  // TODO: Determine status from err.statusCode, default to 500
  // TODO: Determine code from err.code, default to 'INTERNAL_ERROR'
  // TODO: Return { status, body: { error: err.message, code } }
}`,
      solution: `function errorHandler(err, req, res, next) {
  var status = err.statusCode || 500;
  var code = err.code || 'INTERNAL_ERROR';
  return {
    status: status,
    body: {
      error: err.message,
      code: code,
    },
  };
}`,
      tests: [
        {
          name: "Uses err.statusCode when provided",
          input:
            "errorHandler({ statusCode: 404, message: 'Not Found', code: 'NOT_FOUND' }, {}, {}, function(){}).status",
          expected: "404",
        },
        {
          name: "Defaults to 500 when no statusCode",
          input:
            "errorHandler({ message: 'Oops' }, {}, {}, function(){}).status",
          expected: "500",
        },
        {
          name: "Returns error message in body",
          input:
            "errorHandler({ message: 'Bad request', statusCode: 400 }, {}, {}, function(){}).body.error",
          expected: "Bad request",
        },
        {
          name: "Defaults code to INTERNAL_ERROR",
          input:
            "errorHandler({ message: 'fail' }, {}, {}, function(){}).body.code",
          expected: "INTERNAL_ERROR",
        },
      ],
      hints: [
        "Use the || operator to provide defaults: err.statusCode || 500.",
        "err.code might be undefined; fall back to 'INTERNAL_ERROR'.",
        "The returned object needs both a status and a body with error and code.",
        "Remember this is a 4-argument function, which is how Express recognizes error middleware.",
      ],
    },
    tags: ["express", "error-handling", "middleware"],
  },

  // ──────────────────────────────────────────────────
  // 4. Async Error Handling (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-4",
    title: "Async Error Handling with Try/Catch",
    description:
      "Write an async handler wrapper that catches errors from async route handlers and returns structured success or error results.",
    trackId: "nodejs",
    category: "Error Handling",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    challenge: {
      starterCode: `// Create an asyncHandler wrapper.
// It takes an async function (fn) and returns a new function.
// The returned function calls fn() and:
//   - On success: returns { success: true, data: result }
//   - On error:   returns { success: false, error: err.message }

function asyncHandler(fn) {
  // TODO: Return a new async function
  // TODO: Inside, try calling await fn()
  // TODO: On success return { success: true, data: result }
  // TODO: On catch return { success: false, error: err.message }
}`,
      solution: `function asyncHandler(fn) {
  return async function() {
    try {
      var result = await fn();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
}`,
      tests: [
        {
          name: "Wraps successful async fn",
          test: `
            var wrapped = asyncHandler(async function() { return 42; });
            var result = wrapped();
            result instanceof Promise;
          `,
        },
        {
          name: "Returns success true for resolved promise",
          test: `
            var wrapped = asyncHandler(async function() { return 'hello'; });
            var p = wrapped().then(function(r) { return r.success === true && r.data === 'hello'; });
            p instanceof Promise;
          `,
        },
        {
          name: "Returns success false for rejected promise",
          test: `
            var wrapped = asyncHandler(async function() { throw new Error('boom'); });
            var p = wrapped().then(function(r) { return r.success === false && r.error === 'boom'; });
            p instanceof Promise;
          `,
        },
        {
          name: "Function returns a function",
          test: "typeof asyncHandler(async function(){}) === 'function'",
        },
      ],
      hints: [
        "asyncHandler should return a new async function using async function() {}.",
        "Inside the returned function, use try/catch around await fn().",
        "In the catch block, err.message gives you the error string.",
        "The wrapper itself is synchronous -- it just returns the async function.",
      ],
    },
    tags: ["async", "error-handling", "promises", "try-catch"],
  },

  // ──────────────────────────────────────────────────
  // 5. JSON Body Parser (beginner)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-5",
    title: "JSON Body Parser",
    description:
      "Write a function that parses a JSON string body and validates that required fields are present. Return the parsed object or an error.",
    trackId: "nodejs",
    category: "Middleware",
    difficulty: "beginner",
    estimatedMinutes: 4,
    challenge: {
      starterCode: `// Parse a JSON string and validate required fields.
// parseBody(jsonString, requiredFields)
// - Parse the JSON string
// - Check that every field in requiredFields exists on the parsed object
// - Return { success: true, data: parsed } if valid
// - Return { success: false, error: 'Invalid JSON' } if parsing fails
// - Return { success: false, error: 'Missing field: fieldName' } if a field is missing

function parseBody(jsonString, requiredFields) {
  // TODO: Try to JSON.parse the jsonString
  // TODO: Check each requiredFields entry exists in parsed data
  // TODO: Return success/error object
}`,
      solution: `function parseBody(jsonString, requiredFields) {
  var parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return { success: false, error: 'Invalid JSON' };
  }
  for (var i = 0; i < requiredFields.length; i++) {
    if (parsed[requiredFields[i]] === undefined) {
      return { success: false, error: 'Missing field: ' + requiredFields[i] };
    }
  }
  return { success: true, data: parsed };
}`,
      tests: [
        {
          name: "Parses valid JSON with all fields",
          input: `parseBody('{"name":"Alice","age":30}', ['name','age']).success`,
          expected: "true",
        },
        {
          name: "Returns error for invalid JSON",
          input: "parseBody('not json', []).error",
          expected: "Invalid JSON",
        },
        {
          name: "Detects missing required field",
          input: `parseBody('{"name":"Bob"}', ['name','email']).error`,
          expected: "Missing field: email",
        },
        {
          name: "Returns parsed data on success",
          input: `parseBody('{"x":1}', ['x']).data.x`,
          expected: "1",
        },
      ],
      hints: [
        "Wrap JSON.parse in a try/catch to handle invalid JSON.",
        "Loop through requiredFields and check each one exists in the parsed object.",
        "Use === undefined to test if a property is missing.",
      ],
    },
    tags: ["json", "parsing", "validation", "middleware"],
  },

  // ──────────────────────────────────────────────────
  // 6. URL Query Parsing (beginner)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-6",
    title: "URL Query Parameter Parser",
    description:
      "Write a function that parses a URL query string (e.g. '?name=Alice&age=30') into an object of key-value pairs.",
    trackId: "nodejs",
    category: "Utilities",
    difficulty: "beginner",
    estimatedMinutes: 4,
    challenge: {
      starterCode: `// Parse a URL query string into an object.
// parseQuery('?name=Alice&age=30') => { name: 'Alice', age: '30' }
// parseQuery('') => {}
// If the string starts with '?', strip it first.

function parseQuery(queryString) {
  // TODO: Handle empty string
  // TODO: Remove leading '?' if present
  // TODO: Split by '&', then each part by '='
  // TODO: Build and return the result object
}`,
      solution: `function parseQuery(queryString) {
  if (!queryString || queryString === '?') return {};
  var str = queryString;
  if (str.charAt(0) === '?') str = str.slice(1);
  var result = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    if (parts[0]) {
      result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    }
  }
  return result;
}`,
      tests: [
        {
          name: "Parses simple query string",
          input: "parseQuery('?name=Alice&age=30').name",
          expected: "Alice",
        },
        {
          name: "Returns empty object for empty string",
          input: "Object.keys(parseQuery('')).length",
          expected: "0",
        },
        {
          name: "Handles string without leading ?",
          input: "parseQuery('foo=bar').foo",
          expected: "bar",
        },
        {
          name: "Parses multiple params",
          input: "parseQuery('?a=1&b=2&c=3').c",
          expected: "3",
        },
      ],
      hints: [
        "First check if the string is empty or just '?' and return {} early.",
        "Use charAt(0) or startsWith to check for and remove the leading '?'.",
        "Split on '&' to get pairs, then split each pair on '=' for key/value.",
        "decodeURIComponent handles special characters in values.",
      ],
    },
    tags: ["url", "parsing", "query-string", "utilities"],
  },

  // ──────────────────────────────────────────────────
  // 7. Input Validation Function (beginner)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-7",
    title: "Input Validation Function",
    description:
      "Write a validation function that checks a user object against a set of rules (required, minLength, type) and returns validation results.",
    trackId: "nodejs",
    category: "Utilities",
    difficulty: "beginner",
    estimatedMinutes: 5,
    challenge: {
      starterCode: `// Validate a user object.
// validateUser(user) checks:
//   - name: must be a non-empty string
//   - email: must be a string containing '@'
//   - age: must be a number >= 0
// Returns { valid: true } if all pass
// Returns { valid: false, errors: ['...'] } with error messages

function validateUser(user) {
  // TODO: Create an errors array
  // TODO: Check name is a non-empty string
  // TODO: Check email is a string containing '@'
  // TODO: Check age is a number >= 0
  // TODO: Return { valid, errors } accordingly
}`,
      solution: `function validateUser(user) {
  var errors = [];
  if (typeof user.name !== 'string' || user.name.length === 0) {
    errors.push('name is required');
  }
  if (typeof user.email !== 'string' || user.email.indexOf('@') === -1) {
    errors.push('email must contain @');
  }
  if (typeof user.age !== 'number' || user.age < 0) {
    errors.push('age must be a non-negative number');
  }
  if (errors.length === 0) {
    return { valid: true };
  }
  return { valid: false, errors: errors };
}`,
      tests: [
        {
          name: "Valid user passes",
          input: "validateUser({ name: 'Alice', email: 'a@b.com', age: 25 }).valid",
          expected: "true",
        },
        {
          name: "Missing name fails",
          input: "validateUser({ name: '', email: 'a@b.com', age: 25 }).valid",
          expected: "false",
        },
        {
          name: "Invalid email fails",
          input: "validateUser({ name: 'A', email: 'invalid', age: 25 }).valid",
          expected: "false",
        },
        {
          name: "Negative age fails",
          input: "validateUser({ name: 'A', email: 'a@b.com', age: -1 }).errors.length > 0",
          expected: "true",
        },
      ],
      hints: [
        "Start with an empty errors array and push messages as checks fail.",
        "Use typeof to check types: typeof user.name !== 'string'.",
        "Use indexOf('@') to check for @ in the email string.",
        "Return { valid: true } only when errors.length is 0.",
      ],
    },
    tags: ["validation", "input", "user", "utilities"],
  },

  // ──────────────────────────────────────────────────
  // 8. CRUD Controller (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-8",
    title: "CRUD Controller for In-Memory Store",
    description:
      "Build create and read functions for an in-memory data store. The store is an array of items, each with an id and data.",
    trackId: "nodejs",
    category: "Express",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    challenge: {
      starterCode: `// In-memory CRUD controller.
// Maintain a store (array) inside a closure.
// createStore() returns an object with:
//   create(item) - adds item with auto-incremented id, returns the item with id
//   getById(id) - returns item by id, or null
//   getAll() - returns array of all items
//   deleteById(id) - removes item by id, returns true if found, false otherwise

function createStore() {
  var items = [];
  var nextId = 1;

  return {
    create: function(item) {
      // TODO: Assign an id to the item, push it, return it
    },
    getById: function(id) {
      // TODO: Find and return item by id, or null
    },
    getAll: function() {
      // TODO: Return all items
    },
    deleteById: function(id) {
      // TODO: Remove item by id, return true/false
    },
  };
}`,
      solution: `function createStore() {
  var items = [];
  var nextId = 1;

  return {
    create: function(item) {
      var record = { id: nextId++, data: item };
      items.push(record);
      return record;
    },
    getById: function(id) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) return items[i];
      }
      return null;
    },
    getAll: function() {
      return items.slice();
    },
    deleteById: function(id) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1);
          return true;
        }
      }
      return false;
    },
  };
}`,
      tests: [
        {
          name: "Create returns item with id",
          test: `
            var store = createStore();
            var item = store.create({ name: 'Widget' });
            item.id === 1 && item.data.name === 'Widget';
          `,
        },
        {
          name: "GetById returns correct item",
          test: `
            var store = createStore();
            store.create({ name: 'A' });
            store.create({ name: 'B' });
            var found = store.getById(2);
            found !== null && found.data.name === 'B';
          `,
        },
        {
          name: "GetAll returns all items",
          test: `
            var store = createStore();
            store.create({ x: 1 });
            store.create({ x: 2 });
            store.getAll().length === 2;
          `,
        },
        {
          name: "DeleteById removes item",
          test: `
            var store = createStore();
            store.create({ x: 1 });
            var deleted = store.deleteById(1);
            deleted === true && store.getAll().length === 0;
          `,
        },
      ],
      hints: [
        "Use a closure variable nextId that auto-increments with nextId++.",
        "Store each item as { id: nextId++, data: item } in the items array.",
        "For getById, loop through items and compare each id.",
        "For deleteById, use splice(i, 1) to remove the item at index i.",
      ],
    },
    tags: ["crud", "closures", "data-store", "express"],
  },

  // ──────────────────────────────────────────────────
  // 9. Environment Config Loader (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-9",
    title: "Environment Config Loader",
    description:
      "Write a function that loads configuration from an env-like object, validates required keys, and applies defaults for optional ones.",
    trackId: "nodejs",
    category: "Patterns",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    challenge: {
      starterCode: `// Load and validate configuration from an env object.
// loadConfig(env, schema)
//   env: object like { PORT: '3000', NODE_ENV: 'production' }
//   schema: array of { key, required, default, type }
//     type is 'string' or 'number'
// Returns { success: true, config: { ... } }
//   or { success: false, missing: ['KEY1', 'KEY2'] }

function loadConfig(env, schema) {
  // TODO: Loop through schema entries
  // TODO: Collect missing required keys
  // TODO: Apply defaults for missing optional keys
  // TODO: Convert to number if type is 'number'
  // TODO: Return config or missing keys
}`,
      solution: `function loadConfig(env, schema) {
  var config = {};
  var missing = [];

  for (var i = 0; i < schema.length; i++) {
    var entry = schema[i];
    var value = env[entry.key];

    if (value === undefined || value === '') {
      if (entry.required) {
        missing.push(entry.key);
        continue;
      }
      value = entry.default !== undefined ? String(entry.default) : '';
    }

    if (entry.type === 'number') {
      config[entry.key] = Number(value);
    } else {
      config[entry.key] = value;
    }
  }

  if (missing.length > 0) {
    return { success: false, missing: missing };
  }
  return { success: true, config: config };
}`,
      tests: [
        {
          name: "Loads valid config",
          input:
            "loadConfig({ PORT: '3000', HOST: 'localhost' }, [{ key: 'PORT', required: true, type: 'number' }, { key: 'HOST', required: true, type: 'string' }]).success",
          expected: "true",
        },
        {
          name: "Converts number types",
          input:
            "loadConfig({ PORT: '8080' }, [{ key: 'PORT', required: true, type: 'number' }]).config.PORT",
          expected: "8080",
        },
        {
          name: "Reports missing required keys",
          input:
            "loadConfig({}, [{ key: 'SECRET', required: true, type: 'string' }]).missing[0]",
          expected: "SECRET",
        },
        {
          name: "Applies defaults for optional keys",
          input:
            "loadConfig({}, [{ key: 'PORT', required: false, default: 3000, type: 'number' }]).config.PORT",
          expected: "3000",
        },
      ],
      hints: [
        "Loop through each schema entry and check if env[entry.key] exists.",
        "If a required key is missing, push it to the missing array.",
        "For optional keys with defaults, use the default value when the env value is absent.",
        "Use Number(value) to convert strings to numbers when type is 'number'.",
      ],
    },
    tags: ["config", "environment", "validation", "patterns"],
  },

  // ──────────────────────────────────────────────────
  // 10. Retry with Exponential Backoff (advanced)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-10",
    title: "Retry with Exponential Backoff",
    description:
      "Implement a retry function that attempts an operation multiple times with exponential backoff delays. Uses simulated delays for testability.",
    trackId: "nodejs",
    category: "Async",
    difficulty: "advanced",
    estimatedMinutes: 10,
    challenge: {
      starterCode: `// Implement a retry function with exponential backoff.
// retry(fn, options) where:
//   fn: a function that returns a value or throws an error
//   options: { maxRetries: number, baseDelay: number }
//
// Returns { success: true, result, attempts } on success
// Returns { success: false, error: lastError.message, attempts } after all retries fail
//
// The delay doubles each retry: baseDelay, baseDelay*2, baseDelay*4, ...
// For testability, do NOT use setTimeout -- just track what the delays would be.
// Store delays in the returned object as a 'delays' array.

function retry(fn, options) {
  // TODO: Set up maxRetries and baseDelay from options
  // TODO: Loop up to maxRetries + 1 attempts (initial + retries)
  // TODO: Try calling fn() each time
  // TODO: On success return { success: true, result, attempts, delays }
  // TODO: On failure, record the delay and continue
  // TODO: After all attempts fail, return failure object
}`,
      solution: `function retry(fn, options) {
  var maxRetries = options.maxRetries || 3;
  var baseDelay = options.baseDelay || 100;
  var attempts = 0;
  var delays = [];
  var lastError;

  for (var i = 0; i <= maxRetries; i++) {
    attempts++;
    try {
      var result = fn();
      return { success: true, result: result, attempts: attempts, delays: delays };
    } catch (err) {
      lastError = err;
      if (i < maxRetries) {
        var delay = baseDelay * Math.pow(2, i);
        delays.push(delay);
      }
    }
  }

  return { success: false, error: lastError.message, attempts: attempts, delays: delays };
}`,
      tests: [
        {
          name: "Returns success on first try",
          test: `
            var r = retry(function() { return 'ok'; }, { maxRetries: 3, baseDelay: 100 });
            r.success === true && r.result === 'ok' && r.attempts === 1;
          `,
        },
        {
          name: "Retries and succeeds on third attempt",
          test: `
            var count = 0;
            var r = retry(function() {
              count++;
              if (count < 3) throw new Error('fail');
              return 'done';
            }, { maxRetries: 5, baseDelay: 100 });
            r.success === true && r.attempts === 3;
          `,
        },
        {
          name: "Returns failure after max retries",
          test: `
            var r = retry(function() { throw new Error('always fails'); }, { maxRetries: 2, baseDelay: 50 });
            r.success === false && r.attempts === 3 && r.error === 'always fails';
          `,
        },
        {
          name: "Tracks exponential delays",
          test: `
            var r = retry(function() { throw new Error('fail'); }, { maxRetries: 3, baseDelay: 100 });
            r.delays[0] === 100 && r.delays[1] === 200 && r.delays[2] === 400;
          `,
        },
      ],
      hints: [
        "Loop from 0 to maxRetries (inclusive), giving maxRetries + 1 total attempts.",
        "Use Math.pow(2, i) to calculate the exponential multiplier for each retry.",
        "Only push a delay when the attempt fails AND it is not the last attempt.",
        "Keep track of the last error so you can return its message on final failure.",
      ],
    },
    tags: ["retry", "exponential-backoff", "async", "resilience"],
  },

  // ──────────────────────────────────────────────────
  // 11. EventEmitter Pub/Sub (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-11",
    title: "EventEmitter Pub/Sub System",
    description:
      "Implement a simple publish/subscribe event system with on, off, and emit methods, inspired by Node.js EventEmitter.",
    trackId: "nodejs",
    category: "Patterns",
    difficulty: "intermediate",
    estimatedMinutes: 8,
    challenge: {
      starterCode: `// Create an EventEmitter-style pub/sub system.
// createEmitter() returns an object with:
//   on(event, handler) - subscribe handler to event
//   off(event, handler) - unsubscribe handler from event
//   emit(event, data) - call all handlers for event with data
//   listenerCount(event) - return number of handlers for event

function createEmitter() {
  // TODO: Store listeners in an object keyed by event name
  // TODO: Implement on, off, emit, listenerCount
}`,
      solution: `function createEmitter() {
  var listeners = {};

  return {
    on: function(event, handler) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
    },
    off: function(event, handler) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter(function(h) { return h !== handler; });
    },
    emit: function(event, data) {
      if (!listeners[event]) return;
      for (var i = 0; i < listeners[event].length; i++) {
        listeners[event][i](data);
      }
    },
    listenerCount: function(event) {
      return listeners[event] ? listeners[event].length : 0;
    },
  };
}`,
      tests: [
        {
          name: "on registers a listener",
          test: `
            var emitter = createEmitter();
            emitter.on('test', function() {});
            emitter.listenerCount('test') === 1;
          `,
        },
        {
          name: "emit calls all handlers with data",
          test: `
            var emitter = createEmitter();
            var results = [];
            emitter.on('data', function(d) { results.push(d); });
            emitter.on('data', function(d) { results.push(d * 2); });
            emitter.emit('data', 5);
            results[0] === 5 && results[1] === 10;
          `,
        },
        {
          name: "off removes a specific handler",
          test: `
            var emitter = createEmitter();
            var fn = function() {};
            emitter.on('x', fn);
            emitter.on('x', function() {});
            emitter.off('x', fn);
            emitter.listenerCount('x') === 1;
          `,
        },
        {
          name: "listenerCount returns 0 for unknown events",
          test: `
            var emitter = createEmitter();
            emitter.listenerCount('nope') === 0;
          `,
        },
      ],
      hints: [
        "Use an object {} as a map where keys are event names and values are arrays of handlers.",
        "In on(), initialize the array if it does not exist, then push the handler.",
        "In off(), use filter() to remove only the specific handler reference.",
        "In emit(), loop through the handlers array and call each with the data argument.",
      ],
    },
    tags: ["events", "pub-sub", "emitter", "patterns"],
  },

  // ──────────────────────────────────────────────────
  // 12. Array Data Transformer (intermediate)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-12",
    title: "Array Data Transformer Pipeline",
    description:
      "Process an array of user objects using map, filter, and reduce to build a summary report. Mimics server-side data processing in Node.js APIs.",
    trackId: "nodejs",
    category: "Utilities",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    challenge: {
      starterCode: `// Transform an array of user objects into a summary.
// Each user has: { name, age, active, score }
//
// processUsers(users) should:
// 1. Filter to only active users
// 2. Map to { name, score } objects
// 3. Sort by score descending
// 4. Return { count, topScorer, averageScore, users }
//    where topScorer is the name of the highest scorer
//    and averageScore is rounded to 2 decimal places

function processUsers(users) {
  // TODO: Filter active users
  // TODO: Map to { name, score }
  // TODO: Sort by score descending
  // TODO: Calculate averageScore
  // TODO: Return the summary object
}`,
      solution: `function processUsers(users) {
  var active = users.filter(function(u) { return u.active; });
  var mapped = active.map(function(u) { return { name: u.name, score: u.score }; });
  mapped.sort(function(a, b) { return b.score - a.score; });

  var total = 0;
  for (var i = 0; i < mapped.length; i++) {
    total += mapped[i].score;
  }
  var avg = mapped.length > 0 ? Math.round((total / mapped.length) * 100) / 100 : 0;

  return {
    count: mapped.length,
    topScorer: mapped.length > 0 ? mapped[0].name : null,
    averageScore: avg,
    users: mapped,
  };
}`,
      tests: [
        {
          name: "Filters to active users only",
          input: `processUsers([
            { name: 'A', age: 20, active: true, score: 90 },
            { name: 'B', age: 25, active: false, score: 95 },
            { name: 'C', age: 30, active: true, score: 80 }
          ]).count`,
          expected: "2",
        },
        {
          name: "Identifies top scorer",
          input: `processUsers([
            { name: 'Alice', age: 20, active: true, score: 85 },
            { name: 'Bob', age: 25, active: true, score: 95 }
          ]).topScorer`,
          expected: "Bob",
        },
        {
          name: "Calculates average score",
          input: `processUsers([
            { name: 'X', age: 20, active: true, score: 80 },
            { name: 'Y', age: 25, active: true, score: 90 }
          ]).averageScore`,
          expected: "85",
        },
        {
          name: "Returns users sorted by score descending",
          input: `processUsers([
            { name: 'A', age: 20, active: true, score: 70 },
            { name: 'B', age: 25, active: true, score: 90 }
          ]).users[0].name`,
          expected: "B",
        },
      ],
      hints: [
        "Use .filter(function(u) { return u.active; }) to keep only active users.",
        "Use .map() to transform each user to just { name, score }.",
        "Sort with .sort(function(a, b) { return b.score - a.score; }) for descending order.",
        "Round to 2 decimals: Math.round(value * 100) / 100.",
      ],
    },
    tags: ["array", "map", "filter", "reduce", "data-processing"],
  },

  // ──────────────────────────────────────────────────
  // 13. Debounce Function (advanced)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-13",
    title: "Debounce Utility Function",
    description:
      "Implement a debounce function that delays invoking the provided function until after a specified wait period. Uses a call-tracking approach for testability.",
    trackId: "nodejs",
    category: "Utilities",
    difficulty: "advanced",
    estimatedMinutes: 9,
    challenge: {
      starterCode: `// Implement a debounce function.
// For testability, this version tracks calls instead of using setTimeout.
//
// createDebounced(fn, delay) returns an object with:
//   call(...args) - records a pending call with timestamp Date.now()
//   flush() - if there is a pending call, execute fn with its args, clear pending
//   cancel() - clear the pending call without executing
//   pending() - return true if a call is pending
//   getDelay() - return the configured delay

function createDebounced(fn, delay) {
  // TODO: Track pending call info (args and timestamp)
  // TODO: Implement call, flush, cancel, pending, getDelay
}`,
      solution: `function createDebounced(fn, delay) {
  var pendingArgs = null;
  var pendingTime = null;

  return {
    call: function() {
      pendingArgs = Array.prototype.slice.call(arguments);
      pendingTime = Date.now();
    },
    flush: function() {
      if (pendingArgs !== null) {
        var args = pendingArgs;
        pendingArgs = null;
        pendingTime = null;
        return fn.apply(null, args);
      }
    },
    cancel: function() {
      pendingArgs = null;
      pendingTime = null;
    },
    pending: function() {
      return pendingArgs !== null;
    },
    getDelay: function() {
      return delay;
    },
  };
}`,
      tests: [
        {
          name: "call sets pending state",
          test: `
            var d = createDebounced(function() {}, 100);
            d.call('a', 'b');
            d.pending() === true;
          `,
        },
        {
          name: "flush executes fn with pending args",
          test: `
            var result = null;
            var d = createDebounced(function(x, y) { result = x + y; }, 100);
            d.call(3, 4);
            d.flush();
            result === 7 && d.pending() === false;
          `,
        },
        {
          name: "cancel clears pending without executing",
          test: `
            var called = false;
            var d = createDebounced(function() { called = true; }, 100);
            d.call();
            d.cancel();
            d.pending() === false && called === false;
          `,
        },
        {
          name: "getDelay returns configured delay",
          test: `
            var d = createDebounced(function() {}, 250);
            d.getDelay() === 250;
          `,
        },
      ],
      hints: [
        "Use closure variables to store the pending arguments and timestamp.",
        "In call(), overwrite pending state with new args (latest call wins).",
        "In flush(), call fn.apply(null, args) to pass the stored arguments.",
        "After flush or cancel, set pendingArgs back to null.",
      ],
    },
    tags: ["debounce", "utilities", "closures", "performance"],
  },

  // ──────────────────────────────────────────────────
  // 14. Promise.all Coordinator (advanced)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-14",
    title: "Promise.all Coordinator",
    description:
      "Build a function that runs multiple async tasks in parallel and collects their results, similar to Promise.all but with added error collection.",
    trackId: "nodejs",
    category: "Async",
    difficulty: "advanced",
    estimatedMinutes: 10,
    challenge: {
      starterCode: `// Implement runAll(tasks) where tasks is an array of functions
// that return promises.
//
// Returns a promise that resolves to:
//   { results: [...], errors: [...], totalTime: number }
//
// - results: array of { index, value } for successful tasks
// - errors: array of { index, error } for failed tasks
// - totalTime: Date.now() difference from start to end
//
// All tasks should run in parallel (not sequentially).
// Unlike Promise.all, this should NOT reject if some tasks fail.

function runAll(tasks) {
  // TODO: Record start time
  // TODO: Create a promise for each task, catching errors
  // TODO: Use Promise.all to wait for all to settle
  // TODO: Separate results and errors
  // TODO: Return the summary object
}`,
      solution: `function runAll(tasks) {
  var start = Date.now();
  var wrapped = tasks.map(function(task, index) {
    return task()
      .then(function(value) {
        return { status: 'ok', index: index, value: value };
      })
      .catch(function(err) {
        return { status: 'error', index: index, error: err.message || String(err) };
      });
  });

  return Promise.all(wrapped).then(function(outcomes) {
    var results = [];
    var errors = [];
    for (var i = 0; i < outcomes.length; i++) {
      if (outcomes[i].status === 'ok') {
        results.push({ index: outcomes[i].index, value: outcomes[i].value });
      } else {
        errors.push({ index: outcomes[i].index, error: outcomes[i].error });
      }
    }
    return {
      results: results,
      errors: errors,
      totalTime: Date.now() - start,
    };
  });
}`,
      tests: [
        {
          name: "Collects all successful results",
          test: `
            var p = runAll([
              function() { return Promise.resolve('a'); },
              function() { return Promise.resolve('b'); },
            ]);
            p instanceof Promise;
          `,
        },
        {
          name: "Handles mix of success and failure",
          test: `
            var p = runAll([
              function() { return Promise.resolve(1); },
              function() { return Promise.reject(new Error('fail')); },
              function() { return Promise.resolve(3); },
            ]).then(function(r) {
              return r.results.length === 2 && r.errors.length === 1;
            });
            p instanceof Promise;
          `,
        },
        {
          name: "Errors include the correct index",
          test: `
            var p = runAll([
              function() { return Promise.resolve('ok'); },
              function() { return Promise.reject(new Error('bad')); },
            ]).then(function(r) {
              return r.errors[0].index === 1 && r.errors[0].error === 'bad';
            });
            p instanceof Promise;
          `,
        },
        {
          name: "Returns totalTime as a number",
          test: `
            var p = runAll([
              function() { return Promise.resolve(1); },
            ]).then(function(r) {
              return typeof r.totalTime === 'number' && r.totalTime >= 0;
            });
            p instanceof Promise;
          `,
        },
      ],
      hints: [
        "Wrap each task in .then().catch() so failures become resolved values with a status flag.",
        "Use Promise.all on the wrapped promises -- they all resolve, never reject.",
        "After Promise.all resolves, loop through outcomes and separate by status.",
        "Record Date.now() at start and subtract in the final .then() to get totalTime.",
      ],
    },
    tags: ["promises", "parallel", "async", "error-collection"],
  },

  // ──────────────────────────────────────────────────
  // 15. Simple Cache with TTL (advanced)
  // ──────────────────────────────────────────────────
  {
    id: "nodejs-drill-15",
    title: "In-Memory Cache with TTL",
    description:
      "Implement a cache that stores key-value pairs with a time-to-live (TTL). Expired entries should be treated as missing. Uses injectable time for testability.",
    trackId: "nodejs",
    category: "Patterns",
    difficulty: "advanced",
    estimatedMinutes: 10,
    challenge: {
      starterCode: `// Create a cache with TTL support.
// createCache(defaultTTL) returns an object with:
//   set(key, value, ttl?) - store value with optional custom TTL (ms)
//   get(key) - return value if exists and not expired, else undefined
//   has(key) - return true if key exists and not expired
//   delete(key) - remove key, return true if it existed
//   size() - return count of non-expired entries
//   clear() - remove all entries
//
// For testability, also include:
//   _setNow(fn) - override the time function (default: Date.now)

function createCache(defaultTTL) {
  // TODO: Store entries as { value, expiresAt }
  // TODO: Use a configurable now() function for time
  // TODO: Implement all methods above
}`,
      solution: `function createCache(defaultTTL) {
  var store = {};
  var getNow = Date.now;

  function isExpired(entry) {
    return getNow() > entry.expiresAt;
  }

  return {
    set: function(key, value, ttl) {
      var t = ttl !== undefined ? ttl : defaultTTL;
      store[key] = { value: value, expiresAt: getNow() + t };
    },
    get: function(key) {
      var entry = store[key];
      if (!entry || isExpired(entry)) {
        if (entry) delete store[key];
        return undefined;
      }
      return entry.value;
    },
    has: function(key) {
      var entry = store[key];
      if (!entry || isExpired(entry)) {
        if (entry) delete store[key];
        return false;
      }
      return true;
    },
    delete: function(key) {
      if (store[key] !== undefined) {
        delete store[key];
        return true;
      }
      return false;
    },
    size: function() {
      var count = 0;
      var keys = Object.keys(store);
      for (var i = 0; i < keys.length; i++) {
        if (!isExpired(store[keys[i]])) {
          count++;
        } else {
          delete store[keys[i]];
        }
      }
      return count;
    },
    clear: function() {
      store = {};
    },
    _setNow: function(fn) {
      getNow = fn;
    },
  };
}`,
      tests: [
        {
          name: "set and get a value",
          test: `
            var cache = createCache(10000);
            cache.set('a', 42);
            cache.get('a') === 42;
          `,
        },
        {
          name: "Expired entries return undefined",
          test: `
            var time = 1000;
            var cache = createCache(100);
            cache._setNow(function() { return time; });
            cache.set('x', 'hello');
            time = 1200;
            cache.get('x') === undefined;
          `,
        },
        {
          name: "has returns false for expired keys",
          test: `
            var time = 1000;
            var cache = createCache(50);
            cache._setNow(function() { return time; });
            cache.set('k', 'v');
            time = 1100;
            cache.has('k') === false;
          `,
        },
        {
          name: "size counts only non-expired entries",
          test: `
            var time = 0;
            var cache = createCache(100);
            cache._setNow(function() { return time; });
            cache.set('a', 1);
            cache.set('b', 2);
            time = 50;
            cache.set('c', 3);
            time = 120;
            cache.size() === 1;
          `,
        },
      ],
      hints: [
        "Store each entry as { value, expiresAt: now() + ttl } in a plain object.",
        "In get() and has(), check if now() > entry.expiresAt to detect expiration.",
        "The _setNow method allows tests to control time by overriding the getNow function.",
        "In size(), iterate all keys and count only those that are not expired.",
      ],
    },
    tags: ["cache", "ttl", "patterns", "performance"],
  },
];
