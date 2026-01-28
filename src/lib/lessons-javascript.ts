import { Lesson } from "./lessons";

// ============================================
// JAVASCRIPT FUNDAMENTALS (Lessons 1-12)
// ============================================

export const jsFundamentals: Lesson[] = [
  {
    id: "js-1",
    slug: "hello-world",
    title: "Hello World & Setup",
    description: "Write your first JavaScript program and set up your development environment",
    order: 1,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 15,
    content: `
# Hello World & Setup

Welcome to JavaScript! In this lesson, you'll write your first program and learn how to use the browser's developer tools.

## What is JavaScript?

JavaScript is the programming language of the web. It runs in every browser and can also run on servers with Node.js. It's used to:
- Make websites interactive
- Build web applications
- Create mobile apps
- Build server-side applications

## Your First Program

The simplest way to output text in JavaScript is with \`console.log()\`:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

This prints "Hello, World!" to the console. The console is a tool built into every browser where you can see output and errors.

## Using the Browser Console

1. Open any webpage
2. Press F12 (or Cmd+Option+J on Mac)
3. Click the "Console" tab
4. Type \`console.log("Hello!")\` and press Enter

## Multiple Values

You can print multiple values separated by commas:

\`\`\`javascript
console.log("Name:", "Alice");
console.log("Age:", 25);
console.log("2 + 2 =", 2 + 2);
\`\`\`

## Adding JavaScript to HTML

There are two ways to add JavaScript to a webpage:

**Inline (in HTML file):**
\`\`\`html
<script>
  console.log("Hello from inline script!");
</script>
\`\`\`

**External file (recommended):**
\`\`\`html
<script src="app.js"></script>
\`\`\`

## Best Practices

- Always end statements with semicolons (;)
- Use descriptive messages in console.log for debugging
- Remove console.log statements before deploying to production
    `,
    codeExamples: [
      {
        title: "Basic console.log examples",
        code: `// Print a simple message
console.log("Hello, World!");

// Print multiple values
console.log("My name is", "Alice");

// Print numbers and calculations
console.log("The answer is:", 42);
console.log("5 + 3 =", 5 + 3);

// Print different data types
console.log("String:", "hello");
console.log("Number:", 123);
console.log("Boolean:", true);`,
        language: "javascript",
      },
      {
        title: "Other console methods",
        code: `// Regular log
console.log("Normal message");

// Warning (yellow)
console.warn("This is a warning!");

// Error (red)
console.error("Something went wrong!");

// Info
console.info("Information message");

// Table for arrays/objects
console.table(["apple", "banana", "cherry"]);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-1-challenge",
      title: "Say Hello!",
      description: "Print 'Hello, World!' to the console, then print your name on a separate line.",
      starterCode: `// Print "Hello, World!" on the first line
// Print your name on the second line
`,
      solution: `console.log("Hello, World!");
console.log("Alice");`,
      tests: [
        { name: "Prints Hello, World!", test: `output.includes("Hello, World!")` },
        { name: "Has two console.log statements", test: `(code.match(/console\\.log/g) || []).length >= 2` },
      ],
      hints: ["Use console.log() to print text", "Put text inside quotes", "Call console.log twice for two lines"],
    },
  },
  {
    id: "js-2",
    slug: "variables-data-types",
    title: "Variables & Data Types",
    description: "Learn to store and manage data with let, const, and understand primitive types",
    order: 2,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Variables & Data Types

Variables are containers for storing data. Think of them as labeled boxes where you can put information.

## Declaring Variables

JavaScript has three ways to declare variables:

### let - For values that change
\`\`\`javascript
let score = 0;
score = 10;  // Can be reassigned
score = 20;  // Can change again
\`\`\`

### const - For values that don't change
\`\`\`javascript
const PI = 3.14159;
const APP_NAME = "MyApp";
// PI = 3.14;  // Error! Cannot reassign const
\`\`\`

### var - Old way (avoid using)
\`\`\`javascript
var oldWay = "don't use this";
\`\`\`

## Primitive Data Types

JavaScript has 7 primitive data types:

| Type | Example | Description |
|------|---------|-------------|
| String | \`"Hello"\` | Text |
| Number | \`42\`, \`3.14\` | Integers and decimals |
| Boolean | \`true\`, \`false\` | Logical values |
| Undefined | \`undefined\` | Not yet assigned |
| Null | \`null\` | Intentionally empty |
| Symbol | \`Symbol('id')\` | Unique identifier |
| BigInt | \`9007199254740991n\` | Large integers |

## The typeof Operator

Check a variable's type with \`typeof\`:

\`\`\`javascript
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (historical bug!)
\`\`\`

## Naming Conventions

- Use **camelCase**: \`firstName\`, \`totalPrice\`, \`isLoggedIn\`
- Start with a letter, \`_\`, or \`$\`
- Be descriptive: \`userAge\` not \`x\`
- Constants in UPPER_SNAKE_CASE: \`MAX_SIZE\`, \`API_KEY\`
    `,
    codeExamples: [
      {
        title: "Variable declarations",
        code: `// Using let for values that change
let userName = "Alice";
let userAge = 25;
let isLoggedIn = false;

console.log("User:", userName);
console.log("Age:", userAge);

// Reassigning let variables
userName = "Bob";
userAge = 26;
isLoggedIn = true;

console.log("Updated user:", userName);

// Using const for constants
const MAX_USERS = 100;
const API_URL = "https://api.example.com";

console.log("Max users:", MAX_USERS);`,
        language: "javascript",
      },
      {
        title: "Data types in action",
        code: `// String
let greeting = "Hello, World!";
let name = 'Alice';  // Single quotes work too

// Number (integers and decimals)
let age = 25;
let price = 19.99;
let negative = -10;

// Boolean
let isActive = true;
let hasPermission = false;

// Undefined (declared but not assigned)
let notYetSet;
console.log(notYetSet);  // undefined

// Null (intentionally empty)
let emptyValue = null;

// Check types
console.log("Type of greeting:", typeof greeting);
console.log("Type of age:", typeof age);
console.log("Type of isActive:", typeof isActive);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-2-challenge",
      title: "Create Variables",
      description: "Create three variables: a string 'name', a number 'age', and a boolean 'isStudent'. Then print them all using console.log.",
      starterCode: `// Create a variable 'name' with your name (string)
// Create a variable 'age' with your age (number)
// Create a variable 'isStudent' (boolean)
// Print all three variables
`,
      solution: `const name = "Alice";
const age = 25;
const isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is student:", isStudent);`,
      tests: [
        { name: "Uses let or const", test: `code.includes("let") || code.includes("const")` },
        { name: "Has a string variable", test: `code.includes('"') || code.includes("'")` },
        { name: "Has a number", test: `/\\d+/.test(code)` },
        { name: "Has a boolean", test: `code.includes("true") || code.includes("false")` },
        { name: "Outputs values", test: `output.length > 0` },
      ],
      hints: [
        "Use const name = 'Your Name'",
        "Numbers don't need quotes: const age = 25",
        "Booleans are true or false without quotes",
      ],
    },
  },
  {
    id: "js-3",
    slug: "operators",
    title: "Operators",
    description: "Master arithmetic, comparison, logical, and assignment operators",
    order: 3,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Operators

Operators perform operations on values. JavaScript has several types of operators.

## Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 5 - 3 | 2 |
| * | Multiplication | 5 * 3 | 15 |
| / | Division | 15 / 3 | 5 |
| % | Modulo (remainder) | 17 % 5 | 2 |
| ** | Exponent | 2 ** 3 | 8 |

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| === | Strictly equal | 5 === 5 → true |
| !== | Not equal | 5 !== 3 → true |
| > | Greater than | 5 > 3 → true |
| < | Less than | 5 < 3 → false |
| >= | Greater or equal | 5 >= 5 → true |
| <= | Less or equal | 3 <= 5 → true |

**Important:** Always use \`===\` (strict equality) instead of \`==\` (loose equality).

\`\`\`javascript
5 == "5"   // true (type coercion - avoid!)
5 === "5"  // false (different types)
\`\`\`

## Logical Operators

| Operator | Name | Description |
|----------|------|-------------|
| && | AND | Both must be true |
| \\|\\| | OR | At least one must be true |
| ! | NOT | Inverts the boolean |

\`\`\`javascript
true && true   // true
true && false  // false
true || false  // true
!true          // false
\`\`\`

## Assignment Operators

| Operator | Example | Same As |
|----------|---------|---------|
| = | x = 5 | x = 5 |
| += | x += 3 | x = x + 3 |
| -= | x -= 3 | x = x - 3 |
| *= | x *= 3 | x = x * 3 |
| /= | x /= 3 | x = x / 3 |
| ++ | x++ | x = x + 1 |
| -- | x-- | x = x - 1 |
    `,
    codeExamples: [
      {
        title: "Arithmetic operations",
        code: `let a = 10;
let b = 3;

console.log("Addition:", a + b);        // 13
console.log("Subtraction:", a - b);     // 7
console.log("Multiplication:", a * b);  // 30
console.log("Division:", a / b);        // 3.333...
console.log("Modulo:", a % b);          // 1
console.log("Exponent:", a ** 2);       // 100

// Increment and decrement
let count = 5;
count++;  // Now 6
console.log("After ++:", count);

count--;  // Back to 5
console.log("After --:", count);`,
        language: "javascript",
      },
      {
        title: "Comparison and logical",
        code: `let age = 25;
let hasLicense = true;

// Comparisons
console.log("Is adult:", age >= 18);        // true
console.log("Is exactly 25:", age === 25);  // true
console.log("Is not 30:", age !== 30);      // true

// Logical operators
let canDrive = age >= 16 && hasLicense;
console.log("Can drive:", canDrive);  // true

let isMinor = age < 18;
let needsSupervision = isMinor || !hasLicense;
console.log("Needs supervision:", needsSupervision);  // false

// Combining conditions
let score = 85;
let passed = score >= 60;
let excellent = score >= 90;
console.log("Passed:", passed);      // true
console.log("Excellent:", excellent); // false`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-3-challenge",
      title: "Calculator Operations",
      description: "Given two numbers (15 and 4), calculate and print their sum, difference, product, quotient, and remainder.",
      starterCode: `const a = 15;
const b = 4;

// Calculate and print:
// 1. Sum (a + b)
// 2. Difference (a - b)
// 3. Product (a * b)
// 4. Quotient (a / b)
// 5. Remainder (a % b)
`,
      solution: `const a = 15;
const b = 4;

console.log("Sum:", a + b);
console.log("Difference:", a - b);
console.log("Product:", a * b);
console.log("Quotient:", a / b);
console.log("Remainder:", a % b);`,
      tests: [
        { name: "Shows sum (19)", test: `output.includes("19")` },
        { name: "Shows difference (11)", test: `output.includes("11")` },
        { name: "Shows product (60)", test: `output.includes("60")` },
        { name: "Shows remainder (3)", test: `output.includes("3")` },
      ],
      hints: [
        "Use + for addition",
        "Use - for subtraction",
        "Use * for multiplication",
        "Use / for division",
        "Use % for remainder",
      ],
    },
  },
  {
    id: "js-4",
    slug: "strings",
    title: "Strings",
    description: "Work with text using string methods and template literals",
    order: 4,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Strings

Strings are sequences of characters used to represent text.

## Creating Strings

\`\`\`javascript
// Three ways to create strings
let single = 'Hello';
let double = "World";
let backtick = \`Hello World\`;  // Template literal
\`\`\`

## String Properties and Methods

### Length
\`\`\`javascript
let str = "Hello";
console.log(str.length);  // 5
\`\`\`

### Common Methods

| Method | Description | Example |
|--------|-------------|---------|
| toUpperCase() | Convert to uppercase | "hello".toUpperCase() → "HELLO" |
| toLowerCase() | Convert to lowercase | "HELLO".toLowerCase() → "hello" |
| trim() | Remove whitespace | "  hi  ".trim() → "hi" |
| includes() | Check if contains | "hello".includes("ell") → true |
| startsWith() | Check start | "hello".startsWith("he") → true |
| endsWith() | Check end | "hello".endsWith("lo") → true |
| indexOf() | Find position | "hello".indexOf("l") → 2 |
| slice() | Extract portion | "hello".slice(1, 4) → "ell" |
| split() | Split into array | "a,b,c".split(",") → ["a","b","c"] |
| replace() | Replace text | "hello".replace("l", "L") → "heLlo" |

## Template Literals

Use backticks (\`) for powerful string features:

\`\`\`javascript
let name = "Alice";
let age = 25;

// String interpolation
let message = \`Hello, \${name}! You are \${age} years old.\`;

// Expressions in templates
let price = 10;
let quantity = 3;
console.log(\`Total: $\${price * quantity}\`);  // Total: $30

// Multi-line strings
let poem = \`
  Roses are red,
  Violets are blue,
  JavaScript is awesome,
  And so are you!
\`;
\`\`\`

## String Concatenation

\`\`\`javascript
// Using + operator
let greeting = "Hello" + " " + "World";

// Using template literals (preferred)
let name = "Alice";
let greeting2 = \`Hello \${name}\`;
\`\`\`
    `,
    codeExamples: [
      {
        title: "String methods",
        code: `let text = "  Hello, JavaScript World!  ";

// Clean up and transform
console.log("Original:", text);
console.log("Trimmed:", text.trim());
console.log("Uppercase:", text.toUpperCase());
console.log("Lowercase:", text.toLowerCase());

// Search and check
let clean = text.trim();
console.log("Length:", clean.length);
console.log("Includes 'Java':", clean.includes("Java"));
console.log("Starts with 'Hello':", clean.startsWith("Hello"));
console.log("Index of 'World':", clean.indexOf("World"));

// Extract and modify
console.log("First 5 chars:", clean.slice(0, 5));
console.log("Replace:", clean.replace("World", "Universe"));`,
        language: "javascript",
      },
      {
        title: "Template literals",
        code: `// Variables
const firstName = "Alice";
const lastName = "Smith";
const age = 28;
const job = "Developer";

// String interpolation
const intro = \`My name is \${firstName} \${lastName}.\`;
console.log(intro);

// Expressions in templates
const birthYear = 2024 - age;
console.log(\`I was born in \${birthYear}.\`);

// Multi-line strings
const card = \`
Name: \${firstName} \${lastName}
Age: \${age}
Job: \${job}
\`;
console.log(card);

// Combining with methods
const email = "ALICE@EXAMPLE.COM";
console.log(\`Contact: \${email.toLowerCase()}\`);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-4-challenge",
      title: "String Manipulation",
      description: "Given the string '  javascript is AWESOME  ', trim it, convert to title case (first letter uppercase, rest lowercase), and print the result.",
      starterCode: `const text = "  javascript is AWESOME  ";

// 1. Trim the whitespace
// 2. Convert to lowercase
// 3. Capitalize the first letter
// 4. Print the result: "Javascript is awesome"
`,
      solution: `const text = "  javascript is AWESOME  ";

const trimmed = text.trim();
const lower = trimmed.toLowerCase();
const result = lower.charAt(0).toUpperCase() + lower.slice(1);

console.log(result);`,
      tests: [
        { name: "Uses trim()", test: `code.includes(".trim()")` },
        { name: "Uses toLowerCase()", test: `code.includes(".toLowerCase()")` },
        { name: "Output is title case", test: `output.includes("Javascript is awesome")` },
      ],
      hints: [
        "First use trim() to remove spaces",
        "Then use toLowerCase() to make it all lowercase",
        "Use charAt(0).toUpperCase() for the first letter",
        "Use slice(1) to get the rest of the string",
      ],
    },
  },
  {
    id: "js-5",
    slug: "numbers-math",
    title: "Numbers & Math",
    description: "Work with numbers and the Math object for calculations",
    order: 5,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 15,
    content: `
# Numbers & Math

JavaScript has one number type that handles both integers and decimals.

## Number Basics

\`\`\`javascript
let integer = 42;
let decimal = 3.14;
let negative = -10;
let scientific = 2.5e6;  // 2,500,000
\`\`\`

## Special Number Values

\`\`\`javascript
Infinity      // Positive infinity
-Infinity     // Negative infinity
NaN           // "Not a Number"

// Check for these
isFinite(100);    // true
isFinite(Infinity); // false
isNaN("hello" * 2); // true
\`\`\`

## The Math Object

| Method | Description | Example |
|--------|-------------|---------|
| Math.round() | Round to nearest | Math.round(4.5) → 5 |
| Math.floor() | Round down | Math.floor(4.9) → 4 |
| Math.ceil() | Round up | Math.ceil(4.1) → 5 |
| Math.abs() | Absolute value | Math.abs(-5) → 5 |
| Math.min() | Minimum value | Math.min(1, 2, 3) → 1 |
| Math.max() | Maximum value | Math.max(1, 2, 3) → 3 |
| Math.random() | Random 0-1 | Math.random() → 0.xyz |
| Math.sqrt() | Square root | Math.sqrt(16) → 4 |
| Math.pow() | Power | Math.pow(2, 3) → 8 |

## Parsing Numbers

\`\`\`javascript
parseInt("42")      // 42
parseInt("42px")    // 42
parseFloat("3.14")  // 3.14
Number("42")        // 42
Number("hello")     // NaN
\`\`\`

## Number Formatting

\`\`\`javascript
let num = 123.456789;
num.toFixed(2)        // "123.46" (string)
num.toPrecision(4)    // "123.5" (string)

let big = 1234567;
big.toLocaleString()  // "1,234,567"
\`\`\`
    `,
    codeExamples: [
      {
        title: "Math operations",
        code: `// Rounding
console.log("round(4.5):", Math.round(4.5));  // 5
console.log("floor(4.9):", Math.floor(4.9));  // 4
console.log("ceil(4.1):", Math.ceil(4.1));    // 5

// Min and max
console.log("min:", Math.min(5, 2, 9, 1));  // 1
console.log("max:", Math.max(5, 2, 9, 1));  // 9

// Other useful methods
console.log("abs(-5):", Math.abs(-5));      // 5
console.log("sqrt(16):", Math.sqrt(16));    // 4
console.log("pow(2, 8):", Math.pow(2, 8));  // 256

// Constants
console.log("PI:", Math.PI);    // 3.14159...
console.log("E:", Math.E);      // 2.71828...`,
        language: "javascript",
      },
      {
        title: "Random numbers",
        code: `// Random decimal between 0 and 1
console.log("Random:", Math.random());

// Random integer between 1 and 10
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Random 1-10:", randomInt(1, 10));
console.log("Random 1-10:", randomInt(1, 10));
console.log("Random 1-10:", randomInt(1, 10));

// Simulate dice roll
const diceRoll = randomInt(1, 6);
console.log("Dice roll:", diceRoll);

// Simulate coin flip
const coinFlip = Math.random() < 0.5 ? "Heads" : "Tails";
console.log("Coin flip:", coinFlip);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-5-challenge",
      title: "Math Calculations",
      description: "Calculate the area and circumference of a circle with radius 5. Use Math.PI. Round results to 2 decimal places.",
      starterCode: `const radius = 5;

// Area = π * r²
// Circumference = 2 * π * r

// Calculate area and circumference
// Use toFixed(2) to round to 2 decimal places
`,
      solution: `const radius = 5;

const area = Math.PI * radius ** 2;
const circumference = 2 * Math.PI * radius;

console.log("Area:", area.toFixed(2));
console.log("Circumference:", circumference.toFixed(2));`,
      tests: [
        { name: "Uses Math.PI", test: `code.includes("Math.PI")` },
        { name: "Calculates area (~78.54)", test: `output.includes("78.5")` },
        { name: "Calculates circumference (~31.42)", test: `output.includes("31.4")` },
      ],
      hints: [
        "Area formula: Math.PI * radius * radius or Math.PI * radius ** 2",
        "Circumference formula: 2 * Math.PI * radius",
        "Use toFixed(2) to round to 2 decimal places",
      ],
    },
  },
  {
    id: "js-6",
    slug: "booleans-conditionals",
    title: "Booleans & Conditionals",
    description: "Make decisions in your code with if/else statements",
    order: 6,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Booleans & Conditionals

Conditionals let your code make decisions based on conditions.

## Boolean Values

Booleans are either \`true\` or \`false\`:

\`\`\`javascript
let isLoggedIn = true;
let hasPermission = false;
\`\`\`

## if Statement

\`\`\`javascript
if (condition) {
  // runs if condition is true
}
\`\`\`

## if...else

\`\`\`javascript
if (condition) {
  // runs if true
} else {
  // runs if false
}
\`\`\`

## if...else if...else

\`\`\`javascript
let score = 85;

if (score >= 90) {
  console.log("A - Excellent!");
} else if (score >= 80) {
  console.log("B - Good!");
} else if (score >= 70) {
  console.log("C - Average");
} else {
  console.log("Need improvement");
}
\`\`\`

## Ternary Operator

A shorthand for simple if/else:

\`\`\`javascript
// condition ? valueIfTrue : valueIfFalse
let age = 20;
let status = age >= 18 ? "adult" : "minor";
\`\`\`

## Truthy and Falsy Values

**Falsy values** (evaluate to false):
- \`false\`
- \`0\`, \`-0\`
- \`""\` (empty string)
- \`null\`
- \`undefined\`
- \`NaN\`

**Everything else is truthy!**

\`\`\`javascript
if ("hello") {
  console.log("Truthy!");  // This runs
}

if ("") {
  console.log("This won't run");  // Empty string is falsy
}
\`\`\`

## switch Statement

For multiple conditions with the same variable:

\`\`\`javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Friday":
    console.log("End of work week");
    break;
  default:
    console.log("Regular day");
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "If/else examples",
        code: `// Simple if/else
let temperature = 25;

if (temperature > 30) {
  console.log("It's hot outside!");
} else if (temperature > 20) {
  console.log("Nice weather!");
} else if (temperature > 10) {
  console.log("A bit chilly");
} else {
  console.log("It's cold!");
}

// Multiple conditions with && and ||
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("You can drive");
} else {
  console.log("You cannot drive");
}

// Ternary operator
let hour = 14;
let greeting = hour < 12 ? "Good morning" : "Good afternoon";
console.log(greeting);`,
        language: "javascript",
      },
      {
        title: "Switch statement",
        code: `function getDayType(day) {
  switch (day.toLowerCase()) {
    case "saturday":
    case "sunday":
      return "Weekend";
    case "monday":
    case "tuesday":
    case "wednesday":
    case "thursday":
    case "friday":
      return "Weekday";
    default:
      return "Invalid day";
  }
}

console.log(getDayType("Monday"));    // Weekday
console.log(getDayType("Saturday"));  // Weekend
console.log(getDayType("Funday"));    // Invalid day`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-6-challenge",
      title: "Grade Calculator",
      description: "Create a function that takes a score (0-100) and returns the letter grade: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).",
      starterCode: `function getGrade(score) {
  // Return "A", "B", "C", "D", or "F" based on score
}

// Test your function
console.log(getGrade(95));  // Should print "A"
console.log(getGrade(82));  // Should print "B"
console.log(getGrade(71));  // Should print "C"
console.log(getGrade(65));  // Should print "D"
console.log(getGrade(45));  // Should print "F"
`,
      solution: `function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log(getGrade(95));
console.log(getGrade(82));
console.log(getGrade(71));
console.log(getGrade(65));
console.log(getGrade(45));`,
      tests: [
        { name: "Returns A for 95", test: `output.includes("A")` },
        { name: "Returns B for 82", test: `output.includes("B")` },
        { name: "Returns F for 45", test: `output.includes("F")` },
        { name: "Uses if statement", test: `code.includes("if")` },
      ],
      hints: [
        "Start with the highest grade (A >= 90)",
        "Use if/else if for each grade level",
        "Return early to avoid else if chains",
      ],
    },
  },
  {
    id: "js-7",
    slug: "loops",
    title: "Loops",
    description: "Repeat code with for, while, and other loop constructs",
    order: 7,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Loops

Loops repeat code until a condition is met.

## for Loop

The most common loop. Has three parts: initialization, condition, update.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## while Loop

Runs while a condition is true:

\`\`\`javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`

## do...while Loop

Always runs at least once:

\`\`\`javascript
let num = 0;
do {
  console.log(num);
  num++;
} while (num < 5);
\`\`\`

## for...of Loop

Iterate over arrays (and other iterables):

\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

## for...in Loop

Iterate over object properties:

\`\`\`javascript
const person = { name: "Alice", age: 25 };
for (const key in person) {
  console.log(key, person[key]);
}
\`\`\`

## Loop Control

- **break** - Exit the loop immediately
- **continue** - Skip to next iteration

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;  // Skip 3
  if (i === 7) break;     // Stop at 7
  console.log(i);  // 0, 1, 2, 4, 5, 6
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Different loop types",
        code: `// for loop - counting
console.log("For loop:");
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// while loop - until condition
console.log("\\nWhile loop:");
let num = 10;
while (num > 0) {
  console.log("Countdown:", num);
  num -= 2;  // Decrease by 2
}

// for...of - iterate array
console.log("\\nFor...of loop:");
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log("Color:", color);
}`,
        language: "javascript",
      },
      {
        title: "Loop patterns",
        code: `// Sum numbers 1 to 10
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("Sum 1-10:", sum);  // 55

// Find first even number
const numbers = [1, 3, 5, 8, 9, 10];
for (const num of numbers) {
  if (num % 2 === 0) {
    console.log("First even:", num);
    break;  // Stop after finding
  }
}

// Skip odd numbers
console.log("Even numbers only:");
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) continue;  // Skip odd
  console.log(i);
}`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-7-challenge",
      title: "FizzBuzz",
      description: "Print numbers 1-15. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",
      starterCode: `// Loop from 1 to 15
// If divisible by 3 AND 5, print "FizzBuzz"
// Else if divisible by 3, print "Fizz"
// Else if divisible by 5, print "Buzz"
// Else print the number
`,
      solution: `for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`,
      tests: [
        { name: "Prints FizzBuzz for 15", test: `output.includes("FizzBuzz")` },
        { name: "Prints Fizz for 3", test: `output.includes("Fizz")` },
        { name: "Prints Buzz for 5", test: `output.includes("Buzz")` },
        { name: "Prints numbers", test: `output.includes("1") && output.includes("2")` },
      ],
      hints: [
        "Check for divisible by both (3 AND 5) first",
        "Use % to check divisibility: i % 3 === 0",
        "Order matters: check FizzBuzz before Fizz or Buzz",
      ],
    },
  },
  {
    id: "js-8",
    slug: "functions-basics",
    title: "Functions Basics",
    description: "Create reusable blocks of code with functions",
    order: 8,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Functions Basics

Functions are reusable blocks of code that perform a specific task.

## Function Declaration

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));  // Hello, Alice!
\`\`\`

## Function Expression

\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

## Parameters and Arguments

- **Parameters**: Variables listed in the function definition
- **Arguments**: Values passed when calling the function

\`\`\`javascript
function add(a, b) {  // a, b are parameters
  return a + b;
}

add(5, 3);  // 5, 3 are arguments
\`\`\`

## Default Parameters

\`\`\`javascript
function greet(name = "Guest") {
  return "Hello, " + name;
}

greet();        // "Hello, Guest"
greet("Alice"); // "Hello, Alice"
\`\`\`

## Return Statement

- \`return\` sends a value back to the caller
- Functions without return give \`undefined\`
- Code after return doesn't execute

\`\`\`javascript
function square(n) {
  return n * n;
  console.log("This never runs");
}
\`\`\`

## Multiple Returns

\`\`\`javascript
function getStatus(score) {
  if (score >= 60) return "Pass";
  return "Fail";
}
\`\`\`

## Functions as Values

Functions can be stored in variables, passed as arguments, and returned from other functions:

\`\`\`javascript
const myFunction = function() {
  return "Hi!";
};

// Pass function as argument
function runTwice(fn) {
  fn();
  fn();
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Basic functions",
        code: `// Function declaration
function multiply(a, b) {
  return a * b;
}
console.log("multiply(4, 5):", multiply(4, 5));

// Function with default parameter
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
console.log(greet());
console.log(greet("Alice"));

// Function that doesn't return
function logMessage(message) {
  console.log("[LOG]", message);
  // No return - gives undefined
}
const result = logMessage("Test");
console.log("Return value:", result);  // undefined`,
        language: "javascript",
      },
      {
        title: "Practical functions",
        code: `// Calculate average
function average(numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum / numbers.length;
}

const scores = [85, 90, 78, 92, 88];
console.log("Average:", average(scores));

// Check if number is even
function isEven(n) {
  return n % 2 === 0;
}
console.log("Is 4 even?", isEven(4));
console.log("Is 7 even?", isEven(7));

// Create greeting based on time
function getGreeting(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
console.log(getGreeting(9));   // Good morning
console.log(getGreeting(15));  // Good afternoon`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-8-challenge",
      title: "Temperature Converter",
      description: "Create two functions: celsiusToFahrenheit(c) and fahrenheitToCelsius(f). Formula: F = C × 9/5 + 32",
      starterCode: `// Create celsiusToFahrenheit(c) - returns Fahrenheit
// Create fahrenheitToCelsius(f) - returns Celsius
// Formulas:
// F = C × 9/5 + 32
// C = (F - 32) × 5/9

// Test:
// console.log(celsiusToFahrenheit(0));   // 32
// console.log(celsiusToFahrenheit(100)); // 212
// console.log(fahrenheitToCelsius(32));  // 0
// console.log(fahrenheitToCelsius(212)); // 100
`,
      solution: `function celsiusToFahrenheit(c) {
  return c * 9/5 + 32;
}

function fahrenheitToCelsius(f) {
  return (f - 32) * 5/9;
}

console.log(celsiusToFahrenheit(0));
console.log(celsiusToFahrenheit(100));
console.log(fahrenheitToCelsius(32));
console.log(fahrenheitToCelsius(212));`,
      tests: [
        { name: "0°C = 32°F", test: `output.includes("32")` },
        { name: "100°C = 212°F", test: `output.includes("212")` },
        { name: "Has both functions", test: `code.includes("celsiusToFahrenheit") && code.includes("fahrenheitToCelsius")` },
      ],
      hints: [
        "F = C * 9/5 + 32",
        "C = (F - 32) * 5/9",
        "Use return to give back the result",
      ],
    },
  },
  {
    id: "js-9",
    slug: "arrow-functions",
    title: "Arrow Functions",
    description: "Modern, concise function syntax with arrow functions",
    order: 9,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

## Basic Syntax

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const add = (a, b) => a + b;
\`\`\`

## Syntax Variations

\`\`\`javascript
// No parameters - need empty parentheses
const sayHi = () => "Hi!";

// One parameter - parentheses optional
const double = n => n * 2;
const double = (n) => n * 2;  // Also valid

// Multiple parameters - need parentheses
const add = (a, b) => a + b;

// Multiple lines - need braces and return
const process = (x) => {
  const doubled = x * 2;
  const squared = doubled ** 2;
  return squared;
};
\`\`\`

## Returning Objects

Wrap object literal in parentheses:

\`\`\`javascript
// Wrong - braces are interpreted as function body
const makePerson = (name) => { name: name };  // Returns undefined

// Right - parentheses indicate object literal
const makePerson = (name) => ({ name: name });
\`\`\`

## Arrow Functions vs Regular Functions

Arrow functions differ in how they handle \`this\`:

\`\`\`javascript
// Arrow functions don't have their own 'this'
// They inherit 'this' from the surrounding scope

const obj = {
  name: "Alice",
  // Regular function - 'this' refers to obj
  greet: function() {
    console.log("Hello, " + this.name);
  },
  // Arrow function - 'this' inherited from outer scope
  greetArrow: () => {
    console.log("Hello, " + this.name);  // 'this' is NOT obj!
  }
};
\`\`\`

## When to Use Arrow Functions

- Callbacks: \`array.map(x => x * 2)\`
- Short functions: \`const add = (a, b) => a + b\`
- When you need to preserve outer \`this\`

## When NOT to Use Arrow Functions

- Object methods (that need \`this\`)
- Constructors (arrow functions can't be constructors)
- Functions that need \`arguments\` object
    `,
    codeExamples: [
      {
        title: "Arrow function syntax",
        code: `// Various arrow function styles
const sayHello = () => "Hello!";
const double = n => n * 2;
const add = (a, b) => a + b;
const square = x => x * x;

console.log(sayHello());
console.log(double(5));
console.log(add(3, 4));
console.log(square(6));

// Multi-line arrow function
const getInfo = (name, age) => {
  const year = 2024 - age;
  return \`\${name} was born in \${year}\`;
};
console.log(getInfo("Alice", 25));

// Returning an object
const createUser = (name, email) => ({
  name,
  email,
  createdAt: new Date()
});
console.log(createUser("Bob", "bob@example.com"));`,
        language: "javascript",
      },
      {
        title: "Arrow functions with arrays",
        code: `const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter - keep matching elements
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Find - get first match
const firstBig = numbers.find(n => n > 3);
console.log("First > 3:", firstBig);

// Every - check if all match
const allPositive = numbers.every(n => n > 0);
console.log("All positive:", allPositive);

// Some - check if any match
const hasEven = numbers.some(n => n % 2 === 0);
console.log("Has even:", hasEven);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-9-challenge",
      title: "Arrow Function Practice",
      description: "Convert these regular functions to arrow functions and test them.",
      starterCode: `// Convert these to arrow functions:

// 1. function triple(n) { return n * 3; }

// 2. function isPositive(n) { return n > 0; }

// 3. function fullName(first, last) { return first + " " + last; }

// Test your arrow functions:
// console.log(triple(4));           // 12
// console.log(isPositive(-5));      // false
// console.log(fullName("John", "Doe")); // "John Doe"
`,
      solution: `const triple = n => n * 3;

const isPositive = n => n > 0;

const fullName = (first, last) => \`\${first} \${last}\`;

console.log(triple(4));
console.log(isPositive(-5));
console.log(fullName("John", "Doe"));`,
      tests: [
        { name: "Uses arrow syntax", test: `code.includes("=>")` },
        { name: "triple(4) = 12", test: `output.includes("12")` },
        { name: "isPositive(-5) = false", test: `output.includes("false")` },
        { name: "fullName works", test: `output.includes("John Doe")` },
      ],
      hints: [
        "Single parameter doesn't need parentheses: n =>",
        "Single expression doesn't need return or braces: n => n * 3",
        "Multiple parameters need parentheses: (first, last) =>",
      ],
    },
  },
  {
    id: "js-10",
    slug: "arrays-basics",
    title: "Arrays Basics",
    description: "Store and access collections of data with arrays",
    order: 10,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Arrays Basics

Arrays store ordered collections of items.

## Creating Arrays

\`\`\`javascript
// Array literal (most common)
const fruits = ["apple", "banana", "cherry"];

// Empty array
const empty = [];

// Mixed types (valid but usually avoided)
const mixed = [1, "two", true, null];

// Array constructor (less common)
const numbers = new Array(1, 2, 3);
\`\`\`

## Accessing Elements

Arrays are zero-indexed (first element is at index 0):

\`\`\`javascript
const colors = ["red", "green", "blue"];
console.log(colors[0]);  // "red"
console.log(colors[1]);  // "green"
console.log(colors[2]);  // "blue"
console.log(colors[3]);  // undefined (doesn't exist)

// Last element
console.log(colors[colors.length - 1]);  // "blue"
\`\`\`

## Array Properties

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.length);  // 5
\`\`\`

## Modifying Arrays

\`\`\`javascript
const fruits = ["apple", "banana"];

// Change element
fruits[0] = "apricot";

// Add to end
fruits.push("cherry");

// Remove from end
const last = fruits.pop();

// Add to beginning
fruits.unshift("avocado");

// Remove from beginning
const first = fruits.shift();
\`\`\`

## Common Array Methods

| Method | Description | Returns |
|--------|-------------|---------|
| push() | Add to end | New length |
| pop() | Remove from end | Removed item |
| unshift() | Add to start | New length |
| shift() | Remove from start | Removed item |
| includes() | Check if exists | Boolean |
| indexOf() | Find index | Index or -1 |
| slice() | Copy portion | New array |
| splice() | Add/remove items | Removed items |
| concat() | Merge arrays | New array |
| join() | Convert to string | String |
    `,
    codeExamples: [
      {
        title: "Array operations",
        code: `const fruits = ["apple", "banana", "cherry"];
console.log("Original:", fruits);

// Add elements
fruits.push("date");
console.log("After push:", fruits);

fruits.unshift("apricot");
console.log("After unshift:", fruits);

// Remove elements
const last = fruits.pop();
console.log("Popped:", last);
console.log("After pop:", fruits);

const first = fruits.shift();
console.log("Shifted:", first);
console.log("After shift:", fruits);

// Check and find
console.log("Includes banana:", fruits.includes("banana"));
console.log("Index of cherry:", fruits.indexOf("cherry"));`,
        language: "javascript",
      },
      {
        title: "More array methods",
        code: `const numbers = [1, 2, 3, 4, 5];

// slice - copy portion (doesn't modify original)
const middle = numbers.slice(1, 4);
console.log("Slice(1,4):", middle);  // [2, 3, 4]
console.log("Original:", numbers);   // unchanged

// concat - merge arrays
const more = [6, 7, 8];
const combined = numbers.concat(more);
console.log("Combined:", combined);

// join - convert to string
const letters = ["a", "b", "c"];
console.log("Joined:", letters.join("-"));  // "a-b-c"

// reverse - reverses in place
const toReverse = [1, 2, 3];
toReverse.reverse();
console.log("Reversed:", toReverse);

// sort - sorts in place (alphabetically by default)
const words = ["banana", "apple", "cherry"];
words.sort();
console.log("Sorted:", words);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-10-challenge",
      title: "Array Manipulation",
      description: "Start with [1, 2, 3]. Add 4 to the end, add 0 to the beginning, remove the last item, then print the final array and its length.",
      starterCode: `const numbers = [1, 2, 3];

// 1. Add 4 to the end
// 2. Add 0 to the beginning
// 3. Remove the last item
// 4. Print the array and its length

// Expected result: [0, 1, 2, 3] with length 4
`,
      solution: `const numbers = [1, 2, 3];

numbers.push(4);
numbers.unshift(0);
numbers.pop();

console.log("Array:", numbers);
console.log("Length:", numbers.length);`,
      tests: [
        { name: "Uses push", test: `code.includes(".push")` },
        { name: "Uses unshift", test: `code.includes(".unshift")` },
        { name: "Uses pop", test: `code.includes(".pop")` },
        { name: "Final array is correct", test: `output.includes("0") && output.includes("1") && output.includes("2") && output.includes("3")` },
      ],
      hints: [
        "push(4) adds to end",
        "unshift(0) adds to beginning",
        "pop() removes from end",
        "After all operations: [0, 1, 2, 3]",
      ],
    },
  },
  {
    id: "js-11",
    slug: "objects-basics",
    title: "Objects Basics",
    description: "Store related data with key-value pairs using objects",
    order: 11,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Objects Basics

Objects store collections of key-value pairs. They're perfect for grouping related data.

## Creating Objects

\`\`\`javascript
// Object literal (most common)
const person = {
  name: "Alice",
  age: 25,
  city: "New York"
};

// Empty object
const empty = {};
\`\`\`

## Accessing Properties

\`\`\`javascript
const person = { name: "Alice", age: 25 };

// Dot notation (preferred)
console.log(person.name);  // "Alice"

// Bracket notation (for dynamic keys or special characters)
console.log(person["age"]);  // 25

const key = "name";
console.log(person[key]);  // "Alice"
\`\`\`

## Modifying Objects

\`\`\`javascript
const person = { name: "Alice" };

// Add property
person.age = 25;
person["city"] = "NYC";

// Update property
person.name = "Alicia";

// Delete property
delete person.city;
\`\`\`

## Object Methods

Objects can contain functions (called methods):

\`\`\`javascript
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, I'm " + this.name);
  },
  // Shorthand method syntax
  sayBye() {
    console.log("Goodbye!");
  }
};

person.greet();  // "Hello, I'm Alice"
\`\`\`

## Checking Properties

\`\`\`javascript
const obj = { name: "Alice", age: 25 };

// Check if property exists
console.log("name" in obj);  // true
console.log(obj.hasOwnProperty("age"));  // true

// Get all keys
console.log(Object.keys(obj));  // ["name", "age"]

// Get all values
console.log(Object.values(obj));  // ["Alice", 25]

// Get key-value pairs
console.log(Object.entries(obj));  // [["name","Alice"], ["age",25]]
\`\`\`

## Nested Objects

\`\`\`javascript
const company = {
  name: "TechCorp",
  address: {
    street: "123 Main St",
    city: "Boston"
  }
};

console.log(company.address.city);  // "Boston"
\`\`\`
    `,
    codeExamples: [
      {
        title: "Working with objects",
        code: `// Create an object
const book = {
  title: "JavaScript Guide",
  author: "Alice Smith",
  year: 2024,
  pages: 350,
  isAvailable: true
};

// Access properties
console.log("Title:", book.title);
console.log("Author:", book.author);

// Modify properties
book.pages = 375;
book.edition = "2nd";

// Delete property
delete book.isAvailable;

// Check property existence
console.log("Has year:", "year" in book);
console.log("Has price:", "price" in book);

// Get keys and values
console.log("Keys:", Object.keys(book));
console.log("Values:", Object.values(book));`,
        language: "javascript",
      },
      {
        title: "Objects with methods",
        code: `const calculator = {
  value: 0,

  add(n) {
    this.value += n;
    return this;  // Enable chaining
  },

  subtract(n) {
    this.value -= n;
    return this;
  },

  multiply(n) {
    this.value *= n;
    return this;
  },

  getResult() {
    return this.value;
  },

  reset() {
    this.value = 0;
    return this;
  }
};

// Method chaining
calculator.add(10).multiply(2).subtract(5);
console.log("Result:", calculator.getResult());  // 15

calculator.reset();
console.log("After reset:", calculator.getResult());  // 0`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-11-challenge",
      title: "Create a User Object",
      description: "Create a user object with name, email, and age properties. Add a method 'introduce' that returns 'Hi, I'm [name] and I'm [age] years old.'",
      starterCode: `// Create a user object with:
// - name (string)
// - email (string)
// - age (number)
// - introduce() method that returns introduction string

// Test:
// console.log(user.name);
// console.log(user.introduce());
`,
      solution: `const user = {
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  introduce() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
};

console.log(user.name);
console.log(user.email);
console.log(user.introduce());`,
      tests: [
        { name: "Has name property", test: `code.includes("name")` },
        { name: "Has email property", test: `code.includes("email")` },
        { name: "Has introduce method", test: `code.includes("introduce")` },
        { name: "Uses this keyword", test: `code.includes("this.")` },
      ],
      hints: [
        "Create object with { key: value } syntax",
        "Methods are functions inside objects",
        "Use 'this' to access object properties inside methods",
      ],
    },
  },
  {
    id: "js-12",
    slug: "scope-hoisting",
    title: "Scope & Hoisting",
    description: "Understand variable scope and JavaScript's hoisting behavior",
    order: 12,
    category: "JavaScript Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Scope & Hoisting

Understanding where variables are accessible and how declarations are processed.

## Types of Scope

### Global Scope
Variables declared outside any function or block:

\`\`\`javascript
const globalVar = "I'm global";

function test() {
  console.log(globalVar);  // Accessible
}
\`\`\`

### Function Scope
Variables declared inside a function:

\`\`\`javascript
function test() {
  const localVar = "I'm local";
  console.log(localVar);  // Accessible
}
// console.log(localVar);  // Error! Not accessible
\`\`\`

### Block Scope (let and const)
Variables declared inside a block { }:

\`\`\`javascript
if (true) {
  let blockVar = "I'm block-scoped";
  const alsoBlock = "Me too";
}
// console.log(blockVar);  // Error! Not accessible
\`\`\`

## var vs let/const

\`var\` is function-scoped, not block-scoped:

\`\`\`javascript
if (true) {
  var x = 1;    // Function-scoped (or global if outside function)
  let y = 2;    // Block-scoped
  const z = 3;  // Block-scoped
}
console.log(x);  // 1 - still accessible!
// console.log(y);  // Error
// console.log(z);  // Error
\`\`\`

## Hoisting

JavaScript moves declarations to the top of their scope before execution.

### Variable Hoisting

\`\`\`javascript
// What you write:
console.log(x);  // undefined (not an error!)
var x = 5;

// How JS interprets it:
var x;
console.log(x);  // undefined
x = 5;
\`\`\`

### let and const - Temporal Dead Zone

\`\`\`javascript
// console.log(y);  // ReferenceError!
let y = 5;  // Can't access before declaration
\`\`\`

### Function Hoisting

Function declarations are fully hoisted:

\`\`\`javascript
sayHello();  // Works! "Hello"

function sayHello() {
  console.log("Hello");
}
\`\`\`

But function expressions are NOT:

\`\`\`javascript
// sayHi();  // Error!
const sayHi = function() {
  console.log("Hi");
};
\`\`\`

## Best Practices

1. Always use \`const\` by default
2. Use \`let\` when you need to reassign
3. Never use \`var\`
4. Declare variables at the top of their scope
5. Don't rely on hoisting
    `,
    codeExamples: [
      {
        title: "Scope examples",
        code: `// Global scope
const globalMessage = "Hello from global";

function outer() {
  // Function scope
  const outerMessage = "Hello from outer";

  function inner() {
    // Can access outer and global
    const innerMessage = "Hello from inner";
    console.log(globalMessage);  // accessible
    console.log(outerMessage);   // accessible
    console.log(innerMessage);   // accessible
  }

  inner();
  // console.log(innerMessage);  // Error!
}

outer();

// Block scope with let/const
for (let i = 0; i < 3; i++) {
  const message = \`Iteration \${i}\`;
  console.log(message);
}
// console.log(i);  // Error - i is block-scoped`,
        language: "javascript",
      },
      {
        title: "Hoisting behavior",
        code: `// Function hoisting - works!
greet("Alice");

function greet(name) {
  console.log("Hello,", name);
}

// Variable hoisting with var
console.log("x before:", x);  // undefined, not error
var x = 10;
console.log("x after:", x);   // 10

// let/const - temporal dead zone
// console.log(y);  // Would throw ReferenceError
let y = 20;
console.log("y:", y);

// Practical example - why var is problematic
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Logs 3, 3, 3 (not 0, 1, 2!)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 200);
}
// Logs 0, 1, 2 (correct!)`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-12-challenge",
      title: "Scope Quiz",
      description: "Predict and verify the output of this code. Then fix the 'var' problem to correctly log 0, 1, 2.",
      starterCode: `// What will this print?
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}

// Currently prints: 3, 3, 3
// Fix it to print: 0, 1, 2
// Hint: Change one keyword
`,
      solution: `// Fixed version - change var to let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}

// Now correctly prints: 0, 1, 2`,
      tests: [
        { name: "Uses let instead of var", test: `code.includes("let i")` },
        { name: "Uses setTimeout", test: `code.includes("setTimeout")` },
      ],
      hints: [
        "var is function-scoped, let is block-scoped",
        "With var, all callbacks share the same i",
        "With let, each iteration has its own i",
      ],
    },
  },
];

// ============================================
// JAVASCRIPT INTERMEDIATE (Lessons 13-24)
// ============================================

export const jsIntermediate: Lesson[] = [
  {
    id: "js-13",
    slug: "array-methods-deep-dive",
    title: "Array Methods Deep Dive",
    description: "Master map, filter, reduce, find, every, and some",
    order: 13,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    content: `
# Array Methods Deep Dive

Modern JavaScript provides powerful array methods for transforming and processing data.

## map() - Transform Each Element

Creates a new array by transforming every element:

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]
\`\`\`

## filter() - Keep Matching Elements

Creates a new array with elements that pass a test:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]
\`\`\`

## reduce() - Combine Into Single Value

Reduces an array to a single value:

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 10
\`\`\`

## find() and findIndex()

Find first matching element or its index:

\`\`\`javascript
const users = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
const user = users.find(u => u.id === 2);  // {id: 2, name: "Bob"}
const index = users.findIndex(u => u.id === 2);  // 1
\`\`\`

## every() and some()

Check if all or any elements match:

\`\`\`javascript
const numbers = [2, 4, 6, 8];
numbers.every(n => n % 2 === 0);  // true (all even)
numbers.some(n => n > 5);         // true (some > 5)
\`\`\`

## Method Chaining

Chain methods for complex transformations:

\`\`\`javascript
const result = data
  .filter(item => item.active)
  .map(item => item.value)
  .reduce((sum, val) => sum + val, 0);
\`\`\`
    `,
    codeExamples: [
      {
        title: "Practical array transformations",
        code: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Phone", price: 699, inStock: true },
  { name: "Tablet", price: 499, inStock: false },
  { name: "Watch", price: 299, inStock: true }
];

// Get names of in-stock items
const available = products
  .filter(p => p.inStock)
  .map(p => p.name);
console.log("Available:", available);

// Calculate total value of in-stock items
const totalValue = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log("Total value:", totalValue);

// Find expensive items (> $500)
const expensive = products.filter(p => p.price > 500);
console.log("Expensive:", expensive.map(p => p.name));

// Check if all items are in stock
const allInStock = products.every(p => p.inStock);
console.log("All in stock:", allInStock);

// Check if any item is affordable (< $300)
const hasAffordable = products.some(p => p.price < 300);
console.log("Has affordable:", hasAffordable);`,
        language: "javascript",
      },
      {
        title: "reduce() patterns",
        code: `const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Max value
const max = numbers.reduce((max, n) => n > max ? n : max, numbers[0]);
console.log("Max:", max);

// Count occurrences
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("Counts:", counts);

// Group by property
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];
const byAge = people.reduce((acc, person) => {
  const key = person.age;
  acc[key] = acc[key] || [];
  acc[key].push(person.name);
  return acc;
}, {});
console.log("Grouped by age:", byAge);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-13-challenge",
      title: "Data Processing Pipeline",
      description: "Given an array of students with scores, find the average score of students who passed (score >= 60).",
      starterCode: `const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 55 },
  { name: "Charlie", score: 92 },
  { name: "Diana", score: 48 },
  { name: "Eve", score: 76 }
];

// 1. Filter students who passed (score >= 60)
// 2. Calculate the average score of passing students
// 3. Print the result
`,
      solution: `const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 55 },
  { name: "Charlie", score: 92 },
  { name: "Diana", score: 48 },
  { name: "Eve", score: 76 }
];

const passing = students.filter(s => s.score >= 60);
const average = passing.reduce((sum, s) => sum + s.score, 0) / passing.length;

console.log("Passing students:", passing.map(s => s.name));
console.log("Average score:", average.toFixed(2));`,
      tests: [
        { name: "Uses filter", test: `code.includes(".filter")` },
        { name: "Uses reduce or calculates average", test: `code.includes(".reduce") || code.includes("/ passing.length")` },
        { name: "Outputs average (~84.33)", test: `output.includes("84")` },
      ],
      hints: [
        "First filter: students.filter(s => s.score >= 60)",
        "Then sum with reduce: passing.reduce((sum, s) => sum + s.score, 0)",
        "Divide sum by passing.length for average",
      ],
    },
  },
  {
    id: "js-14",
    slug: "object-methods-patterns",
    title: "Object Methods & Patterns",
    description: "Master destructuring, spread operator, and Object methods",
    order: 14,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Object Methods & Patterns

Advanced techniques for working with objects.

## Destructuring

Extract properties into variables:

\`\`\`javascript
const person = { name: "Alice", age: 25, city: "NYC" };

// Object destructuring
const { name, age } = person;
console.log(name);  // "Alice"

// Rename during destructuring
const { name: userName } = person;

// Default values
const { country = "USA" } = person;

// Nested destructuring
const user = { profile: { firstName: "Alice" } };
const { profile: { firstName } } = user;
\`\`\`

## Spread Operator

Copy and merge objects:

\`\`\`javascript
const original = { a: 1, b: 2 };

// Copy object
const copy = { ...original };

// Merge objects
const extended = { ...original, c: 3 };

// Override properties
const updated = { ...original, b: 99 };
\`\`\`

## Object Static Methods

\`\`\`javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);     // ["a", "b", "c"]
Object.values(obj);   // [1, 2, 3]
Object.entries(obj);  // [["a",1], ["b",2], ["c",3]]

Object.fromEntries([["a", 1], ["b", 2]]);  // { a: 1, b: 2 }

Object.assign({}, obj, { d: 4 });  // Merge
Object.freeze(obj);   // Make immutable
Object.seal(obj);     // Prevent add/delete
\`\`\`

## Shorthand Property Names

\`\`\`javascript
const name = "Alice";
const age = 25;

// Instead of: { name: name, age: age }
const person = { name, age };
\`\`\`

## Computed Property Names

\`\`\`javascript
const key = "dynamic";
const obj = {
  [key]: "value",
  [\`\${key}2\`]: "value2"
};
// { dynamic: "value", dynamic2: "value2" }
\`\`\`
    `,
    codeExamples: [
      {
        title: "Destructuring patterns",
        code: `// Object destructuring
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  address: {
    city: "New York",
    zip: "10001"
  }
};

// Basic destructuring with defaults
const { name, role = "user" } = user;
console.log(name, role);

// Nested destructuring
const { address: { city, zip } } = user;
console.log(city, zip);

// Function parameter destructuring
function greet({ name, email }) {
  console.log(\`Hello \${name}! Email: \${email}\`);
}
greet(user);

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest);

// Swapping values
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);  // 2, 1`,
        language: "javascript",
      },
      {
        title: "Spread and Object methods",
        code: `// Spread for copying/merging
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings);

// Object.entries for iteration
const scores = { Alice: 95, Bob: 87, Charlie: 92 };
for (const [name, score] of Object.entries(scores)) {
  console.log(\`\${name}: \${score}\`);
}

// Transform object values
const doubled = Object.fromEntries(
  Object.entries(scores).map(([name, score]) => [name, score * 2])
);
console.log("Doubled:", doubled);

// Object.keys for checking
const hasAllFields = (obj, required) =>
  required.every(field => Object.keys(obj).includes(field));

const user = { name: "Alice", email: "a@b.com" };
console.log("Valid:", hasAllFields(user, ["name", "email"]));`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-14-challenge",
      title: "Object Transformation",
      description: "Create a function that merges two objects, with the second object's values overriding the first. Use spread operator.",
      starterCode: `// Create mergeObjects(obj1, obj2) that:
// - Returns a new object
// - Contains all properties from both
// - obj2 values override obj1 if keys match

const defaults = { color: "red", size: "medium", quantity: 1 };
const custom = { color: "blue", quantity: 5 };

// Expected: { color: "blue", size: "medium", quantity: 5 }
`,
      solution: `function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

const defaults = { color: "red", size: "medium", quantity: 1 };
const custom = { color: "blue", quantity: 5 };

const result = mergeObjects(defaults, custom);
console.log(result);`,
      tests: [
        { name: "Uses spread operator", test: `code.includes("...")` },
        { name: "Returns merged object", test: `output.includes("blue") && output.includes("medium")` },
      ],
      hints: [
        "Use { ...obj1, ...obj2 }",
        "Later properties override earlier ones",
        "Return the new object",
      ],
    },
  },
  {
    id: "js-15",
    slug: "json-data-handling",
    title: "JSON & Data Handling",
    description: "Parse, stringify, and work with JSON data",
    order: 15,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# JSON & Data Handling

JSON (JavaScript Object Notation) is the standard format for data exchange.

## JSON Syntax

\`\`\`json
{
  "name": "Alice",
  "age": 25,
  "active": true,
  "tags": ["developer", "designer"],
  "address": {
    "city": "NYC"
  }
}
\`\`\`

**JSON rules:**
- Keys must be double-quoted strings
- Values can be: string, number, boolean, null, array, object
- No trailing commas
- No functions or undefined

## JSON.parse()

Convert JSON string to JavaScript object:

\`\`\`javascript
const jsonString = '{"name": "Alice", "age": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.name);  // "Alice"
\`\`\`

## JSON.stringify()

Convert JavaScript object to JSON string:

\`\`\`javascript
const obj = { name: "Alice", age: 25 };
const json = JSON.stringify(obj);
// '{"name":"Alice","age":25}'

// Pretty print
const pretty = JSON.stringify(obj, null, 2);
\`\`\`

## Working with API Data

\`\`\`javascript
// Typical pattern
const response = await fetch(url);
const data = await response.json();  // Parses JSON

// Sending JSON
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" })
});
\`\`\`

## Deep Cloning with JSON

\`\`\`javascript
const original = { a: 1, nested: { b: 2 } };
const clone = JSON.parse(JSON.stringify(original));
\`\`\`
**Note:** This doesn't work with functions, Date objects, undefined, etc.
    `,
    codeExamples: [
      {
        title: "JSON parsing and stringifying",
        code: `// Parse JSON string
const jsonString = '{"name": "Alice", "age": 25, "hobbies": ["reading", "coding"]}';
const user = JSON.parse(jsonString);
console.log("Parsed:", user);
console.log("Name:", user.name);
console.log("First hobby:", user.hobbies[0]);

// Stringify object
const product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  specs: { ram: "16GB", storage: "512GB" }
};

const json = JSON.stringify(product);
console.log("JSON:", json);

// Pretty print with indentation
const pretty = JSON.stringify(product, null, 2);
console.log("Pretty:\\n", pretty);

// Selective stringify with replacer
const partial = JSON.stringify(product, ["id", "name"]);
console.log("Partial:", partial);`,
        language: "javascript",
      },
      {
        title: "Handling nested JSON data",
        code: `const apiResponse = \`{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"},
    {"id": 3, "name": "Charlie", "role": "user"}
  ],
  "total": 3,
  "page": 1
}\`;

// Parse the response
const data = JSON.parse(apiResponse);

// Extract and transform
const names = data.users.map(u => u.name);
console.log("All names:", names);

const admins = data.users.filter(u => u.role === "admin");
console.log("Admins:", admins);

// Safe parsing with error handling
function safeJsonParse(str) {
  try {
    return { data: JSON.parse(str), error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

console.log(safeJsonParse('{"valid": true}'));
console.log(safeJsonParse('invalid json'));`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-15-challenge",
      title: "JSON Data Processing",
      description: "Parse the JSON string, filter for active users, and return a new JSON string with only their names and emails.",
      starterCode: `const jsonData = \`[
  {"id": 1, "name": "Alice", "email": "alice@test.com", "active": true},
  {"id": 2, "name": "Bob", "email": "bob@test.com", "active": false},
  {"id": 3, "name": "Charlie", "email": "charlie@test.com", "active": true}
]\`;

// 1. Parse the JSON
// 2. Filter active users
// 3. Map to only name and email
// 4. Convert back to JSON string
// 5. Print the result
`,
      solution: `const jsonData = \`[
  {"id": 1, "name": "Alice", "email": "alice@test.com", "active": true},
  {"id": 2, "name": "Bob", "email": "bob@test.com", "active": false},
  {"id": 3, "name": "Charlie", "email": "charlie@test.com", "active": true}
]\`;

const users = JSON.parse(jsonData);
const activeUsers = users
  .filter(u => u.active)
  .map(({ name, email }) => ({ name, email }));

const result = JSON.stringify(activeUsers, null, 2);
console.log(result);`,
      tests: [
        { name: "Uses JSON.parse", test: `code.includes("JSON.parse")` },
        { name: "Uses JSON.stringify", test: `code.includes("JSON.stringify")` },
        { name: "Filters correctly", test: `output.includes("Alice") && output.includes("Charlie") && !output.includes("Bob")` },
      ],
      hints: [
        "First parse with JSON.parse(jsonData)",
        "Filter: .filter(u => u.active)",
        "Map to new shape: .map(({ name, email }) => ({ name, email }))",
        "Convert back with JSON.stringify()",
      ],
    },
  },
  {
    id: "js-16",
    slug: "error-handling",
    title: "Error Handling",
    description: "Handle errors gracefully with try/catch and custom errors",
    order: 16,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Error Handling

Proper error handling prevents crashes and provides better user experience.

## try...catch...finally

\`\`\`javascript
try {
  // Code that might throw an error
  const data = JSON.parse(invalidJson);
} catch (error) {
  // Handle the error
  console.error("Parse failed:", error.message);
} finally {
  // Always runs, error or not
  console.log("Cleanup complete");
}
\`\`\`

## The Error Object

\`\`\`javascript
const error = new Error("Something went wrong");
console.log(error.name);     // "Error"
console.log(error.message);  // "Something went wrong"
console.log(error.stack);    // Stack trace
\`\`\`

## Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
\`\`\`

## Error Types

\`\`\`javascript
throw new Error("Generic error");
throw new TypeError("Expected a string");
throw new RangeError("Value out of range");
throw new ReferenceError("Variable not defined");
throw new SyntaxError("Invalid syntax");
\`\`\`

## Custom Errors

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Email is invalid");
\`\`\`

## Error Handling Patterns

\`\`\`javascript
// Return null/default on error
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Re-throwing with context
try {
  processData(data);
} catch (error) {
  throw new Error(\`Failed to process: \${error.message}\`);
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Basic error handling",
        code: `// try/catch/finally
function parseJSON(str) {
  try {
    const result = JSON.parse(str);
    console.log("Parsed successfully");
    return result;
  } catch (error) {
    console.error("Parse error:", error.message);
    return null;
  } finally {
    console.log("Parse attempt complete");
  }
}

console.log(parseJSON('{"valid": true}'));
console.log(parseJSON('invalid'));

// Throwing errors
function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 0 || age > 150) {
    throw new RangeError("Age must be between 0 and 150");
  }
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  console.log(\`\${error.name}: \${error.message}\`);
}`,
        language: "javascript",
      },
      {
        title: "Custom errors and patterns",
        code: `// Custom error class
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// Validate user input
function validateUser(user) {
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("email", "Invalid email address");
  }
  if (!user.password || user.password.length < 8) {
    throw new ValidationError("password", "Password must be 8+ characters");
  }
  return true;
}

// Handle different error types
function createUser(userData) {
  try {
    validateUser(userData);
    console.log("User created successfully!");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(\`Validation failed for \${error.field}: \${error.message}\`);
    } else {
      console.log("Unexpected error:", error.message);
    }
  }
}

createUser({ email: "bad-email", password: "123" });
createUser({ email: "good@email.com", password: "securepass123" });`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-16-challenge",
      title: "Safe Division Function",
      description: "Create a safeDivide function that returns an object with either the result or an error message. Never throws.",
      starterCode: `// Create safeDivide(a, b) that returns:
// { success: true, result: number } on success
// { success: false, error: string } on error (division by zero or non-numbers)

// Test cases:
// safeDivide(10, 2)   -> { success: true, result: 5 }
// safeDivide(10, 0)   -> { success: false, error: "..." }
// safeDivide("a", 2)  -> { success: false, error: "..." }
`,
      solution: `function safeDivide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return { success: false, error: "Both arguments must be numbers" };
  }
  if (b === 0) {
    return { success: false, error: "Cannot divide by zero" };
  }
  return { success: true, result: a / b };
}

console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
console.log(safeDivide("a", 2));`,
      tests: [
        { name: "Returns success object for valid input", test: `output.includes("success") && output.includes("true")` },
        { name: "Handles division by zero", test: `output.includes("zero") || output.includes("false")` },
        { name: "Checks for numbers", test: `code.includes("typeof")` },
      ],
      hints: [
        "Check typeof for both arguments",
        "Check if b === 0",
        "Return object with success: true/false",
      ],
    },
  },
  {
    id: "js-17",
    slug: "callbacks-higher-order",
    title: "Callbacks & Higher-Order Functions",
    description: "Understand callbacks and functions that work with other functions",
    order: 17,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Callbacks & Higher-Order Functions

Functions are first-class citizens in JavaScript - they can be passed around like any other value.

## Callback Functions

A callback is a function passed as an argument to another function:

\`\`\`javascript
function greet(name, callback) {
  const message = \`Hello, \${name}!\`;
  callback(message);
}

greet("Alice", (msg) => console.log(msg));
\`\`\`

## Higher-Order Functions

Functions that take functions as arguments or return functions:

\`\`\`javascript
// Takes a function
function doTwice(fn) {
  fn();
  fn();
}

// Returns a function
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
console.log(double(5));  // 10
\`\`\`

## Common Callback Patterns

### Event Handlers
\`\`\`javascript
button.addEventListener("click", function(event) {
  console.log("Clicked!");
});
\`\`\`

### Array Methods
\`\`\`javascript
[1, 2, 3].forEach(num => console.log(num));
[1, 2, 3].map(num => num * 2);
\`\`\`

### Asynchronous Callbacks
\`\`\`javascript
setTimeout(() => {
  console.log("Delayed message");
}, 1000);
\`\`\`

## Callback Hell (The Problem)

Nested callbacks become hard to read:

\`\`\`javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // "Pyramid of doom"
    });
  });
});
\`\`\`

**Solution:** Use Promises or async/await (covered in next lessons).
    `,
    codeExamples: [
      {
        title: "Callback examples",
        code: `// Basic callback
function processArray(arr, callback) {
  const results = [];
  for (const item of arr) {
    results.push(callback(item));
  }
  return results;
}

const numbers = [1, 2, 3, 4, 5];
const squared = processArray(numbers, n => n * n);
console.log("Squared:", squared);

// Callback with error handling
function fetchData(id, onSuccess, onError) {
  if (id <= 0) {
    onError(new Error("Invalid ID"));
    return;
  }
  // Simulate async
  setTimeout(() => {
    onSuccess({ id, name: "Item " + id });
  }, 100);
}

fetchData(1,
  data => console.log("Success:", data),
  err => console.log("Error:", err.message)
);

fetchData(-1,
  data => console.log("Success:", data),
  err => console.log("Error:", err.message)
);`,
        language: "javascript",
      },
      {
        title: "Higher-order functions",
        code: `// Function that returns a function
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

console.log(sayHello("Alice"));
console.log(sayHi("Bob"));

// Function composition
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const compute = compose(square, double, addOne);
console.log(compute(3));  // ((3+1)*2)^2 = 64

// Partial application
function multiply(a, b) {
  return a * b;
}

function partial(fn, ...args) {
  return (...moreArgs) => fn(...args, ...moreArgs);
}

const double2 = partial(multiply, 2);
console.log(double2(5));  // 10`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-17-challenge",
      title: "Create a Filter Function",
      description: "Implement your own filter function that takes an array and a callback, returning elements where the callback returns true.",
      starterCode: `// Implement myFilter(array, callback)
// callback receives (element, index, array)
// Return new array with elements where callback returns true

// Test:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// myFilter(numbers, n => n % 2 === 0) should return [2, 4, 6, 8, 10]
// myFilter(numbers, n => n > 5) should return [6, 7, 8, 9, 10]
`,
      solution: `function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Evens:", myFilter(numbers, n => n % 2 === 0));
console.log("> 5:", myFilter(numbers, n => n > 5));`,
      tests: [
        { name: "Returns filtered array", test: `output.includes("2") && output.includes("4")` },
        { name: "Uses callback", test: `code.includes("callback")` },
        { name: "Doesn't use built-in filter", test: `!code.includes(".filter(")` },
      ],
      hints: [
        "Create an empty result array",
        "Loop through the array",
        "Call callback(element, index, array)",
        "If callback returns true, push to result",
      ],
    },
  },
  {
    id: "js-18",
    slug: "promises",
    title: "Promises",
    description: "Handle asynchronous operations with Promises",
    order: 18,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    content: `
# Promises

Promises represent eventual completion (or failure) of async operations.

## Promise States

1. **Pending** - Initial state
2. **Fulfilled** - Operation completed successfully
3. **Rejected** - Operation failed

## Creating a Promise

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});
\`\`\`

## Using Promises

\`\`\`javascript
promise
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  })
  .finally(() => {
    // Always runs
  });
\`\`\`

## Promise Chaining

\`\`\`javascript
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => displayPosts(posts))
  .catch(error => console.error(error));
\`\`\`

## Promise Static Methods

\`\`\`javascript
// Wait for all to complete
Promise.all([p1, p2, p3])
  .then(results => {});  // Array of results

// First to complete wins
Promise.race([p1, p2, p3])
  .then(firstResult => {});

// Wait for all to settle (fulfill or reject)
Promise.allSettled([p1, p2, p3])
  .then(results => {});

// First fulfilled wins (ignores rejections)
Promise.any([p1, p2, p3])
  .then(firstSuccess => {});
\`\`\`
    `,
    codeExamples: [
      {
        title: "Basic promises",
        code: `// Creating a promise
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(\`Done after \${ms}ms\`), ms);
  });
}

// Using the promise
delay(100).then(msg => console.log(msg));

// Promise that can reject
function fetchData(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch"));
      } else {
        resolve({ id: 1, name: "Data" });
      }
    }, 100);
  });
}

// Handle success and error
fetchData(false)
  .then(data => console.log("Success:", data))
  .catch(err => console.log("Error:", err.message));

fetchData(true)
  .then(data => console.log("Success:", data))
  .catch(err => console.log("Error:", err.message));`,
        language: "javascript",
      },
      {
        title: "Promise chaining and combinators",
        code: `// Simulated async functions
const getUser = (id) => Promise.resolve({ id, name: "Alice" });
const getPosts = (userId) => Promise.resolve([
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" }
]);

// Chaining
getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts.map(p => p.title));
  });

// Promise.all - parallel execution
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(results => {
    console.log("All results:", results);  // [1, 2, 3]
  });

// Promise.race - first to complete
const slow = new Promise(r => setTimeout(() => r("slow"), 200));
const fast = new Promise(r => setTimeout(() => r("fast"), 50));

Promise.race([slow, fast])
  .then(winner => console.log("Winner:", winner));  // "fast"`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-18-challenge",
      title: "Promise Chain",
      description: "Create a function that fetches a user, then their posts, and returns both combined. Use promise chaining.",
      starterCode: `// Simulated API functions (already provided)
const fetchUser = (id) =>
  new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "User " + id }), 50)
  );

const fetchUserPosts = (userId) =>
  new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, title: "First Post", userId },
      { id: 2, title: "Second Post", userId }
    ]), 50)
  );

// Create getUserWithPosts(id) that:
// 1. Fetches the user
// 2. Fetches their posts
// 3. Returns { user, posts }
`,
      solution: `const fetchUser = (id) =>
  new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "User " + id }), 50)
  );

const fetchUserPosts = (userId) =>
  new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, title: "First Post", userId },
      { id: 2, title: "Second Post", userId }
    ]), 50)
  );

function getUserWithPosts(id) {
  let userData;
  return fetchUser(id)
    .then(user => {
      userData = user;
      return fetchUserPosts(user.id);
    })
    .then(posts => {
      return { user: userData, posts };
    });
}

getUserWithPosts(1).then(result => {
  console.log("User:", result.user);
  console.log("Posts:", result.posts);
});`,
      tests: [
        { name: "Uses then chaining", test: `code.includes(".then")` },
        { name: "Returns combined object", test: `output.includes("User") && output.includes("Posts")` },
      ],
      hints: [
        "Store user data in a variable outside the chain",
        "Return fetchUserPosts in the first .then",
        "Combine user and posts in the second .then",
      ],
    },
  },
  {
    id: "js-19",
    slug: "async-await",
    title: "Async/Await",
    description: "Write asynchronous code that looks synchronous",
    order: 19,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Async/Await

Async/await is syntactic sugar over Promises, making async code easier to read.

## Basic Syntax

\`\`\`javascript
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
\`\`\`

## Key Rules

1. \`async\` functions always return a Promise
2. \`await\` can only be used inside \`async\` functions
3. \`await\` pauses execution until the Promise resolves

## Error Handling

\`\`\`javascript
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP error");
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}
\`\`\`

## Parallel Execution

Don't await sequentially when operations are independent:

\`\`\`javascript
// Sequential (slow)
const user = await getUser();
const posts = await getPosts();

// Parallel (fast)
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);
\`\`\`

## Arrow Function Syntax

\`\`\`javascript
const fetchData = async () => {
  const data = await fetch(url);
  return data.json();
};
\`\`\`

## Top-Level Await

In modules, you can use await at the top level:

\`\`\`javascript
// In ES modules
const data = await fetch(url).then(r => r.json());
\`\`\`
    `,
    codeExamples: [
      {
        title: "Async/await basics",
        code: `// Simulated async functions
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const fetchUser = async (id) => {
  await delay(50);
  return { id, name: "User " + id };
};
const fetchPosts = async (userId) => {
  await delay(50);
  return [{ title: "Post 1" }, { title: "Post 2" }];
};

// Using async/await
async function getUserData(id) {
  console.log("Fetching user...");
  const user = await fetchUser(id);
  console.log("Got user:", user.name);

  console.log("Fetching posts...");
  const posts = await fetchPosts(user.id);
  console.log("Got posts:", posts.length);

  return { user, posts };
}

// Call async function
getUserData(1).then(data => {
  console.log("Complete!", data);
});`,
        language: "javascript",
      },
      {
        title: "Error handling and parallel execution",
        code: `const delay = (ms) => new Promise(r => setTimeout(r, ms));

// Function that might fail
async function riskyFetch(shouldFail) {
  await delay(50);
  if (shouldFail) throw new Error("Fetch failed!");
  return { data: "success" };
}

// Error handling with try/catch
async function safeFetch() {
  try {
    const result = await riskyFetch(true);
    console.log("Result:", result);
  } catch (error) {
    console.log("Caught error:", error.message);
  } finally {
    console.log("Fetch attempt complete");
  }
}

safeFetch();

// Parallel execution with Promise.all
async function fetchMultiple() {
  const [user1, user2, user3] = await Promise.all([
    Promise.resolve({ id: 1, name: "Alice" }),
    Promise.resolve({ id: 2, name: "Bob" }),
    Promise.resolve({ id: 3, name: "Charlie" })
  ]);

  console.log("Users:", [user1.name, user2.name, user3.name]);
}

fetchMultiple();`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-19-challenge",
      title: "Async Data Fetcher",
      description: "Rewrite the promise chain from the previous lesson using async/await. Fetch user and posts in parallel for better performance.",
      starterCode: `// Same simulated APIs
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const fetchUser = async (id) => {
  await delay(50);
  return { id, name: "User " + id };
};

const fetchPosts = async (userId) => {
  await delay(50);
  return [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" }
  ];
};

// Create async function getUserWithPosts(id) using async/await
// Bonus: Fetch user and posts in parallel with Promise.all
`,
      solution: `const delay = (ms) => new Promise(r => setTimeout(r, ms));

const fetchUser = async (id) => {
  await delay(50);
  return { id, name: "User " + id };
};

const fetchPosts = async (userId) => {
  await delay(50);
  return [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" }
  ];
};

async function getUserWithPosts(id) {
  try {
    // Parallel fetching
    const [user, posts] = await Promise.all([
      fetchUser(id),
      fetchPosts(id)
    ]);
    return { user, posts };
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Test it
getUserWithPosts(1).then(result => {
  console.log("User:", result.user);
  console.log("Posts:", result.posts);
});`,
      tests: [
        { name: "Uses async keyword", test: `code.includes("async")` },
        { name: "Uses await keyword", test: `code.includes("await")` },
        { name: "Returns data", test: `output.includes("User")` },
      ],
      hints: [
        "Mark function with async keyword",
        "Use await before Promise-returning functions",
        "Use Promise.all for parallel execution",
        "Wrap in try/catch for error handling",
      ],
    },
  },
  {
    id: "js-20",
    slug: "classes-oop",
    title: "Classes & OOP",
    description: "Object-oriented programming with JavaScript classes",
    order: 20,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    content: `
# Classes & OOP

Classes provide a clean syntax for creating objects and implementing inheritance.

## Class Declaration

\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

const alice = new Person("Alice", 25);
\`\`\`

## Inheritance

\`\`\`javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);  // Call parent constructor
    this.grade = grade;
  }

  study() {
    return \`\${this.name} is studying\`;
  }
}
\`\`\`

## Static Methods & Properties

\`\`\`javascript
class MathHelper {
  static PI = 3.14159;

  static square(n) {
    return n * n;
  }
}

MathHelper.square(5);  // 25
MathHelper.PI;         // 3.14159
\`\`\`

## Getters and Setters

\`\`\`javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value < 0) throw new Error("Radius must be positive");
    this._radius = value;
  }

  get area() {
    return Math.PI * this._radius ** 2;
  }
}
\`\`\`

## Private Fields (ES2022)

\`\`\`javascript
class BankAccount {
  #balance = 0;  // Private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Class fundamentals",
        code: `class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  speak() {
    return \`\${this.name} makes a sound\`;
  }

  describe() {
    return \`\${this.name} is a \${this.species}\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "dog");
    this.breed = breed;
  }

  speak() {
    return \`\${this.name} barks: Woof!\`;
  }

  fetch() {
    return \`\${this.name} fetches the ball\`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.describe());
console.log(rex.speak());
console.log(rex.fetch());

// Check inheritance
console.log(rex instanceof Dog);     // true
console.log(rex instanceof Animal);  // true`,
        language: "javascript",
      },
      {
        title: "Practical class example",
        code: `class ShoppingCart {
  #items = [];  // Private field

  addItem(product, quantity = 1) {
    const existing = this.#items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    this.#items = this.#items.filter(i => i.product.id !== productId);
  }

  get total() {
    return this.#items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get itemCount() {
    return this.#items.reduce((sum, item) => sum + item.quantity, 0);
  }

  display() {
    console.log("Cart contents:");
    this.#items.forEach(item => {
      console.log(\`  \${item.product.name} x\${item.quantity} = $\${item.product.price * item.quantity}\`);
    });
    console.log(\`Total: $\${this.total}\`);
  }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: "Laptop", price: 999 });
cart.addItem({ id: 2, name: "Mouse", price: 29 }, 2);
cart.display();`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-20-challenge",
      title: "Create a Task Manager",
      description: "Create a TodoList class with methods to add, complete, and list tasks. Each task has an id, title, and completed status.",
      starterCode: `// Create a TodoList class with:
// - addTask(title) - adds a new task, returns the task
// - completeTask(id) - marks task as completed
// - getTasks() - returns all tasks
// - getPending() - returns incomplete tasks
// - getCompleted() - returns completed tasks

// Test:
// const list = new TodoList();
// list.addTask("Learn JavaScript");
// list.addTask("Build a project");
// list.completeTask(1);
// console.log(list.getPending());
`,
      solution: `class TodoList {
  #tasks = [];
  #nextId = 1;

  addTask(title) {
    const task = {
      id: this.#nextId++,
      title,
      completed: false
    };
    this.#tasks.push(task);
    return task;
  }

  completeTask(id) {
    const task = this.#tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
    }
    return task;
  }

  getTasks() {
    return [...this.#tasks];
  }

  getPending() {
    return this.#tasks.filter(t => !t.completed);
  }

  getCompleted() {
    return this.#tasks.filter(t => t.completed);
  }
}

const list = new TodoList();
list.addTask("Learn JavaScript");
list.addTask("Build a project");
list.addTask("Deploy app");
list.completeTask(1);

console.log("All tasks:", list.getTasks());
console.log("Pending:", list.getPending());
console.log("Completed:", list.getCompleted());`,
      tests: [
        { name: "Uses class keyword", test: `code.includes("class TodoList")` },
        { name: "Has addTask method", test: `code.includes("addTask")` },
        { name: "Has completeTask method", test: `code.includes("completeTask")` },
        { name: "Filters correctly", test: `output.includes("Pending") && output.includes("Completed")` },
      ],
      hints: [
        "Use an array to store tasks",
        "Use an id counter that increments",
        "Each task: { id, title, completed: false }",
        "Use filter() for getPending and getCompleted",
      ],
    },
  },
  {
    id: "js-21",
    slug: "modules",
    title: "Modules",
    description: "Organize code with import and export",
    order: 21,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `
# Modules

Modules help organize code into reusable, maintainable pieces.

## Named Exports

\`\`\`javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
\`\`\`

## Named Imports

\`\`\`javascript
// app.js
import { add, multiply, PI } from './math.js';

console.log(add(2, 3));
console.log(PI);
\`\`\`

## Default Exports

Each module can have one default export:

\`\`\`javascript
// Calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
}

// app.js
import Calculator from './Calculator.js';
\`\`\`

## Combining Exports

\`\`\`javascript
// utils.js
export const helper = () => {};
export default class MainClass {}

// app.js
import MainClass, { helper } from './utils.js';
\`\`\`

## Renaming Imports/Exports

\`\`\`javascript
// On import
import { add as sum } from './math.js';

// On export
export { localName as exportedName };
\`\`\`

## Import All

\`\`\`javascript
import * as math from './math.js';
math.add(2, 3);
math.PI;
\`\`\`

## Dynamic Imports

\`\`\`javascript
// Load module only when needed
const module = await import('./heavy-module.js');
module.doSomething();
\`\`\`
    `,
    codeExamples: [
      {
        title: "Module structure",
        code: `// Simulating module structure
// In a real project, these would be separate files

// --- utils/math.js ---
const mathModule = {
  PI: 3.14159,
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

// --- utils/string.js ---
const stringModule = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  reverse: (str) => str.split('').reverse().join('')
};

// --- Using the modules ---
console.log("Math operations:");
console.log("2 + 3 =", mathModule.add(2, 3));
console.log("PI =", mathModule.PI);

console.log("\\nString operations:");
console.log("capitalize:", stringModule.capitalize("hello"));
console.log("reverse:", stringModule.reverse("hello"));`,
        language: "javascript",
      },
      {
        title: "Export patterns",
        code: `// Common module patterns

// 1. Named exports (multiple per file)
// export const fetchUser = async (id) => { ... };
// export const fetchPosts = async () => { ... };

// 2. Default export (one per file, usually classes or main function)
// export default class UserService { ... }

// 3. Barrel exports (re-export from index file)
// index.js
// export { fetchUser } from './fetchUser';
// export { fetchPosts } from './fetchPosts';
// export { default as UserService } from './UserService';

// Example: Config module pattern
const createConfig = (env) => ({
  apiUrl: env === 'production'
    ? 'https://api.example.com'
    : 'http://localhost:3000',
  debug: env !== 'production',
  timeout: 5000
});

const config = createConfig('development');
console.log("Config:", config);

// Example: Factory pattern
function createLogger(prefix) {
  return {
    log: (msg) => console.log(\`[\${prefix}] \${msg}\`),
    error: (msg) => console.error(\`[\${prefix}] ERROR: \${msg}\`),
    warn: (msg) => console.warn(\`[\${prefix}] WARNING: \${msg}\`)
  };
}

const appLogger = createLogger("App");
const dbLogger = createLogger("Database");

appLogger.log("Application started");
dbLogger.log("Connected to database");`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-21-challenge",
      title: "Module Organization",
      description: "Create a user service module with functions for creating, finding, and updating users. Simulate the module pattern.",
      starterCode: `// Create a userService object that simulates a module with:
// - users array (private data)
// - createUser(name, email) - adds user, returns user with id
// - findUser(id) - returns user or undefined
// - updateUser(id, updates) - updates user properties
// - getAllUsers() - returns all users

// Test the service
`,
      solution: `const userService = (() => {
  // Private data
  let users = [];
  let nextId = 1;

  return {
    createUser(name, email) {
      const user = { id: nextId++, name, email };
      users.push(user);
      return user;
    },

    findUser(id) {
      return users.find(u => u.id === id);
    },

    updateUser(id, updates) {
      const user = this.findUser(id);
      if (user) {
        Object.assign(user, updates);
      }
      return user;
    },

    getAllUsers() {
      return [...users];
    }
  };
})();

// Test
const alice = userService.createUser("Alice", "alice@test.com");
console.log("Created:", alice);

userService.createUser("Bob", "bob@test.com");
console.log("All users:", userService.getAllUsers());

userService.updateUser(1, { email: "alice@newmail.com" });
console.log("Updated:", userService.findUser(1));`,
      tests: [
        { name: "Has createUser", test: `code.includes("createUser")` },
        { name: "Has findUser", test: `code.includes("findUser")` },
        { name: "Creates users with IDs", test: `output.includes("id")` },
      ],
      hints: [
        "Use IIFE pattern to create private scope",
        "Store users array in closure",
        "Return object with public methods",
        "Use Object.assign for updates",
      ],
    },
  },
  {
    id: "js-22",
    slug: "dom-manipulation",
    title: "DOM Manipulation",
    description: "Select, modify, and create HTML elements with JavaScript",
    order: 22,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    content: `
# DOM Manipulation

The DOM (Document Object Model) lets JavaScript interact with HTML.

## Selecting Elements

\`\`\`javascript
// By ID
const element = document.getElementById('myId');

// By class (returns collection)
const elements = document.getElementsByClassName('myClass');

// By tag (returns collection)
const divs = document.getElementsByTagName('div');

// CSS selector (first match)
const element = document.querySelector('.myClass');

// CSS selector (all matches)
const elements = document.querySelectorAll('.myClass');
\`\`\`

## Modifying Content

\`\`\`javascript
element.textContent = 'New text';     // Plain text
element.innerHTML = '<b>Bold</b>';    // HTML content
element.innerText = 'Visible text';   // Visible text only
\`\`\`

## Modifying Attributes

\`\`\`javascript
element.setAttribute('href', '/page');
element.getAttribute('href');
element.removeAttribute('disabled');
element.id = 'newId';
element.className = 'class1 class2';
\`\`\`

## Modifying Styles

\`\`\`javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('visible');
element.classList.contains('active');
\`\`\`

## Creating Elements

\`\`\`javascript
const div = document.createElement('div');
div.textContent = 'Hello';
div.classList.add('card');
parent.appendChild(div);
parent.insertBefore(div, existingChild);
parent.removeChild(child);
element.remove();
\`\`\`
    `,
    codeExamples: [
      {
        title: "DOM selection and modification",
        code: `// This code would run in a browser with HTML

// Simulating DOM-like operations
const mockDocument = {
  elements: {},

  createElement(tag) {
    return {
      tagName: tag.toUpperCase(),
      textContent: '',
      classList: new Set(),
      style: {},
      children: [],
      appendChild(child) {
        this.children.push(child);
      }
    };
  }
};

// Creating elements
const card = mockDocument.createElement('div');
card.classList.add('card');
card.style.padding = '20px';

const title = mockDocument.createElement('h2');
title.textContent = 'Hello World';

const content = mockDocument.createElement('p');
content.textContent = 'This is a card component';

card.appendChild(title);
card.appendChild(content);

console.log("Created element:");
console.log("Tag:", card.tagName);
console.log("Classes:", [...card.classList]);
console.log("Style:", card.style);
console.log("Children:", card.children.length);`,
        language: "javascript",
      },
      {
        title: "Building a component",
        code: `// Component pattern for DOM manipulation
function createCard({ title, content, onClick }) {
  // In browser: document.createElement
  const card = {
    type: 'div',
    className: 'card',
    children: [
      {
        type: 'h3',
        className: 'card-title',
        text: title
      },
      {
        type: 'p',
        className: 'card-content',
        text: content
      },
      {
        type: 'button',
        className: 'card-button',
        text: 'Click me',
        onClick: onClick
      }
    ]
  };
  return card;
}

// Create multiple cards
const cards = [
  createCard({
    title: 'Card 1',
    content: 'First card content',
    onClick: () => console.log('Clicked card 1')
  }),
  createCard({
    title: 'Card 2',
    content: 'Second card content',
    onClick: () => console.log('Clicked card 2')
  })
];

console.log("Created cards:");
cards.forEach(card => {
  console.log(\`- \${card.children[0].text}: \${card.children[1].text}\`);
});`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-22-challenge",
      title: "Virtual DOM Builder",
      description: "Create a simple function that builds a virtual DOM tree (object representation of HTML elements).",
      starterCode: `// Create a function createElement(tag, props, ...children)
// that returns an object representing a DOM element

// Example usage:
// const vdom = createElement('div', { className: 'container' },
//   createElement('h1', null, 'Hello'),
//   createElement('p', { id: 'intro' }, 'Welcome!')
// );

// Should return:
// {
//   tag: 'div',
//   props: { className: 'container' },
//   children: [
//     { tag: 'h1', props: null, children: ['Hello'] },
//     { tag: 'p', props: { id: 'intro' }, children: ['Welcome!'] }
//   ]
// }
`,
      solution: `function createElement(tag, props, ...children) {
  return {
    tag,
    props,
    children
  };
}

// Test it
const vdom = createElement('div', { className: 'container' },
  createElement('h1', null, 'Hello'),
  createElement('p', { id: 'intro' }, 'Welcome!'),
  createElement('ul', { className: 'list' },
    createElement('li', null, 'Item 1'),
    createElement('li', null, 'Item 2')
  )
);

// Pretty print the structure
function printVDOM(node, indent = 0) {
  const spaces = '  '.repeat(indent);
  if (typeof node === 'string') {
    console.log(\`\${spaces}"\${node}"\`);
    return;
  }
  const propsStr = node.props
    ? JSON.stringify(node.props)
    : '';
  console.log(\`\${spaces}<\${node.tag}> \${propsStr}\`);
  node.children.forEach(child => printVDOM(child, indent + 1));
}

printVDOM(vdom);`,
      tests: [
        { name: "Function exists", test: `code.includes("createElement")` },
        { name: "Returns object with tag", test: `output.includes("div") || output.includes("tag")` },
        { name: "Handles nested elements", test: `output.includes("h1") || output.includes("li")` },
      ],
      hints: [
        "Return an object with tag, props, and children",
        "Use rest parameter (...children) to collect all children",
        "Children can be strings or other elements",
      ],
    },
  },
  {
    id: "js-23",
    slug: "event-handling",
    title: "Event Handling",
    description: "Handle user interactions with event listeners",
    order: 23,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 30,
    content: `
# Event Handling

Events let your code respond to user interactions.

## Adding Event Listeners

\`\`\`javascript
element.addEventListener('click', function(event) {
  console.log('Clicked!');
});

// With arrow function
element.addEventListener('click', (e) => {
  console.log('Clicked!');
});
\`\`\`

## Common Events

| Event | Description |
|-------|-------------|
| click | Mouse click |
| dblclick | Double click |
| mouseenter | Mouse enters element |
| mouseleave | Mouse leaves element |
| keydown | Key pressed |
| keyup | Key released |
| submit | Form submitted |
| change | Input value changed |
| input | Input value changing |
| focus | Element focused |
| blur | Element lost focus |
| load | Page/resource loaded |
| scroll | Element scrolled |

## The Event Object

\`\`\`javascript
element.addEventListener('click', (event) => {
  event.target;          // Element that triggered event
  event.currentTarget;   // Element with listener
  event.type;            // Event type ('click')
  event.preventDefault();  // Stop default behavior
  event.stopPropagation(); // Stop bubbling
});
\`\`\`

## Event Bubbling & Capturing

Events bubble up from target to ancestors:

\`\`\`javascript
// Bubbling (default) - inner to outer
parent.addEventListener('click', handler);

// Capturing - outer to inner
parent.addEventListener('click', handler, true);
\`\`\`

## Event Delegation

Handle events on parent for dynamic children:

\`\`\`javascript
list.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('List item clicked:', e.target.textContent);
  }
});
\`\`\`
    `,
    codeExamples: [
      {
        title: "Event handling patterns",
        code: `// Simulating event handling
class EventEmitter {
  constructor() {
    this.events = {};
  }

  addEventListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  removeEventListener(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event]
        .filter(cb => cb !== callback);
    }
  }
}

// Simulating a button
const button = new EventEmitter();

// Add click handler
const handleClick = (e) => {
  console.log("Button clicked!", e);
};

button.addEventListener('click', handleClick);
button.addEventListener('click', () => {
  console.log("Another handler");
});

// Simulate clicks
console.log("First click:");
button.emit('click', { type: 'click', target: 'button' });

// Remove handler and click again
button.removeEventListener('click', handleClick);
console.log("\\nAfter removing first handler:");
button.emit('click', { type: 'click', target: 'button' });`,
        language: "javascript",
      },
      {
        title: "Event delegation pattern",
        code: `// Event delegation example
const createTodoApp = () => {
  const state = {
    todos: [],
    nextId: 1
  };

  // Simulated event delegation
  const handleEvent = (eventType, targetType, targetId) => {
    console.log(\`Event: \${eventType} on \${targetType} #\${targetId}\`);

    if (eventType === 'click' && targetType === 'delete-btn') {
      state.todos = state.todos.filter(t => t.id !== targetId);
      console.log("Todo deleted");
    }

    if (eventType === 'click' && targetType === 'toggle-btn') {
      const todo = state.todos.find(t => t.id === targetId);
      if (todo) {
        todo.completed = !todo.completed;
        console.log(\`Todo toggled: \${todo.completed}\`);
      }
    }
  };

  const addTodo = (text) => {
    const todo = { id: state.nextId++, text, completed: false };
    state.todos.push(todo);
    return todo;
  };

  return { handleEvent, addTodo, state };
};

const app = createTodoApp();
app.addTodo("Learn events");
app.addTodo("Practice coding");

console.log("Todos:", app.state.todos);

// Simulate events
app.handleEvent('click', 'toggle-btn', 1);
app.handleEvent('click', 'delete-btn', 2);

console.log("After events:", app.state.todos);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-23-challenge",
      title: "Custom Event System",
      description: "Create an EventEmitter class that supports on, off, emit, and once methods.",
      starterCode: `// Create an EventEmitter class with:
// - on(event, callback) - subscribe to event
// - off(event, callback) - unsubscribe from event
// - emit(event, data) - trigger event with data
// - once(event, callback) - subscribe for one-time only

// Test:
// const emitter = new EventEmitter();
// emitter.on('message', (data) => console.log('Got:', data));
// emitter.emit('message', 'Hello!');
`,
      solution: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event]
        .filter(cb => cb !== callback);
    }
    return this;
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
    return this;
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

// Test
const emitter = new EventEmitter();

emitter.on('message', data => console.log('Handler 1:', data));
emitter.once('message', data => console.log('Once handler:', data));

console.log('First emit:');
emitter.emit('message', 'Hello!');

console.log('\\nSecond emit:');
emitter.emit('message', 'Hi again!');`,
      tests: [
        { name: "Has EventEmitter class", test: `code.includes("class EventEmitter")` },
        { name: "Has on method", test: `code.includes("on(")` },
        { name: "Has emit method", test: `code.includes("emit(")` },
        { name: "Once fires only once", test: `output.includes("Once handler") && (output.match(/Once handler/g) || []).length === 1` },
      ],
      hints: [
        "Store events in an object: { eventName: [callbacks] }",
        "For once(), create a wrapper that calls off() after executing",
        "Return 'this' for method chaining",
      ],
    },
  },
  {
    id: "js-24",
    slug: "regular-expressions",
    title: "Regular Expressions",
    description: "Pattern matching and text manipulation with regex",
    order: 24,
    category: "JavaScript Intermediate",
    difficulty: "intermediate",
    estimatedMinutes: 35,
    content: `
# Regular Expressions

Regular expressions (regex) are patterns for matching text.

## Creating Regex

\`\`\`javascript
// Literal notation
const regex = /pattern/flags;

// Constructor
const regex = new RegExp('pattern', 'flags');
\`\`\`

## Common Patterns

| Pattern | Matches |
|---------|---------|
| . | Any character except newline |
| \\d | Digit (0-9) |
| \\w | Word character (a-z, A-Z, 0-9, _) |
| \\s | Whitespace |
| [abc] | a, b, or c |
| [^abc] | Not a, b, or c |
| [a-z] | Any lowercase letter |
| ^ | Start of string |
| $ | End of string |

## Quantifiers

| Quantifier | Meaning |
|------------|---------|
| * | 0 or more |
| + | 1 or more |
| ? | 0 or 1 |
| {n} | Exactly n |
| {n,} | n or more |
| {n,m} | Between n and m |

## Flags

| Flag | Description |
|------|-------------|
| g | Global (find all) |
| i | Case-insensitive |
| m | Multiline |

## Methods

\`\`\`javascript
// Test if matches
/pattern/.test(string);

// Find matches
string.match(/pattern/g);

// Replace
string.replace(/pattern/g, 'replacement');

// Split
string.split(/pattern/);

// Find with details
/pattern/.exec(string);
\`\`\`
    `,
    codeExamples: [
      {
        title: "Basic regex operations",
        code: `// Testing patterns
const email = "user@example.com";
const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i;
console.log("Valid email:", emailRegex.test(email));

// Finding matches
const text = "Call 123-456-7890 or 098-765-4321";
const phoneRegex = /\\d{3}-\\d{3}-\\d{4}/g;
console.log("Phones:", text.match(phoneRegex));

// Replacing
const messy = "too    many     spaces";
const clean = messy.replace(/\\s+/g, ' ');
console.log("Cleaned:", clean);

// Extracting groups
const date = "2024-03-15";
const dateRegex = /(\\d{4})-(\\d{2})-(\\d{2})/;
const [full, year, month, day] = date.match(dateRegex);
console.log(\`Year: \${year}, Month: \${month}, Day: \${day}\`);

// Split by pattern
const csv = "apple,banana,,cherry";
const items = csv.split(/,+/);
console.log("Items:", items);`,
        language: "javascript",
      },
      {
        title: "Common regex recipes",
        code: `// Validation functions using regex
const validators = {
  email: (str) => /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i.test(str),
  phone: (str) => /^\\d{3}-\\d{3}-\\d{4}$/.test(str),
  url: (str) => /^https?:\\/\\/[\\w.-]+/.test(str),
  password: (str) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/.test(str),
  username: (str) => /^[a-z][a-z0-9_]{2,19}$/i.test(str)
};

// Test validations
console.log("Email valid:", validators.email("test@example.com"));
console.log("Phone valid:", validators.phone("123-456-7890"));
console.log("URL valid:", validators.url("https://example.com"));
console.log("Password valid:", validators.password("SecurePass1"));
console.log("Username valid:", validators.username("john_doe"));

// Extract data from text
const log = "[2024-03-15 14:30:00] ERROR: Connection failed";
const logRegex = /\\[(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})\\] (\\w+): (.+)/;
const match = log.match(logRegex);
if (match) {
  const [, date, time, level, message] = match;
  console.log({ date, time, level, message });
}`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-24-challenge",
      title: "Text Parser",
      description: "Create functions to validate and parse different formats: emails, phone numbers (xxx-xxx-xxxx), and extract hashtags from text.",
      starterCode: `// Create these functions:

// 1. isValidEmail(email) - returns boolean

// 2. isValidPhone(phone) - format: xxx-xxx-xxxx

// 3. extractHashtags(text) - returns array of hashtags
//    Example: "Hello #world! #javascript" -> ["#world", "#javascript"]

// Test your functions:
`,
      solution: `function isValidEmail(email) {
  return /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i.test(email);
}

function isValidPhone(phone) {
  return /^\\d{3}-\\d{3}-\\d{4}$/.test(phone);
}

function extractHashtags(text) {
  return text.match(/#\\w+/g) || [];
}

// Tests
console.log("Email tests:");
console.log("test@example.com:", isValidEmail("test@example.com"));
console.log("invalid-email:", isValidEmail("invalid-email"));

console.log("\\nPhone tests:");
console.log("123-456-7890:", isValidPhone("123-456-7890"));
console.log("1234567890:", isValidPhone("1234567890"));

console.log("\\nHashtag tests:");
console.log(extractHashtags("Hello #world! #javascript is #awesome"));
console.log(extractHashtags("No hashtags here"));`,
      tests: [
        { name: "Validates correct email", test: `output.includes("test@example.com") && output.includes("true")` },
        { name: "Validates correct phone", test: `output.includes("123-456-7890") && output.includes("true")` },
        { name: "Extracts hashtags", test: `output.includes("#world") && output.includes("#javascript")` },
      ],
      hints: [
        "Email pattern: /^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-z]{2,}$/i",
        "Phone pattern: /^\\\\d{3}-\\\\d{3}-\\\\d{4}$/",
        "Hashtag pattern: /#\\\\w+/g",
        "Use || [] for match to handle no matches",
      ],
    },
  },
];

// ============================================
// JAVASCRIPT ADVANCED (Lessons 25-34)
// ============================================

export const jsAdvanced: Lesson[] = [
  {
    id: "js-25",
    slug: "closures-lexical-scope",
    title: "Closures & Lexical Scope",
    description: "Master closures for data encapsulation and the module pattern",
    order: 25,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Closures & Lexical Scope

Closures are functions that remember their lexical environment even after the outer function has finished executing.

## Lexical Scope

Functions can access variables from their parent scope:

\`\`\`javascript
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);  // Can access 'message'
  }

  inner();
}
\`\`\`

## What is a Closure?

A closure is created when a function is returned from another function, maintaining access to the outer function's variables:

\`\`\`javascript
function createCounter() {
  let count = 0;  // Private variable

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter();  // 1
counter();  // 2
\`\`\`

## Practical Uses of Closures

### Data Privacy
\`\`\`javascript
function createBankAccount(initial) {
  let balance = initial;  // Private

  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance() { return balance; }
  };
}
\`\`\`

### Function Factories
\`\`\`javascript
function multiply(factor) {
  return (number) => number * factor;
}
const double = multiply(2);
const triple = multiply(3);
\`\`\`

### Memoization
\`\`\`javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = fn.apply(this, args);
    }
    return cache[key];
  };
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Closure examples",
        code: `// Counter with private state
function createCounter(initial = 0) {
  let count = initial;

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    get() { return count; },
    reset() { count = initial; return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.decrement());  // 11
console.log(counter.reset());      // 10

// Multiple independent counters
const counter2 = createCounter(0);
console.log(counter2.increment());  // 1
console.log(counter.get());         // 10 (unchanged)`,
        language: "javascript",
      },
      {
        title: "Module pattern",
        code: `// Module pattern using closures
const Calculator = (function() {
  // Private variables and functions
  let history = [];

  function addToHistory(operation, result) {
    history.push({ operation, result, timestamp: Date.now() });
  }

  // Public API
  return {
    add(a, b) {
      const result = a + b;
      addToHistory(\`\${a} + \${b}\`, result);
      return result;
    },
    subtract(a, b) {
      const result = a - b;
      addToHistory(\`\${a} - \${b}\`, result);
      return result;
    },
    getHistory() {
      return [...history];  // Return copy
    },
    clearHistory() {
      history = [];
    }
  };
})();

console.log(Calculator.add(5, 3));
console.log(Calculator.subtract(10, 4));
console.log(Calculator.getHistory());`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-25-challenge",
      title: "Create Rate Limiter",
      description: "Create a rate limiter function that allows a function to be called only once per specified time period.",
      starterCode: `// Create rateLimit(fn, delay) that returns a rate-limited function
// The returned function:
// - Calls fn immediately on first call
// - Ignores calls within 'delay' ms of last successful call
// - Returns result of fn when called, or undefined if rate limited

// Test:
// const limited = rateLimit((x) => x * 2, 1000);
// console.log(limited(5));  // 10
// console.log(limited(5));  // undefined (too soon)
`,
      solution: `function rateLimit(fn, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
    return undefined;
  };
}

// Test
const limited = rateLimit((x) => {
  console.log("Called with:", x);
  return x * 2;
}, 100);

console.log("Result 1:", limited(5));

// Simulate immediate second call
console.log("Result 2:", limited(10));

// Wait and call again
setTimeout(() => {
  console.log("Result 3:", limited(15));
}, 150);`,
      tests: [
        { name: "Returns function", test: `code.includes("return function")` },
        { name: "Tracks last call time", test: `code.includes("Date.now") || code.includes("lastCall")` },
        { name: "Calls original function", test: `output.includes("Called with")` },
      ],
      hints: [
        "Store lastCall timestamp in closure",
        "Compare Date.now() with lastCall",
        "Update lastCall when allowing call",
        "Return undefined when rate limited",
      ],
    },
  },
  {
    id: "js-26",
    slug: "prototypes-inheritance",
    title: "Prototypes & Inheritance",
    description: "Understand JavaScript's prototype chain and inheritance model",
    order: 26,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Prototypes & Inheritance

JavaScript uses prototypal inheritance - objects inherit from other objects.

## The Prototype Chain

Every object has an internal link to another object called its prototype:

\`\`\`javascript
const arr = [1, 2, 3];
// arr -> Array.prototype -> Object.prototype -> null

arr.map(x => x * 2);  // map is on Array.prototype
arr.toString();       // toString is on Object.prototype
\`\`\`

## __proto__ vs prototype

- \`__proto__\`: The actual prototype link (on instances)
- \`prototype\`: Property on constructor functions

\`\`\`javascript
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  return "Woof!";
};

const rex = new Dog("Rex");
rex.__proto__ === Dog.prototype;  // true
\`\`\`

## Object.create()

Create objects with a specified prototype:

\`\`\`javascript
const animal = {
  speak() { return "Some sound"; }
};

const dog = Object.create(animal);
dog.bark = function() { return "Woof!"; };

dog.speak();  // "Some sound" (inherited)
dog.bark();   // "Woof!" (own method)
\`\`\`

## Prototype Methods

\`\`\`javascript
Object.getPrototypeOf(obj);    // Get prototype
Object.setPrototypeOf(obj, proto); // Set prototype
obj.hasOwnProperty('prop');    // Check own property
'prop' in obj;                 // Check own or inherited
Object.keys(obj);              // Own enumerable keys
\`\`\`
    `,
    codeExamples: [
      {
        title: "Prototype inheritance",
        code: `// Constructor function pattern
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific methods
Dog.prototype.bark = function() {
  return \`\${this.name} says Woof!\`;
};

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak());  // Inherited from Animal
console.log(rex.bark());   // Own method
console.log(rex instanceof Dog);     // true
console.log(rex instanceof Animal);  // true`,
        language: "javascript",
      },
      {
        title: "Object.create patterns",
        code: `// Cleaner prototype inheritance
const vehicle = {
  init(make, model) {
    this.make = make;
    this.model = model;
    return this;
  },
  describe() {
    return \`\${this.make} \${this.model}\`;
  }
};

const car = Object.create(vehicle);
car.drive = function() {
  return \`Driving \${this.describe()}\`;
};

const myCar = Object.create(car).init("Toyota", "Camry");
console.log(myCar.describe());
console.log(myCar.drive());

// Check prototype chain
console.log("Own properties:", Object.keys(myCar));
console.log("Has 'make':", myCar.hasOwnProperty('make'));
console.log("Has 'drive':", myCar.hasOwnProperty('drive'));
console.log("'drive' in myCar:", 'drive' in myCar);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-26-challenge",
      title: "Prototype Chain",
      description: "Create a Shape -> Rectangle -> Square inheritance hierarchy using prototypes (not classes).",
      starterCode: `// Create Shape with area() method that returns 0
// Create Rectangle that extends Shape with width, height, and area()
// Create Square that extends Rectangle (only needs side length)

// Test:
// const rect = new Rectangle(4, 5);
// console.log(rect.area());  // 20
// const square = new Square(4);
// console.log(square.area());  // 16
`,
      solution: `function Shape() {}
Shape.prototype.area = function() {
  return 0;
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.area = function() {
  return this.width * this.height;
};

function Square(side) {
  Rectangle.call(this, side, side);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

// Test
const shape = new Shape();
console.log("Shape area:", shape.area());

const rect = new Rectangle(4, 5);
console.log("Rectangle area:", rect.area());

const square = new Square(4);
console.log("Square area:", square.area());

console.log("square instanceof Square:", square instanceof Square);
console.log("square instanceof Rectangle:", square instanceof Rectangle);
console.log("square instanceof Shape:", square instanceof Shape);`,
      tests: [
        { name: "Rectangle area works", test: `output.includes("20")` },
        { name: "Square area works", test: `output.includes("16")` },
        { name: "Uses prototype inheritance", test: `code.includes("Object.create")` },
      ],
      hints: [
        "Use Object.create(Parent.prototype) for inheritance",
        "Call parent constructor with Parent.call(this, args)",
        "Set constructor property after creating prototype",
      ],
    },
  },
  {
    id: "js-27",
    slug: "this-keyword",
    title: "The this Keyword",
    description: "Master the binding rules for 'this' in different contexts",
    order: 27,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `
# The this Keyword

\`this\` refers to the execution context - it changes based on how a function is called.

## Binding Rules (Priority Order)

### 1. new Binding
\`\`\`javascript
function User(name) {
  this.name = name;
}
const user = new User("Alice");  // this = new object
\`\`\`

### 2. Explicit Binding (call, apply, bind)
\`\`\`javascript
function greet() {
  console.log(this.name);
}
const obj = { name: "Alice" };
greet.call(obj);   // this = obj
greet.apply(obj);  // this = obj
const bound = greet.bind(obj);
bound();           // this = obj
\`\`\`

### 3. Implicit Binding (method call)
\`\`\`javascript
const obj = {
  name: "Alice",
  greet() { console.log(this.name); }
};
obj.greet();  // this = obj
\`\`\`

### 4. Default Binding
\`\`\`javascript
function greet() {
  console.log(this);  // window (browser) or undefined (strict)
}
greet();
\`\`\`

## Arrow Functions

Arrow functions don't have their own \`this\` - they inherit from enclosing scope:

\`\`\`javascript
const obj = {
  name: "Alice",
  greet: function() {
    setTimeout(() => {
      console.log(this.name);  // "Alice" - inherits this
    }, 100);
  }
};
\`\`\`

## Common Pitfalls

\`\`\`javascript
// Losing this context
const obj = { name: "Alice", greet() { console.log(this.name); } };
const greet = obj.greet;
greet();  // undefined - lost context!

// Fix with bind
const boundGreet = obj.greet.bind(obj);
\`\`\`
    `,
    codeExamples: [
      {
        title: "this binding examples",
        code: `// Different binding contexts
const person = {
  name: "Alice",

  // Method - implicit binding
  greet() {
    console.log("Method this:", this.name);
  },

  // Arrow in method - lexical this
  greetDelayed() {
    setTimeout(() => {
      console.log("Arrow this:", this.name);
    }, 10);
  },

  // Regular function in method - lost binding
  greetLost() {
    setTimeout(function() {
      console.log("Lost this:", this?.name);
    }, 10);
  }
};

person.greet();
person.greetDelayed();
person.greetLost();

// call, apply, bind
function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, I'm \${this.name}\${punctuation}\`);
}

const bob = { name: "Bob" };

introduce.call(bob, "Hello", "!");    // this = bob
introduce.apply(bob, ["Hi", "."]);    // this = bob, args as array

const boundIntro = introduce.bind(bob, "Hey");
boundIntro("?");  // "Hey, I'm Bob?"`,
        language: "javascript",
      },
      {
        title: "Practical this patterns",
        code: `// Event handler pattern
class Button {
  constructor(label) {
    this.label = label;
    this.clicks = 0;

    // Bind in constructor
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.clicks++;
    console.log(\`\${this.label} clicked \${this.clicks} times\`);
  }
}

const btn = new Button("Submit");
btn.handleClick();
btn.handleClick();

// Alternative: arrow function class field
class ModernButton {
  label = "";
  clicks = 0;

  constructor(label) {
    this.label = label;
  }

  // Arrow function - automatically bound
  handleClick = () => {
    this.clicks++;
    console.log(\`\${this.label} clicked \${this.clicks} times\`);
  };
}

const modernBtn = new ModernButton("Cancel");
const handler = modernBtn.handleClick;
handler();  // Works! this is bound`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-27-challenge",
      title: "Fix the this Problem",
      description: "Fix the broken code so that the timer correctly tracks elapsed time.",
      starterCode: `// This code is broken - fix it!
const timer = {
  seconds: 0,

  start() {
    setInterval(function() {
      this.seconds++;
      console.log("Elapsed:", this.seconds, "seconds");
    }, 100);
  }
};

// Currently this.seconds is undefined inside the callback
// Fix it using one of:
// 1. Arrow function
// 2. bind()
// 3. const self = this

timer.start();
`,
      solution: `// Fixed with arrow function
const timer = {
  seconds: 0,

  start() {
    const interval = setInterval(() => {
      this.seconds++;
      console.log("Elapsed:", this.seconds, "seconds");
      if (this.seconds >= 3) {
        clearInterval(interval);
        console.log("Timer stopped");
      }
    }, 100);
  }
};

timer.start();`,
      tests: [
        { name: "Timer increments", test: `output.includes("1") && output.includes("2")` },
        { name: "Uses arrow function or bind", test: `code.includes("=>") || code.includes(".bind")` },
      ],
      hints: [
        "Arrow functions inherit this from enclosing scope",
        "Replace function() with () =>",
        "Alternative: use .bind(this) on the function",
      ],
    },
  },
  {
    id: "js-28",
    slug: "iterators-generators",
    title: "Iterators & Generators",
    description: "Create custom iteration with iterators and generators",
    order: 28,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Iterators & Generators

Create custom iteration behavior for your objects.

## The Iterator Protocol

An iterator is an object with a \`next()\` method that returns \`{ value, done }\`:

\`\`\`javascript
const iterator = {
  current: 0,
  end: 3,
  next() {
    if (this.current < this.end) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};
\`\`\`

## The Iterable Protocol

Objects can be iterable by implementing \`[Symbol.iterator]\`:

\`\`\`javascript
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num);  // 1, 2, 3, 4, 5
}
\`\`\`

## Generator Functions

Generators simplify iterator creation:

\`\`\`javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

for (const num of numberGenerator()) {
  console.log(num);  // 1, 2, 3
}
\`\`\`

## Generator Features

\`\`\`javascript
function* gen() {
  const x = yield "first";  // Can receive values
  yield x * 2;
}

const g = gen();
g.next();      // { value: "first", done: false }
g.next(10);    // { value: 20, done: false }
g.next();      // { done: true }
\`\`\`
    `,
    codeExamples: [
      {
        title: "Iterator examples",
        code: `// Custom iterable object
const todoList = {
  items: ["Learn JS", "Build app", "Deploy"],

  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

console.log("Todos:");
for (const todo of todoList) {
  console.log("-", todo);
}

// Spread works too!
console.log("Array:", [...todoList]);`,
        language: "javascript",
      },
      {
        title: "Generator patterns",
        code: `// Simple range generator
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

console.log("Range 1-5:", [...range(1, 5)]);
console.log("Even 2-10:", [...range(2, 10, 2)]);

// Infinite generator
function* infiniteIds() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = infiniteIds();
console.log("IDs:", idGen.next().value, idGen.next().value, idGen.next().value);

// Generator for async-like flow
function* fetchSequence() {
  const user = yield "fetchUser";
  console.log("Got user:", user);
  const posts = yield "fetchPosts";
  console.log("Got posts:", posts);
  return "done";
}

const seq = fetchSequence();
console.log(seq.next());
console.log(seq.next({ name: "Alice" }));
console.log(seq.next([{ title: "Post 1" }]));`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-28-challenge",
      title: "Fibonacci Generator",
      description: "Create a generator function that yields Fibonacci numbers indefinitely.",
      starterCode: `// Create a fibonacci generator that yields:
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

// Test:
// const fib = fibonacci();
// for (let i = 0; i < 10; i++) {
//   console.log(fib.next().value);
// }
`,
      solution: `function* fibonacci() {
  let prev = 0;
  let curr = 1;

  yield prev;
  yield curr;

  while (true) {
    const next = prev + curr;
    yield next;
    prev = curr;
    curr = next;
  }
}

// Test
const fib = fibonacci();
const first10 = [];
for (let i = 0; i < 10; i++) {
  first10.push(fib.next().value);
}
console.log("First 10 Fibonacci numbers:", first10);

// Using with take utility
function* take(n, iterator) {
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) return;
    yield value;
  }
}

console.log("Using take:", [...take(10, fibonacci())]);`,
      tests: [
        { name: "Uses function*", test: `code.includes("function*")` },
        { name: "Yields Fibonacci sequence", test: `output.includes("0") && output.includes("1") && output.includes("55")` },
      ],
      hints: [
        "Use function* syntax",
        "Track prev and curr numbers",
        "Use while(true) for infinite generation",
        "yield the values",
      ],
    },
  },
  {
    id: "js-29",
    slug: "proxy-reflect",
    title: "Proxy & Reflect",
    description: "Intercept and customize object operations",
    order: 29,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `
# Proxy & Reflect

Proxy lets you intercept and customize fundamental object operations.

## Creating a Proxy

\`\`\`javascript
const proxy = new Proxy(target, handler);
\`\`\`

- **target**: The object to wrap
- **handler**: Object with trap methods

## Common Traps

\`\`\`javascript
const handler = {
  get(target, prop, receiver) { },      // Property access
  set(target, prop, value, receiver) { }, // Property assignment
  has(target, prop) { },                // 'in' operator
  deleteProperty(target, prop) { },     // delete
  apply(target, thisArg, args) { },    // Function call
  construct(target, args) { }          // new operator
};
\`\`\`

## Basic Example

\`\`\`javascript
const user = { name: "Alice", age: 25 };

const proxy = new Proxy(user, {
  get(target, prop) {
    console.log(\`Getting \${prop}\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`Setting \${prop} to \${value}\`);
    target[prop] = value;
    return true;
  }
});

proxy.name;      // Logs: Getting name
proxy.age = 26;  // Logs: Setting age to 26
\`\`\`

## Reflect API

\`Reflect\` provides methods matching Proxy traps:

\`\`\`javascript
Reflect.get(target, prop);
Reflect.set(target, prop, value);
Reflect.has(target, prop);
Reflect.deleteProperty(target, prop);
\`\`\`

Using Reflect in handlers ensures proper behavior:

\`\`\`javascript
get(target, prop, receiver) {
  return Reflect.get(target, prop, receiver);
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Validation proxy",
        code: `// Validate property assignments
function createValidator(target, validators) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (validators[prop]) {
        const isValid = validators[prop](value);
        if (!isValid) {
          throw new Error(\`Invalid value for \${prop}: \${value}\`);
        }
      }
      obj[prop] = value;
      return true;
    }
  });
}

const user = createValidator({}, {
  age: (v) => typeof v === "number" && v >= 0 && v <= 150,
  email: (v) => typeof v === "string" && v.includes("@"),
  name: (v) => typeof v === "string" && v.length > 0
});

user.name = "Alice";
user.age = 25;
user.email = "alice@example.com";
console.log("Valid user:", user);

try {
  user.age = -5;  // Throws!
} catch (e) {
  console.log("Error:", e.message);
}`,
        language: "javascript",
      },
      {
        title: "Reactive proxy",
        code: `// Simple reactive system
function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      const result = Reflect.set(target, prop, value, receiver);
      if (oldValue !== value) {
        onChange(prop, value, oldValue);
      }
      return result;
    },
    deleteProperty(target, prop) {
      const oldValue = target[prop];
      const result = Reflect.deleteProperty(target, prop);
      onChange(prop, undefined, oldValue);
      return result;
    }
  });
}

const state = reactive({ count: 0, name: "App" }, (prop, newVal, oldVal) => {
  console.log(\`\${prop} changed: \${oldVal} -> \${newVal}\`);
});

state.count = 1;
state.count = 2;
state.name = "MyApp";
delete state.name;`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-29-challenge",
      title: "Auto-default Proxy",
      description: "Create a proxy that returns a default value for undefined properties instead of undefined.",
      starterCode: `// Create withDefault(target, defaultValue) that:
// - Returns target[prop] if property exists
// - Returns defaultValue if property doesn't exist

// Test:
// const obj = withDefault({ a: 1, b: 2 }, 0);
// console.log(obj.a);  // 1
// console.log(obj.b);  // 2
// console.log(obj.c);  // 0 (default)
// console.log(obj.anything);  // 0 (default)
`,
      solution: `function withDefault(target, defaultValue) {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) {
        return obj[prop];
      }
      return defaultValue;
    }
  });
}

// Test
const config = withDefault({
  host: "localhost",
  port: 3000
}, "not configured");

console.log("host:", config.host);
console.log("port:", config.port);
console.log("database:", config.database);
console.log("timeout:", config.timeout);

// Works with any default
const counts = withDefault({}, 0);
counts.apples = 5;
console.log("apples:", counts.apples);
console.log("oranges:", counts.oranges);`,
      tests: [
        { name: "Uses Proxy", test: `code.includes("new Proxy")` },
        { name: "Returns existing values", test: `output.includes("localhost") || output.includes("3000")` },
        { name: "Returns default for missing", test: `output.includes("not configured") || output.includes("0")` },
      ],
      hints: [
        "Use new Proxy(target, handler)",
        "Implement the get trap",
        "Use 'in' operator to check if property exists",
      ],
    },
  },
  {
    id: "js-30",
    slug: "memory-management",
    title: "Memory Management",
    description: "Understand garbage collection, memory leaks, and WeakMap/WeakSet",
    order: 30,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `
# Memory Management

Understanding how JavaScript manages memory helps you write efficient code.

## Garbage Collection

JavaScript automatically frees memory when objects are no longer reachable:

\`\`\`javascript
let user = { name: "Alice" };
user = null;  // Object becomes unreachable, gets garbage collected
\`\`\`

## Common Memory Leaks

### 1. Forgotten Timers
\`\`\`javascript
// Leak: timer keeps reference
setInterval(() => {
  doSomething(largeData);
}, 1000);

// Fix: clear when done
const id = setInterval(...);
clearInterval(id);
\`\`\`

### 2. Closures Holding References
\`\`\`javascript
function createLeak() {
  const largeArray = new Array(1000000);
  return function() {
    return largeArray[0];  // Holds entire array!
  };
}
\`\`\`

### 3. Event Listeners
\`\`\`javascript
// Leak: listener not removed
element.addEventListener('click', handler);
// Fix: remove when done
element.removeEventListener('click', handler);
\`\`\`

## WeakMap and WeakSet

Hold "weak" references that don't prevent garbage collection:

\`\`\`javascript
// WeakMap - keys must be objects
const cache = new WeakMap();
let obj = { id: 1 };
cache.set(obj, "cached data");
obj = null;  // Entry can be garbage collected

// WeakSet - values must be objects
const seen = new WeakSet();
seen.add(obj);
obj = null;  // Can be garbage collected
\`\`\`

## Use Cases for WeakMap

\`\`\`javascript
// Private data for objects
const privateData = new WeakMap();
class User {
  constructor(name) {
    privateData.set(this, { password: null });
    this.name = name;
  }
  setPassword(pwd) {
    privateData.get(this).password = pwd;
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "WeakMap for private data",
        code: `// Using WeakMap for truly private properties
const privateProps = new WeakMap();

class SecureUser {
  constructor(name, password) {
    privateProps.set(this, {
      password,
      loginAttempts: 0
    });
    this.name = name;
  }

  checkPassword(pwd) {
    const priv = privateProps.get(this);
    if (pwd === priv.password) {
      priv.loginAttempts = 0;
      return true;
    }
    priv.loginAttempts++;
    return false;
  }

  get attempts() {
    return privateProps.get(this).loginAttempts;
  }
}

const user = new SecureUser("Alice", "secret123");
console.log("Check wrong:", user.checkPassword("wrong"));
console.log("Attempts:", user.attempts);
console.log("Check correct:", user.checkPassword("secret123"));
console.log("Attempts after correct:", user.attempts);

// Can't access private data directly
console.log("Direct access:", user.password);  // undefined`,
        language: "javascript",
      },
      {
        title: "WeakMap for caching",
        code: `// Caching computed values without memory leaks
const computeCache = new WeakMap();

function expensiveComputation(obj) {
  // Check cache first
  if (computeCache.has(obj)) {
    console.log("Cache hit!");
    return computeCache.get(obj);
  }

  // Simulate expensive computation
  console.log("Computing...");
  const result = JSON.stringify(obj).length * 100;

  // Cache the result
  computeCache.set(obj, result);
  return result;
}

let data = { name: "Alice", items: [1, 2, 3, 4, 5] };
console.log("First call:", expensiveComputation(data));
console.log("Second call:", expensiveComputation(data));

// When data is no longer referenced, cache entry can be GC'd
data = null;
// No manual cleanup needed!

// WeakSet for tracking
const processed = new WeakSet();

function processOnce(obj) {
  if (processed.has(obj)) {
    console.log("Already processed");
    return;
  }
  processed.add(obj);
  console.log("Processing:", obj);
}

let item = { id: 1 };
processOnce(item);
processOnce(item);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-30-challenge",
      title: "Memoization with WeakMap",
      description: "Create a memoize function that caches results based on object arguments using WeakMap.",
      starterCode: `// Create memoizeByObject(fn) that:
// - Caches results based on the object argument
// - Uses WeakMap so cached entries can be garbage collected
// - Returns cached result if same object is passed again

// Test:
// function processUser(user) {
//   console.log("Processing...");
//   return user.name.toUpperCase();
// }
// const memoized = memoizeByObject(processUser);
// const user = { name: "alice" };
// memoized(user);  // Logs "Processing...", returns "ALICE"
// memoized(user);  // Returns "ALICE" (no processing log)
`,
      solution: `function memoizeByObject(fn) {
  const cache = new WeakMap();

  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }

    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

// Test
function processUser(user) {
  console.log("Processing:", user.name);
  return user.name.toUpperCase();
}

const memoized = memoizeByObject(processUser);

const user1 = { name: "alice" };
const user2 = { name: "bob" };

console.log("First call user1:", memoized(user1));
console.log("Second call user1:", memoized(user1));
console.log("First call user2:", memoized(user2));
console.log("Third call user1:", memoized(user1));`,
      tests: [
        { name: "Uses WeakMap", test: `code.includes("WeakMap")` },
        { name: "Caches results", test: `(output.match(/Processing/g) || []).length === 2` },
        { name: "Returns cached value", test: `output.includes("ALICE")` },
      ],
      hints: [
        "Create a WeakMap in the closure",
        "Check if object is in cache with has()",
        "Store result with set()",
        "Return cached result or compute new one",
      ],
    },
  },
  {
    id: "js-31",
    slug: "web-apis",
    title: "Web APIs",
    description: "Work with Fetch, localStorage, and other browser APIs",
    order: 31,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Web APIs

Browser APIs extend JavaScript's capabilities for web development.

## Fetch API

Modern way to make HTTP requests:

\`\`\`javascript
// GET request
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST request
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
});

// Error handling
if (!response.ok) {
  throw new Error(\`HTTP error! status: \${response.status}\`);
}
\`\`\`

## localStorage & sessionStorage

Store data in the browser:

\`\`\`javascript
// localStorage persists
localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// sessionStorage clears on tab close
sessionStorage.setItem('key', 'value');

// Store objects (must stringify)
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
const user = JSON.parse(localStorage.getItem('user'));
\`\`\`

## URL API

Parse and manipulate URLs:

\`\`\`javascript
const url = new URL('https://example.com/path?name=alice&age=25');
url.searchParams.get('name');      // "alice"
url.searchParams.set('age', '26');
url.searchParams.append('hobby', 'coding');
\`\`\`

## History API

Navigate without page reload:

\`\`\`javascript
history.pushState(state, '', '/new-page');
history.replaceState(state, '', '/replace');
window.onpopstate = (e) => console.log(e.state);
\`\`\`
    `,
    codeExamples: [
      {
        title: "Fetch patterns",
        code: `// Simulating fetch for demo
async function mockFetch(url, options = {}) {
  console.log(\`\${options.method || 'GET'} \${url}\`);

  // Simulate network delay
  await new Promise(r => setTimeout(r, 50));

  if (url.includes('/users')) {
    return {
      ok: true,
      status: 200,
      json: async () => [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
      ]
    };
  }

  return { ok: false, status: 404 };
}

// Usage pattern
async function getUsers() {
  try {
    const response = await mockFetch('/api/users');

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch:", error.message);
    return [];
  }
}

getUsers().then(users => {
  console.log("Users:", users);
});`,
        language: "javascript",
      },
      {
        title: "Storage helpers",
        code: `// Storage wrapper with JSON support
const storage = {
  set(key, value) {
    try {
      const json = JSON.stringify(value);
      // In browser: localStorage.setItem(key, json)
      console.log(\`Stored \${key}:\`, json);
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      // In browser: const item = localStorage.getItem(key)
      const item = null;  // Simulated
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  remove(key) {
    // In browser: localStorage.removeItem(key)
    console.log(\`Removed \${key}\`);
  }
};

// Usage
storage.set('user', { name: 'Alice', preferences: { theme: 'dark' } });
storage.set('cart', [{ id: 1, qty: 2 }, { id: 2, qty: 1 }]);

const user = storage.get('user', { name: 'Guest' });
console.log("User:", user);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-31-challenge",
      title: "API Client",
      description: "Create a simple API client class with get, post, put, delete methods that wrap fetch.",
      starterCode: `// Create an ApiClient class with:
// - constructor(baseUrl)
// - async get(endpoint)
// - async post(endpoint, data)
// - async put(endpoint, data)
// - async delete(endpoint)

// Each method should:
// - Prepend baseUrl to endpoint
// - Handle JSON automatically
// - Throw on non-ok responses
`,
      solution: `class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    // Simulated fetch for demo
    console.log(\`\${config.method || 'GET'} \${url}\`);
    if (config.body) console.log("Body:", config.body);

    // Simulated response
    return { id: 1, status: 'success' };
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: data });
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: data });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Test
const api = new ApiClient('https://api.example.com');

async function testApi() {
  await api.get('/users');
  await api.post('/users', { name: 'Alice' });
  await api.put('/users/1', { name: 'Alicia' });
  await api.delete('/users/1');
}

testApi();`,
      tests: [
        { name: "Has class ApiClient", test: `code.includes("class ApiClient")` },
        { name: "Has CRUD methods", test: `code.includes("get(") && code.includes("post(") && code.includes("delete(")` },
        { name: "Uses async/await", test: `code.includes("async")` },
      ],
      hints: [
        "Store baseUrl in constructor",
        "Create a base request method",
        "JSON.stringify the body",
        "Each method calls request with appropriate options",
      ],
    },
  },
  {
    id: "js-32",
    slug: "web-workers",
    title: "Web Workers",
    description: "Run JavaScript in background threads",
    order: 32,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `
# Web Workers

Web Workers run JavaScript in background threads, keeping the UI responsive.

## Why Use Workers?

- Heavy computations that would block UI
- Data processing
- Image manipulation
- Complex calculations

## Creating a Worker

**Main script:**
\`\`\`javascript
const worker = new Worker('worker.js');

worker.postMessage({ type: 'compute', data: [1, 2, 3] });

worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error);
};
\`\`\`

**worker.js:**
\`\`\`javascript
self.onmessage = (event) => {
  const { type, data } = event.data;

  if (type === 'compute') {
    const result = heavyComputation(data);
    self.postMessage(result);
  }
};
\`\`\`

## Worker Limitations

Workers cannot access:
- DOM
- window object
- document
- parent objects

Workers CAN use:
- setTimeout/setInterval
- fetch
- IndexedDB
- WebSockets

## Inline Workers (Blob URL)

Create workers without separate files:

\`\`\`javascript
const workerCode = \`
  self.onmessage = (e) => {
    const result = e.data * 2;
    self.postMessage(result);
  };
\`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));
\`\`\`
    `,
    codeExamples: [
      {
        title: "Simulating worker behavior",
        code: `// Simulating Web Worker pattern (actual workers need browser)

class MockWorker {
  constructor(handler) {
    this.handler = handler;
    this.onmessage = null;
  }

  postMessage(data) {
    // Simulate async processing
    setTimeout(() => {
      const result = this.handler(data);
      if (this.onmessage) {
        this.onmessage({ data: result });
      }
    }, 10);
  }
}

// Worker "code"
function workerHandler(message) {
  const { type, payload } = message;

  switch (type) {
    case 'sum':
      return payload.reduce((a, b) => a + b, 0);
    case 'factorial':
      let result = 1;
      for (let i = 2; i <= payload; i++) result *= i;
      return result;
    case 'primes':
      return findPrimes(payload);
    default:
      return null;
  }
}

function findPrimes(max) {
  const primes = [];
  for (let n = 2; n <= max; n++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { isPrime = false; break; }
    }
    if (isPrime) primes.push(n);
  }
  return primes;
}

// Usage
const worker = new MockWorker(workerHandler);

worker.onmessage = (e) => console.log("Result:", e.data);

worker.postMessage({ type: 'sum', payload: [1, 2, 3, 4, 5] });
worker.postMessage({ type: 'factorial', payload: 10 });
worker.postMessage({ type: 'primes', payload: 30 });`,
        language: "javascript",
      },
      {
        title: "Task queue pattern",
        code: `// Pattern for managing multiple background tasks
class TaskQueue {
  constructor(workerFn) {
    this.workerFn = workerFn;
    this.queue = [];
    this.running = false;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running || this.queue.length === 0) return;

    this.running = true;

    while (this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();

      try {
        // Simulate async processing
        await new Promise(r => setTimeout(r, 10));
        const result = this.workerFn(task);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.running = false;
  }
}

// Usage
const mathQueue = new TaskQueue((task) => {
  console.log("Processing:", task);
  return task.a + task.b;
});

async function demo() {
  const results = await Promise.all([
    mathQueue.add({ a: 1, b: 2 }),
    mathQueue.add({ a: 3, b: 4 }),
    mathQueue.add({ a: 5, b: 6 })
  ]);
  console.log("All results:", results);
}

demo();`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-32-challenge",
      title: "Background Processor",
      description: "Create a BackgroundProcessor class that queues tasks and processes them asynchronously, similar to a Web Worker pattern.",
      starterCode: `// Create BackgroundProcessor class with:
// - process(fn, data) - returns Promise with result
// - Processes tasks in order
// - Simulates async processing with setTimeout

// Test:
// const processor = new BackgroundProcessor();
// processor.process(x => x * 2, 5).then(r => console.log(r));  // 10
// processor.process(arr => arr.reduce((a,b) => a+b), [1,2,3]);  // 6
`,
      solution: `class BackgroundProcessor {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  process(fn, data) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, data, resolve, reject });
      this.runNext();
    });
  }

  async runNext() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const { fn, data, resolve, reject } = this.queue.shift();

      // Simulate background processing
      await new Promise(r => setTimeout(r, 10));

      try {
        const result = fn(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }
}

// Test
const processor = new BackgroundProcessor();

async function test() {
  const r1 = await processor.process(x => x * 2, 5);
  console.log("Double 5:", r1);

  const r2 = await processor.process(
    arr => arr.reduce((a, b) => a + b, 0),
    [1, 2, 3, 4, 5]
  );
  console.log("Sum array:", r2);

  const r3 = await processor.process(
    str => str.toUpperCase(),
    "hello"
  );
  console.log("Uppercase:", r3);
}

test();`,
      tests: [
        { name: "Has BackgroundProcessor class", test: `code.includes("class BackgroundProcessor")` },
        { name: "Returns Promise", test: `code.includes("Promise")` },
        { name: "Processes correctly", test: `output.includes("10") && output.includes("15")` },
      ],
      hints: [
        "Store tasks in a queue array",
        "Each task has fn, data, resolve, reject",
        "Use setTimeout to simulate async",
        "Process queue sequentially",
      ],
    },
  },
  {
    id: "js-33",
    slug: "testing-fundamentals",
    title: "Testing Fundamentals",
    description: "Write unit tests with assertions and test runners",
    order: 33,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Testing Fundamentals

Testing ensures your code works correctly and prevents regressions.

## Test Structure

\`\`\`javascript
describe('Calculator', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
\`\`\`

## Common Assertions

\`\`\`javascript
// Equality
expect(value).toBe(expected);        // Strict equality
expect(value).toEqual(expected);     // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(n);
expect(value).toBeLessThan(n);
expect(value).toBeCloseTo(n, decimals);

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(n);

// Errors
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('message');
\`\`\`

## Test Types

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test components working together
3. **E2E Tests**: Test entire user flows

## Mocking

\`\`\`javascript
// Mock a function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);

// Mock a module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ name: 'Alice' }))
}));
\`\`\`
    `,
    codeExamples: [
      {
        title: "Simple test framework",
        code: `// Mini test framework
const tests = [];
let passed = 0;
let failed = 0;

function describe(name, fn) {
  console.log(\`\\n\${name}\`);
  fn();
}

function it(name, fn) {
  tests.push({ name, fn });
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(\`Expected \${expected} but got \${actual}\`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(\`Expected \${JSON.stringify(expected)} but got \${JSON.stringify(actual)}\`);
      }
    },
    toThrow() {
      try {
        actual();
        throw new Error("Expected function to throw");
      } catch (e) {
        if (e.message === "Expected function to throw") throw e;
      }
    }
  };
}

function runTests() {
  for (const test of tests) {
    try {
      test.fn();
      console.log(\`  ✓ \${test.name}\`);
      passed++;
    } catch (e) {
      console.log(\`  ✗ \${test.name}\`);
      console.log(\`    \${e.message}\`);
      failed++;
    }
  }
  console.log(\`\\nResults: \${passed} passed, \${failed} failed\`);
}

// Example usage
describe('Math functions', () => {
  it('adds numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('handles arrays', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});

runTests();`,
        language: "javascript",
      },
      {
        title: "Testing real code",
        code: `// Code to test
function createCalculator() {
  let history = [];

  return {
    add(a, b) {
      const result = a + b;
      history.push({ op: 'add', a, b, result });
      return result;
    },
    subtract(a, b) {
      const result = a - b;
      history.push({ op: 'subtract', a, b, result });
      return result;
    },
    getHistory() {
      return [...history];
    },
    clear() {
      history = [];
    }
  };
}

// Tests
const tests = [];
let passed = 0, failed = 0;

function it(name, fn) { tests.push({ name, fn }); }
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(\`Expected \${expected}, got \${actual}\`);
    },
    toHaveLength(n) {
      if (actual.length !== n) throw new Error(\`Expected length \${n}, got \${actual.length}\`);
    }
  };
}

// Write tests
it('adds numbers', () => {
  const calc = createCalculator();
  expect(calc.add(2, 3)).toBe(5);
});

it('subtracts numbers', () => {
  const calc = createCalculator();
  expect(calc.subtract(5, 3)).toBe(2);
});

it('tracks history', () => {
  const calc = createCalculator();
  calc.add(1, 2);
  calc.subtract(5, 3);
  expect(calc.getHistory()).toHaveLength(2);
});

it('clears history', () => {
  const calc = createCalculator();
  calc.add(1, 2);
  calc.clear();
  expect(calc.getHistory()).toHaveLength(0);
});

// Run
for (const t of tests) {
  try { t.fn(); console.log("✓", t.name); passed++; }
  catch (e) { console.log("✗", t.name, "-", e.message); failed++; }
}
console.log(\`\\n\${passed} passed, \${failed} failed\`);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-33-challenge",
      title: "Build Test Assertions",
      description: "Extend the expect function with more assertion methods: toContain, toBeTruthy, toBeFalsy, toBeGreaterThan.",
      starterCode: `// Extend this expect function with:
// - toContain(item) - for arrays/strings
// - toBeTruthy() - value is truthy
// - toBeFalsy() - value is falsy
// - toBeGreaterThan(n) - value > n

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(\`Expected \${expected} but got \${actual}\`);
      }
    }
    // Add more methods here
  };
}

// Test your assertions:
// expect([1, 2, 3]).toContain(2);
// expect("hello").toContain("ell");
// expect(true).toBeTruthy();
// expect(0).toBeFalsy();
// expect(5).toBeGreaterThan(3);
`,
      solution: `function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(\`Expected \${expected} but got \${actual}\`);
      }
    },
    toContain(item) {
      if (!actual.includes(item)) {
        throw new Error(\`Expected \${JSON.stringify(actual)} to contain \${item}\`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(\`Expected \${actual} to be truthy\`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(\`Expected \${actual} to be falsy\`);
      }
    },
    toBeGreaterThan(n) {
      if (!(actual > n)) {
        throw new Error(\`Expected \${actual} to be greater than \${n}\`);
      }
    }
  };
}

// Test the assertions
const tests = [
  () => expect([1, 2, 3]).toContain(2),
  () => expect("hello").toContain("ell"),
  () => expect(true).toBeTruthy(),
  () => expect("non-empty").toBeTruthy(),
  () => expect(0).toBeFalsy(),
  () => expect("").toBeFalsy(),
  () => expect(5).toBeGreaterThan(3)
];

tests.forEach((test, i) => {
  try {
    test();
    console.log(\`Test \${i + 1}: ✓ passed\`);
  } catch (e) {
    console.log(\`Test \${i + 1}: ✗ \${e.message}\`);
  }
});`,
      tests: [
        { name: "Has toContain", test: `code.includes("toContain")` },
        { name: "Has toBeTruthy", test: `code.includes("toBeTruthy")` },
        { name: "All tests pass", test: `!output.includes("✗")` },
      ],
      hints: [
        "toContain: use includes() method",
        "toBeTruthy: check if (!actual)",
        "toBeFalsy: check if (actual)",
        "toBeGreaterThan: check if (!(actual > n))",
      ],
    },
  },
  {
    id: "js-34",
    slug: "performance-optimization",
    title: "Performance Optimization",
    description: "Optimize JavaScript for speed with debounce, throttle, and lazy loading",
    order: 34,
    category: "JavaScript Advanced",
    difficulty: "advanced",
    estimatedMinutes: 35,
    content: `
# Performance Optimization

Techniques to make your JavaScript faster and more efficient.

## Debounce

Delay execution until after a pause in calls:

\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Use for search input - only search after user stops typing
const search = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));
\`\`\`

## Throttle

Limit execution to at most once per time period:

\`\`\`javascript
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use for scroll handlers - only handle every 100ms
window.addEventListener('scroll', throttle(handleScroll, 100));
\`\`\`

## Lazy Loading

Load resources only when needed:

\`\`\`javascript
// Dynamic imports
const module = await import('./heavy-module.js');

// Intersection Observer for images
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
\`\`\`

## Memoization

Cache expensive function results:

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }
    return cache.get(key);
  };
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Debounce and throttle",
        code: `// Debounce - wait for pause
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Throttle - max once per period
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Demo
const debouncedLog = debounce((msg) => console.log("Debounced:", msg), 100);
const throttledLog = throttle((msg) => console.log("Throttled:", msg), 100);

// Simulate rapid calls
console.log("Rapid calls started...");
for (let i = 0; i < 5; i++) {
  debouncedLog("call " + i);
  throttledLog("call " + i);
}

// Debounced only fires once after all calls
// Throttled fires on first call, then once more after 100ms`,
        language: "javascript",
      },
      {
        title: "Memoization patterns",
        code: `// Generic memoization
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit for:", key);
      return cache.get(key);
    }

    console.log("Computing for:", key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Without memoization - very slow for large n
console.log("Without memoization:");
console.time("fib(20)");
console.log("fib(20) =", fibonacci(20));
console.timeEnd("fib(20)");

// With memoization
const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});

console.log("\\nWith memoization:");
console.log("memoFib(10) =", memoFib(10));
console.log("memoFib(10) =", memoFib(10));  // Cache hit`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-34-challenge",
      title: "Request Deduplication",
      description: "Create a function that deduplicates concurrent requests - if the same request is in flight, return the existing promise instead of making a new request.",
      starterCode: `// Create dedupeRequest(fn) that:
// - Takes a function that returns a promise
// - If same args are already being fetched, return existing promise
// - After request completes, clear it from cache

// Test:
// const fetchUser = dedupeRequest(async (id) => {
//   console.log("Fetching user", id);
//   await delay(100);
//   return { id, name: "User " + id };
// });
//
// // These should only log "Fetching" once!
// fetchUser(1).then(u => console.log("Got:", u.name));
// fetchUser(1).then(u => console.log("Got:", u.name));
`,
      solution: `function dedupeRequest(fn) {
  const pending = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (pending.has(key)) {
      console.log("Reusing pending request for:", key);
      return pending.get(key);
    }

    console.log("Starting new request for:", key);
    const promise = fn.apply(this, args)
      .then(result => {
        pending.delete(key);
        return result;
      })
      .catch(error => {
        pending.delete(key);
        throw error;
      });

    pending.set(key, promise);
    return promise;
  };
}

// Test
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const fetchUser = dedupeRequest(async (id) => {
  console.log("Actually fetching user", id);
  await delay(100);
  return { id, name: "User " + id };
});

// Concurrent requests for same user
Promise.all([
  fetchUser(1),
  fetchUser(1),
  fetchUser(1)
]).then(results => {
  console.log("Results:", results.map(r => r.name));
});

// Different user - separate request
fetchUser(2).then(u => console.log("User 2:", u.name));`,
      tests: [
        { name: "Uses Map for pending requests", test: `code.includes("Map")` },
        { name: "Deduplicates requests", test: `(output.match(/Actually fetching/g) || []).length <= 2` },
        { name: "Returns same result", test: `output.includes("User 1")` },
      ],
      hints: [
        "Use Map to store pending promises",
        "Key by JSON.stringify(args)",
        "Delete from map when promise settles",
        "Handle both success and error cases",
      ],
    },
  },
];

// ============================================
// JAVASCRIPT PROJECTS (Lessons 35-38)
// ============================================

export const jsProjects: Lesson[] = [
  {
    id: "js-35",
    slug: "project-calculator",
    title: "Project: Calculator App",
    description: "Build a fully functional calculator with DOM manipulation and event handling",
    order: 35,
    category: "JavaScript Projects",
    difficulty: "intermediate",
    estimatedMinutes: 60,
    content: `
# Project: Calculator App

Build a functional calculator that handles basic operations, keyboard input, and proper decimal handling.

## Features to Build

1. Basic operations (+, -, *, /)
2. Clear and delete functions
3. Decimal point handling
4. Keyboard support
5. Display formatting

## Project Structure

\`\`\`javascript
const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,

  // Methods
  inputDigit(digit) { },
  inputDecimal() { },
  handleOperator(operator) { },
  calculate() { },
  reset() { },
  delete() { }
};
\`\`\`

## State Management

The calculator maintains state:
- \`displayValue\`: Current display string
- \`firstOperand\`: First number in operation
- \`operator\`: Current operator (+, -, *, /)
- \`waitingForSecondOperand\`: Expecting second number

## Event Handling

\`\`\`javascript
// Button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleButton(btn.dataset.value);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) calculator.inputDigit(e.key);
  if (e.key === '.') calculator.inputDecimal();
  if (e.key === 'Enter') calculator.calculate();
  // etc.
});
\`\`\`

## Edge Cases to Handle

- Division by zero
- Multiple decimal points
- Operator chaining (2 + 3 * 4)
- Display overflow
    `,
    codeExamples: [
      {
        title: "Calculator logic",
        code: `const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0'
        ? digit
        : this.displayValue + digit;
    }
  },

  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0.';
      this.waitingForSecondOperand = false;
      return;
    }
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  },

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate();
      this.displayValue = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  },

  calculate() {
    if (this.operator === null || this.waitingForSecondOperand) {
      return parseFloat(this.displayValue);
    }

    const second = parseFloat(this.displayValue);
    let result;

    switch (this.operator) {
      case '+': result = this.firstOperand + second; break;
      case '-': result = this.firstOperand - second; break;
      case '*': result = this.firstOperand * second; break;
      case '/': result = second !== 0 ? this.firstOperand / second : 'Error'; break;
    }

    this.operator = null;
    this.firstOperand = null;
    this.waitingForSecondOperand = false;

    return result;
  },

  reset() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
};

// Test
calculator.inputDigit('5');
console.log("After 5:", calculator.displayValue);

calculator.handleOperator('+');
calculator.inputDigit('3');
console.log("After +3:", calculator.displayValue);

const result = calculator.calculate();
console.log("5 + 3 =", result);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-35-challenge",
      title: "Build Calculator Core",
      description: "Implement the calculator's inputDigit, inputDecimal, and reset methods.",
      starterCode: `const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,

  inputDigit(digit) {
    // Implement: Add digit to display
    // Handle waitingForSecondOperand case
    // Handle leading zero replacement
  },

  inputDecimal() {
    // Implement: Add decimal point
    // Prevent multiple decimals
    // Handle waitingForSecondOperand case
  },

  reset() {
    // Implement: Reset all state
  }
};

// Test
calculator.inputDigit('5');
calculator.inputDigit('2');
console.log("After 52:", calculator.displayValue);

calculator.inputDecimal();
calculator.inputDigit('5');
console.log("After .5:", calculator.displayValue);

calculator.reset();
console.log("After reset:", calculator.displayValue);
`,
      solution: `const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0'
        ? digit
        : this.displayValue + digit;
    }
  },

  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0.';
      this.waitingForSecondOperand = false;
      return;
    }
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  },

  reset() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
};

// Test
calculator.inputDigit('5');
calculator.inputDigit('2');
console.log("After 52:", calculator.displayValue);

calculator.inputDecimal();
calculator.inputDigit('5');
console.log("After .5:", calculator.displayValue);

calculator.reset();
console.log("After reset:", calculator.displayValue);`,
      tests: [
        { name: "inputDigit builds number", test: `output.includes("52")` },
        { name: "inputDecimal works", test: `output.includes("52.5")` },
        { name: "reset works", test: `output.includes("After reset: 0")` },
      ],
      hints: [
        "Check waitingForSecondOperand first",
        "Replace '0' with first digit, append thereafter",
        "Check if displayValue already has decimal",
      ],
    },
  },
  {
    id: "js-36",
    slug: "project-todo-localstorage",
    title: "Project: Todo App with localStorage",
    description: "Build a persistent todo app with filtering and local storage",
    order: 36,
    category: "JavaScript Projects",
    difficulty: "intermediate",
    estimatedMinutes: 60,
    content: `
# Project: Todo App with localStorage

Build a feature-rich todo app that persists data across browser sessions.

## Features

1. Add, edit, delete todos
2. Mark complete/incomplete
3. Filter: All, Active, Completed
4. Persist to localStorage
5. Clear completed

## Data Structure

\`\`\`javascript
const todo = {
  id: 1,
  text: "Learn JavaScript",
  completed: false,
  createdAt: Date.now()
};
\`\`\`

## Storage API

\`\`\`javascript
// Save to localStorage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load from localStorage
function loadTodos() {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : [];
}
\`\`\`

## App Architecture

\`\`\`javascript
const todoApp = {
  todos: [],
  filter: 'all', // 'all' | 'active' | 'completed'

  init() {
    this.todos = loadTodos();
    this.render();
  },

  addTodo(text) { },
  toggleTodo(id) { },
  deleteTodo(id) { },
  editTodo(id, newText) { },
  setFilter(filter) { },
  clearCompleted() { },
  getFilteredTodos() { },
  render() { },
  save() { }
};
\`\`\`

## Computed Properties

\`\`\`javascript
get activeCount() {
  return this.todos.filter(t => !t.completed).length;
}

get completedCount() {
  return this.todos.filter(t => t.completed).length;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: "Todo app implementation",
        code: `// Simulated localStorage for demo
const mockStorage = {
  data: {},
  getItem(key) { return this.data[key] || null; },
  setItem(key, value) { this.data[key] = value; }
};

const todoApp = {
  todos: [],
  filter: 'all',
  nextId: 1,

  init() {
    const stored = mockStorage.getItem('todos');
    if (stored) {
      this.todos = JSON.parse(stored);
      this.nextId = Math.max(...this.todos.map(t => t.id), 0) + 1;
    }
  },

  addTodo(text) {
    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };
    this.todos.push(todo);
    this.save();
    return todo;
  },

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
    }
  },

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  },

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
  },

  getFiltered() {
    switch (this.filter) {
      case 'active': return this.todos.filter(t => !t.completed);
      case 'completed': return this.todos.filter(t => t.completed);
      default: return this.todos;
    }
  },

  save() {
    mockStorage.setItem('todos', JSON.stringify(this.todos));
  }
};

// Test
todoApp.init();
todoApp.addTodo("Learn JavaScript");
todoApp.addTodo("Build projects");
todoApp.addTodo("Get hired");
console.log("All todos:", todoApp.getFiltered());

todoApp.toggleTodo(1);
todoApp.filter = 'completed';
console.log("Completed:", todoApp.getFiltered());

todoApp.filter = 'active';
console.log("Active:", todoApp.getFiltered());`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-36-challenge",
      title: "Implement Todo Filters",
      description: "Create a TodoList class with filtering and statistics methods.",
      starterCode: `class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
    this.filter = 'all';
  }

  addTodo(text) {
    const todo = { id: this.nextId++, text, completed: false };
    this.todos.push(todo);
    return todo;
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  // Implement these:
  getFiltered() {
    // Return todos based on this.filter ('all', 'active', 'completed')
  }

  getStats() {
    // Return { total, active, completed }
  }

  clearCompleted() {
    // Remove all completed todos
  }
}

// Test
const list = new TodoList();
list.addTodo("Task 1");
list.addTodo("Task 2");
list.addTodo("Task 3");
list.toggleTodo(1);
list.toggleTodo(3);

console.log("Stats:", list.getStats());
list.filter = 'active';
console.log("Active:", list.getFiltered());
list.clearCompleted();
console.log("After clear:", list.todos);
`,
      solution: `class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
    this.filter = 'all';
  }

  addTodo(text) {
    const todo = { id: this.nextId++, text, completed: false };
    this.todos.push(todo);
    return todo;
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  getFiltered() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
  }
}

// Test
const list = new TodoList();
list.addTodo("Task 1");
list.addTodo("Task 2");
list.addTodo("Task 3");
list.toggleTodo(1);
list.toggleTodo(3);

console.log("Stats:", list.getStats());
list.filter = 'active';
console.log("Active:", list.getFiltered());
list.clearCompleted();
console.log("After clear:", list.todos);`,
      tests: [
        { name: "getStats returns counts", test: `output.includes("total") && output.includes("2")` },
        { name: "getFiltered works", test: `output.includes("Task 2")` },
        { name: "clearCompleted removes done", test: `output.includes("After clear")` },
      ],
      hints: [
        "Use switch on this.filter for getFiltered",
        "Use filter() to count completed",
        "clearCompleted keeps only !completed",
      ],
    },
  },
  {
    id: "js-37",
    slug: "project-weather-app",
    title: "Project: Weather App",
    description: "Build a weather app using the Fetch API and async/await",
    order: 37,
    category: "JavaScript Projects",
    difficulty: "intermediate",
    estimatedMinutes: 60,
    content: `
# Project: Weather App

Build a weather application that fetches data from an API and displays it beautifully.

## Features

1. Search by city name
2. Display current weather
3. Show forecast
4. Handle loading/error states
5. Recent searches history

## API Structure

\`\`\`javascript
// Typical weather API response
const weatherData = {
  city: "New York",
  temperature: 72,
  description: "Partly cloudy",
  humidity: 65,
  windSpeed: 12,
  icon: "cloudy"
};
\`\`\`

## App Architecture

\`\`\`javascript
const weatherApp = {
  currentWeather: null,
  loading: false,
  error: null,
  recentSearches: [],

  async searchCity(city) {
    this.loading = true;
    this.error = null;

    try {
      const data = await fetchWeather(city);
      this.currentWeather = data;
      this.addToRecent(city);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
};
\`\`\`

## Error Handling

\`\`\`javascript
async function fetchWeather(city) {
  const response = await fetch(\`\${API_URL}?city=\${city}\`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather');
  }

  return response.json();
}
\`\`\`

## UI States

1. **Initial**: Search prompt
2. **Loading**: Show spinner
3. **Success**: Display weather
4. **Error**: Show error message
    `,
    codeExamples: [
      {
        title: "Weather app implementation",
        code: `// Simulated weather API
async function fetchWeather(city) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 100));

  // Simulated data
  const cities = {
    'new york': { temp: 72, desc: 'Partly Cloudy', humidity: 65 },
    'london': { temp: 55, desc: 'Rainy', humidity: 80 },
    'tokyo': { temp: 68, desc: 'Clear', humidity: 50 },
  };

  const data = cities[city.toLowerCase()];
  if (!data) {
    throw new Error(\`City "\${city}" not found\`);
  }

  return {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    temperature: data.temp,
    description: data.desc,
    humidity: data.humidity
  };
}

// Weather App
const weatherApp = {
  weather: null,
  loading: false,
  error: null,
  history: [],

  async search(city) {
    console.log(\`Searching for \${city}...\`);
    this.loading = true;
    this.error = null;

    try {
      this.weather = await fetchWeather(city);
      this.addToHistory(city);
      this.displayWeather();
    } catch (err) {
      this.error = err.message;
      this.displayError();
    } finally {
      this.loading = false;
    }
  },

  addToHistory(city) {
    if (!this.history.includes(city)) {
      this.history.unshift(city);
      if (this.history.length > 5) this.history.pop();
    }
  },

  displayWeather() {
    const { city, temperature, description, humidity } = this.weather;
    console.log(\`\\n📍 \${city}\`);
    console.log(\`🌡️  \${temperature}°F - \${description}\`);
    console.log(\`💧 Humidity: \${humidity}%\`);
  },

  displayError() {
    console.log(\`\\n❌ Error: \${this.error}\`);
  }
};

// Test
async function demo() {
  await weatherApp.search('London');
  await weatherApp.search('Tokyo');
  await weatherApp.search('Unknown City');
  console.log('\\nSearch history:', weatherApp.history);
}

demo();`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-37-challenge",
      title: "Build Weather Fetcher",
      description: "Create an async function that fetches weather with proper error handling and loading states.",
      starterCode: `// Simulated API
async function mockWeatherApi(city) {
  await new Promise(r => setTimeout(r, 50));

  const data = {
    'paris': { temp: 60, conditions: 'Cloudy' },
    'sydney': { temp: 75, conditions: 'Sunny' }
  };

  if (!data[city.toLowerCase()]) {
    throw new Error('City not found');
  }

  return { city, ...data[city.toLowerCase()] };
}

// Create a WeatherService class with:
// - loading: boolean
// - error: string | null
// - data: object | null
// - async fetch(city): fetches weather, manages state

// Test:
// const service = new WeatherService();
// await service.fetch('Paris');
// console.log(service.data);
// await service.fetch('Unknown');
// console.log(service.error);
`,
      solution: `// Simulated API
async function mockWeatherApi(city) {
  await new Promise(r => setTimeout(r, 50));

  const data = {
    'paris': { temp: 60, conditions: 'Cloudy' },
    'sydney': { temp: 75, conditions: 'Sunny' }
  };

  if (!data[city.toLowerCase()]) {
    throw new Error('City not found');
  }

  return { city, ...data[city.toLowerCase()] };
}

class WeatherService {
  constructor() {
    this.loading = false;
    this.error = null;
    this.data = null;
  }

  async fetch(city) {
    this.loading = true;
    this.error = null;

    try {
      this.data = await mockWeatherApi(city);
      console.log('Fetched:', this.data);
    } catch (err) {
      this.error = err.message;
      this.data = null;
      console.log('Error:', this.error);
    } finally {
      this.loading = false;
    }
  }
}

// Test
async function test() {
  const service = new WeatherService();

  await service.fetch('Paris');
  console.log('Loading:', service.loading);

  await service.fetch('Unknown');
  console.log('Has error:', !!service.error);
}

test();`,
      tests: [
        { name: "Has loading state", test: `code.includes("loading")` },
        { name: "Has error handling", test: `code.includes("error") && code.includes("catch")` },
        { name: "Fetches successfully", test: `output.includes("Paris") || output.includes("60")` },
        { name: "Handles errors", test: `output.includes("City not found") || output.includes("Error")` },
      ],
      hints: [
        "Set loading = true at start",
        "Use try/catch/finally",
        "Set error in catch block",
        "Set loading = false in finally",
      ],
    },
  },
  {
    id: "js-38",
    slug: "project-quiz-game",
    title: "Project: Quiz Game",
    description: "Build an interactive quiz with classes, timers, and scoring",
    order: 38,
    category: "JavaScript Projects",
    difficulty: "intermediate",
    estimatedMinutes: 60,
    content: `
# Project: Quiz Game

Build an interactive timed quiz game with scoring and high scores.

## Features

1. Multiple choice questions
2. Timer per question
3. Score tracking
4. High scores (localStorage)
5. Question shuffling

## Data Structures

\`\`\`javascript
const question = {
  id: 1,
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "6"],
  correct: 1,  // Index of correct answer
  points: 10
};

const gameState = {
  currentQuestion: 0,
  score: 0,
  timeRemaining: 30,
  answers: [],
  isComplete: false
};
\`\`\`

## Class Architecture

\`\`\`javascript
class Quiz {
  constructor(questions, timePerQuestion = 30) {
    this.questions = this.shuffle(questions);
    this.timePerQuestion = timePerQuestion;
    this.currentIndex = 0;
    this.score = 0;
    this.timer = null;
    this.timeRemaining = timePerQuestion;
  }

  getCurrentQuestion() { }
  answer(optionIndex) { }
  nextQuestion() { }
  startTimer() { }
  stopTimer() { }
  getResults() { }
}
\`\`\`

## Timer Implementation

\`\`\`javascript
startTimer(onTick, onTimeUp) {
  this.timeRemaining = this.timePerQuestion;
  this.timer = setInterval(() => {
    this.timeRemaining--;
    onTick(this.timeRemaining);
    if (this.timeRemaining <= 0) {
      this.stopTimer();
      onTimeUp();
    }
  }, 1000);
}
\`\`\`

## Scoring

- Correct answer: Full points
- Time bonus: Extra points for quick answers
- No answer (timeout): Zero points
    `,
    codeExamples: [
      {
        title: "Quiz game implementation",
        code: `class Quiz {
  constructor(questions, timePerQuestion = 10) {
    this.questions = this.shuffle([...questions]);
    this.timePerQuestion = timePerQuestion;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.timer = null;
    this.timeRemaining = timePerQuestion;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  answer(optionIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = optionIndex === question.correct;

    if (isCorrect) {
      // Time bonus: more points for faster answers
      const timeBonus = Math.floor(this.timeRemaining / 2);
      this.score += question.points + timeBonus;
    }

    this.answers.push({
      questionId: question.id,
      selected: optionIndex,
      correct: question.correct,
      isCorrect,
      timeSpent: this.timePerQuestion - this.timeRemaining
    });

    return isCorrect;
  }

  nextQuestion() {
    this.currentIndex++;
    this.timeRemaining = this.timePerQuestion;
    return this.currentIndex < this.questions.length;
  }

  isComplete() {
    return this.currentIndex >= this.questions.length;
  }

  getResults() {
    const correct = this.answers.filter(a => a.isCorrect).length;
    return {
      score: this.score,
      correct,
      total: this.questions.length,
      percentage: Math.round((correct / this.questions.length) * 100),
      answers: this.answers
    };
  }
}

// Test questions
const questions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    points: 10
  },
  {
    id: 2,
    question: "Capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
    points: 10
  }
];

// Run quiz
const quiz = new Quiz(questions);

console.log("Q1:", quiz.getCurrentQuestion().question);
quiz.answer(1);  // Correct
quiz.nextQuestion();

console.log("Q2:", quiz.getCurrentQuestion().question);
quiz.answer(0);  // Wrong
quiz.nextQuestion();

console.log("Results:", quiz.getResults());`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-38-challenge",
      title: "Build Quiz Engine",
      description: "Create a Quiz class that tracks questions, scoring, and results.",
      starterCode: `const sampleQuestions = [
  { id: 1, question: "1 + 1?", options: ["1", "2", "3"], correct: 1, points: 10 },
  { id: 2, question: "2 * 3?", options: ["5", "6", "7"], correct: 1, points: 10 },
  { id: 3, question: "10 / 2?", options: ["4", "5", "6"], correct: 1, points: 10 }
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  // Implement:
  getCurrentQuestion() {
    // Return current question object
  }

  answer(optionIndex) {
    // Record answer, update score if correct
    // Return boolean isCorrect
  }

  nextQuestion() {
    // Move to next question
    // Return false if no more questions
  }

  getResults() {
    // Return { score, correct, total, percentage }
  }
}

// Test
const quiz = new Quiz(sampleQuestions);
console.log("Q1:", quiz.getCurrentQuestion().question);
console.log("Correct?", quiz.answer(1));
quiz.nextQuestion();
console.log("Q2:", quiz.getCurrentQuestion().question);
console.log("Correct?", quiz.answer(0));
quiz.nextQuestion();
quiz.answer(1);
console.log("Results:", quiz.getResults());
`,
      solution: `const sampleQuestions = [
  { id: 1, question: "1 + 1?", options: ["1", "2", "3"], correct: 1, points: 10 },
  { id: 2, question: "2 * 3?", options: ["5", "6", "7"], correct: 1, points: 10 },
  { id: 3, question: "10 / 2?", options: ["4", "5", "6"], correct: 1, points: 10 }
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  answer(optionIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = optionIndex === question.correct;

    if (isCorrect) {
      this.score += question.points;
    }

    this.answers.push({
      questionId: question.id,
      selected: optionIndex,
      isCorrect
    });

    return isCorrect;
  }

  nextQuestion() {
    this.currentIndex++;
    return this.currentIndex < this.questions.length;
  }

  getResults() {
    const correct = this.answers.filter(a => a.isCorrect).length;
    return {
      score: this.score,
      correct,
      total: this.questions.length,
      percentage: Math.round((correct / this.questions.length) * 100)
    };
  }
}

// Test
const quiz = new Quiz(sampleQuestions);
console.log("Q1:", quiz.getCurrentQuestion().question);
console.log("Correct?", quiz.answer(1));
quiz.nextQuestion();
console.log("Q2:", quiz.getCurrentQuestion().question);
console.log("Correct?", quiz.answer(0));
quiz.nextQuestion();
quiz.answer(1);
console.log("Results:", quiz.getResults());`,
      tests: [
        { name: "getCurrentQuestion works", test: `output.includes("1 + 1")` },
        { name: "answer returns boolean", test: `output.includes("true") && output.includes("false")` },
        { name: "getResults has percentage", test: `output.includes("percentage") || output.includes("67") || output.includes("66")` },
      ],
      hints: [
        "getCurrentQuestion: return this.questions[this.currentIndex]",
        "Check optionIndex === question.correct",
        "Track answers for results calculation",
        "percentage: (correct / total) * 100",
      ],
    },
  },
];

// Export all JavaScript lessons combined
export const allJavascriptLessons: Lesson[] = [
  ...jsFundamentals,
  ...jsIntermediate,
  ...jsAdvanced,
  ...jsProjects,
];
