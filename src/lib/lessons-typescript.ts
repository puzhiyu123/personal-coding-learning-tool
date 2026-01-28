import { Lesson } from "./lessons";

// ============================================
// TYPESCRIPT FUNDAMENTALS (Lessons 1-10)
// ============================================

export const tsFundamentals: Lesson[] = [
  {
    id: "ts-1",
    slug: "why-typescript",
    title: "Why TypeScript",
    description: "Benefits of TypeScript, compilation, and tsconfig setup",
    order: 1,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Why TypeScript

TypeScript is JavaScript with static types. It catches errors at compile time, not runtime.

## Benefits

1. **Catch errors early** - Find bugs before running code
2. **Better IDE support** - Autocomplete, refactoring, navigation
3. **Self-documenting** - Types describe what code expects
4. **Scales better** - Essential for large codebases
5. **Modern JavaScript** - Use latest features, compile to older JS

## How TypeScript Works

\`\`\`
TypeScript (.ts) → Compiler (tsc) → JavaScript (.js)
\`\`\`

TypeScript is compiled to JavaScript. The types are removed during compilation.

## Installation

\`\`\`bash
npm install -g typescript
# or
npm install --save-dev typescript
\`\`\`

## tsconfig.json

Configuration file for TypeScript:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
\`\`\`

## Running TypeScript

\`\`\`bash
# Compile
tsc myfile.ts

# Compile with config
tsc

# Watch mode
tsc --watch
\`\`\`
    `,
    codeExamples: [
      {
        title: "TypeScript vs JavaScript",
        code: `// JavaScript - Error at runtime
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
// greet(123); // Runtime error!

// TypeScript - Error at compile time
function greetTS(name: string): string {
  return "Hello, " + name.toUpperCase();
}
// greetTS(123); // Compile error: Argument of type 'number' is not assignable

console.log(greetTS("Alice"));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-1-challenge",
      title: "First TypeScript Function",
      description: "Convert this JavaScript function to TypeScript by adding type annotations.",
      starterCode: `// Add types to this function
function add(a, b) {
  return a + b;
}

// Add types to this function
function greet(name) {
  return "Hello, " + name;
}

console.log(add(5, 3));
console.log(greet("World"));`,
      solution: `function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return "Hello, " + name;
}

console.log(add(5, 3));
console.log(greet("World"));`,
      tests: [
        { name: "add has number types", test: `code.includes("a: number") && code.includes("b: number")` },
        { name: "greet has string type", test: `code.includes("name: string")` },
        { name: "Functions have return types", test: `code.includes("): number") && code.includes("): string")` },
      ],
      hints: [
        "Parameters: (a: number, b: number)",
        "Return type comes after parameters: ): number",
        "string type for text, number for numbers",
      ],
    },
  },
  {
    id: "ts-2",
    slug: "basic-types",
    title: "Basic Types",
    description: "string, number, boolean, any, unknown, void, null, undefined",
    order: 2,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Basic Types

TypeScript has several built-in types.

## Primitive Types

\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;
\`\`\`

## Special Types

### any - Opt out of type checking
\`\`\`typescript
let value: any = 5;
value = "string";  // OK
value = true;      // OK
// Avoid using any when possible!
\`\`\`

### unknown - Type-safe any
\`\`\`typescript
let value: unknown = 5;
// value.toFixed(); // Error! Must check type first
if (typeof value === "number") {
  value.toFixed(); // OK after type check
}
\`\`\`

### void - No return value
\`\`\`typescript
function logMessage(msg: string): void {
  console.log(msg);
}
\`\`\`

### null and undefined
\`\`\`typescript
let nothing: null = null;
let notDefined: undefined = undefined;
\`\`\`

### never - Never returns
\`\`\`typescript
function throwError(msg: string): never {
  throw new Error(msg);
}
\`\`\`

## Type Inference

TypeScript can infer types:
\`\`\`typescript
let message = "Hello"; // TypeScript infers string
// message = 123; // Error!
\`\`\`
    `,
    codeExamples: [
      {
        title: "Using basic types",
        code: `// Explicit types
let username: string = "alice";
let score: number = 100;
let isOnline: boolean = true;

// Type inference
let city = "New York"; // inferred as string
let count = 42;        // inferred as number

// Function with types
function formatUser(name: string, age: number): string {
  return \`\${name} is \${age} years old\`;
}

console.log(formatUser(username, 25));

// unknown vs any
let data: unknown = "Hello";

// Must check type before using
if (typeof data === "string") {
  console.log(data.toUpperCase());
}`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-2-challenge",
      title: "Type the Variables",
      description: "Add appropriate types to all variables and function parameters.",
      starterCode: `// Add types to these variables
let productName = "Widget";
let price = 29.99;
let inStock = true;
let quantity = null;

// Add types to this function
function calculateTotal(qty, unitPrice) {
  if (qty === null) return 0;
  return qty * unitPrice;
}

console.log(calculateTotal(5, price));`,
      solution: `let productName: string = "Widget";
let price: number = 29.99;
let inStock: boolean = true;
let quantity: number | null = null;

function calculateTotal(qty: number | null, unitPrice: number): number {
  if (qty === null) return 0;
  return qty * unitPrice;
}

console.log(calculateTotal(5, price));`,
      tests: [
        { name: "Has string type", test: `code.includes(": string")` },
        { name: "Has number type", test: `code.includes(": number")` },
        { name: "Has union with null", test: `code.includes("| null")` },
      ],
      hints: [
        "quantity can be number or null: number | null",
        "Function params need types too",
        "Return type after the parentheses",
      ],
    },
  },
  {
    id: "ts-3",
    slug: "arrays-tuples",
    title: "Arrays & Tuples",
    description: "Typed arrays, readonly arrays, and tuple types",
    order: 3,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Arrays & Tuples

## Typed Arrays

Two syntaxes for array types:

\`\`\`typescript
// Array<T> syntax
let numbers: Array<number> = [1, 2, 3];

// T[] syntax (more common)
let names: string[] = ["Alice", "Bob"];
\`\`\`

## Readonly Arrays

Prevent modifications:

\`\`\`typescript
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4); // Error!
// numbers[0] = 10; // Error!
\`\`\`

## Tuples

Fixed-length arrays with specific types per position:

\`\`\`typescript
// [string, number] tuple
let person: [string, number] = ["Alice", 25];

// Named tuples (for clarity)
type Point = [x: number, y: number];
let coord: Point = [10, 20];
\`\`\`

## Tuple with Optional Elements

\`\`\`typescript
type Response = [number, string, boolean?];
let success: Response = [200, "OK"];
let error: Response = [404, "Not Found", false];
\`\`\`

## Rest Elements in Tuples

\`\`\`typescript
type StringNumberBooleans = [string, number, ...boolean[]];
let data: StringNumberBooleans = ["hello", 1, true, false, true];
\`\`\`
    `,
    codeExamples: [
      {
        title: "Arrays and tuples",
        code: `// Typed arrays
const scores: number[] = [85, 90, 78];
const names: string[] = ["Alice", "Bob", "Charlie"];

// Array methods work with types
const doubled = scores.map(s => s * 2); // number[]
const passed = scores.filter(s => s >= 80); // number[]

console.log("Doubled:", doubled);
console.log("Passed:", passed);

// Tuples
type UserTuple = [id: number, name: string, isAdmin: boolean];

const user: UserTuple = [1, "Alice", true];
const [id, name, isAdmin] = user; // Destructuring works

console.log(\`User \${id}: \${name}, Admin: \${isAdmin}\`);

// Function returning tuple
function getMinMax(nums: number[]): [min: number, max: number] {
  return [Math.min(...nums), Math.max(...nums)];
}

const [min, max] = getMinMax(scores);
console.log(\`Range: \${min} - \${max}\`);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-3-challenge",
      title: "Work with Arrays and Tuples",
      description: "Create properly typed arrays and a function that returns a tuple.",
      starterCode: `// 1. Create a typed array of numbers called 'prices'
// 2. Create a typed array of strings called 'products'

// 3. Create a function 'getStats' that takes number[]
// and returns a tuple [count, sum, average]

// Test:
// const stats = getStats([10, 20, 30]);
// console.log(stats); // [3, 60, 20]`,
      solution: `const prices: number[] = [19.99, 29.99, 9.99];
const products: string[] = ["Widget", "Gadget", "Tool"];

function getStats(nums: number[]): [count: number, sum: number, average: number] {
  const count = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const average = sum / count;
  return [count, sum, average];
}

const stats = getStats([10, 20, 30]);
console.log("Stats:", stats);
console.log("Prices stats:", getStats(prices));`,
      tests: [
        { name: "Has number[] array", test: `code.includes(": number[]")` },
        { name: "Has string[] array", test: `code.includes(": string[]")` },
        { name: "Returns tuple", test: `code.includes("]: [") || code.includes("): [")` },
      ],
      hints: [
        "Array type: const arr: number[] = []",
        "Tuple return: ): [number, number, number]",
        "Use reduce for sum",
      ],
    },
  },
  {
    id: "ts-4",
    slug: "objects-type-annotations",
    title: "Objects & Type Annotations",
    description: "Inline types, optional properties, and readonly",
    order: 4,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Objects & Type Annotations

## Inline Object Types

\`\`\`typescript
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
\`\`\`

## Optional Properties

\`\`\`typescript
let product: {
  name: string;
  price: number;
  description?: string; // Optional
} = {
  name: "Widget",
  price: 29.99
};
\`\`\`

## Readonly Properties

\`\`\`typescript
let config: {
  readonly apiKey: string;
  timeout: number;
} = {
  apiKey: "secret",
  timeout: 5000
};

// config.apiKey = "new"; // Error!
config.timeout = 10000;   // OK
\`\`\`

## Index Signatures

\`\`\`typescript
let scores: { [name: string]: number } = {
  Alice: 95,
  Bob: 87
};
scores["Charlie"] = 92; // OK
\`\`\`

## Nested Objects

\`\`\`typescript
let company: {
  name: string;
  address: {
    city: string;
    zip: string;
  };
} = {
  name: "TechCorp",
  address: {
    city: "NYC",
    zip: "10001"
  }
};
\`\`\`
    `,
    codeExamples: [
      {
        title: "Object type annotations",
        code: `// Inline object type
const user: {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
} = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

console.log(user);

// Function with object parameter
function printUser(user: { name: string; email: string }): void {
  console.log(\`\${user.name} <\${user.email}>\`);
}

printUser(user);

// Object with index signature
const cache: { [key: string]: number } = {};
cache["visits"] = 100;
cache["clicks"] = 50;
console.log("Cache:", cache);

// Nested object
const order: {
  id: number;
  items: { name: string; qty: number }[];
} = {
  id: 1,
  items: [
    { name: "Widget", qty: 2 },
    { name: "Gadget", qty: 1 }
  ]
};
console.log("Order items:", order.items.length);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-4-challenge",
      title: "Type an Object",
      description: "Add proper type annotations to the object and function.",
      starterCode: `// Add inline type annotation
const book = {
  title: "TypeScript Guide",
  author: "Jane Doe",
  year: 2024,
  isbn: "123-456-789"
};

// Add parameter type (object with title and author)
function formatBook(book) {
  return \`"\${book.title}" by \${book.author}\`;
}

console.log(formatBook(book));`,
      solution: `const book: {
  title: string;
  author: string;
  year: number;
  isbn: string;
} = {
  title: "TypeScript Guide",
  author: "Jane Doe",
  year: 2024,
  isbn: "123-456-789"
};

function formatBook(book: { title: string; author: string }): string {
  return \`"\${book.title}" by \${book.author}\`;
}

console.log(formatBook(book));`,
      tests: [
        { name: "book has type annotation", test: `code.includes("const book:") || code.includes("book: {")` },
        { name: "Function param has type", test: `code.includes("book: {") && code.includes("title: string")` },
      ],
      hints: [
        "Add type after variable name: const book: { ... }",
        "Function param: (book: { title: string; author: string })",
      ],
    },
  },
  {
    id: "ts-5",
    slug: "functions-typescript",
    title: "Functions",
    description: "Parameter types, return types, optional and default parameters",
    order: 5,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Functions in TypeScript

## Basic Function Types

\`\`\`typescript
// Function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function type alias
type MathFn = (a: number, b: number) => number;
const divide: MathFn = (a, b) => a / b;
\`\`\`

## Optional Parameters

\`\`\`typescript
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}

greet("Alice");           // "Hello, Alice!"
greet("Alice", "Hi");     // "Hi, Alice!"
\`\`\`

## Default Parameters

\`\`\`typescript
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}
\`\`\`

## Rest Parameters

\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\`

## Function Overloads

\`\`\`typescript
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}
\`\`\`

## void vs undefined

\`\`\`typescript
function logMessage(msg: string): void {
  console.log(msg);
  // No return statement needed
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Function types",
        code: `// Basic function with types
function calculatePrice(
  basePrice: number,
  taxRate: number = 0.1,
  discount?: number
): number {
  let price = basePrice * (1 + taxRate);
  if (discount) {
    price *= (1 - discount);
  }
  return Math.round(price * 100) / 100;
}

console.log(calculatePrice(100));           // 110
console.log(calculatePrice(100, 0.2));      // 120
console.log(calculatePrice(100, 0.1, 0.1)); // 99

// Function type alias
type Formatter = (value: unknown) => string;

const formatCurrency: Formatter = (value) => {
  return \`$\${Number(value).toFixed(2)}\`;
};

console.log(formatCurrency(19.999));

// Rest parameters
function joinStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log(joinStrings(", ", "a", "b", "c"));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-5-challenge",
      title: "Type the Functions",
      description: "Add proper types to the functions including optional and rest parameters.",
      starterCode: `// Add types: returns greeting string
function greet(name, title) {
  if (title) {
    return \`Hello, \${title} \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

// Add types: returns sum of all numbers
function sumAll(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(greet("Alice"));
console.log(greet("Smith", "Dr."));
console.log(sumAll(1, 2, 3, 4, 5));`,
      solution: `function greet(name: string, title?: string): string {
  if (title) {
    return \`Hello, \${title} \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

function sumAll(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(greet("Alice"));
console.log(greet("Smith", "Dr."));
console.log(sumAll(1, 2, 3, 4, 5));`,
      tests: [
        { name: "greet has optional param", test: `code.includes("title?:")` },
        { name: "sumAll has rest param", test: `code.includes("...numbers: number[]")` },
        { name: "Functions have return types", test: `code.includes("): string") && code.includes("): number")` },
      ],
      hints: [
        "Optional param: title?: string",
        "Rest param: ...numbers: number[]",
        "Add return type after parentheses",
      ],
    },
  },
  {
    id: "ts-6",
    slug: "interfaces",
    title: "Interfaces",
    description: "Define object shapes with interfaces",
    order: 6,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Interfaces

Interfaces define the shape of objects.

## Basic Interface

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
\`\`\`

## Optional Properties

\`\`\`typescript
interface Product {
  name: string;
  price: number;
  description?: string;
}
\`\`\`

## Readonly Properties

\`\`\`typescript
interface Config {
  readonly apiKey: string;
  readonly version: number;
}
\`\`\`

## Extending Interfaces

\`\`\`typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}
\`\`\`

## Interface for Functions

\`\`\`typescript
interface SearchFunc {
  (query: string, limit: number): string[];
}

const search: SearchFunc = (query, limit) => {
  return [];
};
\`\`\`

## Implementing Interfaces

\`\`\`typescript
interface Printable {
  print(): void;
}

class Document implements Printable {
  print() {
    console.log("Printing...");
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Working with interfaces",
        code: `// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "user";
}

// Using the interface
const alice: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin"
};

// Extending interfaces
interface Employee extends User {
  department: string;
  salary: number;
}

const employee: Employee = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  department: "Engineering",
  salary: 75000
};

// Function using interface
function displayUser(user: User): void {
  console.log(\`\${user.name} (\${user.email})\`);
}

displayUser(alice);
displayUser(employee); // Employee extends User, so it works

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log("5 + 3 =", calc.add(5, 3));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-6-challenge",
      title: "Create Interfaces",
      description: "Create interfaces for a blog system with Post and Author.",
      starterCode: `// Create Author interface with:
// - id: number
// - name: string
// - email: string
// - bio?: string (optional)

// Create Post interface with:
// - id: number
// - title: string
// - content: string
// - author: Author
// - publishedAt?: Date (optional)

// Create a function displayPost that takes a Post and logs it

// Test with sample data`,
      solution: `interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  publishedAt?: Date;
}

function displayPost(post: Post): void {
  console.log(\`"\${post.title}" by \${post.author.name}\`);
  console.log(post.content);
  if (post.publishedAt) {
    console.log(\`Published: \${post.publishedAt.toDateString()}\`);
  }
}

const author: Author = {
  id: 1,
  name: "Alice",
  email: "alice@blog.com"
};

const post: Post = {
  id: 1,
  title: "Learning TypeScript",
  content: "TypeScript is great for large projects...",
  author: author,
  publishedAt: new Date()
};

displayPost(post);`,
      tests: [
        { name: "Has Author interface", test: `code.includes("interface Author")` },
        { name: "Has Post interface", test: `code.includes("interface Post")` },
        { name: "Post has author: Author", test: `code.includes("author: Author")` },
      ],
      hints: [
        "interface Author { id: number; name: string; ... }",
        "Use Author type for post.author",
        "Optional: bio?: string",
      ],
    },
  },
  {
    id: "ts-7",
    slug: "type-aliases",
    title: "Type Aliases",
    description: "Create custom types and when to use type vs interface",
    order: 7,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Type Aliases

Type aliases create names for types.

## Basic Type Alias

\`\`\`typescript
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
\`\`\`

## Type vs Interface

| Feature | Type | Interface |
|---------|------|-----------|
| Objects | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Intersection | ✅ | ❌ (uses extends) |
| Declaration merging | ❌ | ✅ |
| Primitives | ✅ | ❌ |

**General rule:** Use interface for objects, type for everything else.

## Union Types with Type

\`\`\`typescript
type Status = "pending" | "approved" | "rejected";
type Result = { success: true; data: string } | { success: false; error: string };
\`\`\`

## Intersection Types

\`\`\`typescript
type Person = { name: string };
type Employee = Person & { employeeId: number };

// Equivalent to interface extending
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventName = \`on\${string}\`;
// Matches: "onClick", "onHover", "onSubmit", etc.
\`\`\`
    `,
    codeExamples: [
      {
        title: "Type alias patterns",
        code: `// Simple type aliases
type ID = string | number;
type Coordinates = [number, number];

let userId: ID = 123;
userId = "user-123"; // Also valid

const point: Coordinates = [10, 20];

// Object type alias
type User = {
  id: ID;
  name: string;
  status: "active" | "inactive";
};

const user: User = {
  id: 1,
  name: "Alice",
  status: "active"
};

// Intersection type
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type TimestampedUser = User & Timestamped;

const fullUser: TimestampedUser = {
  ...user,
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log("User:", user);
console.log("With timestamps:", fullUser);

// Function type alias
type Comparator<T> = (a: T, b: T) => number;

const numberCompare: Comparator<number> = (a, b) => a - b;
console.log([3, 1, 2].sort(numberCompare));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-7-challenge",
      title: "Create Type Aliases",
      description: "Create type aliases for an API response system.",
      starterCode: `// Create these type aliases:
// 1. Status = "loading" | "success" | "error"
// 2. ApiResponse<T> = object with status, data (optional), error (optional)
// 3. User = { id: number, name: string }
// 4. UserResponse = ApiResponse<User>

// Create a function handleResponse that takes UserResponse
// and logs appropriate message based on status`,
      solution: `type Status = "loading" | "success" | "error";

type ApiResponse<T> = {
  status: Status;
  data?: T;
  error?: string;
};

type User = {
  id: number;
  name: string;
};

type UserResponse = ApiResponse<User>;

function handleResponse(response: UserResponse): void {
  switch (response.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Got user:", response.data?.name);
      break;
    case "error":
      console.log("Error:", response.error);
      break;
  }
}

// Test
handleResponse({ status: "loading" });
handleResponse({ status: "success", data: { id: 1, name: "Alice" } });
handleResponse({ status: "error", error: "User not found" });`,
      tests: [
        { name: "Has Status type", test: `code.includes("type Status")` },
        { name: "Has ApiResponse generic", test: `code.includes("ApiResponse<T>") || code.includes("ApiResponse<")` },
        { name: "Uses union types", test: `code.includes('"loading"') && code.includes('"success"')` },
      ],
      hints: [
        "Status is a union of string literals",
        "ApiResponse<T> has status, optional data and error",
        "UserResponse = ApiResponse<User>",
      ],
    },
  },
  {
    id: "ts-8",
    slug: "union-intersection-types",
    title: "Union & Intersection Types",
    description: "Combine types with union (|) and intersection (&)",
    order: 8,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Union & Intersection Types

## Union Types (|)

A value can be one of several types:

\`\`\`typescript
type StringOrNumber = string | number;

let id: StringOrNumber = "abc";
id = 123; // Also valid
\`\`\`

## Discriminated Unions

Use a common property to distinguish:

\`\`\`typescript
type Success = { status: "success"; data: string };
type Error = { status: "error"; message: string };
type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);    // TypeScript knows data exists
  } else {
    console.log(result.message); // TypeScript knows message exists
  }
}
\`\`\`

## Intersection Types (&)

Combine multiple types:

\`\`\`typescript
type Person = { name: string };
type Employee = { employeeId: number };
type Staff = Person & Employee;

const staff: Staff = {
  name: "Alice",
  employeeId: 123
};
\`\`\`

## Narrowing Union Types

\`\`\`typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string
  }
  return value.toFixed(2);       // TypeScript knows it's number
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Unions and intersections",
        code: `// Discriminated union
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string[] };
type ErrorState = { status: "error"; error: string };

type State = LoadingState | SuccessState | ErrorState;

function renderState(state: State): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return \`Data: \${state.data.join(", ")}\`;
    case "error":
      return \`Error: \${state.error}\`;
  }
}

console.log(renderState({ status: "loading" }));
console.log(renderState({ status: "success", data: ["a", "b"] }));
console.log(renderState({ status: "error", error: "Failed" }));

// Intersection types
type WithId = { id: number };
type WithTimestamp = { createdAt: Date };
type Entity = WithId & WithTimestamp;

type User = Entity & {
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  createdAt: new Date(),
  name: "Alice",
  email: "alice@example.com"
};

console.log("User:", user.name, "ID:", user.id);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-8-challenge",
      title: "Discriminated Union",
      description: "Create a discriminated union for different shape types and a function to calculate area.",
      starterCode: `// Create types for shapes:
// Circle: { kind: "circle", radius: number }
// Rectangle: { kind: "rectangle", width: number, height: number }
// Triangle: { kind: "triangle", base: number, height: number }

// Create Shape = Circle | Rectangle | Triangle

// Create function calculateArea(shape: Shape): number
// that returns the area based on shape kind

// Test with different shapes`,
      solution: `type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rect: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const triangle: Triangle = { kind: "triangle", base: 8, height: 3 };

console.log("Circle area:", calculateArea(circle).toFixed(2));
console.log("Rectangle area:", calculateArea(rect));
console.log("Triangle area:", calculateArea(triangle));`,
      tests: [
        { name: "Has Shape union", test: `code.includes("type Shape = Circle | Rectangle | Triangle") || code.includes("Shape =")` },
        { name: "Uses discriminant", test: `code.includes('kind: "circle"')` },
        { name: "calculateArea uses switch", test: `code.includes("switch") && code.includes("shape.kind")` },
      ],
      hints: [
        "Each shape has kind as discriminant",
        "Use switch on shape.kind",
        "TypeScript narrows type in each case",
      ],
    },
  },
  {
    id: "ts-9",
    slug: "literal-types",
    title: "Literal Types",
    description: "Use specific values as types with const assertions",
    order: 9,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Literal Types

Literal types allow only specific values.

## String Literal Types

\`\`\`typescript
type Direction = "north" | "south" | "east" | "west";

let heading: Direction = "north";
// heading = "up"; // Error!
\`\`\`

## Numeric Literal Types

\`\`\`typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 201 | 400 | 404 | 500;
\`\`\`

## Boolean Literal Types

\`\`\`typescript
type True = true;
type False = false;
\`\`\`

## const Assertions

\`\`\`typescript
// Without as const
let colors = ["red", "green", "blue"]; // string[]

// With as const
let colors = ["red", "green", "blue"] as const;
// readonly ["red", "green", "blue"]

// Object with as const
const config = {
  endpoint: "/api",
  timeout: 5000
} as const;
// { readonly endpoint: "/api"; readonly timeout: 5000 }
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventType = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventType>}\`;
// "onClick" | "onFocus" | "onBlur"
\`\`\`
    `,
    codeExamples: [
      {
        title: "Literal types in action",
        code: `// String literals
type Theme = "light" | "dark" | "system";
type Size = "small" | "medium" | "large";

function setTheme(theme: Theme): void {
  console.log(\`Setting theme to: \${theme}\`);
}

setTheme("dark");

// Numeric literals
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type SuccessCode = 200 | 201 | 204;

function logRequest(method: HttpMethod, status: SuccessCode): void {
  console.log(\`\${method} request: \${status}\`);
}

logRequest("GET", 200);

// const assertion
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;

// routes.home = "/new"; // Error! readonly

type Route = typeof routes[keyof typeof routes];
// "/" | "/about" | "/contact"

// Array with as const
const statuses = ["pending", "active", "closed"] as const;
type Status = typeof statuses[number];
// "pending" | "active" | "closed"

let currentStatus: Status = "active";
console.log("Current status:", currentStatus);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-9-challenge",
      title: "Use Literal Types",
      description: "Create a type-safe configuration system using literal types.",
      starterCode: `// Create types:
// 1. LogLevel = "debug" | "info" | "warn" | "error"
// 2. Environment = "development" | "staging" | "production"

// Create Config type with:
// - logLevel: LogLevel
// - environment: Environment
// - apiUrl: string

// Create a const config object with as const
// Create a function that logs based on level

// Test the system`,
      solution: `type LogLevel = "debug" | "info" | "warn" | "error";
type Environment = "development" | "staging" | "production";

type Config = {
  logLevel: LogLevel;
  environment: Environment;
  apiUrl: string;
};

const config = {
  logLevel: "info",
  environment: "development",
  apiUrl: "http://localhost:3000"
} as const satisfies Config;

function log(level: LogLevel, message: string): void {
  const levels: LogLevel[] = ["debug", "info", "warn", "error"];
  const configLevelIndex = levels.indexOf(config.logLevel);
  const messageLevelIndex = levels.indexOf(level);

  if (messageLevelIndex >= configLevelIndex) {
    console.log(\`[\${level.toUpperCase()}] \${message}\`);
  }
}

log("debug", "Debug message"); // Won't show (below info)
log("info", "Info message");
log("warn", "Warning message");
log("error", "Error message");`,
      tests: [
        { name: "Has LogLevel type", test: `code.includes("type LogLevel")` },
        { name: "Has Environment type", test: `code.includes("type Environment")` },
        { name: "Uses as const", test: `code.includes("as const")` },
      ],
      hints: [
        "LogLevel is union of string literals",
        "Use as const to make config readonly",
        "satisfies keyword checks type compatibility",
      ],
    },
  },
  {
    id: "ts-10",
    slug: "type-narrowing",
    title: "Type Narrowing",
    description: "Use typeof, instanceof, in, and type guards",
    order: 10,
    category: "TypeScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Type Narrowing

Type narrowing refines types within conditional blocks.

## typeof Guard

\`\`\`typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // string
  }
  return value * 2; // number
}
\`\`\`

## instanceof Guard

\`\`\`typescript
function printDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.toISOString()); // Date
  } else {
    console.log(date); // string
  }
}
\`\`\`

## in Operator

\`\`\`typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // Fish
  } else {
    animal.fly();  // Bird
  }
}
\`\`\`

## Custom Type Guards

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  }
}
\`\`\`

## Truthiness Narrowing

\`\`\`typescript
function printValue(value: string | null) {
  if (value) {
    console.log(value.toUpperCase()); // string (not null)
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Type narrowing examples",
        code: `// typeof narrowing
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "Yes" : "No";
}

console.log(formatValue("hello"));
console.log(formatValue(42.567));
console.log(formatValue(true));

// in operator narrowing
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; email: string };
type Person = Admin | User;

function describe(person: Person): string {
  if ("permissions" in person) {
    return \`Admin with \${person.permissions.length} permissions\`;
  }
  return \`User: \${person.email}\`;
}

console.log(describe({ role: "admin", permissions: ["read", "write"] }));
console.log(describe({ role: "user", email: "user@test.com" }));

// Custom type guard
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function handleResult(result: string | Error): void {
  if (isError(result)) {
    console.log("Error:", result.message);
  } else {
    console.log("Success:", result);
  }
}

handleResult("OK");
handleResult(new Error("Something went wrong"));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-10-challenge",
      title: "Create Type Guards",
      description: "Create type guards to safely handle different response types.",
      starterCode: `// Types
type SuccessResponse = { success: true; data: string };
type ErrorResponse = { success: false; error: string };
type Response = SuccessResponse | ErrorResponse;

// Create type guard: isSuccess(response): response is SuccessResponse

// Create function handleResponse that:
// - Uses the type guard
// - Logs "Data: ..." for success
// - Logs "Error: ..." for error

// Test with both response types`,
      solution: `type SuccessResponse = { success: true; data: string };
type ErrorResponse = { success: false; error: string };
type Response = SuccessResponse | ErrorResponse;

function isSuccess(response: Response): response is SuccessResponse {
  return response.success === true;
}

function handleResponse(response: Response): void {
  if (isSuccess(response)) {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

// Test
const success: Response = { success: true, data: "Hello World" };
const error: Response = { success: false, error: "Not found" };

handleResponse(success);
handleResponse(error);`,
      tests: [
        { name: "Has type guard function", test: `code.includes("): response is SuccessResponse")` },
        { name: "Uses type guard", test: `code.includes("if (isSuccess(")` },
        { name: "Handles both cases", test: `output.includes("Data:") && output.includes("Error:")` },
      ],
      hints: [
        "Type guard syntax: (param): param is Type",
        "Return boolean expression",
        "After guard, TypeScript knows the specific type",
      ],
    },
  },
];

// ============================================
// TYPESCRIPT INTERMEDIATE (Lessons 11-22)
// ============================================

export const tsIntermediate: Lesson[] = [
  {
    id: "ts-11",
    slug: "generics-basics",
    title: "Generics Basics",
    description: "Write flexible, reusable code with generic types",
    order: 11,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Generics Basics

Generics let you write code that works with any type while preserving type safety.

## Generic Functions

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // "hello"
identity<number>(42);      // 42
identity(true);            // TypeScript infers boolean
\`\`\`

## Why Generics?

Without generics, you'd need to:
- Use \`any\` (loses type safety)
- Write multiple functions for each type

## Generic Constraints

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("hello");    // OK - string has length
logLength([1, 2, 3]);  // OK - array has length
// logLength(123);     // Error - number has no length
\`\`\`

## Multiple Type Parameters

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

pair("hello", 42); // [string, number]
\`\`\`
    `,
    codeExamples: [
      {
        title: "Generic functions",
        code: `// Identity function
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));
console.log(identity(true)); // Type inferred

// First element of array
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([1, 2, 3]));      // number
console.log(first(["a", "b"]));      // string

// With constraints
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("hello", "hi"));
console.log(longest([1, 2, 3], [1]));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-11-challenge",
      title: "Create Generic Functions",
      description: "Create generic utility functions for arrays.",
      starterCode: `// Create these generic functions:
// 1. last<T>(arr: T[]): T | undefined - returns last element
// 2. reverse<T>(arr: T[]): T[] - returns reversed copy
// 3. unique<T>(arr: T[]): T[] - returns array with duplicates removed

// Test with different types`,
      solution: `function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// Test with numbers
console.log("Last:", last([1, 2, 3]));
console.log("Reverse:", reverse([1, 2, 3]));
console.log("Unique:", unique([1, 1, 2, 2, 3]));

// Test with strings
console.log("Last string:", last(["a", "b", "c"]));
console.log("Reverse strings:", reverse(["a", "b", "c"]));`,
      tests: [
        { name: "Has generic last", test: `code.includes("function last<T>")` },
        { name: "Has generic reverse", test: `code.includes("function reverse<T>")` },
        { name: "Works correctly", test: `output.includes("3") && output.includes("c")` },
      ],
      hints: [
        "Generic syntax: function name<T>(param: T[]): T",
        "Use [...arr] to copy before reversing",
        "new Set removes duplicates",
      ],
    },
  },
  {
    id: "ts-12",
    slug: "generic-classes-interfaces",
    title: "Generic Classes & Interfaces",
    description: "Create reusable data structures with generics",
    order: 12,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Generic Classes & Interfaces

## Generic Interfaces

\`\`\`typescript
interface Box<T> {
  value: T;
  getValue(): T;
}

const stringBox: Box<string> = {
  value: "hello",
  getValue() { return this.value; }
};
\`\`\`

## Generic Classes

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
\`\`\`

## Default Type Parameters

\`\`\`typescript
interface Response<T = any> {
  data: T;
  status: number;
}

const response: Response = { data: "anything", status: 200 };
const typedResponse: Response<User> = { data: user, status: 200 };
\`\`\`
    `,
    codeExamples: [
      {
        title: "Generic data structures",
        code: `// Generic interface
interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err<E>(error: E): Result<never, E> {
  return { success: false, error };
}

console.log(ok(42));
console.log(err("Not found"));

// Generic class
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  get size(): number {
    return this.items.length;
  }
}

const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
console.log("Peek:", queue.peek());
console.log("Dequeue:", queue.dequeue());
console.log("Size:", queue.size);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-12-challenge",
      title: "Generic Key-Value Store",
      description: "Create a generic KeyValueStore class.",
      starterCode: `// Create a KeyValueStore<K, V> class with:
// - set(key: K, value: V): void
// - get(key: K): V | undefined
// - has(key: K): boolean
// - delete(key: K): boolean
// - keys(): K[]
// - values(): V[]

// Test with different key/value types`,
      solution: `class KeyValueStore<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }

  keys(): K[] {
    return [...this.store.keys()];
  }

  values(): V[] {
    return [...this.store.values()];
  }
}

// Test with string keys and number values
const scores = new KeyValueStore<string, number>();
scores.set("Alice", 95);
scores.set("Bob", 87);

console.log("Alice's score:", scores.get("Alice"));
console.log("Has Bob:", scores.has("Bob"));
console.log("Keys:", scores.keys());

// Test with number keys
const cache = new KeyValueStore<number, string>();
cache.set(1, "one");
cache.set(2, "two");
console.log("Values:", cache.values());`,
      tests: [
        { name: "Has generic class", test: `code.includes("class KeyValueStore<K, V>")` },
        { name: "Uses Map internally", test: `code.includes("Map<K, V>")` },
        { name: "Methods work", test: `output.includes("95") && output.includes("Alice")` },
      ],
      hints: [
        "Use Map<K, V> for storage",
        "Spread Map methods to return arrays",
        "Two type parameters: K for keys, V for values",
      ],
    },
  },
  {
    id: "ts-13",
    slug: "utility-types",
    title: "Utility Types",
    description: "Use built-in Partial, Required, Pick, Omit, Record",
    order: 13,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Utility Types

TypeScript provides built-in utility types for common transformations.

## Partial<T>

Makes all properties optional:

\`\`\`typescript
interface User {
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; email?: string; }
\`\`\`

## Required<T>

Makes all properties required:

\`\`\`typescript
type RequiredUser = Required<PartialUser>;
\`\`\`

## Pick<T, K>

Select specific properties:

\`\`\`typescript
type UserName = Pick<User, "name">;
// { name: string; }
\`\`\`

## Omit<T, K>

Remove specific properties:

\`\`\`typescript
type UserWithoutEmail = Omit<User, "email">;
// { name: string; }
\`\`\`

## Record<K, V>

Create object type with specific key/value types:

\`\`\`typescript
type Scores = Record<string, number>;
// { [key: string]: number }
\`\`\`

## Readonly<T>

Make all properties readonly:

\`\`\`typescript
type ReadonlyUser = Readonly<User>;
\`\`\`
    `,
    codeExamples: [
      {
        title: "Utility types in action",
        code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - for updates
function updateUser(id: number, updates: Partial<User>): void {
  console.log(\`Updating user \${id} with:\`, updates);
}

updateUser(1, { name: "New Name" });
updateUser(1, { email: "new@email.com" });

// Pick - select fields
type PublicUser = Pick<User, "id" | "name" | "email">;

const publicUser: PublicUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
console.log("Public user:", publicUser);

// Omit - remove fields
type UserWithoutPassword = Omit<User, "password">;

// Record - for dictionaries
type UserRoles = Record<number, "admin" | "user" | "guest">;
const roles: UserRoles = {
  1: "admin",
  2: "user",
  3: "guest"
};
console.log("Roles:", roles);

// Readonly - immutable
type ImmutableUser = Readonly<User>;
const user: ImmutableUser = {
  id: 1, name: "Bob", email: "bob@test.com", password: "secret"
};
// user.name = "New"; // Error!
console.log("Immutable user:", user.name);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-13-challenge",
      title: "Use Utility Types",
      description: "Apply utility types to create a type-safe API.",
      starterCode: `interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Create these types using utility types:
// 1. CreateProduct - Product without id (for creating)
// 2. UpdateProduct - all Product fields optional except id
// 3. ProductSummary - only id, name, price
// 4. ProductCatalog - Record with product id as key

// Create functions using these types`,
      solution: `interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

type CreateProduct = Omit<Product, "id">;
type UpdateProduct = Partial<Omit<Product, "id">> & { id: number };
type ProductSummary = Pick<Product, "id" | "name" | "price">;
type ProductCatalog = Record<number, Product>;

function createProduct(data: CreateProduct): Product {
  const id = Date.now();
  console.log("Creating product:", { id, ...data });
  return { id, ...data };
}

function updateProduct(update: UpdateProduct): void {
  console.log("Updating product", update.id, "with:", update);
}

function getSummary(product: Product): ProductSummary {
  const { id, name, price } = product;
  return { id, name, price };
}

// Test
const newProduct = createProduct({
  name: "Widget",
  description: "A useful widget",
  price: 29.99,
  stock: 100
});

updateProduct({ id: 1, price: 24.99 });
console.log("Summary:", getSummary(newProduct));`,
      tests: [
        { name: "Uses Omit", test: `code.includes("Omit<Product")` },
        { name: "Uses Pick", test: `code.includes("Pick<Product")` },
        { name: "Uses Record", test: `code.includes("Record<number")` },
      ],
      hints: [
        "CreateProduct: Omit<Product, 'id'>",
        "UpdateProduct needs id required, others optional",
        "ProductSummary: Pick specific fields",
      ],
    },
  },
  {
    id: "ts-14",
    slug: "mapped-types",
    title: "Mapped Types",
    description: "Transform types by mapping over properties",
    order: 14,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Mapped Types

Create new types by transforming existing ones.

## Basic Mapped Type

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## How It Works

- \`keyof T\` - gets all keys of T
- \`P in keyof T\` - iterates over each key
- \`T[P]\` - gets the type of property P

## Common Patterns

\`\`\`typescript
// Make all optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Remove readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
\`\`\`

## Mapped Types with Conditions

\`\`\`typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Methods<T> = {
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
};
\`\`\`
    `,
    codeExamples: [
      {
        title: "Custom mapped types",
        code: `interface User {
  name: string;
  age: number;
  email: string;
}

// Nullable - all properties can be null
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

const nullableUser: Nullable<User> = {
  name: "Alice",
  age: null,
  email: null
};

// Getters - create getter functions for each property
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string; }

// EventMap - create event names
type EventMap<T> = {
  [P in keyof T as \`on\${Capitalize<string & P>}Change\`]: (value: T[P]) => void;
};

type UserEvents = EventMap<User>;

// Implementation example
function createEventHandlers<T>(obj: T): EventMap<T> {
  const handlers = {} as EventMap<T>;
  for (const key of Object.keys(obj as object)) {
    const eventName = \`on\${key.charAt(0).toUpperCase() + key.slice(1)}Change\`;
    (handlers as any)[eventName] = (value: any) => {
      console.log(\`\${key} changed to:\`, value);
    };
  }
  return handlers;
}

const userEvents = createEventHandlers({ name: "Bob", age: 25 });
console.log("Event handlers created");`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-14-challenge",
      title: "Create Mapped Types",
      description: "Create custom mapped types for a form system.",
      starterCode: `interface FormFields {
  username: string;
  email: string;
  age: number;
}

// Create these mapped types:
// 1. FormErrors<T> - each field maps to string | undefined
// 2. FormTouched<T> - each field maps to boolean
// 3. FormValidators<T> - each field maps to (value: T[field]) => boolean

// Create a sample form state using these types`,
      solution: `interface FormFields {
  username: string;
  email: string;
  age: number;
}

type FormErrors<T> = {
  [P in keyof T]: string | undefined;
};

type FormTouched<T> = {
  [P in keyof T]: boolean;
};

type FormValidators<T> = {
  [P in keyof T]: (value: T[P]) => boolean;
};

// Create form state
const formValues: FormFields = {
  username: "alice",
  email: "alice@test.com",
  age: 25
};

const formErrors: FormErrors<FormFields> = {
  username: undefined,
  email: "Invalid email format",
  age: undefined
};

const formTouched: FormTouched<FormFields> = {
  username: true,
  email: true,
  age: false
};

const validators: FormValidators<FormFields> = {
  username: (v) => v.length >= 3,
  email: (v) => v.includes("@"),
  age: (v) => v >= 0 && v < 150
};

// Validate
console.log("Username valid:", validators.username(formValues.username));
console.log("Email valid:", validators.email(formValues.email));
console.log("Age valid:", validators.age(formValues.age));`,
      tests: [
        { name: "Has FormErrors mapped type", test: `code.includes("type FormErrors<T>")` },
        { name: "Uses keyof in mapping", test: `code.includes("[P in keyof T]")` },
        { name: "Validators work", test: `output.includes("true")` },
      ],
      hints: [
        "Basic pattern: { [P in keyof T]: NewType }",
        "T[P] gives the original property type",
        "Validators need T[P] as parameter type",
      ],
    },
  },
  {
    id: "ts-15",
    slug: "conditional-types",
    title: "Conditional Types",
    description: "Create types that depend on conditions",
    order: 15,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Conditional Types

Types that choose between types based on conditions.

## Basic Syntax

\`\`\`typescript
T extends U ? X : Y
\`\`\`

If T is assignable to U, the type is X, otherwise Y.

## Simple Examples

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\`\`\`

## Extracting Types

\`\`\`typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type R = GetReturnType<() => string>; // string
\`\`\`

## The infer Keyword

\`infer\` declares a type variable to be inferred:

\`\`\`typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type A = Flatten<string[]>;  // string
type B = Flatten<number>;    // number
\`\`\`

## Built-in Conditional Types

\`\`\`typescript
Exclude<T, U>  // Remove types from T that are assignable to U
Extract<T, U>  // Extract types from T that are assignable to U
NonNullable<T> // Remove null and undefined from T
ReturnType<T>  // Get return type of function T
Parameters<T>  // Get parameter types of function T
\`\`\`
    `,
    codeExamples: [
      {
        title: "Conditional types",
        code: `// Basic conditional
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<number[]>;  // true
type B = IsArray<string>;    // false

// Extract element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type C = ArrayElement<string[]>;  // string
type D = ArrayElement<number[]>;  // number

// Promise unwrap
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type E = Awaited<Promise<string>>;           // string
type F = Awaited<Promise<Promise<number>>>;  // number

// Extract return type
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(name: string): string {
  return \`Hello, \${name}\`;
}

type G = MyReturnType<typeof greet>;  // string

// Practical: API response handler
type ApiResponse<T> = T extends { error: string }
  ? { success: false; error: string }
  : { success: true; data: T };

type SuccessRes = ApiResponse<{ id: number }>;
type ErrorRes = ApiResponse<{ error: string }>;

console.log("Conditional types defined");`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-15-challenge",
      title: "Create Conditional Types",
      description: "Build conditional types for type transformations.",
      starterCode: `// Create these conditional types:

// 1. UnwrapPromise<T> - extracts type from Promise, or returns T
// type A = UnwrapPromise<Promise<string>> // string
// type B = UnwrapPromise<number> // number

// 2. ArrayOrSingle<T> - if T is array, return element type, else return T[]
// type C = ArrayOrSingle<string[]> // string
// type D = ArrayOrSingle<number> // number[]

// 3. FunctionOrValue<T> - if T is function, return its return type, else return T
// type E = FunctionOrValue<() => string> // string
// type F = FunctionOrValue<number> // number

// Test your types`,
      solution: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type ArrayOrSingle<T> = T extends (infer U)[] ? U : T[];

type FunctionOrValue<T> = T extends (...args: any[]) => infer R ? R : T;

// Test types (these are compile-time only)
type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>;          // number

type C = ArrayOrSingle<string[]>;        // string
type D = ArrayOrSingle<number>;          // number[]

type E = FunctionOrValue<() => string>;  // string
type F = FunctionOrValue<number>;        // number

// Runtime demonstration
function demo<T>(value: T): UnwrapPromise<T> {
  return value as any;
}

console.log("Types created successfully");
console.log("UnwrapPromise<Promise<string>> = string");
console.log("ArrayOrSingle<string[]> = string");
console.log("FunctionOrValue<() => string> = string");`,
      tests: [
        { name: "Has UnwrapPromise", test: `code.includes("type UnwrapPromise<T>")` },
        { name: "Uses infer", test: `code.includes("infer")` },
        { name: "Uses extends", test: `code.includes("extends Promise")` },
      ],
      hints: [
        "Use infer to capture the inner type",
        "T extends Promise<infer U> ? U : T",
        "T extends (infer U)[] for arrays",
      ],
    },
  },
  {
    id: "ts-16",
    slug: "classes-typescript",
    title: "Classes in TypeScript",
    description: "Access modifiers, abstract classes, and implements",
    order: 16,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Classes in TypeScript

TypeScript adds type safety and access control to classes.

## Access Modifiers

\`\`\`typescript
class Person {
  public name: string;      // Accessible anywhere
  private age: number;      // Only in this class
  protected id: number;     // This class and subclasses
  readonly created: Date;   // Cannot be modified

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.id = Math.random();
    this.created = new Date();
  }
}
\`\`\`

## Parameter Properties

Shorthand for declaring and assigning:

\`\`\`typescript
class Person {
  constructor(
    public name: string,
    private age: number
  ) {}
}
\`\`\`

## Abstract Classes

Can't be instantiated, only extended:

\`\`\`typescript
abstract class Shape {
  abstract area(): number;

  describe(): string {
    return \`Area: \${this.area()}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
\`\`\`

## Implementing Interfaces

\`\`\`typescript
interface Printable {
  print(): void;
}

class Document implements Printable {
  print() {
    console.log("Printing...");
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "TypeScript classes",
        code: `// Access modifiers and parameter properties
class BankAccount {
  private balance: number;
  public readonly accountNumber: string;

  constructor(
    public owner: string,
    initialBalance: number
  ) {
    this.balance = initialBalance;
    this.accountNumber = Math.random().toString(36).slice(2);
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log("Balance:", account.getBalance());
// account.balance = 0; // Error! private

// Abstract class
abstract class Animal {
  constructor(public name: string) {}

  abstract speak(): string;

  describe(): string {
    return \`\${this.name} says: \${this.speak()}\`;
  }
}

class Dog extends Animal {
  speak(): string {
    return "Woof!";
  }
}

const dog = new Dog("Rex");
console.log(dog.describe());`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-16-challenge",
      title: "Create Class Hierarchy",
      description: "Build an abstract Vehicle class with Car and Motorcycle subclasses.",
      starterCode: `// Create abstract Vehicle class with:
// - protected brand: string
// - protected year: number
// - abstract wheels: number (getter)
// - abstract honk(): string
// - describe(): string method

// Create Car (4 wheels, honks "Beep beep!")
// Create Motorcycle (2 wheels, honks "Vroom!")

// Test both classes`,
      solution: `abstract class Vehicle {
  constructor(
    protected brand: string,
    protected year: number
  ) {}

  abstract get wheels(): number;
  abstract honk(): string;

  describe(): string {
    return \`\${this.year} \${this.brand} with \${this.wheels} wheels\`;
  }
}

class Car extends Vehicle {
  get wheels(): number {
    return 4;
  }

  honk(): string {
    return "Beep beep!";
  }
}

class Motorcycle extends Vehicle {
  get wheels(): number {
    return 2;
  }

  honk(): string {
    return "Vroom!";
  }
}

const car = new Car("Toyota", 2022);
console.log(car.describe());
console.log(car.honk());

const bike = new Motorcycle("Harley", 2021);
console.log(bike.describe());
console.log(bike.honk());`,
      tests: [
        { name: "Has abstract Vehicle", test: `code.includes("abstract class Vehicle")` },
        { name: "Car extends Vehicle", test: `code.includes("class Car extends Vehicle")` },
        { name: "Abstract methods implemented", test: `output.includes("4 wheels") && output.includes("2 wheels")` },
      ],
      hints: [
        "Use abstract for Vehicle class",
        "Declare abstract methods without body",
        "Protected allows subclass access",
      ],
    },
  },
  {
    id: "ts-17",
    slug: "enums",
    title: "Enums",
    description: "Numeric, string, and const enums",
    order: 17,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `
# Enums

Enums define a set of named constants.

## Numeric Enums

\`\`\`typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let dir: Direction = Direction.Up;
\`\`\`

## String Enums

\`\`\`typescript
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Completed = "COMPLETED"
}
\`\`\`

## Const Enums

Inlined at compile time (better performance):

\`\`\`typescript
const enum Color {
  Red,
  Green,
  Blue
}

let color = Color.Red; // Compiles to: let color = 0;
\`\`\`

## Enum as Type

\`\`\`typescript
function move(direction: Direction): void {
  // Only Direction values allowed
}
\`\`\`

## When to Use

- Use string enums for better debugging
- Consider union types as alternative
- Use const enums for performance
    `,
    codeExamples: [
      {
        title: "Working with enums",
        code: `// Numeric enum
enum Priority {
  Low,      // 0
  Medium,   // 1
  High,     // 2
  Critical  // 3
}

// String enum
enum Status {
  Draft = "draft",
  Published = "published",
  Archived = "archived"
}

interface Task {
  title: string;
  priority: Priority;
  status: Status;
}

const task: Task = {
  title: "Fix bug",
  priority: Priority.High,
  status: Status.Draft
};

console.log("Task:", task);
console.log("Priority value:", task.priority);
console.log("Status value:", task.status);

// Reverse mapping (numeric enums only)
console.log("Priority name:", Priority[2]); // "High"

// Iterating enum values
function listStatuses(): string[] {
  return Object.values(Status);
}

console.log("All statuses:", listStatuses());

// Type-safe comparison
function isHighPriority(p: Priority): boolean {
  return p >= Priority.High;
}

console.log("Is High priority:", isHighPriority(Priority.High));
console.log("Is Low priority high:", isHighPriority(Priority.Low));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-17-challenge",
      title: "Use Enums",
      description: "Create enums for an order management system.",
      starterCode: `// Create these enums:
// 1. OrderStatus: Pending, Processing, Shipped, Delivered, Cancelled (strings)
// 2. PaymentMethod: CreditCard, PayPal, BankTransfer (strings)

// Create Order interface using these enums

// Create function to check if order can be cancelled
// (only Pending and Processing orders can be cancelled)

// Test with sample orders`,
      solution: `enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

enum PaymentMethod {
  CreditCard = "credit_card",
  PayPal = "paypal",
  BankTransfer = "bank_transfer"
}

interface Order {
  id: number;
  status: OrderStatus;
  payment: PaymentMethod;
  total: number;
}

function canCancel(order: Order): boolean {
  return order.status === OrderStatus.Pending ||
         order.status === OrderStatus.Processing;
}

function cancelOrder(order: Order): Order | null {
  if (!canCancel(order)) {
    console.log(\`Cannot cancel order \${order.id} - status is \${order.status}\`);
    return null;
  }
  console.log(\`Cancelling order \${order.id}\`);
  return { ...order, status: OrderStatus.Cancelled };
}

// Test
const order1: Order = {
  id: 1,
  status: OrderStatus.Pending,
  payment: PaymentMethod.CreditCard,
  total: 99.99
};

const order2: Order = {
  id: 2,
  status: OrderStatus.Shipped,
  payment: PaymentMethod.PayPal,
  total: 149.99
};

console.log("Can cancel order 1:", canCancel(order1));
console.log("Can cancel order 2:", canCancel(order2));

cancelOrder(order1);
cancelOrder(order2);`,
      tests: [
        { name: "Has OrderStatus enum", test: `code.includes("enum OrderStatus")` },
        { name: "Has string values", test: `code.includes('= "pending"') || code.includes("= 'pending'")` },
        { name: "canCancel works", test: `output.includes("true") && output.includes("false")` },
      ],
      hints: [
        "String enum: Status = 'value'",
        "Use enum values in comparisons",
        "Interface properties can have enum types",
      ],
    },
  },
  {
    id: "ts-18",
    slug: "module-systems",
    title: "Module Systems",
    description: "ESM, CommonJS, and declaration files",
    order: 18,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Module Systems

TypeScript supports multiple module systems.

## ES Modules (ESM)

\`\`\`typescript
// Named exports
export const PI = 3.14;
export function add(a: number, b: number): number {
  return a + b;
}

// Default export
export default class Calculator {}

// Import
import Calculator, { PI, add } from './math';
import * as math from './math';
\`\`\`

## CommonJS

\`\`\`typescript
// Export
module.exports = { PI: 3.14 };
exports.add = (a, b) => a + b;

// Import
const math = require('./math');
const { PI } = require('./math');
\`\`\`

## TypeScript Configuration

\`\`\`json
{
  "compilerOptions": {
    "module": "ESNext",        // Output module format
    "moduleResolution": "node", // How to find modules
    "esModuleInterop": true    // CommonJS/ESM compatibility
  }
}
\`\`\`

## Re-exporting

\`\`\`typescript
// index.ts (barrel file)
export { User } from './user';
export { Product } from './product';
export * from './utils';
\`\`\`
    `,
    codeExamples: [
      {
        title: "Module patterns",
        code: `// Simulating module exports
const MathModule = {
  PI: 3.14159,
  E: 2.71828,

  add(a: number, b: number): number {
    return a + b;
  },

  multiply(a: number, b: number): number {
    return a * b;
  }
};

// Simulating named imports
const { PI, add } = MathModule;

console.log("PI:", PI);
console.log("add(2, 3):", add(2, 3));

// Type-only exports/imports pattern
interface User {
  id: number;
  name: string;
}

type CreateUserDTO = Omit<User, "id">;

// In real files:
// export type { User, CreateUserDTO };
// import type { User } from './types';

// Barrel export pattern
const UserModule = {
  User: {} as User,
  createUser: (dto: CreateUserDTO): User => ({
    id: Date.now(),
    ...dto
  })
};

const ProductModule = {
  Product: { id: 0, name: "", price: 0 },
  createProduct: (name: string, price: number) => ({
    id: Date.now(),
    name,
    price
  })
};

// Barrel (index) would export all
const Modules = {
  ...UserModule,
  ...ProductModule
};

console.log("User:", Modules.createUser({ name: "Alice" }));
console.log("Product:", Modules.createProduct("Widget", 9.99));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-18-challenge",
      title: "Organize Modules",
      description: "Create a modular structure for a library.",
      starterCode: `// Simulate a modular math library structure:

// 1. Create BasicMath object with add, subtract, multiply, divide
// 2. Create AdvancedMath object with power, sqrt, factorial
// 3. Create a MathLib object that combines both (like a barrel export)

// Each module should have proper types

// Test all functions`,
      solution: `// Basic math module
const BasicMath = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  },
  multiply(a: number, b: number): number {
    return a * b;
  },
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
};

// Advanced math module
const AdvancedMath = {
  power(base: number, exp: number): number {
    return Math.pow(base, exp);
  },
  sqrt(n: number): number {
    return Math.sqrt(n);
  },
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
};

// Barrel export - combines all modules
const MathLib = {
  ...BasicMath,
  ...AdvancedMath
};

// Type for the library
type MathLibrary = typeof MathLib;

// Test
console.log("add(5, 3):", MathLib.add(5, 3));
console.log("multiply(4, 7):", MathLib.multiply(4, 7));
console.log("power(2, 8):", MathLib.power(2, 8));
console.log("factorial(5):", MathLib.factorial(5));
console.log("sqrt(16):", MathLib.sqrt(16));`,
      tests: [
        { name: "Has BasicMath", test: `code.includes("BasicMath")` },
        { name: "Has AdvancedMath", test: `code.includes("AdvancedMath")` },
        { name: "Combines with spread", test: `code.includes("...BasicMath") || code.includes("...AdvancedMath")` },
      ],
      hints: [
        "Create objects with typed methods",
        "Use spread to combine objects",
        "typeof can capture object type",
      ],
    },
  },
  {
    id: "ts-19",
    slug: "declaration-files",
    title: "Declaration Files",
    description: "Create and use .d.ts files and module augmentation",
    order: 19,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Declaration Files

Declaration files (.d.ts) provide type information for JavaScript code.

## What Are Declaration Files?

They contain only type declarations, no implementations:

\`\`\`typescript
// math.d.ts
export function add(a: number, b: number): number;
export const PI: number;
\`\`\`

## Declaring Global Types

\`\`\`typescript
// global.d.ts
declare global {
  interface Window {
    myApp: MyAppType;
  }
}
\`\`\`

## Module Declarations

\`\`\`typescript
// For untyped modules
declare module 'untyped-lib' {
  export function doSomething(): void;
}

// Wildcard modules
declare module '*.svg' {
  const content: string;
  export default content;
}
\`\`\`

## @types Packages

Install types for libraries:
\`\`\`bash
npm install --save-dev @types/lodash
\`\`\`

## Module Augmentation

Extend existing modules:

\`\`\`typescript
// Extend express Request
declare module 'express' {
  interface Request {
    user?: User;
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Declaration patterns",
        code: `// Simulating declaration file concepts

// Type declarations (what would be in .d.ts)
interface MathOperations {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

interface MathConstants {
  PI: number;
  E: number;
}

type MathLib = MathOperations & MathConstants;

// Implementation (separate file in practice)
const mathLib: MathLib = {
  PI: 3.14159,
  E: 2.71828,
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

console.log("Using typed math lib:");
console.log("PI:", mathLib.PI);
console.log("2 + 3:", mathLib.add(2, 3));

// Module augmentation pattern
interface BaseUser {
  id: number;
  name: string;
}

// "Augmenting" with additional properties
interface AugmentedUser extends BaseUser {
  email: string;
  role: "admin" | "user";
}

const user: AugmentedUser = {
  id: 1,
  name: "Alice",
  email: "alice@test.com",
  role: "admin"
};

console.log("Augmented user:", user);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-19-challenge",
      title: "Create Type Declarations",
      description: "Write type declarations for a fictional library.",
      starterCode: `// Imagine a JavaScript library with these functions:
// - formatDate(date: Date, format: string): string
// - parseDate(dateString: string): Date
// - addDays(date: Date, days: number): Date
// - diffInDays(date1: Date, date2: Date): number

// 1. Create a DateLib interface with these function signatures
// 2. Create a mock implementation
// 3. Create a DateFormat union type for common formats

// Test the implementation`,
      solution: `// Format type
type DateFormat = "YYYY-MM-DD" | "MM/DD/YYYY" | "DD-MM-YYYY";

// Declaration interface
interface DateLib {
  formatDate(date: Date, format: string): string;
  parseDate(dateString: string): Date;
  addDays(date: Date, days: number): Date;
  diffInDays(date1: Date, date2: Date): number;
}

// Implementation
const dateLib: DateLib = {
  formatDate(date: Date, format: string): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    switch (format) {
      case "YYYY-MM-DD": return \`\${y}-\${m}-\${d}\`;
      case "MM/DD/YYYY": return \`\${m}/\${d}/\${y}\`;
      case "DD-MM-YYYY": return \`\${d}-\${m}-\${y}\`;
      default: return date.toISOString();
    }
  },

  parseDate(dateString: string): Date {
    return new Date(dateString);
  },

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  diffInDays(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
};

// Test
const now = new Date();
console.log("Formatted:", dateLib.formatDate(now, "YYYY-MM-DD"));

const future = dateLib.addDays(now, 7);
console.log("In 7 days:", dateLib.formatDate(future, "MM/DD/YYYY"));

console.log("Diff:", dateLib.diffInDays(now, future), "days");`,
      tests: [
        { name: "Has DateLib interface", test: `code.includes("interface DateLib")` },
        { name: "Has DateFormat type", test: `code.includes("type DateFormat")` },
        { name: "Implementation works", test: `output.includes("days")` },
      ],
      hints: [
        "Interface declares function signatures",
        "Implementation must match interface",
        "Union type for format strings",
      ],
    },
  },
  {
    id: "ts-20",
    slug: "strict-mode",
    title: "Strict Mode",
    description: "Enable strict type checking flags",
    order: 20,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `
# Strict Mode

Enable maximum type safety with strict compiler options.

## The strict Flag

Enables all strict type-checking options:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Individual Strict Flags

### strictNullChecks
\`\`\`typescript
// Without: string can be null/undefined
// With: must explicitly handle null
let name: string | null = null;
if (name) {
  console.log(name.toUpperCase());
}
\`\`\`

### noImplicitAny
\`\`\`typescript
// Error: Parameter 'x' implicitly has 'any' type
function log(x) { console.log(x); }

// Fix
function log(x: unknown) { console.log(x); }
\`\`\`

### strictFunctionTypes
Enables stricter function type checking.

### strictPropertyInitialization
\`\`\`typescript
class User {
  name: string; // Error! Not initialized
  age: number = 0; // OK
  email!: string; // OK - definitely assigned later
}
\`\`\`

## Other Useful Flags

\`\`\`json
{
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Strict mode patterns",
        code: `// strictNullChecks patterns

// Bad: might be null
function getLength(str: string | null): number {
  // return str.length; // Error in strict mode!
  return str?.length ?? 0; // Safe
}

console.log(getLength("hello"));
console.log(getLength(null));

// Definite assignment assertion
class User {
  name!: string; // Will be assigned later

  initialize(name: string) {
    this.name = name;
  }
}

const user = new User();
user.initialize("Alice");
console.log("User:", user.name);

// Non-null assertion (use carefully)
function processValue(value: string | null) {
  // We know it's not null here
  const upper = value!.toUpperCase(); // ! asserts non-null
  return upper;
}

// Better: type guard
function safeProcess(value: string | null): string {
  if (value === null) {
    return "default";
  }
  return value.toUpperCase();
}

console.log(safeProcess("hello"));
console.log(safeProcess(null));`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-20-challenge",
      title: "Handle Strict Mode",
      description: "Fix code to work with strict mode enabled.",
      starterCode: `// Fix these to work with strict mode

// 1. Fix: Parameter 'items' implicitly has 'any' type
function findFirst(items, predicate) {
  for (const item of items) {
    if (predicate(item)) return item;
  }
  return null;
}

// 2. Fix: Property not initialized
class Config {
  apiUrl;
  timeout;
  debug;
}

// 3. Fix: Object is possibly null
function getUpperName(user) {
  return user.name.toUpperCase();
}

// Test after fixing`,
      solution: `// 1. Add generic types
function findFirst<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | null {
  for (const item of items) {
    if (predicate(item)) return item;
  }
  return null;
}

// 2. Initialize properties
class Config {
  apiUrl: string = "";
  timeout: number = 5000;
  debug: boolean = false;

  constructor(options?: Partial<Config>) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

// 3. Handle null case
interface User {
  name: string;
}

function getUpperName(user: User | null): string {
  if (!user) {
    return "UNKNOWN";
  }
  return user.name.toUpperCase();
}

// Tests
const nums = [1, 2, 3, 4, 5];
console.log("First even:", findFirst(nums, n => n % 2 === 0));

const config = new Config({ apiUrl: "https://api.test.com" });
console.log("Config:", config);

console.log("Upper name:", getUpperName({ name: "alice" }));
console.log("Upper null:", getUpperName(null));`,
      tests: [
        { name: "findFirst has generic type", test: `code.includes("findFirst<T>")` },
        { name: "Config has defaults", test: `code.includes('apiUrl: string = ""') || code.includes("apiUrl: string =")` },
        { name: "Handles null", test: `output.includes("UNKNOWN")` },
      ],
      hints: [
        "Use generics for flexible typing",
        "Initialize class properties or use constructor",
        "Check for null before accessing properties",
      ],
    },
  },
  {
    id: "ts-21",
    slug: "error-handling-patterns",
    title: "Error Handling Patterns",
    description: "Result types, never type, and type-safe error handling",
    order: 21,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Error Handling Patterns

Type-safe approaches to handling errors.

## Result Type Pattern

Instead of throwing, return success or error:

\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}
\`\`\`

## The never Type

Represents values that never occur:

\`\`\`typescript
function throwError(msg: string): never {
  throw new Error(msg);
}

// Exhaustiveness checking
type Shape = "circle" | "square";
function getArea(shape: Shape): number {
  switch (shape) {
    case "circle": return Math.PI;
    case "square": return 1;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
\`\`\`

## Custom Error Types

\`\`\`typescript
class ValidationError extends Error {
  constructor(
    public field: string,
    message: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Result type pattern",
        code: `// Result type
type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Helper functions
function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Using Result type
function parseJSON<T>(json: string): Result<T> {
  try {
    return Ok(JSON.parse(json));
  } catch {
    return Err("Invalid JSON");
  }
}

function validateEmail(email: string): Result<string> {
  if (!email.includes("@")) {
    return Err("Invalid email format");
  }
  return Ok(email.toLowerCase());
}

// Chaining results
function processUser(json: string): Result<{ email: string }> {
  const parsed = parseJSON<{ email: string }>(json);
  if (!parsed.ok) return parsed;

  const validated = validateEmail(parsed.value.email);
  if (!validated.ok) return validated;

  return Ok({ email: validated.value });
}

// Test
const result1 = processUser('{"email": "ALICE@test.com"}');
console.log("Result 1:", result1);

const result2 = processUser('{"email": "invalid"}');
console.log("Result 2:", result2);

const result3 = processUser('invalid json');
console.log("Result 3:", result3);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-21-challenge",
      title: "Implement Result Pattern",
      description: "Create a type-safe validation system using Result types.",
      starterCode: `// Create Result<T, E> type
// Create Ok<T> and Err<E> helper functions

// Create validators that return Result:
// - validateAge(age: number): Result<number, string>
//   (must be 0-150)
// - validateUsername(name: string): Result<string, string>
//   (must be 3-20 chars, alphanumeric)

// Create validateUser that chains both validators

// Test with valid and invalid data`,
      solution: `type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function validateAge(age: number): Result<number> {
  if (age < 0 || age > 150) {
    return Err("Age must be between 0 and 150");
  }
  return Ok(age);
}

function validateUsername(name: string): Result<string> {
  if (name.length < 3 || name.length > 20) {
    return Err("Username must be 3-20 characters");
  }
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return Err("Username must be alphanumeric");
  }
  return Ok(name.toLowerCase());
}

interface User {
  username: string;
  age: number;
}

function validateUser(data: { username: string; age: number }): Result<User> {
  const usernameResult = validateUsername(data.username);
  if (!usernameResult.ok) return usernameResult;

  const ageResult = validateAge(data.age);
  if (!ageResult.ok) return ageResult;

  return Ok({
    username: usernameResult.value,
    age: ageResult.value
  });
}

// Test
console.log(validateUser({ username: "Alice123", age: 25 }));
console.log(validateUser({ username: "AB", age: 25 }));
console.log(validateUser({ username: "ValidUser", age: -5 }));`,
      tests: [
        { name: "Has Result type", test: `code.includes("type Result<T")` },
        { name: "Has Ok helper", test: `code.includes("function Ok")` },
        { name: "Validates correctly", test: `output.includes("ok") && output.includes("error")` },
      ],
      hints: [
        "Result is a discriminated union",
        "ok: true | false is the discriminant",
        "Return early on validation failure",
      ],
    },
  },
  {
    id: "ts-22",
    slug: "async-typescript",
    title: "Async TypeScript",
    description: "Type Promises and async functions correctly",
    order: 22,
    category: "TypeScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Async TypeScript

Properly type asynchronous code.

## Promise Types

\`\`\`typescript
// Explicit Promise type
function fetchData(): Promise<string> {
  return Promise.resolve("data");
}

// Async function - automatically returns Promise
async function fetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  return response.json();
}
\`\`\`

## Generic Async Functions

\`\`\`typescript
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

const user = await fetchJSON<User>("/api/user");
\`\`\`

## Promise Combinators

\`\`\`typescript
// Promise.all - array of results
const [user, posts] = await Promise.all([
  fetchUser(),   // Promise<User>
  fetchPosts()   // Promise<Post[]>
]); // [User, Post[]]

// Promise.race - first to complete
const result = await Promise.race([
  fetchFast(),   // Promise<string>
  fetchSlow()    // Promise<string>
]); // string
\`\`\`

## Error Handling

\`\`\`typescript
async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP error");
    return response.json();
  } catch {
    return null;
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Async patterns",
        code: `// Typed async functions
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

// Simulated API
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchUser(id: number): Promise<User> {
  await delay(50);
  return { id, name: \`User \${id}\` };
}

async function fetchUserPosts(userId: number): Promise<Post[]> {
  await delay(50);
  return [
    { id: 1, title: "Post 1", userId },
    { id: 2, title: "Post 2", userId }
  ];
}

// Generic fetch wrapper
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}

// Using Promise.all
async function getUserWithPosts(id: number): Promise<{
  user: User;
  posts: Post[];
}> {
  const user = await fetchUser(id);
  const posts = await fetchUserPosts(user.id);
  return { user, posts };
}

// Test
async function main() {
  const result = await getUserWithPosts(1);
  console.log("User:", result.user.name);
  console.log("Posts:", result.posts.length);
}

main();`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-22-challenge",
      title: "Type Async Operations",
      description: "Create a typed async data fetching service.",
      starterCode: `// Create types:
// - ApiResponse<T> = { data: T, status: number }
// - FetchOptions = { timeout?: number, retries?: number }

// Create async function:
// fetchWithRetry<T>(
//   fetcher: () => Promise<T>,
//   options?: FetchOptions
// ): Promise<T>

// It should:
// - Retry on failure up to options.retries times
// - Log each attempt

// Test with a mock fetcher`,
      solution: `type ApiResponse<T> = {
  data: T;
  status: number;
};

type FetchOptions = {
  timeout?: number;
  retries?: number;
};

async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  options: FetchOptions = {}
): Promise<T> {
  const { retries = 3 } = options;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(\`Attempt \${attempt} of \${retries}\`);
      const result = await fetcher();
      console.log("Success!");
      return result;
    } catch (error) {
      lastError = error as Error;
      console.log(\`Attempt \${attempt} failed: \${lastError.message}\`);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 100));
      }
    }
  }

  throw lastError;
}

// Mock fetcher that fails first 2 times
let attempts = 0;
const mockFetcher = async (): Promise<ApiResponse<string>> => {
  attempts++;
  if (attempts < 3) {
    throw new Error("Network error");
  }
  return { data: "Success data", status: 200 };
};

// Test
async function test() {
  try {
    const result = await fetchWithRetry(mockFetcher, { retries: 5 });
    console.log("Final result:", result);
  } catch (e) {
    console.log("All retries failed");
  }
}

test();`,
      tests: [
        { name: "Has ApiResponse type", test: `code.includes("type ApiResponse<T>")` },
        { name: "Has async function", test: `code.includes("async function fetchWithRetry")` },
        { name: "Retries work", test: `output.includes("Attempt 1") && output.includes("Success")` },
      ],
      hints: [
        "Use generic <T> for flexible return type",
        "Loop for retry attempts",
        "Catch and store last error",
      ],
    },
  },
];

// ============================================
// TYPESCRIPT ADVANCED (Lessons 23-30)
// ============================================

export const tsAdvanced: Lesson[] = [
  {
    id: "ts-23",
    slug: "advanced-generics",
    title: "Advanced Generics",
    description: "Recursive types, variadic tuples, and complex constraints",
    order: 23,
    category: "TypeScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Advanced Generics

Complex generic patterns for advanced type manipulation.

## Recursive Types

Types that reference themselves:

\`\`\`typescript
type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, 4]], 5];
\`\`\`

## Variadic Tuple Types

Tuples with variable length:

\`\`\`typescript
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]
\`\`\`

## Complex Constraints

\`\`\`typescript
type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T];

interface User {
  id: number;
  name: string;
  email: string;
}

type StringKeys = KeysMatching<User, string>; // "name" | "email"
\`\`\`

## Higher-Kinded Types Pattern

\`\`\`typescript
interface Functor<T> {
  map<U>(fn: (value: T) => U): Functor<U>;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Advanced generic patterns",
        code: `// Recursive JSON type
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  name: "Alice",
  age: 25,
  tags: ["dev", "js"],
  nested: {
    deep: {
      value: true
    }
  }
};

// Deep Partial - makes all nested properties optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: {
    host: string;
    port: number;
  };
  debug: boolean;
}

const partial: DeepPartial<Config> = {
  server: { port: 3000 } // host is optional
};

// Path type - get nested property paths
type Path<T, Key extends keyof T = keyof T> =
  Key extends string
    ? T[Key] extends object
      ? Key | \`\${Key}.\${Path<T[Key]>}\`
      : Key
    : never;

type ConfigPaths = Path<Config>;
// "server" | "debug" | "server.host" | "server.port"

console.log("Data:", JSON.stringify(data, null, 2));
console.log("Partial config:", partial);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-23-challenge",
      title: "Create Deep Readonly",
      description: "Create a DeepReadonly type that makes all nested properties readonly.",
      starterCode: `// Create DeepReadonly<T> that:
// - Makes all properties readonly
// - Recursively applies to nested objects
// - Handles arrays by making them readonly

interface User {
  name: string;
  settings: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  tags: string[];
}

// Test: all these should error with DeepReadonly
// user.name = "new";
// user.settings.theme = "dark";
// user.settings.notifications.email = false;
// user.tags.push("new");`,
      solution: `type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface User {
  name: string;
  settings: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  tags: string[];
}

const user: DeepReadonly<User> = {
  name: "Alice",
  settings: {
    theme: "light",
    notifications: {
      email: true,
      push: false
    }
  },
  tags: ["dev", "ts"]
};

// These would all error:
// user.name = "Bob";
// user.settings.theme = "dark";
// user.settings.notifications.email = false;
// user.tags.push("new");

console.log("User:", user.name);
console.log("Theme:", user.settings.theme);
console.log("Email notifications:", user.settings.notifications.email);
console.log("Tags:", user.tags);`,
      tests: [
        { name: "Has DeepReadonly type", test: `code.includes("type DeepReadonly<T>")` },
        { name: "Uses recursive mapping", test: `code.includes("DeepReadonly<T[P]>") || code.includes("DeepReadonly<U>")` },
        { name: "Works with nested", test: `output.includes("Theme:") && output.includes("light")` },
      ],
      hints: [
        "Use mapped type with readonly modifier",
        "Check if property extends object",
        "Handle arrays separately with infer",
      ],
    },
  },
  {
    id: "ts-24",
    slug: "template-literal-types",
    title: "Template Literal Types",
    description: "String manipulation at the type level",
    order: 24,
    category: "TypeScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `
# Template Literal Types

Manipulate string types with template literals.

## Basic Template Literals

\`\`\`typescript
type Greeting = \`Hello, \${string}\`;
// Matches: "Hello, World", "Hello, Alice", etc.

type EventName = \`on\${string}\`;
// Matches: "onClick", "onHover", etc.
\`\`\`

## With Union Types

\`\`\`typescript
type Size = "small" | "medium" | "large";
type Color = "red" | "blue";

type SizedColor = \`\${Size}-\${Color}\`;
// "small-red" | "small-blue" | "medium-red" | ...
\`\`\`

## Built-in String Utilities

\`\`\`typescript
Uppercase<"hello">   // "HELLO"
Lowercase<"HELLO">   // "hello"
Capitalize<"hello">  // "Hello"
Uncapitalize<"Hello"> // "hello"
\`\`\`

## Practical Patterns

\`\`\`typescript
// Event handlers
type Handler<E extends string> = \`on\${Capitalize<E>}\`;
type ClickHandler = Handler<"click">; // "onClick"

// CSS properties
type CSSProperty = \`\${string}-\${string}\`;
\`\`\`
    `,
    codeExamples: [
      {
        title: "Template literal patterns",
        code: `// Generate getter/setter types
type Getter<T extends string> = \`get\${Capitalize<T>}\`;
type Setter<T extends string> = \`set\${Capitalize<T>}\`;

type NameGetter = Getter<"name">; // "getName"
type NameSetter = Setter<"name">; // "setName"

// Event types
type EventType = "click" | "focus" | "blur" | "change";
type EventHandler = \`on\${Capitalize<EventType>}\`;
// "onClick" | "onFocus" | "onBlur" | "onChange"

// Create object type with getters
type WithGetters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = WithGetters<Person>;
// { getName: () => string; getAge: () => number; }

// Route patterns
type HttpMethod = "get" | "post" | "put" | "delete";
type Route = \`/api/\${string}\`;
type TypedRoute<M extends HttpMethod> = \`[\${Uppercase<M>}] \${Route}\`;

type GetRoute = TypedRoute<"get">;
// "[GET] /api/\${string}"

// Example usage
const routes: TypedRoute<HttpMethod>[] = [
  "[GET] /api/users",
  "[POST] /api/users",
  "[DELETE] /api/users/1"
];

console.log("Routes:", routes);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-24-challenge",
      title: "Type-Safe Event System",
      description: "Create a type-safe event emitter using template literals.",
      starterCode: `// Create types for an event system:
// 1. Event names: "click" | "hover" | "submit"
// 2. Handler type: \`on\${Capitalize<EventName>}\`
// 3. EventMap type that maps handler names to functions

// Create a typed EventEmitter with:
// - on(event, handler)
// - emit(event, data)

// The types should ensure only valid events are used`,
      solution: `type EventName = "click" | "hover" | "submit";
type HandlerName = \`on\${Capitalize<EventName>}\`;

type EventData = {
  click: { x: number; y: number };
  hover: { target: string };
  submit: { formData: Record<string, string> };
};

type EventHandlers = {
  [K in EventName as \`on\${Capitalize<K>}\`]: (data: EventData[K]) => void;
};

class EventEmitter {
  private handlers: Partial<EventHandlers> = {};

  on<K extends EventName>(
    event: K,
    handler: (data: EventData[K]) => void
  ): void {
    const key = \`on\${event.charAt(0).toUpperCase() + event.slice(1)}\` as keyof EventHandlers;
    this.handlers[key] = handler as any;
  }

  emit<K extends EventName>(event: K, data: EventData[K]): void {
    const key = \`on\${event.charAt(0).toUpperCase() + event.slice(1)}\` as keyof EventHandlers;
    const handler = this.handlers[key];
    if (handler) {
      (handler as (data: EventData[K]) => void)(data);
    }
  }
}

// Test
const emitter = new EventEmitter();

emitter.on("click", (data) => {
  console.log(\`Click at (\${data.x}, \${data.y})\`);
});

emitter.on("submit", (data) => {
  console.log("Form submitted:", data.formData);
});

emitter.emit("click", { x: 100, y: 200 });
emitter.emit("submit", { formData: { name: "Alice" } });`,
      tests: [
        { name: "Has EventName type", test: `code.includes("type EventName")` },
        { name: "Uses Capitalize", test: `code.includes("Capitalize<")` },
        { name: "EventEmitter works", test: `output.includes("Click at")` },
      ],
      hints: [
        "Use template literal with Capitalize",
        "Map event names to handler names",
        "Generic functions ensure type safety",
      ],
    },
  },
  {
    id: "ts-25",
    slug: "type-level-programming",
    title: "Type-Level Programming",
    description: "Complex type transformations and computations",
    order: 25,
    category: "TypeScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Type-Level Programming

Perform computations at the type level.

## Type-Level Conditionals

\`\`\`typescript
type If<C extends boolean, T, F> = C extends true ? T : F;

type A = If<true, "yes", "no">;  // "yes"
type B = If<false, "yes", "no">; // "no"
\`\`\`

## Type-Level Arrays

\`\`\`typescript
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type H = Head<[1, 2, 3]>;  // 1
type T = Tail<[1, 2, 3]>;  // [2, 3]
type L = Last<[1, 2, 3]>;  // 3
\`\`\`

## Type-Level Length

\`\`\`typescript
type Length<T extends any[]> = T["length"];

type Len = Length<[1, 2, 3]>; // 3
\`\`\`

## Type-Level Equality

\`\`\`typescript
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
\`\`\`
    `,
    codeExamples: [
      {
        title: "Type-level operations",
        code: `// Type-level array operations
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Rest<T extends any[]> = T extends [any, ...infer R] ? R : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type F = First<[1, 2, 3]>;  // 1
type R = Rest<[1, 2, 3]>;   // [2, 3]
type L = Last<[1, 2, 3]>;   // 3

// Type-level includes
type Includes<T extends any[], U> =
  T extends [infer First, ...infer Rest]
    ? First extends U
      ? true
      : Includes<Rest, U>
    : false;

type HasTwo = Includes<[1, 2, 3], 2>;   // true
type HasFour = Includes<[1, 2, 3], 4>;  // false

// Type-level push
type Push<T extends any[], V> = [...T, V];
type Pushed = Push<[1, 2], 3>;  // [1, 2, 3]

// Type-level filter (simplified)
type FilterNever<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends never
      ? FilterNever<Rest>
      : [First, ...FilterNever<Rest>]
    : [];

// Flatten type (one level)
type Flatten<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? [...First, ...Flatten<Rest>]
      : [First, ...Flatten<Rest>]
    : [];

type Flat = Flatten<[[1, 2], [3, 4]]>;  // [1, 2, 3, 4]

console.log("Type-level operations defined");
console.log("These work at compile time!");`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-25-challenge",
      title: "Type-Level Tuple Operations",
      description: "Implement type-level Reverse and Concat for tuples.",
      starterCode: `// Implement these type-level operations:

// 1. Reverse<T> - reverses a tuple type
// type A = Reverse<[1, 2, 3]>; // [3, 2, 1]

// 2. Concat<T, U> - concatenates two tuples
// type B = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// 3. Take<T, N> - takes first N elements (bonus)
// type C = Take<[1, 2, 3, 4], 2>; // [1, 2]

// Test your types`,
      solution: `// Reverse a tuple
type Reverse<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

type Rev = Reverse<[1, 2, 3]>;  // [3, 2, 1]

// Concat two tuples
type Concat<T extends any[], U extends any[]> = [...T, ...U];

type Con = Concat<[1, 2], [3, 4]>;  // [1, 2, 3, 4]

// Take first N elements
type Take<T extends any[], N extends number, R extends any[] = []> =
  R["length"] extends N
    ? R
    : T extends [infer First, ...infer Rest]
    ? Take<Rest, N, [...R, First]>
    : R;

type Taken = Take<[1, 2, 3, 4, 5], 3>;  // [1, 2, 3]

// Test at runtime (types are compile-time only)
const reversed: Reverse<[1, 2, 3]> = [3, 2, 1];
const concatenated: Concat<["a", "b"], ["c", "d"]> = ["a", "b", "c", "d"];
const taken: Take<[1, 2, 3, 4], 2> = [1, 2];

console.log("Reversed:", reversed);
console.log("Concatenated:", concatenated);
console.log("Taken:", taken);`,
      tests: [
        { name: "Has Reverse type", test: `code.includes("type Reverse<T")` },
        { name: "Has Concat type", test: `code.includes("type Concat<T")` },
        { name: "Uses recursive types", test: `code.includes("Reverse<Rest>")` },
      ],
      hints: [
        "Use recursive conditional types",
        "Pattern match with infer",
        "Build result with spread [...R, First]",
      ],
    },
  },
];

// ============================================
// TYPESCRIPT PROJECTS (Lessons 31-33)
// ============================================

export const tsProjects: Lesson[] = [
  {
    id: "ts-31",
    slug: "project-type-safe-api-client",
    title: "Project: Type-Safe API Client",
    description: "Build a fully typed API client with generics and error handling",
    order: 31,
    category: "TypeScript Projects",
    difficulty: "advanced",
    estimatedMinutes: 60,
    content: `
# Project: Type-Safe API Client

Build an API client with complete type safety.

## Features

1. Typed endpoints
2. Request/response validation
3. Error handling with Result type
4. Request interceptors
5. Response transformers

## Architecture

\`\`\`typescript
interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

interface Endpoint<Req, Res> {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

class ApiClient {
  constructor(config: ApiConfig);
  request<Req, Res>(endpoint: Endpoint<Req, Res>, data?: Req): Promise<Result<Res>>;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Type-safe API client",
        code: `// Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

interface Endpoint<TReq = void, TRes = void> {
  path: string;
  method: HttpMethod;
}

interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

// API Client
class ApiClient {
  constructor(private config: ApiConfig) {}

  async request<TReq, TRes>(
    endpoint: Endpoint<TReq, TRes>,
    data?: TReq
  ): Promise<Result<TRes>> {
    const url = \`\${this.config.baseUrl}\${endpoint.path}\`;

    console.log(\`\${endpoint.method} \${url}\`);
    if (data) console.log("Data:", data);

    // Simulated response
    await new Promise(r => setTimeout(r, 50));
    return {
      ok: true,
      data: { success: true } as unknown as TRes
    };
  }
}

// Define typed endpoints
interface User {
  id: number;
  name: string;
  email: string;
}

type CreateUserReq = Omit<User, "id">;
type CreateUserRes = User;

const endpoints = {
  getUser: {
    path: "/users/:id",
    method: "GET" as const
  } as Endpoint<void, User>,

  createUser: {
    path: "/users",
    method: "POST" as const
  } as Endpoint<CreateUserReq, CreateUserRes>,

  deleteUser: {
    path: "/users/:id",
    method: "DELETE" as const
  } as Endpoint<void, void>
};

// Usage
const api = new ApiClient({
  baseUrl: "https://api.example.com",
  headers: { "Authorization": "Bearer token" }
});

async function demo() {
  const result = await api.request(endpoints.createUser, {
    name: "Alice",
    email: "alice@test.com"
  });

  if (result.ok) {
    console.log("Created:", result.data);
  }
}

demo();`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-31-challenge",
      title: "Build Typed API Client",
      description: "Create a type-safe API client with the given interfaces.",
      starterCode: `// Given types
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

// Create:
// 1. Result<T> type for success/error handling
// 2. ApiClient class with get<T> and post<T, R> methods
// 3. Type-safe endpoint definitions

// Usage should look like:
// const user = await api.get<User>("/users/1");
// const newPost = await api.post<CreatePost, Post>("/posts", { ... });`,
      solution: `// Result type
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// Interfaces
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

type CreatePost = Omit<Post, "id">;

// API Client
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<Result<T>> {
    console.log(\`GET \${this.baseUrl}\${path}\`);
    await new Promise(r => setTimeout(r, 50));

    // Simulated response
    return {
      ok: true,
      data: { id: 1, name: "Alice" } as unknown as T
    };
  }

  async post<TReq, TRes>(path: string, data: TReq): Promise<Result<TRes>> {
    console.log(\`POST \${this.baseUrl}\${path}\`);
    console.log("Body:", data);
    await new Promise(r => setTimeout(r, 50));

    return {
      ok: true,
      data: { id: 1, ...data } as unknown as TRes
    };
  }
}

// Usage
async function main() {
  const api = new ApiClient("https://api.example.com");

  const userResult = await api.get<User>("/users/1");
  if (userResult.ok) {
    console.log("User:", userResult.data.name);
  }

  const postResult = await api.post<CreatePost, Post>("/posts", {
    title: "Hello",
    userId: 1
  });
  if (postResult.ok) {
    console.log("Post:", postResult.data.title);
  }
}

main();`,
      tests: [
        { name: "Has Result type", test: `code.includes("type Result<T>")` },
        { name: "Has generic methods", test: `code.includes("get<T>") && code.includes("post<TReq")` },
        { name: "Works correctly", test: `output.includes("User:") && output.includes("Post:")` },
      ],
      hints: [
        "Result type is a discriminated union",
        "Use generics for request/response types",
        "Return Result from all methods",
      ],
    },
  },
  {
    id: "ts-32",
    slug: "project-state-management",
    title: "Project: State Management Library",
    description: "Build a type-safe state management library with pub/sub",
    order: 32,
    category: "TypeScript Projects",
    difficulty: "advanced",
    estimatedMinutes: 60,
    content: `
# Project: State Management Library

Create a Redux-like state manager with full type safety.

## Features

1. Typed state and actions
2. Subscribe to state changes
3. Middleware support
4. Derived state (selectors)
5. Time-travel debugging

## Core Concepts

\`\`\`typescript
interface Store<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: (state: S) => void): () => void;
}

type Reducer<S, A> = (state: S, action: A) => S;
\`\`\`
    `,
    codeExamples: [
      {
        title: "State management implementation",
        code: `// Types
type Listener<S> = (state: S) => void;
type Unsubscribe = () => void;
type Reducer<S, A> = (state: S, action: A) => S;

// Store implementation
class Store<S, A extends { type: string }> {
  private state: S;
  private listeners: Set<Listener<S>> = new Set();

  constructor(
    private reducer: Reducer<S, A>,
    initialState: S
  ) {
    this.state = initialState;
  }

  getState(): S {
    return this.state;
  }

  dispatch(action: A): void {
    console.log("Dispatch:", action.type);
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: Listener<S>): Unsubscribe {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// Example usage
interface TodoState {
  todos: { id: number; text: string; done: boolean }[];
  filter: "all" | "active" | "done";
}

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "SET_FILTER"; filter: TodoState["filter"] };

const todoReducer: Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          done: false
        }]
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, done: !t.done } : t
        )
      };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

const store = new Store(todoReducer, { todos: [], filter: "all" });

store.subscribe(state => {
  console.log("State updated:", state.todos.length, "todos");
});

store.dispatch({ type: "ADD_TODO", text: "Learn TypeScript" });
store.dispatch({ type: "ADD_TODO", text: "Build project" });
store.dispatch({ type: "TOGGLE_TODO", id: store.getState().todos[0].id });

console.log("Final state:", store.getState());`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-32-challenge",
      title: "Build State Store",
      description: "Create a type-safe store with selectors.",
      starterCode: `// Create a Store class with:
// - getState(): S
// - dispatch(action: A): void
// - subscribe(listener): unsubscribe
// - select<R>(selector: (state: S) => R): R

// Create a counter example with:
// - State: { count: number }
// - Actions: INCREMENT, DECREMENT, SET

// Test all features`,
      solution: `type Listener<S> = (state: S) => void;
type Reducer<S, A> = (state: S, action: A) => S;

class Store<S, A extends { type: string }> {
  private state: S;
  private listeners = new Set<Listener<S>>();

  constructor(
    private reducer: Reducer<S, A>,
    initialState: S
  ) {
    this.state = initialState;
  }

  getState(): S {
    return this.state;
  }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(l => l(this.state));
  }

  subscribe(listener: Listener<S>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  select<R>(selector: (state: S) => R): R {
    return selector(this.state);
  }
}

// Counter example
interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; value: number };

const counterReducer: Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    case "SET": return { count: action.value };
    default: return state;
  }
};

const store = new Store(counterReducer, { count: 0 });

const unsubscribe = store.subscribe(state => {
  console.log("Count changed:", state.count);
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "SET", value: 10 });
store.dispatch({ type: "DECREMENT" });

console.log("Final count:", store.select(s => s.count));
console.log("Is positive:", store.select(s => s.count > 0));`,
      tests: [
        { name: "Has Store class", test: `code.includes("class Store<S, A")` },
        { name: "Has select method", test: `code.includes("select<R>")` },
        { name: "Works correctly", test: `output.includes("9") || output.includes("Final count")` },
      ],
      hints: [
        "Store takes reducer and initial state",
        "dispatch updates state and notifies listeners",
        "select applies selector function to state",
      ],
    },
  },
  {
    id: "ts-33",
    slug: "project-cli-tool",
    title: "Project: CLI Tool",
    description: "Build a command-line tool with typed arguments",
    order: 33,
    category: "TypeScript Projects",
    difficulty: "advanced",
    estimatedMinutes: 60,
    content: `
# Project: CLI Tool

Build a type-safe command-line interface tool.

## Features

1. Typed command definitions
2. Argument parsing
3. Help generation
4. Validation
5. Subcommands

## Architecture

\`\`\`typescript
interface Command<T> {
  name: string;
  description: string;
  options: OptionDefinition[];
  handler: (args: T) => void | Promise<void>;
}

interface OptionDefinition {
  name: string;
  alias?: string;
  type: "string" | "number" | "boolean";
  required?: boolean;
  default?: unknown;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "CLI implementation",
        code: `// Types
type OptionType = "string" | "number" | "boolean";

interface Option {
  name: string;
  alias?: string;
  type: OptionType;
  description: string;
  required?: boolean;
  default?: unknown;
}

interface Command<T = Record<string, unknown>> {
  name: string;
  description: string;
  options: Option[];
  handler: (args: T) => void;
}

// CLI class
class CLI {
  private commands = new Map<string, Command>();

  register<T>(command: Command<T>): this {
    this.commands.set(command.name, command as Command);
    return this;
  }

  parse(args: string[]): { command: string; options: Record<string, unknown> } {
    const [command, ...rest] = args;
    const options: Record<string, unknown> = {};

    for (let i = 0; i < rest.length; i++) {
      const arg = rest[i];
      if (arg.startsWith("--")) {
        const key = arg.slice(2);
        const value = rest[i + 1];
        options[key] = value ?? true;
        if (value && !value.startsWith("-")) i++;
      }
    }

    return { command, options };
  }

  run(args: string[]): void {
    const { command: cmdName, options } = this.parse(args);
    const command = this.commands.get(cmdName);

    if (!command) {
      console.log(\`Unknown command: \${cmdName}\`);
      this.showHelp();
      return;
    }

    // Apply defaults
    for (const opt of command.options) {
      if (options[opt.name] === undefined && opt.default !== undefined) {
        options[opt.name] = opt.default;
      }
    }

    command.handler(options);
  }

  showHelp(): void {
    console.log("\\nAvailable commands:");
    this.commands.forEach(cmd => {
      console.log(\`  \${cmd.name} - \${cmd.description}\`);
    });
  }
}

// Example usage
interface GreetArgs {
  name: string;
  loud: boolean;
}

const cli = new CLI();

cli.register<GreetArgs>({
  name: "greet",
  description: "Greet someone",
  options: [
    { name: "name", type: "string", description: "Name to greet", required: true },
    { name: "loud", type: "boolean", description: "Shout the greeting", default: false }
  ],
  handler: (args) => {
    let msg = \`Hello, \${args.name}!\`;
    if (args.loud) msg = msg.toUpperCase();
    console.log(msg);
  }
});

// Simulate CLI calls
cli.run(["greet", "--name", "Alice"]);
cli.run(["greet", "--name", "Bob", "--loud"]);`,
        language: "typescript",
      },
    ],
    challenge: {
      id: "ts-33-challenge",
      title: "Build CLI Parser",
      description: "Create a type-safe argument parser for CLI tools.",
      starterCode: `// Create an ArgumentParser class with:
// - define<T>(name, options): defines expected arguments
// - parse(args: string[]): T - parses and returns typed result
// - help(): string - generates help text

// Options should support:
// - type: "string" | "number" | "boolean"
// - required: boolean
// - default: value

// Test with sample arguments`,
      solution: `type ArgType = "string" | "number" | "boolean";

interface ArgDef {
  name: string;
  type: ArgType;
  required?: boolean;
  default?: unknown;
  description?: string;
}

class ArgumentParser<T extends Record<string, unknown> = {}> {
  private definitions: ArgDef[] = [];

  define<K extends string, V extends ArgType>(
    name: K,
    options: { type: V; required?: boolean; default?: unknown; description?: string }
  ): ArgumentParser<T & Record<K, V extends "string" ? string : V extends "number" ? number : boolean>> {
    this.definitions.push({ name, ...options });
    return this as any;
  }

  parse(args: string[]): T {
    const result: Record<string, unknown> = {};

    // Apply defaults first
    for (const def of this.definitions) {
      if (def.default !== undefined) {
        result[def.name] = def.default;
      }
    }

    // Parse args
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith("--")) {
        const name = args[i].slice(2);
        const def = this.definitions.find(d => d.name === name);

        if (def) {
          if (def.type === "boolean") {
            result[name] = true;
          } else {
            const value = args[++i];
            result[name] = def.type === "number" ? Number(value) : value;
          }
        }
      }
    }

    // Check required
    for (const def of this.definitions) {
      if (def.required && result[def.name] === undefined) {
        throw new Error(\`Missing required argument: --\${def.name}\`);
      }
    }

    return result as T;
  }

  help(): string {
    let text = "Options:\\n";
    for (const def of this.definitions) {
      const req = def.required ? " (required)" : "";
      const dflt = def.default !== undefined ? \` [default: \${def.default}]\` : "";
      text += \`  --\${def.name} <\${def.type}>\${req}\${dflt}\\n\`;
    }
    return text;
  }
}

// Usage
const parser = new ArgumentParser()
  .define("name", { type: "string", required: true, description: "User name" })
  .define("age", { type: "number", default: 0 })
  .define("verbose", { type: "boolean", default: false });

console.log(parser.help());

const args1 = parser.parse(["--name", "Alice", "--age", "25", "--verbose"]);
console.log("Parsed:", args1);

const args2 = parser.parse(["--name", "Bob"]);
console.log("With defaults:", args2);`,
      tests: [
        { name: "Has ArgumentParser class", test: `code.includes("class ArgumentParser")` },
        { name: "Has define method", test: `code.includes("define<K")` },
        { name: "Parses correctly", test: `output.includes("Alice") && output.includes("25")` },
      ],
      hints: [
        "Use generics to build up the result type",
        "Parse -- prefixed arguments",
        "Convert values based on type",
      ],
    },
  },
];

// Export all TypeScript lessons combined
export const allTypescriptLessons: Lesson[] = [
  ...tsFundamentals,
  ...tsIntermediate,
  ...tsAdvanced,
  ...tsProjects,
];
