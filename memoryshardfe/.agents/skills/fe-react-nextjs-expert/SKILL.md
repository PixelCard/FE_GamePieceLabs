---
name: fe-react-nextjs-expert
description: >-
  Use this skill when creating, updating, or refactoring React components, Next.js App Router pages, layouts, server actions, or client hooks.
---

# React & Next.js Expert Guidelines

Apply these best practices whenever building or refactoring React and Next.js applications:

## 1. Architecture & Component Structure
- **Server Components by Default**: In Next.js App Router, keep components as React Server Components (RSC) unless interactive features (`useState`, `useEffect`, event listeners) or browser APIs are required.
- **`'use client'` Directive**: Place `'use client'` only at the top of leaf components that strictly need client-side interactivity, keeping server trees as large as possible.
- **Single Responsibility**: Keep components focused. Deconstruct complex UIs into smaller sub-components (`<Header />`, `<Sidebar />`, `<DataTable />`).
- **Custom Hooks**: Extract stateful business logic, subscriptions, and side-effects into reusable custom hooks prefixed with `use` (e.g., `useDebounce`, `useLocalStorage`, `useCart`).

## 2. Rendering & Performance Optimization
- **Prevent Unnecessary Re-renders**: Use `useCallback` and `useMemo` deliberately for expensive computations or callbacks passed to memoized children.
- **Keys in Lists**: Always use unique, stable IDs for `key` props (never use array indices for dynamic lists).
- **Dynamic Imports & Code Splitting**: Use `next/dynamic` or `React.lazy()` for heavy components (modals, charts, rich text editors) that are not needed on initial page load.
- **Images & Fonts**: Utilize `next/image` with explicit `width`/`height` or `fill`, and `next/font` for zero layout shift (CLS).

## 3. Data Fetching & Server Actions
- **Server-side Fetching**: Fetch data directly inside Server Components with async/await, utilizing Next.js caching and revalidation tags (`revalidateTag`, `revalidatePath`).
- **Server Actions**: Define server actions with `'use server'` for mutations. Always validate input data on the server side (e.g., with Zod) before database operations.
- **Error Boundaries & Suspense**: Wrap asynchronous UI sections in `<Suspense fallback={<Skeleton />} />` and leverage `error.tsx` / `loading.tsx` conventions.
