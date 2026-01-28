import { Lesson } from './lessons';

// Node.js Fundamentals (10 lessons)
export const nodeFundamentals: Lesson[] = [
  {
    id: 'node-1',
    slug: 'introduction-to-nodejs',
    title: 'Introduction to Node.js',
    description: 'Learn what Node.js is, how it works, and why it revolutionized server-side JavaScript development.',
    order: 1,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Introduction to Node.js

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript outside the browser.

## What is Node.js?

Node.js enables server-side JavaScript execution, allowing developers to use one language for both frontend and backend development.

## The Event Loop

Node.js uses a single-threaded, non-blocking I/O model powered by the event loop:

\`\`\`javascript
// Non-blocking example
console.log('Start');

setTimeout(() => {
  console.log('Timer callback');
}, 0);

console.log('End');
// Output: Start, End, Timer callback
\`\`\`

## Key Features

- **Asynchronous I/O**: Non-blocking operations for high performance
- **NPM**: World's largest package ecosystem
- **Cross-platform**: Runs on Windows, macOS, and Linux
- **Event-driven**: Perfect for real-time applications
    `,
    codeExamples: [
      {
        title: 'Hello World Server',
        code: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
        explanation: 'A basic HTTP server that responds with "Hello World" to every request.'
      },
      {
        title: 'Reading Command Line Arguments',
        code: `// Run with: node script.js arg1 arg2
console.log('Node version:', process.version);
console.log('Arguments:', process.argv.slice(2));
console.log('Current directory:', process.cwd());`,
        explanation: 'Accessing Node.js runtime information and command line arguments.'
      }
    ],
    challenge: {
      starterCode: `// Create a function that returns Node.js environment info
function getNodeInfo() {
  // Return an object with:
  // - version: Node.js version
  // - platform: Operating system platform
  // - arch: CPU architecture
  // Your code here
}

module.exports = { getNodeInfo };`,
      solution: `function getNodeInfo() {
  return {
    version: process.version,
    platform: process.platform,
    arch: process.arch
  };
}

module.exports = { getNodeInfo };`,
      tests: [
        { input: '', expected: 'object', description: 'Should return an object' },
        { input: 'version', expected: 'string', description: 'Should have version property' },
        { input: 'platform', expected: 'string', description: 'Should have platform property' }
      ],
      hints: ['Use the process global object', 'process.version gives the Node version']
    }
  },
  {
    id: 'node-2',
    slug: 'nodejs-modules',
    title: 'Node.js Modules',
    description: 'Master the CommonJS and ES module systems in Node.js.',
    order: 2,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Node.js Modules

Modules allow you to organize code into reusable files. Node.js supports both CommonJS and ES modules.

## CommonJS Modules

The traditional Node.js module system:

\`\`\`javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
\`\`\`

## ES Modules

Modern JavaScript modules (requires "type": "module" in package.json):

\`\`\`javascript
// math.mjs
export const add = (a, b) => a + b;
export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add } from './math.mjs';
\`\`\`

## Built-in Modules

Node.js provides many built-in modules:
- \`fs\` - File system operations
- \`path\` - Path manipulation
- \`http\` - HTTP server/client
- \`crypto\` - Cryptographic functions
    `,
    codeExamples: [
      {
        title: 'CommonJS Module Pattern',
        code: `// logger.js
class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(message) {
    console.log(\`[\${this.prefix}] \${message}\`);
  }

  error(message) {
    console.error(\`[\${this.prefix}] ERROR: \${message}\`);
  }
}

module.exports = Logger;

// Usage
const Logger = require('./logger');
const log = new Logger('App');
log.log('Server started');`,
        explanation: 'Exporting a class using CommonJS module.exports.'
      },
      {
        title: 'ES Module with Named Exports',
        code: `// utils.mjs
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str) => {
  return str.toLowerCase().replace(/\\s+/g, '-');
};

// app.mjs
import { formatDate, capitalize } from './utils.mjs';
console.log(capitalize('hello')); // Hello`,
        explanation: 'ES modules with multiple named exports.'
      }
    ],
    challenge: {
      starterCode: `// Create a calculator module with CommonJS
// Export functions: add, subtract, multiply, divide

function add(a, b) {
  // Your code here
}

function subtract(a, b) {
  // Your code here
}

function multiply(a, b) {
  // Your code here
}

function divide(a, b) {
  // Your code here (handle division by zero)
}

module.exports = { add, subtract, multiply, divide };`,
      solution: `function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };`,
      tests: [
        { input: 'add(5, 3)', expected: '8', description: 'add should return sum' },
        { input: 'subtract(10, 4)', expected: '6', description: 'subtract should return difference' },
        { input: 'multiply(3, 4)', expected: '12', description: 'multiply should return product' },
        { input: 'divide(10, 2)', expected: '5', description: 'divide should return quotient' }
      ],
      hints: ['Use simple arithmetic operators', 'Check for division by zero before dividing']
    }
  },
  {
    id: 'node-3',
    slug: 'file-system',
    title: 'File System Operations',
    description: 'Learn to read, write, and manipulate files using the fs module.',
    order: 3,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    content: `
# File System Operations

The \`fs\` module provides APIs for interacting with the file system.

## Synchronous vs Asynchronous

Node.js provides both sync and async versions of file operations:

\`\`\`javascript
const fs = require('fs');

// Synchronous (blocks execution)
const data = fs.readFileSync('file.txt', 'utf8');

// Asynchronous with callback
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise-based (recommended)
const fsPromises = require('fs').promises;
const data = await fsPromises.readFile('file.txt', 'utf8');
\`\`\`

## Common Operations

- **readFile/writeFile**: Read/write entire files
- **appendFile**: Add content to a file
- **mkdir/rmdir**: Create/remove directories
- **readdir**: List directory contents
- **stat**: Get file information
- **unlink**: Delete a file
    `,
    codeExamples: [
      {
        title: 'Reading and Writing Files',
        code: `const fs = require('fs').promises;

async function processFile() {
  try {
    // Read file
    const content = await fs.readFile('input.txt', 'utf8');

    // Process content
    const processed = content.toUpperCase();

    // Write to new file
    await fs.writeFile('output.txt', processed);
    console.log('File processed successfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processFile();`,
        explanation: 'Using promise-based fs methods for cleaner async code.'
      },
      {
        title: 'Directory Operations',
        code: `const fs = require('fs').promises;
const path = require('path');

async function listFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      console.log(\`📁 \${entry.name}/\`);
    } else {
      const stats = await fs.stat(fullPath);
      console.log(\`📄 \${entry.name} (\${stats.size} bytes)\`);
    }
  }
}

listFiles('./');`,
        explanation: 'Listing directory contents with file type detection.'
      }
    ],
    challenge: {
      starterCode: `const fs = require('fs').promises;

// Create a function that copies a file
async function copyFile(source, destination) {
  // Read from source and write to destination
  // Return true on success, throw error on failure
  // Your code here
}

module.exports = { copyFile };`,
      solution: `const fs = require('fs').promises;

async function copyFile(source, destination) {
  const content = await fs.readFile(source);
  await fs.writeFile(destination, content);
  return true;
}

module.exports = { copyFile };`,
      tests: [
        { input: 'typeof copyFile', expected: 'function', description: 'copyFile should be a function' },
        { input: 'copyFile.constructor.name', expected: 'AsyncFunction', description: 'copyFile should be async' }
      ],
      hints: ['Use fs.promises for async operations', 'readFile returns the content, writeFile saves it']
    }
  },
  {
    id: 'node-4',
    slug: 'path-os-modules',
    title: 'Path and OS Modules',
    description: 'Work with file paths and system information across platforms.',
    order: 4,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Path and OS Modules

These modules help write cross-platform Node.js applications.

## Path Module

The \`path\` module provides utilities for working with file and directory paths:

\`\`\`javascript
const path = require('path');

path.join('folder', 'subfolder', 'file.txt');
// Windows: folder\\subfolder\\file.txt
// Unix: folder/subfolder/file.txt

path.resolve('relative', 'path');
// Returns absolute path

path.basename('/path/to/file.txt'); // file.txt
path.dirname('/path/to/file.txt');  // /path/to
path.extname('file.txt');           // .txt
\`\`\`

## OS Module

Get information about the operating system:

\`\`\`javascript
const os = require('os');

os.platform();  // 'darwin', 'win32', 'linux'
os.cpus();      // CPU information
os.totalmem();  // Total memory in bytes
os.freemem();   // Free memory in bytes
os.homedir();   // User's home directory
os.tmpdir();    // Temp directory
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Cross-Platform Path Handling',
        code: `const path = require('path');

// Always use path.join for cross-platform compatibility
const configPath = path.join(__dirname, 'config', 'settings.json');

// Parse a file path
const filePath = '/users/docs/report.pdf';
const parsed = path.parse(filePath);
console.log(parsed);
// { root: '/', dir: '/users/docs', base: 'report.pdf',
//   ext: '.pdf', name: 'report' }

// Build paths from components
const newPath = path.format({
  dir: '/home/user',
  name: 'document',
  ext: '.txt'
});
console.log(newPath); // /home/user/document.txt`,
        explanation: 'Using path methods for portable file path handling.'
      },
      {
        title: 'System Information',
        code: `const os = require('os');

function getSystemInfo() {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  return {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    cpuModel: cpus[0].model,
    cpuCores: cpus.length,
    totalMemoryGB: (totalMem / 1024 / 1024 / 1024).toFixed(2),
    freeMemoryGB: (freeMem / 1024 / 1024 / 1024).toFixed(2),
    uptime: os.uptime()
  };
}

console.log(getSystemInfo());`,
        explanation: 'Gathering comprehensive system information.'
      }
    ],
    challenge: {
      starterCode: `const path = require('path');

// Create a function that extracts file information
function getFileInfo(filePath) {
  // Return an object with:
  // - name: filename without extension
  // - ext: file extension (including dot)
  // - dir: directory path
  // - isAbsolute: boolean indicating if path is absolute
  // Your code here
}

module.exports = { getFileInfo };`,
      solution: `const path = require('path');

function getFileInfo(filePath) {
  const parsed = path.parse(filePath);
  return {
    name: parsed.name,
    ext: parsed.ext,
    dir: parsed.dir,
    isAbsolute: path.isAbsolute(filePath)
  };
}

module.exports = { getFileInfo };`,
      tests: [
        { input: 'getFileInfo("/path/to/file.txt").name', expected: 'file', description: 'Should extract filename' },
        { input: 'getFileInfo("/path/to/file.txt").ext', expected: '.txt', description: 'Should extract extension' },
        { input: 'getFileInfo("/path/to/file.txt").isAbsolute', expected: 'true', description: 'Should detect absolute path' }
      ],
      hints: ['Use path.parse() to break down the path', 'path.isAbsolute() checks if a path is absolute']
    }
  },
  {
    id: 'node-5',
    slug: 'events-eventemitter',
    title: 'Events and EventEmitter',
    description: 'Master the event-driven architecture pattern in Node.js.',
    order: 5,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Events and EventEmitter

Node.js is built on an event-driven architecture. The EventEmitter class is the foundation for handling events.

## EventEmitter Basics

\`\`\`javascript
const EventEmitter = require('events');

const emitter = new EventEmitter();

// Listen for an event
emitter.on('greet', (name) => {
  console.log(\`Hello, \${name}!\`);
});

// Emit the event
emitter.emit('greet', 'World'); // Hello, World!
\`\`\`

## Key Methods

- **on(event, listener)**: Add a listener
- **once(event, listener)**: Add a one-time listener
- **emit(event, ...args)**: Trigger an event
- **removeListener(event, listener)**: Remove a listener
- **removeAllListeners([event])**: Remove all listeners
    `,
    codeExamples: [
      {
        title: 'Custom EventEmitter Class',
        code: `const EventEmitter = require('events');

class OrderProcessor extends EventEmitter {
  constructor() {
    super();
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
    this.emit('orderAdded', order);
  }

  processOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'processed';
      this.emit('orderProcessed', order);
    } else {
      this.emit('error', new Error('Order not found'));
    }
  }
}

const processor = new OrderProcessor();

processor.on('orderAdded', (order) => {
  console.log('New order:', order.id);
});

processor.on('orderProcessed', (order) => {
  console.log('Processed:', order.id);
});

processor.addOrder({ id: 1, item: 'Widget' });
processor.processOrder(1);`,
        explanation: 'Extending EventEmitter to create a custom event-driven class.'
      },
      {
        title: 'Once and Error Handling',
        code: `const EventEmitter = require('events');
const emitter = new EventEmitter();

// One-time listener
emitter.once('connect', () => {
  console.log('Connected! (only fires once)');
});

// Error handling (always add error listener!)
emitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});

// Listener count
emitter.on('data', () => {});
emitter.on('data', () => {});
console.log('Data listeners:', emitter.listenerCount('data')); // 2

emitter.emit('connect');
emitter.emit('connect'); // Won't fire again
emitter.emit('error', new Error('Connection lost'));`,
        explanation: 'Using once() for single-fire events and proper error handling.'
      }
    ],
    challenge: {
      starterCode: `const EventEmitter = require('events');

// Create a Timer class that extends EventEmitter
// It should emit 'tick' every second and 'complete' when done
class Timer extends EventEmitter {
  constructor(seconds) {
    super();
    this.seconds = seconds;
    this.remaining = seconds;
  }

  start() {
    // Emit 'tick' with remaining seconds every second
    // Emit 'complete' when timer reaches 0
    // Your code here
  }
}

module.exports = { Timer };`,
      solution: `const EventEmitter = require('events');

class Timer extends EventEmitter {
  constructor(seconds) {
    super();
    this.seconds = seconds;
    this.remaining = seconds;
  }

  start() {
    const interval = setInterval(() => {
      this.remaining--;
      this.emit('tick', this.remaining);

      if (this.remaining === 0) {
        clearInterval(interval);
        this.emit('complete');
      }
    }, 1000);
  }
}

module.exports = { Timer };`,
      tests: [
        { input: 'new Timer(5) instanceof EventEmitter', expected: 'true', description: 'Timer should extend EventEmitter' },
        { input: 'typeof new Timer(5).start', expected: 'function', description: 'Timer should have start method' }
      ],
      hints: ['Use setInterval for periodic execution', 'clearInterval stops the timer', 'emit() triggers event listeners']
    }
  },
  {
    id: 'node-6',
    slug: 'streams',
    title: 'Streams',
    description: 'Learn to process data efficiently using Node.js streams.',
    order: 6,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Streams

Streams allow processing data piece by piece without loading everything into memory.

## Stream Types

1. **Readable**: Source of data (fs.createReadStream, http request)
2. **Writable**: Destination for data (fs.createWriteStream, http response)
3. **Duplex**: Both readable and writable (net.Socket)
4. **Transform**: Modify data as it passes through (zlib.createGzip)

## Reading Files with Streams

\`\`\`javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading');
});
\`\`\`

## Piping Streams

The \`pipe()\` method connects streams:

\`\`\`javascript
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('file.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('file.txt.gz'));
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Copy Large Files Efficiently',
        code: `const fs = require('fs');

function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  });
}

