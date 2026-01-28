export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  tests: {
    name: string;
    test: string; // JavaScript code that returns true/false
  }[];
  hints: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  content: string; // Markdown content
  codeExamples: {
    title: string;
    code: string;
    language: string;
  }[];
  challenge?: CodeChallenge;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    slug: "hello-world",
    title: "Hello World",
    description: "Write your first JavaScript program",
    order: 1,
    category: "Basics",
    difficulty: "beginner",
    estimatedMinutes: 10,
    content: `
# Hello World

Welcome to your first JavaScript lesson! In programming, it's tradition to start by making the computer say "Hello, World!"

## What is console.log?

\`console.log()\` is a built-in JavaScript function that prints messages to the console. It's incredibly useful for:

- **Debugging**: See what's happening in your code
- **Learning**: Understand how values change
- **Testing**: Check if your code works correctly

## How to use it

Simply put any value inside the parentheses:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

You can also log multiple things at once:

\`\`\`javascript
console.log("My name is", "CodeForge");
console.log("2 + 2 =", 2 + 2);
\`\`\`

## Try it yourself!

Use the code editor below to complete the challenge. Make the console print "Hello, World!"
    `,
    codeExamples: [
      {
        title: "Basic console.log",
        code: `console.log("Hello, World!");`,
        language: "javascript",
      },
      {
        title: "Multiple values",
        code: `console.log("The answer is:", 42);
console.log("Today is:", new Date().toDateString());`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "hello-world-challenge",
      title: "Say Hello!",
      description: "Make the console print exactly: Hello, World!",
      starterCode: `// Write your code below\n`,
      solution: `console.log("Hello, World!");`,
      tests: [
        {
          name: "Prints Hello, World!",
          test: `output.includes("Hello, World!")`,
        },
      ],
      hints: [
        "Use console.log() to print to the console",
        "Put your text inside quotes: \"Hello, World!\"",
        "Don't forget the comma after Hello",
      ],
    },
  },
  {
    id: "2",
    slug: "variables",
    title: "Variables",
    description: "Learn how to store and use data",
    order: 2,
    category: "Basics",
    difficulty: "beginner",
    estimatedMinutes: 15,
    content: `
# Variables

Variables are like labeled boxes that store data. You can put something in, take it out, or change what's inside.

## Declaring Variables

In JavaScript, we use \`let\` and \`const\` to create variables:

\`\`\`javascript
let myName = "CodeForge";  // Can be changed later
const PI = 3.14159;        // Cannot be changed
\`\`\`

## Naming Rules

- Start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, numbers, underscores, and dollar signs
- Case-sensitive (\`myVar\` and \`myvar\` are different)
- Cannot use reserved words like \`let\`, \`const\`, \`function\`

## Best Practices

Use **camelCase** for variable names:
- \`firstName\` (not \`first_name\` or \`FirstName\`)
- \`totalPrice\`
- \`isLoggedIn\`

## let vs const

| Feature | let | const |
|---------|-----|-------|
| Can reassign? | Yes | No |
| Must initialize? | No | Yes |
| Use when... | Value will change | Value stays the same |

## Try it yourself!

Create variables to store your name and age, then print them.
    `,
    codeExamples: [
      {
        title: "Creating variables",
        code: `let name = "Alice";
let age = 25;
const country = "USA";

console.log(name, "is", age, "years old");
console.log("Country:", country);`,
        language: "javascript",
      },
      {
        title: "Changing variables",
        code: `let score = 0;
console.log("Starting score:", score);

score = score + 10;
console.log("After bonus:", score);

score = score + 5;
console.log("Final score:", score);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "variables-challenge",
      title: "Create Your Profile",
      description: "Create variables for your name and favorite number, then log them",
      starterCode: `// Create a variable called 'name' with your name
// Create a variable called 'favoriteNumber' with a number

// Log them like: "Hi, I'm [name] and my favorite number is [number]"
`,
      solution: `let name = "George";
let favoriteNumber = 7;
console.log("Hi, I'm", name, "and my favorite number is", favoriteNumber);`,
      tests: [
        {
          name: "Has a name variable",
          test: `code.includes("name")`,
        },
        {
          name: "Has a favoriteNumber variable",
          test: `code.includes("favoriteNumber")`,
        },
        {
          name: "Logs output with name",
          test: `output.includes("Hi") || output.includes("name") || output.length > 0`,
        },
      ],
      hints: [
        "Use let to create variables: let name = \"Your Name\";",
        "Numbers don't need quotes: let favoriteNumber = 42;",
        "Use console.log() to print multiple things separated by commas",
      ],
    },
  },
  {
    id: "3",
    slug: "functions",
    title: "Functions",
    description: "Create reusable blocks of code",
    order: 3,
    category: "Basics",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Functions

Functions are reusable blocks of code that perform a specific task. Think of them as recipes - you define the steps once, then use them whenever you need.

## Why Functions?

- **Reusability**: Write once, use many times
- **Organization**: Break complex problems into smaller pieces
- **Readability**: Give meaningful names to operations

## Creating a Function

\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}
\`\`\`

## Parts of a Function

1. **function** keyword - tells JavaScript we're creating a function
2. **name** - how we'll call it later (greet)
3. **parameters** - inputs the function accepts (name)
4. **body** - the code that runs (inside { })

## Calling a Function

\`\`\`javascript
greet("Alice");  // Output: Hello, Alice!
greet("Bob");    // Output: Hello, Bob!
\`\`\`

## Return Values

Functions can send back a result using \`return\`:

\`\`\`javascript
function add(a, b) {
  return a + b;
}

let sum = add(5, 3);  // sum is 8
\`\`\`

## Try it yourself!

Create a function that takes two numbers and returns their product (multiplication).
    `,
    codeExamples: [
      {
        title: "Simple function",
        code: `function sayHello() {
  console.log("Hello!");
}

sayHello();
sayHello();`,
        language: "javascript",
      },
      {
        title: "Function with parameters",
        code: `function greet(name, greeting) {
  console.log(greeting + ", " + name + "!");
}

greet("Alice", "Hello");
greet("Bob", "Hi");
greet("Charlie", "Hey");`,
        language: "javascript",
      },
      {
        title: "Function with return",
        code: `function calculateArea(width, height) {
  return width * height;
}

let area1 = calculateArea(5, 3);
let area2 = calculateArea(10, 10);

console.log("Area 1:", area1);
console.log("Area 2:", area2);`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "functions-challenge",
      title: "Multiply Two Numbers",
      description: "Create a function called 'multiply' that takes two numbers and returns their product",
      starterCode: `// Create a function called 'multiply'
// It should take two parameters (a and b)
// It should return a * b

// Test your function:
// console.log(multiply(3, 4));  // Should print 12
// console.log(multiply(5, 5));  // Should print 25
`,
      solution: `function multiply(a, b) {
  return a * b;
}

console.log(multiply(3, 4));
console.log(multiply(5, 5));`,
      tests: [
        {
          name: "Function multiply exists",
          test: `code.includes("function multiply")`,
        },
        {
          name: "multiply(3, 4) returns 12",
          test: `output.includes("12")`,
        },
        {
          name: "multiply(5, 5) returns 25",
          test: `output.includes("25")`,
        },
      ],
      hints: [
        "Start with: function multiply(a, b) { }",
        "Inside the function, use return to send back the result",
        "Multiply using the * operator: return a * b;",
      ],
    },
  },
  {
    id: "4",
    slug: "conditionals",
    title: "Conditionals",
    description: "Make decisions in your code with if/else",
    order: 4,
    category: "Basics",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `
# Conditionals

Conditionals let your code make decisions. Just like in real life - "If it's raining, take an umbrella."

## The if Statement

\`\`\`javascript
if (condition) {
  // code runs if condition is true
}
\`\`\`

## Example

\`\`\`javascript
let age = 18;

if (age >= 18) {
  console.log("You can vote!");
}
\`\`\`

## if...else

Handle both outcomes:

\`\`\`javascript
let temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");
} else {
  console.log("It's nice outside!");
}
\`\`\`

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| === | Equal to |
| !== | Not equal to |
| > | Greater than |
| < | Less than |
| >= | Greater or equal |
| <= | Less or equal |

## Multiple Conditions

\`\`\`javascript
let score = 85;

if (score >= 90) {
  console.log("A - Excellent!");
} else if (score >= 80) {
  console.log("B - Good job!");
} else if (score >= 70) {
  console.log("C - Not bad");
} else {
  console.log("Keep practicing!");
}
\`\`\`

## Try it yourself!

Create a function that checks if a number is positive, negative, or zero.
    `,
    codeExamples: [
      {
        title: "Basic if/else",
        code: `let hour = 14;

if (hour < 12) {
  console.log("Good morning!");
} else {
  console.log("Good afternoon!");
}`,
        language: "javascript",
      },
      {
        title: "Multiple conditions",
        code: `function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log("Score 95:", getGrade(95));
console.log("Score 82:", getGrade(82));
console.log("Score 55:", getGrade(55));`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "conditionals-challenge",
      title: "Check the Number",
      description: "Create a function 'checkNumber' that prints whether a number is positive, negative, or zero",
      starterCode: `// Create a function called 'checkNumber'
// If the number is > 0, log "positive"
// If the number is < 0, log "negative"
// If the number is 0, log "zero"

// Test it:
// checkNumber(5);   // Should print "positive"
// checkNumber(-3);  // Should print "negative"
// checkNumber(0);   // Should print "zero"
`,
      solution: `function checkNumber(num) {
  if (num > 0) {
    console.log("positive");
  } else if (num < 0) {
    console.log("negative");
  } else {
    console.log("zero");
  }
}

checkNumber(5);
checkNumber(-3);
checkNumber(0);`,
      tests: [
        {
          name: "Identifies positive numbers",
          test: `output.includes("positive")`,
        },
        {
          name: "Identifies negative numbers",
          test: `output.includes("negative")`,
        },
        {
          name: "Identifies zero",
          test: `output.includes("zero")`,
        },
      ],
      hints: [
        "Use if (num > 0) to check for positive",
        "Use else if (num < 0) to check for negative",
        "Use else for zero (when it's neither positive nor negative)",
      ],
    },
  },
  {
    id: "5",
    slug: "loops",
    title: "Loops",
    description: "Repeat actions with for and while loops",
    order: 5,
    category: "Basics",
    difficulty: "beginner",
    estimatedMinutes: 25,
    content: `
# Loops

Loops let you repeat code multiple times. Instead of writing the same thing 100 times, you write it once and loop!

## The for Loop

Perfect when you know how many times to repeat:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
// Prints: 0, 1, 2, 3, 4
\`\`\`

### Parts of a for Loop

1. **let i = 0** - Start at 0
2. **i < 5** - Keep going while i is less than 5
3. **i++** - Add 1 to i after each loop

## The while Loop

Keeps going while a condition is true:

\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log("Count:", count);
  count++;
}
\`\`\`

## Loop Through Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\`

## The for...of Loop (Modern)

A cleaner way to loop through arrays:

\`\`\`javascript
let colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
\`\`\`

## Try it yourself!

Create a loop that prints numbers 1 through 5.
    `,
    codeExamples: [
      {
        title: "Counting with for",
        code: `// Count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
        language: "javascript",
      },
      {
        title: "Sum numbers",
        code: `let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum = sum + i;
}

console.log("Sum of 1-10:", sum);`,
        language: "javascript",
      },
      {
        title: "Loop through array",
        code: `let names = ["Alice", "Bob", "Charlie"];

for (let name of names) {
  console.log("Hello, " + name + "!");
}`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "loops-challenge",
      title: "Count to Five",
      description: "Use a for loop to print the numbers 1, 2, 3, 4, 5 (each on a new line)",
      starterCode: `// Use a for loop to print 1 through 5
// Hint: for (let i = 1; i <= 5; i++)

`,
      solution: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
      tests: [
        {
          name: "Prints 1",
          test: `output.includes("1")`,
        },
        {
          name: "Prints 5",
          test: `output.includes("5")`,
        },
        {
          name: "Uses a for loop",
          test: `code.includes("for")`,
        },
      ],
      hints: [
        "Start with: for (let i = 1; i <= 5; i++) { }",
        "Inside the loop, use console.log(i) to print the number",
        "The loop will automatically count from 1 to 5",
      ],
    },
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonsByCategory(): Map<string, Lesson[]> {
  const categories = new Map<string, Lesson[]>();

  for (const lesson of lessons) {
    const existing = categories.get(lesson.category) || [];
    categories.set(lesson.category, [...existing, lesson]);
  }

  // Sort lessons within each category
  for (const [category, categoryLessons] of categories) {
    categories.set(
      category,
      categoryLessons.sort((a, b) => a.order - b.order)
    );
  }

  return categories;
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  if (currentIndex <= 0) {
    return undefined;
  }
  return lessons[currentIndex - 1];
}
