import type { Drill } from "./drills";

export const nextjsDrills: Drill[] = [
  // ─────────────────────────────────────────────
  // 1. Dynamic Route Handler (beginner)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-dynamic-route",
    title: "Dynamic Route Page",
    description:
      "Create a page component for a dynamic [slug] route that reads the slug parameter and renders it. This is foundational to Next.js App Router routing.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "beginner",
    estimatedMinutes: 4,
    tags: ["routing", "dynamic-routes", "params", "app-router"],
    challenge: {
      starterCode: `// app/blog/[slug]/page.tsx
// TODO: Define the Props type with a params object containing slug
// TODO: Export a default function component that receives the params
// TODO: Render the slug inside an <h1> tag

type Props = {
  // TODO: add params with slug
};

export default function BlogPost() {
  // TODO: destructure params from props
  // TODO: return JSX with the slug displayed
}
`,
      solution: `// app/blog/[slug]/page.tsx

type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  return (
    <article>
      <h1>{params.slug}</h1>
      <p>Blog post content for: {params.slug}</p>
    </article>
  );
}
`,
      tests: [
        {
          name: "Exports a default component",
          test: "code.includes('export default')",
          description: "Must export a default page component",
        },
        {
          name: "Accepts params prop with slug",
          test: "/params.*slug/.test(code)",
          description: "Component must accept params with a slug property",
        },
        {
          name: "Renders the slug value",
          test: "/params\\.slug/.test(code)",
          description: "Must reference params.slug to display the value",
        },
        {
          name: "Returns JSX markup",
          test: "code.includes('return') && (code.includes('<') || code.includes('React.createElement'))",
          description: "Component must return JSX",
        },
      ],
      hints: [
        "Dynamic route pages receive a `params` object as a prop containing the dynamic segment values.",
        "The type for params should be `{ params: { slug: string } }` matching the folder name `[slug]`.",
        "Destructure `{ params }` from the component props and access `params.slug`.",
        "Return JSX like `<h1>{params.slug}</h1>` to display the dynamic value.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 2. Server Component Data Fetch (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-server-fetch",
    title: "Server Component Data Fetch",
    description:
      "Build an async server component that fetches data directly inside the component body. Server Components in Next.js can use async/await at the top level.",
    trackId: "nextjs",
    category: "Data Fetching",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    tags: ["server-components", "fetch", "async", "data-fetching"],
    challenge: {
      starterCode: `// app/users/page.tsx
// TODO: Make this an async function component
// TODO: Fetch users from https://jsonplaceholder.typicode.com/users
// TODO: Type the response and render a list of user names

type User = {
  id: number;
  name: string;
  email: string;
};

// TODO: make this function async
export default function UsersPage() {
  // TODO: fetch users using await
  // TODO: parse the JSON response
  // TODO: map over users and render them in a <ul>
}
`,
      solution: `// app/users/page.tsx

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <section>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}
`,
      tests: [
        {
          name: "Component is async",
          test: "/async\\s+function/.test(code) || /export\\s+default\\s+async/.test(code)",
          description: "The component function must be declared as async",
        },
        {
          name: "Uses fetch to get data",
          test: "code.includes('fetch(') || code.includes('fetch (')",
          description: "Must use fetch to retrieve data",
        },
        {
          name: "Awaits the response",
          test: "code.includes('await')",
          description: "Must use await to handle the async fetch call",
        },
        {
          name: "Exports default component",
          test: "code.includes('export default')",
          description: "Must export a default page component",
        },
      ],
      hints: [
        "In Next.js App Router, page components can be `async` functions -- just add `async` before `function`.",
        "Use `const res = await fetch('url')` directly in the component body -- no useEffect needed.",
        "Parse the response with `const data = await res.json()` and type it as `User[]`.",
        "Map over the array in JSX: `{users.map(user => <li key={user.id}>{user.name}</li>)}`.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 3. loading.tsx (beginner)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-loading",
    title: "Loading Skeleton",
    description:
      "Create a loading.tsx file that displays a skeleton UI while the page content is being fetched. Next.js automatically wraps your page in a Suspense boundary using this file.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "beginner",
    estimatedMinutes: 3,
    tags: ["loading", "suspense", "skeleton", "ux"],
    challenge: {
      starterCode: `// app/dashboard/loading.tsx
// TODO: Export a default Loading component
// TODO: Show a skeleton UI with pulsing/animated placeholder elements
// TODO: Include an aria-label or role for accessibility

export default function Loading() {
  // TODO: return a loading skeleton layout
  // Consider: a container div with animated placeholder bars
  // for a heading, paragraph lines, and a card grid
}
`,
      solution: `// app/dashboard/loading.tsx

export default function Loading() {
  return (
    <div role="status" aria-label="Loading content">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
`,
      tests: [
        {
          name: "Exports a default component",
          test: "code.includes('export default')",
          description: "Must export a default Loading component",
        },
        {
          name: "Contains loading/skeleton indicator",
          test: "code.includes('Loading') || code.includes('loading') || code.includes('skeleton') || code.includes('animate') || code.includes('pulse') || code.includes('spinner')",
          description: "Should contain visual loading indicators",
        },
        {
          name: "Returns JSX markup",
          test: "code.includes('return') && code.includes('<')",
          description: "Must return JSX elements for the skeleton",
        },
        {
          name: "Includes accessibility attributes",
          test: "code.includes('aria-') || code.includes('role=')",
          description: "Should include ARIA attributes for accessibility",
        },
      ],
      hints: [
        "The file must be named `loading.tsx` and placed in the route segment folder -- Next.js picks it up automatically.",
        "Export a default function component called `Loading` that returns skeleton JSX.",
        "Use CSS classes like `animate-pulse` with gray placeholder `<div>` elements to mimic content shapes.",
        "Add `role=\"status\"` and `aria-label=\"Loading content\"` for screen reader accessibility.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 4. error.tsx (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-error",
    title: "Error Boundary Component",
    description:
      "Create an error.tsx component that catches runtime errors and provides a recovery mechanism. Error boundaries in Next.js must be Client Components.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    tags: ["error-handling", "error-boundary", "client-component", "recovery"],
    challenge: {
      starterCode: `// app/dashboard/error.tsx
// TODO: Add the "use client" directive (required for error boundaries)
// TODO: Define the component props: error (Error) and reset (() => void)
// TODO: Export a default component that shows the error and a retry button

// TODO: "use client" directive goes here

export default function Error({
  // TODO: destructure error and reset
}: {
  // TODO: type the props
}) {
  // TODO: optionally log the error with useEffect
  // TODO: return UI showing the error message
  // TODO: include a button that calls reset() to retry
}
`,
      solution: `// app/dashboard/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
`,
      tests: [
        {
          name: "Has 'use client' directive",
          test: 'code.includes(\'"use client"\') || code.includes("\'use client\'")',
          description: "Error boundaries must be Client Components with 'use client'",
        },
        {
          name: "Accepts error and reset props",
          test: "code.includes('error') && code.includes('reset')",
          description: "Must destructure error and reset from props",
        },
        {
          name: "Includes a retry/reset button",
          test: "code.includes('reset') && (code.includes('button') || code.includes('Button'))",
          description: "Should have a button that calls the reset function",
        },
        {
          name: "Exports a default component",
          test: "code.includes('export default')",
          description: "Must export a default error component",
        },
      ],
      hints: [
        "Error boundaries in Next.js App Router MUST start with `\"use client\"` at the top of the file.",
        "The component receives two props: `error` (an Error object) and `reset` (a function to retry rendering).",
        "Type the error as `Error & { digest?: string }` -- the digest is a server-side error hash.",
        "Render a button with `onClick={() => reset()}` so users can attempt recovery.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 5. not-found.tsx (beginner)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-not-found",
    title: "Not Found Page",
    description:
      "Create a not-found.tsx page that renders when notFound() is called or a route segment is not matched. This replaces the default 404 page.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "beginner",
    estimatedMinutes: 3,
    tags: ["not-found", "404", "routing", "ux"],
    challenge: {
      starterCode: `// app/not-found.tsx
// TODO: Import Link from next/link
// TODO: Export a default NotFound component
// TODO: Show a 404 message and a link back to the home page

export default function NotFound() {
  // TODO: return JSX with a 404 heading
  // TODO: include a descriptive message
  // TODO: add a Link component pointing to "/"
}
`,
      solution: `// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
`,
      tests: [
        {
          name: "Exports a default component",
          test: "code.includes('export default')",
          description: "Must export a default NotFound component",
        },
        {
          name: "Contains a 404 indicator",
          test: "code.includes('404') || code.includes('Not Found') || code.includes('not found')",
          description: "Should clearly indicate a 404/not-found status",
        },
        {
          name: "Includes a navigation link",
          test: "code.includes('Link') || code.includes('href')",
          description: "Should include a link for the user to navigate away",
        },
        {
          name: "Imports Link from next/link",
          test: "code.includes(\"next/link\") || code.includes('next/link')",
          description: "Should import the Link component from next/link",
        },
      ],
      hints: [
        "Import the `Link` component from `next/link` for client-side navigation.",
        "Export a default function called `NotFound` -- Next.js matches this file name convention.",
        "Include a clear heading like `<h2>404 - Not Found</h2>` so users understand the situation.",
        "Add `<Link href=\"/\">Return Home</Link>` to give users an escape route.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 6. Middleware (advanced)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-middleware",
    title: "Auth Check Middleware",
    description:
      "Write a Next.js middleware that checks for an authentication token in cookies and redirects unauthenticated users to the login page. Middleware runs before every matched request.",
    trackId: "nextjs",
    category: "Middleware",
    difficulty: "advanced",
    estimatedMinutes: 10,
    tags: ["middleware", "authentication", "cookies", "redirect"],
    challenge: {
      starterCode: `// middleware.ts (root of project)
// TODO: Import NextResponse and NextRequest from "next/server"
// TODO: Export a middleware function that checks for an auth token
// TODO: Redirect to /login if no token is found
// TODO: Export a config with a matcher for protected routes

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Read the "auth-token" cookie from the request
  // TODO: If no token exists, redirect to /login
  // TODO: If token exists, allow the request to continue
}

// TODO: Export a config object with a matcher array
// that targets /dashboard and its sub-routes
`,
      solution: `// middleware.ts (root of project)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
`,
      tests: [
        {
          name: "Exports a middleware function",
          test: "code.includes('export function middleware') || code.includes('export async function middleware')",
          description: "Must export a named function called middleware",
        },
        {
          name: "Checks cookies for auth token",
          test: "code.includes('cookies') && (code.includes('get(') || code.includes('get ('))",
          description: "Must read a cookie value from the request",
        },
        {
          name: "Redirects unauthenticated users",
          test: "code.includes('NextResponse.redirect') || code.includes('redirect(')",
          description: "Must redirect to login when no token is found",
        },
        {
          name: "Exports a matcher config",
          test: "code.includes('config') && code.includes('matcher')",
          description: "Must export a config with a matcher array",
        },
      ],
      hints: [
        "Import `NextResponse` and `NextRequest` from `\"next/server\"`.",
        "Access cookies with `request.cookies.get('auth-token')` -- it returns the cookie or undefined.",
        "Redirect with `NextResponse.redirect(new URL('/login', request.url))`. You can add query params for the callback URL.",
        "Export `const config = { matcher: ['/dashboard/:path*'] }` to limit which routes the middleware applies to.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 7. generateMetadata (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-generate-metadata",
    title: "Dynamic Metadata Generation",
    description:
      "Implement a generateMetadata function that produces dynamic page titles and descriptions based on route parameters. This is essential for SEO in Next.js.",
    trackId: "nextjs",
    category: "Optimization",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    tags: ["metadata", "seo", "dynamic", "generateMetadata"],
    challenge: {
      starterCode: `// app/products/[id]/page.tsx
// TODO: Import Metadata type from "next"
// TODO: Create an async generateMetadata function
// TODO: Fetch product data and return title + description
// TODO: Create the page component

import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

// TODO: export an async generateMetadata function
// It should accept { params } of type Props
// Fetch the product and return { title, description }

// TODO: export default page component
export default async function ProductPage({ params }: Props) {
  // TODO: fetch product data
  // TODO: render product details
}
`,
      solution: `// app/products/[id]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

async function getProduct(id: string) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>{product.price}</span>
    </article>
  );
}
`,
      tests: [
        {
          name: "Exports generateMetadata function",
          test: "code.includes('export') && code.includes('generateMetadata')",
          description: "Must export a generateMetadata function",
        },
        {
          name: "generateMetadata is async",
          test: "/async\\s+function\\s+generateMetadata/.test(code) || /export\\s+async\\s+function\\s+generateMetadata/.test(code)",
          description: "generateMetadata should be an async function",
        },
        {
          name: "Returns title in metadata",
          test: "code.includes('title')",
          description: "The returned metadata must include a title property",
        },
        {
          name: "Imports Metadata type",
          test: "code.includes('Metadata') && code.includes('next')",
          description: "Should import the Metadata type from 'next'",
        },
      ],
      hints: [
        "Import the `Metadata` type from `\"next\"` to properly type the return value.",
        "The function signature is `export async function generateMetadata({ params }: Props): Promise<Metadata>`.",
        "Fetch data inside generateMetadata the same way you would in a server component -- using `await fetch()`.",
        "Return an object with at least `title` and `description`. You can also add `openGraph` for social sharing metadata.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 8. API Route GET Handler (beginner)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-api-get",
    title: "API Route GET Handler",
    description:
      "Create a Route Handler that responds to GET requests and returns JSON data. Route Handlers in Next.js App Router use the Web Request/Response APIs.",
    trackId: "nextjs",
    category: "API Routes",
    difficulty: "beginner",
    estimatedMinutes: 4,
    tags: ["api", "route-handler", "GET", "json"],
    challenge: {
      starterCode: `// app/api/users/route.ts
// TODO: Import NextResponse from "next/server"
// TODO: Export an async GET function
// TODO: Return a JSON response with an array of users

// TODO: import NextResponse

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

// TODO: export async function GET
// Return the users array as JSON using NextResponse.json()
`,
      solution: `// app/api/users/route.ts
import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

export async function GET() {
  return NextResponse.json(users);
}
`,
      tests: [
        {
          name: "Exports a GET function",
          test: "code.includes('export') && code.includes('GET')",
          description: "Must export a function named GET",
        },
        {
          name: "GET is async",
          test: "/export\\s+async\\s+function\\s+GET/.test(code)",
          description: "The GET function should be async",
        },
        {
          name: "Returns JSON response",
          test: "code.includes('NextResponse.json') || code.includes('Response.json')",
          description: "Must return a JSON response using NextResponse.json or Response.json",
        },
        {
          name: "Imports NextResponse",
          test: "code.includes('NextResponse') && code.includes('next/server')",
          description: "Should import NextResponse from next/server",
        },
      ],
      hints: [
        "Import `NextResponse` from `\"next/server\"` at the top of the file.",
        "Export the handler as a named function matching the HTTP method: `export async function GET()`.",
        "Return data as JSON with `return NextResponse.json(data)` -- it sets headers automatically.",
        "The function name must be uppercase `GET` -- Next.js maps it to HTTP GET requests.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 9. API Route POST Handler (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-api-post",
    title: "API Route POST Handler",
    description:
      "Build a Route Handler for POST requests that reads the request body, validates input, and returns an appropriate response with status codes.",
    trackId: "nextjs",
    category: "API Routes",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    tags: ["api", "route-handler", "POST", "validation", "json"],
    challenge: {
      starterCode: `// app/api/users/route.ts
// TODO: Import NextResponse and NextRequest from "next/server"
// TODO: Export an async POST function that:
//   1. Reads the JSON body from the request
//   2. Validates that name and email are present
//   3. Returns 400 if validation fails
//   4. Returns 201 with the created user on success

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: parse the request body using request.json()
  // TODO: validate that name and email exist
  // TODO: return 400 error response if validation fails
  // TODO: create a new user object with an id
  // TODO: return 201 response with the new user
}
`,
      solution: `// app/api/users/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  };

  return NextResponse.json(newUser, { status: 201 });
}
`,
      tests: [
        {
          name: "Exports a POST function",
          test: "code.includes('export') && /function\\s+POST/.test(code)",
          description: "Must export a function named POST",
        },
        {
          name: "Reads request body",
          test: "code.includes('request.json()') || code.includes('req.json()')",
          description: "Must parse the request JSON body",
        },
        {
          name: "Validates input",
          test: "code.includes('!body') || code.includes('!name') || code.includes('!email') || /if\\s*\\(/.test(code)",
          description: "Must include input validation logic",
        },
        {
          name: "Returns proper status codes",
          test: "code.includes('400') || code.includes('status')",
          description: "Should return appropriate HTTP status codes",
        },
      ],
      hints: [
        "Parse the body with `const body = await request.json()` -- the request object uses the Web API.",
        "Validate required fields: `if (!body.name || !body.email)` and return early with an error.",
        "Return error responses with a status: `NextResponse.json({ error: 'message' }, { status: 400 })`.",
        "On success, return the created resource with 201: `NextResponse.json(newUser, { status: 201 })`.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 10. Server Action (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-server-action",
    title: "Server Action Form Handler",
    description:
      "Create a Server Action that processes form submissions. Server Actions are async functions that run on the server and can be invoked from Client or Server Components.",
    trackId: "nextjs",
    category: "Server Actions",
    difficulty: "intermediate",
    estimatedMinutes: 8,
    tags: ["server-actions", "forms", "use-server", "mutation"],
    challenge: {
      starterCode: `// app/contact/page.tsx
// TODO: Create an async server action function with "use server" directive
// TODO: The action should extract form data (name, email, message)
// TODO: Use the action in a <form> element
// TODO: Include basic validation

export default function ContactPage() {
  // TODO: define the server action inside or outside the component
  // Remember: server actions need "use server" at the top of the function body

  async function submitForm(formData: FormData) {
    // TODO: add "use server" directive
    // TODO: extract name, email, message from formData
    // TODO: validate the data
    // TODO: process the submission (e.g., save to DB)
  }

  return (
    <div>
      <h1>Contact Us</h1>
      {/* TODO: create a form with action={submitForm} */}
      {/* TODO: add input fields for name, email, and a textarea for message */}
      {/* TODO: add a submit button */}
    </div>
  );
}
`,
      solution: `// app/contact/page.tsx
import { redirect } from "next/navigation";

export default function ContactPage() {
  async function submitForm(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      throw new Error("All fields are required");
    }

    // Process the submission (e.g., save to database)
    console.log("Contact form submitted:", { name, email, message });

    redirect("/contact/success");
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <form action={submitForm}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
`,
      tests: [
        {
          name: "Contains 'use server' directive",
          test: 'code.includes(\'"use server"\') || code.includes("\'use server\'")',
          description: "Server actions must include the 'use server' directive",
        },
        {
          name: "Uses FormData parameter",
          test: "code.includes('FormData') || code.includes('formData')",
          description: "Server action must accept FormData as a parameter",
        },
        {
          name: "Extracts form fields",
          test: "code.includes('.get(') || code.includes('.get (')",
          description: "Must extract values from FormData using .get()",
        },
        {
          name: "Connects action to form",
          test: "code.includes('action={') || code.includes('action =')",
          description: "Must bind the server action to a form's action prop",
        },
      ],
      hints: [
        "Server Actions are async functions with `\"use server\"` as the first line of the function body.",
        "The function receives a `FormData` object. Extract values with `formData.get('fieldName') as string`.",
        "Bind the action to a form with `<form action={submitForm}>` -- no onSubmit or preventDefault needed.",
        "After processing, you can use `redirect('/success')` from `next/navigation` to navigate the user.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 11. revalidatePath (advanced)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-revalidate-path",
    title: "Revalidate After Mutation",
    description:
      "Use revalidatePath or revalidateTag inside a Server Action to refresh cached data after a mutation. This is critical for keeping the UI in sync with the database.",
    trackId: "nextjs",
    category: "Server Actions",
    difficulty: "advanced",
    estimatedMinutes: 9,
    tags: ["revalidation", "cache", "server-actions", "mutation"],
    challenge: {
      starterCode: `// app/posts/actions.ts
// TODO: Add "use server" at the top of the file
// TODO: Import revalidatePath from "next/cache"
// TODO: Create a server action to add a new post
// TODO: After saving, revalidate the posts page
// TODO: Create a server action to delete a post
// TODO: After deleting, revalidate both the posts list and the specific post page

// TODO: "use server" directive here

// TODO: import revalidatePath

export async function createPost(formData: FormData) {
  // TODO: extract title and content from formData
  // TODO: save to database (simulated)
  // TODO: revalidate the /posts path
}

export async function deletePost(postId: string) {
  // TODO: delete from database (simulated)
  // TODO: revalidate both /posts and /posts/[postId]
}
`,
      solution: `// app/posts/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  // Simulate saving to database
  await saveToDatabase({ title, content });

  revalidatePath("/posts");
}

export async function deletePost(postId: string) {
  // Simulate deleting from database
  await deleteFromDatabase(postId);

  revalidatePath("/posts");
  revalidatePath(\`/posts/\${postId}\`);
}

// Simulated database functions
async function saveToDatabase(data: { title: string; content: string }) {
  console.log("Saved:", data);
}

async function deleteFromDatabase(id: string) {
  console.log("Deleted:", id);
}
`,
      tests: [
        {
          name: "Has 'use server' directive",
          test: 'code.includes(\'"use server"\') || code.includes("\'use server\'")',
          description: "File must start with 'use server' directive",
        },
        {
          name: "Imports revalidatePath",
          test: "code.includes('revalidatePath') && code.includes('next/cache')",
          description: "Must import revalidatePath from next/cache",
        },
        {
          name: "Calls revalidatePath after mutation",
          test: "/revalidatePath\\s*\\(/.test(code)",
          description: "Must call revalidatePath to refresh cached data",
        },
        {
          name: "Exports async server action functions",
          test: "code.includes('export async function')",
          description: "Must export async functions as server actions",
        },
      ],
      hints: [
        "Place `\"use server\"` at the very top of the file to mark all exports as server actions.",
        "Import `revalidatePath` from `\"next/cache\"` -- this is NOT from `next/navigation`.",
        "Call `revalidatePath('/posts')` after mutations to purge the cached version of that page.",
        "You can revalidate multiple paths: `revalidatePath('/posts')` for the list AND `revalidatePath('/posts/${id}')` for the detail page.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 12. generateStaticParams (intermediate)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-static-params",
    title: "Generate Static Params",
    description:
      "Implement generateStaticParams to pre-render dynamic routes at build time. This function tells Next.js which parameter combinations to statically generate.",
    trackId: "nextjs",
    category: "Optimization",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    tags: ["static-generation", "ssg", "dynamic-routes", "build-time"],
    challenge: {
      starterCode: `// app/blog/[slug]/page.tsx
// TODO: Export an async generateStaticParams function
// TODO: It should return an array of { slug } objects
// TODO: Fetch the list of blog posts to determine which slugs to pre-render
// TODO: Create the page component that uses the slug param

// TODO: export async function generateStaticParams
// Fetch blog posts and return array of { slug: string }

type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  // TODO: use params.slug to fetch and render the blog post
}
`,
      solution: `// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export default async function BlogPost({ params }: Props) {
  const res = await fetch(\`https://api.example.com/posts/\${params.slug}\`);
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
`,
      tests: [
        {
          name: "Exports generateStaticParams",
          test: "code.includes('export') && code.includes('generateStaticParams')",
          description: "Must export a generateStaticParams function",
        },
        {
          name: "Function is async",
          test: "/async\\s+function\\s+generateStaticParams/.test(code)",
          description: "generateStaticParams should be an async function",
        },
        {
          name: "Returns array with slug objects",
          test: "code.includes('slug') && (code.includes('map') || code.includes('return ['))",
          description: "Must return an array of objects with the slug parameter",
        },
        {
          name: "Has default page component",
          test: "code.includes('export default')",
          description: "Must also export a default page component",
        },
      ],
      hints: [
        "Export `generateStaticParams` as a standalone async function -- it runs at build time.",
        "Fetch your data source to get all possible slug values that should be pre-rendered.",
        "Return an array of objects matching the dynamic segment: `[{ slug: 'post-1' }, { slug: 'post-2' }]`.",
        "The page component can then use `params.slug` knowing that the value was pre-validated by generateStaticParams.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 13. Route Group Layout (advanced)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-route-group",
    title: "Route Group Layout",
    description:
      "Organize routes using route groups (parenthesized folders) to apply different layouts without affecting the URL structure. Route groups let you split your app into sections with distinct layouts.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "advanced",
    estimatedMinutes: 8,
    tags: ["route-groups", "layouts", "organization", "app-router"],
    challenge: {
      starterCode: `// app/(marketing)/layout.tsx
// TODO: Create a layout for marketing pages (landing, about, pricing)
// TODO: Include a marketing-specific header and footer
// TODO: The (marketing) folder name won't appear in the URL

// TODO: Define a props type with children

export default function MarketingLayout({
  // TODO: destructure children
}: {
  // TODO: type children as React.ReactNode
}) {
  // TODO: return a layout with:
  //   - A marketing-style header with nav links
  //   - A main section that renders {children}
  //   - A marketing-style footer
}

// ---- Separate file ----
// app/(dashboard)/layout.tsx
// TODO: Create a different layout for dashboard pages
// TODO: Include a sidebar navigation and a top bar
`,
      solution: `// app/(marketing)/layout.tsx

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-layout">
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
          <a href="/login">Log In</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 My Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ---- Separate file ----
// app/(dashboard)/layout.tsx

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="dashboard-layout">
//       <aside>
//         <nav>
//           <a href="/dashboard">Overview</a>
//           <a href="/dashboard/analytics">Analytics</a>
//           <a href="/dashboard/settings">Settings</a>
//         </nav>
//       </aside>
//       <div>
//         <header>
//           <h1>Dashboard</h1>
//         </header>
//         <main>{children}</main>
//       </div>
//     </div>
//   );
// }
`,
      tests: [
        {
          name: "Exports a default layout component",
          test: "code.includes('export default')",
          description: "Must export a default layout component",
        },
        {
          name: "Accepts children prop",
          test: "code.includes('children') && code.includes('React.ReactNode')",
          description: "Layout must accept children typed as React.ReactNode",
        },
        {
          name: "Renders children in layout",
          test: "code.includes('{children}') || code.includes('{ children }')",
          description: "Must render the children prop inside the layout structure",
        },
        {
          name: "Has distinct layout sections",
          test: "(code.includes('header') || code.includes('Header')) && (code.includes('main') || code.includes('footer') || code.includes('aside'))",
          description: "Layout should have structural elements like header, main, footer, or aside",
        },
      ],
      hints: [
        "Route groups use parenthesized folder names like `(marketing)` -- the parens are stripped from the URL.",
        "Each route group can have its own `layout.tsx` that only applies to pages within that group.",
        "The layout component must accept and render `children: React.ReactNode` to wrap nested pages.",
        "Include structural HTML elements (header, nav, main, aside, footer) that define the distinct layout for that section.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 14. Parallel Routes (advanced)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-parallel-routes",
    title: "Parallel Routes with Slots",
    description:
      "Set up parallel routes using named slots to render multiple pages simultaneously in the same layout. Parallel routes enable dashboards and complex layouts with independent loading and error states.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "advanced",
    estimatedMinutes: 10,
    tags: ["parallel-routes", "slots", "dashboard", "advanced-routing"],
    challenge: {
      starterCode: `// app/dashboard/layout.tsx
// TODO: Create a layout that renders parallel route slots
// Slots are defined by @folder convention: @analytics, @notifications
// TODO: The layout receives each slot as a prop alongside children

// TODO: Define props type including slot props

export default function DashboardLayout({
  // TODO: destructure children and slot props
}: {
  // TODO: type children and each slot as React.ReactNode
}) {
  // TODO: return a layout that renders children and both slots
  // Consider a grid layout with slots in different positions
}

// ---- Separate file ----
// app/dashboard/@analytics/page.tsx
// TODO: Create an analytics slot component

// ---- Separate file ----
// app/dashboard/@analytics/default.tsx
// TODO: Create a default fallback for the analytics slot
`,
      solution: `// app/dashboard/layout.tsx

export default function DashboardLayout({
  children,
  analytics,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">{children}</div>
      <div className="dashboard-sidebar">
        <section className="analytics-slot">{analytics}</section>
        <section className="notifications-slot">{notifications}</section>
      </div>
    </div>
  );
}

// ---- Separate file ----
// app/dashboard/@analytics/page.tsx

// export default function AnalyticsSlot() {
//   return (
//     <div>
//       <h2>Analytics</h2>
//       <p>Page views: 1,234</p>
//       <p>Unique visitors: 567</p>
//     </div>
//   );
// }

// ---- Separate file ----
// app/dashboard/@analytics/default.tsx

// export default function AnalyticsDefault() {
//   return <div>Loading analytics...</div>;
// }
`,
      tests: [
        {
          name: "Exports a default layout component",
          test: "code.includes('export default')",
          description: "Must export a default layout component",
        },
        {
          name: "Accepts multiple slot props",
          test: "code.includes('children') && (code.includes('analytics') || code.includes('notifications') || code.includes('modal'))",
          description: "Layout must accept named slot props alongside children",
        },
        {
          name: "Types slots as React.ReactNode",
          test: "/React\\.ReactNode/.test(code)",
          description: "Slot props should be typed as React.ReactNode",
        },
        {
          name: "Renders slot content in layout",
          test: "/{analytics}|{notifications}|{modal}/.test(code)",
          description: "Must render the slot props in the layout JSX",
        },
      ],
      hints: [
        "Parallel route slots are created with `@folderName` convention, e.g., `app/dashboard/@analytics/page.tsx`.",
        "The parent layout automatically receives each slot as a named prop alongside `children`.",
        "Type each slot prop as `React.ReactNode` in the layout's props type definition.",
        "Always create a `default.tsx` file in each slot folder as a fallback for unmatched routes during navigation.",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 15. Client Component with Hooks (beginner)
  // ─────────────────────────────────────────────
  {
    id: "nextjs-drill-client-component",
    title: "Interactive Client Component",
    description:
      "Build a Client Component that uses React hooks for interactivity. Client Components must be marked with 'use client' and can use browser APIs, event handlers, and hooks.",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "beginner",
    estimatedMinutes: 5,
    tags: ["client-component", "use-client", "useState", "interactivity"],
    challenge: {
      starterCode: `// components/Counter.tsx
// TODO: Add "use client" directive at the top
// TODO: Import useState from React
// TODO: Create an interactive counter component
// TODO: Include increment, decrement, and reset buttons

// TODO: "use client" directive

// TODO: import useState

export default function Counter() {
  // TODO: create a count state variable initialized to 0
  // TODO: return UI with the count and three buttons:
  //   - Decrement (-1)
  //   - Reset (back to 0)
  //   - Increment (+1)
}
`,
      solution: `// components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}
`,
      tests: [
        {
          name: "Has 'use client' directive",
          test: 'code.includes(\'"use client"\') || code.includes("\'use client\'")',
          description: "Client Components must start with 'use client'",
        },
        {
          name: "Imports useState",
          test: "code.includes('useState')",
          description: "Must import and use the useState hook",
        },
        {
          name: "Has event handlers",
          test: "code.includes('onClick') || code.includes('onChange') || code.includes('onSubmit')",
          description: "Must include interactive event handlers",
        },
        {
          name: "Exports a default component",
          test: "code.includes('export default')",
          description: "Must export a default component",
        },
      ],
      hints: [
        "Add `\"use client\"` as the very first line of the file -- this opts the component into client-side rendering.",
        "Import `useState` from `\"react\"` to manage the counter state.",
        "Initialize state with `const [count, setCount] = useState(0)`.",
        "Use `onClick` event handlers on buttons: `<button onClick={() => setCount(count + 1)}>+1</button>`.",
      ],
    },
  },
];
