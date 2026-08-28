---
name: fe-tailwind-shadcn-ui
description: >-
  Use this skill when designing, styling, or implementing UI components using Tailwind CSS, Shadcn UI, Radix UI, or creating responsive and accessible web layouts.
---

# Tailwind CSS & UI Design System Standards

Apply these guidelines for clean, responsive, accessible, and themeable UI components:

## 1. Class Composition & Utility Standards
- **Class Merging**: Always use the `cn()` utility (`clsx` + `tailwind-merge`) when conditionally applying Tailwind classes or accepting `className` props:
  ```tsx
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
- **Ordering**: Follow standard class ordering: Layout -> Positioning -> Sizing -> Typography -> Backgrounds -> Borders -> Effects -> Transitions/Animations.

## 2. Responsive & Mobile-First Design
- Always design **mobile-first** using standard Tailwind breakpoints:
  - Base classes for mobile (e.g., `flex-col`, `w-full`)
  - Breakpoints for larger screens (e.g., `sm:`, `md:flex-row`, `lg:`, `xl:`).
- Avoid fixed pixel widths (`w-[350px]`) where relative fluid classes (`w-full max-w-sm`) are more flexible.

## 3. Dark Mode & Theming
- Support dark mode systematically using the `dark:` variant and CSS variables (HSL or OKLCH format):
  - `bg-background text-foreground`
  - `dark:bg-slate-900 dark:text-slate-100`
- Ensure border colors, muted text, and card backgrounds adapt seamlessly in both light and dark themes.

## 4. Accessibility (a11y) & Interactive States
- **Hover / Focus / Active States**: All interactive elements (buttons, links, inputs) must have clear visual feedback:
  - `hover:bg-primary/90 transition-colors`
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
  - `disabled:pointer-events-none disabled:opacity-50`
- **ARIA & Semantic HTML**:
  - Always use native semantic elements (`<button>`, `<dialog>`, `<nav>`, `<aside>`, `<main>`).
  - For icon-only buttons, always include `aria-label="Description"` or `<span className="sr-only">Description</span>`.
