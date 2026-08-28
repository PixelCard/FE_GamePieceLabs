process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  
import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { setTokenSession } from "@/features/auth/server/auth-session-store";

const AUTH_SERVER_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVER_URL ?? "https://localhost:44321";
const CLIENT_ID =
 process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? "MemoryShard_Next";
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI ??
  "http://localhost:3000/api/auth/callback";
const APP_URL = 
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

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

  const storedState = request.cookies.get("oidc_state")?.value;
  const codeVerifier = request.cookies.get("oidc_code_verifier")?.value;

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

  try{
    //1. Get the payload data from jwt token and extract the role information from it.
    const payloadBase64 = accessToken.split(".")[1];
    
    //2. Decode the base64 payload and parse it as JSON to get the JWT claims
    const payloadJson = JSON.parse(
      Buffer.from(payloadBase64, "base64").toString("utf-8")
    );

    //3. Get the role information from the payload
    //ABP framework uses "role" claim for role information, while Microsoft Identity platform uses "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" claim
    const userRole = payloadJson["role"] as string | typeof payloadJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    //4. Convert to Array for (multiple roles) 
    const roleArray = Array.isArray(userRole) ? userRole : [userRole].filter(Boolean);
    
    const name = payloadJson["unique_name"] as string | undefined;

    const email = payloadJson["email"] as string | undefined;

    const preferredUsername = payloadJson["preferred_username"] as string | undefined;
    
    const displayName = name ?? preferredUsername ?? email ?? "Unknown User";
    
    //5. Store the role information in the session store along with other session data
    setTokenSession(sessionId, {
      accessToken: accessToken,
      refreshToken: tokenResult.refresh_token
        ? String(tokenResult.refresh_token)
        : undefined,
      expiresAt: Date.now() + expiresIn * 1000,
      displayName: displayName,
      email: email,
      role: roleArray,
    });
  }catch(error){
    console.error("Error processing JWT token:", error);
  }


  //=========================
  // Redirect to Home with a role definition  page with session cookie set
  //=========================

  let destinationUrl = APP_URL; // Default redirect URL after successful login

  try{

    //1. Get the payload data from jwt token and extract the role information from it.
    const payloadBase64 = accessToken.split(".")[1];

    //2. Decode the base64 payload and parse it as JSON to get the JWT claims
    const payloadJson = JSON.parse(
      Buffer.from(payloadBase64, "base64").toString("utf-8")
    );

    //3. Get the role information from the payload
    //ABP framework uses "role" claim for role information, while Microsoft Identity platform uses "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" claim
    const userRole = payloadJson["role"] as string | typeof payloadJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    
    //4. Convert to Array for (multiple roles) 
    const roleArray = Array.isArray(userRole) ? userRole : [userRole].filter(Boolean);
    
    //5.Redirect to the role page definition page based on the role information
    if (roleArray.includes("Admin")) {
      destinationUrl = `${APP_URL}/admin`;
    } else {
      destinationUrl = `${APP_URL}/`;
    }  
  }catch(error){
    console.error("Error processing JWT token:", error);
    // In case of any error during token processing, fallback to the default destination URL
    destinationUrl = `${APP_URL}/`;
  }

  const response = NextResponse.redirect(destinationUrl);

  response.cookies.set("wm_session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 10,
  });

  response.cookies.delete("oidc_state");
  response.cookies.delete("oidc_code_verifier");

  return response;
}
