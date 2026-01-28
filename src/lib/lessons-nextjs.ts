import { Lesson } from './lessons';

// Next.js Fundamentals (10 lessons)
export const nextFundamentals: Lesson[] = [
  {
    id: 'next-1',
    slug: 'introduction-to-nextjs',
    title: 'Introduction to Next.js',
    description: 'Learn what Next.js is and why it\'s the leading React framework.',
    order: 1,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Introduction to Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more.

## Key Features

- **App Router**: File-system based routing with React Server Components
- **Server Components**: Render on the server for better performance
- **Built-in Optimizations**: Automatic image, font, and script optimization
- **API Routes**: Build API endpoints within your Next.js app

## Creating a Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

\`\`\`
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── next.config.js
└── package.json
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Basic Page Component',
        code: `// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>This is a server component by default.</p>
    </main>
  );
}`,
        explanation: 'A simple Next.js page using the App Router.'
      }
    ],
    challenge: {
      starterCode: `// Create a home page component
export default function Home() {
  // Return JSX with:
  // - h1 with text "My App"
  // - p with current year
  // Your code here
}`,
      solution: `export default function Home() {
  return (
    <main>
      <h1>My App</h1>
      <p>Copyright {new Date().getFullYear()}</p>
    </main>
  );
}`,
      tests: [
        { input: 'typeof Home', expected: 'function', description: 'Should export a function' }
      ],
      hints: ['Use new Date().getFullYear() for current year', 'Wrap in a main element']
    }
  },
  {
    id: 'next-2',
    slug: 'nextjs-project-structure',
    title: 'Project Structure',
    description: 'Understand the App Router folder conventions and organization.',
    order: 2,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `
# Project Structure

The App Router uses file-system based routing with special file conventions.

## Special Files

| File | Purpose |
|------|---------|
| page.tsx | UI for a route |
| layout.tsx | Shared UI wrapper |
| loading.tsx | Loading UI |
| error.tsx | Error UI |
| not-found.tsx | 404 UI |

## Folder Organization

\`\`\`
app/
├── layout.tsx        # Root layout
├── page.tsx          # Home page (/)
├── about/
│   └── page.tsx      # About page (/about)
├── blog/
│   ├── page.tsx      # Blog list (/blog)
│   └── [slug]/
│       └── page.tsx  # Blog post (/blog/my-post)
└── api/
    └── users/
        └── route.ts  # API endpoint (/api/users)
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Organized Project Structure',
        code: `// Recommended structure
app/
├── (marketing)/      # Route group (no URL impact)
│   ├── about/
│   └── contact/
├── (dashboard)/
│   ├── layout.tsx    # Dashboard-specific layout
│   ├── settings/
│   └── profile/
├── api/
│   └── [...]/
├── components/       # Can be at root or in app
├── lib/              # Utilities
└── types/            # TypeScript types`,
        explanation: 'Using route groups to organize related routes.'
      }
    ],
    challenge: {
      starterCode: `// What file path creates the route /products/123?
// Answer with the correct path structure

const answer = {
  folder: '', // e.g., 'products/[id]'
  file: ''    // e.g., 'page.tsx'
};`,
      solution: `const answer = {
  folder: 'products/[id]',
  file: 'page.tsx'
};`,
      tests: [
        { input: 'answer.folder', expected: 'products/[id]', description: 'Should use dynamic segment' }
      ],
      hints: ['Dynamic routes use [param] syntax', 'page.tsx creates the route']
    }
  },
  {
    id: 'next-3',
    slug: 'pages-layouts',
    title: 'Pages and Layouts',
    description: 'Create pages and shared layouts in the App Router.',
    order: 3,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Pages and Layouts

Layouts wrap pages and persist across navigation.

## Root Layout

Every app needs a root layout with html and body tags:

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## Nested Layouts

\`\`\`tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Layout with Navigation',
        code: `// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2024 My App</footer>
      </body>
    </html>
  );
}`,
        explanation: 'Root layout with navigation that persists across pages.'
      }
    ],
    challenge: {
      starterCode: `// Create a dashboard layout with sidebar
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Return a layout with:
  // - div wrapper with className "dashboard-layout"
  // - aside with className "sidebar"
  // - main containing children
  // Your code here
}`,
      solution: `export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <nav>Dashboard Navigation</nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}`,
      tests: [
        { input: 'typeof DashboardLayout', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Accept children as prop', 'Use aside for sidebar element']
    }
  },
  {
    id: 'next-4',
    slug: 'nextjs-routing',
    title: 'Routing',
    description: 'Master file-based routing with dynamic and catch-all routes.',
    order: 4,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Routing

Next.js uses file-system based routing.

## Route Types

| Pattern | Example | Matches |
|---------|---------|---------|
| Static | /about | /about |
| Dynamic | /blog/[slug] | /blog/hello |
| Catch-all | /docs/[...slug] | /docs/a/b/c |
| Optional catch-all | /shop/[[...slug]] | /shop, /shop/a |

## Dynamic Routes

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <h1>Post: {params.slug}</h1>;
}
\`\`\`

## Catch-All Routes

\`\`\`tsx
// app/docs/[...slug]/page.tsx
export default function Docs({
  params
}: {
  params: { slug: string[] }
}) {
  // /docs/a/b/c -> slug = ['a', 'b', 'c']
  return <h1>Path: {params.slug.join('/')}</h1>;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Dynamic Product Page',
        code: `// app/products/[category]/[id]/page.tsx
interface Props {
  params: {
    category: string;
    id: string;
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <div>
      <p>Category: {params.category}</p>
      <p>Product ID: {params.id}</p>
    </div>
  );
}

// Generates: /products/electronics/123`,
        explanation: 'Nested dynamic route with multiple parameters.'
      }
    ],
    challenge: {
      starterCode: `// Create a catch-all docs page
// File: app/docs/[...slug]/page.tsx

interface Props {
  params: { slug: string[] };
}

export default function DocsPage({ params }: Props) {
  // Display breadcrumb from slug array
  // e.g., /docs/getting-started/install -> "getting-started > install"
  // Your code here
}`,
      solution: `interface Props {
  params: { slug: string[] };
}

export default function DocsPage({ params }: Props) {
  const breadcrumb = params.slug.join(' > ');

  return (
    <div>
      <nav>{breadcrumb}</nav>
      <h1>{params.slug[params.slug.length - 1]}</h1>
    </div>
  );
}`,
      tests: [
        { input: 'typeof DocsPage', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['params.slug is an array', 'Use join() to combine segments']
    }
  },
  {
    id: 'next-5',
    slug: 'nextjs-navigation',
    title: 'Navigation',
    description: 'Navigate between pages with Link, useRouter, and redirects.',
    order: 5,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Navigation

Next.js provides multiple ways to navigate between routes.

## Link Component

\`\`\`tsx
import Link from 'next/link';

<Link href="/about">About</Link>
<Link href="/blog/hello">Blog Post</Link>
<Link href={{ pathname: '/search', query: { q: 'hello' } }}>Search</Link>
\`\`\`

## useRouter Hook

\`\`\`tsx
'use client';
import { useRouter } from 'next/navigation';

function Component() {
  const router = useRouter();

  router.push('/dashboard');    // Navigate
  router.replace('/login');     // Replace history
  router.back();                // Go back
  router.refresh();             // Refresh current route
}
\`\`\`

## Redirects

\`\`\`tsx
import { redirect } from 'next/navigation';

// In server component or server action
if (!user) {
  redirect('/login');
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Navigation with Active States',
        code: `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? 'active' : ''}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}`,
        explanation: 'Navigation component with active link highlighting.'
      }
    ],
    challenge: {
      starterCode: `'use client';
