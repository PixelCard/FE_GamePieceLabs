---
name: fe-typescript-standards
description: >-
  Use this skill when writing TypeScript code for Frontend applications, defining types/interfaces, typing React props, handling form schemas with Zod, or eliminating type errors.
---

# Frontend TypeScript & Schema Standards

Apply these TypeScript practices for type safety, maintainability, and clean code:

## 1. Strict Typing & Anti-Patterns
- **No `any`**: Never use `any`. Use `unknown` when the type is truly uncertain, and narrow it with type guards or schemas.
- **Explicit Return Types**: Annotate return types for utility functions, custom hooks, and API handlers.
- **Interfaces vs Types**:
  - Use `interface` for object structures and component Props that may be extended.
  - Use `type` for unions, primitives, tuples, utility types, and mapped types.

## 2. Component Props & Event Typing
- Type component props explicitly:
  ```typescript
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
  }
  ```
- Type React event handlers accurately:
  - Form Submit: `React.FormEvent<HTMLFormElement>`
  - Input Change: `React.ChangeEvent<HTMLInputElement>`
  - Click Handler: `React.MouseEvent<HTMLButtonElement>`

## 3. Discriminated Unions for Complex State
- Prefer discriminated unions over multiple optional booleans:
  ```typescript
  type AsyncState<T> =
    | { status: 'idle'; data: null; error: null }
    | { status: 'loading'; data: null; error: null }
    | { status: 'success'; data: T; error: null }
    | { status: 'error'; data: null; error: Error };
  ```

## 4. Schema Validation with Zod
- Single source of truth: Define Zod schemas and infer TypeScript types directly:
  ```typescript
  import { z } from 'zod';

  export const userProfileSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    age: z.number().int().min(18).optional(),
    role: z.enum(['admin', 'member', 'guest']),
  });

  export type UserProfile = z.infer<typeof userProfileSchema>;
  ```