// Usage
copyFile('large-video.mp4', 'backup.mp4')
  .then(() => console.log('Copy complete'))
  .catch(err => console.error('Copy failed:', err));`,
        explanation: 'Using streams to copy files without loading entire file into memory.'
      },
      {
        title: 'Transform Stream',
        code: `const { Transform } = require('stream');

// Create a transform stream that uppercases text
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperCased = chunk.toString().toUpperCase();
    callback(null, upperCased);
  }
});

// Usage with pipeline
const { pipeline } = require('stream');
const fs = require('fs');

pipeline(
  fs.createReadStream('input.txt'),
  upperCaseTransform,
  fs.createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);`,
        explanation: 'Creating a custom transform stream to process data.'
      }
    ],
    challenge: {
      starterCode: `const { Transform } = require('stream');

// Create a transform stream that counts lines
class LineCounter extends Transform {
  constructor() {
    super();
    this.lineCount = 0;
  }

  _transform(chunk, encoding, callback) {
    // Count newlines in the chunk
    // Pass the chunk through unchanged
    // Your code here
  }

  _flush(callback) {
    // Called when stream ends
    // Push the final count
    // Your code here
  }
}

module.exports = { LineCounter };`,
      solution: `const { Transform } = require('stream');

class LineCounter extends Transform {
  constructor() {
    super();
    this.lineCount = 0;
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString();
    this.lineCount += (str.match(/\\n/g) || []).length;
    callback(null, chunk);
  }

  _flush(callback) {
    this.push('\\nTotal lines: ' + this.lineCount);
    callback();
  }
}