import { useRouter } from 'next/navigation';

// Create a search form that navigates to /search?q=query
export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get query from form and navigate
    // Your code here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}`,
      solution: `'use client';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    router.push(\`/search?q=\${encodeURIComponent(query)}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}`,
      tests: [
        { input: 'typeof SearchForm', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use FormData to get input value', 'encodeURIComponent for safe URLs']
    }
  },
  {
    id: 'next-6',
    slug: 'server-client-components',
    title: 'Server vs Client Components',
    description: 'Understand when to use Server Components vs Client Components.',
    order: 6,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Server vs Client Components

Next.js App Router uses React Server Components by default.

## Server Components (Default)

- Render on the server
- Can directly access databases/files
- Cannot use hooks or browser APIs
- Reduce client-side JavaScript

## Client Components

Add \`'use client'\` directive to enable:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (window, localStorage)

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## Best Practice

Keep components on the server when possible. Only add \`'use client'\` when needed.
    `,
    codeExamples: [
      {
        title: 'Composition Pattern',
        code: `// Server Component (default)
// app/posts/page.tsx
import { getPosts } from '@/lib/db';
import LikeButton from './LikeButton';

export default async function PostsPage() {
  const posts = await getPosts(); // Direct DB access

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <LikeButton postId={post.id} />
        </article>
      ))}
    </div>
  );
}

// Client Component
// app/posts/LikeButton.tsx
'use client';

import { useState } from 'react';

export default function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}`,
        explanation: 'Server component fetches data, client component handles interactivity.'
      }
    ],
    challenge: {
      starterCode: `// Identify which should be Server or Client component

// Component A: Displays user profile from database
// Component B: Toggle switch with useState
// Component C: Static navigation links
// Component D: Form with onChange handlers

const answers = {
  componentA: '', // 'server' or 'client'
  componentB: '',
  componentC: '',
  componentD: ''
};`,
      solution: `const answers = {
  componentA: 'server',
  componentB: 'client',
  componentC: 'server',
  componentD: 'client'
};`,
      tests: [
        { input: 'answers.componentA', expected: 'server', description: 'DB access should be server' },
        { input: 'answers.componentB', expected: 'client', description: 'useState needs client' }
      ],
      hints: ['Hooks require client components', 'Data fetching can be server']
    }
  },
  {
    id: 'next-7',
    slug: 'nextjs-styling',
    title: 'Styling in Next.js',
    description: 'Style your app with CSS Modules, Tailwind, and CSS-in-JS.',
    order: 7,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Styling in Next.js

Next.js supports multiple styling approaches.

## CSS Modules

\`\`\`tsx
// styles/Button.module.css
.button {
  background: blue;
  color: white;
}

// Button.tsx
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}
\`\`\`

## Tailwind CSS

\`\`\`tsx
export default function Card() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold">Title</h2>
    </div>
  );
}
\`\`\`

## Global Styles

\`\`\`tsx
// app/layout.tsx
import './globals.css';
\`\`\`
    `,
    codeExamples: [
      {
        title: 'CSS Modules with Composition',
        code: `/* styles/components.module.css */
.baseButton {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
}

.primary {
  composes: baseButton;
  background: #3b82f6;
  color: white;
}

.secondary {
  composes: baseButton;
  background: #e5e7eb;
  color: #1f2937;
}

// Button.tsx
import styles from './components.module.css';

export function Button({ variant = 'primary', children }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  );
}`,
        explanation: 'CSS Modules with composition for reusable styles.'
      }
    ],
    challenge: {
      starterCode: `// Create a Card component with Tailwind classes
interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  // Use Tailwind for:
  // - White background, rounded corners, shadow
  // - Padding, title styling, description styling
  // Your code here
}`,
      solution: `interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}`,
      tests: [
        { input: 'typeof Card', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use className for Tailwind', 'bg-white, rounded-lg, shadow-md, p-6']
    }
  },
  {
    id: 'next-8',
    slug: 'fonts-images',
    title: 'Fonts and Images',
    description: 'Optimize fonts and images with built-in Next.js components.',
    order: 8,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Fonts and Images

Next.js provides automatic optimization for fonts and images.

## next/font

\`\`\`tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## next/image

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Load immediately
/>
\`\`\`

## Image Properties

- **fill**: Fill parent container
- **priority**: Preload for LCP images
- **placeholder**: "blur" for blur-up effect
- **sizes**: Responsive sizing hints
    `,
    codeExamples: [
      {
        title: 'Responsive Image Gallery',
        code: `import Image from 'next/image';

const images = [
  { src: '/img1.jpg', alt: 'Image 1' },
  { src: '/img2.jpg', alt: 'Image 2' },
  { src: '/img3.jpg', alt: 'Image 3' }
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div key={i} className="relative aspect-square">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}`,
        explanation: 'Responsive image gallery with optimized loading.'
      }
    ],
    challenge: {
      starterCode: `import Image from 'next/image';

// Create an Avatar component
interface AvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ src, name, size = 'md' }: AvatarProps) {
  // Size mapping: sm=32, md=48, lg=64
  // Round image with border
  // Your code here
}`,
      solution: `import Image from 'next/image';

interface AvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 32, md: 48, lg: 64 };

export default function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const dimension = sizes[size];

  return (
    <Image
      src={src}
      alt={name}
      width={dimension}
      height={dimension}
      className="rounded-full border-2 border-gray-200"
    />
  );
}`,
      tests: [
        { input: 'typeof Avatar', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Create a size map object', 'Use rounded-full for circular image']
    }
  },
  {
    id: 'next-9',
    slug: 'nextjs-metadata',
    title: 'Metadata and SEO',
    description: 'Configure metadata for SEO and social sharing.',
    order: 9,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# Metadata and SEO

Next.js provides built-in support for metadata.

## Static Metadata

\`\`\`tsx
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Welcome to my app',
  openGraph: {
    title: 'My App',
    description: 'Welcome to my app',
    images: ['/og-image.png']
  }
};
\`\`\`

## Dynamic Metadata

\`\`\`tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt
  };
}
\`\`\`

## Metadata Inheritance

Child pages inherit and can override parent metadata.
    `,
    codeExamples: [
      {
        title: 'Complete Metadata Configuration',
        code: `// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://myapp.com'),
  title: {
    default: 'My App',
    template: '%s | My App'
  },
  description: 'The best app ever',
  keywords: ['next.js', 'react', 'app'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myapp.com',
    siteName: 'My App',
    images: [{
      url: '/og-default.png',
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@johndoe'
  },
  robots: {
    index: true,
    follow: true
  }
};`,
        explanation: 'Comprehensive metadata for SEO and social sharing.'
      }
    ],
    challenge: {
      starterCode: `import type { Metadata } from 'next';

// Create dynamic metadata for a product page
interface Props {
  params: { id: string };
}

// Mock function
async function getProduct(id: string) {
  return { name: 'Widget', description: 'A great widget', price: 99 };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product and return metadata with:
  // - title: product name
  // - description: product description
  // - openGraph with title and description
  // Your code here
}`,
      solution: `import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

async function getProduct(id: string) {
  return { name: 'Widget', description: 'A great widget', price: 99 };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description
    }
  };
}`,
      tests: [
        { input: 'typeof generateMetadata', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['generateMetadata can be async', 'Return a Metadata object']
    }
  },
  {
    id: 'next-10',
    slug: 'environment-variables',
    title: 'Environment Variables',
    description: 'Configure and use environment variables securely.',
    order: 10,
    category: 'nextjs',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    content: `
# Environment Variables

Next.js has built-in support for environment variables.

## File Conventions

| File | Purpose |
|------|---------|
| .env | All environments |
| .env.local | Local overrides (gitignored) |
| .env.development | Development only |
| .env.production | Production only |

## Server vs Client

\`\`\`bash
# Server only (secure)
DATABASE_URL=postgres://...
API_SECRET=xxx

# Exposed to client (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

## Usage

\`\`\`tsx
// Server component
const dbUrl = process.env.DATABASE_URL;

// Client component
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Environment Configuration',
        code: `// .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_SECRET=super-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000

// lib/config.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL!
  },
  api: {
    secret: process.env.API_SECRET!
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL!
  }
};

// Validate at startup
function validateEnv() {
  const required = ['DATABASE_URL', 'API_SECRET'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(\`Missing env var: \${key}\`);
    }
  }
}`,
        explanation: 'Organizing and validating environment variables.'
      }
    ],
    challenge: {
      starterCode: `// Create a config object that validates required env vars

interface Config {
  databaseUrl: string;
  apiKey: string;
  publicUrl: string;
}

export function loadConfig(): Config {
  // Load from process.env
  // Throw error if required vars are missing
  // Your code here
}`,
      solution: `interface Config {
  databaseUrl: string;
  apiKey: string;
  publicUrl: string;
}

export function loadConfig(): Config {
  const databaseUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_KEY;
  const publicUrl = process.env.NEXT_PUBLIC_URL;

  if (!databaseUrl) throw new Error('DATABASE_URL is required');
  if (!apiKey) throw new Error('API_KEY is required');

  return {
    databaseUrl,
    apiKey,
    publicUrl: publicUrl || 'http://localhost:3000'
  };
}`,
      tests: [
        { input: 'typeof loadConfig', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Check each required variable', 'Use || for optional defaults']
    }
  }
];

// Data Fetching & Forms (10 lessons)
export const dataFetchingLessons: Lesson[] = [
  {
    id: 'next-11',
    slug: 'server-component-data-fetching',
    title: 'Server Component Data Fetching',
    description: 'Fetch data directly in Server Components with async/await.',
    order: 11,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Server Component Data Fetching

Server Components can fetch data directly using async/await.

## Direct Database Access

\`\`\`tsx
// app/posts/page.tsx
import { db } from '@/lib/db';

export default async function PostsPage() {
  const posts = await db.post.findMany();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Fetch with Caching

\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Default: cache indefinitely
    // cache: 'no-store',  // Never cache
    // next: { revalidate: 3600 } // Revalidate every hour
  });
  return res.json();
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Parallel Data Fetching',
        code: `// app/dashboard/page.tsx
import { Suspense } from 'react';

async function getUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

async function getStats(userId: string) {
  const res = await fetch(\`/api/stats/\${userId}\`);
  return res.json();
}

async function getPosts(userId: string) {
  const res = await fetch(\`/api/posts?userId=\${userId}\`);
  return res.json();
}

export default async function Dashboard({ params }: { params: { id: string } }) {
  // Parallel fetching
  const [user, stats, posts] = await Promise.all([
    getUser(params.id),
    getStats(params.id),
    getPosts(params.id)
  ]);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <StatsCard stats={stats} />
      <PostsList posts={posts} />
    </div>
  );
}`,
        explanation: 'Using Promise.all for parallel data fetching.'
      }
    ],
    challenge: {
      starterCode: `// Create a page that fetches and displays products

interface Product {
  id: string;
  name: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  // Simulate API call
  return [
    { id: '1', name: 'Widget', price: 10 },
    { id: '2', name: 'Gadget', price: 20 }
  ];
}

export default async function ProductsPage() {
  // Fetch products and render them
  // Your code here
}`,
      solution: `interface Product {
  id: string;
  name: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  return [
    { id: '1', name: 'Widget', price: 10 },
    { id: '2', name: 'Gadget', price: 20 }
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - \${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tests: [
        { input: 'typeof ProductsPage', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Make the component async', 'await the data fetch']
    }
  },
  {
    id: 'next-12',
    slug: 'client-side-fetching',
    title: 'Client-Side Fetching',
    description: 'Fetch data on the client with useEffect, SWR, and React Query.',
    order: 12,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Client-Side Fetching

Sometimes you need to fetch data on the client for dynamic content.

## Using SWR

\`\`\`tsx
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <div>Hello, {data.name}!</div>;
}
\`\`\`

## SWR Features

- Automatic revalidation
- Focus revalidation
- Interval polling
- Local mutation
- Pagination support
    `,
    codeExamples: [
      {
        title: 'SWR with Mutation',
        code: `'use client';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TodoList() {
  const { data: todos, isLoading } = useSWR('/api/todos', fetcher);

  const addTodo = async (text: string) => {
    // Optimistic update
    const newTodo = { id: Date.now(), text, completed: false };

    mutate('/api/todos', [...todos, newTodo], false);

    // Actual API call
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text })
    });

    // Revalidate
    mutate('/api/todos');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => addTodo('New todo')}>Add</button>
    </div>
  );
}`,
        explanation: 'SWR with optimistic updates for better UX.'
      }
    ],
    challenge: {
      starterCode: `'use client';
import useSWR from 'swr';

// Create a component that fetches and displays user data
// Show loading, error, and data states

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function UserProfile({ userId }: { userId: string }) {
  // Use SWR to fetch /api/users/{userId}
  // Handle loading and error states
  // Your code here
}`,
      solution: `'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading } = useSWR(
    \`/api/users/\${userId}\`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}`,
      tests: [
        { input: 'typeof UserProfile', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Destructure data, error, isLoading from useSWR', 'Check states in order']
    }
  },
  {
    id: 'next-13',
    slug: 'api-routes',
    title: 'API Routes (Route Handlers)',
    description: 'Build API endpoints with Next.js Route Handlers.',
    order: 13,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# API Routes (Route Handlers)

Create API endpoints using Route Handlers in the App Router.

## Basic Route Handler

\`\`\`tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
\`\`\`

## HTTP Methods

Export functions named: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
    `,
    codeExamples: [
      {
        title: 'Complete CRUD Route',
        code: `// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: Params) {
  const body = await request.json();

  const post = await db.post.update({
    where: { id: params.id },
    data: body
  });

  return NextResponse.json(post);
}

export async function DELETE(request: Request, { params }: Params) {
  await db.post.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}`,
        explanation: 'Dynamic API route with full CRUD operations.'
      }
    ],
    challenge: {
      starterCode: `// app/api/products/route.ts
import { NextResponse } from 'next/server';

const products = [
  { id: '1', name: 'Widget', price: 10 }
];

// Implement GET and POST handlers
export async function GET() {
  // Return all products
  // Your code here
}

export async function POST(request: Request) {
  // Add new product and return it with 201 status
  // Your code here
}`,
      solution: `import { NextResponse } from 'next/server';

const products = [
  { id: '1', name: 'Widget', price: 10 }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProduct = {
    id: String(Date.now()),
    ...body
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}`,
      tests: [
        { input: 'typeof GET', expected: 'function', description: 'GET should be exported' },
        { input: 'typeof POST', expected: 'function', description: 'POST should be exported' }
      ],
      hints: ['Use NextResponse.json() for responses', 'Pass status in second argument']
    }
  },
  {
    id: 'next-14',
    slug: 'dynamic-api-routes',
    title: 'Dynamic API Routes',
    description: 'Create dynamic API endpoints with route parameters.',
    order: 14,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `
# Dynamic API Routes

Use dynamic segments in API routes just like pages.

## Route Parameters

\`\`\`tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id);
  return NextResponse.json(user);
}
\`\`\`

## Query Parameters

\`\`\`tsx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  const data = await getData(Number(page), Number(limit));
  return NextResponse.json(data);
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Nested Dynamic Routes',
        code: `// app/api/users/[userId]/posts/[postId]/route.ts
import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
    postId: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { userId, postId } = params;

  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId
    }
  });

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}`,
        explanation: 'Handling multiple dynamic segments in API routes.'
      }
    ],
    challenge: {
      starterCode: `// app/api/search/route.ts
import { NextResponse } from 'next/server';

// Create a search endpoint that accepts query params:
// - q: search query (required)
// - page: page number (default 1)
// - limit: results per page (default 10)

const items = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

export async function GET(request: Request) {
  // Extract query params and filter items
  // Return paginated results
  // Your code here
}`,
      solution: `import { NextResponse } from 'next/server';

const items = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  if (!q) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  const filtered = items.filter(item =>
    item.toLowerCase().includes(q.toLowerCase())
  );

  const start = (page - 1) * limit;
  const results = filtered.slice(start, start + limit);

  return NextResponse.json({
    results,
    total: filtered.length,
    page,
    limit
  });
}`,
      tests: [
        { input: 'typeof GET', expected: 'function', description: 'GET should be exported' }
      ],
      hints: ['Use new URL(request.url).searchParams', 'Handle missing query with 400']
    }
  },
  {
    id: 'next-15',
    slug: 'server-actions',
    title: 'Server Actions',
    description: 'Handle form submissions and mutations with Server Actions.',
    order: 15,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Server Actions

Server Actions allow you to run server code directly from components.

## Defining Server Actions

\`\`\`tsx
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.post.create({
    data: { title }
  });

  revalidatePath('/posts');
}
\`\`\`

## Using in Forms

\`\`\`tsx
import { createPost } from './actions';

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create</button>
    </form>
  );
}
\`\`\`

## With useFormState

For handling errors and loading states.
    `,
    codeExamples: [
      {
        title: 'Server Action with Validation',
        code: `// app/actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10)
});

export async function submitContact(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    message: formData.get('message')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed'
    };
  }

  await db.contact.create({
    data: validatedFields.data
  });

  revalidatePath('/contact');
  return { message: 'Success!', errors: null };
}

// ContactForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Sending...' : 'Send'}</button>;
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, { message: '', errors: null });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors?.email && <p>{state.errors.email}</p>}
      <textarea name="message" />
      {state.errors?.message && <p>{state.errors.message}</p>}
      <SubmitButton />
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`,
        explanation: 'Complete form handling with validation and loading states.'
      }
    ],
    challenge: {
      starterCode: `// Create a server action for adding todos
'use server';

import { revalidatePath } from 'next/cache';

// Mock database
const todos: { id: string; text: string; completed: boolean }[] = [];

export async function addTodo(formData: FormData) {
  // Extract text from formData
  // Add to todos array
  // Revalidate /todos path
  // Return success message
  // Your code here
}`,
      solution: `'use server';

import { revalidatePath } from 'next/cache';

const todos: { id: string; text: string; completed: boolean }[] = [];

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;

  if (!text || text.trim() === '') {
    return { error: 'Text is required' };
  }

  todos.push({
    id: String(Date.now()),
    text: text.trim(),
    completed: false
  });

  revalidatePath('/todos');
  return { success: true };
}`,
      tests: [
        { input: 'typeof addTodo', expected: 'function', description: 'addTodo should be exported' }
      ],
      hints: ['Use formData.get() to extract values', 'revalidatePath updates the cache']
    }
  },
  {
    id: 'next-16',
    slug: 'form-validation',
    title: 'Form Validation',
    description: 'Validate forms with React Hook Form and Zod.',
    order: 16,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Form Validation

Combine React Hook Form with Zod for type-safe validation.

## Setup

\`\`\`bash
npm install react-hook-form @hookform/resolvers zod
\`\`\`

## Basic Form

\`\`\`tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Advanced Form with Custom Validation',
        code: `'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000)); // Simulate API
    console.log('Registered:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('username')} placeholder="Username" />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      {/* ... other fields */}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}`,
        explanation: 'Complex form with password confirmation and custom validation rules.'
      }
    ],
    challenge: {
      starterCode: `'use client';

import { z } from 'zod';

// Create a contact form schema with:
// - name: required, min 2 chars
// - email: valid email
// - subject: required, min 5 chars
// - message: required, min 20 chars

const contactSchema = z.object({
  // Your code here
});

type ContactForm = z.infer<typeof contactSchema>;`,
      solution: `'use client';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactForm = z.infer<typeof contactSchema>;`,
      tests: [
        { input: 'contactSchema.shape.email._def.typeName', expected: 'ZodString', description: 'email should be string' }
      ],
      hints: ['Use z.string().min() for minimum length', 'z.string().email() validates email format']
    }
  },
  {
    id: 'next-17',
    slug: 'loading-states',
    title: 'Loading States',
    description: 'Handle loading states with loading.tsx and Suspense.',
    order: 17,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `
# Loading States

Next.js provides built-in loading UI support.

## loading.tsx

\`\`\`tsx
// app/posts/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>;
}
\`\`\`

## Suspense Boundaries

\`\`\`tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsLoading />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<PostsLoading />}>
        <Posts />
      </Suspense>
    </div>
  );
}
\`\`\`

## Streaming

Content streams to the client as it becomes ready.
    `,
    codeExamples: [
      {
        title: 'Skeleton Loading Component',
        code: `// components/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={\`animate-pulse bg-gray-200 rounded \${className}\`} />
  );
}

// app/posts/loading.tsx
import { Skeleton } from '@/components/Skeleton';

export default function PostsLoading() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}`,
        explanation: 'Skeleton loading for better perceived performance.'
      }
    ],
    challenge: {
      starterCode: `// Create a loading component for a product grid
// Show 6 skeleton cards in a 3-column grid

export default function ProductsLoading() {
  // Create skeleton cards with:
  // - Image placeholder (aspect-square)
  // - Title placeholder
  // - Price placeholder
  // Your code here
}`,
      solution: `export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="aspect-square bg-gray-200 animate-pulse rounded mb-4" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}`,
      tests: [
        { input: 'typeof ProductsLoading', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use Array(6) to create 6 items', 'animate-pulse creates the shimmer effect']
    }
  },
  {
    id: 'next-18',
    slug: 'error-handling',
    title: 'Error Handling',
    description: 'Handle errors gracefully with error.tsx and not-found.tsx.',
    order: 18,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Error Handling

Next.js provides built-in error handling boundaries.

## error.tsx

\`\`\`tsx
'use client';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
\`\`\`

## not-found.tsx

\`\`\`tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
\`\`\`

## Triggering Not Found

\`\`\`tsx
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <div>{post.title}</div>;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Complete Error Boundary',
        code: `// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard Error</h2>
      <p className="text-gray-600 mb-4">
        {error.message || 'An unexpected error occurred'}
      </p>
      {error.digest && (
        <p className="text-sm text-gray-400 mb-4">
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}`,
        explanation: 'Error boundary with error logging and reset functionality.'
      }
    ],
    challenge: {
      starterCode: `// Create a custom 404 page for products
// app/products/[id]/not-found.tsx

import Link from 'next/link';

export default function ProductNotFound() {
  // Show:
  // - "Product Not Found" heading
  // - Message about the product not existing
  // - Link back to /products
  // Your code here
}`,
      solution: `import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/products"
        className="text-blue-500 hover:underline"
      >
        ← Back to Products
      </Link>
    </div>
  );
}`,
      tests: [
        { input: 'typeof ProductNotFound', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Import Link from next/link', 'Use descriptive error message']
    }
  },
  {
    id: 'next-19',
    slug: 'parallel-sequential-fetching',
    title: 'Parallel and Sequential Fetching',
    description: 'Optimize data fetching patterns for performance.',
    order: 19,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Parallel and Sequential Fetching

Choose the right pattern based on data dependencies.

## Sequential (When Dependent)

\`\`\`tsx
async function Page({ params }) {
  // Second fetch depends on first
  const user = await getUser(params.id);
  const posts = await getUserPosts(user.id);

  return <PostList posts={posts} />;
}
\`\`\`

## Parallel (When Independent)

\`\`\`tsx
async function Page({ params }) {
  // Fetch in parallel
  const [user, posts, stats] = await Promise.all([
    getUser(params.id),
    getPosts(),
    getStats()
  ]);

  return <Dashboard user={user} posts={posts} stats={stats} />;
}
\`\`\`

## With Suspense (Streaming)

\`\`\`tsx
export default function Page() {
  return (
    <>
      <Suspense fallback={<UserLoading />}>
        <User />
      </Suspense>
      <Suspense fallback={<PostsLoading />}>
        <Posts />
      </Suspense>
    </>
  );
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Optimized Dashboard Page',
        code: `import { Suspense } from 'react';

// Async components
async function UserStats({ userId }: { userId: string }) {
  const stats = await getStats(userId);
  return <StatsCard stats={stats} />;
}

async function RecentPosts({ userId }: { userId: string }) {
  const posts = await getRecentPosts(userId);
  return <PostList posts={posts} />;
}

async function Notifications({ userId }: { userId: string }) {
  const notifications = await getNotifications(userId);
  return <NotificationList items={notifications} />;
}

// Main page - content streams as ready
export default async function DashboardPage({
  params
}: {
  params: { userId: string }
}) {
  // User info loads first (critical)
  const user = await getUser(params.userId);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>

      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<StatsLoading />}>
          <UserStats userId={params.userId} />
        </Suspense>

        <Suspense fallback={<PostsLoading />}>
          <RecentPosts userId={params.userId} />
        </Suspense>

        <Suspense fallback={<NotificationsLoading />}>
          <Notifications userId={params.userId} />
        </Suspense>
      </div>
    </div>
  );
}`,
        explanation: 'Streaming UI with independent Suspense boundaries.'
      }
    ],
    challenge: {
      starterCode: `// Optimize this page with parallel fetching

async function getProduct(id: string) {
  // Simulated delay
  await new Promise(r => setTimeout(r, 1000));
  return { id, name: 'Widget' };
}

async function getReviews(productId: string) {
  await new Promise(r => setTimeout(r, 1000));
  return [{ id: '1', rating: 5 }];
}

async function getRelated(productId: string) {
  await new Promise(r => setTimeout(r, 1000));
  return [{ id: '2', name: 'Related' }];
}

// Currently sequential - takes 3 seconds
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const reviews = await getReviews(params.id);
  const related = await getRelated(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <div>Reviews: {reviews.length}</div>
      <div>Related: {related.length}</div>
    </div>
  );
}`,
      solution: `async function getProduct(id: string) {
  await new Promise(r => setTimeout(r, 1000));
  return { id, name: 'Widget' };
}

async function getReviews(productId: string) {
  await new Promise(r => setTimeout(r, 1000));
  return [{ id: '1', rating: 5 }];
}

async function getRelated(productId: string) {
  await new Promise(r => setTimeout(r, 1000));
  return [{ id: '2', name: 'Related' }];
}

// Parallel - takes 1 second
export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product, reviews, related] = await Promise.all([
    getProduct(params.id),
    getReviews(params.id),
    getRelated(params.id)
  ]);

  return (
    <div>
      <h1>{product.name}</h1>
      <div>Reviews: {reviews.length}</div>
      <div>Related: {related.length}</div>
    </div>
  );
}`,
      tests: [
        { input: 'typeof ProductPage', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use Promise.all() for independent fetches', 'Destructure results from array']
    }
  },
  {
    id: 'next-20',
    slug: 'revalidation',
    title: 'Revalidation Strategies',
    description: 'Keep data fresh with time-based and on-demand revalidation.',
    order: 20,
    category: 'nextjs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Revalidation Strategies

Control when cached data is refreshed.

## Time-Based Revalidation

\`\`\`tsx
// Revalidate every 60 seconds
const data = await fetch(url, {
  next: { revalidate: 60 }
});

// Or at route segment level
export const revalidate = 60;
\`\`\`

## On-Demand Revalidation

\`\`\`tsx
// app/actions.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createPost() {
  await db.post.create(...);

  // Revalidate specific path
  revalidatePath('/posts');

  // Or by tag
  revalidateTag('posts');
}
\`\`\`

## Cache Tags

\`\`\`tsx
const posts = await fetch(url, {
  next: { tags: ['posts'] }
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Complete Revalidation Example',
        code: `// lib/data.ts
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: {
      tags: ['posts'],
      revalidate: 3600 // 1 hour fallback
    }
  });
  return res.json();
}

