---
name: fe-state-data-fetching
description: >-
  Use this skill when managing client/server state, fetching data via TanStack Query (React Query) / SWR, handling mutations, or configuring Zustand stores.
---

# State Management & Data Fetching Guidelines

Apply these patterns to ensure resilient, predictable, and cached asynchronous state management:

## 1. TanStack Query (React Query) Patterns
- **Query Keys**: Organize query keys hierarchically using query key factories:
  ```typescript
  export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: string) => [...userKeys.lists(), { filters }] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
  };
  ```
- **Custom Hooks for Queries**:
  - Encapsulate `useQuery` inside dedicated hooks (e.g., `useUserProfile(userId)`).
  - Explicitly define `staleTime` (e.g., `5 * 60 * 1000` for 5 mins) to prevent excessive refetching.
- **Mutations & Cache Invalidation**:
  - Always invalidate or update the cache upon successful mutation with `queryClient.invalidateQueries({ queryKey: ... })`.
  - Implement optimistic updates for instant UI responses where appropriate (`onMutate`, `onError` rollback, `onSettled`).

## 2. Global Client State with Zustand
- Keep store slices minimal and focused. Store only shared client-only state (e.g., sidebar collapse state, auth modal visibility, current active theme).
- Avoid duplicating server data in client state stores — let TanStack Query handle server cache.
- Use selector functions to prevent unnecessary component re-renders:
  ```typescript
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  ```

## 3. Asynchronous UI States
- Provide seamless UI transitions for all 4 query states:
  1. **Loading / Pending**: Display skeleton loaders or spinner placeholders.
  2. **Error**: Provide descriptive user-facing error messages with a retry action button.
  3. **Empty**: Show a helpful empty state illustration and CTA when data arrays are empty.
  4. **Success**: Render the main interface cleanly.