module.exports = { LineCounter };`,
      tests: [
        { input: 'new LineCounter() instanceof Transform', expected: 'true', description: 'Should extend Transform' },
        { input: 'typeof new LineCounter()._transform', expected: 'function', description: 'Should have _transform method' }
      ],
      hints: ['Use regex /\\n/g to match newlines', '_flush is called when the stream ends']
    }
  },
  {
    id: 'node-7',
    slug: 'buffers',
    title: 'Buffers',
    description: 'Work with binary data using Node.js Buffers.',
    order: 7,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Buffers

Buffers are used to handle binary data in Node.js. They represent fixed-length sequences of bytes.

## Creating Buffers

\`\`\`javascript
// From string
const buf1 = Buffer.from('Hello World');

// Allocate empty buffer
const buf2 = Buffer.alloc(10); // 10 bytes, filled with zeros

// From array of bytes
const buf3 = Buffer.from([72, 101, 108, 108, 111]); // "Hello"
\`\`\`

## Buffer Operations

\`\`\`javascript
const buf = Buffer.from('Hello');

buf.length;           // 5
buf.toString();       // 'Hello'
buf.toString('hex');  // '48656c6c6f'
buf.toString('base64'); // 'SGVsbG8='

buf[0];              // 72 (ASCII for 'H')
buf.slice(0, 2);     // Buffer containing 'He'
\`\`\`

## Encodings

Buffers support multiple encodings:
- \`utf8\` (default)
- \`ascii\`
- \`base64\`
- \`hex\`
- \`binary\`
    `,
    codeExamples: [
      {
        title: 'Buffer Manipulation',
        code: `// Create and manipulate buffers
const buf = Buffer.alloc(10);

// Write to buffer
buf.write('Hello');
console.log(buf); // <Buffer 48 65 6c 6c 6f 00 00 00 00 00>

// Write at specific position
buf.write('World', 5);
console.log(buf.toString()); // 'HelloWorld'

// Copy buffers
const buf2 = Buffer.alloc(5);
buf.copy(buf2, 0, 0, 5);
console.log(buf2.toString()); // 'Hello'

// Concatenate buffers
const combined = Buffer.concat([buf, buf2]);
console.log(combined.toString()); // 'HelloWorldHello'`,
        explanation: 'Common buffer operations: writing, copying, and concatenating.'
      },
      {
        title: 'Base64 Encoding/Decoding',
        code: `// Encode string to base64
function toBase64(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

// Decode base64 to string
function fromBase64(base64) {
  return Buffer.from(base64, 'base64').toString('utf8');
}

const original = 'Hello, World!';
const encoded = toBase64(original);
const decoded = fromBase64(encoded);

console.log('Original:', original);
console.log('Encoded:', encoded);   // 'SGVsbG8sIFdvcmxkIQ=='
console.log('Decoded:', decoded);   // 'Hello, World!'`,
        explanation: 'Using buffers for base64 encoding and decoding.'
      }
    ],
    challenge: {
      starterCode: `// Create functions to encode and decode hex strings

function stringToHex(str) {
  // Convert string to hexadecimal representation
  // Your code here
}

function hexToString(hex) {
  // Convert hexadecimal back to string
  // Your code here
}

module.exports = { stringToHex, hexToString };`,
      solution: `function stringToHex(str) {
  return Buffer.from(str, 'utf8').toString('hex');
}

function hexToString(hex) {
  return Buffer.from(hex, 'hex').toString('utf8');
}

module.exports = { stringToHex, hexToString };`,
      tests: [
        { input: 'stringToHex("Hello")', expected: '48656c6c6f', description: 'Should convert to hex' },
        { input: 'hexToString("48656c6c6f")', expected: 'Hello', description: 'Should convert from hex' }
      ],
      hints: ['Buffer.from() accepts an encoding parameter', 'toString() can output different encodings']
    }
  },
  {
    id: 'node-8',
    slug: 'process-environment',
    title: 'Process and Environment',
    description: 'Master the process object and environment variable management.',
    order: 8,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Process and Environment

The \`process\` object provides information about and control over the current Node.js process.

## Environment Variables

\`\`\`javascript
// Access environment variables
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

// Set environment variables (for current process only)
process.env.MY_VAR = 'value';
\`\`\`

## Process Information

\`\`\`javascript
process.pid;        // Process ID
process.ppid;       // Parent process ID
process.argv;       // Command line arguments
process.cwd();      // Current working directory
process.memoryUsage(); // Memory statistics
process.uptime();   // Process uptime in seconds
\`\`\`

## Process Events

\`\`\`javascript
process.on('exit', (code) => {
  console.log('Exiting with code:', code);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught:', err);
  process.exit(1);
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Command Line Arguments',
        code: `// node app.js --name=John --age=30

function parseArgs(args) {
  const parsed = {};

  args.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      parsed[key] = value || true;
    }
  });

  return parsed;
}

const options = parseArgs(process.argv);
console.log(options); // { name: 'John', age: '30' }`,
        explanation: 'Parsing command line arguments from process.argv.'
      },
      {
        title: 'Graceful Shutdown',
        code: `const server = require('http').createServer();

// Handle shutdown signals
function shutdown(signal) {
  console.log(\`Received \${signal}. Shutting down gracefully...\`);

  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen(3000, () => {
  console.log('Server running. PID:', process.pid);
});`,
        explanation: 'Implementing graceful shutdown for production applications.'
      }
    ],
    challenge: {
      starterCode: `// Create a configuration loader that reads from environment variables

function loadConfig() {
  // Return an object with:
  // - port: from PORT env var, default 3000 (as number)
  // - host: from HOST env var, default 'localhost'
  // - debug: from DEBUG env var, true if 'true', default false
  // - nodeEnv: from NODE_ENV, default 'development'
  // Your code here
}

module.exports = { loadConfig };`,
      solution: `function loadConfig() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    debug: process.env.DEBUG === 'true',
    nodeEnv: process.env.NODE_ENV || 'development'
  };
}

module.exports = { loadConfig };`,
      tests: [
        { input: 'loadConfig().port', expected: '3000', description: 'Should default port to 3000' },
        { input: 'loadConfig().host', expected: 'localhost', description: 'Should default host to localhost' },
        { input: 'loadConfig().debug', expected: 'false', description: 'Should default debug to false' }
      ],
      hints: ['Use || for default values', 'parseInt converts string to number', 'Compare with === for boolean conversion']
    }
  },
  {
    id: 'node-9',
    slug: 'child-processes',
    title: 'Child Processes',
    description: 'Learn to spawn and manage child processes for parallel execution.',
    order: 9,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Child Processes

Node.js can spawn child processes to run system commands or other scripts in parallel.

## Methods

1. **exec**: Run a command in a shell, buffer output
2. **execFile**: Run an executable directly
3. **spawn**: Stream-based, for large outputs
4. **fork**: Special case for Node.js processes

## exec vs spawn

\`\`\`javascript
const { exec, spawn } = require('child_process');

// exec - buffers output (good for small output)
exec('ls -la', (err, stdout, stderr) => {
  console.log(stdout);
});

// spawn - streams output (good for large output)
const ls = spawn('ls', ['-la']);
ls.stdout.on('data', (data) => {
  console.log(data.toString());
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Using exec with Promises',
        code: `const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function runCommand(cmd) {
  try {
    const { stdout, stderr } = await execPromise(cmd);
    if (stderr) console.error('stderr:', stderr);
    return stdout.trim();
  } catch (error) {
    console.error('Command failed:', error.message);
    throw error;
  }
}

// Usage
async function getGitInfo() {
  const branch = await runCommand('git branch --show-current');
  const commit = await runCommand('git rev-parse --short HEAD');
  return { branch, commit };
}

getGitInfo().then(console.log);`,
        explanation: 'Using promisified exec for cleaner async command execution.'
      },
      {
        title: 'Spawn for Long-Running Processes',
        code: `const { spawn } = require('child_process');

function runNpmInstall(cwd) {
  return new Promise((resolve, reject) => {
    const npm = spawn('npm', ['install'], { cwd });

    npm.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    npm.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    npm.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(\`npm install exited with code \${code}\`));
      }
    });

    npm.on('error', reject);
  });
}

runNpmInstall('./my-project')
  .then(() => console.log('Installation complete'))
  .catch(err => console.error('Failed:', err));`,
        explanation: 'Using spawn for long-running commands with streaming output.'
      }
    ],
    challenge: {
      starterCode: `const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Create a function that runs multiple commands in parallel
async function runParallel(commands) {
  // Run all commands in parallel
  // Return array of results (stdout strings)
  // Your code here
}

module.exports = { runParallel };`,
      solution: `const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function runParallel(commands) {
  const promises = commands.map(cmd => execPromise(cmd));
  const results = await Promise.all(promises);
  return results.map(r => r.stdout.trim());
}

module.exports = { runParallel };`,
      tests: [
        { input: 'typeof runParallel', expected: 'function', description: 'Should be a function' },
        { input: 'runParallel.constructor.name', expected: 'AsyncFunction', description: 'Should be async' }
      ],
      hints: ['Use Promise.all() to run commands in parallel', 'Map commands to exec promises']
    }
  },
  {
    id: 'node-10',
    slug: 'package-management',
    title: 'Package Management',
    description: 'Master npm, package.json, and dependency management.',
    order: 10,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Package Management

npm (Node Package Manager) is the default package manager for Node.js.

## package.json

The \`package.json\` file defines your project and its dependencies:

\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
\`\`\`

## Common Commands

\`\`\`bash
npm init              # Create package.json
npm install           # Install all dependencies
npm install express   # Add dependency
npm install -D jest   # Add dev dependency
npm update            # Update packages
npm outdated          # Check for outdated packages
npm run <script>      # Run a script
\`\`\`

## Version Ranges

- \`^1.2.3\` - Compatible with 1.x.x (minor updates)
- \`~1.2.3\` - Compatible with 1.2.x (patch updates)
- \`1.2.3\` - Exact version
    `,
    codeExamples: [
      {
        title: 'Reading Package Info Programmatically',
        code: `const fs = require('fs');
const path = require('path');

function getPackageInfo(projectPath = '.') {
  const packagePath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  return {
    name: packageJson.name,
    version: packageJson.version,
    dependencies: Object.keys(packageJson.dependencies || {}),
    devDependencies: Object.keys(packageJson.devDependencies || {}),
    scripts: Object.keys(packageJson.scripts || {})
  };
}

console.log(getPackageInfo());`,
        explanation: 'Reading and parsing package.json for project information.'
      },
      {
        title: 'Custom npm Scripts',
        code: `// package.json scripts section:
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "pretest": "npm run lint",
    "postinstall": "npm run build"
  }
}

// Pre and post hooks run automatically:
// npm test runs: pretest -> test
// npm install runs: install -> postinstall`,
        explanation: 'Defining and chaining npm scripts with hooks.'
      }
    ],
    challenge: {
      starterCode: `const fs = require('fs');

// Create a function that analyzes a package.json file
function analyzePackage(packageJson) {
  // Input is a parsed package.json object
  // Return an object with:
  // - name: package name
  // - totalDeps: total number of dependencies + devDependencies
  // - hasTests: boolean, true if there's a "test" script
  // - isModule: boolean, true if type is "module"
  // Your code here
}

module.exports = { analyzePackage };`,
      solution: `function analyzePackage(packageJson) {
  const deps = Object.keys(packageJson.dependencies || {}).length;
  const devDeps = Object.keys(packageJson.devDependencies || {}).length;

  return {
    name: packageJson.name,
    totalDeps: deps + devDeps,
    hasTests: !!(packageJson.scripts && packageJson.scripts.test),
    isModule: packageJson.type === 'module'
  };
}

module.exports = { analyzePackage };`,
      tests: [
        { input: 'analyzePackage({name: "test", dependencies: {a: "1"}}).totalDeps', expected: '1', description: 'Should count dependencies' },
        { input: 'analyzePackage({name: "test", scripts: {test: "jest"}}).hasTests', expected: 'true', description: 'Should detect test script' }
      ],
      hints: ['Use Object.keys().length to count properties', 'Check if scripts.test exists for hasTests']
    }
  }
];

// Express.js (10 lessons)
export const expressLessons: Lesson[] = [
  {
    id: 'node-11',
    slug: 'express-basics',
    title: 'Express Basics',
    description: 'Learn the fundamentals of Express.js web framework.',
    order: 11,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Express Basics

Express is a minimal and flexible Node.js web framework that provides robust features for web applications.

## Creating an Express App

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## Request and Response Objects

- **req**: Contains request data (params, query, body, headers)
- **res**: Methods to send responses (send, json, status, redirect)
    `,
    codeExamples: [
      {
        title: 'Basic Express Server',
        code: `const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ name, email, id: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server on port \${PORT}\`));`,
        explanation: 'A basic Express server with GET and POST routes.'
      }
    ],
    challenge: {
      starterCode: `const express = require('express');
const app = express();

// Create a route handler for GET /health
// It should return { status: 'ok', timestamp: <current ISO timestamp> }
// Your code here

module.exports = app;`,
      solution: `const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;`,
      tests: [
        { input: 'typeof app.get', expected: 'function', description: 'Should have get method' }
      ],
      hints: ['Use app.get() to define a GET route', 'res.json() sends JSON response']
    }
  },
  {
    id: 'node-12',
    slug: 'express-middleware',
    title: 'Express Middleware',
    description: 'Master middleware patterns for request processing.',
    order: 12,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Express Middleware

Middleware functions have access to the request, response, and the next middleware function.

## Middleware Flow

\`\`\`javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass to next middleware
});
\`\`\`

## Types of Middleware

1. **Application-level**: app.use(), app.METHOD()
2. **Router-level**: router.use()
3. **Error-handling**: (err, req, res, next)
4. **Built-in**: express.json(), express.static()
5. **Third-party**: cors, helmet, morgan
    `,
    codeExamples: [
      {
        title: 'Custom Middleware Stack',
        code: `const express = require('express');
const app = express();

// Logger middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  req.user = { id: 1 }; // Attach user to request
  next();
};

// Apply globally
app.use(logger);

// Apply to specific routes
app.get('/protected', auth, (req, res) => {
  res.json({ user: req.user });
});`,
        explanation: 'Creating and applying custom middleware.'
      }
    ],
    challenge: {
      starterCode: `const express = require('express');

// Create a middleware that adds a request ID
function requestId(req, res, next) {
  // Add a unique ID to req.id
  // Format: 'req-' + timestamp + '-' + random number
  // Your code here
}

module.exports = { requestId };`,
      solution: `function requestId(req, res, next) {
  req.id = 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  next();
}

module.exports = { requestId };`,
      tests: [
        { input: 'typeof requestId', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Call next() to pass control', 'Attach properties to req object']
    }
  },
  {
    id: 'node-13',
    slug: 'express-routing',
    title: 'Express Routing',
    description: 'Organize routes with Express Router and route parameters.',
    order: 13,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Express Routing

Express Router allows you to organize routes into modular, mountable route handlers.

## Route Parameters

\`\`\`javascript
// Single parameter
app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});

// Multiple parameters
app.get('/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
});

// Query strings
// GET /search?q=hello&page=1
app.get('/search', (req, res) => {
  const { q, page } = req.query;
});
\`\`\`

## Router Module

\`\`\`javascript
// routes/users.js
const router = express.Router();
router.get('/', getUsers);
router.post('/', createUser);
module.exports = router;

// app.js
app.use('/api/users', require('./routes/users'));
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Modular Router Setup',
        code: `// routes/products.js
const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Widget', price: 25 },
  { id: 2, name: 'Gadget', price: 50 }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

module.exports = router;

// app.js
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);`,
        explanation: 'Creating a modular router for products API.'
      }
    ],
    challenge: {
      starterCode: `const express = require('express');
const router = express.Router();

// Create CRUD routes for a "books" resource
// GET / - list all books
// GET /:id - get book by id
// POST / - create book
// PUT /:id - update book
// DELETE /:id - delete book

const books = [];

// Your code here

module.exports = router;`,
      solution: `const express = require('express');
const router = express.Router();

const books = [];

router.get('/', (req, res) => res.json(books));

router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});

