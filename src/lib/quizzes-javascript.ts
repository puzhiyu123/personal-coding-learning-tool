import { Quiz } from "./quizzes";

export const javascriptQuizzes: Quiz[] = [
  // Quiz 1: After lesson 3 (operators)
  {
    id: "js-quiz-1",
    title: "JavaScript Foundations Check",
    description: "Test your understanding of variables, data types, and operators",
    trackSlug: "javascript",
    afterLesson: "operators",
    questions: [
      {
        id: "js-q1-1",
        type: "multiple-choice",
        question: "What is the result of `typeof null` in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctAnswer: "'object'",
        explanation: "This is a known JavaScript quirk! `typeof null` returns 'object' due to a bug in the original JavaScript implementation that was never fixed for backward compatibility.",
        hint: "This is a famous JavaScript gotcha that confuses many developers.",
      },
      {
        id: "js-q1-2",
        type: "code-output",
        question: "What will this code output?",
        code: `let x = 5;
let y = "5";
console.log(x == y);
console.log(x === y);`,
        options: ["true, true", "false, false", "true, false", "false, true"],
        correctAnswer: "true, false",
        explanation: "The `==` operator performs type coercion, so 5 == '5' is true. The `===` operator checks both value AND type, so 5 === '5' is false because one is a number and one is a string.",
      },
      {
        id: "js-q1-3",
        type: "true-false",
        question: "`const` variables can never be changed after declaration.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "While you cannot reassign a `const` variable, if it holds an object or array, you CAN modify the contents of that object or array. For example: `const arr = [1]; arr.push(2);` is valid.",
      },
      {
        id: "js-q1-4",
        type: "multiple-choice",
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Symbol", "Array", "BigInt"],
        correctAnswer: "Array",
        explanation: "Arrays are objects in JavaScript, not primitives. The 7 primitive types are: String, Number, Boolean, Undefined, Null, Symbol, and BigInt.",
      },
      {
        id: "js-q1-5",
        type: "code-output",
        question: "What will this code output?",
        code: `console.log(10 + "5");
console.log(10 - "5");`,
        options: ["105, 5", "'105', '5'", "15, 5", "Error"],
        correctAnswer: "105, 5",
        explanation: "When using `+` with a string, JavaScript concatenates (10 + '5' = '105'). But `-` is only a math operator, so JavaScript converts the string to a number (10 - 5 = 5).",
      },
      {
        id: "js-q1-6",
        type: "fill-blank",
        question: "Complete the code to declare a constant variable named `PI` with value `3.14159`:",
        code: "___ PI = 3.14159;",
        correctAnswer: "const",
        explanation: "Use `const` for values that should never be reassigned. Mathematical constants like PI are perfect use cases for `const`.",
        hint: "Which keyword prevents reassignment?",
      },
      {
        id: "js-q1-7",
        type: "multiple-choice",
        question: "What is the result of `3 + 4 * 2`?",
        options: ["14", "11", "10", "Error"],
        correctAnswer: "11",
        explanation: "JavaScript follows standard mathematical order of operations (PEMDAS). Multiplication happens before addition: 4 * 2 = 8, then 3 + 8 = 11.",
      },
      {
        id: "js-q1-8",
        type: "true-false",
        question: "`let` and `var` behave exactly the same way in JavaScript.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "`let` has block scope and cannot be redeclared in the same scope. `var` has function scope, can be redeclared, and is hoisted differently. Always prefer `let` over `var`.",
      },
      {
        id: "js-q1-9",
        type: "code-output",
        question: "What will this code output?",
        code: `let a = 10;
let b = a++;
console.log(a, b);`,
        options: ["11, 11", "10, 10", "11, 10", "10, 11"],
        correctAnswer: "11, 10",
        explanation: "The post-increment operator `a++` returns the original value of `a` (10) and THEN increments it. So `b` gets 10, and `a` becomes 11.",
      },
      {
        id: "js-q1-10",
        type: "multiple-choice",
        question: "Which operator would you use to check if a number is divisible by another?",
        options: ["/", "//", "%", "**"],
        correctAnswer: "%",
        explanation: "The modulo operator `%` returns the remainder of division. If `a % b === 0`, then `a` is divisible by `b`. For example, `10 % 2 === 0` means 10 is divisible by 2.",
      },
    ],
  },
  // Quiz 2: After lesson 6 (arrays-basics)
  {
    id: "js-quiz-2",
    title: "Building Blocks Review",
    description: "Test your understanding of conditionals, loops, functions, and arrays",
    trackSlug: "javascript",
    afterLesson: "arrays-basics",
    questions: [
      {
        id: "js-q2-1",
        type: "code-output",
        question: "What will this code output?",
        code: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
        options: ["3", "4", "Error", "undefined"],
        correctAnswer: "4",
        explanation: "Even though `arr` is declared with `const`, you can still modify array contents. `push(4)` adds an element, making the length 4.",
      },
      {
        id: "js-q2-2",
        type: "multiple-choice",
        question: "Which loop is best when you know exactly how many times to iterate?",
        options: ["while loop", "for loop", "do-while loop", "for-in loop"],
        correctAnswer: "for loop",
        explanation: "A `for` loop is ideal when you know the number of iterations beforehand. It combines initialization, condition, and increment in one line.",
      },
      {
        id: "js-q2-3",
        type: "code-output",
        question: "What will this code output?",
        code: `function greet(name = "World") {
  return "Hello, " + name + "!";
}
console.log(greet());`,
        options: ["Hello, undefined!", "Hello, World!", "Error", "Hello, !"],
        correctAnswer: "Hello, World!",
        explanation: "Default parameters (`name = 'World'`) provide a fallback value when no argument is passed. Since `greet()` is called without arguments, `name` defaults to 'World'.",
      },
      {
        id: "js-q2-4",
        type: "true-false",
        question: "In an `if-else if-else` chain, multiple conditions can execute.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "In an `if-else if-else` chain, only ONE block executes - the first one whose condition is true. Once a condition matches, the rest are skipped.",
      },
      {
        id: "js-q2-5",
        type: "code-output",
        question: "What will this code output?",
        code: `const fruits = ["apple", "banana", "cherry"];
console.log(fruits[3]);`,
        options: ["'cherry'", "undefined", "null", "Error"],
        correctAnswer: "undefined",
        explanation: "Array indices start at 0, so `fruits[0]` is 'apple', `fruits[1]` is 'banana', `fruits[2]` is 'cherry'. `fruits[3]` doesn't exist, so it returns `undefined`.",
      },
      {
        id: "js-q2-6",
        type: "fill-blank",
        question: "Complete the code to define an arrow function that doubles a number:",
        code: "const double = (x) ___ x * 2;",
        correctAnswer: "=>",
        explanation: "Arrow functions use `=>` syntax. For single expressions, you can omit braces and the return is implicit: `(x) => x * 2`.",
        hint: "What symbol is used in arrow function syntax?",
      },
      {
        id: "js-q2-7",
        type: "multiple-choice",
        question: "What does `[1, 2, 3].indexOf(2)` return?",
        options: ["2", "1", "true", "-1"],
        correctAnswer: "1",
        explanation: "`indexOf()` returns the index of the first occurrence of an element. The number 2 is at index 1 (arrays are zero-indexed).",
      },
      {
        id: "js-q2-8",
        type: "code-output",
        question: "What will this code output?",
        code: `let count = 0;
while (count < 3) {
  count++;
}
console.log(count);`,
        options: ["0", "2", "3", "4"],
        correctAnswer: "3",
        explanation: "The while loop runs while `count < 3`. It increments: 0→1, 1→2, 2→3. When count becomes 3, the condition `3 < 3` is false, so the loop stops and 3 is printed.",
      },
      {
        id: "js-q2-9",
        type: "multiple-choice",
        question: "Which array method removes the last element and returns it?",
        options: ["shift()", "pop()", "slice()", "splice()"],
        correctAnswer: "pop()",
        explanation: "`pop()` removes and returns the last element. `shift()` removes the first element. `slice()` creates a copy. `splice()` can remove from any position.",
      },
      {
        id: "js-q2-10",
        type: "true-false",
        question: "A function can return another function in JavaScript.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Functions are first-class citizens in JavaScript. They can be assigned to variables, passed as arguments, and returned from other functions. This enables powerful patterns like closures and higher-order functions.",
      },
    ],
  },
  // Quiz 3: After lesson 9 (array-methods)
  {
    id: "js-quiz-3",
    title: "Objects & Array Methods Mastery",
    description: "Test your understanding of objects and powerful array methods",
    trackSlug: "javascript",
    afterLesson: "array-methods",
    questions: [
      {
        id: "js-q3-1",
        type: "code-output",
        question: "What will this code output?",
        code: `const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
        options: ["[1, 2, 3, 4, 5]", "[2, 4, 6, 8, 10]", "20", "undefined"],
        correctAnswer: "[2, 4, 6, 8, 10]",
        explanation: "`map()` creates a new array by applying a function to each element. Each number is doubled, resulting in [2, 4, 6, 8, 10].",
      },
      {
        id: "js-q3-2",
        type: "multiple-choice",
        question: "Which method would you use to find the first even number in an array?",
        options: ["filter()", "find()", "some()", "includes()"],
        correctAnswer: "find()",
        explanation: "`find()` returns the first element that satisfies the condition. `filter()` returns ALL matching elements. `some()` returns a boolean. `includes()` checks for exact value matches.",
      },
      {
        id: "js-q3-3",
        type: "code-output",
        question: "What will this code output?",
        code: `const user = { name: "Alice", age: 25 };
const { name, city = "Unknown" } = user;
console.log(name, city);`,
        options: ["Alice Unknown", "Alice undefined", "Error", "undefined Unknown"],
        correctAnswer: "Alice Unknown",
        explanation: "Destructuring with default values: `name` gets 'Alice' from the object, `city` uses the default 'Unknown' since it doesn't exist in `user`.",
      },
      {
        id: "js-q3-4",
        type: "fill-blank",
        question: "Complete the code to sum all numbers in an array:",
        code: "const sum = [1, 2, 3, 4].___((acc, n) => acc + n, 0);",
        correctAnswer: "reduce",
        explanation: "`reduce()` is perfect for accumulating values. It takes an accumulator and each element, returning a single value (the sum in this case).",
        hint: "Which method 'reduces' an array to a single value?",
      },
      {
        id: "js-q3-5",
        type: "code-output",
        question: "What will this code output?",
        code: `const obj = { a: 1, b: 2 };
console.log(Object.keys(obj));`,
        options: ["['a', 'b']", "[1, 2]", "['a': 1, 'b': 2]", "{ a: 1, b: 2 }"],
        correctAnswer: "['a', 'b']",
        explanation: "`Object.keys()` returns an array of the object's property names (keys). To get values, use `Object.values()`. To get both, use `Object.entries()`.",
      },
      {
        id: "js-q3-6",
        type: "true-false",
        question: "`filter()` modifies the original array.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "`filter()`, `map()`, and `reduce()` are non-mutating methods - they create and return NEW arrays, leaving the original unchanged. This is important for avoiding side effects.",
      },
      {
        id: "js-q3-7",
        type: "code-output",
        question: "What will this code output?",
        code: `const arr = [1, 2, 3];
const result = arr.filter(n => n > 1).map(n => n * 10);
console.log(result);`,
        options: ["[20, 30]", "[10, 20, 30]", "[1, 20, 30]", "[2, 3]"],
        correctAnswer: "[20, 30]",
        explanation: "Method chaining: First `filter(n => n > 1)` gives [2, 3], then `map(n => n * 10)` transforms each to [20, 30].",
      },
      {
        id: "js-q3-8",
        type: "multiple-choice",
        question: "How do you add a new property `email` to an existing object `user`?",
        options: [
          "user.email = 'test@test.com'",
          "user.add('email', 'test@test.com')",
          "user.push('email', 'test@test.com')",
          "user.create('email', 'test@test.com')"
        ],
        correctAnswer: "user.email = 'test@test.com'",
        explanation: "You can add properties to objects using dot notation (`user.email = value`) or bracket notation (`user['email'] = value`). There's no `add()` or `create()` method for objects.",
      },
      {
        id: "js-q3-9",
        type: "code-output",
        question: "What will this code output?",
        code: `const arr = [1, 2, 3, 4, 5];
console.log(arr.every(n => n > 0));
console.log(arr.some(n => n > 4));`,
        options: ["true, true", "false, true", "true, false", "false, false"],
        correctAnswer: "true, true",
        explanation: "`every()` returns true if ALL elements pass the test (all > 0). `some()` returns true if ANY element passes (5 > 4 is true).",
      },
      {
        id: "js-q3-10",
        type: "fill-blank",
        question: "Complete the code to merge two objects:",
        code: "const merged = { ___obj1, ___obj2 };",
        correctAnswer: ["...", "..."],
        explanation: "The spread operator `...` expands an object's properties. Using it twice merges both objects. Properties from `obj2` override `obj1` if there are conflicts.",
        hint: "What's the three-dot syntax called?",
      },
    ],
  },
  // Quiz 4: After lesson 12 (dom-basics)
  {
    id: "js-quiz-4",
    title: "DOM & Async Fundamentals",
    description: "Test your understanding of DOM manipulation and asynchronous JavaScript",
    trackSlug: "javascript",
    afterLesson: "dom-basics",
    questions: [
      {
        id: "js-q4-1",
        type: "multiple-choice",
        question: "Which method selects an element by its ID?",
        options: [
          "document.querySelector('#id')",
          "document.getElementById('id')",
          "document.getElementsByClassName('id')",
          "Both A and B"
        ],
        correctAnswer: "Both A and B",
        explanation: "Both work! `getElementById('id')` is the classic way. `querySelector('#id')` uses CSS selector syntax (note the #). The first is slightly faster, but both are valid.",
      },
      {
        id: "js-q4-2",
        type: "code-output",
        question: "What will this code output?",
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");`,
        options: ["1, 2, 3", "1, 3, 2", "2, 1, 3", "3, 2, 1"],
        correctAnswer: "1, 3, 2",
        explanation: "Even with 0ms delay, `setTimeout` is asynchronous. JavaScript runs synchronous code first (1, 3), then processes the callback queue (2). This is the event loop in action!",
      },
      {
        id: "js-q4-3",
        type: "true-false",
        question: "`innerHTML` can be used to insert HTML elements into the DOM.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "`innerHTML` parses and inserts HTML. `textContent` only inserts plain text. Be careful with `innerHTML` and user input - it can create XSS vulnerabilities if not sanitized.",
      },
      {
        id: "js-q4-4",
        type: "multiple-choice",
        question: "What does `event.preventDefault()` do?",
        options: [
          "Stops event bubbling",
          "Prevents the default browser action",
          "Removes the event listener",
          "Cancels all events"
        ],
        correctAnswer: "Prevents the default browser action",
        explanation: "`preventDefault()` stops default behaviors like form submission or link navigation. `stopPropagation()` stops event bubbling. They serve different purposes.",
      },
      {
        id: "js-q4-5",
        type: "code-output",
        question: "What will this code output?",
        code: `const promise = new Promise((resolve) => {
  resolve("Done!");
});
promise.then(result => console.log(result));
console.log("Waiting...");`,
        options: ["Done!, Waiting...", "Waiting..., Done!", "Done!", "Error"],
        correctAnswer: "Waiting..., Done!",
        explanation: "Promise `.then()` callbacks are asynchronous - they go to the microtask queue. Synchronous code ('Waiting...') runs first, then the resolved promise callback ('Done!').",
      },
      {
        id: "js-q4-6",
        type: "fill-blank",
        question: "Complete the code to add a click event listener:",
        code: "button.___('click', handleClick);",
        correctAnswer: "addEventListener",
        explanation: "`addEventListener()` is the modern way to attach events. It allows multiple listeners on the same element and provides more control than inline handlers.",
        hint: "What method 'adds' an event 'listener'?",
      },
      {
        id: "js-q4-7",
        type: "multiple-choice",
        question: "Which is true about `async/await`?",
        options: [
          "It makes synchronous code asynchronous",
          "It's syntactic sugar over Promises",
          "It blocks the main thread",
          "It only works with setTimeout"
        ],
        correctAnswer: "It's syntactic sugar over Promises",
        explanation: "`async/await` is cleaner syntax for working with Promises. Under the hood, it still uses Promises. It doesn't block the main thread - it just makes async code look synchronous.",
      },
      {
        id: "js-q4-8",
        type: "code-output",
        question: "What will this code output?",
        code: `const el = document.createElement('div');
el.className = 'box';
el.textContent = 'Hello';
console.log(el.outerHTML);`,
        options: [
          "<div class='box'>Hello</div>",
          '<div class="box">Hello</div>',
          "Hello",
          "undefined"
        ],
        correctAnswer: '<div class="box">Hello</div>',
        explanation: "`createElement()` creates an element in memory. Setting `className` and `textContent` modifies it. `outerHTML` returns the full HTML string including the element itself.",
      },
      {
        id: "js-q4-9",
        type: "true-false",
        question: "Using `fetch()` always requires a `.catch()` for error handling.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "While error handling is important, it's not syntactically required. You can also use `try/catch` with `async/await` instead of `.catch()`. However, unhandled rejections are bad practice!",
      },
      {
        id: "js-q4-10",
        type: "multiple-choice",
        question: "What's the difference between `querySelector` and `querySelectorAll`?",
        options: [
          "No difference",
          "querySelector returns first match, querySelectorAll returns all matches",
          "querySelector is faster",
          "querySelectorAll only works with IDs"
        ],
        correctAnswer: "querySelector returns first match, querySelectorAll returns all matches",
        explanation: "`querySelector` returns the first matching element (or null). `querySelectorAll` returns a NodeList of ALL matching elements. Use the right one based on your needs.",
      },
    ],
  },
  // Quiz 5: Category completion quiz for "JavaScript Fundamentals"
  {
    id: "js-quiz-fundamentals-mastery",
    title: "JavaScript Fundamentals Mastery",
    description: "Comprehensive quiz covering all JavaScript fundamentals",
    trackSlug: "javascript",
    afterLesson: "strings",
    questions: [
      {
        id: "js-qm-1",
        type: "code-output",
        question: "What will this code output?",
        code: `let x = 10;
function test() {
  let x = 20;
  return x;
}
console.log(test());
console.log(x);`,
        options: ["20, 20", "10, 10", "20, 10", "10, 20"],
        correctAnswer: "20, 10",
        explanation: "The `x` inside the function is a different variable due to block scope. The function returns its local `x` (20), while the outer `x` (10) remains unchanged.",
      },
      {
        id: "js-qm-2",
        type: "multiple-choice",
        question: "What's the best way to check if a variable is an array?",
        options: [
          "typeof arr === 'array'",
          "Array.isArray(arr)",
          "arr instanceof Object",
          "arr.constructor === Array"
        ],
        correctAnswer: "Array.isArray(arr)",
        explanation: "`Array.isArray()` is the most reliable way. `typeof` returns 'object' for arrays. `instanceof Object` is true for many things. Constructor checks can fail across frames.",
      },
      {
        id: "js-qm-3",
        type: "code-output",
        question: "What will this code output?",
        code: `const str = "JavaScript";
console.log(str.slice(0, 4));
console.log(str.slice(-6));`,
        options: ["Java, Script", "Java, cript", "Java, Script", "JavaS, cript"],
        correctAnswer: "Java, Script",
        explanation: "`slice(0, 4)` extracts characters from index 0 to 3 ('Java'). `slice(-6)` starts from 6 characters before the end ('Script').",
      },
      {
        id: "js-qm-4",
        type: "fill-blank",
        question: "Complete the template literal:",
        code: "const greeting = ___Hello, ${name}!___;",
        correctAnswer: ["`", "`"],
        explanation: "Template literals use backticks (`) instead of quotes. They allow embedded expressions with `${expression}` and multi-line strings.",
        hint: "Which quote character enables template literals?",
      },
      {
        id: "js-qm-5",
        type: "true-false",
        question: "JavaScript is a single-threaded language.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "JavaScript runs on a single thread. Async operations don't create new threads - they use the event loop and callback/microtask queues. Web Workers can run in separate threads but with limitations.",
      },
    ],
  },
];
