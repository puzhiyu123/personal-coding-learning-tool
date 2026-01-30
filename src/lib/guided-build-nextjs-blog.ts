import type { GuidedBuildProject } from "./guided-builds";

export const nextjsBlogProject: GuidedBuildProject = {
  id: "guided-nextjs-blog",
  title: "Blog with App Router Patterns",
  subtitle: "Build a blog app using Next.js-inspired routing and layouts",
  difficulty: "advanced",
  estimatedMinutes: 45,
  conceptsSummary: [
    "Component Composition",
    "Layout Patterns",
    "Slug-Based Navigation",
    "Data Fetching Patterns",
    "TypeScript Props",
    "Tag Filtering",
  ],
  description:
    "Build a full blog application that demonstrates Next.js App Router patterns using React. You'll implement layout components, slug-based routing, data fetching helpers, tag filtering, related posts, reading time calculation, and post navigation. This teaches the architectural patterns used in production Next.js apps.",
  packageJson: {
    name: "nextjs-blog",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      typescript: "^5.0.0",
      vite: "^5.0.0",
    },
  },
  files: [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      language: "html",
      readOnly: true,
    },
    {
      path: "vite.config.js",
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      language: "javascript",
      readOnly: true,
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
            lib: ["ES2020", "DOM", "DOM.Iterable"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
          },
          include: ["src"],
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "nextjs-blog",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: { dev: "vite", build: "vite build" },
          dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
          devDependencies: {
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@vitejs/plugin-react": "^4.0.0",
            typescript: "^5.0.0",
            vite: "^5.0.0",
          },
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "src/main.tsx",
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
      language: "typescript",
      readOnly: true,
    },
    {
      path: "src/App.tsx",
      content: `// Blog App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div>
      <h1>My Blog</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "typescript",
    },
    {
      path: "src/components/Layout.tsx",
      content: `// Layout component — you'll build this step by step

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}`,
      language: "typescript",
    },
    {
      path: "src/components/BlogList.tsx",
      content: `// BlogList component — you'll build this step by step

export default function BlogList() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/components/BlogPost.tsx",
      content: `// BlogPost component — you'll build this step by step

export default function BlogPost() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/data/posts.ts",
      content: `// Blog post data — you'll add the type and data here