router.post('/', (req, res) => {
  const book = { id: Date.now().toString(), ...req.body };
  books.push(book);
  res.status(201).json(book);
});

router.put('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;`,
      tests: [
        { input: 'typeof router.get', expected: 'function', description: 'Should export router' }
      ],
      hints: ['Use router.get, router.post, etc.', 'Return 404 when resource not found']
    }
  },
  {
    id: 'node-14',
    slug: 'request-handling',
    title: 'Request Handling',
    description: 'Handle request bodies, file uploads, and form data.',
    order: 14,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Request Handling

Express provides various ways to parse and handle incoming request data.

## Body Parsing

\`\`\`javascript
// JSON body parser
app.use(express.json());

// URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Access body
app.post('/api/data', (req, res) => {
  console.log(req.body);
});
\`\`\`

## Request Properties

- \`req.body\` - Parsed request body
- \`req.params\` - Route parameters
- \`req.query\` - Query string parameters
- \`req.headers\` - Request headers
- \`req.cookies\` - Cookies (with cookie-parser)
    `,
    codeExamples: [
      {
        title: 'Handling Different Content Types',
        code: `const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/submit', (req, res) => {
  const contentType = req.get('Content-Type');

  console.log('Content-Type:', contentType);
  console.log('Body:', req.body);

  res.json({
    received: req.body,
    contentType
  });
});`,
        explanation: 'Handling JSON and form data submissions.'
      }
    ],
    challenge: {
      starterCode: `// Create a function to validate request body
function validateBody(requiredFields) {
  return (req, res, next) => {
    // Check if all required fields exist in req.body
    // If missing, return 400 with { error: 'Missing fields', missing: [...] }
    // If all present, call next()
    // Your code here
  };
}

module.exports = { validateBody };`,
      solution: `function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !(field in req.body));
    if (missing.length > 0) {
      return res.status(400).json({ error: 'Missing fields', missing });
    }
    next();
  };
}

module.exports = { validateBody };`,
      tests: [
        { input: 'typeof validateBody', expected: 'function', description: 'Should be a function' },
        { input: 'typeof validateBody([])', expected: 'function', description: 'Should return middleware' }
      ],
      hints: ['Return a middleware function', 'Use filter to find missing fields']
    }
  },
  {
    id: 'node-15',
    slug: 'response-methods',
    title: 'Response Methods',
    description: 'Master Express response methods for various output types.',
    order: 15,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Response Methods

Express provides many methods on the response object for sending data back to clients.

## Common Response Methods

\`\`\`javascript
res.send('Hello');           // Send string/buffer/object
res.json({ data: 'value' }); // Send JSON
res.status(404);             // Set status code
res.redirect('/other');      // Redirect
res.sendFile('/path/file');  // Send file
res.download('/path/file');  // Download file
res.render('view', data);    // Render template
\`\`\`

## Chaining Methods

\`\`\`javascript
res.status(201).json({ created: true });
res.status(404).send('Not Found');
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Various Response Types',
        code: `const express = require('express');
const app = express();
const path = require('path');

app.get('/text', (req, res) => {
  res.type('text/plain').send('Plain text response');
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1>');
});

app.get('/json', (req, res) => {
  res.json({ message: 'JSON response', timestamp: Date.now() });
});

app.get('/download', (req, res) => {
  res.download(path.join(__dirname, 'file.pdf'), 'report.pdf');
});

app.get('/redirect', (req, res) => {
  res.redirect(301, '/new-location');
});`,
        explanation: 'Different response methods for various content types.'
      }
    ],
    challenge: {
      starterCode: `// Create a response helper middleware
function apiResponse(req, res, next) {
  // Add helper methods to res:
  // res.success(data) - sends { success: true, data } with 200
  // res.created(data) - sends { success: true, data } with 201
  // res.error(message, code=400) - sends { success: false, error: message }
  // Your code here

  next();
}

module.exports = { apiResponse };`,
      solution: `function apiResponse(req, res, next) {
  res.success = (data) => {
    res.status(200).json({ success: true, data });
  };

  res.created = (data) => {
    res.status(201).json({ success: true, data });
  };

  res.error = (message, code = 400) => {
    res.status(code).json({ success: false, error: message });
  };

  next();
}

module.exports = { apiResponse };`,
      tests: [
        { input: 'typeof apiResponse', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Attach methods to res object', 'Remember to call next()']
    }
  },
  {
    id: 'node-16',
    slug: 'static-files-templates',
    title: 'Static Files and Templates',
    description: 'Serve static files and render dynamic HTML templates.',
    order: 16,
    category: 'nodejs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Static Files and Templates

Express can serve static files and render dynamic templates.

## Static Files

\`\`\`javascript
// Serve files from 'public' directory
app.use(express.static('public'));

// With virtual path prefix
app.use('/static', express.static('public'));

// Files accessible at:
// http://localhost:3000/css/style.css
// http://localhost:3000/static/images/logo.png
\`\`\`

## Template Engines

Popular template engines include EJS, Pug, and Handlebars.

\`\`\`javascript
// EJS setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: { name: 'John' } });
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'EJS Template Example',
        code: `// views/user.ejs
/*
<!DOCTYPE html>
<html>
<head><title><%= title %></title></head>
<body>
  <h1>Hello, <%= user.name %>!</h1>
  <% if (user.isAdmin) { %>
    <p>You have admin access.</p>
  <% } %>
  <ul>
  <% items.forEach(item => { %>
    <li><%= item %></li>
  <% }); %>
  </ul>
</body>
</html>
*/

// Route
app.get('/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.render('user', {
    title: 'Profile',
    user,
    items: ['Item 1', 'Item 2']
  });
});`,
        explanation: 'Rendering dynamic HTML with EJS templates.'
      }
    ],
    challenge: {
      starterCode: `const express = require('express');