// app/actions.ts
'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.post.create({ data: { title } });

  // Revalidate all pages using 'posts' tag
  revalidateTag('posts');

  // Also revalidate the posts list page
  revalidatePath('/posts');

  return { success: true };
}

// app/api/revalidate/route.ts (webhook endpoint)
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { tag, secret } = await request.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag(tag);
  return Response.json({ revalidated: true });
}`,
        explanation: 'Combining time-based and on-demand revalidation.'
      }
    ],
    challenge: {
      starterCode: `'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// Create a function to update a product and revalidate

interface ProductUpdate {
  id: string;
  name: string;
  price: number;
}

export async function updateProduct(data: ProductUpdate) {
  // 1. Update the product in database
  // 2. Revalidate the product detail page (/products/[id])
  // 3. Revalidate the products list tag
  // 4. Return success status
  // Your code here
}`,
      solution: `'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

interface ProductUpdate {
  id: string;
  name: string;
  price: number;
}

export async function updateProduct(data: ProductUpdate) {
  // Simulate database update
  await new Promise(r => setTimeout(r, 100));

  // Revalidate the specific product page
  revalidatePath(\`/products/\${data.id}\`);

  // Revalidate all products listings
  revalidateTag('products');

  return { success: true, id: data.id };
}`,
      tests: [
        { input: 'typeof updateProduct', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use revalidatePath for specific pages', 'Use revalidateTag for cache tags']
    }
  }
];

// Advanced Next.js (10 lessons)
export const advancedLessons: Lesson[] = [
  {
    id: 'next-21',
    slug: 'nextauth-authentication',
    title: 'Authentication with NextAuth.js',
    description: 'Implement authentication with NextAuth.js (Auth.js).',
    order: 21,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    content: `
# Authentication with NextAuth.js

NextAuth.js (Auth.js) provides complete authentication for Next.js.

## Setup

\`\`\`bash
npm install next-auth
\`\`\`

## Configuration

\`\`\`tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ]
});

export { handler as GET, handler as POST };
\`\`\`

## Session Access

\`\`\`tsx
// Server Component
import { getServerSession } from 'next-auth';

const session = await getServerSession();

// Client Component
'use client';
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Protected Page with Session',
        code: `// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
    </div>
  );
}

// components/SignInButton.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}`,
        explanation: 'Server and client-side session handling.'
      }
    ],
    challenge: {
      starterCode: `// Create a protected layout that redirects unauthenticated users
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Check session
  // Redirect to /login if not authenticated
  // Otherwise render children
  // Your code here
}`,
      solution: `import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}`,
      tests: [
        { input: 'typeof ProtectedLayout', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use getServerSession() to check auth', 'redirect() for navigation']
    }
  },
  {
    id: 'next-22',
    slug: 'authorization',
    title: 'Authorization and RBAC',
    description: 'Implement role-based access control for your application.',
    order: 22,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Authorization and RBAC

Control access based on user roles and permissions.

## Role-Based Access

\`\`\`tsx
// lib/auth.ts
export const authOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        role: token.role
      }
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  }
};
\`\`\`

## Checking Permissions

\`\`\`tsx
function hasPermission(user, action) {
  const permissions = {
    admin: ['create', 'read', 'update', 'delete'],
    editor: ['create', 'read', 'update'],
    viewer: ['read']
  };

  return permissions[user.role]?.includes(action);
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Authorization Helper',
        code: `// lib/authorization.ts
type Role = 'admin' | 'editor' | 'viewer';
type Permission = 'create' | 'read' | 'update' | 'delete';

const rolePermissions: Record<Role, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  viewer: ['read']
};

export function can(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Higher-order component for protected routes
export function withRole(allowedRoles: Role[]) {
  return async function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (!session || !allowedRoles.includes(session.user.role)) {
      redirect('/unauthorized');
    }

    return <>{children}</>;
  };
}

// Usage in page
import { can } from '@/lib/authorization';

export default async function AdminPage() {
  const session = await getServerSession();

  if (!can(session.user.role, 'delete')) {
    return <p>You don't have permission to access this page</p>;
  }

  return <AdminDashboard />;
}`,
        explanation: 'Complete RBAC implementation with helpers.'
      }
    ],
    challenge: {
      starterCode: `// Create a permission checking middleware

type Role = 'admin' | 'user' | 'guest';
type Resource = 'posts' | 'users' | 'settings';
type Action = 'create' | 'read' | 'update' | 'delete';

// Define which roles can do what on each resource
const permissions: Record<Role, Record<Resource, Action[]>> = {
  admin: {
    posts: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    settings: ['read', 'update']
  },
  user: {
    posts: ['create', 'read', 'update'],
    users: ['read'],
    settings: ['read']
  },
  guest: {
    posts: ['read'],
    users: [],
    settings: []
  }
};

export function authorize(role: Role, resource: Resource, action: Action): boolean {
  // Check if the role can perform the action on the resource
  // Your code here
}`,
      solution: `type Role = 'admin' | 'user' | 'guest';
type Resource = 'posts' | 'users' | 'settings';
type Action = 'create' | 'read' | 'update' | 'delete';

const permissions: Record<Role, Record<Resource, Action[]>> = {
  admin: {
    posts: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    settings: ['read', 'update']
  },
  user: {
    posts: ['create', 'read', 'update'],
    users: ['read'],
    settings: ['read']
  },
  guest: {
    posts: ['read'],
    users: [],
    settings: []
  }
};

export function authorize(role: Role, resource: Resource, action: Action): boolean {
  return permissions[role]?.[resource]?.includes(action) ?? false;
}`,
      tests: [
        { input: 'authorize("admin", "posts", "delete")', expected: 'true', description: 'Admin can delete posts' },
        { input: 'authorize("guest", "posts", "create")', expected: 'false', description: 'Guest cannot create posts' }
      ],
      hints: ['Access nested object safely', 'Use optional chaining ?.']
    }
  },
  {
    id: 'next-23',
    slug: 'nextjs-middleware',
    title: 'Middleware',
    description: 'Use Edge Middleware for authentication, redirects, and rewrites.',
    order: 23,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Middleware

Middleware runs before requests are completed.

## Basic Middleware

\`\`\`tsx
// middleware.ts (at project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: '/api/:path*'
};
\`\`\`

## Matching Paths

\`\`\`tsx
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next|static|favicon.ico).*)'
  ]
};
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Auth Middleware',
        code: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = ['/dashboard', '/settings', '/api/protected'];
const authPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path needs protection
  const isProtected = protectedPaths.some(path =>
    pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some(path =>
    pathname.startsWith(path)
  );

  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirect logic
  if (isProtected && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};`,
        explanation: 'Authentication middleware with protected routes.'
      }
    ],
    challenge: {
      starterCode: `// Create middleware that:
// 1. Logs all requests to /api/*
// 2. Adds request timing header
// 3. Blocks requests from certain countries

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const blockedCountries = ['XX', 'YY'];

export function middleware(request: NextRequest) {
  const start = Date.now();
  // Your code here
}

export const config = {
  matcher: '/api/:path*'
};`,
      solution: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const blockedCountries = ['XX', 'YY'];

export function middleware(request: NextRequest) {
  const start = Date.now();

  // Get country from header (set by Vercel/CDN)
  const country = request.geo?.country || 'US';

  // Block certain countries
  if (blockedCountries.includes(country)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Log request
  console.log(\`[\${new Date().toISOString()}] \${request.method} \${request.url}\`);

  // Continue and add timing header
  const response = NextResponse.next();
  response.headers.set('x-response-time', \`\${Date.now() - start}ms\`);

  return response;
}

export const config = {
  matcher: '/api/:path*'
};`,
      tests: [
        { input: 'typeof middleware', expected: 'function', description: 'Should export middleware' }
      ],
      hints: ['request.geo contains location info', 'Use NextResponse.next() to continue']
    }
  },
  {
    id: 'next-24',
    slug: 'internationalization',
    title: 'Internationalization (i18n)',
    description: 'Add multi-language support to your Next.js application.',
    order: 24,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Internationalization (i18n)

Support multiple languages in your Next.js app.

## App Router i18n Setup

\`\`\`
app/
├── [lang]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
└── dictionaries/
    ├── en.json
    └── es.json
\`\`\`

## Dictionary Loading

\`\`\`tsx
// lib/dictionaries.ts
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(m => m.default),
  es: () => import('@/dictionaries/es.json').then(m => m.default)
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]();
};
\`\`\`

## Usage

\`\`\`tsx
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <h1>{dict.home.title}</h1>;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Complete i18n Setup',
        code: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(',')[0]
    .split('-')[0]
    .toLowerCase();

  return locales.includes(preferred) ? preferred : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale path
  const locale = getLocale(request);
  request.nextUrl.pathname = \`/\${locale}\${pathname}\`;
  return NextResponse.redirect(request.nextUrl);
}

// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'fr' }];
}

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}`,
        explanation: 'Full i18n implementation with middleware routing.'
      }
    ],
    challenge: {
      starterCode: `// Create a language switcher component

'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    // Replace the current language in the path with the new one
    // e.g., /en/about -> /es/about
    // Your code here
  };

  return (
    <select value={currentLang} onChange={e => switchLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}`,
      solution: `'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    const newPath = pathname.replace(\`/\${currentLang}\`, \`/\${newLang}\`);
    router.push(newPath);
  };

  return (
    <select value={currentLang} onChange={e => switchLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}`,
      tests: [
        { input: 'typeof LanguageSwitcher', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use string.replace() to swap language codes', 'router.push() navigates']
    }
  },
  {
    id: 'next-25',
    slug: 'database-integration',
    title: 'Database Integration',
    description: 'Connect to databases with Prisma and handle connection pooling.',
    order: 25,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Database Integration

Best practices for database connections in Next.js.

## Prisma Setup

\`\`\`tsx
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
\`\`\`

## Connection Pooling

For serverless, use connection pooling:

\`\`\`
DATABASE_URL="postgresql://...?pgbouncer=true"
DIRECT_URL="postgresql://..." // For migrations
\`\`\`

## Usage in Server Components

\`\`\`tsx
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany();
  return <UserList users={users} />;
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Prisma with Server Actions',
        code: `// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : []
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// app/actions/users.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

export async function createUser(formData: FormData) {
  const data = userSchema.parse({
    name: formData.get('name'),
    email: formData.get('email')
  });

  const user = await prisma.user.create({ data });
  revalidatePath('/users');
  return user;
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/users');
}`,
        explanation: 'Prisma client setup with server actions for mutations.'
      }
    ],
    challenge: {
      starterCode: `// Create a data access layer for posts
import { prisma } from '@/lib/prisma';

// Define types
interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

// Implement these functions
export async function getPosts(page = 1, limit = 10) {
  // Return paginated posts with author
  // Your code here
}

export async function createPost(data: CreatePostInput) {
  // Create post and return it
  // Your code here
}`,
      solution: `import { prisma } from '@/lib/prisma';

interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

export async function getPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.post.count()
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function createPost(data: CreatePostInput) {
  return prisma.post.create({
    data,
    include: { author: true }
  });
}`,
      tests: [
        { input: 'typeof getPosts', expected: 'function', description: 'getPosts should be exported' },
        { input: 'typeof createPost', expected: 'function', description: 'createPost should be exported' }
      ],
      hints: ['Use skip and take for pagination', 'include adds related records']
    }
  },
  {
    id: 'next-26',
    slug: 'caching-strategies',
    title: 'Caching Strategies',
    description: 'Optimize performance with Next.js caching mechanisms.',
    order: 26,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Caching Strategies

Next.js provides multiple caching layers.

## Request Memoization

\`\`\`tsx
// Automatically deduped within a request
async function getUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

// Called twice but fetched once
const user1 = await getUser('1');
const user2 = await getUser('1');
\`\`\`

## Data Cache

\`\`\`tsx
// Cached indefinitely
fetch(url, { cache: 'force-cache' });

// Never cached
fetch(url, { cache: 'no-store' });

// Time-based revalidation
fetch(url, { next: { revalidate: 3600 } });
\`\`\`

## Full Route Cache

Static routes are cached at build time. Use dynamic rendering when needed:

\`\`\`tsx
export const dynamic = 'force-dynamic';
// or
export const revalidate = 0;
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Custom Cache with unstable_cache',
        code: `import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

// Cache database queries
export const getPostsCached = unstable_cache(
  async (authorId: string) => {
    return prisma.post.findMany({
      where: { authorId },
      include: { author: true }
    });
  },
  ['posts-by-author'],
  {
    tags: ['posts'],
    revalidate: 60
  }
);

// Usage
export default async function AuthorPosts({ authorId }: { authorId: string }) {
  const posts = await getPostsCached(authorId);
  return <PostList posts={posts} />;
}

// Revalidate when posts change
'use server';
import { revalidateTag } from 'next/cache';

export async function createPost(data) {
  await prisma.post.create({ data });
  revalidateTag('posts');
}`,
        explanation: 'Using unstable_cache for database query caching.'
      }
    ],
    challenge: {
      starterCode: `// Create a cached data fetching function
import { unstable_cache } from 'next/cache';

// Simulate a slow API call
async function fetchProductsFromAPI(category: string) {
  await new Promise(r => setTimeout(r, 2000));
  return [
    { id: '1', name: 'Product 1', category },
    { id: '2', name: 'Product 2', category }
  ];
}

// Create a cached version that:
// - Caches by category
// - Uses 'products' tag
// - Revalidates every 5 minutes

export const getProducts = // Your code here`,
      solution: `import { unstable_cache } from 'next/cache';

async function fetchProductsFromAPI(category: string) {
  await new Promise(r => setTimeout(r, 2000));
  return [
    { id: '1', name: 'Product 1', category },
    { id: '2', name: 'Product 2', category }
  ];
}

export const getProducts = unstable_cache(
  async (category: string) => {
    return fetchProductsFromAPI(category);
  },
  ['products-by-category'],
  {
    tags: ['products'],
    revalidate: 300 // 5 minutes
  }
);`,
      tests: [
        { input: 'typeof getProducts', expected: 'function', description: 'Should export getProducts' }
      ],
      hints: ['unstable_cache takes function, keys, and options', 'revalidate is in seconds']
    }
  },
  {
    id: 'next-27',
    slug: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Optimize bundle size and loading performance.',
    order: 27,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Performance Optimization

Maximize your Next.js app's performance.

## Bundle Analysis

\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

\`\`\`tsx
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({});
\`\`\`

## Dynamic Imports

\`\`\`tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR
});
\`\`\`

## Image Optimization

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // For LCP images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Lazy Loading Components',
        code: `'use client';

import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';

// Dynamic import with next/dynamic
const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: false
});

