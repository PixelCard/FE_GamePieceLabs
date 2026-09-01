import { NextResponse } from "next/server";
import { randomString, sha256Base64Url } from "@/features/auth/lib/oidc-pkce";
import {
  AUTH_SERVER_URL,
  CLIENT_ID,
  OIDC_CODE_VERIFIER_COOKIE_NAME,
  OIDC_STATE_COOKIE_NAME,
  REDIRECT_URI,
  SCOPES,
  transientCookieOptions,
} from "@/features/auth/server/auth-config";

export const dynamic = "force-dynamic";

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

  response.cookies.set(OIDC_STATE_COOKIE_NAME, state, transientCookieOptions);
  response.cookies.set(
    OIDC_CODE_VERIFIER_COOKIE_NAME,
    codeVerifier,
    transientCookieOptions
  );

  return response;
}