export {}`,
      language: "typescript",
    },
    {
      path: "src/App.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
  min-height: 100vh;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout header .logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #58a6ff;
  cursor: pointer;
}

.layout header nav {
  display: flex;
  gap: 16px;
}

.layout header nav a {
  color: #8b949e;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;
}

.layout header nav a:hover {
  color: #58a6ff;
}

.layout main {
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
}

.layout footer {
  background: #161b22;
  border-top: 1px solid #30363d;
  padding: 16px 24px;
  text-align: center;
  font-size: 0.8rem;
  color: #484f58;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.post-card:hover {
  border-color: #58a6ff;
}

.post-card .date {
  font-size: 0.8rem;
  color: #484f58;
  margin-bottom: 8px;
}

.post-card h2 {
  color: #58a6ff;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.post-card .excerpt {
  color: #8b949e;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.post-card .tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  background: #1f6feb22;
  color: #58a6ff;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.tag:hover {
  background: #1f6feb44;
}

.tag.active {
  background: #1f6feb;
  color: white;
}

.tag-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.blog-post {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 32px;
}

.blog-post .back-btn {
  display: inline-block;
  color: #58a6ff;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 20px;
  background: none;
  border: none;
  padding: 0;
}

.blog-post .back-btn:hover {
  text-decoration: underline;
}

.blog-post .meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #484f58;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.blog-post h1 {
  font-size: 2rem;
  color: #c9d1d9;
  margin-bottom: 12px;
}

.blog-post .content {
  line-height: 1.8;
  font-size: 1rem;
  color: #c9d1d9;
}

.blog-post .content p {
  margin-bottom: 16px;
}

.blog-post .content h2 {
  font-size: 1.5rem;
  margin-top: 32px;
  margin-bottom: 16px;
  color: #c9d1d9;
}

.toc {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.toc h3 {
  font-size: 0.85rem;
  color: #484f58;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.toc ul {
  list-style: none;
  padding: 0;
}

.toc li {
  padding: 4px 0;
  font-size: 0.9rem;
  color: #58a6ff;
  cursor: pointer;
}

.related-posts {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #30363d;
}

.related-posts h3 {
  font-size: 1rem;
  color: #484f58;
  margin-bottom: 12px;
}

.related-posts .related-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.related-posts .related-item {
  color: #58a6ff;
  cursor: pointer;
  font-size: 0.95rem;
  background: none;
  border: none;
  padding: 4px 0;
  text-align: left;
}

.related-posts .related-item:hover {
  text-decoration: underline;
}

.post-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #30363d;
}

.post-nav button {
  background: none;
  border: 1px solid #30363d;
  color: #58a6ff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: border-color 0.2s;
}

.post-nav button:hover {
  border-color: #58a6ff;
}

.post-nav button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  color: #484f58;
}

.not-found h2 {
  font-size: 3rem;
  margin-bottom: 8px;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "nb-step-1",
      order: 1,
      title: "Define the Post interface",
      instruction:
        "In `src/data/posts.ts`, replace the placeholder with a Post interface that defines the shape of a blog post.",
      explanation:
        "The Post interface is the data model for the entire blog. It includes a `slug` for URL-friendly identification, separate `excerpt` and `content` fields, tags for categorization, and a date string.",
      targetFile: "src/data/posts.ts",
      codeToWrite: `export interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 3 },
      highlightLines: [1, 9],
      validation: [
        {
          targetFile: "src/data/posts.ts",
          pattern: "interface\\s+Post\\s*\\{",
          description: "Post interface is defined",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "slug:\\s*string",
          description: "Post has a slug field",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "tags:\\s*string\\[\\]",
          description: "Post has a tags array",
        },
      ],
      deepExplanation:
        "A `slug` is a URL-friendly version of a title, like 'my-first-post' instead of 'My First Post'. Slugs are used in URLs because they're readable and don't need encoding. The `excerpt` is a short preview shown in the list, while `content` is the full post. Separating them means the list page doesn't load full content for every post. The `tags: string[]` array enables filtering and 'related posts' features.",
      concepts: ["interfaces", "slugs", "data modeling", "TypeScript"],
    },
    {
      id: "nb-step-2",
      order: 2,
      title: "Create posts data",
      instruction:
        "After the Post interface, add a typed array of blog posts with diverse tags and content.",
      explanation:
        "This data simulates what you'd get from a CMS or API in a real Next.js app. Each post has a unique slug, content with section headings, and tags that overlap between posts for the 'related posts' feature.",
      targetFile: "src/data/posts.ts",
      codeToWrite: `export const posts: Post[] = [
  {
    id: 1,
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    excerpt: 'Learn the fundamentals of React including components, props, and state management.',
    content: \`React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces called components.

## Components

Components are the building blocks of React. A component is a function that returns JSX — a syntax extension that looks like HTML but is actually JavaScript.

## Props

Props are how you pass data from parent to child components. They're read-only — a child component should never modify its own props.

## State

State is data that changes over time. When state changes, React re-renders the component to reflect the new data.\`,
    date: '2024-01-15',
    tags: ['React', 'JavaScript', 'Beginner'],
  },
  {
    id: 2,
    slug: 'typescript-for-react-developers',
    title: 'TypeScript for React Developers',
    excerpt: 'A practical guide to using TypeScript with React for better developer experience.',
    content: \`TypeScript adds static type checking to JavaScript, catching errors before your code runs. For React developers, it means safer props, typed hooks, and better IDE support.

## Why TypeScript?

TypeScript catches bugs at compile time that would otherwise crash at runtime. Misspelled prop names, wrong argument types, missing required fields — TypeScript flags them all.

## Typing Components

You can type component props with interfaces. This gives you autocomplete, documentation, and error checking all in one.

## Typing Hooks

Hooks like useState, useEffect, and useRef all support generic type parameters. This lets TypeScript infer types throughout your component.\`,
    date: '2024-02-10',
    tags: ['TypeScript', 'React', 'Intermediate'],
  },
  {
    id: 3,
    slug: 'understanding-react-hooks',
    title: 'Understanding React Hooks',
    excerpt: 'Deep dive into useState, useEffect, useRef, and custom hooks.',
    content: \`Hooks let you use state and other React features in function components. They were introduced in React 16.8 and have become the standard way to write React code.

## useState

useState gives your component memory. It returns a pair: the current value and a function to update it.

## useEffect

useEffect lets you synchronize with external systems. It runs after render and can optionally clean up.

## Custom Hooks

Custom hooks let you extract and share stateful logic between components. Any function starting with 'use' that calls other hooks is a custom hook.\`,
    date: '2024-03-05',
    tags: ['React', 'Hooks', 'Intermediate'],
  },
  {
    id: 4,
    slug: 'nextjs-app-router-guide',
    title: 'Next.js App Router Guide',
    excerpt: 'Master the Next.js App Router with layouts, loading states, and server components.',
    content: \`The App Router is Next.js's newest routing paradigm. It uses file-system based routing with support for layouts, loading states, and React Server Components.

## File-Based Routing

Every folder in the app directory becomes a route segment. A page.tsx file makes that route publicly accessible.

## Layouts

Layouts wrap pages and preserve state during navigation. A layout.tsx file applies to all pages in its directory and subdirectories.

## Server Components

By default, all components in the App Router are Server Components. They run on the server and send HTML to the client, reducing JavaScript bundle size.\`,
    date: '2024-04-20',
    tags: ['Next.js', 'React', 'Advanced'],
  },
  {
    id: 5,
    slug: 'css-in-react-approaches',
    title: 'CSS in React: Comparing Approaches',
    excerpt: 'Compare CSS Modules, Tailwind CSS, styled-components, and other styling solutions.',
    content: \`Choosing a CSS approach in React can be overwhelming. Let's compare the most popular options and when to use each one.

## CSS Modules

CSS Modules scope styles to a component by generating unique class names. Great for component-level styling without global conflicts.

## Tailwind CSS

Tailwind is a utility-first framework where you compose classes directly in JSX. It eliminates the need for separate CSS files.

## Styled Components

styled-components uses tagged template literals to create components with styles attached. Styles are scoped and support dynamic props.\`,
    date: '2024-05-12',
    tags: ['CSS', 'React', 'Beginner'],
  },
]`,
      placement: { type: "line", line: 10 },
      highlightLines: [10, 89],
      validation: [
        {
          targetFile: "src/data/posts.ts",
          pattern: "const\\s+posts:\\s*Post\\[\\]",
          description: "Posts array is typed",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "slug:\\s*['\"]getting-started",
          description: "Posts have slugs",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "tags:\\s*\\[",
          description: "Posts have tags arrays",
        },
      ],
      concepts: ["typed data", "content modeling", "slugs", "tags"],
    },
    {
      id: "nb-step-3",
      order: 3,
      title: "Build the Layout component",
      instruction:
        "In `src/components/Layout.tsx`, build a layout with header, nav, main content area, and footer.",
      explanation:
        "The Layout component demonstrates the 'children slot' pattern — it wraps any content passed to it. In Next.js, this is the `layout.tsx` file. The `onNavigate` callback lets child components trigger navigation.",
      targetFile: "src/components/Layout.tsx",
      codeToWrite: `import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  onNavigate: (view: string) => void
}

export default function Layout({ children, onNavigate }: LayoutProps) {
  return (
    <div className="layout">
      <header>
        <span className="logo" onClick={() => onNavigate('home')}>
          My Blog
        </span>
        <nav>
          <a onClick={() => onNavigate('home')}>Home</a>
          <a onClick={() => onNavigate('about')}>About</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        Built with React + TypeScript
      </footer>
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 26],
      validation: [
        {
          targetFile: "src/components/Layout.tsx",
          pattern: "children:\\s*React\\.ReactNode",
          description: "Children prop is typed as ReactNode",
        },
        {
          targetFile: "src/components/Layout.tsx",
          pattern: "onNavigate:\\s*\\(view:\\s*string\\)",
          description: "onNavigate callback is typed",
        },
        {
          targetFile: "src/components/Layout.tsx",
          pattern: "<main>\\{children\\}</main>",
          description: "Children are rendered in main element",
        },
      ],
      deepExplanation:
        "`React.ReactNode` is the broadest type for renderable content — it includes JSX, strings, numbers, null, and arrays. This means Layout can wrap any valid React content. The `children` prop is what makes this a 'layout' component — it doesn't know what's inside, it just provides the surrounding structure. In Next.js App Router, `layout.tsx` works identically but is applied automatically by the file-system router.",
      concepts: ["ReactNode", "children prop", "layout pattern", "component composition"],
    },
    {
      id: "nb-step-4",
      order: 4,
      title: "Build the BlogList component",
      instruction:
        "In `src/components/BlogList.tsx`, create a component that displays post cards and supports tag filtering.",
      explanation:
        "BlogList receives the posts array and a navigation callback. It manages its own tag filter state. Posts are filtered by the selected tag, and clicking a post card navigates to the full post.",
      targetFile: "src/components/BlogList.tsx",
      codeToWrite: `import { useState, useMemo } from 'react'
import type { Post } from '../data/posts'

interface BlogListProps {
  posts: Post[]
  onSelectPost: (slug: string) => void
}

export default function BlogList({ posts, onSelectPost }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(
    () => [...new Set(posts.flatMap(p => p.tags))].sort(),
    [posts]
  )

  const filteredPosts = useMemo(
    () => activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
    [posts, activeTag]
  )

  return (
    <div>
      <div className="tag-filter">
        <button
          className={\`tag\${!activeTag ? ' active' : ''}\`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={\`tag\${activeTag === tag ? ' active' : ''}\`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="blog-list">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => onSelectPost(post.slug)}
          >
            <div className="date">{formatDate(post.date)}</div>
            <h2>{post.title}</h2>
            <p className="excerpt">{post.excerpt}</p>
            <div className="tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 70],
      validation: [
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "interface\\s+BlogListProps",
          description: "Props interface is defined",
        },
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "activeTag",
          description: "Tag filtering state exists",
        },
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "flatMap",
          description: "Tags are collected with flatMap",
        },
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "onSelectPost\\(post\\.slug\\)",
          description: "Post selection uses slug",
        },
      ],
      deepExplanation:
        "`flatMap` is like `.map()` followed by `.flat()`. It maps each post to its tags array, then flattens into a single array of all tags. Wrapping in `new Set()` removes duplicates. The tag filter toggles: clicking the active tag deselects it (shows all posts). `useMemo` caches both the tag list and filtered posts for performance. The `formatDate` helper formats ISO dates to human-readable strings. In Next.js, this component would be a page component at `app/blog/page.tsx`.",
      concepts: ["flatMap", "Set", "tag filtering", "date formatting", "useMemo"],
    },
    {
      id: "nb-step-5",
      order: 5,
      title: "Add data helper functions",
      instruction:
        "In `src/data/posts.ts`, add helper functions to find posts by slug and get all posts sorted by date.",
      explanation:
        "These functions abstract data access. In Next.js, these would be server-side data fetching functions. `getPostBySlug` returns `Post | undefined` because the slug might not match any post.",
      targetFile: "src/data/posts.ts",
      codeToWrite: `export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  return posts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, limit)
}`,
      placement: { type: "append" },
      highlightLines: [90, 101],
      validation: [
        {
          targetFile: "src/data/posts.ts",
          pattern: "function\\s+getPostBySlug",
          description: "getPostBySlug helper exists",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "Post\\s*\\|\\s*undefined",
          description: "Return type includes undefined",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "function\\s+getAllPosts",
          description: "getAllPosts helper exists",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "function\\s+getRelatedPosts",
          description: "getRelatedPosts helper exists",
        },
      ],
      deepExplanation:
        "The `Post | undefined` return type forces callers to handle the case where no post is found — TypeScript won't let you access `post.title` without checking if `post` exists first. `getAllPosts` sorts by date descending (newest first) using `Date.getTime()` for reliable comparison. `getRelatedPosts` finds posts that share at least one tag with the current post, using `.some()` (returns true if any element passes the test). The default parameter `limit = 3` provides a sensible default while allowing callers to override.",
      concepts: ["union types", "undefined handling", "sort by date", "array.some", "default parameters"],
    },
    {
      id: "nb-step-6",
      order: 6,
      title: "Build the BlogPost component",
      instruction:
        "In `src/components/BlogPost.tsx`, create the full post view with content rendering, metadata, and back navigation.",
      explanation:
        "BlogPost receives a post and callback functions. It displays the full content, formatted date, reading time estimate, and tags. The back button navigates to the list view.",
      targetFile: "src/components/BlogPost.tsx",
      codeToWrite: `import type { Post } from '../data/posts'
import { getRelatedPosts } from '../data/posts'

interface BlogPostProps {
  post: Post
  onBack: () => void
  onSelectPost: (slug: string) => void
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function extractHeadings(content: string): string[] {
  return content.split('\\n')
    .filter(line => line.startsWith('## '))
    .map(line => line.replace('## ', ''))
}

export default function BlogPost({ post, onBack, onSelectPost }: BlogPostProps) {
  const readingTime = calculateReadingTime(post.content)
  const headings = extractHeadings(post.content)
  const relatedPosts = getRelatedPosts(post)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <article className="blog-post">
      <button className="back-btn" onClick={onBack}>
        \u2190 Back to all posts
      </button>

      <h1>{post.title}</h1>

      <div className="meta">
        <span>{formatDate(post.date)}</span>
        <span>{readingTime} min read</span>
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {headings.length > 0 && (
        <div className="toc">
          <h3>Table of Contents</h3>
          <ul>
            {headings.map((heading, i) => (
              <li key={i}>{heading}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="content">
        {post.content.split('\\n\\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={i}>{paragraph.replace('## ', '')}</h2>
          }
          return <p key={i}>{paragraph}</p>
        })}
      </div>

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>Related Posts</h3>
          <div className="related-list">
            {relatedPosts.map(related => (
              <button
                key={related.id}
                className="related-item"
                onClick={() => onSelectPost(related.slug)}
              >
                {related.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 88],
      validation: [
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "interface\\s+BlogPostProps",
          description: "Props interface is defined",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "calculateReadingTime",
          description: "Reading time is calculated",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "extractHeadings",
          description: "Headings are extracted for TOC",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "getRelatedPosts",
          description: "Related posts are shown",
        },
      ],
      deepExplanation:
        "The reading time calculation divides word count by 200 (average reading speed). `extractHeadings` uses string parsing to find markdown-style headings for the table of contents. Content rendering splits on double newlines (paragraphs) and checks for headings to render as `<h2>`. The related posts section uses the `getRelatedPosts` helper to find content with overlapping tags. In a real app, you'd use a markdown parser library instead of this simple approach.",
      concepts: ["reading time", "content parsing", "table of contents", "related content"],
    },
    {
      id: "nb-step-7",
      order: 7,
      title: "Add client-side routing in App",
      instruction:
        "In `src/App.tsx`, set up simple client-side routing with useState to switch between the blog list and individual posts.",
      explanation:
        "We use state to track the current view. `currentView` can be 'home' or a post slug. This simulates Next.js's file-based routing — in a real Next.js app, the framework handles this automatically.",
      targetFile: "src/App.tsx",
      codeToWrite: `import { useState } from 'react'
import Layout from './components/Layout'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import { getAllPosts, getPostBySlug } from './data/posts'

export default function App() {
  const [currentView, setCurrentView] = useState('home')

  const allPosts = getAllPosts()

  const navigateTo = (view: string) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const renderContent = () => {
    if (currentView === 'home') {
      return <BlogList posts={allPosts} onSelectPost={navigateTo} />
    }

    const post = getPostBySlug(currentView)
    if (!post) {
      return (
        <div className="not-found">
          <h2>404</h2>
          <p>Post not found</p>
          <button className="tag" onClick={() => navigateTo('home')}>
            Go Home
          </button>
        </div>
      )
    }

    return (
      <BlogPost
        post={post}
        onBack={() => navigateTo('home')}
        onSelectPost={navigateTo}
      />
    )
  }

  return (
    <Layout onNavigate={navigateTo}>
      {renderContent()}
    </Layout>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 11 },
      highlightLines: [1, 49],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useState\\(['\"]home['\"]\\)",
          description: "Current view state starts at home",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "getPostBySlug\\(currentView\\)",
          description: "Post is looked up by slug",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "404",
          description: "Not found state exists",
        },
      ],
      deepExplanation:
        "This routing pattern mirrors how Next.js App Router works conceptually: a URL maps to a component. Here, `currentView` is our URL equivalent. The `renderContent` function acts like a router — it decides which component to show based on the current view. The 404 handling demonstrates what Next.js's `not-found.tsx` does — show a friendly error when a route doesn't match. `window.scrollTo(0, 0)` ensures the page scrolls to top on navigation, which the browser does naturally with real page loads.",
      concepts: ["client-side routing", "state-based navigation", "404 handling", "scroll restoration"],
    },
    {
      id: "nb-step-8",
      order: 8,
      title: "Add slug-based post lookup",
      instruction:
        "The slug-based lookup is already implemented in the routing step. Let's verify the pattern: `getPostBySlug(currentView)` finds the post, and the `!post` check handles missing slugs.",
      explanation:
        "Slug-based routing is how most blogs work. The URL `/blog/my-post-title` maps to a post with slug 'my-post-title'. Our `getPostBySlug` function does this mapping. TypeScript ensures we handle the `undefined` case (slug not found).",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Slug-based routing:
  // 1. User clicks post -> navigateTo(post.slug) -> currentView = 'typescript-for-react-developers'
  // 2. renderContent() -> getPostBySlug('typescript-for-react-developers') -> finds the post
  // 3. If slug doesn't match -> getPostBySlug returns undefined -> show 404`,
      placement: { type: "line", line: 16 },
      highlightLines: [16, 19],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "getPostBySlug",
          description: "Slug lookup is used",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "!post",
          description: "Missing post is handled",
        },
      ],
      concepts: ["slug routing", "URL patterns", "undefined checks"],
    },
    {
      id: "nb-step-9",
      order: 9,
      title: "Verify tag filtering on blog list",
      instruction:
        "The tag filtering is already built into BlogList. Let's review how it works: clicking a tag filters posts, clicking again removes the filter. The 'All' button shows all posts.",
      explanation:
        "Tag filtering uses `useMemo` to filter the posts array based on the selected tag. The filter state is local to BlogList because it's a UI concern, not a routing concern.",
      targetFile: "src/components/BlogList.tsx",
      codeToWrite: `  // Tag filtering:
  // - activeTag: null (all posts) or a tag string
  // - Click tag -> toggle filter
  // - useMemo recalculates filteredPosts when activeTag changes`,
      placement: { type: "line", line: 22 },
      highlightLines: [22, 25],
      validation: [
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "activeTag",
          description: "Tag filtering is implemented",
        },
        {
          targetFile: "src/components/BlogList.tsx",
          pattern: "filteredPosts",
          description: "Posts are filtered by tag",
        },
      ],
      concepts: ["tag filtering", "useMemo", "toggle pattern"],
    },
    {
      id: "nb-step-10",
      order: 10,
      title: "Verify related posts section",
      instruction:
        "The related posts feature is already built into BlogPost. It uses `getRelatedPosts` to find posts that share tags with the current post.",
      explanation:
        "Related posts increase engagement by suggesting more content. The algorithm finds posts with overlapping tags — posts about React will suggest other React posts. Clicking a related post navigates to it.",
      targetFile: "src/components/BlogPost.tsx",
      codeToWrite: `  // Related posts algorithm:
  // 1. Filter out the current post (p.id !== post.id)
  // 2. Keep posts that share at least one tag (p.tags.some(...))
  // 3. Limit to 3 results`,
      placement: { type: "line", line: 25 },
      highlightLines: [25, 28],
      validation: [
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "relatedPosts",
          description: "Related posts are computed",
        },
        {
          targetFile: "src/data/posts.ts",
          pattern: "getRelatedPosts",
          description: "Related posts helper exists",
        },
      ],
      concepts: ["related content", "tag matching", "content recommendations"],
    },
    {
      id: "nb-step-11",
      order: 11,
      title: "Verify post metadata display",
      instruction:
        "The metadata (date formatting, reading time) is already in BlogPost. Let's review the reading time calculation and date formatting.",
      explanation:
        "Reading time is estimated by dividing word count by 200 (average reading speed). The date is formatted with `toLocaleDateString` for locale-aware display. These small details make a blog feel professional.",
      targetFile: "src/components/BlogPost.tsx",
      codeToWrite: `  // Metadata:
  // - Reading time: words / 200 wpm, minimum 1 minute
  // - Date: formatted with toLocaleDateString
  // - Tags: displayed as clickable badges`,
      placement: { type: "line", line: 29 },
      highlightLines: [29, 32],
      validation: [
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "readingTime",
          description: "Reading time is displayed",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "formatDate",
          description: "Date is formatted",
        },
      ],
      concepts: ["reading time", "date formatting", "metadata"],
    },
    {
      id: "nb-step-12",
      order: 12,
      title: "Verify table of contents",
      instruction:
        "The table of contents is already in BlogPost. It extracts `##` headings from the content string and renders them as a list.",
      explanation:
        "The TOC is built by parsing the content for markdown-style headings. In a real app, you'd use a markdown parser. The headings array drives the TOC rendering, showing it only when headings exist.",
      targetFile: "src/components/BlogPost.tsx",
      codeToWrite: `  // Table of Contents:
  // - extractHeadings() splits content into lines and filters for ## headings
  // - Only shown when headings.length > 0
  // - Real apps would use a markdown parser like 'marked' or 'remark'`,
      placement: { type: "line", line: 33 },
      highlightLines: [33, 36],
      validation: [
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "headings",
          description: "Headings are extracted",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "toc",
          description: "Table of contents section exists",
        },
      ],
      concepts: ["content parsing", "table of contents", "conditional rendering"],
    },
    {
      id: "nb-step-13",
      order: 13,
      title: "Add previous/next post navigation",
      instruction:
        "In `src/components/BlogPost.tsx`, add prev/next navigation buttons at the bottom of the post, before the closing `</article>` tag.",
      explanation:
        "Previous/next navigation lets readers browse sequentially. We find the current post's index in the sorted array and use `index - 1` and `index + 1` to find adjacent posts.",
      targetFile: "src/components/BlogPost.tsx",
      codeToWrite: `import type { Post } from '../data/posts'
import { getRelatedPosts, getAllPosts } from '../data/posts'

interface BlogPostProps {
  post: Post
  onBack: () => void
  onSelectPost: (slug: string) => void
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function extractHeadings(content: string): string[] {
  return content.split('\\n')
    .filter(line => line.startsWith('## '))
    .map(line => line.replace('## ', ''))
}

export default function BlogPost({ post, onBack, onSelectPost }: BlogPostProps) {
  const readingTime = calculateReadingTime(post.content)
  const headings = extractHeadings(post.content)
  const relatedPosts = getRelatedPosts(post)

  // Previous/next navigation
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.id === post.id)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <article className="blog-post">
      <button className="back-btn" onClick={onBack}>
        \u2190 Back to all posts
      </button>

      <h1>{post.title}</h1>

      <div className="meta">
        <span>{formatDate(post.date)}</span>
        <span>{readingTime} min read</span>
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {headings.length > 0 && (
        <div className="toc">
          <h3>Table of Contents</h3>
          <ul>
            {headings.map((heading, i) => (
              <li key={i}>{heading}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="content">
        {post.content.split('\\n\\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={i}>{paragraph.replace('## ', '')}</h2>
          }
          return <p key={i}>{paragraph}</p>
        })}
      </div>

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>Related Posts</h3>
          <div className="related-list">
            {relatedPosts.map(related => (
              <button
                key={related.id}
                className="related-item"
                onClick={() => onSelectPost(related.slug)}
              >
                {related.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="post-nav">
        <button
          disabled={!prevPost}
          onClick={() => prevPost && onSelectPost(prevPost.slug)}
        >
          \u2190 {prevPost ? prevPost.title : 'No previous post'}
        </button>
        <button
          disabled={!nextPost}
          onClick={() => nextPost && onSelectPost(nextPost.slug)}
        >
          {nextPost ? nextPost.title : 'No next post'} \u2192
        </button>
      </div>
    </article>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 92 },
      highlightLines: [28, 32],
      validation: [
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "prevPost",
          description: "Previous post navigation exists",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "nextPost",
          description: "Next post navigation exists",
        },
        {
          targetFile: "src/components/BlogPost.tsx",
          pattern: "post-nav",
          description: "Post navigation UI exists",
        },
      ],
      deepExplanation:
        "Finding adjacent posts uses `findIndex` to locate the current post in the sorted array, then accesses `index - 1` and `index + 1`. Boundary checks (`index > 0` and `index < length - 1`) prevent going out of bounds. The disabled state on buttons prevents clicking when there's no adjacent post. This pattern is common in paginated UIs — blog posts, search results, image galleries all use similar prev/next navigation.",
      concepts: ["findIndex", "array navigation", "boundary checks", "disabled buttons"],
    },
    {
      id: "nb-step-14",
      order: 14,
      title: "Verify 404 handling for invalid slugs",
      instruction:
        "The 404 handling is already in App.tsx's `renderContent`. When `getPostBySlug` returns undefined for an invalid slug, a 'Post not found' message is shown with a link back to the home page.",
      explanation:
        "In Next.js, this is the `not-found.tsx` file. Our implementation checks if `getPostBySlug` returns undefined and renders a 404 page. This prevents the app from crashing when someone navigates to a non-existent post.",
      targetFile: "src/App.tsx",
      codeToWrite: `    // 404 handling pattern:
    // getPostBySlug returns Post | undefined
    // TypeScript forces us to check for undefined before using the post
    // This is the same pattern as Next.js not-found.tsx`,
      placement: { type: "line", line: 20 },
      highlightLines: [20, 23],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "not-found",
          description: "404 page exists",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "Post not found",
          description: "Not found message is shown",
        },
      ],
      concepts: ["404 handling", "undefined checks", "error pages"],
    },
  ],
};
