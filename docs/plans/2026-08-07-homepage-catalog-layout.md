# Homepage Catalog Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the client home page so `Search by Category` and `Currently Trending` feel like a denser storefront catalog that blends Zatu's horizontal shopping rhythm with Entertainment Earth's cleaner catalog presentation.

**Architecture:** Keep the existing server component and API flow unchanged. Only adjust the presentation structure in the homepage page component using Tailwind classes and small static-label improvements.

**Tech Stack:** Next.js App Router, React Server Components, Tailwind CSS, Ant Design Carousel

---

### Task 1: Tune shared page spacing and hero framing

**Files:**
- Modify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\(client)\page.tsx`

**Step 1:** Reduce overly airy spacing in the main layout and anchor content inside a broader storefront container.

**Step 2:** Keep the hero carousel, but make its wrapper read like a merchandising banner instead of a boxed promo card.

### Task 2: Rework Search by Category into a compact quick-entry strip

**Files:**
- Modify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\(client)\page.tsx`

**Step 1:** Replace the basic section heading with a two-part heading block and helper copy.

**Step 2:** Convert category cards into lower-height tiles with tighter padding and denser desktop columns.

### Task 3: Rework Currently Trending into a denser catalog grid

**Files:**
- Modify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshfe\app\(client)\page.tsx`

**Step 1:** Add a centered catalog-style section heading inspired by Entertainment Earth.

**Step 2:** Increase the desktop card count per row and reduce card visual weight.

**Step 3:** Center product text and simplify the CTA chip so the section reads like a shopping shelf.

### Task 4: Verify the page compiles cleanly at the file level

**Files:**
- Verify: `D:\E-CommerceProject\aspnet-core\src_Fe\memoryshardfe\app\(client)\page.tsx`

**Step 1:** Re-open the edited file and confirm JSX structure and Tailwind classes are balanced.

**Step 2:** Note any follow-up polish items separately instead of mixing them into this patch.
