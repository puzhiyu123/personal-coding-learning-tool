import type { QuizDrill } from "./quiz-drills";

export const javascriptQuizDrills: QuizDrill[] = [
  // ─── Array Methods ───────────────────────────────────────────────────
  {
    id: "quiz-js-array-methods-01",
    trackId: "javascript",
    category: "Array Methods",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Which array method is used to add one or more elements to the end of an array and returns the new length? `arr.____(element)`",
    options: [
      { label: "A", text: "push" },
      { label: "B", text: "append" },
      { label: "C", text: "add" },
      { label: "D", text: "insert" },
    ],
    correctAnswer: "A",
    explanation:
      "`Array.prototype.push()` adds one or more elements to the end of an array and returns the new length of the array.",
    hint: "This method shares its name with a physical action of moving something forward.",
    tags: ["arrays", "push", "mutating"],
  },
  {
    id: "quiz-js-array-methods-02",
    trackId: "javascript",
    category: "Array Methods",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `const arr = [1, 2, 3, 4, 5];
const result = arr.filter(x => x % 2 === 0);
console.log(result);`,
    options: [
      { label: "A", text: "[1, 3, 5]" },
      { label: "B", text: "[2, 4]" },
      { label: "C", text: "[1, 2, 3, 4, 5]" },
      { label: "D", text: "[false, true, false, true, false]" },
    ],
    correctAnswer: "B",
    explanation:
      "`filter` creates a new array with all elements that pass the test. Here, only 2 and 4 are even numbers (divisible by 2 with no remainder).",
    hint: "The callback checks if a number is even using the modulo operator.",
    tags: ["arrays", "filter", "callback"],
  },
  {
    id: "quiz-js-array-methods-03",
    trackId: "javascript",
    category: "Array Methods",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `const arr = [1, 2, 3];
const result = arr.reduce((acc, val) => acc + val, 10);
console.log(result);`,
    options: [
      { label: "A", text: "6" },
      { label: "B", text: "16" },
      { label: "C", text: "10" },
      { label: "D", text: "NaN" },
    ],
    correctAnswer: "B",
    explanation:
      "`reduce` starts with the initial value of 10, then adds each element: 10 + 1 + 2 + 3 = 16.",
    hint: "Pay attention to the second argument passed to `reduce` -- that is the initial accumulator value.",
    tags: ["arrays", "reduce", "accumulator"],
  },
  {
    id: "quiz-js-array-methods-04",
    trackId: "javascript",
    category: "Array Methods",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To create a new array by transforming each element, you use `arr.____(callback)`. This does not mutate the original array.",
    options: [
      { label: "A", text: "forEach" },
      { label: "B", text: "map" },
      { label: "C", text: "filter" },
      { label: "D", text: "reduce" },
    ],
    correctAnswer: "B",
    explanation:
      "`map` creates a new array by calling a function on every element and collecting the return values. Unlike `forEach`, it returns a new array.",
    hint: "This method returns a new array of the same length with each element transformed.",
    tags: ["arrays", "map", "transformation"],
  },
  {
    id: "quiz-js-array-methods-05",
    trackId: "javascript",
    category: "Array Methods",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `const arr = [1, [2, [3, [4]]]];
console.log(arr.flat(2));`,
    options: [
      { label: "A", text: "[1, 2, 3, [4]]" },
      { label: "B", text: "[1, 2, 3, 4]" },
      { label: "C", text: "[1, [2, [3, [4]]]]" },
      { label: "D", text: "[1, 2, [3, [4]]]" },
    ],
    correctAnswer: "A",
    explanation:
      "`flat(2)` flattens the array up to 2 levels deep. The innermost `[4]` is at depth 3, so it remains wrapped in an array.",
    hint: "The argument to `flat` specifies the depth level to flatten.",
    tags: ["arrays", "flat", "nested"],
  },

  // ─── Closures ────────────────────────────────────────────────────────
  {
    id: "quiz-js-closures-01",
    trackId: "javascript",
    category: "Closures",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter());
console.log(counter());
console.log(counter());`,
    options: [
      { label: "A", text: "1 1 1" },
      { label: "B", text: "0 1 2" },
      { label: "C", text: "1 2 3" },
      { label: "D", text: "undefined undefined undefined" },
    ],
    correctAnswer: "C",
    explanation:
      "The inner function forms a closure over `count`. Each call increments and returns the shared `count` variable, producing 1, 2, 3.",
    hint: "A closure remembers variables from its outer scope even after the outer function has returned.",
    tags: ["closures", "scope", "state"],
  },
  {
    id: "quiz-js-closures-02",
    trackId: "javascript",
    category: "Closures",
    difficulty: "beginner",
    type: "multiple-choice",
    question: "What is a closure in JavaScript?",
    options: [
      {
        label: "A",
        text: "A function that has access to variables from its outer (enclosing) function's scope, even after the outer function has returned",
      },
      {
        label: "B",
        text: "A way to close a browser window using JavaScript",
      },
      {
        label: "C",
        text: "A method to prevent variables from being garbage collected",
      },
      {
        label: "D",
        text: "A special syntax for immediately invoking a function",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A closure is created when a function retains access to its lexical scope even when executed outside that scope. This is a fundamental concept in JavaScript.",
    hint: "Think about how inner functions can 'remember' variables from the function that created them.",
    tags: ["closures", "lexical-scope", "concept"],
  },
  {
    id: "quiz-js-closures-03",
    trackId: "javascript",
    category: "Closures",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: [
      { label: "A", text: "0 1 2" },
      { label: "B", text: "3 3 3" },
      { label: "C", text: "undefined undefined undefined" },
      { label: "D", text: "0 0 0" },
    ],
    correctAnswer: "B",
    explanation:
      "Because `var` is function-scoped (not block-scoped), all three callbacks share the same `i`. By the time the callbacks execute, the loop has finished and `i` is 3.",
    hint: "Consider the difference between `var` and `let` in terms of scoping within a loop.",
    tags: ["closures", "var", "setTimeout", "loop"],
  },
  {
    id: "quiz-js-closures-04",
    trackId: "javascript",
    category: "Closures",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To fix the classic loop closure problem with `var`, you can replace `var` with ____ to create a new binding for each iteration.",
    options: [
      { label: "A", text: "const" },
      { label: "B", text: "let" },
      { label: "C", text: "function" },
      { label: "D", text: "static" },
    ],
    correctAnswer: "B",
    explanation:
      "`let` is block-scoped, so each loop iteration gets its own `i` binding. This fixes the closure issue where `var` shares a single binding across iterations.",
    hint: "This ES6 keyword creates block-scoped variables.",
    tags: ["closures", "let", "block-scope"],
  },
  {
    id: "quiz-js-closures-05",
    trackId: "javascript",
    category: "Closures",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What is a practical use case for closures in JavaScript?",
    options: [
      {
        label: "A",
        text: "Creating private variables and encapsulating state within a function",
      },
      {
        label: "B",
        text: "Making synchronous code run asynchronously",
      },
      {
        label: "C",
        text: "Preventing garbage collection of unused objects",
      },
      {
        label: "D",
        text: "Converting callback-based code to promise-based code",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Closures are commonly used to create private variables and encapsulate state. The inner function has access to the outer scope's variables, but they are not accessible from outside.",
    hint: "Think about the module pattern and data privacy in JavaScript.",
    tags: ["closures", "private-variables", "encapsulation"],
  },

  // ─── Promises / Async ────────────────────────────────────────────────
  {
    id: "quiz-js-promises-01",
    trackId: "javascript",
    category: "Promises/Async",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To handle a resolved promise value, you chain a .____(callback) method on the promise.",
    options: [
      { label: "A", text: "then" },
      { label: "B", text: "resolve" },
      { label: "C", text: "await" },
      { label: "D", text: "done" },
    ],
    correctAnswer: "A",
    explanation:
      "`.then()` registers a callback that runs when the promise resolves. It receives the resolved value as its argument.",
    hint: "This method name describes what happens next after the promise settles.",
    tags: ["promises", "then", "async"],
  },
  {
    id: "quiz-js-promises-02",
    trackId: "javascript",
    category: "Promises/Async",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the order of the logged values?",
    codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    options: [
      { label: "A", text: "A D C B" },
      { label: "B", text: "A B C D" },
      { label: "C", text: "A D B C" },
      { label: "D", text: "A C D B" },
    ],
    correctAnswer: "A",
    explanation:
      "Synchronous code runs first (A, D). Microtasks (Promise.then) run before macrotasks (setTimeout), so C comes before B.",
    hint: "JavaScript has a microtask queue (for promises) and a macrotask queue (for setTimeout). Microtasks have higher priority.",
    tags: ["promises", "event-loop", "microtask"],
  },
  {
    id: "quiz-js-promises-03",
    trackId: "javascript",
    category: "Promises/Async",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which keyword is used inside an `async` function to pause execution until a Promise settles?",
    options: [
      { label: "A", text: "yield" },
      { label: "B", text: "await" },
      { label: "C", text: "pause" },
      { label: "D", text: "defer" },
    ],
    correctAnswer: "B",
    explanation:
      "`await` pauses the execution of an `async` function until the promise resolves or rejects, then returns the resolved value.",
    hint: "This keyword literally means 'wait for' in English.",
    tags: ["async", "await", "promises"],
  },
  {
    id: "quiz-js-promises-04",
    trackId: "javascript",
    category: "Promises/Async",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `async function foo() {
  console.log("1");
  const result = await Promise.resolve("2");
  console.log(result);
  console.log("3");
}
console.log("4");
foo();
console.log("5");`,
    options: [
      { label: "A", text: "4 1 2 3 5" },
      { label: "B", text: "4 1 5 2 3" },
      { label: "C", text: "1 2 3 4 5" },
      { label: "D", text: "4 5 1 2 3" },
    ],
    correctAnswer: "B",
    explanation:
      "'4' logs first, then `foo()` runs synchronously until the `await`, logging '1'. Control returns to the caller, logging '5'. Then the microtask resumes `foo`, logging '2' and '3'.",
    hint: "Code before `await` inside an async function runs synchronously. After `await`, it resumes as a microtask.",
    tags: ["async", "await", "event-loop"],
  },
  {
    id: "quiz-js-promises-05",
    trackId: "javascript",
    category: "Promises/Async",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "`Promise.____()` takes an array of promises and resolves when all of them have resolved, or rejects if any one rejects.",
    options: [
      { label: "A", text: "all" },
      { label: "B", text: "race" },
      { label: "C", text: "any" },
      { label: "D", text: "allSettled" },
    ],
    correctAnswer: "A",
    explanation:
      "`Promise.all()` waits for every promise to resolve and returns an array of results. If any promise rejects, the whole thing rejects immediately.",
    hint: "This method requires every single promise to succeed.",
    tags: ["promises", "Promise.all", "concurrency"],
  },

  // ─── ES6+ Features ──────────────────────────────────────────────────
  {
    id: "quiz-js-es6-01",
    trackId: "javascript",
    category: "ES6+ Features",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "ES6 template literals use ____ (backtick characters) instead of regular quotes, and allow embedded expressions with `${}`.",
    options: [
      { label: "A", text: "` ` (backticks)" },
      { label: "B", text: "' ' (single quotes)" },
      { label: "C", text: '" " (double quotes)' },
      { label: "D", text: "< > (angle brackets)" },
    ],
    correctAnswer: "A",
    explanation:
      "Template literals are enclosed by backtick characters (`` ` ``). They support multi-line strings and expression interpolation via `${expression}`.",
    hint: "This character is usually found on the key to the left of the number 1 on a US keyboard.",
    tags: ["es6", "template-literals", "strings"],
  },
  {
    id: "quiz-js-es6-02",
    trackId: "javascript",
    category: "ES6+ Features",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `const [a, , b] = [1, 2, 3, 4];
console.log(a, b);`,
    options: [
      { label: "A", text: "1 2" },
      { label: "B", text: "1 3" },
      { label: "C", text: "1 4" },
      { label: "D", text: "undefined undefined" },
    ],
    correctAnswer: "B",
    explanation:
      "Array destructuring assigns by position. The empty slot (`, ,`) skips the second element. So `a` is 1 and `b` is 3.",
    hint: "The extra comma between `a` and `b` skips one element in the array.",
    tags: ["es6", "destructuring", "arrays"],
  },
  {
    id: "quiz-js-es6-03",
    trackId: "javascript",
    category: "ES6+ Features",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `const obj = { x: 1, y: 2, z: 3 };
const { x, ...rest } = obj;
console.log(rest);`,
    options: [
      { label: "A", text: "{ y: 2, z: 3 }" },
      { label: "B", text: "{ x: 1 }" },
      { label: "C", text: "[2, 3]" },
      { label: "D", text: "undefined" },
    ],
    correctAnswer: "A",
    explanation:
      "The rest syntax `...rest` collects all remaining properties that were not explicitly destructured into a new object. Here, `x` is extracted, and `rest` gets `{ y: 2, z: 3 }`.",
    hint: "The `...` rest syntax gathers the leftover properties into a new object.",
    tags: ["es6", "destructuring", "rest-syntax"],
  },
  {
    id: "quiz-js-es6-04",
    trackId: "javascript",
    category: "ES6+ Features",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Arrow functions do not have their own `this`. Instead, they ____ the `this` value from the enclosing lexical scope.",
    options: [
      { label: "A", text: "inherit" },
      { label: "B", text: "create" },
      { label: "C", text: "destroy" },
      { label: "D", text: "ignore" },
    ],
    correctAnswer: "A",
    explanation:
      "Arrow functions capture (inherit) the `this` value from the scope in which they are defined, unlike regular functions which have their own `this` determined by how they are called.",
    hint: "Arrow functions look 'outward' for their `this` binding.",
    tags: ["es6", "arrow-functions", "this"],
  },
  {
    id: "quiz-js-es6-05",
    trackId: "javascript",
    category: "ES6+ Features",
    difficulty: "intermediate",
    type: "multiple-choice",
    question: "What does the `??` (nullish coalescing) operator do in JavaScript?",
    options: [
      {
        label: "A",
        text: "Returns the right operand if the left is null or undefined, otherwise returns the left",
      },
      {
        label: "B",
        text: "Returns the right operand if the left is any falsy value",
      },
      {
        label: "C",
        text: "Throws an error if the left operand is null",
      },
      {
        label: "D",
        text: "Converts both operands to boolean before comparing",
      },
    ],
    correctAnswer: "A",
    explanation:
      "The `??` operator only considers `null` and `undefined` as 'nullish'. Unlike `||`, it does not treat `0`, `''`, or `false` as trigger values for the fallback.",
    hint: "Unlike `||`, this operator is specifically concerned with null and undefined, not all falsy values.",
    tags: ["es6", "nullish-coalescing", "operators"],
  },

  // ─── Objects / Prototypes ────────────────────────────────────────────
  {
    id: "quiz-js-objects-01",
    trackId: "javascript",
    category: "Objects/Prototypes",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To check if an object has a specific property as its own (not inherited), you use `obj.____(propertyName)`.",
    options: [
      { label: "A", text: "hasOwnProperty" },
      { label: "B", text: "includes" },
      { label: "C", text: "contains" },
      { label: "D", text: "propertyExists" },
    ],
    correctAnswer: "A",
    explanation:
      "`hasOwnProperty()` returns `true` if the object has the specified property as a direct (own) property, not inherited through the prototype chain.",
    hint: "The method name literally describes what it checks: whether the property is the object's 'own'.",
    tags: ["objects", "hasOwnProperty", "prototype"],
  },
  {
    id: "quiz-js-objects-02",
    trackId: "javascript",
    category: "Objects/Prototypes",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "When you assign an object to a new variable with `const b = a`, what happens?",
    options: [
      {
        label: "A",
        text: "A deep copy of the object is created",
      },
      {
        label: "B",
        text: "Both variables reference the same object in memory",
      },
      {
        label: "C",
        text: "A shallow copy of the object is created",
      },
      {
        label: "D",
        text: "The original variable `a` becomes undefined",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Objects are assigned by reference, not by value. Both `a` and `b` point to the same object in memory, so modifying one affects the other.",
    hint: "JavaScript does not copy objects when assigning them to variables -- it copies the reference.",
    tags: ["objects", "reference", "assignment"],
  },
  {
    id: "quiz-js-objects-03",
    trackId: "javascript",
    category: "Objects/Prototypes",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hi, " + this.name;
};
const p = new Person("Eve");
console.log(p.greet());
console.log(p.hasOwnProperty("greet"));`,
    options: [
      { label: "A", text: '"Hi, Eve" true' },
      { label: "B", text: '"Hi, Eve" false' },
      { label: "C", text: '"Hi, undefined" false' },
      { label: "D", text: "TypeError" },
    ],
    correctAnswer: "B",
    explanation:
      "`greet` is defined on `Person.prototype`, not directly on the instance `p`. So `p.greet()` works via the prototype chain, but `hasOwnProperty('greet')` returns `false`.",
    hint: "Properties on the prototype are accessible but are not 'own' properties of the instance.",
    tags: ["objects", "prototype", "hasOwnProperty"],
  },
  {
    id: "quiz-js-objects-04",
    trackId: "javascript",
    category: "Objects/Prototypes",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which method creates a shallow copy of an object by merging properties from source objects into a target?",
    options: [
      { label: "A", text: "Object.assign()" },
      { label: "B", text: "Object.copy()" },
      { label: "C", text: "Object.clone()" },
      { label: "D", text: "Object.merge()" },
    ],
    correctAnswer: "A",
    explanation:
      "`Object.assign(target, ...sources)` copies all enumerable own properties from source objects to the target object and returns the target.",
    hint: "This static method 'assigns' properties from one or more source objects to a target.",
    tags: ["objects", "Object.assign", "shallow-copy"],
  },
  {
    id: "quiz-js-objects-05",
    trackId: "javascript",
    category: "Objects/Prototypes",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "`Object.____()` prevents new properties from being added to an object and marks all existing properties as non-configurable. Existing property values can still be changed.",
    options: [
      { label: "A", text: "freeze" },
      { label: "B", text: "seal" },
      { label: "C", text: "lock" },
      { label: "D", text: "prevent" },
    ],
    correctAnswer: "B",
    explanation:
      "`Object.seal()` prevents adding/removing properties and marks them as non-configurable, but allows modifying existing property values. `Object.freeze()` goes further by also preventing value changes.",
    hint: "This is the middle ground between a writable object and a completely frozen one.",
    tags: ["objects", "Object.seal", "immutability"],
  },

  // ─── Type Coercion ───────────────────────────────────────────────────
  {
    id: "quiz-js-type-coercion-01",
    trackId: "javascript",
    category: "Type Coercion",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "When using `+` with a string and a number like `\"5\" + 3`, JavaScript performs string ____ instead of arithmetic addition, resulting in `\"53\"`.",
    options: [
      { label: "A", text: "concatenation" },
      { label: "B", text: "interpolation" },
      { label: "C", text: "conversion" },
      { label: "D", text: "parsing" },
    ],
    correctAnswer: "A",
    explanation:
      "When the `+` operator has a string operand, JavaScript coerces the other operand to a string and performs concatenation. The `-` operator, by contrast, always triggers numeric coercion.",
    hint: "This is the process of joining two strings end to end.",
    tags: ["coercion", "string", "concatenation"],
  },
  {
    id: "quiz-js-type-coercion-02",
    trackId: "javascript",
    category: "Type Coercion",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which of the following values is NOT falsy in JavaScript?",
    options: [
      { label: "A", text: '0' },
      { label: "B", text: '""' },
      { label: "C", text: "[]" },
      { label: "D", text: "null" },
    ],
    correctAnswer: "C",
    explanation:
      "An empty array `[]` is truthy in JavaScript. The falsy values are: `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, and `NaN`. Empty arrays and objects are truthy.",
    hint: "Empty arrays and empty objects are both truthy, even though they might seem 'empty'.",
    tags: ["coercion", "falsy", "truthy"],
  },
  {
    id: "quiz-js-type-coercion-03",
    trackId: "javascript",
    category: "Type Coercion",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "What is the difference between `==` and `===` in JavaScript?",
    options: [
      {
        label: "A",
        text: "`==` checks value only (with type coercion); `===` checks both value and type (no coercion)",
      },
      {
        label: "B",
        text: "`===` is slower than `==` because it checks more things",
      },
      {
        label: "C",
        text: "They are identical in behavior",
      },
      {
        label: "D",
        text: "`===` only works with numbers",
      },
    ],
    correctAnswer: "A",
    explanation:
      "`==` (loose equality) performs type coercion before comparing, while `===` (strict equality) requires both the value and the type to be the same without any conversion.",
    hint: "One of these operators will convert types to try to make them match; the other won't.",
    tags: ["coercion", "equality", "strict-vs-loose"],
  },
  {
    id: "quiz-js-type-coercion-04",
    trackId: "javascript",
    category: "Type Coercion",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "`typeof null` returns `\"____\"` in JavaScript, which is a well-known historical bug in the language.",
    options: [
      { label: "A", text: "null" },
      { label: "B", text: "object" },
      { label: "C", text: "undefined" },
      { label: "D", text: "boolean" },
    ],
    correctAnswer: "B",
    explanation:
      '`typeof null` returns `"object"` -- this is a well-known JavaScript bug that has persisted since the first version. It was never fixed to avoid breaking existing code.',
    hint: "This is one of the most famous quirks in JavaScript and the result is not what you would expect.",
    tags: ["coercion", "typeof", "null"],
  },
  {
    id: "quiz-js-type-coercion-05",
    trackId: "javascript",
    category: "Type Coercion",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `console.log(0.1 + 0.2 === 0.3);
console.log(Number.isInteger(1.0));`,
    options: [
      { label: "A", text: "true true" },
      { label: "B", text: "false false" },
      { label: "C", text: "false true" },
      { label: "D", text: "true false" },
    ],
    correctAnswer: "C",
    explanation:
      "`0.1 + 0.2` equals `0.30000000000000004` due to floating-point precision, so the strict comparison with `0.3` is `false`. `1.0` is stored as `1` in JavaScript, so `Number.isInteger(1.0)` is `true`.",
    hint: "Floating-point arithmetic in JavaScript (and most languages) can produce tiny precision errors.",
    tags: ["coercion", "floating-point", "Number"],
  },

  // ─── Scope / Hoisting ────────────────────────────────────────────────
  {
    id: "quiz-js-scope-01",
    trackId: "javascript",
    category: "Scope/Hoisting",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "What happens when you try to access a `let` variable before its declaration in the same block?",
    options: [
      { label: "A", text: "It returns `undefined`" },
      { label: "B", text: "It throws a `ReferenceError`" },
      { label: "C", text: "It returns `null`" },
      { label: "D", text: "It returns `NaN`" },
    ],
    correctAnswer: "B",
    explanation:
      "`let` and `const` declarations are hoisted but not initialized. Accessing them before the declaration line results in a `ReferenceError` due to the Temporal Dead Zone (TDZ).",
    hint: "There is a 'dead zone' between the start of the block and the declaration line.",
    tags: ["scope", "hoisting", "let", "tdz"],
  },
  {
    id: "quiz-js-scope-02",
    trackId: "javascript",
    category: "Scope/Hoisting",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `console.log(x);
var x = 5;`,
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "undefined" },
      { label: "C", text: "ReferenceError" },
      { label: "D", text: "null" },
    ],
    correctAnswer: "B",
    explanation:
      "`var` declarations are hoisted to the top of their scope, but the assignment stays in place. So `x` exists but is `undefined` at the time of the `console.log`.",
    hint: "With `var`, the declaration is hoisted but the initialization is not.",
    tags: ["scope", "hoisting", "var"],
  },
  {
    id: "quiz-js-scope-03",
    trackId: "javascript",
    category: "Scope/Hoisting",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "The period between entering a block and the actual `let`/`const` declaration where the variable cannot be accessed is called the Temporal ____ Zone (TDZ).",
    options: [
      { label: "A", text: "Dead" },
      { label: "B", text: "Danger" },
      { label: "C", text: "Dark" },
      { label: "D", text: "Delay" },
    ],
    correctAnswer: "A",
    explanation:
      "The Temporal Dead Zone (TDZ) is the period between entering a scope and the point where a `let` or `const` variable is declared. Accessing the variable during this time throws a `ReferenceError`.",
    hint: "This zone describes a period where the variable exists but is not yet 'alive' for use.",
    tags: ["scope", "hoisting", "tdz", "let"],
  },
  {
    id: "quiz-js-scope-04",
    trackId: "javascript",
    category: "Scope/Hoisting",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Variables declared with `var` are scoped to the nearest ____, while `let` and `const` are scoped to the nearest block.",
    options: [
      { label: "A", text: "function" },
      { label: "B", text: "loop" },
      { label: "C", text: "module" },
      { label: "D", text: "object" },
    ],
    correctAnswer: "A",
    explanation:
      "`var` has function scope, meaning it is scoped to the nearest enclosing function (or global scope if not in a function). `let` and `const` have block scope.",
    hint: "`var` does not respect `if`, `for`, or `while` blocks -- only one particular structure limits its scope.",
    tags: ["scope", "var", "function-scope"],
  },
  {
    id: "quiz-js-scope-05",
    trackId: "javascript",
    category: "Scope/Hoisting",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `greet();
function greet() {
  console.log("Hello");
}

sayBye();
var sayBye = function() {
  console.log("Bye");
};`,
    options: [
      { label: "A", text: '"Hello" then "Bye"' },
      { label: "B", text: '"Hello" then TypeError' },
      { label: "C", text: "ReferenceError" },
      { label: "D", text: "TypeError then TypeError" },
    ],
    correctAnswer: "B",
    explanation:
      "Function declarations are fully hoisted (including the body), so `greet()` works. Function expressions with `var` are hoisted as `undefined`, so calling `sayBye()` throws a `TypeError: sayBye is not a function`.",
    hint: "Function declarations and function expressions assigned to `var` are hoisted differently.",
    tags: ["scope", "hoisting", "function-declaration", "function-expression"],
  },

  // ─── Error Handling ──────────────────────────────────────────────────
  {
    id: "quiz-js-error-handling-01",
    trackId: "javascript",
    category: "Error Handling",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To handle exceptions in JavaScript, you wrap code in a `try` block and catch errors in a ____ block.",
    options: [
      { label: "A", text: "catch" },
      { label: "B", text: "error" },
      { label: "C", text: "handle" },
      { label: "D", text: "except" },
    ],
    correctAnswer: "A",
    explanation:
      "The `try...catch` statement lets you test a block of code for errors. The `catch` block handles the error if one is thrown.",
    hint: "This keyword is used in many programming languages for exception handling and rhymes with 'match'.",
    tags: ["error-handling", "try-catch"],
  },
  {
    id: "quiz-js-error-handling-02",
    trackId: "javascript",
    category: "Error Handling",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "The `____` block in a try/catch statement always executes regardless of whether an error was thrown or not, making it ideal for cleanup operations.",
    options: [
      { label: "A", text: "finally" },
      { label: "B", text: "always" },
      { label: "C", text: "cleanup" },
      { label: "D", text: "ensure" },
    ],
    correctAnswer: "A",
    explanation:
      "The `finally` block always executes after `try` and `catch`, regardless of whether an error occurred. It is commonly used for cleanup tasks like closing file handles or database connections.",
    hint: "This block runs at the very end, no matter what happens in the try or catch.",
    tags: ["error-handling", "try-catch-finally"],
  },
  {
    id: "quiz-js-error-handling-03",
    trackId: "javascript",
    category: "Error Handling",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which built-in error type is thrown when you reference a variable that has not been declared?",
    options: [
      { label: "A", text: "TypeError" },
      { label: "B", text: "SyntaxError" },
      { label: "C", text: "ReferenceError" },
      { label: "D", text: "RangeError" },
    ],
    correctAnswer: "C",
    explanation:
      "A `ReferenceError` is thrown when trying to access a variable that does not exist in the current scope. A `TypeError` is for invalid operations on values.",
    hint: "The error name literally describes the problem: an invalid reference to something that doesn't exist.",
    tags: ["error-handling", "ReferenceError", "error-types"],
  },
  {
    id: "quiz-js-error-handling-04",
    trackId: "javascript",
    category: "Error Handling",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "When working with async/await, you handle errors by wrapping the `await` call in a ____ block, similar to synchronous error handling.",
    options: [
      { label: "A", text: "try...catch" },
      { label: "B", text: "if...else" },
      { label: "C", text: "Promise.catch" },
      { label: "D", text: "error...handler" },
    ],
    correctAnswer: "A",
    explanation:
      "`try...catch` works seamlessly with async/await. If the awaited promise rejects, the error is caught by the `catch` block just like a synchronous throw.",
    hint: "Async/await lets you use the same error handling pattern as synchronous code.",
    tags: ["error-handling", "async", "try-catch"],
  },
  {
    id: "quiz-js-error-handling-05",
    trackId: "javascript",
    category: "Error Handling",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the output of the following code?",
    codeSnippet: `function risky() {
  try {
    return "try";
  } finally {
    return "finally";
  }
}
console.log(risky());`,
    options: [
      { label: "A", text: '"try"' },
      { label: "B", text: '"finally"' },
      { label: "C", text: '"try" "finally"' },
      { label: "D", text: "undefined" },
    ],
    correctAnswer: "B",
    explanation:
      "When both `try` and `finally` have `return` statements, the `finally` block's return value overrides the `try` block's return value. The function returns 'finally'.",
    hint: "The `finally` block gets the last word -- even if `try` already has a return statement.",
    tags: ["error-handling", "finally", "return"],
  },

  // ─── DOM / Events ────────────────────────────────────────────────────
  {
    id: "quiz-js-dom-01",
    trackId: "javascript",
    category: "DOM/Events",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To select a single element by its CSS selector, you use `document.____(selector)`.",
    options: [
      { label: "A", text: "querySelector" },
      { label: "B", text: "getElementById" },
      { label: "C", text: "getElement" },
      { label: "D", text: "findElement" },
    ],
    correctAnswer: "A",
    explanation:
      "`document.querySelector()` returns the first element matching the given CSS selector. It is more versatile than `getElementById` because it accepts any valid CSS selector.",
    hint: "This method accepts any CSS selector string (class, id, attribute, etc.) and returns the first match.",
    tags: ["dom", "querySelector", "selectors"],
  },
  {
    id: "quiz-js-dom-02",
    trackId: "javascript",
    category: "DOM/Events",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What does `event.preventDefault()` do when called inside an event handler?",
    options: [
      {
        label: "A",
        text: "Stops the event from bubbling up to parent elements",
      },
      {
        label: "B",
        text: "Prevents the browser's default action for that event (e.g., form submission, link navigation)",
      },
      {
        label: "C",
        text: "Removes the event listener from the element",
      },
      {
        label: "D",
        text: "Prevents other event handlers on the same element from firing",
      },
    ],
    correctAnswer: "B",
    explanation:
      "`preventDefault()` stops the browser's default behavior for the event. For example, it can prevent a form from submitting or a link from navigating. It does not stop event propagation.",
    hint: "The method name says it: it prevents the 'default' action that the browser would normally take.",
    tags: ["dom", "events", "preventDefault"],
  },
  {
    id: "quiz-js-dom-03",
    trackId: "javascript",
    category: "DOM/Events",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "In the DOM event flow, what is the correct order of the three phases?",
    options: [
      { label: "A", text: "Capturing, Target, Bubbling" },
      { label: "B", text: "Bubbling, Target, Capturing" },
      { label: "C", text: "Target, Capturing, Bubbling" },
      { label: "D", text: "Capturing, Bubbling, Target" },
    ],
    correctAnswer: "A",
    explanation:
      "The DOM event flow consists of three phases in order: capturing (from window down to the target), target (the element itself), and bubbling (back up from the target to the window).",
    hint: "Events travel down first, hit the target, then travel back up.",
    tags: ["dom", "events", "event-flow", "bubbling"],
  },
  {
    id: "quiz-js-dom-04",
    trackId: "javascript",
    category: "DOM/Events",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Event ____ is a technique where you attach a single event listener to a parent element to handle events from its child elements, using `event.target` to determine which child was clicked.",
    options: [
      { label: "A", text: "delegation" },
      { label: "B", text: "propagation" },
      { label: "C", text: "binding" },
      { label: "D", text: "capturing" },
    ],
    correctAnswer: "A",
    explanation:
      "Event delegation leverages event bubbling by placing a single listener on a parent element. It is more memory-efficient than attaching listeners to every child element.",
    hint: "You 'delegate' the responsibility of handling events to a parent element instead of each child.",
    tags: ["dom", "events", "delegation", "performance"],
  },
  {
    id: "quiz-js-dom-05",
    trackId: "javascript",
    category: "DOM/Events",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What is the difference between `event.stopPropagation()` and `event.stopImmediatePropagation()`?",
    options: [
      {
        label: "A",
        text: "`stopPropagation` prevents the event from reaching parent elements; `stopImmediatePropagation` also prevents other handlers on the same element from firing",
      },
      {
        label: "B",
        text: "They are identical in behavior",
      },
      {
        label: "C",
        text: "`stopImmediatePropagation` only works during the capturing phase",
      },
      {
        label: "D",
        text: "`stopPropagation` prevents default browser actions; `stopImmediatePropagation` does not",
      },
    ],
    correctAnswer: "A",
    explanation:
      "`stopPropagation()` prevents the event from propagating to parent elements but allows other handlers on the current element to run. `stopImmediatePropagation()` additionally stops other handlers on the same element from being called.",
    hint: "The 'Immediate' part refers to stopping handlers even on the exact same element, not just ancestor elements.",
    tags: ["dom", "events", "propagation", "stopPropagation"],
  },
];
