import type { DailyTip } from "./daily-tips";

export const nextjsDailyTips: DailyTip[] = [
  // 1. Server vs Client Components
  {
    id: "nextjs-tip-server-vs-client",
    trackId: "nextjs",
    category: "Fundamentals",
    title: "Server vs Client Components",
    content:
      "In Next.js App Router, every component is a Server Component by default. Server Components run only on the server, which means they can directly access databases, read files, and fetch data without exposing secrets to the client. They also send less JavaScript to the browser, improving performance.\n\nClient Components, on the other hand, are opted into by adding the \"use client\" directive at the top of a file. These components run in the browser and have access to browser APIs, React hooks like useState and useEffect, and event handlers like onClick.\n\nThe key mental model is to think of Server Components as your default and only reach for Client Components when you need interactivity, browser APIs, or React state. This boundary is one of the most important architectural decisions in a Next.js application.",
    codeExample: {
      code: `// app/dashboard/page.tsx — Server Component (default)
// No "use client" needed. Runs only on the server.
import { db } from "@/lib/db";

export default async function DashboardPage() {
  // Direct database access — safe, no API route needed
  const stats = await db.analytics.getStats();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total users: {stats.totalUsers}</p>
      {/* Client Component for interactive chart */}
      <InteractiveChart data={stats.chartData} />
    </div>
  );
}`,
      language: "tsx",
      title: "Server Component with a Client Component child",
    },
    keyTakeaway:
      "Remember: Components are Server Components by default in the App Router. Only add \"use client\" when you need interactivity or browser APIs.",
    relatedDrillId: "drill-next-server-client",
  },

  // 2. When to use "use client"
  {
    id: "nextjs-tip-use-client",
    trackId: "nextjs",
    category: "Fundamentals",
    title: "When to Use \"use client\"",
    content:
      "The \"use client\" directive marks the boundary between server and client code. You should add it at the top of a file when that component needs useState, useEffect, useRef, useContext, event handlers like onClick or onChange, or browser-only APIs like window or localStorage.\n\nA common mistake is adding \"use client\" too high in the component tree. When you mark a component as a Client Component, all of its imported children also become Client Components. This can accidentally pull large portions of your app into the client bundle.\n\nThe best practice is to push \"use client\" as far down the component tree as possible. Extract the interactive parts into small, focused Client Components and keep the rest as Server Components. This gives you the best of both worlds: server-side rendering for most of the page and client-side interactivity where needed.",
    codeExample: {
      code: `"use client";

import { useState } from "react";

// This component NEEDS "use client" because it uses useState
export function LikeButton({ initialCount }: { initialCount: number }) {
  const [likes, setLikes] = useState(initialCount);

  return (
    <button onClick={() => setLikes((prev) => prev + 1)}>
      {likes} Likes
    </button>
  );
}

// WRONG: Don't do this in the page just to use LikeButton
// "use client"  <-- Don't add this to the page!
// export default function Page() { ... }

// RIGHT: Keep the page as a Server Component,
// import LikeButton where needed`,
      language: "tsx",
      title: "Extracting a small Client Component for interactivity",
    },
    keyTakeaway:
      "Remember: Push \"use client\" as far down the tree as possible. Only the leaf components that need interactivity should be Client Components.",
    relatedDrillId: "drill-next-use-client-boundary",
  },

  // 3. App Router file conventions
  {
    id: "nextjs-tip-file-conventions",
    trackId: "nextjs",
    category: "Routing",
    title: "App Router File Conventions (page.tsx, layout.tsx)",
    content:
      "The App Router uses a file-system based router where folders define routes and special files define UI. The most important convention is page.tsx, which makes a route publicly accessible. Without a page.tsx, a folder is just used for organization and does not create a route segment.\n\nlayout.tsx wraps page content and persists across navigations. When a user navigates between pages that share a layout, the layout component does not re-render or lose state. This makes layouts ideal for navigation bars, sidebars, and shared UI chrome.\n\nOther special files include template.tsx (like layout but re-mounts on navigation), default.tsx (fallback for parallel routes), and route.ts (for API endpoints). Understanding these conventions is essential because Next.js relies on file names, not configuration, to determine how your app behaves.",
    codeExample: {
      code: `// app/layout.tsx — Root layout (required)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>Global Navigation</nav>
        {children}
      </body>
    </html>
  );
}

// app/blog/layout.tsx — Nested layout for /blog/*
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-container">
      <aside>Blog Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}

// app/blog/page.tsx — Renders at /blog
export default function BlogPage() {
  return <h1>All Posts</h1>;
}

// app/blog/[slug]/page.tsx — Renders at /blog/:slug
export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>Post: {params.slug}</h1>;
}`,
      language: "tsx",
      title: "File convention hierarchy in the App Router",
    },
    keyTakeaway:
      "Remember: page.tsx makes a route accessible, layout.tsx wraps and persists across navigations, and folders without page.tsx are just for organization.",
    relatedDrillId: "drill-next-file-conventions",
  },

  // 4. loading.tsx and Suspense
  {
    id: "nextjs-tip-loading-suspense",
    trackId: "nextjs",
    category: "Fundamentals",
    title: "loading.tsx and Suspense",
    content:
      "Next.js provides a special loading.tsx file that automatically wraps your page in a React Suspense boundary. When you place a loading.tsx file in a route segment, Next.js will show its content as a fallback while the page component is loading, typically while an async Server Component is fetching data.\n\nUnder the hood, loading.tsx creates a Suspense boundary around your page content. This means you get instant loading states without any manual Suspense setup. The loading UI is shown immediately on navigation, giving users instant feedback.\n\nYou can also use Suspense boundaries manually within your page for more granular loading states. This is useful when you want different parts of the page to load independently rather than waiting for everything to resolve before showing anything.",
    codeExample: {
      code: `// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}

// app/dashboard/page.tsx
// This async component triggers the loading state
export default async function DashboardPage() {
  // loading.tsx is shown while this fetch resolves
  const data = await fetch("https://api.example.com/stats");
  const stats = await data.json();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Revenue: {stats.revenue}</p>
    </div>
  );
}`,
      language: "tsx",
      title: "Automatic loading states with loading.tsx",
    },
    keyTakeaway:
      "Remember: loading.tsx gives you instant loading UI out of the box by automatically wrapping your page in a Suspense boundary.",
  },

  // 5. error.tsx error boundaries
  {
    id: "nextjs-tip-error-boundary",
    trackId: "nextjs",
    category: "Fundamentals",
    title: "error.tsx Error Boundaries",
    content:
      "The error.tsx file creates a React Error Boundary for its route segment. If an error is thrown in a page or any of its children, the error.tsx component will render instead, preventing the entire app from crashing. This is a must-have for production applications.\n\nerror.tsx components must be Client Components (they need \"use client\") because Error Boundaries are a client-side React feature. The component receives an error object and a reset function as props. The reset function lets users attempt to recover from the error by re-rendering the route segment.\n\nOne important detail is that error.tsx does not catch errors thrown in the layout.tsx file at the same level. To catch layout errors, you need to place error.tsx in the parent segment. For root layout errors, you can use the special global-error.tsx file at the app directory root.",
    codeExample: {
      code: `"use client";

// app/dashboard/error.tsx
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">
        Something went wrong!
      </h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}

// app/global-error.tsx — Catches root layout errors
// Must include <html> and <body> since it replaces the root layout
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}`,
      language: "tsx",
      title: "Error handling with error.tsx and global-error.tsx",
    },
    keyTakeaway:
      "Remember: error.tsx must be a Client Component and catches errors from its page and children, but not from its sibling layout.tsx.",
    relatedDrillId: "drill-next-error-handling",
  },

  // 6. not-found.tsx
  {
    id: "nextjs-tip-not-found",
    trackId: "nextjs",
    category: "Routing",
    title: "not-found.tsx",
    content:
      "The not-found.tsx file renders when the notFound() function is called within a route segment, or when a URL does not match any route. This gives you a customizable 404 experience that can be scoped to different sections of your app.\n\nAt the app root level, app/not-found.tsx handles all unmatched URLs for your entire application. You can also create not-found.tsx files in nested route segments. For example, app/blog/not-found.tsx would handle cases where a specific blog post is not found, while still showing the blog layout.\n\nThe notFound() function from \"next/navigation\" is how you programmatically trigger a not-found page. This is typically used in dynamic routes when a database lookup returns no results. It is cleaner than returning a redirect or rendering an error component manually.",
    codeExample: {
      code: `// app/not-found.tsx — Global 404 page
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link href="/" className="mt-4 text-blue-600 underline">
        Go home
      </Link>
    </div>
  );
}

// app/blog/[slug]/page.tsx — Triggering notFound()
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // Renders the nearest not-found.tsx
  }

  return <article>{post.content}</article>;
}`,
      language: "tsx",
      title: "Custom 404 pages with not-found.tsx and notFound()",
    },
    keyTakeaway:
      "Remember: Use notFound() from \"next/navigation\" to programmatically trigger the nearest not-found.tsx when a resource does not exist.",
  },

  // 7. Server component data fetching
  {
    id: "nextjs-tip-server-data-fetching",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Server Component Data Fetching",
    content:
      "One of the biggest advantages of Server Components is that you can fetch data directly inside them using async/await. There is no need for useEffect, useState, or separate API routes. You simply make your component async and fetch data at the top of the function.\n\nNext.js extends the native fetch API with automatic request deduplication. If multiple components fetch the same URL with the same options during a single render, Next.js will only make one actual request. This means you do not need to worry about prop drilling data from a parent component to avoid duplicate fetches.\n\nYou can also call your database, ORM, or any server-side service directly in Server Components. Since the code never reaches the client, there is no risk of exposing database credentials or API keys. This dramatically simplifies the data layer compared to traditional React apps where you need API routes as an intermediary.",
    codeExample: {
      code: `// app/products/page.tsx — Direct data fetching in a Server Component
import { db } from "@/lib/db";

// No "use client", no useEffect, no loading state management
export default async function ProductsPage() {
  // Option 1: Fetch from an API
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  const products = await res.json();

  // Option 2: Query database directly (equally valid)
  const categories = await db.category.findMany();

  return (
    <div>
      <h1>Products</h1>
      {categories.map((cat) => (
        <section key={cat.id}>
          <h2>{cat.name}</h2>
        </section>
      ))}
      {products.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`,
      language: "tsx",
      title: "Fetching data directly in Server Components",
    },
    keyTakeaway:
      "Remember: Server Components can fetch data directly with async/await. No useEffect, no API routes, no loading state boilerplate needed.",
    relatedDrillId: "drill-next-server-fetch",
  },

  // 8. Route Handlers (GET)
  {
    id: "nextjs-tip-route-handler-get",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Route Handlers (GET)",
    content:
      "Route Handlers are the App Router replacement for API routes from the Pages Router. You create them by exporting HTTP method functions (GET, POST, PUT, DELETE, etc.) from a route.ts file inside the app directory. They run exclusively on the server.\n\nA GET Route Handler is useful when you need to provide a JSON API for external consumers, handle webhooks, or serve data that Client Components need to fetch. Unlike Server Components where you fetch data inline, Route Handlers expose an HTTP endpoint that can be called from anywhere.\n\nBy default, GET Route Handlers are statically cached in production when they do not read from the Request object. If you read headers, cookies, or search params from the request, or use any other dynamic function, the handler becomes dynamic and executes on every request.",
    codeExample: {
      code: `// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const products = await db.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(products);
}

// app/api/products/[id]/route.ts
// GET /api/products/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}`,
      language: "typescript",
      title: "GET Route Handlers with query params and dynamic segments",
    },
    keyTakeaway:
      "Remember: Route Handlers export named HTTP methods from route.ts files. GET handlers are cached by default unless they read from the Request object.",
  },

  // 9. Route Handlers (POST)
  {
    id: "nextjs-tip-route-handler-post",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Route Handlers (POST)",
    content:
      "POST Route Handlers let you handle form submissions, create resources, and process incoming data from clients. They receive the Request object and can parse JSON bodies, form data, or raw text. POST handlers are never cached.\n\nWhen building POST handlers, always validate the incoming data before processing it. You can use libraries like Zod for schema validation, which pairs nicely with TypeScript to ensure type safety at runtime. Always return appropriate HTTP status codes: 201 for successful creation, 400 for validation errors, and 500 for server errors.\n\nWhile Server Actions are often a better choice for form handling in Next.js applications, POST Route Handlers remain essential for building public APIs, handling webhooks from third-party services, and serving data to non-Next.js clients like mobile apps.",
    codeExample: {
      code: `// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  published: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = CreatePostSchema.parse(body);

    // Create the resource
    const post = await db.post.create({
      data: {
        title: validated.title,
        content: validated.content,
        published: validated.published,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`,
      language: "typescript",
      title: "POST Route Handler with Zod validation",
    },
    keyTakeaway:
      "Remember: Always validate incoming data in POST handlers. Use Zod for runtime validation and return proper HTTP status codes.",
    relatedDrillId: "drill-next-route-handlers",
  },

  // 10. Server Actions basics
  {
    id: "nextjs-tip-server-actions-basics",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Server Actions Basics",
    content:
      "Server Actions are asynchronous functions that execute on the server and can be called directly from your React components. They are defined by adding the \"use server\" directive either at the top of a file (making all exports Server Actions) or inline at the top of an async function.\n\nServer Actions eliminate the need for manually creating API routes for data mutations. Instead of setting up a POST endpoint, writing fetch calls, and handling responses, you write a single async function and call it like any other function. Next.js handles the network request, serialization, and error handling behind the scenes.\n\nServer Actions can be used in both Server and Client Components. In Server Components, you can define them inline or import them. In Client Components, you must import them from a separate file marked with \"use server\" at the top. They are especially powerful when combined with form actions and the useActionState hook.",
    codeExample: {
      code: `// app/actions.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// This function runs on the server when called from any component
export async function createTodo(title: string) {
  await db.todo.create({
    data: { title, completed: false },
  });

  // Revalidate the page to show the new todo
  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const todo = await db.todo.findUnique({ where: { id } });
  await db.todo.update({
    where: { id },
    data: { completed: !todo?.completed },
  });
  revalidatePath("/todos");
}

// app/todos/page.tsx — Using the Server Action
import { createTodo } from "@/app/actions";

export default async function TodosPage() {
  const todos = await db.todo.findMany();

  return (
    <div>
      <form action={async (formData: FormData) => {
        "use server";
        const title = formData.get("title") as string;
        await createTodo(title);
      }}>
        <input name="title" placeholder="New todo..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}`,
      language: "tsx",
      title: "Defining and using Server Actions",
    },
    keyTakeaway:
      "Remember: Server Actions let you call server-side functions directly from components without creating API routes. Use \"use server\" to mark them.",
    relatedDrillId: "drill-next-server-actions",
  },

  // 11. Server Actions with forms
  {
    id: "nextjs-tip-server-actions-forms",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Server Actions with Forms",
    content:
      "Server Actions integrate natively with HTML forms through the action attribute. When you pass a Server Action to a form's action prop, the form data is automatically serialized and sent to the server. This works with progressive enhancement, meaning forms will work even before JavaScript loads on the client.\n\nThe useActionState hook (from React) lets you track the state of a Server Action, including pending states and return values. This is ideal for showing loading indicators, displaying success messages, or rendering validation errors returned from the server.\n\nFor optimistic updates, React provides the useOptimistic hook. You can combine this with Server Actions to immediately update the UI while the server processes the mutation, then reconcile with the actual server response when it arrives.",
    codeExample: {
      code: `"use client";

import { useActionState } from "react";
import { submitFeedback } from "@/app/actions";

type State = {
  message: string;
  errors?: { email?: string[]; feedback?: string[] };
};

export function FeedbackForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    submitFeedback,
    { message: "" }
  );

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      {state.errors?.email && (
        <p className="text-red-500">{state.errors.email[0]}</p>
      )}

      <label htmlFor="feedback">Feedback</label>
      <textarea id="feedback" name="feedback" required />
      {state.errors?.feedback && (
        <p className="text-red-500">{state.errors.feedback[0]}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Submit Feedback"}
      </button>

      {state.message && (
        <p className="text-green-600">{state.message}</p>
      )}
    </form>
  );
}`,
      language: "tsx",
      title: "Form with useActionState for pending states and validation",
    },
    keyTakeaway:
      "Remember: Use useActionState to track Server Action pending states and return values. Forms with Server Actions work even before JavaScript loads.",
  },

  // 12. Caching and revalidation (revalidatePath)
  {
    id: "nextjs-tip-revalidate-path",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "Caching and Revalidation with revalidatePath",
    content:
      "Next.js aggressively caches data and rendered pages to maximize performance. When you mutate data through a Server Action or Route Handler, the cached version of the affected pages may become stale. The revalidatePath function lets you purge the cache for a specific route so the next visit gets fresh data.\n\nrevalidatePath accepts a path string and optionally a type parameter. Calling revalidatePath(\"/blog\") will revalidate the page data for the /blog route. You can also pass \"layout\" as the second argument to revalidate everything under a specific layout, which is useful for revalidating an entire section of your site.\n\nIt is important to understand that revalidatePath does not immediately re-render the page. It marks the cached data as stale, so the next request to that path will trigger a fresh render. In a Server Action context, the client will automatically refetch the page after the action completes, so users see updated content.",
    codeExample: {
      code: `"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function publishPost(postId: string) {
  await db.post.update({
    where: { id: postId },
    data: { published: true, publishedAt: new Date() },
  });

  // Revalidate the specific post page
  revalidatePath(\`/blog/\${postId}\`);

  // Also revalidate the blog listing page
  revalidatePath("/blog");

  // Revalidate everything under /dashboard layout
  revalidatePath("/dashboard", "layout");
}

export async function deletePost(postId: string) {
  await db.post.delete({ where: { id: postId } });

  // After deletion, revalidate the listing
  revalidatePath("/blog");

  // Revalidate the home page if it shows recent posts
  revalidatePath("/");
}`,
      language: "typescript",
      title: "Using revalidatePath after mutations",
    },
    keyTakeaway:
      "Remember: Call revalidatePath after data mutations to purge stale cache. It marks data as stale so the next request gets a fresh render.",
  },

  // 13. revalidateTag and cache tags
  {
    id: "nextjs-tip-revalidate-tag",
    trackId: "nextjs",
    category: "Data Fetching",
    title: "revalidateTag and Cache Tags",
    content:
      "While revalidatePath works for individual routes, revalidateTag provides more granular cache control using tags. When you fetch data, you can tag the request with one or more string identifiers. Later, calling revalidateTag with one of those tags will invalidate all cached data associated with it.\n\nThis is especially powerful when the same data appears on multiple pages. For example, if a user's profile data is displayed on their profile page, a dashboard, and a settings page, you can tag all those fetches with the same tag. Updating the profile only requires one revalidateTag call instead of multiple revalidatePath calls.\n\nTags are assigned using the next.tags option in the fetch function's configuration object. You can assign multiple tags to a single fetch, and a single tag can be shared across many fetches. This gives you a flexible, declarative caching strategy.",
    codeExample: {
      code: `// Tagging fetch requests with cache tags
async function getUser(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}\`, {
    next: { tags: [\`user-\${userId}\`, "users"] },
  });
  return res.json();
}

async function getUserPosts(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/posts\`, {
    next: { tags: [\`user-\${userId}\`, "posts"] },
  });
  return res.json();
}

// app/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function updateUserProfile(userId: string, data: FormData) {
  await fetch(\`https://api.example.com/users/\${userId}\`, {
    method: "PATCH",
    body: JSON.stringify(Object.fromEntries(data)),
  });

  // Revalidate ALL data tagged with this user
  // This covers profile page, dashboard, settings, etc.
  revalidateTag(\`user-\${userId}\`);
}

export async function clearAllPostsCaches() {
  // Revalidate every fetch tagged with "posts"
  revalidateTag("posts");
}`,
      language: "typescript",
      title: "Tagging fetches and revalidating by tag",
    },
    keyTakeaway:
      "Remember: Use cache tags with next.tags on fetches and revalidateTag for cross-page cache invalidation. One tag can invalidate many cached requests at once.",
  },

  // 14. ISR (Incremental Static Regeneration)
  {
    id: "nextjs-tip-isr",
    trackId: "nextjs",
    category: "Optimization",
    title: "ISR (Incremental Static Regeneration)",
    content:
      "Incremental Static Regeneration lets you create or update static pages after you have built your site, without needing a full rebuild. In the App Router, ISR is configured through the revalidate option on fetch requests or by exporting a revalidate constant from a page or layout.\n\nWhen you set revalidate to a number (in seconds), Next.js will serve the cached static page to visitors until the revalidation period expires. The first request after the period triggers a background regeneration. The stale page is still served to the current visitor, but subsequent visitors get the freshly generated page. This is called stale-while-revalidate.\n\nISR is perfect for content that changes periodically but does not need to be real-time. Blog posts, product listings, documentation pages, and marketing pages are all great candidates. You get the performance of static pages with the freshness of server rendering.",
    codeExample: {
      code: `// Option 1: Per-fetch revalidation
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// Option 2: Page-level revalidation
// app/blog/page.tsx
export const revalidate = 3600; // Revalidate this page every hour

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Option 3: Opt into fully static (no revalidation)
export const revalidate = false; // Never revalidate, fully static

// Option 4: Opt into fully dynamic (revalidate every request)
export const dynamic = "force-dynamic"; // Re-render on every request`,
      language: "tsx",
      title: "Configuring ISR with different revalidation strategies",
    },
    keyTakeaway:
      "Remember: Set revalidate to a number of seconds for ISR. Pages are served from cache and regenerated in the background after the interval expires.",
  },

  // 15. generateStaticParams
  {
    id: "nextjs-tip-generate-static-params",
    trackId: "nextjs",
    category: "Optimization",
    title: "generateStaticParams",
    content:
      "generateStaticParams is the App Router way to pre-render dynamic routes at build time. It replaces getStaticPaths from the Pages Router. You export an async function that returns an array of parameter objects, and Next.js generates a static page for each one.\n\nThis function runs at build time and tells Next.js which dynamic route segments to pre-render. For a route like app/blog/[slug]/page.tsx, you would return an array of objects like [{ slug: \"first-post\" }, { slug: \"second-post\" }]. Each object corresponds to one URL that will be statically generated.\n\nWhen combined with dynamicParams (which defaults to true), pages not returned by generateStaticParams are generated on-demand and then cached. Setting dynamicParams to false returns a 404 for any params not in the list. This gives you full control over which pages exist in your application.",
    codeExample: {
      code: `// app/blog/[slug]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

// Generate static pages for all published posts at build time
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Optional: Return 404 for slugs not in the list
// export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Works with multiple params too:
// app/shop/[category]/[product]/page.tsx
export async function generateStaticParams() {
  const products = await db.product.findMany({
    include: { category: true },
  });

  return products.map((p) => ({
    category: p.category.slug,
    product: p.slug,
  }));
}`,
      language: "tsx",
      title: "Pre-rendering dynamic routes with generateStaticParams",
    },
    keyTakeaway:
      "Remember: generateStaticParams pre-renders dynamic routes at build time. Set dynamicParams to false if you want unlisted params to return 404.",
    relatedDrillId: "drill-next-static-params",
  },

  // 16. generateMetadata
  {
    id: "nextjs-tip-generate-metadata",
    trackId: "nextjs",
    category: "Optimization",
    title: "generateMetadata for SEO",
    content:
      "Next.js provides a powerful Metadata API for managing your page's head elements like title, description, and Open Graph tags. You can export a static metadata object for simple cases or a generateMetadata function for dynamic metadata that depends on route params or fetched data.\n\ngenerateMetadata is an async function that receives the same params and searchParams as your page component. This means you can fetch data to generate metadata dynamically. Next.js automatically deduplicates fetch requests between generateMetadata and the page component, so the same data is not fetched twice.\n\nMetadata is inherited and merged from parent layouts to child pages. A root layout might set a default title template, and individual pages override just the title. This composable approach keeps your SEO configuration DRY and consistent across your entire site.",
    codeExample: {
      code: `// app/layout.tsx — Base metadata with template
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | My App",
    default: "My App",
  },
  description: "A modern web application",
  openGraph: {
    siteName: "My App",
  },
};

// app/blog/[slug]/page.tsx — Dynamic metadata
import type { Metadata } from "next";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title, // Becomes "Post Title | My App"
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}`,
      language: "tsx",
      title: "Static and dynamic metadata with generateMetadata",
    },
    keyTakeaway:
      "Remember: Use generateMetadata for dynamic SEO. Metadata is inherited from layouts and merged, so child pages only need to override what changes.",
  },

  // 17. Middleware basics
  {
    id: "nextjs-tip-middleware-basics",
    trackId: "nextjs",
    category: "Routing",
    title: "Middleware Basics",
    content:
      "Middleware in Next.js runs before a request is completed, allowing you to modify the response by rewriting, redirecting, or modifying request/response headers. The middleware function runs at the edge, close to users, making it fast for tasks like authentication checks, A/B testing, and geolocation-based routing.\n\nYou create middleware by exporting a function from a middleware.ts file at the root of your project (next to app or src). The function receives a NextRequest object and should return a NextResponse. You can control which paths the middleware runs on using the config export with a matcher pattern.\n\nMiddleware is powerful but has limitations. It runs in the Edge Runtime, which means you cannot use Node.js APIs like fs or certain npm packages. Keep middleware lightweight and focused on request-level concerns like authentication, redirects, and header manipulation.",
    codeExample: {
      code: `// middleware.ts (at project root, next to app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Add custom headers
  const response = NextResponse.next();
  response.headers.set("x-request-id", crypto.randomUUID());

  // Example: Check authentication
  const token = request.cookies.get("auth-token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Example: Geolocation-based routing
  const country = request.geo?.country || "US";
  response.headers.set("x-user-country", country);

  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    // Skip static files and images
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};`,
      language: "typescript",
      title: "Basic middleware with authentication and custom headers",
    },
    keyTakeaway:
      "Remember: Middleware runs at the edge before requests complete. Use the matcher config to control which paths it applies to.",
  },

  // 18. Middleware redirects
  {
    id: "nextjs-tip-middleware-redirects",
    trackId: "nextjs",
    category: "Routing",
    title: "Middleware Redirects and Rewrites",
    content:
      "Middleware is the ideal place to handle complex redirect logic that depends on runtime conditions like user roles, feature flags, or request properties. Unlike static redirects in next.config.js, middleware redirects can use dynamic logic and access cookies, headers, and geo data.\n\nRedirects change the URL in the browser and send a 307 (temporary) or 308 (permanent) status code. Rewrites, on the other hand, serve a different page without changing the URL. This is useful for A/B testing, multi-tenant apps, and internationalization where you want /about to serve /en/about or /fr/about based on the user's locale.\n\nYou can also use NextResponse.rewrite to proxy requests to external URLs, though this should be done carefully for performance and security reasons. For simple redirect rules that do not need runtime logic, prefer the redirects configuration in next.config.js as they are more performant.",
    codeExample: {
      code: `// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect: old URL structure to new
  if (pathname.startsWith("/old-blog")) {
    const newPath = pathname.replace("/old-blog", "/blog");
    return NextResponse.redirect(new URL(newPath, request.url), 308);
  }

  // Rewrite: A/B testing (URL stays the same)
  const bucket = request.cookies.get("ab-bucket")?.value;
  if (pathname === "/pricing" && bucket === "b") {
    return NextResponse.rewrite(
      new URL("/pricing-variant-b", request.url)
    );
  }

  // Rewrite: Multi-tenant based on subdomain
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  if (subdomain !== "www" && subdomain !== "localhost") {
    return NextResponse.rewrite(
      new URL(\`/tenants/\${subdomain}\${pathname}\`, request.url)
    );
  }

  return NextResponse.next();
}`,
      language: "typescript",
      title: "Redirects and rewrites with middleware",
    },
    keyTakeaway:
      "Remember: Use redirects to change URLs (browser sees new URL) and rewrites to serve different content without changing the URL.",
  },

  // 19. Image optimization (next/image)
  {
    id: "nextjs-tip-image-optimization",
    trackId: "nextjs",
    category: "Optimization",
    title: "Image Optimization with next/image",
    content:
      "The next/image component automatically optimizes images by resizing, converting to modern formats like WebP or AVIF, and lazy loading them by default. This can dramatically reduce page size and improve Core Web Vitals, especially Largest Contentful Paint (LCP).\n\nAll images require width and height props (or the fill prop) to prevent Cumulative Layout Shift. For remote images, you must configure allowed domains in next.config.js using the images.remotePatterns setting. Local images imported as modules automatically provide dimensions.\n\nThe priority prop should be added to the largest above-the-fold image (typically the hero image or LCP element) to preload it. Without priority, images are lazy loaded, which is great for below-the-fold images but can hurt LCP for critical images. Only one or two images per page should have priority set.",
    codeExample: {
      code: `import Image from "next/image";
import heroImage from "@/public/hero.jpg"; // Local import

export default function ProductPage() {
  return (
    <div>
      {/* Local image: dimensions auto-detected */}
      <Image
        src={heroImage}
        alt="Hero banner"
        priority // Preload — this is the LCP image
        placeholder="blur" // Shows blurred version while loading
      />

      {/* Remote image: dimensions required */}
      <Image
        src="https://cdn.example.com/product.jpg"
        alt="Product photo"
        width={800}
        height={600}
        className="rounded-lg"
      />

      {/* Fill mode: image fills its positioned parent */}
      <div className="relative h-64 w-full">
        <Image
          src="https://cdn.example.com/banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

// next.config.ts — Allow remote images
// images: {
//   remotePatterns: [
//     { protocol: "https", hostname: "cdn.example.com" },
//   ],
// }`,
      language: "tsx",
      title: "Using next/image with local, remote, and fill images",
    },
    keyTakeaway:
      "Remember: Add priority to your LCP image, use fill for flexible containers, and configure remotePatterns for external image domains.",
    relatedDrillId: "drill-next-image-optimization",
  },

  // 20. Font optimization (next/font)
  {
    id: "nextjs-tip-font-optimization",
    trackId: "nextjs",
    category: "Optimization",
    title: "Font Optimization with next/font",
    content:
      "next/font automatically optimizes and self-hosts fonts, eliminating external network requests to Google Fonts or other providers. This improves privacy (no requests to Google) and performance (no render-blocking font loads). Fonts are downloaded at build time and served from your own domain.\n\nGoogle Fonts are available through next/font/google, and custom fonts through next/font/local. The font function returns an object with a className property that you apply to your HTML elements. You can configure weight, subsets, display strategy, and CSS variable names.\n\nDefine your fonts in your root layout and apply them to the body element. For multiple fonts, create CSS variables and reference them in your Tailwind config or stylesheets. The variable option is particularly useful with Tailwind CSS, as it lets you use fonts with utility classes like font-sans or font-mono.",
    codeExample: {
      code: `// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={\`\${inter.variable} \${jetbrainsMono.variable}\`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// tailwind.config.ts — Use the CSS variables
// fontFamily: {
//   sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
//   mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
// }

// For local/custom fonts:
// import localFont from "next/font/local";
// const myFont = localFont({
//   src: "./fonts/MyFont.woff2",
//   display: "swap",
// });`,
      language: "tsx",
      title: "Self-hosting Google Fonts with next/font",
    },
    keyTakeaway:
      "Remember: next/font self-hosts fonts at build time. Use the variable option for Tailwind CSS integration and always set display: \"swap\".",
  },

  // 21. Parallel routes
  {
    id: "nextjs-tip-parallel-routes",
    trackId: "nextjs",
    category: "Routing",
    title: "Parallel Routes",
    content:
      "Parallel routes allow you to simultaneously render multiple pages in the same layout. They are defined using named slots with the @folder convention. Each slot is passed as a prop to the parent layout, and you can render them independently in different areas of your page.\n\nA common use case is a dashboard layout where you want to show multiple panels that load independently. Each panel can have its own loading.tsx and error.tsx, meaning one panel crashing or loading slowly does not affect the others.\n\nParallel routes also enable conditional rendering based on authentication state or user roles. You can show different content in the same slot depending on whether the user is logged in. Combined with intercepting routes, parallel routes power patterns like modals that can also be opened as standalone pages.",
    codeExample: {
      code: `// File structure:
// app/dashboard/@analytics/page.tsx
// app/dashboard/@activity/page.tsx
// app/dashboard/@notifications/page.tsx
// app/dashboard/layout.tsx

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,          // app/dashboard/page.tsx
  analytics,         // app/dashboard/@analytics/page.tsx
  activity,          // app/dashboard/@activity/page.tsx
  notifications,     // app/dashboard/@notifications/page.tsx
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  activity: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {children}
        {analytics}
      </div>
      <div className="col-span-1">
        {notifications}
        {activity}
      </div>
    </div>
  );
}

// app/dashboard/@analytics/page.tsx
export default async function AnalyticsPanel() {
  const data = await fetchAnalytics(); // Independent loading
  return <div>Charts: {data.totalVisits}</div>;
}

// app/dashboard/@analytics/loading.tsx
export default function AnalyticsLoading() {
  return <div className="animate-pulse h-64 bg-gray-200" />;
}`,
      language: "tsx",
      title: "Parallel routes for independent dashboard panels",
    },
    keyTakeaway:
      "Remember: Parallel routes use @folder naming and render as slot props in the parent layout. Each slot can have independent loading and error states.",
  },

  // 22. Intercepting routes
  {
    id: "nextjs-tip-intercepting-routes",
    trackId: "nextjs",
    category: "Routing",
    title: "Intercepting Routes",
    content:
      "Intercepting routes let you load a route from another part of your application within the current layout. The most common use case is showing a modal overlay when clicking a link, while the full page is still accessible via direct URL navigation or page refresh.\n\nIntercepting routes use a special convention with parentheses: (.) for the same level, (..) for one level up, (..)(..) for two levels up, and (...) for the app root. When combined with parallel routes, you can create modals that show content from a different route while preserving the current page context.\n\nFor example, in a photo gallery, clicking a photo can show it in a modal overlay (intercepted route) while keeping the gallery visible behind it. If the user shares the URL or refreshes, they see the photo on its own full page. This provides a polished UX where soft navigation uses modals and hard navigation uses full pages.",
    codeExample: {
      code: `// File structure for a photo gallery modal pattern:
// app/gallery/page.tsx           — Gallery grid
// app/gallery/@modal/(.)photo/[id]/page.tsx — Modal (intercepted)
// app/photo/[id]/page.tsx        — Full photo page (direct URL)
// app/gallery/layout.tsx         — Layout with modal slot

// app/gallery/layout.tsx
export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// app/gallery/@modal/(.)photo/[id]/page.tsx
// This intercepts /photo/[id] when navigating from gallery
import { Modal } from "@/components/Modal";

export default function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <img src={\`/photos/\${params.id}.jpg\`} alt="Photo" />
    </Modal>
  );
}

// app/gallery/@modal/default.tsx
// When no modal is active, render nothing
export default function Default() {
  return null;
}`,
      language: "tsx",
      title: "Intercepting routes for a photo gallery modal",
    },
    keyTakeaway:
      "Remember: Intercepting routes show content in a modal on soft navigation but render the full page on hard navigation. Combine with parallel routes using @modal slots.",
  },

  // 23. Route groups
  {
    id: "nextjs-tip-route-groups",
    trackId: "nextjs",
    category: "Routing",
    title: "Route Groups",
    content:
      "Route groups let you organize routes into logical groups without affecting the URL structure. You create a route group by wrapping a folder name in parentheses, like (marketing) or (dashboard). The parenthesized folder name is not included in the URL path.\n\nThis is especially useful when you want different sections of your app to use different layouts. For example, your marketing pages might use a simple layout with a hero section, while your dashboard pages use a sidebar layout. Route groups let you apply different root layouts to different sections without adding extra URL segments.\n\nRoute groups also help with code organization in large applications. You can group related routes together without changing their public URLs. For instance, (auth)/login and (auth)/register keep auth-related files together while maintaining /login and /register as the actual URLs.",
    codeExample: {
      code: `// File structure:
// app/(marketing)/layout.tsx     — Marketing layout
// app/(marketing)/page.tsx       — / (home page)
// app/(marketing)/about/page.tsx — /about
// app/(marketing)/pricing/page.tsx — /pricing
//
// app/(dashboard)/layout.tsx     — Dashboard layout
// app/(dashboard)/dashboard/page.tsx — /dashboard
// app/(dashboard)/settings/page.tsx  — /settings

// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-white shadow">
        <nav>Logo | Features | Pricing | Login</nav>
      </header>
      <main>{children}</main>
      <footer>Marketing Footer</footer>
    </div>
  );
}

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 text-white">
        Sidebar Navigation
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}`,
      language: "tsx",
      title: "Route groups for different layouts without URL changes",
    },
    keyTakeaway:
      "Remember: Route groups use (folderName) to organize routes and apply different layouts without adding segments to the URL path.",
    relatedDrillId: "drill-next-route-groups",
  },

  // 24. Environment variables
  {
    id: "nextjs-tip-env-variables",
    trackId: "nextjs",
    category: "Fundamentals",
    title: "Environment Variables (NEXT_PUBLIC_ vs Server)",
    content:
      "Next.js has a clear convention for environment variables. Variables prefixed with NEXT_PUBLIC_ are exposed to the browser and bundled into your client-side JavaScript. All other environment variables are only available on the server and are never sent to the client.\n\nThis distinction is critical for security. Database URLs, API secrets, and authentication keys should never have the NEXT_PUBLIC_ prefix. If you accidentally expose a secret with NEXT_PUBLIC_, it will be visible in your client-side JavaScript bundle and accessible to anyone who inspects your site.\n\nNext.js automatically loads variables from .env, .env.local, .env.development, and .env.production files. The .env.local file is for secrets and should be in your .gitignore. For type safety, you can create an env.ts validation file using Zod to ensure all required environment variables are present at build time.",
    codeExample: {
      code: `// .env.local (NEVER commit this file)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

// Server Component — can access ALL env vars
export default async function AdminPage() {
  // This is safe: only runs on the server
  const dbUrl = process.env.DATABASE_URL;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  return <div>Admin panel</div>;
}

// Client Component — can ONLY access NEXT_PUBLIC_ vars
"use client";
export function PaymentButton() {
  // This works: NEXT_PUBLIC_ vars are bundled for the client
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  // This would be undefined: server-only vars are not available
  // const secret = process.env.STRIPE_SECRET_KEY; // undefined!
  return <button>Pay</button>;
}

// lib/env.ts — Type-safe validation with Zod
import { z } from "zod";
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});
export const env = envSchema.parse(process.env);`,
      language: "tsx",
      title: "Server vs client environment variables",
    },
    keyTakeaway:
      "Remember: Only NEXT_PUBLIC_ variables are exposed to the browser. Never prefix secrets with NEXT_PUBLIC_ or they will be in your client bundle.",
  },

  // 25. Streaming with Suspense
  {
    id: "nextjs-tip-streaming-suspense",
    trackId: "nextjs",
    category: "Patterns",
    title: "Streaming with Suspense",
    content:
      "Streaming lets you progressively render UI from the server. Instead of waiting for all data to load before sending any HTML, Next.js can send the page shell immediately and stream in individual components as their data becomes available. This dramatically improves Time To First Byte (TTFB) and First Contentful Paint (FCP).\n\nYou enable streaming by wrapping async Server Components in Suspense boundaries. Each Suspense boundary defines an independent loading unit. The server sends the fallback immediately and streams in the resolved component when its data is ready. Multiple Suspense boundaries can resolve in parallel.\n\nThis pattern is particularly powerful for dashboards and pages with multiple data sources of varying speed. A fast database query might resolve in 50ms while a third-party API takes 2 seconds. With streaming, users see the fast content immediately instead of waiting for the slowest request.",
    codeExample: {
      code: `import { Suspense } from "react";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each section streams independently */}
      <Suspense fallback={<CardSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <RecentOrders />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable />
      </Suspense>

      <Suspense fallback={<ListSkeleton />}>
        <ActivityFeed />
      </Suspense>
    </div>
  );
}

// Each component fetches its own data
async function RevenueChart() {
  const data = await fetchRevenue(); // 100ms
  return <div>Revenue: \${data.total}</div>;
}

async function RecentOrders() {
  const orders = await fetchOrders(); // 200ms
  return <div>{orders.length} recent orders</div>;
}

async function CustomerTable() {
  // This slow fetch doesn't block RevenueChart or RecentOrders
  const customers = await fetchCustomers(); // 2000ms
  return <table>{/* render customers */}</table>;
}

function CardSkeleton() {
  return <div className="h-32 bg-gray-200 animate-pulse rounded" />;
}`,
      language: "tsx",
      title: "Streaming multiple dashboard sections with Suspense",
    },
    keyTakeaway:
      "Remember: Wrap async Server Components in Suspense to stream them independently. Fast components render immediately while slow ones show fallbacks.",
  },

  // 26. Dynamic rendering vs static
  {
    id: "nextjs-tip-dynamic-vs-static",
    trackId: "nextjs",
    category: "Patterns",
    title: "Dynamic Rendering vs Static Rendering",
    content:
      "Next.js automatically determines whether a page should be statically rendered at build time or dynamically rendered at request time. Understanding what triggers each mode is essential for performance optimization.\n\nA page is statically rendered by default. It becomes dynamic when it uses dynamic functions like cookies(), headers(), or searchParams, when it uses fetch with cache: \"no-store\", or when you export dynamic = \"force-dynamic\". Static pages are rendered once and cached, while dynamic pages are rendered fresh on every request.\n\nYou can check whether your pages are static or dynamic by looking at the build output. Next.js shows a circle icon for static pages and a lambda icon for dynamic ones. The goal is to keep as many pages static as possible and only opt into dynamic rendering when you genuinely need request-time data like user-specific content or real-time information.",
    codeExample: {
      code: `// STATIC: This page is rendered at build time (default)
export default async function AboutPage() {
  const content = await fetch("https://cms.example.com/about", {
    next: { revalidate: 3600 },
  });
  return <div>{content}</div>;
}

// DYNAMIC: Using cookies() makes the page dynamic
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const session = cookies().get("session");
  const user = await getUser(session?.value);
  return <div>Hello, {user.name}</div>;
}

// DYNAMIC: Using searchParams makes the page dynamic
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const results = await search(searchParams.q || "");
  return <div>{results.length} results</div>;
}

// Force static or dynamic explicitly
export const dynamic = "force-static";   // Always static
export const dynamic = "force-dynamic";  // Always dynamic

// Partial dynamic: Use Suspense to mix static and dynamic
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <div>
      <StaticProductInfo /> {/* Static shell */}
      <Suspense fallback={<Spinner />}>
        <DynamicReviews />  {/* Dynamic, streamed in */}
      </Suspense>
    </div>
  );
}`,
      language: "tsx",
      title: "Understanding static vs dynamic rendering triggers",
    },
    keyTakeaway:
      "Remember: Pages are static by default. Using cookies(), headers(), or searchParams makes them dynamic. Use Suspense to mix static and dynamic content.",
    relatedDrillId: "drill-next-dynamic-static",
  },

  // 27. useSearchParams hook
  {
    id: "nextjs-tip-use-search-params",
    trackId: "nextjs",
    category: "Routing",
    title: "useSearchParams Hook",
    content:
      "The useSearchParams hook from next/navigation reads the current URL's query string parameters in Client Components. It returns a read-only URLSearchParams object that you can use to get, check, and iterate over search parameters.\n\nSince useSearchParams is a client-side hook, the component using it must be a Client Component with the \"use client\" directive. To prevent the entire page from becoming dynamic, wrap the component that uses useSearchParams in a Suspense boundary. This allows the page shell to be statically rendered while the search-params-dependent portion streams in.\n\nTo update search params, combine useSearchParams with useRouter or usePathname. Create a new URLSearchParams instance, modify it, and then use router.push or router.replace with the new query string. This pattern is common for filters, pagination, and search interfaces.",
    codeExample: {
      code: `"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function ProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read current filter values
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";

  // Helper to create updated query strings
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-4">
      <select
        value={category}
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("category", e.target.value)
          );
        }}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <select
        value={sort}
        onChange={(e) => {
          router.replace(
            pathname + "?" + createQueryString("sort", e.target.value)
          );
        }}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
      </select>
    </div>
  );
}

// In the page: wrap in Suspense to keep the page static
// <Suspense fallback={<FilterSkeleton />}>
//   <ProductFilters />
// </Suspense>`,
      language: "tsx",
      title: "Reading and updating search params with useSearchParams",
    },
    keyTakeaway:
      "Remember: Wrap useSearchParams components in Suspense to avoid making the entire page dynamic. Use router.push to add history entries or router.replace to update in place.",
  },

  // 28. useRouter and navigation
  {
    id: "nextjs-tip-use-router",
    trackId: "nextjs",
    category: "Routing",
    title: "useRouter and Programmatic Navigation",
    content:
      "The useRouter hook from next/navigation provides programmatic navigation in Client Components. It offers methods like push, replace, refresh, back, forward, and prefetch for controlling navigation behavior.\n\nrouter.push() navigates to a new URL and adds a new entry to the browser's history stack. router.replace() navigates without adding a history entry, which is useful for redirects after form submissions or login flows. router.refresh() re-fetches Server Component data without losing client-side state.\n\nFor most navigation in Next.js, you should prefer the Link component over useRouter because Link provides automatic prefetching on hover and is semantically correct. Reserve useRouter for cases where navigation needs to happen in response to non-link interactions, like after a form submission, a timeout, or a complex user gesture.",
    codeExample: {
      code: `"use client";

import { useRouter } from "next/navigation";

export function NavigationExamples() {
  const router = useRouter();

  async function handleFormSubmit(data: FormData) {
    const res = await fetch("/api/submit", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      // Navigate after success, no back button to form
      router.replace("/thank-you");
    }
  }

  function handleLogout() {
    // Clear auth state, then redirect
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    router.push("/login");
  }

  return (
    <div>
      <button onClick={() => router.push("/dashboard")}>
        Go to Dashboard
      </button>

      <button onClick={() => router.back()}>
        Go Back
      </button>

      <button onClick={() => router.refresh()}>
        Refresh Server Data
      </button>

      <button onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

// Prefer Link for regular navigation:
// import Link from "next/link";
// <Link href="/about">About</Link>
//
// Link prefetches automatically on hover.
// useRouter.push does NOT prefetch by default.
// Use router.prefetch("/path") explicitly if needed.`,
      language: "tsx",
      title: "Programmatic navigation with useRouter",
    },
    keyTakeaway:
      "Remember: Prefer the Link component for regular navigation. Use useRouter for programmatic navigation after form submissions, auth flows, or conditional logic.",
  },

  // 29. Hydration mismatch gotchas
  {
    id: "nextjs-tip-hydration-mismatch",
    trackId: "nextjs",
    category: "Gotchas",
    title: "Hydration Mismatch Gotchas",
    content:
      "Hydration mismatches occur when the HTML rendered on the server does not match what React expects to render on the client. Next.js shows an error in development when this happens. The most common causes are using browser-only APIs like window or localStorage during the initial render, rendering dates or timestamps that differ between server and client, and browser extensions that modify the DOM.\n\nTo fix hydration issues caused by browser-only values, use the useEffect hook to set the value after hydration. You can create a custom hook like useIsClient that returns false on the server and true after the component mounts on the client. Another approach is to use the suppressHydrationWarning prop on elements where mismatches are expected and harmless.\n\nIncorrect HTML nesting also causes hydration errors. For example, putting a div inside a p tag or nesting interactive elements. Browsers auto-correct invalid HTML, but their corrections may differ from what React rendered on the server, causing a mismatch.",
    codeExample: {
      code: `"use client";

import { useState, useEffect } from "react";

// BAD: This causes a hydration mismatch
function BadTimestamp() {
  // Date.now() returns different values on server vs client
  return <span>{new Date().toLocaleTimeString()}</span>;
}

// GOOD: Defer browser-only values to useEffect
function GoodTimestamp() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Render null or placeholder on server, real value on client
  if (!time) return <span>--:--:--</span>;
  return <span>{time}</span>;
}

// BAD: window is not available on the server
function BadThemeCheck() {
  // This crashes on the server!
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return <div className={isDark ? "dark" : "light"}>Content</div>;
}

// GOOD: Check browser APIs after mount
function GoodThemeCheck() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  return <div className={isDark ? "dark" : "light"}>Content</div>;
}

// For harmless mismatches (like timestamps from a CMS):
// <time suppressHydrationWarning>{serverTimestamp}</time>`,
      language: "tsx",
      title: "Common hydration mismatch causes and fixes",
    },
    keyTakeaway:
      "Remember: Never access window, localStorage, or other browser APIs during the initial render. Use useEffect to set browser-dependent values after hydration.",
    relatedDrillId: "drill-next-hydration",
  },

  // 30. Common "use client" boundary mistakes
  {
    id: "nextjs-tip-use-client-mistakes",
    trackId: "nextjs",
    category: "Gotchas",
    title: "Common \"use client\" Boundary Mistakes",
    content:
      "One of the most common mistakes in Next.js App Router development is placing the \"use client\" directive too high in the component tree. When you add \"use client\" to a file, every component imported into that file also becomes a Client Component. This can accidentally turn your entire app into a client-rendered SPA, negating the benefits of Server Components.\n\nAnother frequent mistake is trying to import a Server Component into a Client Component directly. This does not work because Client Components cannot import Server Components. Instead, pass Server Components as children or through other React node props. The parent can be a Server Component that renders a Client Component and passes Server Component children into it.\n\nPeople also commonly add \"use client\" just because they see an error about hooks, without considering whether they can refactor the interactive part into a smaller component. Before adding \"use client\", always ask: can I extract just the interactive piece into its own Client Component and keep the rest on the server?",
    codeExample: {
      code: `// MISTAKE 1: "use client" too high in the tree
// app/page.tsx
"use client"; // BAD: Makes the entire page a Client Component
import { HeavyDataTable } from "./DataTable"; // Now also client!

// FIX: Keep the page as Server Component, extract interactivity
// app/page.tsx (Server Component)
import { SearchBar } from "./SearchBar"; // Only this is "use client"
import { DataTable } from "./DataTable"; // Stays on server

export default async function Page() {
  const data = await fetchData(); // Server-side fetch
  return (
    <div>
      <SearchBar />          {/* Client Component */}
      <DataTable data={data} /> {/* Server Component */}
    </div>
  );
}

// MISTAKE 2: Importing Server Component in Client Component
"use client";
import { ServerWidget } from "./ServerWidget"; // Won't work as expected!

// FIX: Pass Server Components as children props
// Layout or parent (Server Component)
import { ClientShell } from "./ClientShell";
import { ServerWidget } from "./ServerWidget";

export default function Layout() {
  return (
    <ClientShell>
      <ServerWidget /> {/* Passed as children, stays server-rendered */}
    </ClientShell>
  );
}

// ClientShell.tsx
"use client";
export function ClientShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children} {/* Server Component rendered here */}
    </div>
  );
}`,
      language: "tsx",
      title: "Common \"use client\" mistakes and how to fix them",
    },
    keyTakeaway:
      "Remember: Pass Server Components as children to Client Components instead of importing them. Push \"use client\" to the smallest possible component.",
    relatedDrillId: "drill-next-client-boundary-mistakes",
  },
];