// React.lazy for client components
const Modal = lazy(() => import('@/components/Modal'));

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Chart loads when visible */}
      <Chart data={data} />

      {/* Modal loads when needed */}
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}`,
        explanation: 'Code splitting for better initial load performance.'
      }
    ],
    challenge: {
      starterCode: `// Create a lazy-loaded markdown editor
import dynamic from 'next/dynamic';

// Create a dynamic import for a heavy MarkdownEditor component
// - Show loading skeleton while loading
// - Disable SSR (editor needs browser APIs)

const MarkdownEditor = // Your dynamic import here

export default function EditorPage() {
  return (
    <div>
      <h1>Write Your Post</h1>
      <MarkdownEditor />
    </div>
  );
}`,
      solution: `import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(
  () => import('@/components/MarkdownEditor'),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
    ),
    ssr: false
  }
);

export default function EditorPage() {
  return (
    <div>
      <h1>Write Your Post</h1>
      <MarkdownEditor />
    </div>
  );
}`,
      tests: [
        { input: 'typeof EditorPage', expected: 'function', description: 'Should export EditorPage' }
      ],
      hints: ['Use dynamic() from next/dynamic', 'ssr: false prevents server rendering']
    }
  },
  {
    id: 'next-28',
    slug: 'testing-nextjs',
    title: 'Testing Next.js Apps',
    description: 'Test your Next.js application with Jest and Playwright.',
    order: 28,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Testing Next.js Apps

Comprehensive testing strategies for Next.js.

## Jest Setup

\`\`\`bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
\`\`\`

## Component Testing

\`\`\`tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
\`\`\`

## E2E with Playwright

\`\`\`tsx
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Welcome');
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Testing API Routes',
        code: `// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/users/route';

