import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { setTokenSession } from "@/features/auth/server/auth-session-store";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  APP_URL,
  AUTH_SERVER_URL,
  CLIENT_ID,
  createAccessTokenCookieOptions,
  OIDC_CODE_VERIFIER_COOKIE_NAME,
  OIDC_STATE_COOKIE_NAME,
  REDIRECT_URI,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/features/auth/server/auth-config";
import {
  buildTokenSession,
  extractAccessTokenProfile,
} from "@/features/auth/server/auth-token";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      `${APP_URL}/auth/callback?status=error&message=${encodeURIComponent(
        errorDescription ?? error
      )}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${APP_URL}/auth/callback?status=error&message=${encodeURIComponent(
        "Missing code or state."
      )}`
    );
  }

  const storedState = request.cookies.get(OIDC_STATE_COOKIE_NAME)?.value;
  const codeVerifier = request.cookies.get(OIDC_CODE_VERIFIER_COOKIE_NAME)?.value;

  if (!storedState || !codeVerifier || storedState !== state) {
    return NextResponse.redirect(
      `${APP_URL}/auth/callback?status=error&message=${encodeURIComponent(
        "Invalid auth state."
      )}`
    );
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const tokenResponse = await fetch(`${AUTH_SERVER_URL}/connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const tokenResult = (await tokenResponse.json()) as Record<string, unknown>;
  if (!tokenResponse.ok) {
    const message =
      (tokenResult.error_description as string | undefined) ??
      (tokenResult.error as string | undefined) ??
      "Token exchange failed.";
    return NextResponse.redirect(
      `${APP_URL}/auth/callback?status=error&message=${encodeURIComponent(message)}`
    );
  }

  const sessionId = crypto.randomUUID();
  const expiresIn = Number(tokenResult.expires_in ?? 300);
  const accessToken = String(tokenResult.access_token ?? "");
  const refreshToken = tokenResult.refresh_token
    ? String(tokenResult.refresh_token)
    : undefined;

  const tokenSession = buildTokenSession({
    accessToken,
    refreshToken,
    expiresInSeconds: expiresIn,
  });
  setTokenSession(sessionId, tokenSession);

  let destinationUrl = `${APP_URL}/`;

  try {
    const profile = extractAccessTokenProfile(accessToken);
    destinationUrl = profile.role.includes("Admin")
      ? `${APP_URL}/admin`
      : `${APP_URL}/`;
  } catch (error) {
    console.error("Error processing JWT token:", error);
  }

  const response = NextResponse.redirect(destinationUrl);

  response.cookies.set(SESSION_COOKIE_NAME, sessionId, sessionCookieOptions);
  response.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    accessToken,
    createAccessTokenCookieOptions(expiresIn)
  );
  response.cookies.delete(OIDC_STATE_COOKIE_NAME);
  response.cookies.delete(OIDC_CODE_VERIFIER_COOKIE_NAME);

  return response;
}
