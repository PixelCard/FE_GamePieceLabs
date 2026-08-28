import { NextResponse } from "next/server";
import { randomString, sha256Base64Url } from "@/features/auth/lib/oidc-pkce";

export const dynamic = "force-dynamic";

const AUTH_SERVER_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVER_URL ?? "https://localhost:44321";
const CLIENT_ID = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? "MemoryShard_Next";
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI ??
  "http://localhost:3000/api/auth/callback";
const SCOPES =
  process.env.NEXT_PUBLIC_OIDC_SCOPES ??
  "openid profile email offline_access E_Commerce_StarterApp";

export async function GET(request: Request) {
  const state = randomString(24);
  const codeVerifier = randomString(48);
  const codeChallenge = sha256Base64Url(codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const response = NextResponse.redirect(
    `${AUTH_SERVER_URL}/connect/authorize?${params.toString()}`
  );

  const sessionCokkieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 10 * 60,
  }

  response.cookies.set("oidc_state", state, sessionCokkieOptions);

  response.cookies.set("oidc_code_verifier", codeVerifier, sessionCokkieOptions);

  return response;
}
