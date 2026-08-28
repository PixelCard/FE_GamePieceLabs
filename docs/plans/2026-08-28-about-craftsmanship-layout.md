# About Craftsmanship Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Chuyen section About Craftsmanship sang layout 2 cot gom video ben trai va content card ben phai, bo grid 4 feature cards.

**Architecture:** Tai su dung `VideoFrame` cho media va `StoreSectionHeading` + `Card` cho khoi noi dung. Du lieu feature cards duoc giu lai trong data de tranh pha vo schema cu, dong thoi them metadata video rieng cho section.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui Card.

---

### Task 1: Add media data for craftsmanship section

**Files:**
- Modify: `D:/E-CommerceProject/FE_Project/src/features/about/types/about-content.ts`
- Modify: `D:/E-CommerceProject/FE_Project/src/features/about/data/about-content.ts`

**Step 1:** Them type video embed cho craftsmanship section.

**Step 2:** Them du lieu `showcaseVideo` vao mock content hien tai.

**Step 3:** Giu cac field cu de tranh anh huong ngoai scope.

### Task 2: Rebuild About Craftsmanship section

**Files:**
- Modify: `D:/E-CommerceProject/FE_Project/src/features/about/components/about-craftsmanship.tsx`

**Step 1:** Bo layout `ImageFrame` full-width va grid 4 cards.

**Step 2:** Dung layout `grid` 2 cot responsive voi `VideoFrame` ben trai va `Card` ben phai.

**Step 3:** Tai su dung `StoreSectionHeading` cho typography ben phai.

**Step 4:** Them spacing, bo goc, border va shadow de gan voi mau tham chieu.

### Task 3: Verify

**Files:**
- Verify: `D:/E-CommerceProject/FE_Project/src/features/about/components/about-craftsmanship.tsx`

**Step 1:** Chay `npm run lint`.

**Step 2:** Chay `npm run build`.

**Step 3:** Ghi nhan warning/loi con ton tai neu co.