const path = require('path');

function setupStatic(app, directory) {
  // Configure app to:
  // 1. Serve static files from the given directory
  // 2. Serve files from a 'public' subdirectory at '/assets'
  // Your code here
}

module.exports = { setupStatic };`,
      solution: `const express = require('express');
const path = require('path');

function setupStatic(app, directory) {
  app.use(express.static(directory));
  app.use('/assets', express.static(path.join(directory, 'public')));
}

module.exports = { setupStatic };`,
      tests: [
        { input: 'typeof setupStatic', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use express.static() middleware', 'Use path.join for cross-platform paths']
    }
  },
  {
    id: 'node-17',
    slug: 'express-error-handling',
    title: 'Error Handling in Express',
    description: 'Implement centralized error handling for robust APIs.',
    order: 17,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Error Handling in Express

Proper error handling is crucial for production applications.

## Error Middleware

Error-handling middleware has four parameters:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
\`\`\`

## Async Error Handling

\`\`\`javascript
// Wrap async routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}));
\`\`\`

## Custom Error Classes

Create custom errors for different scenarios.
    `,
    codeExamples: [
      {
        title: 'Centralized Error Handling',
        code: `// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
}));

// Error handler (must be last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});`,
        explanation: 'Complete error handling setup with custom errors.'
      }
    ],
    challenge: {
      starterCode: `// Create an async handler wrapper and error middleware

function asyncHandler(fn) {
  // Return a function that catches async errors
  // Your code here
}

function errorHandler(err, req, res, next) {
  // Handle errors with appropriate status codes
  // Return JSON with error message
  // Include stack trace only in development
  // Your code here
}

module.exports = { asyncHandler, errorHandler };`,
      solution: `function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.message || 'Internal Server Error'
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = { asyncHandler, errorHandler };`,
      tests: [
        { input: 'typeof asyncHandler', expected: 'function', description: 'asyncHandler should be a function' },
        { input: 'typeof errorHandler', expected: 'function', description: 'errorHandler should be a function' }
      ],
      hints: ['asyncHandler should return a middleware function', 'Use Promise.resolve().catch(next)']
    }
  },
  {
    id: 'node-18',
    slug: 'cors-security',
    title: 'CORS and Security',
    description: 'Implement security best practices with CORS, Helmet, and rate limiting.',
    order: 18,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# CORS and Security

Security is critical for production Express applications.

## CORS (Cross-Origin Resource Sharing)

\`\`\`javascript
const cors = require('cors');

// Allow all origins
app.use(cors());

// Configure specific origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
\`\`\`

## Helmet (Security Headers)

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

## Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});

app.use(limiter);
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Complete Security Setup',
        code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 login attempts per hour
  message: { error: 'Too many login attempts' }
});

app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);`,
        explanation: 'Comprehensive security middleware setup.'
      }
    ],
    challenge: {
      starterCode: `// Create a CORS configuration function
function createCorsConfig(options) {
  // options: { allowedOrigins: string[], allowCredentials: boolean }
  // Return a cors configuration object
  // Your code here
}

module.exports = { createCorsConfig };`,
      solution: `function createCorsConfig(options) {
  return {
    origin: (origin, callback) => {
      if (!origin || options.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: options.allowCredentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
}

module.exports = { createCorsConfig };`,
      tests: [
        { input: 'typeof createCorsConfig', expected: 'function', description: 'Should be a function' },
        { input: 'typeof createCorsConfig({ allowedOrigins: [], allowCredentials: true })', expected: 'object', description: 'Should return object' }
      ],
      hints: ['CORS origin can be a function for dynamic checking', 'Include standard HTTP methods']
    }
  },
  {
    id: 'node-19',
    slug: 'sessions-cookies',
    title: 'Sessions and Cookies',
    description: 'Manage user sessions and cookies in Express.',
    order: 19,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Sessions and Cookies

Sessions maintain state across HTTP requests.

## Cookie Parser

\`\`\`javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret-key'));

// Set cookie
res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });

// Read cookie
req.cookies.name;

// Signed cookies
res.cookie('user', 'john', { signed: true });
req.signedCookies.user;
\`\`\`

## Express Session

\`\`\`javascript
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Use session
req.session.userId = 123;
console.log(req.session.userId);
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Session-Based Authentication',
        code: `const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

// Redis client
const redisClient = createClient();
redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Login route
app.post('/login', async (req, res) => {
  const user = await authenticateUser(req.body);
  if (user) {
    req.session.userId = user.id;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});`,
        explanation: 'Session management with Redis store.'
      }
    ],
    challenge: {
      starterCode: `// Create session middleware configuration
function createSessionConfig(options) {
  // options: { secret, maxAge, secure }
  // Return express-session configuration object
  // Your code here
}

module.exports = { createSessionConfig };`,
      solution: `function createSessionConfig(options) {
  return {
    secret: options.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: options.secure,
      httpOnly: true,
      maxAge: options.maxAge
    }
  };
}

module.exports = { createSessionConfig };`,
      tests: [
        { input: 'typeof createSessionConfig', expected: 'function', description: 'Should be a function' },
        { input: 'createSessionConfig({ secret: "test", maxAge: 1000, secure: true }).resave', expected: 'false', description: 'resave should be false' }
      ],
      hints: ['Include resave and saveUninitialized options', 'Cookie should be httpOnly for security']
    }
  },
  {
    id: 'node-20',
    slug: 'authentication-jwt',
    title: 'Authentication with JWT',
    description: 'Implement token-based authentication using JSON Web Tokens.',
    order: 20,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Authentication with JWT

JSON Web Tokens (JWT) enable stateless authentication.

## JWT Structure

A JWT consists of three parts: Header, Payload, Signature

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Create token
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
\`\`\`

## Password Hashing

\`\`\`javascript
const bcrypt = require('bcrypt');

// Hash password
const hash = await bcrypt.hash(password, 10);

// Compare password
const isValid = await bcrypt.compare(password, hash);
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Complete JWT Authentication',
        code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Auth middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, email: user.email } });
});

// Protected route
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId });
});`,
        explanation: 'Complete JWT authentication flow with bcrypt.'
      }
    ],
    challenge: {
      starterCode: `const jwt = require('jsonwebtoken');

// Create JWT authentication middleware
function jwtAuth(secret) {
  return (req, res, next) => {
    // Extract Bearer token from Authorization header
    // Verify token and attach decoded payload to req.user
    // Return 401 if no token or invalid token
    // Your code here
  };
}

module.exports = { jwtAuth };`,
      solution: `const jwt = require('jsonwebtoken');

function jwtAuth(secret) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = { jwtAuth };`,
      tests: [
        { input: 'typeof jwtAuth', expected: 'function', description: 'Should be a function' },
        { input: 'typeof jwtAuth("secret")', expected: 'function', description: 'Should return middleware' }
      ],
      hints: ['Check for Bearer prefix in Authorization header', 'Use try/catch for jwt.verify']
    }
  }
];

// Database & APIs (10 lessons)
export const databaseLessons: Lesson[] = [
  {
    id: 'node-21',
    slug: 'postgresql-prisma',
    title: 'PostgreSQL with Prisma',
    description: 'Use Prisma ORM with PostgreSQL for type-safe database access.',
    order: 21,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    content: `
# PostgreSQL with Prisma

Prisma is a modern ORM that provides type-safe database access.

## Setup

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

## Schema Definition

\`\`\`prisma
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
\`\`\`

## Migrations

\`\`\`bash
npx prisma migrate dev --name init
npx prisma generate
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Prisma CRUD Operations',
        code: `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John',
    posts: {
      create: { title: 'First Post' }
    }
  },
  include: { posts: true }
});

// Read
const users = await prisma.user.findMany({
  where: { email: { contains: '@example.com' } },
  include: { posts: true }
});

// Update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'John Doe' }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });`,
        explanation: 'Basic CRUD operations with Prisma.'
      }
    ],
    challenge: {
      starterCode: `// Create a user service with Prisma
class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findById(id) {
    // Find user by ID, include posts
    // Your code here
  }

  async create(data) {
    // Create user with email and name
    // Your code here
  }
}

module.exports = { UserService };`,
      solution: `class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findById(id) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    });
  }

  async create(data) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name
      }
    });
  }
}

module.exports = { UserService };`,
      tests: [
        { input: 'typeof UserService', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['Use findUnique for single record', 'include option adds relations']
    }
  },
  {
    id: 'node-22',
    slug: 'mongodb-mongoose',
    title: 'MongoDB with Mongoose',
    description: 'Work with MongoDB using Mongoose ODM.',
    order: 22,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# MongoDB with Mongoose

Mongoose provides schema-based modeling for MongoDB.

## Connection

\`\`\`javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
\`\`\`

## Schema and Model

\`\`\`javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Mongoose Schema with Validation',
        code: `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'food'],
    required: true
  },
  inStock: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

