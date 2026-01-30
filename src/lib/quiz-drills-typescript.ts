import type { QuizDrill } from "./quiz-drills";

export const typescriptQuizDrills: QuizDrill[] = [
  // ──────────────────────────────────────────────
  // TYPE ANNOTATIONS (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-type-annotations-01",
    trackId: "typescript",
    category: "Type Annotations",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to annotate the variable with the correct type:\n\n`let count: ____ = 42;`",
    codeSnippet: "let count: ____ = 42;",
    options: [
      { label: "A", text: "number" },
      { label: "B", text: "string" },
      { label: "C", text: "int" },
      { label: "D", text: "Number" },
    ],
    correctAnswer: "A",
    explanation:
      "In TypeScript, the primitive numeric type is `number` (lowercase). `Number` is the wrapper object type and `int` does not exist in TypeScript.",
    hint: "TypeScript uses lowercase primitive type names.",
    tags: ["type-annotations", "primitives", "number"],
  },
  {
    id: "quiz-ts-type-annotations-02",
    trackId: "typescript",
    category: "Type Annotations",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Complete the function signature so it accepts a string and returns a boolean:\n\n`function isValid(input: ____): ____ { ... }`",
    codeSnippet:
      "function isValid(input: ____): ____ {\n  return input.length > 0;\n}",
    options: [
      { label: "A", text: "string, boolean" },
      { label: "B", text: "String, Boolean" },
      { label: "C", text: "str, bool" },
      { label: "D", text: "any, any" },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript uses lowercase `string` and `boolean` for primitive types. The uppercase versions (`String`, `Boolean`) refer to the wrapper object types and should generally be avoided in type annotations.",
    hint: "TypeScript primitive types are always lowercase.",
    tags: ["type-annotations", "functions", "primitives"],
  },
  {
    id: "quiz-ts-type-annotations-03",
    trackId: "typescript",
    category: "Type Annotations",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which of the following is NOT a valid TypeScript primitive type?",
    options: [
      { label: "A", text: "bigint" },
      { label: "B", text: "symbol" },
      { label: "C", text: "char" },
      { label: "D", text: "undefined" },
    ],
    correctAnswer: "C",
    explanation:
      "TypeScript does not have a `char` type. The primitive types are `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `null`, and `void`.",
    hint: "Think about what types exist in JavaScript itself.",
    tags: ["type-annotations", "primitives"],
  },
  {
    id: "quiz-ts-type-annotations-04",
    trackId: "typescript",
    category: "Type Annotations",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to type an array of strings:\n\n`let names: ____ = [\"Alice\", \"Bob\"];`",
    codeSnippet: 'let names: ____ = ["Alice", "Bob"];',
    options: [
      { label: "A", text: "string[]" },
      { label: "B", text: "String[]" },
      { label: "C", text: "array<string>" },
      { label: "D", text: "string()" },
    ],
    correctAnswer: "A",
    explanation:
      "Arrays in TypeScript are typed using `string[]` or `Array<string>`. The syntax `string[]` is the more common shorthand form.",
    hint: "The shorthand array syntax uses square brackets after the element type.",
    tags: ["type-annotations", "arrays"],
  },
  {
    id: "quiz-ts-type-annotations-05",
    trackId: "typescript",
    category: "Type Annotations",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the inferred type of `result`?",
    codeSnippet:
      'const result = [1, "hello", true];',
    options: [
      { label: "A", text: "(string | number | boolean)[]" },
      { label: "B", text: "[number, string, boolean]" },
      { label: "C", text: "any[]" },
      { label: "D", text: "Array<unknown>" },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript infers the type of a mixed array literal as a union array, not a tuple. To get a tuple type, you would need to use `as const` or an explicit tuple annotation.",
    hint: "TypeScript widens array literals to union arrays by default.",
    tags: ["type-annotations", "inference", "arrays"],
  },

  // ──────────────────────────────────────────────
  // GENERICS (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-generics-01",
    trackId: "typescript",
    category: "Generics",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create a generic identity function:\n\n`function identity<____>(arg: ____): ____ { return arg; }`",
    codeSnippet:
      "function identity<____>(arg: ____): ____ {\n  return arg;\n}",
    options: [
      { label: "A", text: "T, T, T" },
      { label: "B", text: "any, any, any" },
      { label: "C", text: "Type, Type, Type" },
      { label: "D", text: "unknown, unknown, unknown" },
    ],
    correctAnswer: "A",
    explanation:
      "A generic type parameter (conventionally named `T`) lets the function capture and preserve the specific type passed in, unlike `any` which loses type information.",
    hint: "Generic type parameters are declared in angle brackets and can be used as types throughout the function.",
    tags: ["generics", "functions"],
  },
  {
    id: "quiz-ts-generics-02",
    trackId: "typescript",
    category: "Generics",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What does TypeScript infer as the return type of `wrap(42)`?",
    codeSnippet:
      "function wrap<T>(value: T): { wrapped: T } {\n  return { wrapped: value };\n}\n\nconst result = wrap(42);",
    options: [
      { label: "A", text: "{ wrapped: number }" },
      { label: "B", text: "{ wrapped: 42 }" },
      { label: "C", text: "{ wrapped: any }" },
      { label: "D", text: "{ wrapped: unknown }" },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript infers `T` as `number` (not the literal `42`) when calling `wrap(42)` because numeric literals widen to `number` in this context.",
    hint: "TypeScript widens literal types to their base types in function argument positions.",
    tags: ["generics", "inference", "widening"],
  },
  {
    id: "quiz-ts-generics-03",
    trackId: "typescript",
    category: "Generics",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to constrain `T` so it must have a `length` property:\n\n`function logLength<T extends ____>(arg: T): void { console.log(arg.length); }`",
    codeSnippet:
      "function logLength<T extends ____>(arg: T): void {\n  console.log(arg.length);\n}",
    options: [
      { label: "A", text: "{ length: number }" },
      { label: "B", text: "Array<any>" },
      { label: "C", text: "string" },
      { label: "D", text: "Iterable<unknown>" },
    ],
    correctAnswer: "A",
    explanation:
      "Using `{ length: number }` as a constraint means any type with a numeric `length` property is accepted, including strings, arrays, and custom objects.",
    hint: "A structural constraint with a `length` property is the most flexible option.",
    tags: ["generics", "constraints"],
  },
  {
    id: "quiz-ts-generics-04",
    trackId: "typescript",
    category: "Generics",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the type of `value`?",
    codeSnippet:
      'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst person = { name: "Alice", age: 30 };\nconst value = getProperty(person, "name");',
    options: [
      { label: "A", text: "string" },
      { label: "B", text: "string | number" },
      { label: "C", text: "any" },
      { label: "D", text: '"Alice"' },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript infers `K` as the literal `\"name\"`, so the return type `T[K]` resolves to `string` (the type of `person.name`).",
    hint: "The indexed access type `T[K]` looks up the type of the property named by `K`.",
    tags: ["generics", "keyof", "indexed-access"],
  },
  {
    id: "quiz-ts-generics-05",
    trackId: "typescript",
    category: "Generics",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What does `T extends infer U ? U : never` do in a conditional type?",
    options: [
      { label: "A", text: "It extracts and returns the type T itself" },
      {
        label: "B",
        text: "It causes a compile error because infer cannot be used this way",
      },
      { label: "C", text: "It always returns never" },
      { label: "D", text: "It creates a recursive type" },
    ],
    correctAnswer: "A",
    explanation:
      "The `infer U` keyword captures whatever `T` is into `U`. Since any type extends itself, the condition is always true and returns `U`, which equals `T`.",
    hint: "The `infer` keyword captures a type in a conditional type's extends clause.",
    tags: ["generics", "conditional-types", "infer"],
  },

  // ──────────────────────────────────────────────
  // UTILITY TYPES (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-utility-types-01",
    trackId: "typescript",
    category: "Utility Types",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which utility type makes all properties of a type optional?",
    options: [
      { label: "A", text: "Partial<T>" },
      { label: "B", text: "Optional<T>" },
      { label: "C", text: "Maybe<T>" },
      { label: "D", text: "Nullable<T>" },
    ],
    correctAnswer: "A",
    explanation:
      "`Partial<T>` constructs a type with all properties of `T` set to optional. `Optional`, `Maybe`, and `Nullable` are not built-in TypeScript utility types.",
    hint: "This is one of the most commonly used built-in utility types.",
    tags: ["utility-types", "partial"],
  },
  {
    id: "quiz-ts-utility-types-02",
    trackId: "typescript",
    category: "Utility Types",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to make all properties of `User` read-only:\n\n`type ReadonlyUser = ____<User>;`",
    codeSnippet:
      "interface User {\n  name: string;\n  age: number;\n}\n\ntype ReadonlyUser = ____<User>;",
    options: [
      { label: "A", text: "Readonly" },
      { label: "B", text: "Frozen" },
      { label: "C", text: "Immutable" },
      { label: "D", text: "Const" },
    ],
    correctAnswer: "A",
    explanation:
      "`Readonly<T>` constructs a type with all properties set to readonly, preventing reassignment at compile time.",
    hint: "This built-in utility type prevents property mutation.",
    tags: ["utility-types", "readonly"],
  },
  {
    id: "quiz-ts-utility-types-03",
    trackId: "typescript",
    category: "Utility Types",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create a type with only the `name` and `email` properties from `User`:\n\n`type ContactInfo = ____<User, \"name\" | \"email\">;`",
    codeSnippet:
      'interface User {\n  name: string;\n  email: string;\n  age: number;\n  address: string;\n}\n\ntype ContactInfo = ____<User, "name" | "email">;',
    options: [
      { label: "A", text: "Pick" },
      { label: "B", text: "Omit" },
      { label: "C", text: "Extract" },
      { label: "D", text: "Select" },
    ],
    correctAnswer: "A",
    explanation:
      "`Pick<T, K>` constructs a type by picking the specified properties from `T`. `Omit` does the opposite by excluding properties.",
    hint: "You want to select specific properties from a type.",
    tags: ["utility-types", "pick"],
  },
  {
    id: "quiz-ts-utility-types-04",
    trackId: "typescript",
    category: "Utility Types",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the resulting type of `StringOrNumberKeys`?",
    codeSnippet:
      "type StringOrNumberKeys = Extract<string | number | boolean, string | number>;",
    options: [
      { label: "A", text: "string | number" },
      { label: "B", text: "boolean" },
      { label: "C", text: "string | number | boolean" },
      { label: "D", text: "never" },
    ],
    correctAnswer: "A",
    explanation:
      "`Extract<T, U>` extracts from `T` those types that are assignable to `U`. Both `string` and `number` are assignable to `string | number`, so the result is `string | number`.",
    hint: "`Extract` keeps only the members of the first union that exist in the second.",
    tags: ["utility-types", "extract"],
  },
  {
    id: "quiz-ts-utility-types-05",
    trackId: "typescript",
    category: "Utility Types",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the resulting type of `Result`?",
    codeSnippet:
      "type Result = Omit<{ a: string; b: number; c: boolean }, \"a\" | \"c\">;",
    options: [
      { label: "A", text: "{ b: number }" },
      { label: "B", text: "{ a: string; c: boolean }" },
      { label: "C", text: "{ a: string; b: number; c: boolean }" },
      { label: "D", text: "never" },
    ],
    correctAnswer: "A",
    explanation:
      "`Omit<T, K>` constructs a type by removing the specified keys from `T`. Removing `\"a\"` and `\"c\"` leaves only `{ b: number }`.",
    hint: "`Omit` is the inverse of `Pick` -- it excludes the listed keys.",
    tags: ["utility-types", "omit"],
  },

  // ──────────────────────────────────────────────
  // INTERFACES VS TYPES (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-interfaces-vs-types-01",
    trackId: "typescript",
    category: "Interfaces vs Types",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which of the following can an `interface` do that a `type` alias cannot?",
    options: [
      { label: "A", text: "Be extended by another interface using extends" },
      {
        label: "B",
        text: "Be reopened to add new properties (declaration merging)",
      },
      { label: "C", text: "Define object shapes with properties" },
      { label: "D", text: "Be used as a function parameter type" },
    ],
    correctAnswer: "B",
    explanation:
      "Declaration merging is unique to interfaces. When you declare the same interface name twice, TypeScript merges them. Type aliases cannot be reopened after creation.",
    hint: "Think about what happens when you declare the same name twice.",
    tags: ["interfaces", "types", "declaration-merging"],
  },
  {
    id: "quiz-ts-interfaces-vs-types-02",
    trackId: "typescript",
    category: "Interfaces vs Types",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to define a type alias for a union of string literals:\n\n`____ Direction = \"up\" | \"down\" | \"left\" | \"right\";`",
    codeSnippet:
      '____ Direction = "up" | "down" | "left" | "right";',
    options: [
      { label: "A", text: "type" },
      { label: "B", text: "interface" },
      { label: "C", text: "enum" },
      { label: "D", text: "const" },
    ],
    correctAnswer: "A",
    explanation:
      "Union types can only be defined with `type` aliases. Interfaces cannot represent unions, and while enums can list named constants, they work differently from union types.",
    hint: "Interfaces cannot represent unions of literals.",
    tags: ["interfaces", "types", "union"],
  },
  {
    id: "quiz-ts-interfaces-vs-types-03",
    trackId: "typescript",
    category: "Interfaces vs Types",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which of the following can a `type` alias do that an `interface` cannot?",
    options: [
      { label: "A", text: "Define union types and tuple types" },
      { label: "B", text: "Define object shapes with methods" },
      { label: "C", text: "Be implemented by a class" },
      { label: "D", text: "Be exported from a module" },
    ],
    correctAnswer: "A",
    explanation:
      "Type aliases can represent unions (`A | B`), tuples (`[string, number]`), and other non-object types that interfaces cannot express. Both can define object shapes and be implemented by classes.",
    hint: "Think about what types go beyond simple object shapes.",
    tags: ["interfaces", "types", "union"],
  },
  {
    id: "quiz-ts-interfaces-vs-types-04",
    trackId: "typescript",
    category: "Interfaces vs Types",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which keyword is used to have one interface inherit the shape of another?",
    options: [
      { label: "A", text: "extends" },
      { label: "B", text: "implements" },
      { label: "C", text: "inherits" },
      { label: "D", text: "mixes" },
    ],
    correctAnswer: "A",
    explanation:
      "Interfaces use `extends` to inherit properties from another interface. `implements` is used by classes, not interfaces.",
    hint: "It is the same keyword used for class inheritance.",
    tags: ["interfaces", "extends"],
  },
  {
    id: "quiz-ts-interfaces-vs-types-05",
    trackId: "typescript",
    category: "Interfaces vs Types",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create an intersection type that combines `Serializable` and `Loggable`:\n\n`type Combined = Serializable ____ Loggable;`",
    codeSnippet:
      "interface Serializable {\n  serialize(): string;\n}\n\ninterface Loggable {\n  log(): void;\n}\n\ntype Combined = Serializable ____ Loggable;",
    options: [
      { label: "A", text: "&" },
      { label: "B", text: "|" },
      { label: "C", text: "+" },
      { label: "D", text: "extends" },
    ],
    correctAnswer: "A",
    explanation:
      "The `&` operator creates an intersection type that combines both types, requiring all properties from both. The `|` operator would create a union type instead.",
    hint: "Intersection types combine multiple types into one.",
    tags: ["types", "intersection"],
  },

  // ──────────────────────────────────────────────
  // ENUMS (4 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-enums-01",
    trackId: "typescript",
    category: "Enums",
    difficulty: "beginner",
    type: "output-prediction",
    question: "What is the value of `Direction.Down`?",
    codeSnippet:
      "enum Direction {\n  Up,\n  Down,\n  Left,\n  Right,\n}",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "\"Down\"" },
      { label: "C", text: "0" },
      { label: "D", text: "undefined" },
    ],
    correctAnswer: "A",
    explanation:
      "Numeric enums auto-increment from 0 by default. `Up` is 0, `Down` is 1, `Left` is 2, and `Right` is 3.",
    hint: "Numeric enums start counting from 0.",
    tags: ["enums", "numeric-enums"],
  },
  {
    id: "quiz-ts-enums-02",
    trackId: "typescript",
    category: "Enums",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "What is the difference between a `const enum` and a regular `enum`?",
    options: [
      {
        label: "A",
        text: "const enums are fully erased at compile time and inlined at use sites",
      },
      { label: "B", text: "const enums can have string values but regular enums cannot" },
      { label: "C", text: "const enums allow computed members" },
      { label: "D", text: "There is no difference; they are interchangeable" },
    ],
    correctAnswer: "A",
    explanation:
      "`const enum` members are inlined at compile time, producing no runtime JavaScript object. Regular enums generate a JavaScript object that exists at runtime.",
    hint: "Think about what happens to the enum in the compiled JavaScript output.",
    tags: ["enums", "const-enum"],
  },
  {
    id: "quiz-ts-enums-03",
    trackId: "typescript",
    category: "Enums",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which statement about numeric enums in TypeScript is true?",
    options: [
      { label: "A", text: "They support reverse mapping from value to name at runtime" },
      { label: "B", text: "They can only contain consecutive integer values" },
      { label: "C", text: "They are erased at compile time like type aliases" },
      { label: "D", text: "They cannot be used as object keys" },
    ],
    correctAnswer: "A",
    explanation:
      "Numeric enums generate a JavaScript object that maps both name-to-value and value-to-name, enabling reverse lookups like `Direction[1]` returning `\"Down\"`.",
    hint: "Numeric enums generate a two-way mapping object.",
    tags: ["enums", "reverse-mapping"],
  },
  {
    id: "quiz-ts-enums-04",
    trackId: "typescript",
    category: "Enums",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to define a string enum member:\n\n`enum Status { Active = ____, Inactive = ____ }`",
    codeSnippet:
      "enum Status {\n  Active = ____,\n  Inactive = ____,\n}",
    options: [
      { label: "A", text: '"ACTIVE", "INACTIVE"' },
      { label: "B", text: "0, 1" },
      { label: "C", text: "true, false" },
      { label: "D", text: 'Status.Active, Status.Inactive' },
    ],
    correctAnswer: "A",
    explanation:
      "String enums require each member to be initialized with a string literal. They provide readable, meaningful values at runtime but do not support reverse mapping.",
    hint: "String enum members must be explicitly assigned string literal values.",
    tags: ["enums", "string-enums"],
  },

  // ──────────────────────────────────────────────
  // TYPE GUARDS / NARROWING (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-type-guards-01",
    trackId: "typescript",
    category: "Type Guards",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Fill in the blank to narrow the type of `value` to `string`:\n\n`if (____ value === \"string\") { value.toUpperCase(); }`",
    codeSnippet:
      'function process(value: string | number) {\n  if (____ value === "string") {\n    value.toUpperCase();\n  }\n}',
    options: [
      { label: "A", text: "typeof" },
      { label: "B", text: "instanceof" },
      { label: "C", text: "is" },
      { label: "D", text: "as" },
    ],
    correctAnswer: "A",
    explanation:
      "The `typeof` operator is used to check primitive types at runtime. TypeScript recognizes `typeof` checks as type guards and narrows accordingly.",
    hint: "This JavaScript operator returns a string describing the type of a value.",
    tags: ["type-guards", "typeof", "narrowing"],
  },
  {
    id: "quiz-ts-type-guards-02",
    trackId: "typescript",
    category: "Type Guards",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create a custom type predicate:\n\n`function isString(value: unknown): value ____ string { return typeof value === \"string\"; }`",
    codeSnippet:
      'function isString(value: unknown): value ____ string {\n  return typeof value === "string";\n}',
    options: [
      { label: "A", text: "is" },
      { label: "B", text: "as" },
      { label: "C", text: "extends" },
      { label: "D", text: "instanceof" },
    ],
    correctAnswer: "A",
    explanation:
      "The `is` keyword in a return type annotation creates a type predicate. When the function returns `true`, TypeScript narrows the parameter to the specified type.",
    hint: "Type predicates use a special keyword in the return type position.",
    tags: ["type-guards", "type-predicates"],
  },
  {
    id: "quiz-ts-type-guards-03",
    trackId: "typescript",
    category: "Type Guards",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Inside the `if` block, what is the narrowed type of `shape`?",
    codeSnippet:
      'interface Circle {\n  kind: "circle";\n  radius: number;\n}\n\ninterface Square {\n  kind: "square";\n  sideLength: number;\n}\n\ntype Shape = Circle | Square;\n\nfunction area(shape: Shape) {\n  if (shape.kind === "circle") {\n    // What is shape here?\n  }\n}',
    options: [
      { label: "A", text: "Circle" },
      { label: "B", text: "Shape" },
      { label: "C", text: "Circle | Square" },
      { label: "D", text: "{ kind: \"circle\" }" },
    ],
    correctAnswer: "A",
    explanation:
      "This is a discriminated union pattern. Checking the `kind` discriminant narrows `shape` to the specific variant whose `kind` matches the checked value.",
    hint: "Discriminated unions narrow based on a shared literal property.",
    tags: ["type-guards", "discriminated-unions", "narrowing"],
  },
  {
    id: "quiz-ts-type-guards-04",
    trackId: "typescript",
    category: "Type Guards",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which operator checks if an object is an instance of a specific class at runtime?",
    options: [
      { label: "A", text: "instanceof" },
      { label: "B", text: "typeof" },
      { label: "C", text: "is" },
      { label: "D", text: "keyof" },
    ],
    correctAnswer: "A",
    explanation:
      "`instanceof` checks the prototype chain at runtime and is recognized by TypeScript as a type guard for class types. `typeof` works for primitive types only.",
    hint: "This operator checks the prototype chain.",
    tags: ["type-guards", "instanceof"],
  },
  {
    id: "quiz-ts-type-guards-05",
    trackId: "typescript",
    category: "Type Guards",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What is the type of `x` after the `if` block?",
    codeSnippet:
      "function example(x: string | number | boolean) {\n  if (typeof x === \"string\") {\n    return;\n  }\n  if (typeof x === \"number\") {\n    return;\n  }\n  // What is x here?\n}",
    options: [
      { label: "A", text: "boolean" },
      { label: "B", text: "string | number | boolean" },
      { label: "C", text: "never" },
      { label: "D", text: "unknown" },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript uses control flow analysis to narrow types. After eliminating `string` and `number` via early returns, only `boolean` remains.",
    hint: "TypeScript eliminates types through each type guard in sequence.",
    tags: ["type-guards", "narrowing", "control-flow"],
  },

  // ──────────────────────────────────────────────
  // MAPPED TYPES (5 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-mapped-types-01",
    trackId: "typescript",
    category: "Mapped Types",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create a mapped type that makes all properties optional:\n\n`type MyPartial<T> = { [K ____ keyof T]?: T[K] };`",
    codeSnippet:
      "type MyPartial<T> = {\n  [K ____ keyof T]?: T[K];\n};",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "of" },
      { label: "C", text: "extends" },
      { label: "D", text: "from" },
    ],
    correctAnswer: "A",
    explanation:
      "The `in` keyword is used in mapped types to iterate over each key in a union. `[K in keyof T]` maps over every property key of `T`.",
    hint: "Mapped types iterate over keys using a specific keyword.",
    tags: ["mapped-types", "partial"],
  },
  {
    id: "quiz-ts-mapped-types-02",
    trackId: "typescript",
    category: "Mapped Types",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What is the resulting type of `Getters`?",
    codeSnippet:
      "interface Person {\n  name: string;\n  age: number;\n}\n\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ntype PersonGetters = Getters<Person>;",
    options: [
      {
        label: "A",
        text: "{ getName: () => string; getAge: () => number }",
      },
      {
        label: "B",
        text: "{ get_name: () => string; get_age: () => number }",
      },
      { label: "C", text: "{ name: () => string; age: () => number }" },
      { label: "D", text: "Compile error" },
    ],
    correctAnswer: "A",
    explanation:
      "Key remapping with `as` in mapped types combined with the `Capitalize` intrinsic string type transforms each key. `name` becomes `getName` and `age` becomes `getAge`.",
    hint: "The `as` clause in a mapped type remaps the key names.",
    tags: ["mapped-types", "key-remapping", "template-literal-types"],
  },
  {
    id: "quiz-ts-mapped-types-03",
    trackId: "typescript",
    category: "Mapped Types",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What does the `-readonly` modifier do in a mapped type like `{ -readonly [K in keyof T]: T[K] }`?",
    options: [
      {
        label: "A",
        text: "It removes the readonly modifier from all properties",
      },
      { label: "B", text: "It adds the readonly modifier to all properties" },
      { label: "C", text: "It makes all properties required" },
      { label: "D", text: "It causes a compile error" },
    ],
    correctAnswer: "A",
    explanation:
      "The `-` prefix removes a modifier in a mapped type. `-readonly` removes readonly, and similarly `-?` removes optionality. The `+` prefix (or no prefix) adds them.",
    hint: "The minus sign in mapped types removes a modifier.",
    tags: ["mapped-types", "modifiers"],
  },
  {
    id: "quiz-ts-mapped-types-04",
    trackId: "typescript",
    category: "Mapped Types",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "Fill in the blank to make all properties of `T` required (removing optionality):\n\n`type MyRequired<T> = { [K in keyof T]____: T[K] };`",
    codeSnippet:
      "type MyRequired<T> = {\n  [K in keyof T]____: T[K];\n};",
    options: [
      { label: "A", text: "-?" },
      { label: "B", text: "+?" },
      { label: "C", text: "!" },
      { label: "D", text: "&" },
    ],
    correctAnswer: "A",
    explanation:
      "The `-?` modifier in a mapped type removes the optional (`?`) flag from each property, making them all required. This is how `Required<T>` is implemented.",
    hint: "Removing the question mark modifier requires a specific prefix.",
    tags: ["mapped-types", "required", "modifiers"],
  },
  {
    id: "quiz-ts-mapped-types-05",
    trackId: "typescript",
    category: "Mapped Types",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "Fill in the blank to create a mapped type that adds `| null` to every property value:\n\n`type Nullable<T> = { [K in keyof T]: ____ };`",
    codeSnippet:
      "type Nullable<T> = {\n  [K in keyof T]: ____;\n};",
    options: [
      { label: "A", text: "T[K] | null" },
      { label: "B", text: "T | null" },
      { label: "C", text: "null" },
      { label: "D", text: "K | null" },
    ],
    correctAnswer: "A",
    explanation:
      "`T[K]` accesses the original property type via an indexed access type. Adding `| null` makes each property nullable individually.",
    hint: "You need the indexed access type to get the original value type for each key.",
    tags: ["mapped-types", "nullable"],
  },

  // ──────────────────────────────────────────────
  // CONDITIONAL TYPES (4 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-conditional-types-01",
    trackId: "typescript",
    category: "Conditional Types",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "Fill in the blanks to create a conditional type that returns `true` if `T` is a string:\n\n`type IsString<T> = T ____ string ? true : false;`",
    codeSnippet:
      "type IsString<T> = T ____ string ? true : false;",
    options: [
      { label: "A", text: "extends" },
      { label: "B", text: "is" },
      { label: "C", text: "==" },
      { label: "D", text: "instanceof" },
    ],
    correctAnswer: "A",
    explanation:
      "Conditional types use the `extends` keyword to check type assignability. `T extends string` is true when `T` is assignable to `string`.",
    hint: "Conditional types use a keyword that also appears in interface inheritance.",
    tags: ["conditional-types"],
  },
  {
    id: "quiz-ts-conditional-types-02",
    trackId: "typescript",
    category: "Conditional Types",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What does `Flatten<string[]>` resolve to?",
    codeSnippet:
      "type Flatten<T> = T extends Array<infer U> ? U : T;\n\ntype A = Flatten<string[]>;\ntype B = Flatten<number>;",
    options: [
      { label: "A", text: "A is string, B is number" },
      { label: "B", text: "A is string[], B is number" },
      { label: "C", text: "A is Array<string>, B is never" },
      { label: "D", text: "A is unknown, B is unknown" },
    ],
    correctAnswer: "A",
    explanation:
      "`string[]` extends `Array<infer U>`, so `U` is inferred as `string`. For `number`, the condition is false so `T` itself (`number`) is returned.",
    hint: "The `infer` keyword captures the element type of an array.",
    tags: ["conditional-types", "infer"],
  },
  {
    id: "quiz-ts-conditional-types-03",
    trackId: "typescript",
    category: "Conditional Types",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What does `Result` evaluate to?",
    codeSnippet:
      "type ToArray<T> = T extends any ? T[] : never;\n\ntype Result = ToArray<string | number>;",
    options: [
      { label: "A", text: "string[] | number[]" },
      { label: "B", text: "(string | number)[]" },
      { label: "C", text: "never" },
      { label: "D", text: "Array<string | number>" },
    ],
    correctAnswer: "A",
    explanation:
      "Conditional types distribute over union types by default. Each member is processed individually: `string` becomes `string[]` and `number` becomes `number[]`, producing `string[] | number[]`.",
    hint: "Conditional types distribute over unions when the checked type is a naked type parameter.",
    tags: ["conditional-types", "distributive"],
  },
  {
    id: "quiz-ts-conditional-types-04",
    trackId: "typescript",
    category: "Conditional Types",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "How do you prevent a conditional type from distributing over a union?",
    options: [
      {
        label: "A",
        text: "Wrap both sides of extends in square brackets: [T] extends [U]",
      },
      { label: "B", text: "Use the nodistribute keyword" },
      { label: "C", text: "Add & {} to the type parameter" },
      { label: "D", text: "Distribution cannot be prevented" },
    ],
    correctAnswer: "A",
    explanation:
      "Wrapping the type parameter in a tuple (`[T] extends [U]`) prevents distribution because the check is no longer on a \"naked\" type parameter.",
    hint: "Wrapping the type parameter in something prevents naked distribution.",
    tags: ["conditional-types", "distributive"],
  },

  // ──────────────────────────────────────────────
  // DECLARATION MERGING (2 questions)
  // ──────────────────────────────────────────────
  {
    id: "quiz-ts-declaration-merging-01",
    trackId: "typescript",
    category: "Declaration Merging",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "What happens when you declare two interfaces with the same name in the same scope?",
    options: [
      { label: "A", text: "They are merged into a single interface" },
      { label: "B", text: "A compile error occurs due to duplicate names" },
      { label: "C", text: "The second declaration overwrites the first" },
      { label: "D", text: "Only the first declaration is used" },
    ],
    correctAnswer: "A",
    explanation:
      "TypeScript merges interfaces with the same name in the same scope. The resulting interface contains all properties from both declarations.",
    hint: "Interfaces have a unique behavior when declared with the same name.",
    tags: ["declaration-merging", "interfaces"],
  },
  {
    id: "quiz-ts-declaration-merging-02",
    trackId: "typescript",
    category: "Declaration Merging",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Does this code compile, and if so, what properties does `box` have?",
    codeSnippet:
      "interface Box {\n  width: number;\n}\n\ninterface Box {\n  height: number;\n}\n\nconst box: Box = { width: 10, height: 20 };",
    options: [
      {
        label: "A",
        text: "Compiles. box has both width and height",
      },
      { label: "B", text: "Compile error: duplicate identifier Box" },
      { label: "C", text: "Compiles. box only has height" },
      { label: "D", text: "Compiles. box only has width" },
    ],
    correctAnswer: "A",
    explanation:
      "Declaration merging combines both `Box` declarations. The merged interface requires both `width` and `height` properties.",
    hint: "Both interface declarations contribute their properties to the final type.",
    tags: ["declaration-merging", "interfaces"],
  },
];
