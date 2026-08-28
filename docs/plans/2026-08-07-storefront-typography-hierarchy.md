# Storefront Typography Hierarchy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Document a reusable storefront typography system and apply it to the current client header and homepage sections.

**Architecture:** Keep the existing layout and data flow unchanged. Only adjust type scale, weight, spacing, and emphasis so the page reads like a cleaner US/UK storefront catalog.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Ant Design Carousel

---

### Task 1: Define the reusable typography rules

**Files:**
- Create: `D:\E-CommerceProject\aspnet-core\docs\ui\storefront-typography-guide.md`

**Step 1:** Document heading, eyebrow, product title, caption, price, and CTA scales.

**Step 2:** Add guidance for optional Ant Design `Typography` usage without making it mandatory.

### Task 2: Apply the hierarchy to the homepage

**Files:**
- Modify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\(client)\page.tsx`

**Step 1:** Strengthen the hero badge, hero title, subtitle, and CTA balance.

**Step 2:** Tune section headings and card text hierarchy for category and trending areas.

### Task 3: Apply the hierarchy to the header

**Files:**
- Modify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\components\header.tsx`

**Step 1:** Tighten the logo emphasis and action label scale.

**Step 2:** Reduce visual noise in signed-in name and cart text.

### Task 4: Verify file-level consistency

**Files:**
- Verify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\(client)\page.tsx`
- Verify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\components\header.tsx`
- Verify: `D:\E-CommerceProject\aspnet-core\docs\ui\storefront-typography-guide.md`

**Step 1:** Re-open the edited files and check that the typography rhythm is internally consistent.

**Step 2:** Note any remaining polish separately.