// Virtual property
productSchema.virtual('priceWithTax').get(function() {
  return this.price * 1.1;
});

// Instance method
productSchema.methods.applyDiscount = function(percent) {
  this.price = this.price * (1 - percent / 100);
  return this.save();
};

// Static method
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, inStock: true });
};

const Product = mongoose.model('Product', productSchema);`,
        explanation: 'Advanced Mongoose schema with validation and methods.'
      }
    ],
    challenge: {
      starterCode: `const mongoose = require('mongoose');

// Create a Task schema with:
// - title (required string)
// - completed (boolean, default false)
// - dueDate (Date)
// - priority (enum: low, medium, high)

const taskSchema = new mongoose.Schema({
  // Your code here
});

const Task = mongoose.model('Task', taskSchema);
module.exports = { Task, taskSchema };`,
      solution: `const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = { Task, taskSchema };`,
      tests: [
        { input: 'taskSchema.path("title").isRequired', expected: 'true', description: 'title should be required' }
      ],
      hints: ['Use enum for restricted values', 'default sets initial value']
    }
  },
  {
    id: 'node-23',
    slug: 'redis-caching',
    title: 'Redis for Caching',
    description: 'Implement caching strategies with Redis.',
    order: 23,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Redis for Caching

Redis is an in-memory data store perfect for caching and session storage.

## Basic Operations

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

await client.connect();

// String operations
await client.set('key', 'value');
await client.get('key');
await client.setEx('key', 3600, 'value'); // expires in 1 hour

// Hash operations
await client.hSet('user:1', { name: 'John', email: 'john@example.com' });
await client.hGetAll('user:1');
\`\`\`

## Caching Pattern

\`\`\`javascript
async function getCached(key, fetchFn, ttl = 3600) {
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFn();
  await client.setEx(key, ttl, JSON.stringify(data));
  return data;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Cache-Aside Pattern',
        code: `const redis = require('redis');

class CacheService {
  constructor(redisUrl) {
    this.client = redis.createClient({ url: redisUrl });
    this.client.connect();
  }

  async get(key) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key, value, ttlSeconds = 3600) {
    await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
  }

  async delete(key) {
    await this.client.del(key);
  }

  async getOrSet(key, fetchFn, ttlSeconds = 3600) {
    let data = await this.get(key);
    if (data) return data;

    data = await fetchFn();
    await this.set(key, data, ttlSeconds);
    return data;
  }
}

// Usage
const cache = new CacheService('redis://localhost:6379');

app.get('/products/:id', async (req, res) => {
  const product = await cache.getOrSet(
    \`product:\${req.params.id}\`,
    () => db.products.findById(req.params.id),
    300 // 5 minutes
  );
  res.json(product);
});`,
        explanation: 'Implementing cache-aside pattern with Redis.'
      }
    ],
    challenge: {
      starterCode: `// Create a rate limiter using Redis
class RateLimiter {
  constructor(redisClient, options) {
    this.client = redisClient;
    this.windowMs = options.windowMs || 60000;
    this.maxRequests = options.maxRequests || 10;
  }

  async isAllowed(key) {
    // Check if request is allowed
    // Return { allowed: boolean, remaining: number }
    // Your code here
  }
}

module.exports = { RateLimiter };`,
      solution: `class RateLimiter {
  constructor(redisClient, options) {
    this.client = redisClient;
    this.windowMs = options.windowMs || 60000;
    this.maxRequests = options.maxRequests || 10;
  }

  async isAllowed(key) {
    const current = await this.client.incr(key);

    if (current === 1) {
      await this.client.pExpire(key, this.windowMs);
    }

    const remaining = Math.max(0, this.maxRequests - current);
    return {
      allowed: current <= this.maxRequests,
      remaining
    };
  }
}

module.exports = { RateLimiter };`,
      tests: [
        { input: 'typeof RateLimiter', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['Use INCR to atomically increment', 'PEXPIRE sets expiration in milliseconds']
    }
  },
  {
    id: 'node-24',
    slug: 'restful-api-design',
    title: 'RESTful API Design',
    description: 'Design clean, consistent REST APIs following best practices.',
    order: 24,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# RESTful API Design

REST (Representational State Transfer) is an architectural style for APIs.

## HTTP Methods

| Method | Action | Example |
|--------|--------|---------|
| GET | Retrieve | GET /users |
| POST | Create | POST /users |
| PUT | Replace | PUT /users/1 |
| PATCH | Update | PATCH /users/1 |
| DELETE | Remove | DELETE /users/1 |

## Status Codes

- **2xx**: Success (200 OK, 201 Created, 204 No Content)
- **4xx**: Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx**: Server Error (500 Internal Server Error)

## URL Design

\`\`\`
GET    /api/users           # List users
GET    /api/users/123       # Get user 123
POST   /api/users           # Create user
PATCH  /api/users/123       # Update user 123
DELETE /api/users/123       # Delete user 123
GET    /api/users/123/posts # Get user's posts
\`\`\`
    `,
    codeExamples: [
      {
        title: 'RESTful Resource Controller',
        code: `const express = require('express');
const router = express.Router();

// GET /api/posts - List with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find().sort(sort).skip(skip).limit(limit),
    Post.countDocuments()
  ]);

  res.json({
    data: posts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ data: post });
});

// POST /api/posts
router.post('/', async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ data: post });
});

// PATCH /api/posts/:id
router.patch('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ data: post });
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.status(204).send();
});`,
        explanation: 'Complete RESTful controller with pagination.'
      }
    ],
    challenge: {
      starterCode: `// Create a pagination helper
function paginate(query) {
  // query: { page, limit, sort }
  // Return: { skip, limit, sort } for database query
  // Default: page=1, limit=10, sort='-createdAt'
  // Your code here
}

module.exports = { paginate };`,
      solution: `function paginate(query) {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const sort = query.sort || '-createdAt';

  return {
    skip: (page - 1) * limit,
    limit,
    sort
  };
}

module.exports = { paginate };`,
      tests: [
        { input: 'paginate({}).skip', expected: '0', description: 'Default skip should be 0' },
        { input: 'paginate({}).limit', expected: '10', description: 'Default limit should be 10' },
        { input: 'paginate({ page: 2, limit: 5 }).skip', expected: '5', description: 'Page 2 should skip 5' }
      ],
      hints: ['Calculate skip as (page - 1) * limit', 'Use parseInt for string to number']
    }
  },
  {
    id: 'node-25',
    slug: 'api-versioning',
    title: 'API Versioning',
    description: 'Implement versioning strategies for API evolution.',
    order: 25,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `
# API Versioning

Versioning allows APIs to evolve without breaking existing clients.

## Versioning Strategies

### URL Path Versioning
\`\`\`javascript
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
\`\`\`

### Header Versioning
\`\`\`javascript
app.use('/api', (req, res, next) => {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
});
\`\`\`

### Query Parameter
\`\`\`
GET /api/users?version=2
\`\`\`
    `,
    codeExamples: [
      {
        title: 'URL-Based Versioning',
        code: `const express = require('express');
const app = express();

// Version 1 routes
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  res.json({ users: [{ name: 'John' }] });
});

// Version 2 routes (enhanced response)
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  res.json({
    data: [{ id: 1, name: 'John', email: 'john@example.com' }],
    meta: { total: 1, version: '2.0' }
  });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Redirect latest to current version
app.use('/api/latest', (req, res, next) => {
  req.url = req.url.replace('/api/latest', '/api/v2');
  next();
});`,
        explanation: 'URL path versioning with version aliases.'
      }
    ],
    challenge: {
      starterCode: `// Create version middleware
function versionMiddleware(req, res, next) {
  // Extract version from:
  // 1. Header: 'api-version'
  // 2. Query param: 'v'
  // 3. Default to '1'
  // Set req.apiVersion
  // Your code here
}

module.exports = { versionMiddleware };`,
      solution: `function versionMiddleware(req, res, next) {
  const version = req.headers['api-version']
    || req.query.v
    || '1';

  req.apiVersion = version;
  next();
}

module.exports = { versionMiddleware };`,
      tests: [
        { input: 'typeof versionMiddleware', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Check header first, then query', 'Use || for fallback values']
    }
  },
  {
    id: 'node-26',
    slug: 'api-documentation',
    title: 'API Documentation',
    description: 'Generate API documentation with OpenAPI/Swagger.',
    order: 26,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# API Documentation

OpenAPI (Swagger) provides a standard way to document REST APIs.

## Setup

\`\`\`javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

## JSDoc Comments

\`\`\`javascript
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Documented API Endpoint',
        code: `/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 */
router.post('/users', validateUser, async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});`,
        explanation: 'OpenAPI documentation with request/response schemas.'
      }
    ],
    challenge: {
      starterCode: `// Create a function that generates OpenAPI spec
function createOpenApiSpec(info) {
  // info: { title, version, description }
  // Return OpenAPI 3.0 base specification object
  // Your code here
}

module.exports = { createOpenApiSpec };`,
      solution: `function createOpenApiSpec(info) {
  return {
    openapi: '3.0.0',
    info: {
      title: info.title,
      version: info.version,
      description: info.description
    },
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  };
}

module.exports = { createOpenApiSpec };`,
      tests: [
        { input: 'createOpenApiSpec({title:"Test",version:"1.0"}).openapi', expected: '3.0.0', description: 'Should be OpenAPI 3.0' }
      ],
      hints: ['Include openapi, info, paths, components', 'Add security schemes for auth']
    }
  },
  {
    id: 'node-27',
    slug: 'input-validation',
    title: 'Input Validation',
    description: 'Validate request data with Joi, Zod, and express-validator.',
    order: 27,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Input Validation

Always validate user input to prevent security issues and data corruption.

## Zod Validation

\`\`\`javascript
const { z } = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18).optional()
});

// Validate
const result = userSchema.safeParse(data);
if (!result.success) {
  console.log(result.error.issues);
}
\`\`\`

## Express-Validator

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/users',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Zod Validation Middleware',
        code: `const { z } = require('zod');

// Schema definitions
const schemas = {
  createUser: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2).max(50)
  }),

  updateUser: z.object({
    email: z.string().email().optional(),
    name: z.string().min(2).max(50).optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field required'
  })
};

// Validation middleware factory
const validate = (schemaName) => (req, res, next) => {
  const schema = schemas[schemaName];
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues.map(i => ({
        field: i.path.join('.'),
        message: i.message
      }))
    });
  }

  req.validatedBody = result.data;
  next();
};

