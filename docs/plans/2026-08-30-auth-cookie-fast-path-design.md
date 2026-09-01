# Simplified Auth Cookie Flow Design

> Approved direction: keep `wm_session_id` as the server-side fallback key, add a short-lived access-token cookie for the fast path, and refresh only when the API rejects the token.

## Goal

Reduce the day-to-day complexity of the current frontend auth flow without throwing away the existing refresh-token/session fallback that the project already depends on.

## Agreed Flow

1. After OIDC login callback succeeds, the frontend stores:
   - `wm_session_id`: points to the in-memory server session entry that contains `accessToken`, `refreshToken`, and lightweight profile data.
   - `wm_access_token`: short-lived cookie used directly by frontend API proxy routes.
2. Protected frontend API routes try `wm_access_token` first.
3. If the cookie is missing, the route may hydrate it once from the existing server session.
4. If the backend API returns `401`, the route uses `wm_session_id` to find the stored refresh token, requests a new access token from the auth server, updates the session entry, resets `wm_access_token`, and retries once.
5. Logout clears both cookies and removes the server session entry.

## Why This Direction

- Simpler mental model than “always go through the BFF session store first”.
- Keeps the existing fallback path, so we do not lose refresh-token rotation support.
- Avoids forcing the frontend to hit `/connect/token` on every request.
- Keeps future migration options open if the system later needs a stricter BFF-only model.

## Trade-off

- The frontend now carries a short-lived access-token cookie in addition to `wm_session_id`.
- This is intentionally a hybrid model: simpler than full BFF, but still not as minimal as pure stateless JWT storage.
- The session store remains in-memory, so a server restart still invalidates the fallback session.
