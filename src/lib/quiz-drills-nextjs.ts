import type { QuizDrill } from "./quiz-drills";

export const nextjsQuizDrills: QuizDrill[] = [
  // ─── App Router (fill-in-blank, beginner) ───────────────────────────
  {
    id: "quiz-next-app-router-01",
    trackId: "nextjs",
    category: "App Router",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In the Next.js App Router, the file that defines a route's UI and is rendered by default as a React Server Component is called ____.",
    options: [
      { label: "A", text: "page.tsx" },
      { label: "B", text: "route.tsx" },
      { label: "C", text: "index.tsx" },
      { label: "D", text: "layout.tsx" },
    ],
    correctAnswer: "A",
    explanation:
      "In the App Router, `page.tsx` is the special file that makes a route publicly accessible and defines the UI for that route segment.",
    hint: "This file replaced `index.tsx` from the Pages Router.",
    tags: ["app-router", "file-conventions", "routing"],
  },
  {
    id: "quiz-next-app-router-02",
    trackId: "nextjs",
    category: "App Router",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a shared layout that wraps all child routes in the App Router, you create a file named ____.",
    options: [
      { label: "A", text: "_app.tsx" },
      { label: "B", text: "template.tsx" },
      { label: "C", text: "layout.tsx" },
      { label: "D", text: "wrapper.tsx" },
    ],
    correctAnswer: "C",
    explanation:
      "`layout.tsx` defines shared UI for a route segment and its children. Unlike templates, layouts preserve state across navigations.",
    hint: "This file persists across navigations and does not remount.",
    tags: ["app-router", "layout", "file-conventions"],
  },
  {
    id: "quiz-next-app-router-03",
    trackId: "nextjs",
    category: "App Router",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      'To create a route group in the App Router that does not affect the URL path, you wrap the folder name in ____. For example: `app/____/dashboard/page.tsx` would still resolve to `/dashboard`.',
    options: [
      { label: "A", text: "[marketing]" },
      { label: "B", text: "(marketing)" },
      { label: "C", text: "_marketing" },
      { label: "D", text: "@marketing" },
    ],
    correctAnswer: "B",
    explanation:
      "Route groups use parentheses `(folderName)` to organize routes without adding the folder name to the URL path. This is useful for organizing layouts.",
    hint: "The convention uses a type of bracket that is NOT square brackets.",
    tags: ["app-router", "route-groups", "routing"],
  },

  // ─── Server Components (multiple-choice, beginner) ──────────────────
  {
    id: "quiz-next-server-components-01",
    trackId: "nextjs",
    category: "Server Components",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which of the following is TRUE about React Server Components (RSC) in Next.js App Router?",
    options: [
      { label: "A", text: "They send their JavaScript bundle to the client for hydration" },
      { label: "B", text: "They can use `useState` and `useEffect` hooks" },
      { label: "C", text: "They render on the server and send only the rendered HTML/RSC payload to the client" },
      { label: "D", text: "They require the `'use server'` directive at the top of the file" },
    ],
    correctAnswer: "C",
    explanation:
      "Server Components render on the server and send only the resulting HTML and RSC payload to the client. They do not include component JavaScript in the client bundle.",
    hint: "Think about what makes Server Components more efficient than Client Components.",
    tags: ["server-components", "rsc", "rendering"],
  },
  {
    id: "quiz-next-server-components-02",
    trackId: "nextjs",
    category: "Server Components",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "In the Next.js App Router, components are Server Components by default. What can Server Components do that Client Components cannot?",
    options: [
      { label: "A", text: "Attach event handlers like `onClick`" },
      { label: "B", text: "Directly access backend resources like databases or the file system" },
      { label: "C", text: "Use the `useState` hook for local state" },
      { label: "D", text: "Use browser APIs like `window` and `localStorage`" },
    ],
    correctAnswer: "B",
    explanation:
      "Server Components run exclusively on the server, so they can directly query databases, read the file system, and access other backend resources without exposing secrets to the client.",
    hint: "Server Components run in a Node.js environment.",
    tags: ["server-components", "data-access", "backend"],
  },
  {
    id: "quiz-next-server-components-03",
    trackId: "nextjs",
    category: "Server Components",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What happens when Next.js encounters the following Server Component?",
    codeSnippet: `// app/users/page.tsx
// No 'use client' directive

import { db } from '@/lib/db';

export default async function UsersPage() {
  const users = await db.user.findMany();
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
    options: [
      { label: "A", text: "It throws an error because components cannot be async" },
      { label: "B", text: "It fetches users on the server and sends the rendered HTML to the client" },
      { label: "C", text: "It fetches users on the client after hydration" },
      { label: "D", text: "It throws an error because `db` cannot be imported in a component" },
    ],
    correctAnswer: "B",
    explanation:
      "Server Components can be async functions. The database query runs on the server during rendering, and only the resulting HTML is sent to the client.",
    hint: "This is a Server Component (no `'use client'` directive), so it runs on the server.",
    tags: ["server-components", "async", "data-fetching"],
  },

  // ─── Client Components (fill-in-blank, beginner) ────────────────────
  {
    id: "quiz-next-client-components-01",
    trackId: "nextjs",
    category: "Client Components",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To mark a component as a Client Component in the Next.js App Router, you add the ____ directive at the top of the file.",
    options: [
      { label: "A", text: "'use client'" },
      { label: "B", text: "'use browser'" },
      { label: "C", text: "'use server'" },
      { label: "D", text: "'client only'" },
    ],
    correctAnswer: "A",
    explanation:
      "The `'use client'` directive at the top of a file marks it (and all modules it imports) as part of the client boundary, enabling hooks and browser APIs.",
    hint: "It is a string literal directive, similar to `'use strict'`.",
    tags: ["client-components", "directive", "use-client"],
  },
  {
    id: "quiz-next-client-components-02",
    trackId: "nextjs",
    category: "Client Components",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What will happen when this component renders in Next.js?",
    codeSnippet: `// app/counter/page.tsx
// No 'use client' directive

import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    options: [
      { label: "A", text: "It renders a button showing 'Count: 0' that increments on click" },
      { label: "B", text: "It throws an error: useState cannot be used in a Server Component" },
      { label: "C", text: "It renders static HTML with 'Count: 0' but clicking does nothing" },
      { label: "D", text: "It renders on the server first, then hydrates with useState on the client" },
    ],
    correctAnswer: "B",
    explanation:
      "Without the `'use client'` directive, this is a Server Component. Hooks like `useState` are not available in Server Components, so Next.js throws an error.",
    hint: "Check which directive is missing from the top of the file.",
    tags: ["client-components", "useState", "error"],
  },
  {
    id: "quiz-next-client-components-03",
    trackId: "nextjs",
    category: "Client Components",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "If a Client Component imports a Server Component, what happens?",
    options: [
      { label: "A", text: "The Server Component is automatically converted to a Client Component" },
      { label: "B", text: "Next.js throws a build error" },
      { label: "C", text: "The Server Component renders on the server and its output is passed to the Client Component" },
      { label: "D", text: "The Server Component only renders during static generation" },
    ],
    correctAnswer: "A",
    explanation:
      "When a Client Component directly imports a module, that module becomes part of the client bundle. To keep Server Components on the server, pass them as `children` or other props instead of importing them directly.",
    hint: "Think about what the `'use client'` boundary means for the module graph.",
    tags: ["client-components", "server-components", "composition"],
  },

  // ─── Data Fetching (output-prediction, intermediate) ────────────────
  {
    id: "quiz-next-data-fetching-01",
    trackId: "nextjs",
    category: "Data Fetching",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What caching behavior does this `fetch` call have by default in a Next.js Server Component?",
    codeSnippet: `// app/posts/page.tsx
export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return <PostList posts={posts} />;
}`,
    options: [
      { label: "A", text: "The fetch is never cached; it runs on every request" },
      { label: "B", text: "The fetch result is cached indefinitely by default (equivalent to force-cache)" },
      { label: "C", text: "The fetch result is cached for 60 seconds" },
      { label: "D", text: "The fetch is only cached during the build (SSG) and never updated" },
    ],
    correctAnswer: "B",
    explanation:
      "In Next.js App Router, `fetch` requests in Server Components are cached by default (equivalent to `{ cache: 'force-cache' }`). You must opt out explicitly with `{ cache: 'no-store' }` or use revalidation.",
    hint: "Next.js extends the native `fetch` API with caching defaults.",
    tags: ["data-fetching", "caching", "fetch"],
  },
  {
    id: "quiz-next-data-fetching-02",
    trackId: "nextjs",
    category: "Data Fetching",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To opt out of caching for a `fetch` call in a Next.js Server Component and fetch fresh data on every request, you pass `{ cache: ____ }`.",
    options: [
      { label: "A", text: "'no-cache'" },
      { label: "B", text: "'no-store'" },
      { label: "C", text: "'reload'" },
      { label: "D", text: "'dynamic'" },
    ],
    correctAnswer: "B",
    explanation:
      "`{ cache: 'no-store' }` tells Next.js to fetch fresh data on every request, similar to `getServerSideProps` behavior in the Pages Router.",
    hint: "This is the same option from the standard Web Fetch API spec for preventing caching.",
    tags: ["data-fetching", "caching", "no-store"],
  },
  {
    id: "quiz-next-data-fetching-03",
    trackId: "nextjs",
    category: "Data Fetching",
    difficulty: "advanced",
    type: "output-prediction",
    question:
      "What happens when two Server Components in the same request call the same `fetch` URL?",
    codeSnippet: `// app/layout.tsx
export default async function Layout({ children }) {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return <div><Navbar user={user} />{children}</div>;
}

// app/page.tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return <Profile user={user} />;
}`,
    options: [
      { label: "A", text: "Two separate network requests are made to the API" },
      { label: "B", text: "Next.js automatically deduplicates the fetch; only one request is made" },
      { label: "C", text: "The second fetch throws an error due to a duplicate request" },
      { label: "D", text: "Both fetches run but the second returns undefined" },
    ],
    correctAnswer: "B",
    explanation:
      "Next.js automatically deduplicates `fetch` requests with the same URL and options within the same server render pass, so the API is only called once.",
    hint: "Next.js optimizes multiple identical requests made during a single render.",
    tags: ["data-fetching", "deduplication", "optimization"],
  },

  // ─── Dynamic Routes (fill-in-blank, beginner) ──────────────────────
  {
    id: "quiz-next-dynamic-routes-01",
    trackId: "nextjs",
    category: "Dynamic Routes",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a dynamic route segment for a blog post ID in the App Router, you name the folder ____. For example: `app/blog/____/page.tsx`.",
    options: [
      { label: "A", text: ":id" },
      { label: "B", text: "[id]" },
      { label: "C", text: "{id}" },
      { label: "D", text: "$id" },
    ],
    correctAnswer: "B",
    explanation:
      "Dynamic segments in the App Router use square brackets: `[id]`. The value is passed to the component via the `params` prop.",
    hint: "Next.js uses a bracket syntax similar to file-system based routing conventions.",
    tags: ["dynamic-routes", "params", "routing"],
  },
  {
    id: "quiz-next-dynamic-routes-02",
    trackId: "nextjs",
    category: "Dynamic Routes",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given the following file structure, what does `params` contain when visiting `/shop/clothing/shirts/blue`?",
    codeSnippet: `// File: app/shop/[...slug]/page.tsx

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return <div>Shop</div>;
}`,
    options: [
      { label: "A", text: '["clothing", "shirts", "blue"]' },
      { label: "B", text: '"clothing/shirts/blue"' },
      { label: "C", text: '{ clothing: "shirts", color: "blue" }' },
      { label: "D", text: '["clothing"]' },
    ],
    correctAnswer: "A",
    explanation:
      "Catch-all segments `[...slug]` capture all subsequent segments as an array. Visiting `/shop/clothing/shirts/blue` produces `['clothing', 'shirts', 'blue']`.",
    hint: "The spread syntax `...` hints that the value is an array of path segments.",
    tags: ["dynamic-routes", "catch-all", "params"],
  },

  // ─── Middleware (multiple-choice, intermediate) ─────────────────────
  {
    id: "quiz-next-middleware-01",
    trackId: "nextjs",
    category: "Middleware",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Where must the `middleware.ts` file be placed in a Next.js project using the App Router?",
    options: [
      { label: "A", text: "Inside the `app/` directory at `app/middleware.ts`" },
      { label: "B", text: "At the project root (same level as `app/` or `src/`), or inside `src/` if using the `src` directory" },
      { label: "C", text: "Inside a special `middleware/` folder at any level" },
      { label: "D", text: "Inside `app/api/middleware.ts`" },
    ],
    correctAnswer: "B",
    explanation:
      "The middleware file must be placed at the root of your project (next to `app/` or `pages/`), or inside `src/` if you use the `src` directory convention. Only one middleware file is supported per project.",
    hint: "Middleware is project-wide, not specific to a route segment.",
    tags: ["middleware", "file-conventions", "configuration"],
  },
  {
    id: "quiz-next-middleware-02",
    trackId: "nextjs",
    category: "Middleware",
    difficulty: "advanced",
    type: "output-prediction",
    question: "What does this middleware do?",
    codeSnippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};`,
    options: [
      { label: "A", text: "Redirects all requests to /login" },
      { label: "B", text: "Redirects unauthenticated users from /dashboard routes to /login" },
      { label: "C", text: "Blocks all /dashboard routes and returns a 403 error" },
      { label: "D", text: "Sets an auth-token cookie on /dashboard routes" },
    ],
    correctAnswer: "B",
    explanation:
      "The middleware checks for an `auth-token` cookie on `/dashboard` routes. If missing, it redirects to `/login`. Otherwise, it allows the request to proceed with `NextResponse.next()`.",
    hint: "Look at the condition: what happens when there is no token?",
    tags: ["middleware", "authentication", "redirect"],
  },

  // ─── API Routes / Route Handlers (fill-in-blank, beginner) ─────────
  {
    id: "quiz-next-api-routes-01",
    trackId: "nextjs",
    category: "API Routes",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In the App Router, API endpoints are defined using a special file named ____ inside a route folder (e.g., `app/api/hello/____`).",
    options: [
      { label: "A", text: "api.ts" },
      { label: "B", text: "handler.ts" },
      { label: "C", text: "route.ts" },
      { label: "D", text: "endpoint.ts" },
    ],
    correctAnswer: "C",
    explanation:
      "`route.ts` (or `route.js`) is the App Router convention for Route Handlers. It replaces the `pages/api` convention from the Pages Router.",
    hint: "This file uses named exports for HTTP methods like GET, POST, etc.",
    tags: ["api-routes", "route-handlers", "file-conventions"],
  },
  {
    id: "quiz-next-api-routes-02",
    trackId: "nextjs",
    category: "API Routes",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What does this Route Handler return when called with a GET request?",
    codeSnippet: `// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: 'Hello, World!' },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    { received: body },
    { status: 201 }
  );
}`,
    options: [
      { label: "A", text: 'JSON response: { message: "Hello, World!" } with status 200' },
      { label: "B", text: 'JSON response: { received: null } with status 201' },
      { label: "C", text: "A 405 Method Not Allowed error" },
      { label: "D", text: 'Plain text response: "Hello, World!"' },
    ],
    correctAnswer: "A",
    explanation:
      "The `GET` function handles GET requests and returns a JSON response with `{ message: 'Hello, World!' }` and status 200 via `NextResponse.json()`.",
    hint: "Look at which exported function matches the GET HTTP method.",
    tags: ["api-routes", "route-handlers", "NextResponse"],
  },
  {
    id: "quiz-next-api-routes-03",
    trackId: "nextjs",
    category: "API Routes",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "In a Next.js Route Handler, which of the following will make the GET handler dynamic (not cached at build time)?",
    options: [
      { label: "A", text: "Exporting `const dynamic = 'force-static'`" },
      { label: "B", text: "Using `request.cookies`, `request.headers`, or reading `searchParams`" },
      { label: "C", text: "Returning `NextResponse.json()` instead of `Response.json()`" },
      { label: "D", text: "Naming the file `route.dynamic.ts` instead of `route.ts`" },
    ],
    correctAnswer: "B",
    explanation:
      "Reading dynamic request values like cookies, headers, or search params opts a Route Handler out of static caching and makes it dynamic, evaluated on every request.",
    hint: "Think about which inputs can only be known at request time.",
    tags: ["api-routes", "route-handlers", "dynamic", "caching"],
  },

  // ─── Caching/Revalidation (multiple-choice, advanced) ──────────────
  {
    id: "quiz-next-caching-01",
    trackId: "nextjs",
    category: "Caching/Revalidation",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What is Incremental Static Regeneration (ISR) in Next.js, and how is it configured in the App Router?",
    options: [
      { label: "A", text: "A client-side polling mechanism configured with `useEffect`" },
      { label: "B", text: "A strategy where static pages are rebuilt at deploy time only" },
      { label: "C", text: "A strategy that revalidates cached data after a time interval, configured with `next: { revalidate: seconds }` on fetch or `export const revalidate = seconds` at the segment level" },
      { label: "D", text: "A feature that only works with the Pages Router's `getStaticProps`" },
    ],
    correctAnswer: "C",
    explanation:
      "ISR in the App Router is configured using `fetch('...', { next: { revalidate: 60 } })` or by exporting `const revalidate = 60` from a page/layout. Stale content is served while fresh content is regenerated in the background.",
    hint: "ISR serves stale content and regenerates in the background after a time-based interval.",
    tags: ["caching", "isr", "revalidation"],
  },
  {
    id: "quiz-next-caching-02",
    trackId: "nextjs",
    category: "Caching/Revalidation",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "To trigger on-demand revalidation of a specific path in a Next.js Server Action or Route Handler, you call ____.",
    options: [
      { label: "A", text: "revalidatePath('/path')" },
      { label: "B", text: "invalidateCache('/path')" },
      { label: "C", text: "refreshPath('/path')" },
      { label: "D", text: "purge('/path')" },
    ],
    correctAnswer: "A",
    explanation:
      "`revalidatePath` from `next/cache` allows you to purge cached data for a specific path on demand, rather than waiting for a time-based revalidation interval.",
    hint: "This function is imported from `next/cache`.",
    tags: ["caching", "revalidation", "on-demand"],
  },

  // ─── Metadata/SEO (fill-in-blank, beginner) ────────────────────────
  {
    id: "quiz-next-metadata-01",
    trackId: "nextjs",
    category: "Metadata/SEO",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To define static metadata (title, description) for a page in the App Router, you export a ____ object from the page or layout file.",
    options: [
      { label: "A", text: "head" },
      { label: "B", text: "seo" },
      { label: "C", text: "metadata" },
      { label: "D", text: "meta" },
    ],
    correctAnswer: "C",
    explanation:
      "Exporting a `metadata` object (of type `Metadata` from `next`) allows you to define static page metadata like title, description, and Open Graph tags.",
    hint: "This export name matches the API name in the Next.js docs.",
    tags: ["metadata", "seo", "static"],
  },
  {
    id: "quiz-next-metadata-02",
    trackId: "nextjs",
    category: "Metadata/SEO",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What metadata will be generated for the `/blog/my-post` page?",
    codeSnippet: `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then(r => r.json());

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then(r => r.json());
  return <article>{post.content}</article>;
}`,
    options: [
      { label: "A", text: "Static metadata with the slug as the title" },
      { label: "B", text: "Dynamic metadata fetched from the API using the post's title and excerpt" },
      { label: "C", text: "No metadata because generateMetadata is not a valid export" },
      { label: "D", text: "An error because metadata cannot be async" },
    ],
    correctAnswer: "B",
    explanation:
      "`generateMetadata` is a special async function export that fetches data at request time and returns dynamic metadata. The fetch is deduplicated with the one in the page component.",
    hint: "This function has a special name recognized by Next.js for dynamic metadata.",
    tags: ["metadata", "seo", "dynamic", "generateMetadata"],
  },

  // ─── Server Actions (output-prediction, intermediate) ──────────────
  {
    id: "quiz-next-server-actions-01",
    trackId: "nextjs",
    category: "Server Actions",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To define a Server Action inline within a Server Component, you add the ____ directive at the top of the async function body.",
    options: [
      { label: "A", text: "'use client'" },
      { label: "B", text: "'use server'" },
      { label: "C", text: "'server action'" },
      { label: "D", text: "'server only'" },
    ],
    correctAnswer: "B",
    explanation:
      "The `'use server'` directive at the top of an async function body marks it as a Server Action that can be called from Client Components via form actions or direct invocations.",
    hint: "This is the counterpart to `'use client'`, but for server-side execution.",
    tags: ["server-actions", "use-server", "directive"],
  },
  {
    id: "quiz-next-server-actions-02",
    trackId: "nextjs",
    category: "Server Actions",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What does this Server Action do when the form is submitted?",
    codeSnippet: `// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;
  await db.todo.create({ data: { title } });
  revalidatePath('/todos');
}