// Usage
app.post('/users', validate('createUser'), createUser);`,
        explanation: 'Zod-based validation middleware pattern.'
      }
    ],
    challenge: {
      starterCode: `const { z } = require('zod');

// Create a product validation schema
const productSchema = z.object({
  // name: required string, 2-100 chars
  // price: required positive number
  // category: one of 'electronics', 'clothing', 'food'
  // tags: optional array of strings
  // Your code here
});

function validateProduct(data) {
  return productSchema.safeParse(data);
}

module.exports = { productSchema, validateProduct };`,
      solution: `const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'food']),
  tags: z.array(z.string()).optional()
});

function validateProduct(data) {
  return productSchema.safeParse(data);
}

module.exports = { productSchema, validateProduct };`,
      tests: [
        { input: 'validateProduct({ name: "Test", price: 10, category: "food" }).success', expected: 'true', description: 'Valid data should pass' },
        { input: 'validateProduct({ name: "T", price: 10, category: "food" }).success', expected: 'false', description: 'Short name should fail' }
      ],
      hints: ['Use z.enum for restricted values', 'z.number().positive() for positive numbers']
    }
  },
  {
    id: 'node-28',
    slug: 'file-uploads',
    title: 'File Uploads',
    description: 'Handle file uploads with Multer and cloud storage.',
    order: 28,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# File Uploads

Multer is the standard middleware for handling multipart/form-data.

## Basic Setup

\`\`\`javascript
const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ filename: req.file.filename });
});
\`\`\`

## File Filtering

\`\`\`javascript
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images allowed'), false);
  }
};
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Advanced Multer Configuration',
        code: `const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, \`\${Date.now()}-\${uniqueSuffix}\${ext}\`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5
  }
});

// Single file
app.post('/avatar', upload.single('avatar'), handler);

// Multiple files
app.post('/gallery', upload.array('photos', 5), handler);

// Multiple fields
app.post('/product', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]), handler);`,
        explanation: 'Complete Multer setup with storage and filtering.'
      }
    ],
    challenge: {
      starterCode: `const multer = require('multer');

// Create an upload middleware that:
// - Only accepts images (jpeg, png, gif)
// - Limits file size to 2MB
// - Stores in 'uploads' directory
// Your code here

module.exports = { upload };`,
      solution: `const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({
  dest: 'uploads/',
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

module.exports = { upload };`,
      tests: [
        { input: 'typeof upload.single', expected: 'function', description: 'Should have single method' }
      ],
      hints: ['Check file.mimetype in fileFilter', 'fileSize is in bytes']
    }
  },
  {
    id: 'node-29',
    slug: 'websockets',
    title: 'WebSockets with Socket.io',
    description: 'Build real-time features with WebSocket connections.',
    order: 29,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# WebSockets with Socket.io

WebSockets enable real-time, bidirectional communication.

## Server Setup

\`\`\`javascript
const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data); // Broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
\`\`\`

## Rooms and Namespaces

\`\`\`javascript
// Join a room
socket.join('room-1');

// Send to room
io.to('room-1').emit('event', data);

// Namespaces
const chat = io.of('/chat');
chat.on('connection', (socket) => { ... });
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Real-Time Chat Server',
        code: `const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const users = new Map();

io.on('connection', (socket) => {
  socket.on('join', ({ username, room }) => {
    users.set(socket.id, { username, room });
    socket.join(room);

    socket.to(room).emit('userJoined', { username });
    io.to(room).emit('users', getUsersInRoom(room));
  });

  socket.on('chatMessage', (message) => {
    const user = users.get(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        username: user.username,
        text: message,
        time: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.to(user.room).emit('userLeft', { username: user.username });
    }
  });
});

function getUsersInRoom(room) {
  return Array.from(users.values())
    .filter(u => u.room === room)
    .map(u => u.username);
}

httpServer.listen(3000);`,
        explanation: 'Complete chat server with rooms and user tracking.'
      }
    ],
    challenge: {
      starterCode: `// Create a broadcast helper class
class Broadcaster {
  constructor(io) {
    this.io = io;
  }

  toAll(event, data) {
    // Emit to all connected clients
  }

  toRoom(room, event, data) {
    // Emit to specific room
  }

  toUser(socketId, event, data) {
    // Emit to specific user
  }
}

module.exports = { Broadcaster };`,
      solution: `class Broadcaster {
  constructor(io) {
    this.io = io;
  }

  toAll(event, data) {
    this.io.emit(event, data);
  }

  toRoom(room, event, data) {
    this.io.to(room).emit(event, data);
  }

  toUser(socketId, event, data) {
    this.io.to(socketId).emit(event, data);
  }
}

module.exports = { Broadcaster };`,
      tests: [
        { input: 'typeof Broadcaster', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['io.emit() broadcasts to all', 'io.to() targets room or socket id']
    }
  },
  {
    id: 'node-30',
    slug: 'background-jobs',
    title: 'Background Jobs and Queues',
    description: 'Process tasks asynchronously with job queues.',
    order: 30,
    category: 'nodejs',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Background Jobs and Queues

Use job queues for tasks that shouldn't block the request/response cycle.

## Bull Queue

\`\`\`javascript
const Queue = require('bull');

const emailQueue = new Queue('emails', 'redis://localhost:6379');

// Producer - add jobs
emailQueue.add({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Thanks for signing up'
});

// Consumer - process jobs
emailQueue.process(async (job) => {
  await sendEmail(job.data);
});
\`\`\`

## Job Options

\`\`\`javascript
emailQueue.add(data, {
  delay: 5000,           // Delay 5 seconds
  attempts: 3,           // Retry 3 times
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: true
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Job Queue with Progress',
        code: `const Queue = require('bull');

const processQueue = new Queue('file-processing');

// Add job with progress tracking
async function addProcessingJob(fileId) {
  const job = await processQueue.add({
    fileId,
    timestamp: Date.now()
  }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 }
  });

  return job.id;
}

// Process with progress updates
processQueue.process(async (job) => {
  const { fileId } = job.data;

  job.progress(10);
  const file = await downloadFile(fileId);

  job.progress(50);
  const processed = await processFile(file);

  job.progress(90);
  await uploadResult(processed);

  job.progress(100);
  return { success: true, fileId };
});

