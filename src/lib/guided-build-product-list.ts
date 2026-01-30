import type { GuidedBuildProject } from "./guided-builds";

export const productListProject: GuidedBuildProject = {
  id: "guided-product-list",
  title: "Product List with Performance",
  subtitle: "Build a filterable product list with React performance optimization",
  difficulty: "intermediate",
  estimatedMinutes: 35,
  conceptsSummary: [
    "useMemo",
    "useCallback",
    "React.memo",
    "TypeScript Generics",
    "Filtering & Sorting",
    "Performance Patterns",
  ],
  description:
    "Build a product listing with search, category filters, and sorting — all performance-optimized. You'll learn useMemo for expensive calculations, useCallback for stable function references, React.memo to prevent unnecessary re-renders, and TypeScript generics. These are the patterns that make React apps feel fast.",
  packageJson: {
    name: "product-list",
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
    <title>Product List</title>
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
          name: "product-list",
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
      content: `// Product List App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Product Catalog</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "typescript",
    },
    {
      path: "src/ProductCard.tsx",
      content: `// ProductCard component — you'll build this step by step

export default function ProductCard() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/SearchBar.tsx",
      content: `// SearchBar component — you'll build this step by step

export default function SearchBar() {
  return null
}`,
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
  background: #0f0f1a;
  color: #e0e0e0;
  min-height: 100vh;
  padding: 40px 20px;
}

.app {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 8px;
  color: #a78bfa;
  font-size: 1.75rem;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.toolbar input {
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #1a1a2e;
  color: #e0e0e0;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.toolbar input:focus {
  border-color: #a78bfa;
}

.toolbar select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #1a1a2e;
  color: #e0e0e0;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}

.product-count {
  text-align: center;
  color: #6272a4;
  font-size: 0.85rem;
  margin-bottom: 16px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.product-card {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #2a2a4a;
  transition: border-color 0.2s;
}

.product-card:hover {
  border-color: #a78bfa;
}

.product-card .category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #a78bfa;
  margin-bottom: 8px;
}

.product-card .name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-card .price {
  font-size: 1.25rem;
  color: #51cf66;
  font-weight: 700;
  margin-bottom: 8px;
}

.product-card .rating {
  font-size: 0.85rem;
  color: #fcc05c;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6272a4;
}

.no-results .icon {
  font-size: 2rem;
  margin-bottom: 8px;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "pl-step-1",
      order: 1,
      title: "Define the Product interface",
      instruction:
        "At the top of `src/App.tsx` (line 1), define a TypeScript interface for a product with id, name, price, category, and rating.",
      explanation:
        "The Product interface is the foundation for type safety throughout this project. Every component that handles products will reference this type, ensuring consistency.",
      targetFile: "src/App.tsx",
      codeToWrite: `export interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
}`,
      placement: { type: "line", line: 1 },
      highlightLines: [1, 7],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "interface\\s+Product\\s*\\{",
          description: "Product interface is defined",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "price:\\s*number",
          description: "price is typed as number",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "rating:\\s*number",
          description: "rating is typed as number",
        },
      ],
      deepExplanation:
        "We export the interface so other components can import it. This is a key TypeScript pattern: define your data types once, import them everywhere. If you later add a `description` field to Product, TypeScript will flag every place that needs updating. The `id: number` is the unique identifier, `price` and `rating` are numbers for math operations, and `category` is a string for filtering.",
      concepts: ["interfaces", "export", "type definitions"],
    },
    {
      id: "pl-step-2",
      order: 2,
      title: "Create hardcoded products array",
      instruction:
        "After the Product interface (around line 8), create a typed array of sample products.",
      explanation:
        "Using `Product[]` as the type annotation ensures every object in the array matches the Product interface. If you misspell a field or use the wrong type, TypeScript will catch it immediately.",
      targetFile: "src/App.tsx",
      codeToWrite: `const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', rating: 4.5 },
  { id: 2, name: 'Running Shoes', price: 129.99, category: 'Sports', rating: 4.8 },
  { id: 3, name: 'Coffee Maker', price: 49.99, category: 'Home', rating: 4.2 },
  { id: 4, name: 'Yoga Mat', price: 29.99, category: 'Sports', rating: 4.6 },
  { id: 5, name: 'Desk Lamp', price: 34.99, category: 'Home', rating: 4.0 },
  { id: 6, name: 'Bluetooth Speaker', price: 59.99, category: 'Electronics', rating: 4.3 },
  { id: 7, name: 'Water Bottle', price: 24.99, category: 'Sports', rating: 4.7 },
  { id: 8, name: 'Mechanical Keyboard', price: 149.99, category: 'Electronics', rating: 4.9 },
  { id: 9, name: 'Plant Pot Set', price: 19.99, category: 'Home', rating: 4.1 },
  { id: 10, name: 'Fitness Tracker', price: 99.99, category: 'Electronics', rating: 4.4 },
]`,
      placement: { type: "line", line: 9 },
      highlightLines: [9, 20],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "const\\s+PRODUCTS:\\s*Product\\[\\]",
          description: "Products array is typed as Product[]",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "id:\\s*1",
          description: "Products have id fields",
        },
      ],
      deepExplanation:
        "Using `const PRODUCTS: Product[]` is a type annotation — it tells TypeScript to verify every item matches `Product`. Without the annotation, TypeScript would infer the type, which usually works but can be less strict. The uppercase name `PRODUCTS` is a convention for constants that don't change. In a real app, this data would come from an API, but hardcoding it lets us focus on the React patterns.",
      concepts: ["type annotations", "typed arrays", "constant data"],
    },
    {
      id: "pl-step-3",
      order: 3,
      title: "Build ProductCard with typed props",
      instruction:
        "In `src/ProductCard.tsx`, replace the entire file with a component that receives a typed Product prop.",
      explanation:
        "The props interface `{ product: Product }` tells TypeScript exactly what this component expects. Destructuring `{ product }` in the function signature gives us direct access to the prop.",
      targetFile: "src/ProductCard.tsx",
      codeToWrite: `import type { Product } from './App'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="category">{product.category}</div>
      <div className="name">{product.name}</div>
      <div className="price">\${product.price.toFixed(2)}</div>
      <div className="rating">{'\u2605'.repeat(Math.floor(product.rating))} {product.rating}</div>
    </div>
  )
}

export default ProductCard`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 19],
      validation: [
        {
          targetFile: "src/ProductCard.tsx",
          pattern: "interface\\s+ProductCardProps",
          description: "Props interface is defined",
        },
        {
          targetFile: "src/ProductCard.tsx",
          pattern: "product:\\s*Product",
          description: "product prop is typed",
        },
        {
          targetFile: "src/ProductCard.tsx",
          pattern: "product\\.price\\.toFixed",
          description: "Price is formatted",
        },
      ],
      deepExplanation:
        "Defining a separate `ProductCardProps` interface for the component's props is a React+TypeScript best practice. It documents what the component needs and gives you autocomplete when using it. `import type` imports only the type — it's erased from the JavaScript output, keeping bundle size small. The star rendering uses `'\\u2605'.repeat(Math.floor(product.rating))` to create filled stars based on the integer part of the rating.",
      concepts: ["props interface", "import type", "component typing"],
    },
    {
      id: "pl-step-4",
      order: 4,
      title: "Wrap ProductCard with React.memo",
      instruction:
        "In `src/ProductCard.tsx`, wrap the component export with `React.memo` to prevent unnecessary re-renders.",
      explanation:
        "`React.memo` is a higher-order component that memoizes the render output. If the props haven't changed (shallow comparison), React skips re-rendering this component entirely. This matters when the parent re-renders frequently (like on every keystroke in search).",
      targetFile: "src/ProductCard.tsx",
      codeToWrite: `import React from 'react'
import type { Product } from './App'

interface ProductCardProps {
  product: Product
}

const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="category">{product.category}</div>
      <div className="name">{product.name}</div>
      <div className="price">\${product.price.toFixed(2)}</div>
      <div className="rating">{'\u2605'.repeat(Math.floor(product.rating))} {product.rating}</div>
    </div>
  )
})

export default ProductCard`,
      placement: { type: "replace-range", startLine: 1, endLine: 19 },
      highlightLines: [1, 20],
      validation: [
        {
          targetFile: "src/ProductCard.tsx",
          pattern: "React\\.memo\\(",
          description: "Component is wrapped with React.memo",
        },
      ],
      deepExplanation:
        "Without `React.memo`, every time App re-renders (like when the search text changes), ALL ProductCards would re-render too — even the ones whose data didn't change. With `React.memo`, React compares the previous `product` prop with the new one. If they're the same object reference, it skips the render. This is called 'shallow comparison.' For this to work, you shouldn't create new objects for props on every render. The combo of React.memo + useMemo + useCallback is React's performance toolkit.",
      concepts: ["React.memo", "memoization", "shallow comparison", "re-render prevention"],
    },
    {
      id: "pl-step-5",
      order: 5,
      title: "Add search state and SearchBar",
      instruction:
        "In `src/SearchBar.tsx`, build a controlled search input component with typed props. Then in App.tsx, add search state.",
      explanation:
        "SearchBar receives the current value and an onChange callback as props. This 'controlled component' pattern means the parent (App) owns the search state.",
      targetFile: "src/SearchBar.tsx",
      codeToWrite: `import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = React.memo(function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
})

export default SearchBar`,
      placement: { type: "replace-range", startLine: 1, endLine: 5 },
      highlightLines: [1, 19],
      validation: [
        {
          targetFile: "src/SearchBar.tsx",
          pattern: "interface\\s+SearchBarProps",
          description: "SearchBar props are typed",
        },
        {
          targetFile: "src/SearchBar.tsx",
          pattern: "onChange:\\s*\\(value:\\s*string\\)\\s*=>\\s*void",
          description: "onChange callback is properly typed",
        },
        {
          targetFile: "src/SearchBar.tsx",
          pattern: "React\\.memo",
          description: "SearchBar is memoized",
        },
      ],
      deepExplanation:
        "The `onChange: (value: string) => void` type is a function type — it takes a string and returns nothing. This is cleaner than passing the raw event up; the parent doesn't need to know about DOM events. The SearchBar is also wrapped in React.memo, so it only re-renders when `value` or `onChange` changes. However, for React.memo to work with the `onChange` prop, the parent must use `useCallback` to create a stable function reference — we'll do that in a later step.",
      concepts: ["callback props", "function types", "controlled components", "React.memo"],
    },
    {
      id: "pl-step-6",
      order: 6,
      title: "Add state and useMemo for filtering",
      instruction:
        "In `src/App.tsx`, import hooks and components, add state variables, and use `useMemo` to filter products by search term.",
      explanation:
        "`useMemo` caches the result of an expensive computation (filtering) and only recalculates when its dependencies change. Without it, the filter would run on every render, even if nothing changed.",
      targetFile: "src/App.tsx",
      codeToWrite: `import { useState, useMemo, useCallback } from 'react'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'

export interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 7 },
      highlightLines: [1, 11],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "import.*useMemo.*from\\s*['\"]react['\"]",
          description: "useMemo is imported",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "import.*useCallback.*from\\s*['\"]react['\"]",
          description: "useCallback is imported",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "import\\s+ProductCard",
          description: "ProductCard is imported",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "import\\s+SearchBar",
          description: "SearchBar is imported",
        },
      ],
      concepts: ["useMemo", "useCallback", "imports"],
    },
    {
      id: "pl-step-7",
      order: 7,
      title: "Add filter state and category dropdown",
      instruction:
        "Inside the App function, add state for search, category, and sort. Extract unique categories from the products array.",
      explanation:
        "We define three filter/sort controls: search text, category, and sort order. The categories are derived from the products data using `Set` for uniqueness, ensuring we don't hardcode category names.",
      targetFile: "src/App.tsx",
      codeToWrite: `export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default')

  const categories = useMemo(
    () => ['all', ...new Set(PRODUCTS.map(p => p.category))],
    []
  )`,
      placement: { type: "replace-range", startLine: 23, endLine: 26 },
      highlightLines: [23, 31],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useState<.*price-asc.*price-desc.*rating",
          description: "sortBy has typed union state",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "new\\s+Set\\(",
          description: "Categories use Set for uniqueness",
        },
      ],
      deepExplanation:
        "The `sortBy` state uses a union type just like the contact form's status. TypeScript ensures we only set valid sort options. The `categories` useMemo with empty dependency array `[]` means it only computes once — the products array never changes. `new Set(...)` creates a unique collection, and spreading it into an array with `[...new Set()]` gives us a deduped array. Adding 'all' as the first option lets users clear the category filter.",
      concepts: ["union types", "Set", "useMemo", "derived data"],
    },
    {
      id: "pl-step-8",
      order: 8,
      title: "Combine search and category filtering with useMemo",
      instruction:
        "After the categories computation, add a `useMemo` that filters products by both search term and category.",
      explanation:
        "`useMemo` recalculates only when `search` or `category` changes. If neither changed, it returns the cached result. The dependency array `[search, category]` tells React exactly which values to watch.",
      targetFile: "src/App.tsx",
      codeToWrite: `  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])`,
      placement: { type: "line", line: 32 },
      highlightLines: [32, 38],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useMemo\\(\\(\\)\\s*=>\\s*\\{[\\s\\S]*PRODUCTS\\.filter",
          description: "Products are filtered inside useMemo",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "\\[search,\\s*category\\]",
          description: "useMemo depends on search and category",
        },
      ],
      deepExplanation:
        "Without useMemo, this filter would run on every render — including renders caused by unrelated state changes. With useMemo, React caches the filtered array and reuses it if search and category haven't changed. The `.toLowerCase()` on both search term and product name makes the search case-insensitive. The `&&` combines both filters: a product must match the search AND the category to appear.",
      concepts: ["useMemo", "dependency array", "array filter", "case-insensitive search"],
    },
    {
      id: "pl-step-9",
      order: 9,
      title: "Add sort functionality with useMemo",
      instruction:
        "After filteredProducts, add another `useMemo` that sorts the filtered results based on the selected sort order.",
      explanation:
        "We chain useMemo calls: filter first, then sort. The sort depends on both `filteredProducts` and `sortBy`. Using `[...filteredProducts]` creates a copy because `.sort()` mutates the array.",
      targetFile: "src/App.tsx",
      codeToWrite: `  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
    }
    return sorted
  }, [filteredProducts, sortBy])`,
      placement: { type: "line", line: 40 },
      highlightLines: [40, 54],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useMemo\\(\\(\\)\\s*=>\\s*\\{[\\s\\S]*\\.sort",
          description: "Sorting is memoized",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "\\[filteredProducts,\\s*sortBy\\]",
          description: "Sort depends on filtered results and sort key",
        },
      ],
      deepExplanation:
        "The `switch` statement handles each sort option. For numbers, `.sort((a, b) => a.price - b.price)` sorts ascending (small to large) because a negative result means 'a comes first.' Swapping to `b.price - a.price` reverses the order. We spread `[...filteredProducts]` because `.sort()` mutates in place — if we sorted `filteredProducts` directly, we'd modify the cached useMemo result, breaking React's assumptions. The 'default' case does nothing, leaving the original order.",
      concepts: ["useMemo chaining", "array sort", "switch statement", "immutable sort"],
    },
    {
      id: "pl-step-10",
      order: 10,
      title: "Use useCallback for stable event handlers",
      instruction:
        "After the sort useMemo, add `useCallback` wrappers for the event handlers that get passed to memoized child components.",
      explanation:
        "`useCallback` returns the same function reference between renders (unless dependencies change). Without it, `React.memo` on child components would be useless — they'd get new function props every render and re-render anyway.",
      targetFile: "src/App.tsx",
      codeToWrite: `  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }, [])

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'rating')
  }, [])`,
      placement: { type: "line", line: 56 },
      highlightLines: [56, 66],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useCallback\\(",
          description: "useCallback is used for event handlers",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "handleSearchChange",
          description: "Search handler is memoized",
        },
      ],
      deepExplanation:
        "Here's why useCallback matters: without it, each render creates a new `handleSearchChange` function. Even though the function logic is identical, it's a new reference (`{} !== {}`). React.memo on SearchBar would see 'onChange prop changed!' and re-render. With `useCallback(fn, [])`, React returns the same function reference each time (the deps `[]` means 'never recreate'). Now React.memo sees 'onChange prop is the same reference' and skips the re-render. The `as` type assertion on sortBy is necessary because `e.target.value` is always `string`, but we know it's one of our union values.",
      concepts: ["useCallback", "stable references", "React.memo compatibility", "type assertions"],
    },
    {
      id: "pl-step-11",
      order: 11,
      title: "Render the toolbar and product grid",
      instruction:
        "Replace the return statement with the full UI: toolbar with search, category dropdown, sort dropdown, product count, and the product grid.",
      explanation:
        "The toolbar combines all filter controls. The product grid uses `.map()` to render memoized ProductCards. The key prop uses `product.id` for stable identification.",
      targetFile: "src/App.tsx",
      codeToWrite: `  return (
    <div className="app">
      <h1>Product Catalog</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={handleSearchChange} />
        <select value={category} onChange={handleCategoryChange}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="default">Default Order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="product-count">
        {sortedProducts.length} of {PRODUCTS.length} products
      </p>

      {sortedProducts.length === 0 ? (
        <div className="no-results">
          <div className="icon">?</div>
          <p>No products match your filters</p>
        </div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 67, endLine: 74 },
      highlightLines: [67, 107],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "<SearchBar",
          description: "SearchBar component is rendered",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "sortedProducts\\.map",
          description: "Products are rendered with .map()",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "<ProductCard\\s+key=",
          description: "ProductCards have unique keys",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "sortedProducts\\.length\\s*===\\s*0",
          description: "No results state is handled",
        },
      ],
      deepExplanation:
        "This is where the performance optimization chain comes together. When the user types in search: (1) `search` state updates → App re-renders, (2) `filteredProducts` recalculates (useMemo deps changed), (3) `sortedProducts` recalculates (filteredProducts changed), (4) SearchBar receives same `onChange` reference (useCallback) → React.memo skips re-render, (5) ProductCards whose `product` prop didn't change → React.memo skips re-render. Only the cards that actually changed get re-rendered.",
      concepts: ["rendering", "component composition", "no results state", "performance chain"],
    },
    {
      id: "pl-step-12",
      order: 12,
      title: "Add product count and verify the optimization chain",
      instruction:
        "The product count display and no-results state are already in the JSX. Let's verify the complete optimization chain works by reviewing how useMemo, useCallback, and React.memo work together.",
      explanation:
        "The performance optimization chain: (1) useMemo caches filter/sort results, (2) useCallback creates stable function references, (3) React.memo skips re-renders when props haven't changed. These three tools work together — each one alone isn't enough.",
      targetFile: "src/App.tsx",
      codeToWrite: `  // Performance chain:
  // 1. useMemo(filteredProducts) - only recalculates when search/category changes
  // 2. useMemo(sortedProducts) - only recalculates when filtered results or sortBy changes
  // 3. useCallback(handlers) - stable function references for memoized children
  // 4. React.memo(ProductCard) - skips re-render when product prop unchanged
  // 5. React.memo(SearchBar) - skips re-render when value/onChange unchanged`,
      placement: { type: "line", line: 67 },
      highlightLines: [67, 72],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "useMemo",
          description: "useMemo is used for filtering/sorting",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "useCallback",
          description: "useCallback is used for handlers",
        },
        {
          targetFile: "src/ProductCard.tsx",
          pattern: "React\\.memo",
          description: "ProductCard is wrapped in React.memo",
        },
      ],
      concepts: ["performance optimization", "useMemo", "useCallback", "React.memo"],
    },
  ],
};
