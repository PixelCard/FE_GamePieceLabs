# About Values Image Cards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Chuy?n section `about-values` t? card icon sang card ?nh th?t, d?ng b? type và data d? gi?ng layout m?u hon.

**Architecture:** Section này s? b? hoàn toàn nhánh icon và dùng m?t data contract don gi?n hon: m?i core value ch? g?m `title`, `description`, `imageSrc`. Component render ?nh b?ng `next/image`, text gi? ? du?i d? bám sát b? c?c hi?n t?i nhung nhìn g?n m?u hon.

**Tech Stack:** Next.js, React, TypeScript, `next/image`, Tailwind CSS, shadcn `Card`

---

### Task 1: Chu?n hóa contract d? li?u

**Files:**
- Modify: `src/features/about/types/about-content.ts`
- Modify: `src/features/about/data/about-content.ts`

**Step 1:** Ð?i key `ImagesSrc` sang `imageSrc` trong type.

**Step 2:** Ð?ng b? t?t c? item data trong section `values` sang key m?i.

**Step 3:** Ki?m tra l?i d? component có th? d?c data m?i mà không c?n fallback icon.

### Task 2: Ð?i UI card icon sang card ?nh

**Files:**
- Modify: `src/features/about/components/about-values.tsx`

**Step 1:** B? toàn b? import và mapping icon cu.

**Step 2:** Render ?nh th?t ? ph?n trên card b?ng `next/image`.

**Step 3:** Gi? title + description ? du?i, canh gi?a d? g?n b? c?c m?u.

**Step 4:** Gi? hover nh? và responsive hi?n có.

### Task 3: Ki?m tra nhanh ph?n thay d?i

**Files:**
- Verify: `src/features/about/components/about-values.tsx`
- Verify: `src/features/about/data/about-content.ts`
- Verify: `src/features/about/types/about-content.ts`

**Step 1:** Ch?y `eslint` riêng file `about-values.tsx`.

**Step 2:** N?u c?n, ch?y `tsc`/`next lint` ph?m vi nh? nh?t có th? d? b?t l?i type liên quan.

**Step 3:** Ghi l?i các l?i n?n c?a project n?u chúng không thu?c ph?n v?a s?a.