// Event handlers
processQueue.on('completed', (job, result) => {
  console.log(\`Job \${job.id} completed:\`, result);
});

processQueue.on('failed', (job, err) => {
  console.error(\`Job \${job.id} failed:\`, err.message);
});

processQueue.on('progress', (job, progress) => {
  console.log(\`Job \${job.id}: \${progress}%\`);
});`,
        explanation: 'Full job queue implementation with progress tracking.'
      }
    ],
    challenge: {
      starterCode: `// Create a simple job scheduler
class JobScheduler {
  constructor() {
    this.jobs = [];
    this.running = false;
  }

  add(name, handler, options = {}) {
    // Add job to queue
    // options: { delay, priority }
  }

  async start() {
    // Process jobs in order (by priority, then FIFO)
  }
}

module.exports = { JobScheduler };`,
      solution: `class JobScheduler {
  constructor() {
    this.jobs = [];
    this.running = false;
  }

  add(name, handler, options = {}) {
    this.jobs.push({
      name,
      handler,
      priority: options.priority || 0,
      delay: options.delay || 0,
      addedAt: Date.now()
    });
    this.jobs.sort((a, b) => b.priority - a.priority);
  }

  async start() {
    this.running = true;
    while (this.running && this.jobs.length > 0) {
      const job = this.jobs.shift();
      if (job.delay > 0) {
        await new Promise(r => setTimeout(r, job.delay));
      }
      try {
        await job.handler();
      } catch (err) {
        console.error(\`Job \${job.name} failed:\`, err);
      }
    }
  }
}

module.exports = { JobScheduler };`,
      tests: [
        { input: 'typeof JobScheduler', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['Sort by priority descending', 'Use setTimeout for delays']
    }
  }
];

// Production Node.js (5 lessons)
export const productionLessons: Lesson[] = [
  {
    id: 'node-31',
    slug: 'logging',
    title: 'Logging with Winston',
    description: 'Implement structured logging for production applications.',
    order: 31,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Logging with Winston

Winston is a versatile logging library for Node.js.

## Basic Setup

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
\`\`\`

## Log Levels

error > warn > info > http > verbose > debug > silly
    `,
    codeExamples: [
      {
        title: 'Production Logger Configuration',
        code: `const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-service' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

// Console for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Usage
logger.info('Server started', { port: 3000 });
logger.error('Database error', { error: err, query: sql });`,
        explanation: 'Production-ready Winston configuration.'
      }
    ],
    challenge: {
      starterCode: `const winston = require('winston');

// Create a logger factory function
function createLogger(serviceName) {
  // Create Winston logger with:
  // - JSON format with timestamp
  // - Service name in metadata
  // - Console transport for development
  // Your code here
}

module.exports = { createLogger };`,
      solution: `const winston = require('winston');

function createLogger(serviceName) {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.Console({
        format: process.env.NODE_ENV === 'production'
          ? winston.format.json()
          : winston.format.simple()
      })
    ]
  });
}

module.exports = { createLogger };`,
      tests: [
        { input: 'typeof createLogger', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use winston.createLogger()', 'defaultMeta adds to all log entries']
    }
  },
  {
    id: 'node-32',
    slug: 'testing-jest',
    title: 'Testing with Jest',
    description: 'Write unit and integration tests for Node.js applications.',
    order: 32,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Testing with Jest

Jest is a powerful testing framework for JavaScript.

## Basic Test

\`\`\`javascript
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// math.test.js
const { add } = require('./math');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
\`\`\`

## Common Matchers

\`\`\`javascript
expect(value).toBe(expected);        // Exact equality
expect(value).toEqual(expected);     // Deep equality
expect(value).toBeTruthy();          // Truthy check
expect(array).toContain(item);       // Array contains
expect(fn).toThrow();                // Throws error
\`\`\`

## Async Testing

\`\`\`javascript
test('async test', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Testing Express Routes',
        code: `const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('User API', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('POST /api/users', () => {
    it('creates a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test' })
        .expect(201);

      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.email).toBe('test@example.com');
    });

    it('returns 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'invalid', name: 'Test' })
        .expect(400);

      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/users/:id', () => {
    it('returns user by id', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', name: 'Test' }
      });

      const res = await request(app)
        .get(\`/api/users/\${user.id}\`)
        .expect(200);

      expect(res.body.data.id).toBe(user.id);
    });
  });
});`,
        explanation: 'Integration tests with Supertest and database.'
      }
    ],
    challenge: {
      starterCode: `// Create test suite for a UserService class
const UserService = require('./UserService');

describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    // Setup mock database
    mockDb = {
      users: [],
      findById: jest.fn(),
      create: jest.fn()
    };
    service = new UserService(mockDb);
  });

  // Write tests for:
  // - findById returns user when found
  // - findById returns null when not found
  // - create returns created user
});`,
      solution: `const UserService = require('./UserService');

describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      findById: jest.fn(),
      create: jest.fn()
    };
    service = new UserService(mockDb);
  });

  describe('findById', () => {
    it('returns user when found', async () => {
      const user = { id: 1, name: 'John' };
      mockDb.findById.mockResolvedValue(user);

      const result = await service.findById(1);

      expect(result).toEqual(user);
      expect(mockDb.findById).toHaveBeenCalledWith(1);
    });

    it('returns null when not found', async () => {
      mockDb.findById.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('returns created user', async () => {
      const input = { name: 'John', email: 'john@example.com' };
      const created = { id: 1, ...input };
      mockDb.create.mockResolvedValue(created);

      const result = await service.create(input);

      expect(result).toEqual(created);
    });
  });
});`,
      tests: [
        { input: 'typeof describe', expected: 'function', description: 'Jest should be available' }
      ],
      hints: ['Use jest.fn() for mocks', 'mockResolvedValue for async returns']
    }
  },
  {
    id: 'node-33',
    slug: 'performance-clustering',
    title: 'Performance and Clustering',
    description: 'Optimize Node.js applications with clustering and profiling.',
    order: 33,
    category: 'nodejs',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Performance and Clustering

Scale Node.js applications across CPU cores.

## Cluster Module

\`\`\`javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart
  });
} else {
  require('./server');
}
\`\`\`

## PM2 Process Manager

\`\`\`bash
pm2 start app.js -i max  # Cluster mode
pm2 monit               # Monitor
pm2 logs                # View logs
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Graceful Cluster Setup',
        code: `const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const numWorkers = process.env.WORKERS || os.cpus().length;

  console.log(\`Primary \${process.pid} starting \${numWorkers} workers\`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died (\${signal || code})\`);

    if (!worker.exitedAfterDisconnect) {
      console.log('Starting a new worker');
      cluster.fork();
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Primary received SIGTERM');
    for (const id in cluster.workers) {
      cluster.workers[id].kill('SIGTERM');
    }
  });
} else {
  const app = require('./app');
  const server = app.listen(3000);

  process.on('SIGTERM', () => {
    console.log(\`Worker \${process.pid} shutting down\`);
    server.close(() => {
      process.exit(0);
    });
  });

  console.log(\`Worker \${process.pid} started\`);
}`,
        explanation: 'Cluster setup with graceful shutdown handling.'
      }
    ],
    challenge: {
      starterCode: `const cluster = require('cluster');
const os = require('os');

// Create a cluster manager
function startCluster(workerScript, options = {}) {
  // options: { workers, respawn }
  // Start workers and handle exits
  // Your code here
}

module.exports = { startCluster };`,
      solution: `const cluster = require('cluster');
const os = require('os');

function startCluster(workerScript, options = {}) {
  const { workers = os.cpus().length, respawn = true } = options;

  if (cluster.isPrimary) {
    for (let i = 0; i < workers; i++) {
      cluster.fork();
    }

    if (respawn) {
      cluster.on('exit', (worker, code, signal) => {
        if (!worker.exitedAfterDisconnect) {
          cluster.fork();
        }
      });
    }
  } else {
    require(workerScript);
  }
}

module.exports = { startCluster };`,
      tests: [
        { input: 'typeof startCluster', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Check cluster.isPrimary', 'Use cluster.fork() to spawn workers']
    }
  },
  {
    id: 'node-34',
    slug: 'docker',
    title: 'Docker for Node.js',
    description: 'Containerize Node.js applications with Docker.',
    order: 34,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Docker for Node.js

Docker enables consistent deployment across environments.

## Dockerfile

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
USER node

CMD ["node", "src/index.js"]
\`\`\`

## Multi-Stage Build

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/index.js"]
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Docker Compose Setup',
        code: `# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
        explanation: 'Complete Docker Compose with database and Redis.'
      }
    ],
    challenge: {
      starterCode: `// Create a health check endpoint for Docker
function createHealthCheck(dependencies) {
  // dependencies: { db, redis }
  // Return an async function that checks all dependencies
  // Return { status: 'healthy'|'unhealthy', checks: {...} }
  // Your code here
}

module.exports = { createHealthCheck };`,
      solution: `function createHealthCheck(dependencies) {
  return async () => {
    const checks = {};
    let healthy = true;

    for (const [name, checker] of Object.entries(dependencies)) {
      try {
        await checker.ping();
        checks[name] = 'ok';
      } catch (err) {
        checks[name] = 'failed';
        healthy = false;
      }
    }

    return {
      status: healthy ? 'healthy' : 'unhealthy',
      checks
    };
  };
}

module.exports = { createHealthCheck };`,
      tests: [
        { input: 'typeof createHealthCheck', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Iterate over dependencies', 'Catch errors for failed checks']
    }
  },
  {
    id: 'node-35',
    slug: 'cicd-github-actions',
    title: 'CI/CD with GitHub Actions',
    description: 'Automate testing and deployment with GitHub Actions.',
    order: 35,
    category: 'nodejs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# CI/CD with GitHub Actions

Automate your workflow with GitHub Actions.

## Basic Workflow

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
\`\`\`

## Environment Secrets

Store secrets in repository settings and access via \`secrets\` context.
    `,
    codeExamples: [
      {
        title: 'Complete CI/CD Pipeline',
        code: `# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          curl -X POST \${{ secrets.DEPLOY_WEBHOOK }}`,
        explanation: 'Full pipeline with testing, building, and deployment.'
      }
    ],
    challenge: {
      starterCode: `// Create a deployment script
const { execSync } = require('child_process');

async function deploy(config) {
  // config: { image, registry, tag }
  // Steps:
  // 1. Build Docker image
  // 2. Tag with registry
  // 3. Push to registry
  // Return { success: boolean, message: string }
  // Your code here
}

module.exports = { deploy };`,
      solution: `const { execSync } = require('child_process');

async function deploy(config) {
  const { image, registry, tag } = config;
  const fullTag = \`\${registry}/\${image}:\${tag}\`;

  try {
    execSync(\`docker build -t \${image} .\`, { stdio: 'inherit' });
    execSync(\`docker tag \${image} \${fullTag}\`, { stdio: 'inherit' });
    execSync(\`docker push \${fullTag}\`, { stdio: 'inherit' });

    return { success: true, message: \`Deployed \${fullTag}\` };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = { deploy };`,
      tests: [
        { input: 'typeof deploy', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use execSync for synchronous commands', 'Catch errors for failure handling']
    }
  }
];

// Export all Node.js lessons
export const allNodejsLessons: Lesson[] = [
  ...nodeFundamentals,
  ...expressLessons,
  ...databaseLessons,
  ...productionLessons
];
