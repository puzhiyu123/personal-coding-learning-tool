export interface CodeComparison {
  id: string;
  title: string;
  category: string;
  approachA: {
    title: string;
    code: string;
    language: string;
    whenToUse: string[];
    pros: string[];
    cons: string[];
  };
  approachB: {
    title: string;
    code: string;
    language: string;
    whenToUse: string[];
    pros: string[];
    cons: string[];
  };
  verdict: string;
  keyTakeaway: string;
}

export const codeComparisons: CodeComparison[] = [
  {
    id: "fetch-data-nextjs",
    title: "Fetch data in Next.js",
    category: "Data Fetching",
    approachA: {
      title: "useEffect + useState (Client)",
      code: `"use client";
import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
      language: "tsx",
      whenToUse: [
        "Data depends on client-side state like auth tokens or user input",
        "You need real-time updates or polling",
        "The component is already a client component for interactivity",
      ],
      pros: [
        "Works with client-only APIs like localStorage or window",
        "Easy to add polling, refetching, or optimistic updates",
        "Familiar pattern for React developers",
      ],
      cons: [
        "Causes layout shift and shows loading spinners",
        "Requires extra state management for loading and errors",
        "Data is not available for SEO crawlers",
      ],
    },
    approachB: {
      title: "Server Component with async",
      code: `import { db } from "@/lib/db";

export default async function UserList() {
  const users = await db.user.findMany();

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`,
      language: "tsx",
      whenToUse: [
        "Data can be fetched at request time on the server",
        "SEO matters and content should be in the initial HTML",
        "You need direct access to databases or internal APIs",
      ],
      pros: [
        "No loading state needed; HTML arrives fully rendered",
        "Zero client-side JavaScript for the data fetching logic",
        "Direct access to server resources like databases and file systems",
      ],
      cons: [
        "Cannot use hooks, event handlers, or browser APIs",
        "Streaming is needed for slow queries to avoid blocking",
        "Harder to implement real-time or user-triggered refetches",
      ],
    },
    verdict:
      "Default to Server Components for initial data loads. Use client-side fetching only when data depends on user interaction, authentication tokens, or needs real-time updates.",
    keyTakeaway:
      "Server Components eliminate the loading spinner waterfall. Fetch on the server first, move to the client only when you must.",
  },
  {
    id: "handle-form-state",
    title: "Handle form state",
    category: "State Management",
    approachA: {
      title: "Controlled Inputs",
      code: `"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}`,
      language: "tsx",
      whenToUse: [
        "You need real-time validation as the user types",
        "Input values need to be transformed or formatted on the fly",
        "Other UI elements depend on the current form values",
      ],
      pros: [
        "Full control over input values at every keystroke",
        "Easy to implement conditional rendering based on form state",
        "Simple to reset, pre-fill, or programmatically update fields",
      ],
      cons: [
        "Re-renders the component on every keystroke",
        "More boilerplate with onChange handlers for each field",
        "Can cause performance issues in very large forms",
      ],
    },
    approachB: {
      title: "Uncontrolled with useRef",
      code: `"use client";
import { useRef } from "react";

export default function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
    };
    console.log("Submitting:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} name="name" defaultValue="" />
      <input ref={emailRef} name="email" defaultValue="" />
      <button type="submit">Send</button>
    </form>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The form is simple and only needs values on submit",
        "Performance is critical and re-renders must be minimized",
        "You are integrating with non-React form libraries",
      ],
      pros: [
        "No re-renders while the user is typing",
        "Less boilerplate for straightforward forms",
        "Better performance for large forms with many fields",
      ],
      cons: [
        "Cannot easily do real-time validation or formatting",
        "Harder to synchronize form values with other UI elements",
        "Refs are more awkward to work with than state values",
      ],
    },
    verdict:
      "Controlled inputs are the standard choice for most React forms because they give you full power over validation, formatting, and conditional logic. Use uncontrolled inputs when performance matters more than real-time feedback.",
    keyTakeaway:
      "Controlled inputs give you power; uncontrolled inputs give you speed. Pick based on whether your form needs real-time reactions.",
  },
  {
    id: "style-components",
    title: "Style components",
    category: "Styling",
    approachA: {
      title: "CSS Modules",
      code: `// Button.module.css
// .button { padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 600; }
// .primary { background: #2563eb; color: white; }
// .secondary { background: #e5e7eb; color: #1f2937; }

import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      {children}
    </button>
  );
}`,
      language: "tsx",
      whenToUse: [
        "You want strict style isolation with no class name collisions",
        "The team prefers writing traditional CSS or SCSS",
        "You need to share a design system with non-React projects",
      ],
      pros: [
        "Automatic scoping prevents style leaks between components",
        "Full CSS feature set including media queries and animations",
        "No extra runtime cost; styles are extracted at build time",
      ],
      cons: [
        "Switching between TSX and CSS files slows workflow",
        "Dynamic styles require verbose conditional class logic",
        "Harder to see styles in context while reading component code",
      ],
    },
    approachB: {
      title: "Tailwind CSS",
      code: `interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={\`px-4 py-2 rounded-md font-semibold transition-colors \${variants[variant]}\`}
    >
      {children}
    </button>
  );
}`,
      language: "tsx",
      whenToUse: [
        "You want to style components without leaving the TSX file",
        "Rapid prototyping and iteration speed is a priority",
        "The project uses a utility-first design approach",
      ],
      pros: [
        "Styles live right next to the markup for fast iteration",
        "Consistent spacing, colors, and sizing from the theme",
        "Purged CSS output is extremely small in production",
      ],
      cons: [
        "Long class strings can reduce readability in complex layouts",
        "Requires learning Tailwind's utility class vocabulary",
        "Custom designs sometimes need arbitrary values or config tweaks",
      ],
    },
    verdict:
      "Tailwind CSS is the dominant choice in Next.js projects for its speed and colocation. CSS Modules are solid when the team has strong CSS skills or needs to share styles outside React.",
    keyTakeaway:
      "Tailwind keeps styles visible where you use them. CSS Modules keep styles isolated where you write them. Both avoid global CSS chaos.",
  },
  {
    id: "manage-global-state",
    title: "Manage global state",
    category: "State Management",
    approachA: {
      title: "React Context",
      code: `"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeCtx {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};`,
      language: "tsx",
      whenToUse: [
        "The shared state is simple and changes infrequently",
        "You want zero external dependencies",
        "State is scoped to a subtree rather than the entire app",
      ],
      pros: [
        "Built into React with no extra packages needed",
        "Clear provider hierarchy shows where state lives",
        "Easy to understand and set up for small state",
      ],
      cons: [
        "All consumers re-render when any context value changes",
        "Nesting multiple providers creates wrapper hell",
        "No built-in selectors, middleware, or devtools",
      ],
    },
    approachB: {
      title: "Zustand",
      code: `import { create } from "zustand";

interface ThemeStore {
  theme: "light" | "dark";
  toggle: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggle: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

// In any component — no provider needed:
// const theme = useThemeStore((s) => s.theme);
// const toggle = useThemeStore((s) => s.toggle);`,
      language: "tsx",
      whenToUse: [
        "Multiple parts of the app consume and update shared state",
        "You need fine-grained re-render control with selectors",
        "State is complex or involves derived values and middleware",
      ],
      pros: [
        "No provider wrapper needed; works anywhere including outside React",
        "Selectors prevent unnecessary re-renders automatically",
        "Tiny bundle size with powerful middleware like persist and devtools",
      ],
      cons: [
        "Adds an external dependency to the project",
        "State lives outside React's tree, which can confuse beginners",
        "Overkill for simple shared values like theme or locale",
      ],
    },
    verdict:
      "Use React Context for simple, low-frequency state like theme or locale. Reach for Zustand when state is complex, updated often, or consumed by many components that should not all re-render together.",
    keyTakeaway:
      "Context is free but re-renders everyone. Zustand is cheap and re-renders only subscribers. Match the tool to how often your state changes.",
  },
  {
    id: "handle-api-calls",
    title: "Handle API calls",
    category: "Data Fetching",
    approachA: {
      title: "Route Handler",
      code: `// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  const users = await db.user.findMany({
    where: role ? { role } : undefined,
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`,
      language: "typescript",
      whenToUse: [
        "You are building a REST or webhook endpoint consumed by external clients",
        "The API needs to handle multiple HTTP methods like GET, POST, DELETE",
        "Third-party services need a URL to call back into your app",
      ],
      pros: [
        "Standard REST endpoints accessible from any client or service",
        "Full control over request and response including headers and status",
        "Can be called from client components, mobile apps, or external systems",
      ],
      cons: [
        "Requires manual serialization and error handling",
        "Client must manage loading, error, and cache states separately",
        "Extra network round trip compared to server actions",
      ],
    },
    approachB: {
      title: "Server Action",
      code: `// app/actions/users.ts
"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const parsed = CreateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await db.user.create({ data: parsed.data });
  revalidatePath("/users");
}`,
      language: "typescript",
      whenToUse: [
        "A form submission or button click triggers a server mutation",
        "You want automatic revalidation of cached data after writes",
        "Progressive enhancement is needed so forms work without JS",
      ],
      pros: [
        "No API route boilerplate; just call the function from the client",
        "Works with progressive enhancement even with JS disabled",
        "Integrates with revalidatePath and revalidateTag seamlessly",
      ],
      cons: [
        "Cannot be called from external services or non-Next.js clients",
        "Only supports POST requests under the hood",
        "Debugging can be harder since the boundary is implicit",
      ],
    },
    verdict:
      "Use Server Actions for form submissions and mutations inside your Next.js app. Use Route Handlers when you need a public API, webhook endpoint, or non-POST methods.",
    keyTakeaway:
      "Server Actions are for your app's own mutations. Route Handlers are for the outside world. Use the right door for the right visitor.",
  },
  {
    id: "render-long-lists",
    title: "Render long lists",
    category: "Performance",
    approachA: {
      title: "Simple .map()",
      code: `interface User {
  id: string;
  name: string;
  email: string;
}

export function UserList({ users }: { users: User[] }) {
  return (
    <ul className="divide-y">
      {users.map((user) => (
        <li key={user.id} className="py-3 px-4">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The list has fewer than a few hundred items",
        "Each list item is simple and lightweight to render",
        "You need all items in the DOM for accessibility or search",
      ],
      pros: [
        "Dead simple to implement and understand",
        "All items are in the DOM for Cmd+F browser search",
        "No extra dependency or setup needed",
      ],
      cons: [
        "Mounts all items at once, which blocks the main thread",
        "Memory usage grows linearly with list size",
        "Scrolling becomes janky past a few thousand items",
      ],
    },
    approachB: {
      title: "Virtualized List",
      code: `"use client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface User { id: string; name: string; email: string; }

export function UserList({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
  });

  return (
    <div ref={parentRef} className="h-[500px] overflow-auto">
      <ul style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((row) => (
          <li key={users[row.index].id}
            style={{ position: "absolute", top: row.start, height: row.size, width: "100%" }}>
            <p className="font-medium">{users[row.index].name}</p>
            <p className="text-sm text-gray-500">{users[row.index].email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The list has thousands of items or more",
        "Items have complex rendering like images or rich content",
        "Smooth scrolling performance is critical for the user experience",
      ],
      pros: [
        "Only renders visible items, so DOM size stays constant",
        "Handles tens of thousands of rows with smooth scrolling",
        "Memory usage remains low regardless of total list size",
      ],
      cons: [
        "Adds library dependency and more complex setup",
        "Browser Cmd+F search only finds rendered items",
        "Dynamic heights require measurement callbacks",
      ],
    },
    verdict:
      "Start with .map() for lists under a few hundred items. Switch to virtualization when users scroll through thousands of rows and you notice lag or high memory usage.",
    keyTakeaway:
      "Virtualization is a performance optimization, not a default. Measure first, then virtualize the lists that actually cause problems.",
  },
  {
    id: "handle-errors",
    title: "Handle errors",
    category: "Error Handling",
    approachA: {
      title: "try/catch",
      code: `"use server";
import { db } from "@/lib/db";

export async function getUser(id: string) {
  try {
    const user = await db.user.findUniqueOrThrow({
      where: { id },
    });
    return { data: user, error: null };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {
      data: null,
      error: error instanceof Error
        ? error.message
        : "An unexpected error occurred",
    };
  }
}

// Usage:
// const { data, error } = await getUser(params.id);
// if (error) return <ErrorMessage message={error} />;`,
      language: "typescript",
      whenToUse: [
        "You need to handle expected errors like network failures or missing data",
        "The error should be recovered from gracefully with a fallback",
        "You want to return structured error objects to the caller",
      ],
      pros: [
        "Granular control over each specific error scenario",
        "Can return typed error objects for the UI to display",
        "Works in both server and client code uniformly",
      ],
      cons: [
        "Easy to forget wrapping an async call and losing the error",
        "Repetitive boilerplate across many similar functions",
        "Does not catch errors in child component rendering",
      ],
    },
    approachB: {
      title: "Error Boundary",
      code: `// app/users/[id]/error.tsx
"use client";

export default function UserError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-lg bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-800">
        Something went wrong
      </h2>
      <p className="mt-2 text-red-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}`,
      language: "tsx",
      whenToUse: [
        "You want a catch-all safety net for unexpected rendering errors",
        "The error should show a fallback UI without crashing the whole page",
        "You are using Next.js file-based error handling conventions",
      ],
      pros: [
        "Catches any error in the component subtree automatically",
        "Prevents one broken section from crashing the entire app",
        "Built-in reset mechanism lets users retry without refreshing",
      ],
      cons: [
        "Cannot catch errors in event handlers or async code",
        "Only works in client components on the React rendering path",
        "Provides less granular control than per-function try/catch",
      ],
    },
    verdict:
      "Use both together. try/catch handles expected errors in data fetching and server actions. Error boundaries catch unexpected rendering failures as a safety net.",
    keyTakeaway:
      "try/catch is your scalpel for known errors. Error boundaries are your safety net for the unknown. Use both layers for robust error handling.",
  },
  {
    id: "navigate-programmatically",
    title: "Navigate programmatically",
    category: "Routing",
    approachA: {
      title: "Link Component",
      code: `import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={\`/projects/\${project.id}\`}
      className="block rounded-lg border p-4 hover:bg-gray-50 transition"
      prefetch={true}
    >
      <h3 className="font-semibold">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
    </Link>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The navigation target is known at render time",
        "You want automatic prefetching for instant page transitions",
        "Accessibility and SEO require a real anchor tag in the DOM",
      ],
      pros: [
        "Automatic prefetching makes navigations feel instant",
        "Renders a real <a> tag for accessibility and right-click menus",
        "Works in Server Components with no client JavaScript needed",
      ],
      cons: [
        "Cannot navigate conditionally based on async logic",
        "Limited to static hrefs determined at render time",
        "No built-in way to run code before or after navigation",
      ],
    },
    approachB: {
      title: "useRouter",
      code: `"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(\`/search?q=\${encodeURIComponent(query)}\`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
        className="rounded border px-3 py-2"
      />
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Search
      </button>
    </form>
  );
}`,
      language: "tsx",
      whenToUse: [
        "Navigation depends on user input or async logic like form validation",
        "You need to navigate after completing an action like a save or delete",
        "You want to programmatically go back, replace, or refresh the route",
      ],
      pros: [
        "Navigate based on dynamic conditions and runtime logic",
        "Supports push, replace, back, forward, and refresh methods",
        "Can run code before navigating like saving state or validating",
      ],
      cons: [
        "No prefetching so the first navigation may feel slower",
        "Requires a client component with the use client directive",
        "No real anchor tag means no right-click open in new tab",
      ],
    },
    verdict:
      "Use the Link component by default for all clickable navigation. Reach for useRouter only when navigation must happen after logic, like form submissions, conditional redirects, or post-action flows.",
    keyTakeaway:
      "Link is for where you can go. useRouter is for when you decide to go. Prefer Link for its prefetching and accessibility benefits.",
  },
  {
    id: "validate-data",
    title: "Validate data",
    category: "Data Validation",
    approachA: {
      title: "Zod Schema",
      code: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().min(13, "Must be at least 13 years old"),
  role: z.enum(["admin", "user", "editor"]),
  bio: z.string().max(500).optional(),
});

type User = z.infer<typeof UserSchema>;

export function validateUser(data: unknown): User {
  return UserSchema.parse(data);
}

// Safe version that returns errors instead of throwing:
export function safeValidateUser(data: unknown) {
  return UserSchema.safeParse(data);
}`,
      language: "typescript",
      whenToUse: [
        "You are validating API request bodies or form data at runtime",
        "You want to infer TypeScript types directly from the schema",
        "Complex validation rules involve nesting, unions, or transforms",
      ],
      pros: [
        "Single source of truth for both validation and TypeScript types",
        "Rich built-in validators for emails, URLs, UUIDs, and more",
        "Composable schemas with merge, extend, pick, and omit",
      ],
      cons: [
        "Adds a dependency, though it is small and tree-shakeable",
        "Learning curve for advanced features like transforms and refinements",
        "Slightly more verbose than simple manual checks for trivial cases",
      ],
    },
    approachB: {
      title: "Manual Validation",
      code: `interface UserInput {
  name: string;
  email: string;
  age: number;
  role: string;
}

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateUser(data: UserInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  if (!data.email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!Number.isInteger(data.age) || data.age < 13) {
    errors.age = "Must be at least 13 years old";
  }
  if (!["admin", "user", "editor"].includes(data.role)) {
    errors.role = "Invalid role";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}`,
      language: "typescript",
      whenToUse: [
        "The validation logic is trivial like checking one or two fields",
        "You cannot add external dependencies to the project",
        "Custom error formatting requires complete control over output",
      ],
      pros: [
        "No dependencies; works with plain TypeScript everywhere",
        "Full control over error messages and validation flow",
        "Easy to understand for developers unfamiliar with schema libraries",
      ],
      cons: [
        "No automatic TypeScript type inference from validation logic",
        "Repetitive boilerplate grows quickly with more fields",
        "Easy to miss edge cases that libraries handle for you",
      ],
    },
    verdict:
      "Use Zod for any non-trivial validation. It pays for itself immediately with type inference and composable schemas. Manual validation is fine for one-off checks with one or two fields.",
    keyTakeaway:
      "Zod turns your validation rules into TypeScript types for free. Stop writing types and validation separately when one schema can do both.",
  },
  {
    id: "authenticate-users",
    title: "Authenticate users",
    category: "Authentication",
    approachA: {
      title: "JWT Tokens",
      code: `import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;

export async function login(email: string, password: string) {
  const user = await verifyCredentials(email, password);
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600,
  });
  return user;
}

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}`,
      language: "typescript",
      whenToUse: [
        "Your API serves multiple clients like web, mobile, and third-party apps",
        "You need stateless authentication with no server-side session store",
        "The system is distributed and sessions cannot be shared across servers",
      ],
      pros: [
        "Stateless; no database lookup needed to verify each request",
        "Scales horizontally because no shared session storage is required",
        "Can embed claims like roles and permissions directly in the token",
      ],
      cons: [
        "Cannot revoke individual tokens before they expire without a blocklist",
        "Token payload is readable by anyone with base64 decoding",
        "Must handle refresh token rotation to maintain security",
      ],
    },
    approachB: {
      title: "Session Cookies",
      code: `import { cookies } from "next/headers";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function login(email: string, password: string) {
  const user = await verifyCredentials(email, password);
  const sessionId = crypto.randomBytes(32).toString("hex");

  await db.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  (await cookies()).set("session", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });
  return user;
}

export async function getCurrentUser() {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return null;
  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}`,
      language: "typescript",
      whenToUse: [
        "The app is server-rendered and authentication is checked on every request",
        "You need the ability to revoke sessions instantly on logout or compromise",
        "Sensitive data should never be exposed in the token payload",
      ],
      pros: [
        "Sessions can be revoked immediately by deleting from the database",
        "No sensitive data is exposed to the client at all",
        "Simple to implement session expiry, extension, and management",
      ],
      cons: [
        "Every request requires a database lookup to verify the session",
        "Requires a session store which adds infrastructure complexity",
        "Harder to use with mobile apps or third-party API consumers",
      ],
    },
    verdict:
      "Session cookies are safer and simpler for Next.js apps that are server-rendered. Use JWTs when you need stateless auth across distributed systems or multiple client types.",
    keyTakeaway:
      "Sessions give you a kill switch. JWTs give you independence from the database. For most web apps, the kill switch matters more.",
  },
  {
    id: "render-pages",
    title: "Render pages",
    category: "Rendering",
    approachA: {
      title: "Server-Side Rendering (SSR)",
      code: `// app/products/[id]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

// This page is rendered on every request
export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <article>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-xl text-green-600">\${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
    </article>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The page shows data that changes frequently like stock or prices",
        "Content is personalized per user such as dashboards or profiles",
        "SEO is critical and the data must be fresh on every request",
      ],
      pros: [
        "Always shows the latest data from the database",
        "Full SEO support with fresh content in every response",
        "Works naturally with authentication and personalization",
      ],
      cons: [
        "Slower Time to First Byte since each request hits the server",
        "Higher server load because nothing is cached by default",
        "Cannot be served from a CDN edge without additional caching",
      ],
    },
    approachB: {
      title: "Static Site Generation (SSG)",
      code: `// app/blog/[slug]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

// Generate all blog post pages at build time
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  if (!post) notFound();

  return (
    <article>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <time className="text-gray-500">{post.publishedAt.toLocaleDateString()}</time>
      <div className="prose mt-6">{post.content}</div>
    </article>
  );
}`,
      language: "tsx",
      whenToUse: [
        "The content rarely changes like blog posts, docs, or marketing pages",
        "Maximum performance is needed with instant page loads from a CDN",
        "The number of pages is known ahead of time and manageable at build",
      ],
      pros: [
        "Instant page loads served directly from CDN edge locations",
        "Zero server cost per request since pages are pre-built",
        "Best possible Core Web Vitals and lighthouse scores",
      ],
      cons: [
        "Content is stale until the next build or revalidation",
        "Build times grow with the number of pages",
        "Cannot show personalized or user-specific content",
      ],
    },
    verdict:
      "Use SSG for content that changes infrequently and SSR for data that must be fresh. Consider ISR (Incremental Static Regeneration) with revalidate as a middle ground: pages are statically generated but refreshed in the background at a set interval, giving you CDN speed with near-real-time data.",
    keyTakeaway:
      "SSG is for content that lives long, SSR is for data that changes fast, and ISR gives you the best of both by revalidating in the background.",
  },
  {
    id: "cache-data",
    title: "Cache data",
    category: "Performance",
    approachA: {
      title: "fetch Cache",
      code: `// Cached by default in Next.js — deduped across the request
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// Force fresh data on every request
async function getCart(userId: string) {
  const res = await fetch(\`https://api.example.com/cart/\${userId}\`, {
    cache: "no-store",
  });
  return res.json();
}

// Revalidate on demand with a tag
async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { tags: [\`post-\${slug}\`] },
  });
  return res.json();
}
// Then call: revalidateTag(\`post-\${slug}\`)`,
      language: "typescript",
      whenToUse: [
        "You are fetching from external APIs using the fetch function",
        "You want automatic request deduplication across components",
        "Time-based or tag-based revalidation fits your caching needs",
      ],
      pros: [
        "Built into Next.js with zero configuration needed",
        "Automatic request deduplication when the same URL is fetched twice",
        "Supports both time-based and on-demand revalidation strategies",
      ],
      cons: [
        "Only works with the fetch API, not with database clients or SDKs",
        "Caching behavior can be confusing with nested layouts and pages",
        "Cache invalidation requires understanding the revalidation model",
      ],
    },
    approachB: {
      title: "unstable_cache",
      code: `import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

// Cache any async function, not just fetch calls
const getUser = unstable_cache(
  async (userId: string) => {
    return db.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });
  },
  ["user-detail"],         // Cache key prefix
  {
    revalidate: 900,       // 15 minutes
    tags: ["users"],       // For on-demand revalidation
  }
);

// Cache an expensive computation
const getAnalytics = unstable_cache(
  async (dateRange: string) => {
    return db.$queryRaw\`
      SELECT date, COUNT(*) as views
      FROM page_views
      WHERE range = \${dateRange}
      GROUP BY date\`;
  },
  ["analytics"],
  { revalidate: 300, tags: ["analytics"] }
);`,
      language: "typescript",
      whenToUse: [
        "You need to cache database queries or ORM calls like Prisma",
        "The data source is not accessed through the fetch API",
        "You want tag-based revalidation for non-fetch data sources",
      ],
      pros: [
        "Caches any async function including database and SDK calls",
        "Supports the same revalidation model as fetch with tags and time",
        "Useful for expensive computations or aggregations",
      ],
      cons: [
        "The API is marked unstable and may change in future Next.js versions",
        "No automatic request deduplication like fetch provides",
        "Cache key management requires care to avoid stale data",
      ],
    },
    verdict:
      "Use fetch cache for external API calls where it works automatically. Use unstable_cache when you need to cache database queries, ORM results, or any non-fetch async operation.",
    keyTakeaway:
      "fetch cache is automatic for HTTP calls. unstable_cache extends the same power to everything else. Cache at the data layer, not the component layer.",
  },
  {
    id: "define-object-shapes",
    title: "Define object shapes",
    category: "TypeScript",
    approachA: {
      title: "interface",
      code: `interface User {
  id: string;
  name: string;
  email: string;
}

// Extends another interface
interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Declaration merging (adds fields to existing interface)
interface User {
  avatarUrl?: string;
}

// Use with React components
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size = "md", children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}`,
      language: "tsx",
      whenToUse: [
        "You are defining the shape of objects or component props",
        "You want to extend or merge declarations across files",
        "The codebase convention is to use interface for object types",
      ],
      pros: [
        "Clear intent that you are describing an object contract",
        "Supports extends for clean inheritance hierarchies",
        "Declaration merging allows augmenting third-party types",
      ],
      cons: [
        "Cannot represent unions, intersections, or primitive aliases",
        "Declaration merging can cause confusing implicit additions",
        "Only works for object-like shapes, not all type expressions",
      ],
    },
    approachB: {
      title: "type Alias",
      code: `type User = {
  id: string;
  name: string;
  email: string;
};

// Intersection instead of extends
type AdminUser = User & {
  role: "admin";
  permissions: string[];
};

// Union types (impossible with interface)
type ApiResponse<T> = { status: "success"; data: T } | { status: "error"; message: string };

// Utility types and mapped types
type UserUpdate = Partial<Pick<User, "name" | "email">>;

// Template literal types
type EventName = \`on\${"Click" | "Hover" | "Focus"}\`;

// Function type
type Fetcher<T> = (url: string) => Promise<T>;`,
      language: "typescript",
      whenToUse: [
        "You need unions, intersections, mapped types, or conditional types",
        "You are creating utility types or complex type expressions",
        "You want a single keyword for all type definitions for consistency",
      ],
      pros: [
        "Handles every type expression including unions and mapped types",
        "One consistent keyword for all type definitions",
        "More expressive for advanced TypeScript patterns",
      ],
      cons: [
        "Cannot use declaration merging to augment existing types",
        "Intersections with & have subtly different error messages than extends",
        "Some teams find type and interface inconsistency confusing",
      ],
    },
    verdict:
      "Use interface for component props and object shapes where extends makes sense. Use type for unions, intersections, utility types, and anything that is not a plain object shape. Being consistent in your codebase matters more than the choice itself.",
    keyTakeaway:
      "interface is for objects you might extend. type is for everything else. Pick a convention and stick with it across the project.",
  },
  {
    id: "share-component-logic",
    title: "Share component logic",
    category: "React Patterns",
    approachA: {
      title: "Higher-Order Component (HOC)",
      code: `import { ComponentType } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

interface WithAuthProps {
  user: { id: string; name: string; role: string };
}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>
  ) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    return <WrappedComponent {...(props as P)} user={user} />;
  };
}

// Usage:
// const ProtectedDashboard = withAuth(Dashboard);
// <ProtectedDashboard /> — user prop is injected automatically`,
      language: "tsx",
      whenToUse: [
        "You need to inject props into components without changing their API",
        "The pattern wraps server components for cross-cutting concerns",
        "Legacy codebases use HOCs and you need to maintain consistency",
      ],
      pros: [
        "Adds behavior to any component without modifying it",
        "Works well for cross-cutting concerns like auth or logging",
        "Can compose multiple HOCs together for layered behavior",
      ],
      cons: [
        "Creates wrapper hell and makes the component tree hard to debug",
        "TypeScript generics for HOCs are notoriously complex",
        "Props can collide or get lost in the wrapping layers",
      ],
    },
    approachB: {
      title: "Custom Hook",
      code: `"use client";
import { useState, useCallback } from "react";

interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
}

export function usePagination({ totalItems, itemsPerPage = 10 }: UsePaginationOptions) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const next = useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prev = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const offset = (page - 1) * itemsPerPage;

  return { page, totalPages, next, prev, offset, setPage };
}

// Usage in any component:
// const { page, next, prev, totalPages } = usePagination({ totalItems: 100 });`,
      language: "tsx",
      whenToUse: [
        "You want to share stateful logic between multiple client components",
        "The logic involves hooks like useState, useEffect, or useCallback",
        "You prefer explicit composition over implicit prop injection",
      ],
      pros: [
        "Explicit; you can see exactly what data and functions you get back",
        "Easy to type with TypeScript and test in isolation",
        "Composable; use multiple hooks in one component naturally",
      ],
      cons: [
        "Only works in client components that can use hooks",
        "Cannot add wrapper elements or modify the component tree",
        "Each consumer manages its own instance of the hook state",
      ],
    },
    verdict:
      "Custom Hooks are the modern standard for sharing logic in React. Use them by default. HOCs still have niche uses for wrapping server components or injecting props in legacy patterns.",
    keyTakeaway:
      "Hooks share logic explicitly. HOCs share logic implicitly. Explicit almost always wins for readability and maintainability.",
  },
  {
    id: "test-components",
    title: "Test components",
    category: "Testing",
    approachA: {
      title: "Unit Test",
      code: `import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PriceDisplay } from "@/components/PriceDisplay";
import { formatPrice } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats whole numbers without decimals", () => {
    expect(formatPrice(10)).toBe("$10.00");
  });

  it("handles zero correctly", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});

describe("PriceDisplay", () => {
  it("renders the formatted price", () => {
    render(<PriceDisplay amount={29.99} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("shows sale badge when discounted", () => {
    render(<PriceDisplay amount={19.99} originalAmount={29.99} />);
    expect(screen.getByText("Sale")).toBeInTheDocument();
  });
});`,
      language: "tsx",
      whenToUse: [
        "You are testing pure functions, utilities, or isolated components",
        "Fast feedback is needed during development with watch mode",
        "The logic under test has no dependencies on other systems",
      ],
      pros: [
        "Extremely fast execution measured in milliseconds",
        "Easy to write, debug, and maintain with clear inputs and outputs",
        "Pinpoints exactly which function or component broke",
      ],
      cons: [
        "Cannot catch bugs that only appear when components interact",
        "Mocking dependencies can create tests that pass but hide real bugs",
        "Does not verify that the full feature works end to end",
      ],
    },
    approachB: {
      title: "Integration Test",
      code: `import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/tests/mocks/server";
import CheckoutPage from "@/app/checkout/page";

describe("Checkout flow", () => {
  it("completes purchase when form is valid", async () => {
    server.use(
      http.post("/api/orders", () => {
        return HttpResponse.json({ orderId: "abc-123" });
      })
    );

    render(<CheckoutPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Card number"), "4242424242424242");
    await user.click(screen.getByRole("button", { name: "Pay now" }));

    await waitFor(() => {
      expect(screen.getByText("Order confirmed")).toBeInTheDocument();
      expect(screen.getByText("abc-123")).toBeInTheDocument();
    });
  });
});`,
      language: "tsx",
      whenToUse: [
        "You want to test a complete user flow across multiple components",
        "The feature involves form submissions, API calls, and state changes",
        "You need confidence that components work together correctly",
      ],
      pros: [
        "Tests the real user experience including interactions and API calls",
        "Catches integration bugs that unit tests miss entirely",
        "Higher confidence that the feature actually works for users",
      ],
      cons: [
        "Slower to run due to rendering full component trees",
        "Harder to debug failures since more code is involved",
        "Requires setup for mocking network requests and providers",
      ],
    },
    verdict:
      "Write unit tests for pure logic and utility functions. Write integration tests for user-facing features and flows. A healthy test suite has both, with integration tests covering critical paths and unit tests covering edge cases.",
    keyTakeaway:
      "Unit tests tell you what broke. Integration tests tell you what is broken for the user. You need both to sleep well at night.",
  },
];
