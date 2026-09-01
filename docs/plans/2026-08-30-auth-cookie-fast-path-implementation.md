# Auth Cookie Fast Path Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the frontend auth flow so protected API routes use an access-token cookie first and only fall back to the server-side refresh session when required.

**Architecture:** The callback route remains responsible for OIDC token exchange. It now sets both `wm_session_id` and `wm_access_token`, while shared server helpers centralize cookie options, token parsing, and refresh logic. Protected proxy routes consume the access-token cookie first, then recover through session-backed refresh on demand.

**Tech Stack:** Next.js App Router, Route Handlers, TypeScript, server-side cookies, OIDC authorization-code flow with PKCE.

---

### Task 1: Normalize auth server helpers

**Files:**
- Create: `src/features/auth/server/auth-config.ts`
- Create: `src/features/auth/server/auth-token.ts`
- Modify: `src/features/auth/server/auth-session-store.ts`

**Steps:**
1. Add shared cookie names and cookie option helpers for transient auth state, session fallback, and access-token cookies.
2. Add one token helper module to decode access-token payloads, build session data, and refresh tokens from the auth server.
3. Export the `TokenSession` type so auth routes and proxy routes share one shape.

### Task 2: Refactor auth callback and logout routes

**Files:**
- Modify: `src/app/(routes_config)/api/(auth-routes)/auth/login/route.ts`
- Modify: `src/app/(routes_config)/api/(auth-routes)/auth/callback/route.ts`
- Modify: `src/app/(routes_config)/api/(auth-routes)/auth/logout/route.ts`

**Steps:**
1. Reuse shared transient cookie options in the login route.
2. Refactor callback to decode the access token once, store the server fallback session, set both cookies, and clean up OIDC state cookies.
3. Update logout to remove both cookies plus the stored server session.

### Task 3: Update protected route access-token usage

**Files:**
- Modify: `src/features/cart/server/cart-backend.ts`
- Modify: `src/app/(routes_config)/api/(auth-routes)/auth/session/route.ts`

**Steps:**
1. Make cart proxy read `wm_access_token` first.
2. If missing, hydrate once from the server fallback session and re-set the access-token cookie.
3. If the backend responds `401`, refresh via the stored refresh token, persist the new cookie, and retry exactly once.
4. Keep the session route lightweight, but return enough session metadata for frontend status checks.

### Task 4: Verify behavior

**Files:**
- Verify only

**Steps:**
1. Run `npm run lint`.
2. Run `npm run build`.
3. Summarize the final request flow in plain Vietnamese so future refactors are easier to follow.