// app/todos/page.tsx
import { createTodo } from '../actions';

export default function TodosPage() {
  return (
    <form action={createTodo}>
      <input name="title" />
      <button type="submit">Add</button>
    </form>
  );
}`,
    options: [
      { label: "A", text: "Submits the form via a client-side API call using fetch" },
      { label: "B", text: "Creates a todo on the server, saves to DB, and revalidates the /todos page cache" },
      { label: "C", text: "Throws an error because form actions must use onSubmit" },
      { label: "D", text: "Redirects to a /todos/success page" },
    ],
    correctAnswer: "B",
    explanation:
      "The Server Action receives the FormData, inserts the new todo into the database, and calls `revalidatePath` to refresh the `/todos` page data so the new todo appears.",
    hint: "Look at what happens after the database insert.",
    tags: ["server-actions", "forms", "revalidation"],
  },
  {
    id: "quiz-next-server-actions-03",
    trackId: "nextjs",
    category: "Server Actions",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "Which of the following is TRUE about Server Actions in Next.js?",
    options: [
      { label: "A", text: "Server Actions can only be used within Server Components" },
      { label: "B", text: "Server Actions are transmitted as public HTTP POST endpoints and can be invoked from Client Components" },
      { label: "C", text: "Server Actions must return JSX to render on the client" },
      { label: "D", text: "Server Actions execute on the client and send results to the server" },
    ],
    correctAnswer: "B",
    explanation:
      "Server Actions are exposed as POST endpoints. They can be called from both Server and Client Components. Next.js handles the serialization and communication automatically.",
    hint: "Server Actions need to be callable from interactive Client Components too.",
    tags: ["server-actions", "client-components", "http"],
  },

  // ─── Loading/Error UI (fill-in-blank, beginner) ────────────────────
  {
    id: "quiz-next-loading-ui-01",
    trackId: "nextjs",
    category: "Loading/Error UI",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To show an instant loading state while a route segment's content loads, you create a file named ____ in the route folder.",
    options: [
      { label: "A", text: "loading.tsx" },
      { label: "B", text: "skeleton.tsx" },
      { label: "C", text: "fallback.tsx" },
      { label: "D", text: "spinner.tsx" },
    ],
    correctAnswer: "A",
    explanation:
      "`loading.tsx` is a special file convention that automatically wraps the page in a React Suspense boundary and shows the loading UI while the page content streams in.",
    hint: "This file name directly describes what the user sees: a state of waiting.",
    tags: ["loading-ui", "suspense", "file-conventions"],
  },
  {
    id: "quiz-next-loading-ui-02",
    trackId: "nextjs",
    category: "Loading/Error UI",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a custom error boundary UI for a route segment, you create a file named ____. This component must be a Client Component.",
    options: [
      { label: "A", text: "catch.tsx" },
      { label: "B", text: "error.tsx" },
      { label: "C", text: "fallback.tsx" },
      { label: "D", text: "boundary.tsx" },
    ],
    correctAnswer: "B",
    explanation:
      "`error.tsx` creates a React error boundary for the route segment. It must be a Client Component (use `'use client'`) and receives `error` and `reset` props.",
    hint: "This file name matches the concept it handles: something that went wrong.",
    tags: ["error-ui", "error-boundary", "file-conventions"],
  },
  {
    id: "quiz-next-loading-ui-03",
    trackId: "nextjs",
    category: "Loading/Error UI",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What happens when the async page throws an error with this file structure?",
    codeSnippet: `// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchData(); // This throws an error
  return <div>{data}</div>;
}`,
    options: [
      { label: "A", text: "The entire application crashes and shows a white screen" },
      { label: "B", text: "The error boundary catches the error and displays 'Something went wrong!' with a retry button" },
      { label: "C", text: "Next.js shows the default 500 error page" },
      { label: "D", text: "The layout also unmounts and the user sees a blank page" },
    ],
    correctAnswer: "B",
    explanation:
      "The `error.tsx` boundary catches errors from its page and child segments. The layout remains intact because the error boundary is nested inside the layout. Clicking 'Try again' calls `reset()` to re-render the page.",
    hint: "The error boundary is placed between the layout and the page.",
    tags: ["error-ui", "error-boundary", "reset"],
  },

  // ─── Routing (output-prediction, beginner) ─────────────────────────
  {
    id: "quiz-next-routing-01",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which Next.js component should you use instead of an HTML `<a>` tag for client-side navigation between routes?",
    options: [
      { label: "A", text: "<Router> from 'next/router'" },
      { label: "B", text: "<Navigate> from 'next/navigation'" },
      { label: "C", text: "<Link> from 'next/link'" },
      { label: "D", text: "<Anchor> from 'next/anchor'" },
    ],
    correctAnswer: "C",
    explanation:
      "The `<Link>` component from `next/link` enables client-side navigation with prefetching. It renders an `<a>` tag under the hood but prevents full page reloads.",
    hint: "This component shares its name with a common HTML-related concept for connecting pages.",
    tags: ["routing", "link", "navigation"],
  },
  {
    id: "quiz-next-routing-02",
    trackId: "nextjs",
    category: "Routing",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What does this parallel routes setup render at `/dashboard`?",
    codeSnippet: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div style={{ display: 'flex' }}>
        {analytics}
        {team}
      </div>
    </div>
  );
}

// app/dashboard/page.tsx         -> renders main content
// app/dashboard/@analytics/page.tsx -> renders analytics panel
// app/dashboard/@team/page.tsx      -> renders team panel`,
    options: [
      { label: "A", text: "Only the main content from page.tsx is rendered" },
      { label: "B", text: "The main content, analytics panel, and team panel are all rendered simultaneously in the layout" },
      { label: "C", text: "An error because you cannot have multiple page files" },
      { label: "D", text: "Only analytics and team panels render, children is ignored" },
    ],
    correctAnswer: "B",
    explanation:
      "Parallel routes (using `@folder` convention) allow rendering multiple pages in the same layout simultaneously. Each slot (`@analytics`, `@team`) is passed as a prop alongside `children`.",
    hint: "The `@` prefix in folder names creates named slots in the layout.",
    tags: ["routing", "parallel-routes", "layout"],
  },

  // ─── Additional questions to reach 35 total ────────────────────────

  {
    id: "quiz-next-app-router-04",
    trackId: "nextjs",
    category: "App Router",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which file in the App Router serves as the top-level HTML shell and must include `<html>` and `<body>` tags?",
    options: [
      { label: "A", text: "app/page.tsx" },
      { label: "B", text: "app/layout.tsx (the root layout)" },
      { label: "C", text: "app/template.tsx" },
      { label: "D", text: "app/head.tsx" },
    ],
    correctAnswer: "B",
    explanation:
      "The root `layout.tsx` in the `app` directory is required and must include `<html>` and `<body>` tags. It replaces the old `_document.tsx` and `_app.tsx` from the Pages Router.",
    hint: "This is the only layout that is strictly required in an App Router project.",
    tags: ["app-router", "root-layout", "html"],
  },
  {
    id: "quiz-next-data-fetching-04",
    trackId: "nextjs",
    category: "Data Fetching",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To statically generate dynamic route pages at build time in the App Router, you export an async function called ____ from the page file.",
    options: [
      { label: "A", text: "getStaticPaths" },
      { label: "B", text: "generateStaticParams" },
      { label: "C", text: "getStaticProps" },
      { label: "D", text: "generatePaths" },
    ],
    correctAnswer: "B",
    explanation:
      "`generateStaticParams` replaces `getStaticPaths` from the Pages Router. It returns an array of param objects that Next.js uses to statically generate pages at build time.",
    hint: "The function name starts with 'generate' and includes 'Static' and 'Params'.",
    tags: ["data-fetching", "ssg", "generateStaticParams"],
  },
  {
    id: "quiz-next-not-found-01",
    trackId: "nextjs",
    category: "Loading/Error UI",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a custom 404 page in the App Router, you create a file named ____ in the `app` directory.",
    options: [
      { label: "A", text: "404.tsx" },
      { label: "B", text: "not-found.tsx" },
      { label: "C", text: "missing.tsx" },
      { label: "D", text: "error-404.tsx" },
    ],
    correctAnswer: "B",
    explanation:
      "`not-found.tsx` is the App Router convention for custom 404 pages. It is also triggered programmatically by calling `notFound()` from `next/navigation`.",
    hint: "The file name describes the HTTP status concept: the resource was ____.",
    tags: ["not-found", "404", "file-conventions"],
  },
  {
    id: "quiz-next-caching-04",
    trackId: "nextjs",
    category: "Caching/Revalidation",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "Which of the following correctly describes Next.js's Router Cache (client-side cache)?",
    options: [
      { label: "A", text: "It caches API responses in the browser's localStorage" },
      { label: "B", text: "It stores the RSC payload of visited route segments in memory during a session, enabling instant back/forward navigation" },
      { label: "C", text: "It is a server-side cache stored in Redis by default" },
      { label: "D", text: "It only caches static assets like images and fonts" },
    ],
    correctAnswer: "B",
    explanation:
      "The Router Cache is an in-memory client-side cache that stores the React Server Component payload of previously visited and prefetched route segments. It enables instant back/forward navigation.",
    hint: "This cache lives in the browser's memory, not on the server.",
    tags: ["caching", "router-cache", "client-side"],
  },
];
