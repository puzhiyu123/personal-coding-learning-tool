export interface PatternFlashcard {
  id: string;
  category: string;
  front: string;
  back: {
    answer: string;
    examples: {
      label: string;
      recommendation: string;
    }[];
    codeExample?: {
      code: string;
      language: string;
      title: string;
    };
  };
  tags: string[];
}

export const patternFlashcards: PatternFlashcard[] = [
  // ============================================================
  // REACT PATTERNS (~12)
  // ============================================================
  {
    id: "react-usestate-vs-usereducer",
    category: "React Patterns",
    front: "When would you choose useReducer over useState?",
    back: {
      answer:
        "Choose useReducer when state transitions are complex, interdependent, or when the next state depends on the previous one in non-trivial ways. useState is better for simple, independent pieces of state.",
      examples: [
        {
          label: "Form with many fields and validation",
          recommendation:
            "useReducer — centralize validation logic and handle interdependent field updates in one place.",
        },
        {
          label: "Simple boolean toggle",
          recommendation:
            "useState — a single setter call is clearer than dispatching an action for trivial state.",
        },
        {
          label: "Undo/redo functionality",
          recommendation:
            "useReducer — naturally models state history with action-based transitions.",
        },
        {
          label: "Counter with increment/decrement",
          recommendation:
            "useState — unless you need to share the dispatch function deep in a tree via context.",
        },
      ],
      codeExample: {
        title: "useReducer for form state",
        language: "typescript",
        code: `type Action =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "RESET" };

function formReducer(state: FormState, action: Action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
  }
}`,
      },
    },
    tags: ["react", "hooks", "state-management"],
  },
  {
    id: "react-controlled-vs-uncontrolled",
    category: "React Patterns",
    front: "When should you use controlled vs uncontrolled components?",
    back: {
      answer:
        "Use controlled components when you need to validate, transform, or react to input changes in real time. Use uncontrolled components when you only need the value at submission or want simpler code for non-critical forms.",
      examples: [
        {
          label: "Search with live filtering",
          recommendation:
            "Controlled — you need the value on every keystroke to filter results.",
        },
        {
          label: "Simple contact form",
          recommendation:
            "Uncontrolled with useRef or FormData — less boilerplate, grab values on submit.",
        },
        {
          label: "Input with character limit and formatting",
          recommendation:
            "Controlled — intercept changes to enforce max length and format (e.g., phone number masking).",
        },
      ],
      codeExample: {
        title: "Controlled vs Uncontrolled",
        language: "typescript",
        code: `// Controlled — React owns the value
const [query, setQuery] = useState("");
<input value={query} onChange={e => setQuery(e.target.value)} />

// Uncontrolled — DOM owns the value
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} defaultValue="" />
const value = inputRef.current?.value;`,
      },
    },
    tags: ["react", "forms", "components"],
  },
  {
    id: "react-lifting-state-up",
    category: "React Patterns",
    front: "When should you lift state up vs keep it local?",
    back: {
      answer:
        "Lift state up when two or more sibling components need to share or synchronize the same data. Keep state local when only one component (and its children) care about it — lifting prematurely causes unnecessary re-renders and complexity.",
      examples: [
        {
          label: "Filter bar and results list as siblings",
          recommendation:
            "Lift state — the filter value must be shared so the list can react to changes.",
        },
        {
          label: "Accordion open/close toggle",
          recommendation:
            "Keep local — only the accordion item itself needs to know if it is open.",
        },
        {
          label: "Shopping cart total shown in header and checkout",
          recommendation:
            "Lift to a shared ancestor or use context — multiple distant components need the same data.",
        },
      ],
    },
    tags: ["react", "state-management", "architecture"],
  },
  {
    id: "react-composition-vs-inheritance",
    category: "React Patterns",
    front: "Why does React favor composition over inheritance for component reuse?",
    back: {
      answer:
        "Composition lets you assemble behavior by combining components via props and children, avoiding rigid hierarchies. Inheritance creates tight coupling and makes it hard to change one layer without breaking descendants. React's children prop and render-slot patterns give you all the flexibility you need.",
      examples: [
        {
          label: "Shared card layout with varying content",
          recommendation:
            "Composition — pass content via children prop. Avoid creating a BaseCard class to extend.",
        },
        {
          label: "Button variants (primary, secondary, danger)",
          recommendation:
            "Composition — one Button component that accepts a variant prop, not three subclasses.",
        },
        {
          label: "Dialog with custom header and footer",
          recommendation:
            "Composition — accept header and footer as props or use named slots via props.",
        },
      ],
      codeExample: {
        title: "Composition with slots",
        language: "typescript",
        code: `function Card({ header, children, footer }: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}`,
      },
    },
    tags: ["react", "components", "design-patterns"],
  },
  {
    id: "react-render-props-vs-hooks",
    category: "React Patterns",
    front: "When would you still use render props instead of custom hooks?",
    back: {
      answer:
        "Custom hooks replaced most render-prop use cases, but render props are still useful when you need to invert control of rendering — for example in libraries that need to pass data to a consumer-defined render function without knowing the component tree shape ahead of time.",
      examples: [
        {
          label: "Sharing fetch logic across components",
          recommendation:
            "Custom hook — useFetch() is cleaner than a <Fetch render={data => ...} /> wrapper.",
        },
        {
          label: "Headless component library (e.g., Downshift, React Aria)",
          recommendation:
            "Render props or hooks — render props let consumers fully own the markup while the library owns behavior.",
        },
        {
          label: "Mouse/scroll position tracking",
          recommendation:
            "Custom hook — useMousePosition() avoids a wrapper component and extra nesting.",
        },
      ],
    },
    tags: ["react", "hooks", "design-patterns"],
  },
  {
    id: "react-key-prop",
    category: "React Patterns",
    front: "Why does the key prop matter and when should you not use array index as key?",
    back: {
      answer:
        "The key prop tells React which items in a list have changed, been added, or removed. Using array indices as keys causes bugs when the list order changes — React reuses the wrong DOM nodes, leading to stale state in child components.",
      examples: [
        {
          label: "Static list that never reorders",
          recommendation:
            "Index as key is acceptable when the list is stable and items have no local state.",
        },
        {
          label: "Sortable/filterable list with inputs",
          recommendation:
            "Use a stable unique ID — index keys will cause input values to stick to the wrong items.",
        },
        {
          label: "Resetting a component's state",
          recommendation:
            "Change the key to force React to unmount and remount the component with fresh state.",
        },
      ],
      codeExample: {
        title: "Key as reset mechanism",
        language: "typescript",
        code: `// Changing the key forces a full remount
<UserProfile key={userId} userId={userId} />

// Bad: index key with reorderable list
{items.map((item, i) => <Item key={i} {...item} />)}

// Good: stable ID key
{items.map(item => <Item key={item.id} {...item} />)}`,
      },
    },
    tags: ["react", "performance", "lists"],
  },
  {
    id: "react-memo-usememo-usecallback",
    category: "React Patterns",
    front: "When should you use React.memo, useMemo, and useCallback — and when are they wasteful?",
    back: {
      answer:
        "Use these only when you have measured a performance problem. React.memo skips re-rendering a child if props haven't changed. useMemo caches expensive computations. useCallback stabilizes function references for memoized children. All add memory overhead and code complexity, so avoid them for cheap operations.",
      examples: [
        {
          label: "Large list item rendered 1000+ times",
          recommendation:
            "React.memo — prevents re-rendering every item when the parent re-renders.",
        },
        {
          label: "Simple text component",
          recommendation:
            "Skip memoization — the cost of comparing props may exceed the cost of re-rendering.",
        },
        {
          label: "Callback passed to a memoized child",
          recommendation:
            "useCallback — stabilize the reference so React.memo on the child actually works.",
        },
        {
          label: "Filtering a large dataset on render",
          recommendation:
            "useMemo — avoid re-filtering thousands of items on every unrelated state change.",
        },
      ],
      codeExample: {
        title: "Memoization trio",
        language: "typescript",
        code: `const ExpensiveList = memo(({ items, onSelect }: Props) => (
  <ul>{items.map(i => <li key={i.id} onClick={() => onSelect(i.id)}>{i.name}</li>)}</ul>
));

function Parent({ data }: { data: Item[] }) {
  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => data.filter(d => d.name.includes(filter)), [data, filter]);
  const handleSelect = useCallback((id: string) => { /* ... */ }, []);
  return <ExpensiveList items={filtered} onSelect={handleSelect} />;
}`,
      },
    },
    tags: ["react", "performance", "hooks"],
  },
  {
    id: "react-error-boundaries",
    category: "React Patterns",
    front: "When and where should you place error boundaries in your React app?",
    back: {
      answer:
        "Error boundaries catch rendering errors in their subtree and display a fallback UI instead of crashing the whole app. Place them at strategic layout boundaries — around routes, feature sections, or third-party widgets — so a failure in one area doesn't take down the entire page.",
      examples: [
        {
          label: "App root level",
          recommendation:
            "Place one at the root as a last-resort catch-all with a full-page error message.",
        },
        {
          label: "Per-route level",
          recommendation:
            "Wrap each page/route so a crash on one page still lets users navigate to others.",
        },
        {
          label: "Around a third-party widget",
          recommendation:
            "Isolate unreliable components so they fail gracefully without affecting your own code.",
        },
      ],
    },
    tags: ["react", "error-handling", "architecture"],
  },
  {
    id: "react-portals",
    category: "React Patterns",
    front: "When should you use React Portals?",
    back: {
      answer:
        "Use portals when a component needs to visually break out of its parent's DOM hierarchy — typically for overlays, modals, tooltips, and toasts — while still belonging to the React component tree for event bubbling and context access.",
      examples: [
        {
          label: "Modal dialog",
          recommendation:
            "Portal to document.body — avoids z-index and overflow:hidden issues from parent containers.",
        },
        {
          label: "Tooltip that overflows a scrollable container",
          recommendation:
            "Portal — prevents the tooltip from being clipped by the parent's overflow.",
        },
        {
          label: "Inline form validation message",
          recommendation:
            "No portal needed — the message lives naturally within its parent layout.",
        },
      ],
      codeExample: {
        title: "Portal for a modal",
        language: "typescript",
        code: `import { createPortal } from "react-dom";

function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
}`,
      },
    },
    tags: ["react", "dom", "ui-patterns"],
  },
  {
    id: "react-suspense",
    category: "React Patterns",
    front: "When should you use React Suspense and what problems does it solve?",
    back: {
      answer:
        "Suspense lets you declaratively show fallback UI while waiting for asynchronous operations (lazy-loaded components, data fetching in frameworks like Next.js). It simplifies loading-state management by moving it out of individual components and into the tree structure.",
      examples: [
        {
          label: "Code-split route",
          recommendation:
            "Wrap lazy-loaded pages in Suspense with a skeleton or spinner fallback.",
        },
        {
          label: "Next.js server component fetching data",
          recommendation:
            "Suspense with loading.tsx — streams HTML progressively as data resolves.",
        },
        {
          label: "Synchronous component with no async work",
          recommendation:
            "No Suspense needed — it adds unnecessary complexity when there is nothing to wait for.",
        },
      ],
    },
    tags: ["react", "async", "performance"],
  },
  {
    id: "react-lazy-loading",
    category: "React Patterns",
    front: "When should you lazy-load components and when is it counterproductive?",
    back: {
      answer:
        "Lazy-load components that are large, rarely visited, or behind user interaction (modals, tabs, routes). Avoid lazy-loading small components or critical above-the-fold content — the extra network request adds latency that outweighs the bundle savings.",
      examples: [
        {
          label: "Admin dashboard page (rarely accessed)",
          recommendation:
            "Lazy-load — most users never visit it, so exclude it from the main bundle.",
        },
        {
          label: "Heavy chart library used in one tab",
          recommendation:
            "Lazy-load — only fetch the charting code when the user clicks that tab.",
        },
        {
          label: "Navigation bar present on every page",
          recommendation:
            "Eagerly load — it is always visible, so lazy-loading just delays rendering.",
        },
      ],
      codeExample: {
        title: "Lazy-loaded route",
        language: "typescript",
        code: `import { lazy, Suspense } from "react";

const AdminPage = lazy(() => import("./AdminPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPage />
    </Suspense>
  );
}`,
      },
    },
    tags: ["react", "performance", "code-splitting"],
  },
  {
    id: "react-context-vs-prop-drilling",
    category: "React Patterns",
    front: "When should you use React Context instead of prop drilling?",
    back: {
      answer:
        "Use Context when data needs to bypass many intermediate components that do not use it (theme, auth, locale). Stick with props when data flows through only 1-2 levels or when the intermediate components meaningfully transform or use the data. Over-using Context causes unnecessary re-renders of all consumers.",
      examples: [
        {
          label: "Theme/dark mode preference",
          recommendation:
            "Context — nearly every component may need it, and it changes infrequently.",
        },
        {
          label: "Passing an onClick handler to a direct child",
          recommendation:
            "Props — one level of passing is not drilling, and it keeps data flow explicit.",
        },
        {
          label: "Authenticated user available app-wide",
          recommendation:
            "Context — avoids threading user data through every layout and page component.",
        },
        {
          label: "Frequently changing data like cursor position",
          recommendation:
            "Avoid Context for this — every consumer re-renders on each change. Use a ref or external store.",
        },
      ],
    },
    tags: ["react", "state-management", "architecture"],
  },

  // ============================================================
  // NEXT.JS DECISIONS (~10)
  // ============================================================
  {
    id: "nextjs-server-vs-client-components",
    category: "Next.js Decisions",
    front: "How do you decide whether a component should be a Server Component or Client Component in Next.js?",
    back: {
      answer:
        "Default to Server Components — they run only on the server, ship zero JS to the client, and can directly access databases/APIs. Switch to Client Components only when you need interactivity (event handlers, hooks, browser APIs). Push 'use client' as far down the tree as possible.",
      examples: [
        {
          label: "Blog post page with static content",
          recommendation:
            "Server Component — no interactivity needed, benefits from zero JS bundle.",
        },
        {
          label: "Search input with live filtering",
          recommendation:
            "Client Component — needs onChange handler, useState, and real-time user interaction.",
        },
        {
          label: "Product card showing data from DB",
          recommendation:
            "Server Component — fetch data on the server, no client JS required for display.",
        },
        {
          label: "Interactive image carousel",
          recommendation:
            "Client Component — needs swipe/click handlers, animation state, and possibly IntersectionObserver.",
        },
      ],
    },
    tags: ["nextjs", "server-components", "architecture"],
  },
  {
    id: "nextjs-use-client-directive",
    category: "Next.js Decisions",
    front: "When should you add the 'use client' directive and where should you place it?",
    back: {
      answer:
        "Add 'use client' at the top of files that use hooks, event handlers, or browser-only APIs. Place it at the lowest possible component in the tree — create small client 'leaf' components and keep parent layout components on the server to minimize client-shipped JavaScript.",
      examples: [
        {
          label: "A layout with one interactive button",
          recommendation:
            "Extract the button into its own 'use client' file. Keep the layout as a Server Component.",
        },
        {
          label: "Page that imports useState",
          recommendation:
            "Needs 'use client' — but consider extracting just the stateful part into a child component.",
        },
        {
          label: "Utility function with no React APIs",
          recommendation:
            "No directive needed — plain functions work in both server and client modules.",
        },
      ],
      codeExample: {
        title: "Minimal client boundary",
        language: "typescript",
        code: `// LikeButton.tsx — small client leaf
"use client";
import { useState } from "react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "Liked" : "Like"}</button>;
}

// PostPage.tsx — stays on the server
import { LikeButton } from "./LikeButton";
export default async function PostPage() {
  const post = await getPost(); // server-side fetch
  return <article><h1>{post.title}</h1><LikeButton /></article>;
}`,
      },
    },
    tags: ["nextjs", "server-components", "optimization"],
  },
  {
    id: "nextjs-static-vs-dynamic-rendering",
    category: "Next.js Decisions",
    front: "When should a Next.js route be statically rendered vs dynamically rendered?",
    back: {
      answer:
        "Static rendering (default) builds pages at build time or via ISR — ideal for content that is the same for every user. Dynamic rendering happens at request time — necessary when the page depends on cookies, headers, search params, or real-time data that must not be stale.",
      examples: [
        {
          label: "Marketing landing page",
          recommendation:
            "Static — content is identical for all visitors, cache it at the CDN edge.",
        },
        {
          label: "User dashboard with personal data",
          recommendation:
            "Dynamic — the response depends on the authenticated user's cookie/session.",
        },
        {
          label: "Blog post that changes weekly",
          recommendation:
            "Static with ISR — revalidate every few hours to balance freshness with performance.",
        },
      ],
    },
    tags: ["nextjs", "rendering", "performance"],
  },
  {
    id: "nextjs-isr-vs-on-demand-revalidation",
    category: "Next.js Decisions",
    front: "When should you use time-based ISR vs on-demand revalidation in Next.js?",
    back: {
      answer:
        "Time-based ISR (revalidate: N) is simple and works when 'eventually fresh' is good enough. On-demand revalidation (revalidateTag/revalidatePath) is better when content changes are event-driven (e.g., CMS publish) and you want instant updates without waiting for a timer.",
      examples: [
        {
          label: "News feed updated by editors",
          recommendation:
            "On-demand — trigger revalidation from a CMS webhook so articles appear immediately.",
        },
        {
          label: "Product catalog with hourly price updates",
          recommendation:
            "Time-based ISR (revalidate: 3600) — prices update on a known schedule.",
        },
        {
          label: "User-generated comments",
          recommendation:
            "On-demand — revalidate when a new comment is posted for instant visibility.",
        },
      ],
      codeExample: {
        title: "On-demand vs time-based ISR",
        language: "typescript",
        code: `// Time-based ISR
export const revalidate = 3600; // every hour

// On-demand revalidation in a route handler
import { revalidateTag } from "next/cache";
export async function POST() {
  revalidateTag("products");
  return Response.json({ revalidated: true });
}

// Tag a fetch for on-demand invalidation
fetch(url, { next: { tags: ["products"] } });`,
      },
    },
    tags: ["nextjs", "caching", "data-fetching"],
  },
  {
    id: "nextjs-route-handlers-vs-server-actions",
    category: "Next.js Decisions",
    front: "When should you use Route Handlers vs Server Actions in Next.js?",
    back: {
      answer:
        "Server Actions are ideal for form submissions and mutations — they are called directly from client components without building an API. Route Handlers are better for building REST/webhook endpoints consumed by external services, or when you need fine-grained control over the HTTP response.",
      examples: [
        {
          label: "Form to create a new blog post",
          recommendation:
            "Server Action — invoke directly from a <form action={...}>, with built-in progressive enhancement.",
        },
        {
          label: "Webhook endpoint for Stripe",
          recommendation:
            "Route Handler — Stripe sends raw HTTP requests; you need to read headers and return specific status codes.",
        },
        {
          label: "CRUD operations from your own UI",
          recommendation:
            "Server Actions — less boilerplate than building fetch-based API routes.",
        },
      ],
      codeExample: {
        title: "Server Action vs Route Handler",
        language: "typescript",
        code: `// Server Action (app/actions.ts)
"use server";
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
  revalidatePath("/posts");
}

// Route Handler (app/api/webhook/route.ts)
export async function POST(req: Request) {
  const body = await req.text();
  // verify signature, process webhook
  return new Response("OK", { status: 200 });
}`,
      },
    },
    tags: ["nextjs", "data-fetching", "api"],
  },
  {
    id: "nextjs-middleware-use-cases",
    category: "Next.js Decisions",
    front: "What are the right use cases for Next.js middleware?",
    back: {
      answer:
        "Middleware runs before every matched request at the edge. Use it for cross-cutting concerns like auth redirects, geo-based routing, A/B testing, and header manipulation. Avoid heavy logic — it adds latency to every request and has a limited runtime (no Node.js APIs).",
      examples: [
        {
          label: "Redirect unauthenticated users to /login",
          recommendation:
            "Middleware — check the session cookie and redirect before the page even starts rendering.",
        },
        {
          label: "A/B test via cookie-based routing",
          recommendation:
            "Middleware — assign a variant cookie and rewrite to the appropriate page version.",
        },
        {
          label: "Complex database query for authorization",
          recommendation:
            "Avoid middleware for this — use a server component or route handler with full Node.js access.",
        },
      ],
    },
    tags: ["nextjs", "middleware", "auth"],
  },
  {
    id: "nextjs-parallel-routes",
    category: "Next.js Decisions",
    front: "When should you use parallel routes in Next.js?",
    back: {
      answer:
        "Parallel routes let you render multiple pages in the same layout simultaneously using named slots (@slot). Use them for dashboards with independent panels, split views, or conditional rendering of different content areas that can load independently.",
      examples: [
        {
          label: "Dashboard with analytics panel and notifications panel",
          recommendation:
            "Parallel routes — each slot loads independently with its own loading/error states.",
        },
        {
          label: "Modal overlay on top of a page",
          recommendation:
            "Parallel route as @modal slot — the background page stays rendered and URL-addressable.",
        },
        {
          label: "Simple single-content page",
          recommendation:
            "Regular route — parallel routes add complexity with no benefit for a single view.",
        },
      ],
    },
    tags: ["nextjs", "routing", "layouts"],
  },
  {
    id: "nextjs-intercepting-routes",
    category: "Next.js Decisions",
    front: "When should you use intercepting routes in Next.js?",
    back: {
      answer:
        "Intercepting routes let you load a route within the current layout context (e.g., as a modal) while keeping the full page accessible via direct URL. The classic example is photo modals — clicking opens a modal overlay, but sharing the link shows the full page.",
      examples: [
        {
          label: "Photo gallery with modal preview",
          recommendation:
            "Intercepting route — soft-navigate shows modal, hard-navigate shows full photo page.",
        },
        {
          label: "Login modal that can also be a standalone page",
          recommendation:
            "Intercepting route — modal on click, full page on direct URL or refresh.",
        },
        {
          label: "Standard page-to-page navigation",
          recommendation:
            "Regular route — interception adds complexity when you don't need dual presentation.",
        },
      ],
    },
    tags: ["nextjs", "routing", "ui-patterns"],
  },
  {
    id: "nextjs-metadata-api",
    category: "Next.js Decisions",
    front: "How should you manage SEO metadata in a Next.js App Router application?",
    back: {
      answer:
        "Use the Metadata API (export const metadata or export async function generateMetadata) in layout.tsx or page.tsx. It is type-safe, supports static and dynamic metadata, handles deduplication automatically, and streams correctly with server components.",
      examples: [
        {
          label: "Static marketing page",
          recommendation:
            "Export a static metadata object — title, description, and Open Graph tags are known at build time.",
        },
        {
          label: "Dynamic product page",
          recommendation:
            "Use generateMetadata — fetch the product data to set the title and OG image dynamically.",
        },
        {
          label: "Shared metadata across all pages",
          recommendation:
            "Set defaults in root layout metadata and override per-page — Next.js merges them automatically.",
        },
      ],
      codeExample: {
        title: "Static and dynamic metadata",
        language: "typescript",
        code: `// Static metadata (layout.tsx)
export const metadata: Metadata = {
  title: { template: "%s | MySite", default: "MySite" },
  description: "My awesome site",
};

// Dynamic metadata (page.tsx)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name, openGraph: { images: [product.image] } };
}`,
      },
    },
    tags: ["nextjs", "seo", "metadata"],
  },
  {
    id: "nextjs-streaming",
    category: "Next.js Decisions",
    front: "When should you use streaming in Next.js and how does it improve UX?",
    back: {
      answer:
        "Streaming sends HTML progressively as server components resolve, so users see content faster instead of waiting for the slowest data fetch. Use loading.tsx or <Suspense> boundaries to define which parts stream independently. It is especially impactful when a page has multiple data sources with varying speeds.",
      examples: [
        {
          label: "Dashboard with fast user info and slow analytics",
          recommendation:
            "Stream — show the user greeting immediately, then stream in the analytics panel as it resolves.",
        },
        {
          label: "Simple page with one fast query",
          recommendation:
            "Streaming still works by default but the benefit is minimal — the page loads quickly regardless.",
        },
        {
          label: "E-commerce page with reviews from external API",
          recommendation:
            "Wrap reviews in Suspense — the product details render instantly while reviews stream in.",
        },
      ],
    },
    tags: ["nextjs", "performance", "streaming"],
  },

  // ============================================================
  // TYPESCRIPT CHOICES (~10)
  // ============================================================
  {
    id: "ts-interface-vs-type",
    category: "TypeScript Choices",
    front: "When should you use an interface vs a type alias in TypeScript?",
    back: {
      answer:
        "Use interface for object shapes that may be extended (especially public APIs and library contracts) — they support declaration merging and give clearer error messages. Use type for unions, intersections, mapped types, tuples, and any non-object type. In practice, either works for simple object shapes; pick one convention and be consistent.",
      examples: [
        {
          label: "Props for a React component",
          recommendation:
            "Either works — interface is traditional, type is needed if you use unions in props.",
        },
        {
          label: "Union of string literals",
          recommendation:
            "Type — interfaces cannot represent union types (type Status = 'idle' | 'loading').",
        },
        {
          label: "API response shape that third-party code might extend",
          recommendation:
            "Interface — consumers can use declaration merging to augment it.",
        },
      ],
      codeExample: {
        title: "Interface vs Type",
        language: "typescript",
        code: `// Interface — extendable, clear object contract
interface User {
  id: string;
  name: string;
}
interface Admin extends User {
  role: "admin";
}

// Type — required for unions and complex types
type Status = "idle" | "loading" | "error";
type Result<T> = { ok: true; data: T } | { ok: false; error: string };`,
      },
    },
    tags: ["typescript", "types", "fundamentals"],
  },
  {
    id: "ts-generic-vs-union",
    category: "TypeScript Choices",
    front: "When should you use a generic type parameter vs a union type?",
    back: {
      answer:
        "Use generics when the type is determined by the caller and must flow consistently through the function (input relates to output). Use unions when the type is a fixed set of known alternatives. Generics preserve type relationships; unions flatten them.",
      examples: [
        {
          label: "Function that returns the same type it receives",
          recommendation:
            "Generic — <T>(input: T): T preserves the exact type through the call.",
        },
        {
          label: "Config option that accepts 'light' or 'dark'",
          recommendation:
            "Union — the set of valid values is known and fixed.",
        },
        {
          label: "API wrapper that works with any response shape",
          recommendation:
            "Generic — ApiResponse<T> lets each endpoint define its own data type while sharing error handling.",
        },
      ],
      codeExample: {
        title: "Generic preserves type relationships",
        language: "typescript",
        code: `// Generic — T flows through consistently
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]); // type is number

// Union — fixed set of options
function setTheme(theme: "light" | "dark") { /* ... */ }`,
      },
    },
    tags: ["typescript", "generics", "types"],
  },
  {
    id: "ts-as-const-vs-enum",
    category: "TypeScript Choices",
    front: "When should you use 'as const' objects vs enums in TypeScript?",
    back: {
      answer:
        "Prefer 'as const' objects — they produce real JavaScript values, work naturally with type inference, and tree-shake properly. Enums generate extra runtime code, have surprising behaviors (numeric enums are reverse-mapped), and do not play well with isolatedModules. Use enums only if your team has an established convention for them.",
      examples: [
        {
          label: "Set of HTTP status codes",
          recommendation:
            "as const — export const STATUS = { OK: 200, NOT_FOUND: 404 } as const.",
        },
        {
          label: "Existing codebase using enums everywhere",
          recommendation:
            "Continue with enums for consistency — a mixed approach is worse than either choice.",
        },
        {
          label: "String constants for API routes",
          recommendation:
            "as const — the values are the types themselves, no extra mapping layer needed.",
        },
      ],
      codeExample: {
        title: "as const vs enum",
        language: "typescript",
        code: `// as const — preferred
const ROLES = { ADMIN: "admin", USER: "user", GUEST: "guest" } as const;
type Role = (typeof ROLES)[keyof typeof ROLES]; // "admin" | "user" | "guest"

// enum — generates extra JS, reverse-mapping surprises
enum RoleEnum { Admin = "admin", User = "user" }`,
      },
    },
    tags: ["typescript", "enums", "best-practices"],
  },
  {
    id: "ts-unknown-vs-any",
    category: "TypeScript Choices",
    front: "When should you use 'unknown' vs 'any' in TypeScript?",
    back: {
      answer:
        "Always prefer unknown over any. unknown is the type-safe counterpart — it forces you to narrow the type before using the value, preventing runtime errors. any disables type checking entirely. The only legitimate uses of any are in type definitions for third-party code or performance-critical type-level computations.",
      examples: [
        {
          label: "Parsing JSON from an API",
          recommendation:
            "unknown — parse as unknown, then validate with a type guard or schema library like Zod.",
        },
        {
          label: "Temporary migration from JavaScript",
          recommendation:
            "any as a stepping stone — but replace with proper types incrementally.",
        },
        {
          label: "Catch block error parameter",
          recommendation:
            "unknown — err is unknown by default in modern TS; narrow with instanceof before accessing properties.",
        },
      ],
      codeExample: {
        title: "unknown forces safe narrowing",
        language: "typescript",
        code: `function processInput(input: unknown) {
  // input.toUpperCase(); // Error — cannot use unknown directly
  if (typeof input === "string") {
    return input.toUpperCase(); // Safe after narrowing
  }
  throw new Error("Expected string");
}

// any skips all checks (dangerous)
function unsafeProcess(input: any) {
  return input.toUpperCase(); // No error, but may crash at runtime
}`,
      },
    },
    tags: ["typescript", "safety", "fundamentals"],
  },
  {
    id: "ts-type-guards",
    category: "TypeScript Choices",
    front: "When should you write custom type guards vs relying on built-in narrowing?",
    back: {
      answer:
        "Use built-in narrowing (typeof, instanceof, 'in', equality checks) whenever possible — they are understood by the compiler automatically. Write custom type guard functions (is syntax) when the narrowing logic is complex, reusable, or involves discriminated unions that need runtime validation.",
      examples: [
        {
          label: "Checking if a value is a string",
          recommendation:
            "Built-in — typeof value === 'string' is simpler and the compiler narrows automatically.",
        },
        {
          label: "Validating an API response shape",
          recommendation:
            "Custom type guard — function isUser(data: unknown): data is User with runtime property checks.",
        },
        {
          label: "Discriminated union with a type field",
          recommendation:
            "Built-in 'in' or equality check — if (action.type === 'add') narrows the union automatically.",
        },
      ],
      codeExample: {
        title: "Custom type guard",
        language: "typescript",
        code: `interface ApiError {
  code: number;
  message: string;
}

function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" && value !== null &&
    "code" in value && "message" in value
  );
}

// Usage
if (isApiError(response)) {
  console.log(response.message); // safely narrowed
}`,
      },
    },
    tags: ["typescript", "type-guards", "safety"],
  },
  {
    id: "ts-utility-types",
    category: "TypeScript Choices",
    front: "When should you use Partial, Pick, and Omit to derive types?",
    back: {
      answer:
        "Use utility types to derive new types from existing ones instead of duplicating definitions. Partial makes all props optional (great for update payloads). Pick selects a subset (great for component props). Omit excludes specific fields (great for creating DTOs without internal fields).",
      examples: [
        {
          label: "Update function that accepts any subset of fields",
          recommendation:
            "Partial<User> — callers can send only the fields they want to change.",
        },
        {
          label: "Component that only needs id and name from a large type",
          recommendation:
            "Pick<User, 'id' | 'name'> — explicitly declare exactly what the component consumes.",
        },
        {
          label: "API response that excludes the password field",
          recommendation:
            "Omit<User, 'password'> — derive a safe public type from the internal one.",
        },
      ],
      codeExample: {
        title: "Utility types in practice",
        language: "typescript",
        code: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UpdatePayload = Partial<Omit<User, "id">>; // all fields optional except id is removed
type UserCard = Pick<User, "id" | "name">;      // only what the card needs
type PublicUser = Omit<User, "password">;         // safe for API responses`,
      },
    },
    tags: ["typescript", "utility-types", "best-practices"],
  },
  {
    id: "ts-discriminated-unions",
    category: "TypeScript Choices",
    front: "When should you model state as a discriminated union instead of separate boolean flags?",
    back: {
      answer:
        "Use discriminated unions whenever a value can be in one of several mutually exclusive states. Booleans create impossible combinations (e.g., isLoading: true AND isError: true). A discriminated union with a status field makes each state explicit and forces you to handle every case.",
      examples: [
        {
          label: "Async request state (idle, loading, success, error)",
          recommendation:
            "Discriminated union — each state carries only the data relevant to it.",
        },
        {
          label: "Simple on/off toggle",
          recommendation:
            "Boolean — two states with no extra data do not benefit from a union.",
        },
        {
          label: "Payment status (pending, paid, refunded, failed)",
          recommendation:
            "Discriminated union — each status may carry different metadata (receipt, error reason, etc.).",
        },
      ],
      codeExample: {
        title: "Discriminated union for async state",
        language: "typescript",
        code: `// Bad: impossible states are representable
type BadState = { isLoading: boolean; isError: boolean; data?: User };

// Good: each state is explicit
type AsyncState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };

function render(state: AsyncState) {
  switch (state.status) {
    case "loading": return <Spinner />;
    case "error": return <Error msg={state.error} />;
    case "success": return <Profile user={state.data} />;
  }
}`,
      },
    },
    tags: ["typescript", "patterns", "state-modeling"],
  },
  {
    id: "ts-template-literal-types",
    category: "TypeScript Choices",
    front: "When are template literal types useful in TypeScript?",
    back: {
      answer:
        "Template literal types let you build string types from other string types using interpolation. They are powerful for typing string-based APIs — CSS properties, event names, route patterns, and any domain where strings follow a predictable format.",
      examples: [
        {
          label: "Event handler prop names (onClick, onHover, onChange)",
          recommendation:
            "Template literal — type EventName = `on${Capitalize<string>}` to constrain handler names.",
        },
        {
          label: "CSS custom properties",
          recommendation:
            "Template literal — type CSSVar = `--${string}` ensures the double-dash prefix.",
        },
        {
          label: "Simple string that has no pattern",
          recommendation:
            "Plain string or string literal union — template literals add complexity for no benefit.",
        },
      ],
      codeExample: {
        title: "Template literal types",
        language: "typescript",
        code: `type EventName = \`on\${Capitalize<"click" | "hover" | "focus">}\`;
// "onClick" | "onHover" | "onFocus"

type APIRoute = \`/api/\${"users" | "posts"}/\${string}\`;
const route: APIRoute = "/api/users/123"; // valid
// const bad: APIRoute = "/dashboard";    // error`,
      },
    },
    tags: ["typescript", "advanced", "string-types"],
  },
  {
    id: "ts-infer-keyword",
    category: "TypeScript Choices",
    front: "When should you use the 'infer' keyword in TypeScript conditional types?",
    back: {
      answer:
        "Use infer when you need to extract a type from within another type's structure — like pulling the return type from a function, the element type from an array, or the resolved type from a Promise. It is the backbone of utility types like ReturnType and Parameters.",
      examples: [
        {
          label: "Extracting the return type of a function",
          recommendation:
            "Use built-in ReturnType<T> (which uses infer internally) rather than reinventing it.",
        },
        {
          label: "Unwrapping a Promise to get the inner type",
          recommendation:
            "infer — type Awaited<T> = T extends Promise<infer U> ? U : T.",
        },
        {
          label: "Simple type mapping without extraction",
          recommendation:
            "No infer needed — use mapped types or basic conditional types instead.",
        },
      ],
      codeExample: {
        title: "Using infer to extract types",
        language: "typescript",
        code: `// Extract element type from an array
type ElementOf<T> = T extends (infer E)[] ? E : never;
type N = ElementOf<number[]>; // number

// Extract props type from a React component
type PropsOf<C> = C extends React.ComponentType<infer P> ? P : never;`,
      },
    },
    tags: ["typescript", "advanced", "conditional-types"],
  },
  {
    id: "ts-satisfies-operator",
    category: "TypeScript Choices",
    front: "When should you use the 'satisfies' operator instead of a type annotation?",
    back: {
      answer:
        "Use satisfies when you want to validate that a value matches a type while preserving the narrower inferred type. A type annotation widens the type to the annotation, losing specific literal types. satisfies gives you validation AND inference.",
      examples: [
        {
          label: "Config object where you want autocomplete on keys AND narrow value types",
          recommendation:
            "satisfies — validates the shape while keeping literal string/number types on the values.",
        },
        {
          label: "Variable explicitly typed for a public API contract",
          recommendation:
            "Type annotation — you want the wider type to be the contract, not the specific value.",
        },
        {
          label: "Theme colors object",
          recommendation:
            "satisfies — ensures all required colors exist while preserving the exact hex string literals.",
        },
      ],
      codeExample: {
        title: "satisfies preserves narrow types",
        language: "typescript",
        code: `type Theme = Record<"primary" | "secondary", string>;

// Annotation: widens to Record<string, string>
const theme1: Theme = { primary: "#007bff", secondary: "#6c757d" };
// theme1.primary is string

// satisfies: validates AND keeps literal types
const theme2 = { primary: "#007bff", secondary: "#6c757d" } satisfies Theme;
// theme2.primary is "#007bff"`,
      },
    },
    tags: ["typescript", "best-practices", "type-inference"],
  },

  // ============================================================
  // ARCHITECTURE (~8)
  // ============================================================
  {
    id: "arch-rest-vs-graphql",
    category: "Architecture",
    front: "When should you choose REST vs GraphQL for your API?",
    back: {
      answer:
        "Choose REST when your resources map cleanly to CRUD operations, your team values simplicity, or you need strong HTTP caching. Choose GraphQL when clients need flexible queries, you have multiple consumers needing different data shapes, or you want to avoid over/under-fetching across many related entities.",
      examples: [
        {
          label: "Public API consumed by unknown third parties",
          recommendation:
            "REST — widely understood, easy to document with OpenAPI, straightforward caching.",
        },
        {
          label: "Mobile app needing minimal payloads over slow networks",
          recommendation:
            "GraphQL — request only the exact fields needed to reduce bandwidth.",
        },
        {
          label: "Simple CRUD backend for an internal tool",
          recommendation:
            "REST — lower complexity, faster to build, and the query flexibility of GraphQL is unnecessary.",
        },
        {
          label: "Dashboard aggregating data from many related entities",
          recommendation:
            "GraphQL — one query can fetch user, orders, and reviews without multiple round trips.",
        },
      ],
    },
    tags: ["architecture", "api", "backend"],
  },
  {
    id: "arch-spa-ssr-ssg",
    category: "Architecture",
    front: "How do you choose between SPA, SSR, and SSG for a web application?",
    back: {
      answer:
        "SPA (client-side rendering) suits highly interactive apps behind auth where SEO does not matter. SSG suits content-heavy sites with known pages at build time. SSR suits dynamic, personalized pages that need SEO. Modern frameworks like Next.js let you mix all three per-route.",
      examples: [
        {
          label: "Internal admin dashboard",
          recommendation:
            "SPA — no SEO needed, rich interactivity, fastest developer experience.",
        },
        {
          label: "Blog or documentation site",
          recommendation:
            "SSG — pages are known ahead of time, can be cached at CDN, excellent performance.",
        },
        {
          label: "E-commerce product pages with SEO and personalized pricing",
          recommendation:
            "SSR — content must be crawlable and dynamic per user/region.",
        },
      ],
    },
    tags: ["architecture", "rendering", "frontend"],
  },
  {
    id: "arch-monolith-vs-microservices",
    category: "Architecture",
    front: "When should you start with a monolith vs microservices?",
    back: {
      answer:
        "Start with a monolith. Microservices solve scaling and team-autonomy problems that most projects do not have initially. They add massive operational complexity (networking, deployment, observability, data consistency). Extract services only when a specific part of the system has clearly different scaling needs or a dedicated team.",
      examples: [
        {
          label: "New startup with a 3-person team",
          recommendation:
            "Monolith — move fast, deploy one thing, avoid distributed system complexity.",
        },
        {
          label: "Video processing pipeline at scale",
          recommendation:
            "Extract as a service — it has fundamentally different compute/scaling needs from the web app.",
        },
        {
          label: "100-engineer organization with independent feature teams",
          recommendation:
            "Microservices — team autonomy and independent deploy cycles outweigh operational costs.",
        },
      ],
    },
    tags: ["architecture", "backend", "scalability"],
  },
  {
    id: "arch-sql-vs-nosql",
    category: "Architecture",
    front: "When should you choose SQL vs NoSQL databases?",
    back: {
      answer:
        "Choose SQL when your data is relational, you need ACID transactions, or your query patterns involve complex joins. Choose NoSQL (document, key-value, graph) when your data is unstructured, you need horizontal scaling with flexible schemas, or your access patterns are known and simple.",
      examples: [
        {
          label: "Financial transactions with strict consistency",
          recommendation:
            "SQL (PostgreSQL) — ACID guarantees prevent partial updates and data corruption.",
        },
        {
          label: "User session storage",
          recommendation:
            "NoSQL key-value (Redis) — fast reads/writes with simple key lookups, no relationships.",
        },
        {
          label: "Social network with complex relationship queries",
          recommendation:
            "Graph database (Neo4j) or SQL — model friend-of-friend queries naturally.",
        },
        {
          label: "CMS with varying content shapes per document type",
          recommendation:
            "NoSQL document store (MongoDB) — flexible schema fits heterogeneous content models.",
        },
      ],
    },
    tags: ["architecture", "databases", "backend"],
  },
  {
    id: "arch-optimistic-vs-pessimistic-updates",
    category: "Architecture",
    front: "When should you use optimistic updates vs pessimistic (wait-for-server) updates?",
    back: {
      answer:
        "Use optimistic updates when the action is very likely to succeed and instant feedback improves UX (likes, toggles, reordering). Use pessimistic updates when the operation may fail, has significant side effects (payments), or when showing stale state could confuse users.",
      examples: [
        {
          label: "Toggling a like button",
          recommendation:
            "Optimistic — update the UI immediately, roll back on failure. Failure is rare and low stakes.",
        },
        {
          label: "Submitting a payment",
          recommendation:
            "Pessimistic — show a loading state until the server confirms. False success is unacceptable.",
        },
        {
          label: "Reordering a todo list via drag-and-drop",
          recommendation:
            "Optimistic — the visual reorder should feel instant, sync to server in background.",
        },
      ],
      codeExample: {
        title: "Optimistic update with rollback",
        language: "typescript",
        code: `async function toggleLike(postId: string) {
  const prev = likes;
  setLikes(l => l + 1); // optimistic
  try {
    await api.likePost(postId);
  } catch {
    setLikes(prev); // rollback on failure
    toast.error("Failed to like post");
  }
}`,
      },
    },
    tags: ["architecture", "ui-patterns", "state-management"],
  },
  {
    id: "arch-client-vs-server-state",
    category: "Architecture",
    front: "How do you decide what is client state vs server state?",
    back: {
      answer:
        "Server state is data owned by the backend that is fetched, cached, and synchronized (users, posts, products). Client state is ephemeral UI state that exists only in the browser (modal open/close, form input, selected tab). Mixing them in the same store (e.g., putting API data in Redux) leads to stale data and complex sync logic.",
      examples: [
        {
          label: "List of products from the database",
          recommendation:
            "Server state — use React Query or SWR for fetching, caching, and revalidation.",
        },
        {
          label: "Whether the sidebar is collapsed",
          recommendation:
            "Client state — useState or Zustand. This data never exists on the server.",
        },
        {
          label: "Current user's profile data",
          recommendation:
            "Server state — fetch from API and cache. Do not duplicate it manually in a global store.",
        },
      ],
    },
    tags: ["architecture", "state-management", "frontend"],
  },
  {
    id: "arch-polling-vs-websockets",
    category: "Architecture",
    front: "When should you use polling vs WebSockets for real-time data?",
    back: {
      answer:
        "Use polling when updates are infrequent (seconds-to-minutes), infrastructure simplicity matters, or you need to work behind restrictive firewalls. Use WebSockets when you need sub-second latency, bidirectional communication, or high-frequency updates (chat, live collaboration, trading).",
      examples: [
        {
          label: "Dashboard refreshing every 30 seconds",
          recommendation:
            "Polling — simple to implement, low server overhead, and the refresh interval is acceptable.",
        },
        {
          label: "Live chat application",
          recommendation:
            "WebSockets — messages must appear instantly, and both client and server initiate communication.",
        },
        {
          label: "Notification badge count",
          recommendation:
            "Polling or SSE — updates every few minutes are fine; WebSocket is overkill.",
        },
        {
          label: "Collaborative document editing (Google Docs style)",
          recommendation:
            "WebSockets — cursor positions and edits must sync in real-time across all users.",
        },
      ],
    },
    tags: ["architecture", "real-time", "networking"],
  },
  {
    id: "arch-edge-vs-serverless",
    category: "Architecture",
    front: "When should you deploy to the edge vs traditional serverless functions?",
    back: {
      answer:
        "Edge functions run in lightweight runtimes close to the user (low latency, limited APIs). Use them for simple request/response transformations, auth checks, and A/B testing. Traditional serverless (Node.js Lambda) supports full APIs including database drivers, file system access, and heavy computation — use it for business logic and data-intensive operations.",
      examples: [
        {
          label: "Geo-based redirects or header manipulation",
          recommendation:
            "Edge — runs closest to the user, needs only simple request inspection and rewriting.",
        },
        {
          label: "Image processing or PDF generation",
          recommendation:
            "Serverless (Node.js) — edge runtimes lack native modules and have strict size/time limits.",
        },
        {
          label: "API route that queries a database",
          recommendation:
            "Serverless or edge-compatible DB (like Neon or PlanetScale) — traditional ORMs may not work at the edge.",
        },
        {
          label: "Auth token validation on every request",
          recommendation:
            "Edge — JWT verification is fast, lightweight, and benefits from low latency at the edge.",
        },
      ],
    },
    tags: ["architecture", "deployment", "serverless"],
  },
];
