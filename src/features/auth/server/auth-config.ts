const isProduction = process.env.NODE_ENV === "production";

export const AUTH_SERVER_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVER_URL ?? "https://localhost:44321";
export const CLIENT_ID =
  process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? "MemoryShard_Next";
export const REDIRECT_URI =
  process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI ??
  "http://localhost:3000/api/auth/callback";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const SCOPES =
  process.env.NEXT_PUBLIC_OIDC_SCOPES ??
  "openid profile email offline_access E_Commerce_StarterApp";

export const OIDC_STATE_COOKIE_NAME = "oidc_state";
export const OIDC_CODE_VERIFIER_COOKIE_NAME = "oidc_code_verifier";
export const SESSION_COOKIE_NAME = "wm_session_id";
export const ACCESS_TOKEN_COOKIE_NAME = "wm_access_token";

export const transientCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 10 * 60,
};

export const sessionCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 10,
};

export function createAccessTokenCookieOptions(maxAgeSeconds = 5 * 60) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