describe('/api/users', () => {
  it('GET returns users', async () => {
    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST creates user', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: { name: 'John', email: 'john@test.com' }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.name).toBe('John');
  });
});

// Testing Server Actions
import { createUser } from '@/app/actions';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn().mockResolvedValue({ id: '1', name: 'John' })
    }
  }
}));

describe('createUser action', () => {
  it('creates user and revalidates', async () => {
    const formData = new FormData();
    formData.set('name', 'John');
    formData.set('email', 'john@test.com');

    const result = await createUser(formData);
    expect(result.id).toBeDefined();
  });
});`,
        explanation: 'Testing API routes and server actions.'
      }
    ],
    challenge: {
      starterCode: `// Write tests for a SearchForm component
import { render, screen, fireEvent } from '@testing-library/react';

// Component to test
function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(formData.get('query') as string);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}

describe('SearchForm', () => {
  // Write tests for:
  // 1. Renders input and button
  // 2. Calls onSearch with query when submitted
  // Your tests here
});`,
      solution: `import { render, screen, fireEvent } from '@testing-library/react';

function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(formData.get('query') as string);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}

describe('SearchForm', () => {
  it('renders input and button', () => {
    render(<SearchForm onSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearch with query when submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'test query' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});`,
      tests: [
        { input: 'typeof describe', expected: 'function', description: 'Jest should be available' }
      ],
      hints: ['Use screen.getByPlaceholderText for input', 'fireEvent.change to type in input']
    }
  },
  {
    id: 'next-29',
    slug: 'deployment',
    title: 'Deployment',
    description: 'Deploy Next.js apps to Vercel and self-hosted environments.',
    order: 29,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    content: `
# Deployment

Deploy your Next.js application to production.

## Vercel (Recommended)

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Docker Deployment

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## next.config.js for Docker

\`\`\`tsx
module.exports = {
  output: 'standalone'
};
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Production Configuration',
        code: `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker

  // Image optimization
  images: {
    domains: ['images.example.com'],
    formats: ['image/avif', 'image/webp']
  },

  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' }
        ]
      }
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ];
  },

  // Environment variables
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR
  }
};

module.exports = nextConfig;`,
        explanation: 'Production-ready Next.js configuration.'
      }
    ],
    challenge: {
      starterCode: `// Create a Dockerfile for Next.js
// Requirements:
// - Multi-stage build
// - Use node:20-alpine
// - Enable standalone output
// - Expose port 3000

# Your Dockerfile here
FROM`,
      solution: `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]`,
      tests: [
        { input: 'true', expected: 'true', description: 'Dockerfile should be valid' }
      ],
      hints: ['Use AS for stage naming', 'standalone creates server.js']
    }
  },
  {
    id: 'next-30',
    slug: 'monitoring-analytics',
    title: 'Monitoring and Analytics',
    description: 'Add analytics, error tracking, and performance monitoring.',
    order: 30,
    category: 'nextjs',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    content: `
# Monitoring and Analytics

Track performance and errors in production.

## Vercel Analytics

\`\`\`bash
npm install @vercel/analytics
\`\`\`

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

## Speed Insights

\`\`\`tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

<SpeedInsights />
\`\`\`

## Error Tracking (Sentry)

\`\`\`bash
npx @sentry/wizard@latest -i nextjs
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Custom Analytics Hook',
        code: `'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? \`?\${searchParams}\` : '');

    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url
      });
    }

    // Or custom analytics
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        event: 'page_view',
        url,
        timestamp: Date.now()
      })
    });
  }, [pathname, searchParams]);
}

// Usage in layout
'use client';

import { usePageView } from '@/hooks/usePageView';

export function AnalyticsProvider({ children }) {
  usePageView();
  return <>{children}</>;
}`,
        explanation: 'Custom page view tracking for analytics.'
      }
    ],
    challenge: {
      starterCode: `// Create an error boundary component with reporting

'use client';

import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

async function reportError(error: Error) {
  // Send to error tracking service
  await fetch('/api/errors', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack
    })
  });
}

export default function ErrorBoundary({ error, reset }: Props) {
  // Report error on mount
  // Show error UI with reset button
  // Your code here
}`,
      solution: `'use client';

import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

async function reportError(error: Error) {
  await fetch('/api/errors', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  });
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}`,
      tests: [
        { input: 'typeof ErrorBoundary', expected: 'function', description: 'Should export ErrorBoundary' }
      ],
      hints: ['Use useEffect to report on mount', 'Include reset button']
    }
  }
];

// Export all Next.js lessons
export const allNextjsLessons: Lesson[] = [
  ...nextFundamentals,
  ...dataFetchingLessons,
  ...advancedLessons
];
